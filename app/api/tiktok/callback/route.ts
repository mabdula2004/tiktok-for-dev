import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { exchangeCode, appUrl } from "@/lib/tiktok";
import { writeSession } from "@/lib/session";

export async function GET(request:NextRequest){
  const code=request.nextUrl.searchParams.get("code"); const state=request.nextUrl.searchParams.get("state"); const error=request.nextUrl.searchParams.get("error_description");
  const expected=(await cookies()).get("tiktok_oauth_state")?.value;
  if(error||!code||!state||!expected||state!==expected) return NextResponse.redirect(`${appUrl()}/studio?error=${encodeURIComponent(error||"TikTok authorization could not be verified.")}`);
  try{await writeSession(await exchangeCode(code));(await cookies()).delete("tiktok_oauth_state");return NextResponse.redirect(`${appUrl()}/studio?connected=1`)}catch(e){return NextResponse.redirect(`${appUrl()}/studio?error=${encodeURIComponent(e instanceof Error?e.message:"Authorization failed")}`)}
}
