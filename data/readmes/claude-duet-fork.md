<p align="center">
  <img src="assets/banner.svg" alt="claude-duet-fork: a proactive agent that watches your apps, briefs you every morning, and asks before it acts" width="100%">
</p>

<p align="center">
  <a href="https://github.com/faarisaahmed/claude-duet-fork/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/faarisaahmed/claude-duet-fork/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-B5661F"></a>
  <img alt="iOS 17+" src="https://img.shields.io/badge/iOS-17%2B-2B1C10?logo=apple">
  <img alt="Node 22.13+" src="https://img.shields.io/badge/node-22.13%2B-2B1C10?logo=node.js">
  <img alt="Claude Opus 5.5" src="https://img.shields.io/badge/model-claude--opus--5--5-EE9E52">
</p>

<p align="center">
  <b>Your own self-hosted take on a proactive AI agent.</b><br>
  It watches the apps you've built and the tools you depend on, sends you one calm brief every morning,<br>
  pings your iPhone when something breaks, and never changes anything until you tap <b>Approve</b>.
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="#connectors">Connectors</a> ·
  <a href="docs/deploy.md">Deploy</a> ·
  <a href="docs/ios-app.md">iOS app</a> ·
  <a href="docs/configuration.md">Configuration</a> ·
  <a href="SECURITY.md">Security</a>
</p>

> [!NOTE]
> **claude-duet-fork is an independent, community project. It is not made, endorsed or supported by Anthropic.** It isn't a fork of any Anthropic code: it's an open-source reimplementation of the idea behind [Claude Duet](https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/), for people who'd rather not wait for the waitlist, or who want to run it themselves. It uses the public [Claude API](https://platform.claude.com) with your own API key.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/screenshots-dark.jpg">
  <img src="assets/screenshots-light.jpg" alt="The iOS app: Today, Alerts, Approvals, Chat and Settings" width="100%">
</picture>

## What it does

- **Morning brief.** At 7:30 (or whenever you like) you get one notification with what needs you today, what was fixed overnight, and a short line for everything that's fine.
- **Checks on its own cadence.** Each connector polls on its own schedule: every 15 minutes for your sites, every few hours for everything else. You only hear about *changes*: something broke, got worse, or recovered.
- **Watches the apps you build.** Uptime, slow responses, expiring TLS certificates, failing CI, Dependabot alerts.
- **Keeps your Claude Code setup healthy.** A tiny reporter on your Mac sends your Claude Code version, MCP server health (connected, failing, or needing sign-in) and plugin versions, so you hear when a connector breaks or falls behind.
- **Proposes fixes, and asks first.** "Re-run the flaky job", "Redeploy the API", "Draft a reply". Every action is an approval card with a risk level, and approving needs Face ID.
- **Chat.** Ask "is anything broken?", "why did CI fail?", or "keep an eye on status.acme.dev", from the app.
- **Works without AI too.** With no API key, alerts and briefs still work in plain wording. Claude makes them clearer, decides what's urgent, and adds chat.

## How it compares

|  | Claude Duet (Anthropic) | claude-duet-fork |
|---|---|---|
| Morning brief | ✅ | ✅ Configurable time and days |
| Checks every few hours and alerts you | ✅ | ✅ Per-connector intervals, quiet hours |
| Keeps working when the app is closed | ✅ Anthropic's cloud | ✅ **Your** server (Fly.io, a VPS, a Pi…) |
| Approval before sensitive actions | ✅ | ✅ Every action, with risk levels and Face ID |
| iPhone app | ✅ App Store | ✅ Open-source SwiftUI app, built and signed by you |
| Availability | Waitlist, US, Pro/Max | Anyone with a Claude API key |
| Built-in integrations | Many, managed for you | 8 connectors, plus [your own](docs/writing-a-connector.md) in ~50 lines |
| Monitoring your own apps and Claude Code setup | — | ✅ The main use case |
| Cost | Included in your plan | Hosting (a few dollars a month) plus API usage ([estimate](#costs)) |

## How it works

<p align="center"><img src="assets/architecture.svg" alt="Architecture: connectors feed signals to the Duet server; Claude triages; push notifications and approvals go to the iPhone app" width="100%"></p>

1. **Connectors** observe the world and return *signals*: `ok`, `info`, `warn` or `critical`.
2. The **alert engine** turns new problems into alerts, escalates them when they get worse, and resolves them when they recover. It keeps no alert open longer than the problem lasts.
3. When something *changed*, **Claude Opus 5.5** rewrites the alert for a lock screen, decides whether a new email or invite can't wait until tomorrow, and proposes fixes from the connectors' action catalog. Nothing changed means no API call.
4. **Push notifications** go to your iPhone (APNs), with Approve and Reject right on the notification.
5. Approved actions run, the result is recorded, and the next check confirms the fix.

## Quick start

### 1. Try the demo (2 minutes, nothing to configure)

```bash
git clone https://github.com/faarisaahmed/claude-duet-fork.git
cd claude-duet-fork/server
npm install
npm run demo            # realistic fake data on http://localhost:8787
```

Then open `ios/ClaudeDuet.xcodeproj` in Xcode, edit the scheme to enable the `-DemoMode YES` launch argument, and run it in the simulator. Approve the "Redeploy the API" card, tap **Run check now** on Today, and watch the alert resolve.

### 2. Run it for real

```bash
cp duet.config.example.yaml duet.config.yaml   # say what to watch
cp .env.example .env                            # API key and token
npm run check                                   # dry run: see what every connector sees
npm run dev                                     # start; prints a pairing QR code
```

When you're happy with it, **[deploy it](docs/deploy.md)** so it runs around the clock. Fly.io takes about 10 minutes; Docker on any VPS works too.

### 3. Install the app on your iPhone

Build it with your Apple Developer account and scan the pairing QR code. The [step-by-step guide](docs/ios-app.md) covers signing, the APNs key and troubleshooting.

## Connectors

| Connector | Watches | Can propose | Setup |
|---|---|---|---|
| [`http-health`](docs/connectors/http-health.md) | Uptime, status codes, body text, latency, TLS expiry | Redeploy (via deploy hook) | 1 min |
| [`claude-code`](docs/connectors/claude-code.md) | Claude Code version, MCP server health and versions, plugin updates | — | 3 min |
| [`package-updates`](docs/connectors/package-updates.md) | New releases on npm, PyPI and GitHub, from a version or a manifest URL | — | 2 min |
| [`github`](docs/connectors/github.md) | CI on your default branch, Dependabot alerts | Re-run failed jobs | 3 min |
| [`gmail`](docs/connectors/google.md) | Unread mail worth your attention | Draft reply, send reply, archive | 15 min* |
| [`google-calendar`](docs/connectors/google.md) | Today's agenda, double-bookings, unanswered invites | RSVP | 15 min* |
| [`google-drive`](docs/connectors/google.md) | Files shared with you, edits to your files | — | 15 min* |
| [`slack`](docs/connectors/slack.md) | Mentions and DMs you haven't answered | Post a message | 5 min |

<sub>* One Google Cloud project covers all three Google connectors.</sub>

Need something else? A connector is a `poll()` function plus optional actions. See **[Writing a connector](docs/writing-a-connector.md)**.

## Talking to it

The chat tab is Claude with tools over your live data:

> **You:** Is anything broken right now?<br>
> **Duet:** Yes, two things. The API's `/healthz` has returned 502 since 6:58 AM, and a redeploy is waiting for your approval. CI is failing on acme/dashboard, but only `e2e-safari` failed, and it has been flaky this month…

> **You:** Keep an eye on status.acme.dev too<br>
> **Duet:** Done. I'm checking **status.acme.dev** every 15 minutes. It's up right now (HTTP 200 in 158 ms).

It can run checks, read signals, add or remove watched URLs, write a fresh brief, and *propose* actions. It can't run them.

## Safety model

- **Nothing runs without you.** Connectors and Claude can only *propose* actions. Each one becomes an approval with a risk level (`low`, `medium`, `high`), shows its exact parameters, expires after 24 hours, and needs Face ID or your passcode on the phone. Parameters are validated against the action's schema before an approval is created and again before it runs.
- **Your server, your data.** State lives in one SQLite file on your server. Claude only sees what's needed for the current triage, brief or chat, sent through your own API key.
- **Least privilege.** Every connector's guide lists the minimum scopes. Read-only connectors stay read-only.
- **One bearer token** protects the API. The app keeps it in the iOS Keychain.

More in [SECURITY.md](SECURITY.md).

## Costs

- **Hosting:** a small always-on VM is enough (Fly.io `shared-cpu-1x` with 512 MB, or any $5 VPS).
- **Claude API:** you pay per token on your own key (at the time of writing, Opus 5.5 costs $4 per million input tokens and $20 per million output tokens). Claude is called for the daily brief, for checks where something changed, and for chat. A brief with a dozen connectors runs to a few thousand tokens, so a typical month is a few dollars. To spend less, set `ai.effort: low`, choose a cheaper `ai.model`, or leave the key out entirely.
- **Apple:** push notifications need the Apple Developer Program ($99/year).

## Project layout

```
claude-duet-fork/
├── server/              TypeScript backend (Node 22.13+, Fastify, SQLite via node:sqlite)
│   ├── src/connectors/  one file per connector
│   ├── src/brain/       Claude: triage, brief, chat (with tools)
│   ├── src/push/        APNs (token auth, HTTP/2)
│   └── test/            vitest
├── ios/                 SwiftUI app (iOS 17+), Xcode project + XcodeGen spec
├── reporter/            Claude Code reporter for your Mac (no dependencies)
├── docs/                guides and reference
└── assets/              images for this README
```

## Development

```bash
cd server
npm test            # unit + integration tests
npm run typecheck
npm run demo        # API with fake data for UI work

# iOS (Xcode 15.2+)
xcodebuild -project ios/ClaudeDuet.xcodeproj -scheme ClaudeDuet \
  -destination 'platform=iOS Simulator,name=iPhone 15 Pro' test
```

The HTTP API is documented in [docs/api.md](docs/api.md) if you want to build another client.

## Roadmap

- [ ] Home Screen widget and Live Activity for ongoing incidents
- [ ] More connectors: Sentry, Vercel and Netlify deploys, Stripe, Linear, Outlook
- [ ] Alert snoozing and per-alert mute rules
- [ ] Web dashboard for non-iPhone users
- [ ] One-click deploy buttons

Ideas and PRs are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## FAQ

<details>
<summary><b>Do I need a Claude Pro or Max subscription?</b></summary>

No. It uses the Claude API with an API key from [platform.claude.com](https://platform.claude.com), which is billed separately from claude.ai plans.
</details>

<details>
<summary><b>Can I run it without an API key?</b></summary>

Yes. Checks, alerts, approvals, briefs and push all work. They use the connectors' own wording, and chat is off.
</details>

<details>
<summary><b>Android?</b></summary>

Not yet. The server is client-agnostic ([API reference](docs/api.md)), so an Android or web client is a welcome contribution.
</details>

<details>
<summary><b>Can I use a different model?</b></summary>

Set `ai.model` in `duet.config.yaml`. The default is `claude-opus-5-5` with `effort: medium`.
</details>

<details>
<summary><b>Why does the app need a paid Apple account?</b></summary>

Apple only lets apps signed by a paid developer account receive push notifications. A free account can still run the app, but without push, and the install expires after 7 days.
</details>

## License

[MIT](LICENSE). "Claude" is a trademark of Anthropic, PBC, and is used here only to describe compatibility with the Claude API. This project is not affiliated with Anthropic.
