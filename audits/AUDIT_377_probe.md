# #377 turn-probe boundary — 2026-09-09

Server [PR #2](https://github.com/pmegow/traffic-and-dragons-server/pull/2), commit d7634e3, package v1.5.1. [CI green](https://github.com/pmegow/traffic-and-dragons-server/actions/runs/34374906499): full npm test, six turn-probe HTTP groups, five named mutation proofs.

`GET /api/campaigns/:id/turn` is authenticated/account-scoped, returns only `{campaignId,turn}`, has `Cache-Control: no-store`, returns null for absent/foreign campaigns, preserves zero, and refuses malformed stored turn with a visible error. No state blob, schema, CAS POST or dependency changes. No persistent resources added. Tests use disposable databases; production was untouched.

## Why client integration stopped

The existing `dev/tests-jp011-flush-dirty.js` test “a marked campaign PUSHES before the reconcile GET is even issued” requires `calls.length === 1` and `calls[0].method === "POST"` immediately after load. A GET probe before POST is incompatible. The handoff explicitly forbids loosening/deleting/rebaselining any existing assertion; no assertion or client adapter code was edited.

The owning contract review needs to distinguish metadata probing from full-state reconciliation: permit the former before push while preserving the prohibition on adopting server state before the dirty local push finishes. The minimum adapter edit then needs failure tests for stale campaign/account responses, failed/malformed probes, a genuinely newer server, a server write racing after the probe, and retention of the dirty marker until a confirmed POST. Observing a turn must never count as a successful upload.

Deployment needs explicit owner approval. Deploying this server PR alone does not remove the existing client 409, so deployment approval is deferred until the complete integration is reviewable.
