import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatorFlow — Publish to TikTok with confidence",
  description: "A creator-controlled workflow for previewing and publishing original videos to TikTok.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="nav shell">
          <Link className="brand" href="/" aria-label="CreatorFlow home">
            <span className="brandMark">CF</span>
            <span>CreatorFlow</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/#workflow">How it works</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link className="navButton" href="/studio">Open studio</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <div className="shell footerGrid">
            <div>
              <div className="brand"><span className="brandMark">CF</span><span>CreatorFlow</span></div>
              <p>Creator-controlled publishing for original short-form video.</p>
            </div>
            <div className="footerLinks">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="shell copyright">© 2026 CreatorFlow by Keaitec. CreatorFlow is not affiliated with TikTok.</div>
        </footer>
      </body>
    </html>
  );
}
