# Hand-off brief for Astra — 2026-09-09

Two self-contained tasks from `TODO.md`, both inside the off-Fable safe-changes map (dev tooling; a thin readout over a pure function). Neither touches the drift surface. Work each on its own branch and open a PR; do not push to `master`.

## House rules that apply to both

- **Read `CLAUDE.md` first.** ES5.1 only: `var`, no arrow functions, no template literals, no `const`/`let`. No build step, no npm dependencies.
- **`node dev/run-tests.js` must stay green** before every commit. Adding tests is always legal; loosening, deleting or re-baselining an existing assertion or frozen hash is a contract change and is NOT yours to make. If a task seems to need that, stop and report it instead.
- **Off-limits files** (drift surface, Fable-only): `tag_table.js`, `memory.js`, anything in `api.js` (`buildSysPrompt`, `applyMuts`, `cleanTxt`), `state.js` serialization, `clock.js`, `identity.js`, `campaign_generator.js`, `game.js` quest/level lifecycle. You read them; you never edit them.
- **Stage explicit files** (`git add <file> ...`), never `git add -A`.
- **If game code changes** (task B does, task A does not): bump `APP_VERSION` in `globals.js` AND `CACHE` in `sw.js` in the same commit. Run `git fetch origin master` first and take the next number after whatever `origin/master` carries, because other sessions are landing versions in parallel.
- **Commit message explains the why**, single concern per commit, and ends with your own attribution line.
- **Same commit as the fix:** update the row in `TODO.md` (status glyph: ○ not started · ◐ partial · ◉ built, ready for the owner to test · ✅ complete — never ✅ with unfinished work) and append ONE line to `todo_checkWithFable.md` ▸ "Off-Fable log" in the shape the existing lines use (date, row, what changed, what was verified, what was NOT touched).
- **No silent failures.** Anything that fails prints why.

---

## Task A — TODO #351: nine sabotage batteries have misattributed proofs (S, tier Any)

**What is wrong.** The weekly CI run of `dev/run-sabotage-all.js` (`.github/workflows/sabotage-weekly.yml`, GitHub Actions run 34013099710) reported MISATTRIBUTED cases in these batteries under `dev/`:

- `sabotage-229-quest-journal.js`
- `sabotage-250-sw-io.js`
- `sabotage-285-item-define.js`
- `sabotage-bible-editor-launcher.js`
- `sabotage-bible-editor-remaining.js`
- `sabotage-contract-tier.js`
- `sabotage-identity.js`
- `sabotage-todo-hygiene.js`
- `sabotage-w2.js`

"Misattributed" means the mutation DOES turn the suite red, but a different test clause catches it than the one the battery names as its expected clause. The receipt is wrong, so the next refactor will not notice when the intended guard stops guarding.

**Two classes already diagnosed.**

1. **Everywhere-misattributed** (reproduces locally). Example: `sabotage-285-item-define.js` — the case "the alias guard dies" is caught by a test other than "#285 (f18) … stay Define-ineligible". The battery's expected-clause label is stale; the guard itself is fine.
2. **CI-only** (green locally, red on CI on every case). `sabotage-todo-hygiene.js` runs git-aware hygiene tests; the weekly workflow uses `actions/checkout@v4` at the default shallow depth, while `engine-tests.yml` sets `fetch-depth: 2`. The batteries need history the shallow clone lacks.

**What to do.**

1. Run `node dev/run-sabotage-all.js` locally and record which of the nine misattribute locally versus only on CI.
2. For each local misattribution, read the battery's expected-clause label and the clause in `dev/run-tests.js` / `dev/engine-tests.js` that actually fires. Decide per case:
   - The catching clause is a legitimate guard of the same surface, and the label is merely stale → re-label the battery's expected clause. Say so in the battery's comment.
   - The catching clause is incidental (the mutation happens to break something unrelated) and the NAMED clause never fires → that is a real coverage gap. Do NOT paper over it by re-labeling. Add the missing assertion so the named clause catches it, or, if that needs an engine change, leave the case red and report it.
3. For the CI-only class, fix the checkout depth in `sabotage-weekly.yml` (`fetch-depth: 0`, or the smallest depth the git-aware tests demonstrably need). Check whether any of the other eight is also in this class.
4. Trigger the weekly workflow by hand (`gh workflow run sabotage-weekly.yml`, then `gh run watch`) and iterate until the summary reads 70/70 with zero MISATTRIBUTED.
5. Append the adjudication table (battery · case · locally or CI-only · verdict · what changed) to `audits/AUDIT_sabotage_census.md`.

**Never:** delete a mutation case, weaken or delete a clause, edit an engine file. A battery whose mutation changes zero bytes is itself a failure (guard rule 2 in `CLAUDE.md`).

**Done looks like:** PR with the battery relabels, the workflow depth fix, the audit table; a green hand-triggered weekly run linked in the PR; `TODO.md` #351 → ✅ with the run URL; the Off-Fable log line.

---

## Task B — TODO #374: a stakes readout for the coda (XS, tier "dev + readout, off-Fable")

**Why.** In the owner's last hundred turns the readout showed ten rolls, ten successes, zero HP loss, zero conditions, one gold gain. In a coda (the authored spine is told, no act active) that is exactly fine and exactly where nobody can tell the difference between an earned rest and a narrator that stopped putting anything at risk. This is a **measurement line only**: no note builder, no prompt text, no toast, nothing the GM ever sees.

**Where it lives.** The #17 Drift health modal (`ui-modals.js` ~line 807) is a thin DOM shell over `healthIndicators(ws,mem,withGrowth)` in `helpers.js` (line ~1930). The sibling you are pairing with is the #371 "Rolled outcomes" row, pushed at `helpers.js` ~line 2045 via `push("dice","Rolled outcomes",status,detail)` from `diceOutcomeRatio(ws,window)` (line ~1927). Read that block first and copy its shape. The `HINTS` map that follows it carries a per-row "what this means / what to do" line with a hard **under-25-word cap enforced by an engine test**.

**Build.**

1. **A pure function** next to `diceOutcomeRatio` in `helpers.js`, e.g. `turnsSinceRisk(ws)`. It scans backwards over the two records the engine already keeps and returns `{turns, kind, capped}` where `kind` names the last risky thing found:
   - `worldState.diceLog` (see `diceLogFile`, `helpers.js` line ~93): an entry whose `outcome` is a failure.
   - `worldState.tagLog` (written in `api.js` ~line 2935, READ ONLY for you): entries are `{t:turn, tags:[NAMES], m:[mutation lines], stripped?, refused?}`. Treat as risk: an `HP` mutation that lowered HP, a `CONDITION` tag, a `GOLD` mutation that spent gold, a `COMPANION_HP` loss, a `COMPANION_CONDITION`. Inspect the `m` strings on a real save to learn their exact wording before pattern-matching them; do not guess.
   - A schedule inside its window: `scheduleDue()` in `clock.js` (read only) returns due entries; a non-empty result at the current turn counts as pressure.
   - **Honest cap:** `tagLog` is a ring of `TAG_LOG_CAP` (40, `globals.js`) entries. When nothing risky is inside the ring, return `capped:true` and the readout says "40+ turns", never a fabricated larger number.
2. **One readout row** in `healthIndicators`, right after the "Rolled outcomes" row: `push("stakes","At risk",status,detail)`. Show `codaState()` (`helpers.js` line ~1274, the #366 predicate) beside it in the detail text, so a quiet stretch reads as earned in a coda and as a question outside one. Suggested statuses: `"na"` with fewer than 3 filed turns in the records; `"ok"` whenever `codaState()` is true; outside a coda `"ok"` under 20 quiet turns and `"warn"` at 20 or more. Statuses are display only. Add the matching `HINTS` line under 25 words.
3. **Tests first** in `dev/engine-tests.js` (the #371 tests near line ~4170 are the template): plant a `worldState` with a synthetic `tagLog` and `diceLog`, assert the counter, the `kind`, the cap, the coda flag beside it, and the hint word cap. Write the failing assertion before the function.
4. **A sabotage battery** `dev/sabotage-374-stakes.js` in the shape of an existing small battery (e.g. `dev/sabotage-386-initiative.js`): mutate the counter, the cap, and the coda branch; every mutation must go red on the #374 clause.
5. Bump `APP_VERSION` and `CACHE`. Verify in the browser: open a save, File ▸ Drift health, screenshot the new row. Report what the row says on the owner's real coda save if one is in `testRuns/`.

**Do not:** touch `api.js`, `clock.js`, `tag_table.js`, `ui-modals.js` (the modal renders whatever `healthIndicators` pushes; if it does not, stop and report rather than editing it), or add any threshold that changes engine behaviour. Keep your additions in one contiguous block of `helpers.js` so the merge stays trivial; other sessions are editing that file.

**Done looks like:** PR with the pure function, the row, the hint, the test, the battery, the version bump, a screenshot of the row; `TODO.md` #374 → ◉ (the owner tests it); the Off-Fable log line.

---

## If both land early — TODO #206 (per-scene Render button, S, tier Any)

Only if the owner confirms nobody else is in `ui-shell.js` or `game.js` that day. The row in `TODO.md` already carries the scouted design and its one correctness trap (`doRender` must get `{noHistory:true}` with the scene's own prose, location and clock, or every button paints the CURRENT scene). Ask before starting.
