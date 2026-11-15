import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="eyebrow">Built for independent creators</div>
        <h1>Your video. Your choices. <span>Your TikTok.</span></h1>
        <p className="heroCopy">Preview original videos, choose every publishing setting, and send content to your own TikTok profile only after you approve it.</p>
        <div className="actions">
          <Link className="primary" href="/api/tiktok/connect">Connect TikTok</Link>
          <Link className="secondary" href="/#workflow">See the workflow</Link>
        </div>
        <p className="microcopy">CreatorFlow never publishes without your explicit confirmation.</p>
      </section>

      <section className="featureStrip" aria-label="CreatorFlow benefits">
        <div className="shell stats">
          <div><strong>01</strong><span>Secure TikTok sign-in</span></div>
          <div><strong>02</strong><span>Full post preview</span></div>
          <div><strong>03</strong><span>Explicit approval</span></div>
          <div><strong>04</strong><span>Live status updates</span></div>
        </div>
      </section>

      <section className="section shell" id="workflow">
        <div className="sectionHeading">
          <div className="eyebrow">A transparent workflow</div>
          <h2>From file to published post in four clear steps</h2>
        </div>
        <div className="cards">
          <article><span>1</span><h3>Connect</h3><p>Authorize CreatorFlow through TikTok’s secure OAuth screen. Your TikTok password is never shared with us.</p></article>
          <article><span>2</span><h3>Choose</h3><p>Select an original video from your device and review it before anything is transferred.</p></article>
          <article><span>3</span><h3>Configure</h3><p>Write the caption, manually select privacy, and decide whether comments, Duet, or Stitch are allowed.</p></article>
          <article><span>4</span><h3>Approve</h3><p>Confirm TikTok’s required disclosures, publish, and follow the processing status from the studio.</p></article>
        </div>
      </section>

      <section className="section shell trust">
        <div><div className="eyebrow">Designed around consent</div><h2>You stay in control at every point.</h2></div>
        <ul>
          <li>No automatic or background publishing</li>
          <li>No preset privacy selection</li>
          <li>No locked captions or hashtags</li>
          <li>No added watermark or CreatorFlow branding</li>
        </ul>
      </section>

      <section className="cta shell">
        <div><div className="eyebrow">Ready when you are</div><h2>Connect your TikTok account and prepare your next post.</h2></div>
        <Link className="primary" href="/api/tiktok/connect">Connect TikTok</Link>
      </section>
    </>
  );
}
