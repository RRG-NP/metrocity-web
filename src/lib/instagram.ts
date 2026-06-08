/**
 * Instagram feed integration (server-side only).
 *
 * Pulls the club's recent posts from the Instagram Graph API ("Instagram API
 * with Instagram Login") so the gallery stays in sync with @rac_metrocity
 * automatically — no more uploading photos to the site by hand.
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
 *   5. Long-lived tokens expire after ~60 days. Refresh before expiry by
 *      calling: https://graph.instagram.com/refresh_access_token
 *               ?grant_type=ig_refresh_token&access_token=<current-token>
 *      (a scheduled job / cron is the usual way to automate this).
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
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    // Not connected yet — the gallery renders a follow-us CTA instead.
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
