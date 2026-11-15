import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { exchangeCode, appUrl } from "@/lib/tiktok";
import { writeSession } from "@/lib/session";

export async function GET(request:NextRequest){
  const code=request.nextUrl.searchParams.get("code"); const state=request.nextUrl.searchParams.get("state"); const error=request.nextUrl.searchParams.get("error_description");
  const expected=(await cookies()).get("tiktok_oauth_state")?.value;
  // Website flow: a session state cookie exists and matches — exchange the
  // code, set the session, and send the user to the Studio.
  if(expected && state && state===expected && code && !error){
    try{await writeSession(await exchangeCode(code));(await cookies()).delete("tiktok_oauth_state");return NextResponse.redirect(`${appUrl()}/studio?connected=1`)}catch(e){return NextResponse.redirect(`${appUrl()}/studio?error=${encodeURIComponent(e instanceof Error?e.message:"Authorization failed")}`)}
  }
  // Direct flow (no matching website session): the owner opened the authorize
  // URL directly, so show the one-time code to hand to Muse for the direct
  // uploader. A code alone is useless without the Client Secret. This lets the
  // direct flow use the already-registered callback URL — no second redirect
  // URI is needed in the portal.
  const body = code
    ? `<h1>Authorization code</h1><p>Copy this code and give it to Muse:</p><code>${code}</code>`
    : `<h1>Authorization failed</h1><p>${error || "TikTok authorization could not be verified."}</p>`;
  return new NextResponse(`<!doctype html><html><body style="font-family:sans-serif;padding:40px">${body}</body></html>`, { headers: { "Content-Type": "text/html" } });
}
