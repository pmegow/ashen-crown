# Harper lens — findings against Traffic and Dragons (v1.848)

**First line, per the method:** this is a rubric of John Harper's *documented* design positions
([`harper_lens.md`](../harper_lens.md)), not the man. Every position cited carries its source and confidence
grade; the lens's largest hole — the Blades GM chapter is not in the evidence base — is declared in the
lens's §0 caution 1 and repeated in the gaps below.

**Surfaces read (no file modified):** `CLAUDE.md`; `DOC/contracts/{combat,clock,quests,prompt,memory}.md`;
`data.js` DEFAULT_RULES; `api.js` MECHANICS + STYLE tail + note builders; `tag_table.js` TAG_DOC_LINES;
`helpers.js` `downedChoices`; `game.js` `engineFourthAction` / `montageDue` / `restSpells`; `globals.js`
consequence constants. **Corpora:** `dev/corpus_playtest_v1847_sonnet5_344.json` (50 fresh-campaign turns,
sonnet-5, three fights and a 0-HP resolution), `dev/corpus_playtest_v1847_mature226_sonnet5.json` and
`_gemini.json` (20 late-game turns each from one t2097 save). Ninety GM turns in total.

---

## 1. The die is stamped after the outcome is written — nothing declares a stake before the roll

**Position applied:** 1.1, 1.2, 1.3 (● SRD action-roll / setting-position-effect), 7.6 (● *Lasers &
Feelings*: "Don't pre-plan outcomes—let the chips fall where they may").

**What the game does.** `api.js:2176` teaches the whole resolution contract in one sentence: "MECHANICS: DC
10=easy 15=moderate 20=hard. Always show dice with the specific stat or check name: `[DICE:…]`". There is no
rule for *when* a roll is called, no goal statement, and no risk declaration. `tag_table.js:740` files the
tag but never applies it — "the GM's `[DICE:label|total|outcome]` is FILED, never applied". Measured, the
roll is written into prose that has already decided: corpus t45 narrates "Steel bites deep, grinding on
bone" and then stamps `[DICE:Strength check|17|success]`; t46 narrates the stagger, then `[DICE:Strength
check|15|success]`, then `[DICE:Dexterity saving throw|6|failed]` followed by `[HP:-7]`. Twenty dice tags in
50 sonnet turns, twenty-nine in 20 gemini turns; not one appears before the sentence it justifies.

**Insight.** In Blades the roll is the *engine of surprise* — the GM sets position and effect, and then
nobody at the table knows what happens. Here the number is a receipt for a decision already made. That is a
settled and defensible product choice (the model is the narrator; the engine is the arbiter of state, not of
outcome), but it means the one thing the dice buy — the GM being surprised — is not bought. The already-built
`[CHECK:]` mode (#329, `tag_table.js:134`, "END your response there, before the outcome is known") is the
structural fix, and it ships off by default.

**Recommendation (S).** Do not change the dice contract. Add one clause to the MECHANICS line for the
`[DICE:]` branch: *before* narrating the roll, the response says what the failure would have cost. That is
the cheapest possible import of position — it makes the stake public even when the outcome is authored.
**Drift surface** (prompt text read by every turn) → Fable tier, A/B against a stable-half byte capture.

**Settled-ruling flag:** model-narrated dice are settled. Nothing here asks to change who rolls.

---

## 2. DC is the only dial — there is no effect axis, so every success is a whole success

**Position applied:** 1.3, 1.5 (● "nine combinations to choose from"; Trading Position for Effect), 2.3
(● a 1-3 may still carry partial effect), 9.2 (● L&F: "The GM inflicts a complication, harm, or cost").

**What the game does.** The engine can make an action *harder* (DC 10/15/20) and nothing else. There is no
vocabulary — prompt or tag — for a success that accomplishes less than the whole goal. Corpus evidence: of
the 20 `[DICE:]` outcomes in the 50-turn run, every one reads `success` or `failed`; `[SKILL_SUCCESS:]`
appears 8 times as a binary. Blades' worked example of limited effect ("you can get halfway across with this
action") has no expressible form here.

**Insight.** Effect is the axis that lets a scene take three turns without three failures. Without it, a
turn either resolves the obstacle or does not, which pushes the GM toward two bad habits it already shows:
resolving everything in one beat, and padding when it should not resolve yet (finding 8). Harper's cheapest
version of the whole idea is one line of L&F: on a marginal result the GM adds a complication, harm, or cost.

**Recommendation (S).** One sentence in MECHANICS: a success may be partial — say what was achieved and what
remains. No new tag, no parser change, ~25 tokens. **Drift surface** → Fable tier.

---

## 3. The engine owns the best progress clock in any of these designs, and the GM never starts one

**Position applied:** 3.1, 3.3, 3.4, 3.5 (● SRD progress-clocks: "the approach of impending trouble"; "When
the clock is full, the danger comes to fruition"; "A clock is like a speedometer in a car").

**What the game does.** `clock.js` gives the GM a strictly better instrument than a hand-drawn circle:
`[SCHEDULE:label|when]` registers a real deadline, the engine recomputes the countdown every turn, and the
doc line is explicit — "set it ONCE and never restate the number" (`tag_table.js`, SCHEDULE doc line). The
measurement: **across all 90 corpus turns, zero new `[SCHEDULE:]` and zero new `[FUTURE_EVENT:]` tags were
emitted.** The only clock traffic is resolution of things filed earlier (`[FUTURE_EVENT_RESOLVED:]` ×2,
`[SCHEDULE_RESOLVED:]` ×1, gemini run). Fifty turns of a fresh campaign — three fights, an abduction into a
fighting pit, a named villain hunt — produced no ticking anything. `NOTE_BUILDERS` has
`buildScheduleEscalation` for the *firing* end and `buildCommitmentNudge` for money-and-obligation
commitments; nothing observes prose for a **danger** with a stated horizon.

**Insight.** Pressure exists here as capability, not as practice. Harper's clock is not bookkeeping — it is
the only way a threat can be *approaching* rather than arriving. And it fits this owner's taste precisely:
a clock is a speedometer, a readout of the fiction, which is exactly the distinction behind the ledger ban
(data driven by the story, never a story driven by data).

**Recommendation (M).** Extend the existing commitment observer's axis to threats: when committed prose
states a deadline-shaped danger ("before the tide turns", "by dawn", "three days until the moon is full")
with no `[SCHEDULE:]` in the same response, arm a one-shot engine note asking for the tag or for an explicit
"no clock". Same shape, same latch discipline, same combat-silence rule as `buildCommitmentNudge`.
**Drift surface** (engine note + clock lifecycle) → Fable tier; sabotage clause required.

---

## 4. Every consequence in the vocabulary is a number

**Position applied:** 2.1 (● five named consequence types), 2.6 (● harm is described and degrades), 4.1
(◐ Q: "Stress is like HP, but you spend it to avoid bad consequences").

**What the game does.** The consequence tags are `[HP:]`, `[GOLD:]`, `[ITEM_LOST:]`, `[ENEMY_HP:]` and
`[CONDITION:name|duration|cause]`. Four of Harper's five kinds — reduced effect, complication, lost
opportunity, worse position — have no engine surface at all. The one that maps (`[CONDITION:]`, which even
carries the *cause*, "ALWAYS name the cause so the sheet carries the why") is measured at **2 uses in 50
turns, and 0 in either 20-turn mature run**. In the 50-turn run the only non-HP costs that landed were a
`[RELATIONSHIP_DYNAMIC:]` shift and a `[CONDITION:Dazed]`.

**Insight.** When hit points are the only currency, "things got worse" can only be spelled as "you have less
HP", so a scene without violence has no way to tighten. The lens's charge is not that the game lacks tags —
`[CONDITION:]`, `[RELATIONSHIP_DYNAMIC:]`, `[LOCATION_STATE:]`, `[WHISPER:]` and the quest objectives are
between them a complete consequence grammar — it is that **nothing teaches the GM that they are consequence
tools.** They are documented as bookkeeping.

**Recommendation (S).** In the DRIVE rule (`data.js:108`), which already says the player "can fail, bleed,
and lose", name the non-HP costs explicitly: a failed or partial action may cost position, an opportunity, a
relationship, or the state of a place — and those have tags. **Drift surface** → Fable tier.

---

## 5. The downed ladder *is* the consequence ladder, and the corpus proves it works

**Position applied:** 2.2 (● "The situation always changes after a roll"), 2.4 (● resistance: the player
owns severity), 4.2 (● "you're taken out of action"), 4.4 (● death is rare and close to consented).

**What the game does.** `globals.js:149` `DOWNED_MAX_TURNS=3`; `tag_table.js:408` latches
`worldState.downed` at 0 HP; `helpers.js:1240` offers exactly two moves — "Struggle — fight for
consciousness…" / "Yield — let go and trust whoever finds you"; `api.js:718` hands the GM the escalation and
the resolution vocabulary, naming which companions are present and able to intervene. Measured at t46–47 of
the 50-turn run: `[HP:-7]` puts the hero down, the player's own move is `downed-struggle` (one of only
two non-random actions in the whole 50-turn log, the other being a rest), and the resolution is fiction, not arithmetic — "He does not finish it."
followed by an NPC calling the fight off, then `[DOWNED_RESOLVED:intervened|the hooded figure called off the
killing blow…]`, `[HP:+4]`, and a `[LOCATION_STATE:]` marking the blood-soaked pit floor. The next turn
opens in a cell, not at a respawn.

**Insight.** This is Blades' shape, arrived at independently: taken out of action rather than killed, the
severity partly in the player's hands, the fiction supplying the out, and a permanent mark filed (the engine
files the scar as a Defining Moment). It is also the only place in the game where the player can push back on
a consequence at all — which is why finding 4 matters: the ladder is excellent and it only opens at zero.

**Recommendation: no change.** Protect the wording of `downedChoices` and the two-then-one escalation in
`buildDownedNote`; they are load-bearing.

**Settled-ruling flag:** three-turn downed grace, death walk and plot armor are settled. The lens endorses
the ladder on its own terms, not merely as a settled fact.

---

## 6. Nothing tells the GM to telegraph — the blow lands in the turn that announces it

**Position applied:** 7.4 (● L&F: "Introduce the threat by showing evidence of its recent badness";
"Before a threat does something to the characters, show signs that it's about to happen").

**What the game does.** `data.js:108` (DRIVE THE ADVENTURE) is the danger doctrine: "Introduce threats,
hooks, omens, monsters, and strange discoveries on your OWN initiative… DANGER IS REAL: antagonists scheme,
ambush, resist, and fight". It orders threats to arrive; it never orders the wind-up to precede the strike.
A repository-wide grep of `data.js`, `api.js` and `tag_table.js` for telegraph/foreshadow language returns
only the FUTURE EVENTS rule (honour promises you already made) and CANON IS NOT CONVERSATION (do not leak
canon early) — both about *not* saying things. Measured: t44 introduces the Branded Fighter and he charges in
the same paragraph ("He answers by lowering his shoulder and charging"); t45 opens with the exchange already
joined.

**Insight.** Telegraphing is what converts a hit into a *choice*. It is also the difference between a
consequence and an ambush, and this game has an unusual reason to want it: the player sees three suggestion
buttons after every turn, so a telegraphed threat automatically becomes a menu with real stakes on it,
whereas an untelegraphed one becomes a menu of reactions to something already done. The DRIVE rule's own
goal — "a scene with no stakes is a failed scene" — is better served by the wind-up than by the blow.

**Recommendation (S).** One clause appended to DRIVE: a serious threat shows itself before it strikes — the
evidence of what it has already done, then the sign that it is about to act, then the player's move. Costs
about thirty tokens and changes no parser. **Drift surface** → Fable tier; the natural validation is a
before/after playtest counting turns where a threat's first appearance and its first damage are the same
turn.

---

## 7. The reckless wildcard is a Devil's Bargain with the price left blank

**Position applied:** 1.7 (● "The Devil's Bargain occurs regardless of the outcome of the roll"; "always a
free choice"), 8.1 (● xp is paid for taking the risk, not for winning).

**What the game does.** `game.js:166` `engineFourthAction` offers "Do something reckless." every
`WILDCARD_EVERY`=7 turns; choosing it arms `recklessPing` → `buildRecklessNote` (`api.js:679`): "REWARD the
choice: let it work spectacularly or fail spectacularly — never mundanely, never punished for the choosing.
Big consequences, new stakes, a door opened that caution would have kept shut." Measured at t23 of the
50-turn run: the player seizes a guardsman's cloak, `[DICE:Intimidation check|19|success]`, the information
is handed over, and the cost arrives as a closing clause of narration — "you have made an enemy of his
pride" — plus `[NPC:Orvun Islevane|shaken, resentful|wary acquaintance]` and a
`[RELATIONSHIP_DYNAMIC:]`. A real cost, filed in a real tag.

**Insight.** This is close to Harper's bargain and lands better than most engine-authored buttons do (the
owner has field-validated the fourth button; treat its wording and triggers as protected). The one structural
difference is worth naming: in Blades the price is **stated before the player commits and paid regardless of
the roll** — that is what makes it a bargain rather than a bonus. Here the cost is discovered afterwards, in
the same breath as the reward, which over many turns teaches the player that recklessness is free. The note's
own phrasing invites that reading: "never punished for the choosing" is true of Blades' bargain too, but only
because the player named the price first.

**Recommendation (XS).** Leave the trigger, the cadence and the button text exactly as they are. Add one
clause to `buildRecklessNote`: the cost must be **named in the prose as the character commits**, before the
outcome is known — not discovered in the aftermath. **Drift surface** (engine note) → Fable tier; the note is
one-shot and latch-declared, so the change is contained.

---

## 8. Downtime is played at score prices, and the montage arrives after the money is spent

**Position applied:** 6.1 (● "we take out a different toolbox and resolve downtime on its own terms"), 6.2
(● "Downtime gives them a reprieve so they can catch their breath"), 5.1 (● "cut to the action"), 5.5
(◐ Q: "designed so you can get to the scores quickly").

**What the game does.** The mature sonnet run is four consecutive turns of forge work — t2098 eat rations,
t2099 ask who is spreading a rumour, t2100 "There's nothing left to eat but the forge-heat", t2101 pump the
bellows — each a full-price GM turn with a full prompt. Ten of that run's twenty turns carry `[NO_CHANGE:]`;
the run emits zero `[DICE:]`, zero `[CONDITION:]`, and one `[XP:]`. The engine's own answer exists: #308's
montage, offered by `engineFourthAction` when `montageDue()` is true — but `montageDue` requires
`MONTAGE_AFTER_TURNS`=6 committed turns with no combat, movement, rest or time-skip tag first
(`globals.js`, `game.js:180`). By the time the offer appears, six turns of score-priced narration have
already been billed for downtime content.

**Insight.** Blades' phase split is an economic design as much as a dramatic one: the quiet material is
resolved with a *different, cheaper* toolbox so the table's attention (and here, the API bill) is spent on
the parts under threat. This product already agrees — the montage, the wrap-up note and the Car Mode bookends
are all phase-transition tools. The disagreement is only about the threshold, and the tag log already knows
what downtime looks like: `[NO_CHANGE:]` present, no dice, no combat, no movement, same sublocation.

**Recommendation (S).** Make `montageDue` cheaper to trigger on the *signature* rather than the count — e.g.
three consecutive turns whose tag sets contain no dice, no combat, no movement and at least one
`[NO_CHANGE:]` — keeping the existing six-turn rule as the fallback for quiet-but-tagged stretches. Constant
plus predicate; `montageDue` is already pure over the tag log and testable headlessly.

**Settled-ruling flag:** no convalescence and free long rests are settled; this finding is about turn
*framing*, not about healing time.

---

## 9. "Offered is not active" is Harper's opportunity principle, already in code

**Position applied:** 7.3 (● "present interesting opportunities to the players, then follow the chain of
action"), 3.2 (● a clock names the obstacle, not the method).

**What the game does.** `DOC/contracts/quests.md`: "An offered quest is NOT a goal — the GM may not steer
toward or advance it" until the player accepts, in the journal or in the fiction; auto-accepting is banned in
DEFAULT_RULES; and #191 rules that objectives are **outcomes**, so "an objective achieved or mooted by ANY
means" checks off. `buildQuestBlock` re-injects the authoritative list every turn so the offer cannot quietly
become a plan.

**Insight.** These two rules are, almost word for word, the Basics chapter's description of the GM's job and
the progress-clock rule about obstacles versus methods — reached from a completely different direction (drift
control). It is worth recording because it is the strongest structural agreement between this engine and the
lens, and because it is exactly the counterweight the product should cite when the skeleton is challenged as
"direction": the spine proposes, the player disposes, and the engine enforces the difference.

**Recommendation: no change.** When the skeleton's direction is defended in a future review, defend it *with
this* — it is the mechanism that keeps the authored spine from becoming a rail.

---

## What the Harper lens would actually take from this game

1. **The campaign clock is a better progress clock than a drawn circle** — one monotonic scalar, durations
   the GM never restates, countdowns recomputed every turn (`clock.js`). Harper's clock relies on a human
   remembering to tick it; this one cannot drift. It is wasted only because nothing starts one (finding 3).
2. **The downed ladder plus Death's one question is a designed consequence scene** — out of action, two
   player moves, a fiction-supplied resolution, a permanent mark, and a single mandatory-canon question at
   the true death. That is a tighter loop than trauma-plus-retirement, and it works solo.
3. **The affordance gate is fiction-first enforcement that a human table can only manage by agreement** —
   "you can't roll an action you aren't performing" becomes a rule that mechanically cannot be broken, down
   to refusing a spell nobody on the sheets owns (#343).

## Verification gaps

- **The Blades GM chapter was never read** (lens §0 caution 1). Findings 6 and 9 rest on *Lasers & Feelings*
  and the SRD Basics chapter instead of the goals/actions/principles list, and no finding may cite "be a fan
  of the PCs" or claim the GM chapter says anything.
- **Deep Cuts' revised Action, Harm and diceless-Downtime systems are unread** (paywalled; only Harper's own
  product-page description was verified). If they revise position/effect or partial success, findings 1, 2
  and 8 may be arguing against a superseded version of his own design.
- **Corpus size.** Ninety turns from three runs, two models, two saves. The zero-`[SCHEDULE:]` result
  (finding 3) is strong because it is unanimous across both models and both campaign ages, but it is not a
  census of the live 2,437-turn campaign — a `dev/tag-census.js` pass over the real save would settle it.
- **Live-save behaviour unmeasured.** All findings about frequency (conditions, dice, `[NO_CHANGE:]` density)
  come from harness runs driving random actions, which under-represent a real player's deliberate pressure
  and over-represent aimless turns. Findings 4 and 8 should be re-measured against the owner's own transcript
  before any prompt change ships.
- **No `[CHECK:]`-mode corpus exists.** Finding 1's recommendation competes with a shipped, defaulted-off
  feature (#329) that solves the same problem structurally; nobody has yet played fifty turns with it on.
