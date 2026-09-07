# AUDIT — the #226 mature-campaign arm, first run: sonnet-5 baseline vs gemini-3.7-flash from the turn-2097 Runelords fixture (v1.847, 2026-09-07)

**Run.** Two 20-turn arms driven by the playtest harness from the SAME frozen late-game save, `testRuns/fixtures/todo-226-mature-t2097.tnd` (Rise of the Runelords, Ammut L12 at 76/96 HP, Act 3 *Spires of Xin-Shalast*, 63 roster NPCs + 3 companions, ten memory chapters, 4,190 transcript entries, ≈33k-token prompt). Fixture re-imported between arms so both start byte-identical at turn 2097 in Wyla Ashvane's forge, Magnimar. Both via the gateway on the owner's account (campaign id `fixture-226-mature-t2097`, a throwaway). Commissioned by the owner ("run it, sonnet-5 baseline plus gemini, budget it from the allowance"). Corpora: [`dev/corpus_playtest_v1847_mature226_sonnet5.json`](../dev/corpus_playtest_v1847_mature226_sonnet5.json), [`dev/corpus_playtest_v1847_mature226_gemini.json`](../dev/corpus_playtest_v1847_mature226_gemini.json). **Cost:** sonnet-5 $1.96, gemini $0.57 (deltas on the fixture's cumulative usage meter) — $2.53 total; the week's allowance stands at ≈ $6.87 of $25 after today's two runs.

**Verdict.** **The instrument works: it separates the two models on exactly the axes the young-campaign sweep cannot see, and both held the engine contract.** Neither arm broke an invariant, dropped a tag, named a dead NPC, or produced a bare-mechanics turn of the luna kind (46 chars); in-band buttons were 20/20 on both. On texture the arms diverged: **gemini-3.7-flash held the mature save** — 894 chars/turn (thirds 810 → 980 → 1,020, floor 554), 42 distinct tags, the three companions speaking 29 times in 20 turns, a rest that landed the owed levels (#349's first sweep receipt), and a rune-giant fight run through DICE/COMBAT_ROUND/ENEMY_SLAIN with no register slip. **sonnet-5 thinned** — 587 chars/turn overall (thirds 648 → 470 → 719, floor 89), 10 `[NO_CHANGE:]` turns, only 18 distinct tags, and **two engine-voice leaks** (t2100 "The engine flags nothing to charge…", t2102 "The engine's own note settles that one… strikes itself from the ledger", which the #355 register guard caught as the run's one slip). **One confound must be read alongside:** the #306 scripted picker burned 10 of sonnet's 20 turns on "I use my travel rations" because the engine never removed the item (two rations entries on the sheet; the first `[ITEM_LOST:]` and an `[ITEM_KEPT:]` left "travel rations (2 days)" in place), so half of sonnet's turns were a nonsense action correctly answered with NO_CHANGE. On its 10 real turns sonnet-5 averaged 774 chars — level with the fixture's own incumbent window (780) — so the fair reading is: **sonnet-5 holds the mature save at parity with its own history; gemini-3.7-flash exceeds it; the picker artefact, not the model, produced the 587.** That artefact is itself a finding (→ new row).

## Side by side

| Axis | Incumbent window (fixture t2078–2097) | sonnet-5 arm | gemini-3.7-flash arm |
|---|---|---|---|
| Prose chars/turn, mean | 780 | **587** all turns · **774** on the 10 real actions | **894** |
| Thirds | 559 → 930 → 862 | 648 → 470 → 719 | 810 → 980 → 1,020 |
| Floor / mechanics-voice turns (<120 chars) | 297 / — | 89 (t2112, an empty-pouch reply to the 8th rations pick) / 1 | 554 / 0 |
| Engine-voice leaks in prose | — | **2** (t2100, t2102) | 0 |
| Register slips (#355) | — | 1 ("ledger", t2102) | 0 |
| `[SUGGEST:]` in-band | — | 20/20 | 20/20 |
| Distinct tags · zero-tag turns · unknown tags | — | 18 · 0 · 0 | 42 · 0 · 0 |
| `[NO_CHANGE:]` turns | — | 10 (all answering the rations pick) | 3 |
| Companion lines (SAY) — Frizwick / Daeris / Morwen | — | 3 / 3 / 2 | 8 / 10 / 11 |
| Dead actors named | — | 0 | 0 |
| Invariants (HP bounds, XP monotonic) | — | ✅ (76→76) | ✅ (76→110 — a long rest at t2099 landed the owed levels, maxHp 96→110; #349's first sweep activation) |
| Story movement in 20 turns | — | bracelets finished, quest step closed, party departs Magnimar | rest, fight rune-giants at the Storval approach, two quest steps, wares at the Shore District |
| Transport | — | 0 errors, ~6 s/turn | 0 errors, ~8 s/turn |
| Cost / 20 turns | — | $1.96 | $0.57 |

## What the arm proved about the instrument

- The luna failure mode (prose halving, register wobble, a bare "**0 HP remaining**" line) is measurable from this fixture: the axes are prose mean and floor by thirds, mechanics-voice turns, engine-voice leaks, register slips, distinct tags, companion voice count. A model that passes the fresh-start sweep can still be judged here.
- The judge must separate picker artefacts from model behaviour (kind-labelled log entries make this one line of arithmetic). Without that split, sonnet-5 would have been mis-scored.
- Twenty turns from a 33k-token prompt cost $2 on sonnet-5 and $0.60 on gemini — cheap enough to run per candidate model on every menu revisit.

## What graduates

- **TODO #226 → closed.** The arm is built, run once on two models, and its verdicts are recorded here. Re-run it per the row's trigger (a new candidate model, a rung re-certification, the #220 Gemini-Pro trigger).
- **New row — the #306 picker's consumable branch loops on an item the engine keeps.** Ten of sonnet's twenty turns went to "I use my travel rations"; the branch should stop after a `[NO_CHANGE:]` answer or one use per item per run, and the harness should log the skipped kind so the audit can see it.
- **#349 levels-at-rest** — first sweep activation (gemini arm t2099: `[REST:long]`, maxHp 96 → 110, HP filled). Recorded on the archived row.
- **sonnet-5 engine-voice leaks** (two turns narrating "the engine") — stays on the play checklist; the mature prompt carries engine notes and sonnet quoted them. Compare on the next sonnet run before filing.

## Method notes

- Both arms used the account gateway; provider switched in-page (`activeProvider`, `providerModels.gemini = "gemini-3.7-flash"`), confirmed on the membar before each run.
- Costs are deltas on `worldState.usage.costUSD` against the fixture's stored cumulative ($206.36); the fixture inherits the live campaign's lifetime meter, so absolute numbers on the usage modal are not this run's.
- The raw capture installs after import, so both arms' raw sets are complete (20/20).
- The fixture campaign syncs to the owner's account under `fixture-226-mature-t2097`; delete it from the picker when convenient.
