# CreatorFlow

CreatorFlow is a real, consent-first TikTok publishing web app built with Next.js. It supports TikTok OAuth, creator capability checks, local video preview, editable post settings, Direct Post upload, and publish-status checks.

## TikTok developer portal values

- **App name:** CreatorFlow
- **Category:** Photo & Video (use Creator Tools if that exact option is available)
- **Platform:** Web
- **Website URL:** `https://creatorflow-keaitec.vercel.app`
- **Terms of Service URL:** `https://creatorflow-keaitec.vercel.app/terms`
- **Privacy Policy URL:** `https://creatorflow-keaitec.vercel.app/privacy`
- **Redirect URI:** `https://creatorflow-keaitec.vercel.app/api/tiktok/callback`
- **Products:** Login Kit and Content Posting API
- **Scopes:** `user.info.basic`, `video.publish`, `video.upload`

### App description

> CreatorFlow is a web-based creator publishing studio that lets TikTok creators securely connect their own account, preview an original video, write an editable caption, manually select privacy and interaction settings, disclose commercial content, explicitly confirm TikTok’s music usage terms, publish to their TikTok profile, and monitor processing status. CreatorFlow never publishes without the creator’s express confirmation and does not add watermarks.

### App review explanation

> Login Kit is used to securely authorize the creator’s TikTok account. The `user.info.basic` scope identifies the connected account in the publishing studio. Before every post, CreatorFlow calls the creator-info endpoint to display the current nickname and TikTok-provided privacy and interaction options. The creator selects and previews a local original video. In Direct Post mode, the creator enters or edits the caption, manually chooses privacy, configures comments/Duet/Stitch, selects any applicable commercial-content disclosure, and accepts the required TikTok declaration. CreatorFlow uses `video.publish` only after the creator presses Publish. In Draft mode, CreatorFlow uses `video.upload` to transfer the selected video to the creator’s TikTok inbox so the creator can finish editing and publish inside TikTok. The post-status endpoint reports processing results for both modes.

### Suggested demo video sequence

1. Begin on the public CreatorFlow homepage and show Privacy Policy and Terms links.
2. Click **Connect TikTok** and complete TikTok authorization in Sandbox.
3. Show the connected account nickname in the studio.
4. Select and preview an original test video.
5. Enter a caption, manually select privacy, and configure interactions/disclosures.
6. Accept the TikTok declaration, click Publish, and show the resulting status.
7. Repeat with **Upload draft**, then show the TikTok inbox notification and draft editing flow.

## Environment variables

Copy `.env.example` to `.env.local`. Never commit the real secret.

- `TIKTOK_CLIENT_KEY` — TikTok app Client Key
- `TIKTOK_CLIENT_SECRET` — TikTok app Client Secret (server-only)
- `APP_SECRET` — a random value of at least 32 characters used to encrypt the session cookie
- `NEXT_PUBLIC_APP_URL` — the exact production URL

## Local development

```bash
npm install
npm run dev
```

The public pages build without TikTok credentials. Connecting TikTok requires valid Sandbox or Production credentials and the exact redirect URI above.
