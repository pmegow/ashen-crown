# Server v1.5.1 deployment — 2026-09-10 PDT (2026-09-11 ~04:47 UTC)

Owner approved: "deploy Astra's server PR #2" (game TODO #377). Gemini explicit caching stays disabled.

## Release

- PR #2 (`codex/377-boot-turn-probe`, Astra) merged as `c39473b`, package v1.5.1.
- Contents: `turn-probe.js` — `GET /api/campaigns/:id/turn`, account-scoped, `Cache-Control: no-store`,
  returns `{campaignId, turn}` from `json_extract(world_state,'$.turn')` on the campaigns row (the same
  row the CAS guard compares), `turn:null` for absent/foreign campaigns, 500 on a malformed stored turn;
  wired in `index.js`; `test-turn-probe.mjs` (6 checks) + `sabotage-turn-probe.mjs`; tests workflow
  extended. No schema change, no migration, no new dependency at runtime (package-lock touched for the
  test tooling only).
- Local `npm test` on the merge commit: all suites green, including `#377 turn probe: 6 passed, 0 failed`.

## Backup

- Fresh off-Fly backup before deploy: workflow run 34563468819, success.

## Deployment

Command: `flyctl deploy --app traffic-and-dragons-server --ha=false --remote-only --env GEMINI_EXPLICIT_CACHE=0 --wait-timeout 180s`.

- Image `registry.fly.io/traffic-and-dragons-server:deployment-01M27CN2B1PJHG9B07P5WY4J8J`,
  digest `sha256:e9973efdb96dd1633b05ae938e5324f5faaa8f97113e5231a7cb282b79d13749`, 182 MB.
- Fly release v45, machine `48ee379bd62728` (ord), rolling update, original volume retained.

## Postflight

- `/health` 200 `{"status":"ok"}`.
- On the machine: `package.json` version 1.5.1; `registerTurnProbe` present in `index.js` (import + call);
  `/app/turn-probe.js` present; `GEMINI_EXPLICIT_CACHE=0` in the process environment.
- `GET /api/campaigns/x/turn` unauthenticated → 401 (the auth middleware fronts the route as designed).
- The authenticated end-to-end proof is the client: game v1.889's boot-push probe reads this route; the
  owner's next Clear-cache-and-reload should show no `POST /api/state 409` line.
