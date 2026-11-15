import { NextRequest, NextResponse } from "next/server";

// Display-only OAuth code receiver for Muse's DIRECT TikTok uploader.
// The website's /api/tiktok/callback consumes the code itself (session
// cookie), so the direct flow needs a redirect target that does NOT exchange
// it — this page just shows the one-time code so the owner can copy it.
// A code alone is useless without the Client Secret, which never leaves
// the owner's hands. Register this URL as an additional redirect URI in
// the TikTok developer portal before using it.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error_description");
  const body = code
    ? `<h1>Authorization code</h1><p>Copy this code and give it to Muse:</p><code>${code}</code>`
    : `<h1>Authorization failed</h1><p>${error || "No code was returned."}</p>`;
  return new NextResponse(`<!doctype html><html><body style="font-family:sans-serif;padding:40px">${body}</body></html>`, { headers: { "Content-Type": "text/html" } });
}
