import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { TikTokSession } from "./tiktok";

const COOKIE = "creatorflow_session";
function key() { const secret = process.env.APP_SECRET; if (!secret) throw new Error("APP_SECRET is not configured."); return crypto.createHash("sha256").update(secret).digest(); }
function encrypt(value: TikTokSession) { const iv=crypto.randomBytes(12); const cipher=crypto.createCipheriv("aes-256-gcm",key(),iv); const encrypted=Buffer.concat([cipher.update(JSON.stringify(value),"utf8"),cipher.final()]); return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString("base64url"); }
function decrypt(value: string): TikTokSession { const raw=Buffer.from(value,"base64url"); const iv=raw.subarray(0,12); const tag=raw.subarray(12,28); const decipher=crypto.createDecipheriv("aes-256-gcm",key(),iv); decipher.setAuthTag(tag); return JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)),decipher.final()]).toString("utf8")); }
export async function readSession() { const value=(await cookies()).get(COOKIE)?.value; if(!value) return null; try{return decrypt(value)}catch{return null} }
export async function writeSession(session:TikTokSession){(await cookies()).set(COOKIE,encrypt(session),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*365})}
export async function clearSession(){(await cookies()).delete(COOKIE)}
