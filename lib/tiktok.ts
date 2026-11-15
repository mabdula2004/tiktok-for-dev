const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const API = "https://open.tiktokapis.com";

export type TikTokSession = { accessToken: string; refreshToken: string; expiresAt: number; openId: string; scope: string };

function credentials() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  if (!clientKey || !clientSecret) throw new Error("TikTok credentials are not configured yet.");
  return { clientKey, clientSecret };
}

export function appUrl() { return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; }

export function authorizeUrl(state: string) {
  const { clientKey } = credentials();
  const query = new URLSearchParams({ client_key: clientKey, scope: "user.info.basic,video.publish,video.upload", response_type: "code", redirect_uri: `${appUrl()}/api/tiktok/callback`, state });
  return `https://www.tiktok.com/v2/auth/authorize/?${query}`;
}

export async function exchangeCode(code: string): Promise<TikTokSession> {
  const { clientKey, clientSecret } = credentials();
  const body = new URLSearchParams({ client_key: clientKey, client_secret: clientSecret, code, grant_type: "authorization_code", redirect_uri: `${appUrl()}/api/tiktok/callback` });
  const response = await fetch(TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store" });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error_description || data.error?.message || "TikTok authorization failed.");
  return { accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt: Date.now() + data.expires_in * 1000, openId: data.open_id, scope: data.scope };
}

export async function refreshSession(session: TikTokSession): Promise<TikTokSession> {
  if (session.expiresAt > Date.now() + 60_000) return session;
  const { clientKey, clientSecret } = credentials();
  const body = new URLSearchParams({ client_key: clientKey, client_secret: clientSecret, grant_type: "refresh_token", refresh_token: session.refreshToken });
  const response = await fetch(TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store" });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error_description || "TikTok session refresh failed.");
  return { accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt: Date.now() + data.expires_in * 1000, openId: data.open_id, scope: data.scope };
}

export async function tiktokFetch(session: TikTokSession, path: string, init: RequestInit = {}) {
  const response = await fetch(`${API}${path}`, { ...init, headers: { Authorization: `Bearer ${session.accessToken}`, "Content-Type": "application/json; charset=UTF-8", ...init.headers }, cache: "no-store" });
  const data = await response.json();
  if (!response.ok || (data.error && data.error.code !== "ok")) throw new Error(data.error?.message || `TikTok request failed (${response.status}).`);
  return data;
}
