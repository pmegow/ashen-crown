# Server v1.5.0 — the weekly image allowance (TODO #381)

Deployed 2026-09-09 04:13 UTC as Fly release 44 under the owner's ruling of 2026-09-08
(20 included images per account per rolling week; a graceful BYOK fal.ai option past it).
Full receipt: `DEPLOY_1.5.0_2026-09-08.md` in the server repo (commit e73869b).

- Server: `render-allowance.js` counts DELIVERED renders over seven rolling days; both the
  sync and queue lanes refuse with `429 render-allowance` before metering; `/api/account`
  carries `renders {used, cap, remaining, resetsAt, exempt}`; admins exempt; the 40/day fuse
  stays. Gateway battery 86/86. Pre-deploy volume snapshot scheduled; nightly backup verified.
- Client v1.863: the refusal arrives in the server's own words (never "fal.ai HTTP 429"), a
  pre-flight from the account readout, an "Add your fal.ai key…" button that opens Render
  Options, and an Images line in the Account modal.
- Not verified from here: the Account modal's Images line on a real signed-in session (the
  verification browser is signed out by rule). Owner check: File ▸ Account….
