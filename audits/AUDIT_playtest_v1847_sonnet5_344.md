# AUDIT — playtest v1.847, claude-sonnet-5 via the gateway — the #344 in-band buttons run

**Run.** 50 driver iterations / **50 real GM turns** on the standard campaign (`samples/modeltestcampaign.blueprint`, tone `swords`, Howard voice, the Korrag template), campaign `camp_1788815204942_4613` (`modelTestCampaign_sonnet5_344`) on the owner's account — a throwaway. Commissioned 2026-09-07 by the owner ("run a sonnet-5 playtest against 344, budget it from the allowance") to close TODO #344 after the v1.847 fix. Corpus: [`dev/corpus_playtest_v1847_sonnet5_344.json`](../dev/corpus_playtest_v1847_sonnet5_344.json) (log + raw GM responses + meta). **Cost $1.88** (62 calls; turn $1.72, summarize $0.15, actions **$0.008**) against the v1.823 baseline of $2.46 — the allowance stands at $25/week, this run and the 2026-09-05 baseline together ≈ $4.34.

**Verdict.** **#344 is closed: 50/50 narrative responses carried `[SUGGEST:a|b|c]`, it was the LAST tag on 50/50, with exactly three actions on 50/50, and the second suggestion call ran exactly once — at the opening, before any narrative turn.** The row's exit criterion was ≥45/50 in-band with the actions bucket ≈ $0; the run delivered 50/50 and $0.008. The root cause was the STYLE tail (the end-of-prompt authority slot) still forbidding "ending with suggested actions … or an [ACTIONS:] tag" — the exact opposite of the #328 doc line forty thousand characters earlier. Gemini followed the doc line; sonnet-5 followed STYLE. With the STYLE sentence carrying the in-band ask, sonnet-5 complied on every turn and the miss note (`buildSuggestMissNote`) never had to fire. The engine contract held alongside: 0 zero-tag turns, 46 distinct tags, no unknown tags, no invariant breaks, 10 summarize cycles, and — a first — the #300 downed ladder fired live and resolved.

## Checks

| Check | Result | Evidence |
|---|---|---|
| **#344 in-band buttons on sonnet-5** | ✅ **50/50** | `[SUGGEST:]` in 50/50 raw responses; the last tag on 50/50; exactly three actions on 50/50; console `[actions] #328 in-band buttons used — no suggestion call` on every narrative turn; `suggestMissPing` never armed (0 miss notes in the note ring). v1.823: 0/50 |
| #304/#344 suggestion-call cost | ✅ | actions bucket **1 call, $0.008** (the opening's buttons — the narrative-turn path never fell through). v1.823: 51 calls, $0.56. Total $1.88 vs $2.46 (−24%) |
| Invariants (HP bounds, XP monotonic, summarize cycles) | ✅ | 0 breaks over 50 log entries; HP 14→23 at the L2 landing; XP 0→278 monotonic; sessionTokens peaked 3,010 and cycled down 10× (10 chapters filed); `errors[]` empty |
| Zero-tag turns | ✅ | 0/50 |
| Unknown-tag census (`dev/tag-census.js`) | ✅ | none. WORKING 3 · RARE 41 · NEVER 70 on this corpus alone |
| Combat lifecycle | ✅ | three fights (t4–7, t30–31, t44–45): COMBAT_START ×3 + COMBAT_STATS ×3, ENEMY_SLAIN ×4, COMBAT_END ×2, COMBAT_ROUND/RESIST once each; `combat` clear at the end of the run |
| **#300 downed ladder — first live activation** | ✅ (new evidence) | HP reached 0 mid-run; the #306 scripted layer took the `downed-struggle` pick; `[DOWNED_RESOLVED:]` emitted once; the hero recovered (23/23 at t50). Both feature-usage audits (2026-09-06) had listed the ladder as never fired in any record — this run is its first field receipt |
| #306 scripted picker kind mix | ✅ | random 48 · downed-struggle 1 · rest 1 (rest under a third HP fired once, correctly, after the fall) |
| Quest lifecycle | ✅ | QUEST ×4 / QUEST_STEP ×5, one `ARC_COMPLETE`; *The Gilded Cage* active at t50; XP ×4 clamped by the engine |
| #316 prose length | ⚠ watch | 889 → 1,295 → 1,036 chars/turn by thirds, mean 1,074 (v1.823 mean 808). The middle third is the two-fight stretch; still above the v1.823 run. Not a regression the #344 change explains (STYLE's length clause is untouched); log it against the next sonnet run |
| #355 register guard | ✅ | 0 register slips across 50 turns (`registerSlips` absent) |
| #357/#359 companion lines | — not exercised | no party member on the standard campaign |
| Transport | ✅ | 0 failed turns, 0 back-offs; ~9 s/turn on the gateway (v1.823: ~22 s) |

## What graduates

- **TODO #344 → closed** (this audit is the exit receipt). The fix (v1.847, commit `a6e9fa2`): STYLE carries the in-band ask when the setting is on; `generateActions` arms `suggestMissPing` on a miss; `buildSuggestMissNote` asks once on the next turn.
- **#300 downed ladder** — record the first live activation on its row; the feature-usage audits' "never fired" entry is now dated.
- **Prose length on sonnet-5** — stays on the play checklist; compare on the next sonnet run before filing.

## Method notes

- Throwaway campaign; the owner may delete `camp_1788815204942_4613` from the campaign picker.
- The harness's raw capture installs after the opening, so the opening response is not in `raw[]`; the actions bucket's single call is that opening.
- No game code changed by the run; the corpus and this audit are the only artifacts.
