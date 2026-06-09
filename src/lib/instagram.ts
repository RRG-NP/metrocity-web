/**
 * Instagram feed integration (server-side only).
 *
 * Pulls the club's recent posts from the Instagram Graph API ("Instagram API
 * with Instagram Login") so the gallery stays in sync with @rac_metrocity
 * automatically - no more uploading photos to the site by hand.
 *
 * The access token is read from a NON-public env var, so it is only ever used
 * on the server and never shipped to the browser. Import this module only from
 * Server Components / route handlers.
 *
 * ─── HOW TO CONNECT THE CLUB INSTAGRAM ──────────────────────────────────────
 *   1. Make sure @rac_metrocity is a Business or Creator account (free, set in
 *      the Instagram app → Settings → Account type).
 *   2. Create a Meta app at https://developers.facebook.com → add the product
 *      "Instagram" → "Instagram API with Instagram Login".
 *   3. Generate a LONG-LIVED access token for the account (valid ~60 days).
 *   4. Copy `.env.example` to `.env.local` and set:
 *          INSTAGRAM_ACCESS_TOKEN=IGQVJ...           (required)
 *          INSTAGRAM_FEED_LIMIT=24                    (optional, default 24)
 *   5. Long-lived tokens expire after ~60 days. The token is refreshed
 *      automatically by the weekly cron at `/api/instagram/refresh`, which
 *      stores the fresh token in a KV store (see TOKEN STORAGE below). The
 *      INSTAGRAM_ACCESS_TOKEN env var is only the initial bootstrap value.
 *
 * ─── TOKEN STORAGE (for auto-refresh) ───────────────────────────────────────
 * Because Vercel serverless functions can't rewrite their own env vars, the
 * refreshed token is kept in a KV store and read at request time. Provision a
 * Vercel KV / Upstash Redis store and connect it to the project — that adds
 * `KV_REST_API_URL` + `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` +
 * `UPSTASH_REDIS_REST_TOKEN`) automatically. The token is read from KV first,
 * falling back to the env var when KV is empty or not configured.
 *
 * Until a token is configured, `getInstagramFeed()` returns an empty array and
 * the gallery shows a "follow us on Instagram" call-to-action instead.
 */

export interface InstagramMedia {
  id: string;
  caption: string;
  /** Image to display in the grid/lightbox (poster thumbnail for videos). */
  imageUrl: string;
  /** Link back to the post on instagram.com. */
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  /** ISO timestamp of when the post was published. */
  timestamp: string;
  isVideo: boolean;
}

/** Raw shape returned by the Graph API `/me/media` edge. */
interface RawInstagramMedia {
  id: string;
  caption?: string;
  media_type: InstagramMedia["mediaType"];
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

const GRAPH_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

/** Cache the feed for an hour so we don't hit Instagram on every request. */
const REVALIDATE_SECONDS = 60 * 60;

/**
 * Fetch the club's recent Instagram media. Returns `[]` when no token is
 * configured or the request fails, so callers can always render safely.
 */
export async function getInstagramFeed(): Promise<InstagramMedia[]> {
  const token = await getAccessToken();
  if (!token) {
    // Not connected yet - the gallery renders a follow-us CTA instead.
    return [];
  }

  const limit = Number(process.env.INSTAGRAM_FEED_LIMIT) || 24;
  const endpoint = new URL("https://graph.instagram.com/me/media");
  endpoint.searchParams.set("fields", GRAPH_FIELDS);
  endpoint.searchParams.set("limit", String(limit));
  endpoint.searchParams.set("access_token", token);

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["instagram-feed"] },
    });

    if (!res.ok) {
      console.error(
        `[instagram] feed request failed: ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const json = (await res.json()) as { data?: RawInstagramMedia[] };
    return (json.data ?? []).map(normalize);
  } catch (error) {
    console.error("[instagram] feed request threw:", error);
    return [];
  }
}

function normalize(media: RawInstagramMedia): InstagramMedia {
  const isVideo = media.media_type === "VIDEO";
  return {
    id: media.id,
    caption: media.caption ?? "",
    // Videos expose only a poster via `thumbnail_url`; images use `media_url`.
    imageUrl: (isVideo ? media.thumbnail_url : media.media_url) ?? "",
    permalink: media.permalink,
    mediaType: media.media_type,
    timestamp: media.timestamp,
    isVideo,
  };
}

// ─── Token storage + auto-refresh ───────────────────────────────────────────
// The live token is kept in a KV store so the weekly refresh cron can update it
// without a redeploy. Supports both Vercel KV and Upstash Redis env var names.
// Talks to the Upstash-compatible REST API directly via fetch (no SDK dep).

const KV_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const TOKEN_KEY = "instagram:access_token";

/** Read the stored token from KV. Returns null if KV is unconfigured/empty. */
async function readStoredToken(fresh: boolean): Promise<string | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/${TOKEN_KEY}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      // The gallery caches this alongside the feed; the cron reads it fresh.
      ...(fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: REVALIDATE_SECONDS } }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: string | null };
    return json.result ?? null;
  } catch (error) {
    console.error("[instagram] KV read failed:", error);
    return null;
  }
}

/**
 * Resolve the active access token: KV first (kept current by the cron), then
 * the INSTAGRAM_ACCESS_TOKEN env var as the bootstrap fallback.
 */
export async function getAccessToken(fresh = false): Promise<string | undefined> {
  const stored = await readStoredToken(fresh);
  return stored ?? process.env.INSTAGRAM_ACCESS_TOKEN;
}

/** Persist a refreshed token to KV. Returns false if KV isn't configured. */
async function storeAccessToken(token: string): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const res = await fetch(`${KV_URL}/set/${TOKEN_KEY}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      body: token,
      cache: "no-store",
    });
    return res.ok;
  } catch (error) {
    console.error("[instagram] KV write failed:", error);
    return false;
  }
}

export interface RefreshResult {
  ok: boolean;
  /** Whether the new token was saved to KV (false if KV isn't configured). */
  persisted: boolean;
  /** Days until the refreshed token expires, when reported by Instagram. */
  expiresInDays?: number;
  error?: string;
}

/**
 * Refresh the long-lived Instagram token (extends it ~60 days) and store the
 * result. The current token must be at least 24 hours old and still valid.
 * Called by the weekly cron at `/api/instagram/refresh`.
 */
export async function refreshAccessToken(): Promise<RefreshResult> {
  const current = await getAccessToken(true);
  if (!current) {
    return { ok: false, persisted: false, error: "No access token to refresh." };
  }

  const endpoint = new URL("https://graph.instagram.com/refresh_access_token");
  endpoint.searchParams.set("grant_type", "ig_refresh_token");
  endpoint.searchParams.set("access_token", current);

  let json: {
    access_token?: string;
    expires_in?: number;
    error?: { message?: string };
  };
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    json = await res.json();
    if (!res.ok || !json.access_token) {
      return {
        ok: false,
        persisted: false,
        error: json?.error?.message ?? `Refresh failed (HTTP ${res.status})`,
      };
    }
  } catch (error) {
    return { ok: false, persisted: false, error: String(error) };
  }

  const persisted = await storeAccessToken(json.access_token);
  return {
    ok: true,
    persisted,
    expiresInDays: json.expires_in
      ? Math.round(json.expires_in / 86400)
      : undefined,
  };
}
