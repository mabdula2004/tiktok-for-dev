import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session";
import { appUrl } from "@/lib/tiktok";
export async function POST(){await clearSession();return NextResponse.redirect(`${appUrl()}/studio`,303)}
