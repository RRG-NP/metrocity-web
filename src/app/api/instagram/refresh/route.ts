import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { refreshAccessToken } from "@/lib/instagram";

/**
 * Weekly cron endpoint that refreshes the long-lived Instagram access token so
 * it never expires (tokens last ~60 days; refreshing resets the clock).
 *
 * Scheduled via `vercel.json` → Vercel Cron calls this with the
 * `Authorization: Bearer ${CRON_SECRET}` header. Set CRON_SECRET in your env
 * to lock the endpoint down. It can also be triggered manually for testing:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://<site>/api/instagram/refresh
 *
 * Requires a connected KV store to persist the refreshed token — see
 * src/lib/instagram.ts (TOKEN STORAGE).
 */

// Never cache this handler — it must run live on every cron tick.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
  }

  const result = await refreshAccessToken();

  if (result.ok) {
    // Mark the cached feed stale so the next visit re-fetches with the fresh
    // token (stale-while-revalidate via the "max" profile).
    revalidateTag("instagram-feed", "max");
  } else {
    console.error("[instagram] token refresh failed:", result.error);
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
