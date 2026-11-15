import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { authorizeUrl } from "@/lib/tiktok";

export async function GET() {
  try {
    const state=crypto.randomBytes(24).toString("base64url");
    const response=NextResponse.redirect(authorizeUrl(state));
    response.cookies.set("tiktok_oauth_state",state,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:600});
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL(`/studio?error=${encodeURIComponent(error instanceof Error?error.message:"Connection unavailable")}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  }
}
