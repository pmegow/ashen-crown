# Panel review — the Baker lens on Traffic and Dragons

**Caveat, first line.** This is a review written through [`baker_lens.md`](../baker_lens.md), a rubric of
Vincent Baker's *published craft positions*. It speaks as "the Baker lens", never as Baker, and it cites the
lens entry it applies. Positions graded ◐ inform questions, never verdicts. Settled owner rulings are
recorded as dissent and not relitigated.

**Surfaces reviewed.** `data.js` DEFAULT_RULES · `api.js` `buildSysPrompt` / STYLE tail / `NOTE_BUILDERS` ·
`game.js` `generateActions` and `engineFourthAction` · `helpers.js` `resolveCheck` · `tag_table.js`
`TAG_DOC_LINES` · `DOC/contracts/{prompt,tags,quests,combat,identity,memory}.md`.

**Corpus.** 90 real turns, all measured: **S226** = `dev/corpus_playtest_v1847_mature226_sonnet5.json`
(20 turns, T2098–2117) · **G226** = `dev/corpus_playtest_v1847_mature226_gemini.json` (same 20 turns, gemini)
· **S344** = `dev/corpus_playtest_v1847_sonnet5_344.json` (50 turns, fresh campaign, includes the 0 HP
sequence). Corpus quotes are capped at fifteen words.

---

## 1. Ninety turns of play cost the character almost nothing

**Position applied** — 8.1 ● ("the purpose of an rpg's rules is to create the unwelcome and the unwanted",
`ANY-360`), with 8.6 ● (a miss is a real fork: "a worse outcome, a hard bargain, or an ugly choice") and
2.2 ● ("What honesty demands").

**What the game does — measured.**

| | turns | turns with any negative HP/gold delta | narrated rolls | rolls failed |
|---|---|---|---|---|
| S226 | 20 | **1** (a 2-gold food purchase) | 0 | — |
| G226 | 20 | **0** (HP 110/110 for all 20 turns) | 29 | **0** |
| S344 | 50 | 3 (all inside one 3-turn fight) | 20 | 6 |

Across all 90 turns gold moves a **net +33** and only one of the four gold events is an outflow. The rule
that should prevent this already exists and is emphatic — `data.js:108`: *"The player can fail, bleed, and
lose; death must remain possible. Never shield the player from consequences."* It is a standing exhortation
with no mechanism behind it.

The mechanism gap is one function. `helpers.js:79` `resolveCheck` produces exactly four outcome strings —
`success`, `failed`, `critical`, `fumble` — and against a DC only the first two are reachable. The
model-narrated path is no better: `tag_table.js` teaches `[DICE:label|result|outcome]` with no vocabulary
for a cost. There is **no partial success, no success-at-a-price, and no consequence tag anywhere**: the
closest thing in 90 turns is one `[RELATIONSHIP_DYNAMIC]` (S344 T23, *"you have made an enemy of his pride,
and pride is a debt"*) — which is prose only, never fires again through T50, and is the single instance in
the corpus.

Risks are narrated and then evaporate. G226 T2102 names the exact threat — *"guard our blood from the
freezing air, but not the stone giants' clubs"* — and three CR-7 giants die over T2107–T2110 without a club
ever landing. G226 T2116 has a CR-16 boss declare *"Insolent insect! I will flay your soul into ash!"* and
then take no action in either combat round.

**The insight.** The game has an honesty problem, not a difficulty problem. It states stakes fluently and
settles them at zero, which trains the player to stop believing the prose. Baker's answer is not "make it
harder" — it is that a rule which cannot produce an outcome the table would reject is decorative (8.3 ●).
Every existing cost lever (`ITEM_LOST`, `GOLD`, `CONDITION`, `HP`) is reachable only through the model's
free choice, and the model's revealed preference over 90 turns is to spend none of them.

**Recommendation — M.** Give failure a vocabulary. Two pieces, in order:
(a) extend the outcome token to a third value — `success` / `cost` / `failed` — in `resolveCheck` and in the
`[DICE:]` tag doc, with one line of guidance ("`cost` means it works and something is spent, taken, broken,
or made worse — name it in the same response"); (b) an engine note that fires when N committed turns pass
with no negative HP/GOLD/ITEM_LOST/CONDITION tag, asking for one price to land. This is drift-surface work
(tag vocabulary + parser + prompt doc) → **Fable tier**, test-first.

**Settled rulings touched:** none. Model-narrated dice stay; this changes what the model may *say* about a
roll, not who rolls it.

---

## 2. The engine has sixty-four moves and forty-seven of them are about the filing cabinet

**Position applied** — 4.1 ● (the MC's moves are a closed list and every one is a fictional event), 4.2 ●
("Announce future badness" / "Announce off-screen badness"), 4.3 ● ("Tell them the possible consequences and
ask"), 4.5 ● ("Take away their stuff" / "Activate their stuff's downside"), 4.6 ● ("Turn their move back on
them").

**What the game does — measured.** `api.js:1786` `NOTE_BUILDERS` holds **64 builders**, each with a declared
shape in `NOTE_SHAPES` (`api.js:1795-1860`), a delivery cap of 3 (`globals.js:104`), a 2500-char budget, and
a shared protocol trailer (`api.js:1877`). Structurally this *is* Baker's move list: a closed, ordered,
contract-tested set of things the referee may do to the fiction. It is the best-engineered part of the
system and it is the correct shape.

Classifying the 64 by what they ask for: **14** move the fiction (DeathScene, PlotArmor, Downed, Respawn,
Reckless, Montage, WrapUp, Whispers, the three Agenda notes, ArcStaging, PrincipalStage, ScheduleEscalation),
**3** are prose directives (Register, MpEnd, PersonDrift), and the remaining **47** ask the model to repair,
confirm or audit a record — SplitAudit, PresenceAudit, ConditionAudit, MoodAudit, RelationshipAudit,
MergeConfirm, DupItem, ItemMis, Consumable, DeadStatus, CanonContradiction, and so on.

Not one of Baker's fourteen fictional moves has an engine surface. There is no note that announces future
badness, no note that takes something away, no note that offers an opportunity with a cost, no note that
turns the player's own approach back on them.

**The insight.** The registry was built to keep the *records* honest and it does that superbly — that is the
anti-drift mission and it is validated. But the same machine is the only channel the engine has for talking
to the GM, and it currently uses it almost exclusively to ask *"is your paperwork right?"* A GM whose only
incoming pressure is bookkeeping will produce bookkeeping-shaped play, which is exactly what finding 1
measures. Note the irony against `data.js:110` ("NEVER ADMINISTRATIVE"): the fiction is forbidden
administration while the engine's own voice is almost nothing else.

**Recommendation — M.** Add a small **consequence-move table** — five or six entries, in the established
registry shape, one of which is selected when the engine detects a costless stretch (finding 1b), rather
than one new note per idea. Candidate entries, all already expressible in existing tags: *take something*
(`ITEM_LOST`), *activate a downside* (`CONDITION`), *announce off-screen badness* (`SCHEDULE` +
`FUTURE_EVENT`), *put someone in a spot* (a named NPC acts), *name the price and ask* (a `[SUGGEST:]` option
carrying a stated cost). Drift surface → **Fable tier**.

**Settled rulings touched:** none.

---

## 3. In ninety turns the GM never once asks the player what they do

**Position applied** — 4.9 ● ("After every move: 'what do you do?'"), 2.3 ● ("says what happens, and asks you
what your characters do next"), 3.4 ● ("Ask provocative questions and build on the answers"), 4.3 ● ("Tell
them the possible consequences and ask").

**What the game does — measured.** The final sentence of all 90 narrations was sampled. **0 of 90** end with
a prompt to the player. Two end on a question mark, both NPC dialogue (S344 T20 *"Which are you?"*). Turns
that leave an antagonist mid-motion: S226 **0/20**, G226 ~0/20, S344 ~11/50. The dominant closer in S226 is
a static tableau restating the unchanged world (T2108: the forge still roars, the bracelet still glows); in
G226 it is a companion announcing the plan the player is about to execute (T2111, Daeris: *"Karzoug's
mountain waits. Let us see if his throne can bleed."*).

The handoff is delegated entirely to the buttons — mandated by the STYLE tail (`api.js:2221`, in-band
`[SUGGEST:]`) and `tag_table.js:133`. Whether that constitutes a question depends on whether the three
options differ. Measured: S226 repeats an entire suggestion set **verbatim on three consecutive turn pairs**
(T2107=T2108, T2109=T2110, T2111=T2112) and repeats **19 of 57** individual options from the immediately
previous turn. T2106's set is *"Return to the bellows | Push through and keep working | Ask how much longer
until dawn"* — two of the three are the same act. G226 T2117 offers three weapon skins on one attack.
Options that decline, withdraw or accept a loss: **~8 of 90 sets (9%)**. Sets where an option carries a
stated price: **one** (S344 T22, *"Pay him the twenty gold | Refuse and push past him"*) — and the priced
branch was the one the player skipped.

Neither surface polices divergence. `SUGGESTION_MODE_BLOCK` (`game.js:92-100`) forbids inventing doors and
spoilers and limits spells to one of three, but says nothing about the three differing in *approach* or
*risk*; the in-band path — the default since #328 — has no gate at all beyond `applySuggestionGate`'s
affordance check (`game.js:593`).

**The insight.** A menu is a legitimate substitute for "what do you do?" only when choosing between the
entries is a decision. Three synonyms for *keep bellowing* is a closed handoff dressed as an open one, and
the player learns to press whichever is first. Note that the engine already knows this rule and applies it
in exactly one place — the montage note (`api.js:671`) demands the passage *"LANDS at the next real decision
… where you stop and hand the choice back."*

**Recommendation — S.** One clause in the in-band `[SUGGEST:]` ask (`api.js:2221`) and its tag doc
(`tag_table.js:133`): the three must differ in *approach or risk*, not only in verb — and at least one
should be a way to withdraw, wait, or pay. Optionally a cheap engine check for a repeated set (S226 caught
three) that arms an existing-shape note. Drift surface (prompt + tag doc) → **Fable tier**.

**Settled rulings touched:** the three buttons plus the engine fourth stay — this changes their content
requirement, not their existence.

---

## 4. NPCs have moods where they need impulses

**Position applied** — 5.1 ● (every threat carries a one-line impulse: *"Slaver (to own and sell people)"*),
3.2 ● ("Name everyone, make everyone human"), 6.2 ● ("Put it in your NPCs' hands"), 5.6 ● (essential threats
derived from what the PC has to lose).

**What the game does — measured.** The only per-NPC state the prompt carries is a **mood** — `[NPC:name|mood|
disposition]` (`tag_table.js:117`), refreshed by `buildMoodAudit` on a 12-turn window, plus a bond/stance
label (`api.js:1946-1947`). A mood is 2–4 words for a *current emotional state*. There is no field anywhere
for what a non-party NPC **wants**.

Companions have exactly the right thing: `api.js:2008` injects `Wants: <want> [<kind>]`, born through
`AGENDA_BIRTH_CHANCE` (`globals.js:130`) and pushed by three registry notes. Blueprint-authored NPC agendas
are even *transferred onto* companion sheets at recruitment and then deleted from the NPC record
(`helpers.js:173-176`) — the engine takes a want away from the world and gives it to the party.

Everything else is exhortation: `data.js:108` asserts *"antagonists scheme, ambush, resist, and fight"* with
no state behind it. The corpus shows what that buys. In S226 and G226 the NPCs are effectively reactive:
S226 has **one** unprompted world event in 20 turns, and the model lampshades the stasis at T2107 — *"That's
the fifth time you've gone digging in that bag."* G226's companions speak every turn only to endorse the
move the player is about to make; the boss speaks twice and never acts. On-screen named non-party NPCs: **1**
in S226, **2** in G226, against 68 on the roster.

S344 is the counter-case and it is the better corpus by every other measure too. Its NPCs initiate: T4,
unprompted mid-standoff, *"breaks formation with a short barking laugh and lunges for the nearest drover"*;
T6 the same NPC re-plans; T40 the antagonist advances the plot unasked — *"Nolan Grimtide sends his
regards… He was only the first debt."*

**The insight.** This is the lens's highest-leverage miss because the machinery already exists and points
the wrong way. One line of standing want per on-screen NPC is what lets the GM *defer* instead of decide
(6.2) — without it, "disclaim decision-making" has nothing to disclaim *to*, and every world event has to be
invented by whim at the moment it is needed. It is also the cheapest route to finding 1: an NPC who wants
something will take something.

**Recommendation — M.** Add one optional `want` line to the ACTIVE NPC DETAILS block, written by a new tag
in the established shape (`[NPC_WANT:name|one line]`), with the same never-manufacture discipline the
companion agenda already carries (owner ruling 2026-09-05: only lived history births a want). Do **not**
build a threat-kind taxonomy in the first pass — one free-text impulse per on-screen NPC is the whole idea.
Drift surface (identity + prompt + tags) → **Fable tier**.

**Settled rulings touched:** none.

---

## 5. Calibration — the fourth button and the montage note are already Baker moves

**Position applied** — 4.4 ● ("Offer an opportunity, with or without a cost"), 6.3 ● ("Put it in the players'
hands"), 4.9 ●, 8.4 ● (the magic trick).

**What the game does — measured.** `engineFourthAction` (`game.js:166-178`) is an eight-branch ladder that
derives one action from state with no token spend: rest when below half HP → offer the ending when every act
is complete → use a defined consumable when hurt → accept an offered quest → buy a want that is physically
in the scene → montage after 6 quiet turns (`MONTAGE_AFTER_TURNS`) → the reckless wildcard every 7th turn
(`WILDCARD_EVERY`) → nothing. Two of the labels round-trip into engine notes: `montageArmIfChosen` and
`recklessArmIfChosen` (`game.js:189-190`).

`buildRecklessNote` (`api.js:681`) then says: *"REWARD the choice: let it work spectacularly or fail
spectacularly — never mundanely, never punished for the choosing."* That is 4.4 almost verbatim — an
opportunity offered with an explicit refusal to make the offer a trap. `buildMontageNote` (`api.js:671`)
demands the passage *"LANDS at the next real decision … where you stop and hand the choice back"* — the only
implementation of 4.9 in the codebase.

The disclaim-decision-making family (6.3) is genuinely well served: quest acceptance is fenced (`data.js:122`,
*"NEVER auto-accept on the player's behalf"*), the ending is *"offered to them, not to you"* (`api.js:2262`),
item canon is proposed and the player confirms (`tag_table.js:150`), and a refused arc close returns to the
player as an offered quest (`api.js:1161`). Four independent instances of Baker's second disclaim tool, each
built deliberately.

**The insight.** The engine already contains the vocabulary the rest of this review is asking for. The gap
is not conception, it is **reach**: the "hand the choice back" clause fires on one of eight branches, and the
"never mundanely" clause on one turn in seven.

**Recommendation — no change** to the fourth button; **XS** to extend the montage note's landing clause into
the general turn contract (one sentence in the role block or the `[SUGGEST:]` ask, which finding 3 is
already amending). Record this section as calibration: on the disclaim axis the game scores better than most
tabletop products the lens is drawn from.

**Settled rulings touched:** none.

---

## 6. The downed ladder does the first half of the magic trick and stops

**Position applied** — 8.4 ● ("make combat feel genuinely risky without killing PCs off all the time"), 8.5 ●
("you get to make it the bad or terrible outcome you can live with").

**What the game does — measured.** S344 T44–T48, the only 0 HP sequence in the corpus:

- **T44** — the player steps into a pit fight; `[COMBAT_START:Branded Fighter|18|13|4|1d8+3|hostile]`, exit
  sealed.
- **T45** — the hero's attack **succeeds** (`Strength check|17|success`, `ENEMY_HP:-9`), then a *defensive*
  save fails: `[HP:-6]`. 7/14 → 1/14.
- **T46** — attack **succeeds** again (`ENEMY_HP:-11`), second defensive save fails: `[HP:-7]`, floored to 0,
  `[CONDITION:Dazed]`. Prose: *"you feel your knees start to go even as you fight."*
- **T47** — the downed turn. `buildDownedNote` (`api.js:716-719`) takes the wheel; the engine overrides the
  model's own three-option `[SUGGEST:]` and renders exactly two buttons, *Struggle* and *Yield*. Struggle is
  chosen; the CON save **succeeds**; the foe declines the kill on his own and a third party cancels the
  stakes — *"He does not die tonight."* `[DOWNED_RESOLVED:intervened|…]`, `[HP:+4]`.
- **T48** — one long rest returns the hero to **23/23**, a *higher* maximum than he entered the fight with.

Two structural facts. First, the hero is never out-fought: he wins both attack rolls and drops purely from
two failed saves, so combat is modelled as *the player failing to dodge* rather than the foe succeeding —
and across S344 the player's defensive saves fail **4 of 4** while offensive rolls land **13 of 15**. Second,
the ladder's four exits (`captured` / `rescued` / `intervened` / `dead`) carry **no cost dimension at all**.
Net durable consequence of hitting zero hit points: a change of scene and a new hook. No gold, no item, no
quest step, no lasting condition — T47/T48's own suggestions already offer ordinary exploration.

**The insight.** The design *goal* here is Baker's own, stated in his words: risk that feels real without
killing PCs off all the time. The lens signs the settled ruling. What is missing is the half that makes the
trick work — in Baker's dice you survive **by choosing which thing you sacrifice**, and the sacrifice is
real. Here survival is free, so the second time a player reaches zero they will already know it is free, and
the fear the whole ladder exists to produce stops being available.

**Recommendation — S.** Give `DOWNED_RESOLVED` a price. Simplest version that changes nothing structural:
extend the downed note to require one named cost alongside the resolution — a lost item, a lasting condition,
a broken promise, a foe who now owns something — and let the **player's** Struggle/Yield choice select which
kind of cost they take. That converts an existing binary button into the choose-your-loss moment the ladder
was built for. Drift surface (note + tag) → **Fable tier**.

**Settled rulings touched:** the three-turn downed grace and the death walk **stay** — this adds a price to
survival, never a death. Dissent on plot armour is recorded in `baker_lens.md` §9 and marked settled; the
lens largely agrees with it (8.4).

---

## 7. Ten of twenty turns are a costless "no"

**Position applied** — 8.8 ◐ (*Dogs*: if nothing is at stake, say yes; roll when something is — **secondary
source, so this is a question, not a verdict**), 8.7 ● ("On a miss, ask 1 anyway, but be prepared for the
worst"), 1.2 ● ("Make the players' characters' lives not boring").

**What the game does — measured.** S226 carries `[NO_CHANGE]` on **10 of its 20 turns** — every one of them
"no travel rations remain to consume". Those turns move nothing, cost nothing and resolve nothing; they drag
the corpus's median narration down to **95 words** against G226's 152 and S344's 160, with a floor of 19
words at T2108. Across the corpus there is no `SKILL_FAIL` tag and no partial outcome, so a turn is either a
success, a fight, or a flat refusal.

`[NO_CHANGE]` is doing its job correctly — `ENGINE_NOTES_PROTOCOL` (`api.js:1877`) introduces it as the
acknowledgment for *"checked — nothing to change"*, an anti-hallucination guard, and it is a good one. The
defect is that nothing tells the model that a `NO_CHANGE` answer to the **engine** is not also an acceptable
answer to the **player**: it spends the whole prose turn on the refusal.

**The insight.** The engine has an excellent mechanism for saying "the records did not change" and no
mechanism at all for saying "the records did not change *and here is what happened anyway*". Baker's version
of the same problem is 8.7: even a missed information roll returns the information, plus a problem, because a
turn that returns nothing is a turn the player paid for and did not receive.

**Recommendation — S.** One clause in `ENGINE_NOTES_PROTOCOL`: a response carrying `[NO_CHANGE]` must still
contain a fictional event — the world moves even when the ledger does not. (Note the register rule at
`data.js:110` already forbids the *word* "ledger"; this is about the behaviour.) Drift surface (protocol
text the parser depends on) → **Fable tier**. Applied cautiously: the *Dogs* half of the position is ◐ and
is not carrying the verdict; 8.7 and 1.2 are ●.

**Settled rulings touched:** none.

---

## 8. The world does not move while the clock does

**Position applied** — 3.7 ● ("Think offscreen too"), 4.2 ● ("Announce off-screen badness" / "Announce future
badness"), 6.4 ● ("Create a countdown"), 5.4 ● (stakes questions).

**What the game does — measured.** The machinery exists and is good: `[SCHEDULE:…]` /
`[SCHEDULE_RESOLVED:]` / `[SCHEDULE_CANCEL:]` (`tag_table.js:128`), `futureEvents` with a "PROMISES" rule
(`data.js:127`), `buildScheduleEscalation` (`api.js:1013`) which correctly rules that a long-overdue event
*"has already happened … treat it as something the world did while the party was busy"*, and an engine-owned
campaign clock.

In 90 turns the corpus contains `SCHEDULE_RESOLVED` ×1 and `FUTURE_EVENT_RESOLVED` ×2 — and **no
`SCHEDULE` or `FUTURE_EVENT` being set**. The forward-commitment machinery is write-only-on-close: the GM
closes promises it did not make in these turns. Meanwhile G226 advances the clock on 40 tags across 20 turns
while producing zero unprompted world events, and S226 advances it on 7.

There is also no threat state of any kind. Grepping the vocabulary: no `THREAT`, `RISK`, `DANGER` or tension
tag exists. Threat becomes representable only at `COMBAT_START` — that is, only once it is already a fight.

**The insight.** Time passing without the world changing is the precise failure "make the world seem real"
(1.1) is meant to prevent, and this game's anti-drift stack is otherwise *outstanding* at 1.1 — the
mature-save fidelity is field-validated. The gap is narrow and specific: the world is continuous in
**memory** and static in **initiative**. Baker's two announce-moves exist for exactly this, and they are the
cheapest possible fix because they cost only a sentence of prose plus a tag the engine already parses.

**Recommendation — S/M.** An engine note in the existing shape, fired when N committed turns pass with no
new `SCHEDULE` or `FUTURE_EVENT`, asking for one thing that happened elsewhere while the party was busy —
naming an existing NPC or faction, never inventing one (the same fence the companion-agenda rule uses). This
pairs naturally with finding 4: an NPC with a want is the obvious author of off-screen badness. Drift
surface → **Fable tier**.

**Settled rulings touched:** none.

---

## 9. Every turn is the same size, so size carries no information

**Position applied** — `AW-REF` ● ("Elide the action sometimes, and zoom in on its details other times"),
3.6 ● ("intermittent rewards").

**What the game does — measured.** G226's 20 narrations run min **97** / max **186** words, median 152 — a
buying-horse-feed turn and a boss fight are the same length. S344 (the strongest corpus) runs 85–299 with a
median of 160; S226 runs 19–220 but only because 10 of its turns are the refusals in finding 7. The STYLE
tail already contains the right instruction (`api.js:2221`): *"When nothing much has changed since the last
response, write LESS: a short reply is the right reply when little happened."* On gemini it is not landing;
the measured variance is the proof.

**The insight.** Length is a stakes signal whether or not it is designed to be. Uniform length tells the
player that nothing they do changes the weight of the moment — the same information loss as constant reward
(3.6). This is also the one finding whose fix is *free* in tokens, and it aligns with the standing owner
rule that prose length is never scored as a positive.

**Recommendation — XS**, and low priority relative to findings 1–4: the clause exists, so the work is
verification, not authoring — measure per-model word-count variance in the next playtest audit before
touching prompt text. A prompt edit that is not first shown to be needed is prompt weight.

**Settled rulings touched:** none.

---

## What the Baker lens would actually take from this game

1. **The engine-note registry is a better MC-move implementation than any tabletop MC sheet** — closed,
   ordered, contract-tested, budget-capped, with a declared shape per entry. The idea Baker put on a
   reference card, this game made enforceable. It is only pointed at the wrong target.
2. **`[SAY:]`, the tag-derived parser and the canon blocks are "fictional causes have real-world effects"
   built for real** (7.2 ●) — a working Lumpley-principle machine where the arbiter is a parser, and
   defensibly so.
3. **The disclaim-decision-making discipline is exemplary** (6.3 ●): four independent places where the engine
   refuses to decide on the player's behalf, each written deliberately, each fenced in the prompt.

## Verification gaps

- **The lens itself** carries unread sources: the full *Apocalypse World* MC chapter, *Dogs in the Vineyard*,
  and PbtA essay parts 2–4 and 6–7. Findings 7 and 9 lean partly on ◐ entries and say so; findings 1–6 and 8
  rest on ● entries only.
- **Corpus coverage is narrow.** 90 turns, three files, one campaign lineage, two models. The 0 HP ladder is
  observed **once**; finding 6 generalises from a single sequence and should be re-measured on a second
  downed event before its recommendation ships.
- **No corpus turn used the player-rolled-dice setting**, so the `[CHECK:]` hand-off path (`api.js:2176`) —
  the game's one real "leave the outcome undecided" mechanism (6.1 ●) — is unmeasured in play. It may
  already produce better failure texture than the default path; that is worth measuring before finding 1's
  recommendation is designed.
- **The live Rise of the Runelords save (t2437) was not read** — only the mature-226 extract from it. Claims
  about 68 roster NPCs versus 1–2 on screen come from the corpus metadata, not from the save.
- **Suggested-action divergence was judged by reading**, not by a metric. Finding 3's "three flavors of one
  move" counts are a human classification of 90 sets and should be re-derived mechanically if it becomes a
  test.
