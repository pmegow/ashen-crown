# Panel review — the Gygax lens on a hundred turns of the owner's own play

*This is a rubric of Gary Gygax's documented positions, not the man.* Every finding cites the entry it
applies from [`../gygax_lens.md`](../gygax_lens.md) with that entry's confidence grade. Quotes are capped at
fifteen words. The lens is **dissent by construction** (§0 caution 1): it would not call this product an
RPG, and where his practice and his rulebook differ the practice wins (§0 caution 2).

**§0 caution 4 is in force for this whole file.** The window under review contains explicit scenes and a
hero married to all three companions. The lens has no standing on player experience, table culture, taste
or who the game is for, and takes none. Every finding below is procedural: the clock, XP and reward,
henchmen, arbitration, and the campaign as connected episodes. **No line of narration from an intimate
scene is quoted anywhere in this document; those turns are cited by number only, as time and as tags.**

**Corpus** (no file modified): `testRuns/fixtures/owner_runelords_t2338-2437.json` — turns 2338–2437 of
*Rise of the Runelords (Ammut)*, the owner's main campaign, exported at v1.838. Hero Ammut, Half-Fey Rogue
[Arcane Trickster] Lv17, 165,850 XP, 16,683 gp, 131/131 HP; three companion wives at Lv16. Clock Day 27,
7:37 pm → Day 31, 7:40 am. `tagLog_last40` covers t2399–2437 only; `noteLog` covers t2415–2434 only —
every claim below is scoped to the window that carries the evidence. **Context:** Karzoug was slain at
t2331 (`storyBeats_from_2300`). All hundred turns are the coda. The spine is told, `openQuests` is empty,
and the fourth button has carried the ending offer the whole time. The player did not press it.

**Code read for grounding** (no file modified): `tag_table.js` (TAG_TABLE, `awardMilestoneXp`, the DICE and
SKILL_SUCCESS handlers), `globals.js` (`MILESTONE_XP`, `GM_XP_CAP_PER_LEVEL`), `helpers.js`
(`endingOffered`, `endingOfferText`, `spineTold`), `api.js` (skeleton block and `pacingNote` assembly),
`game.js:170`.

---

## 1. The clock is kept strictly, and in a hundred turns it bit exactly once

**Position applied:** 1.1 ● — "YOU CAN NOT HAVE A MEANINGFUL CAMPAIGN IF STRICT TIME RECORDS ARE NOT KEPT"
(DMG 1979 p.37); 1.2 ● — time exists to make specific systems bite; 1.3 ◐ — his rationale was multi-party
logistics, a weak fit here, whose analog is the schedule ledger colliding with the party's choices.

**What the game does (measured).** The record is exact. Across all 100 turns `clockMin` advances by exactly
`minutesAdvanced` — **100 of 100, zero mismatches, zero backward steps**. The rendered label derives
cleanly as `Day floor(min/1440)+1` with a 6:00 am day boundary — **0 of 100 mismatches** against that rule,
including the 34 small-hours turns where the day number and the wall time disagree by design. Nineteen
turns advance zero minutes and are *stamped* zero, not left to inference; the longest zero-advance run is
seven turns (t2404–2410, an interrogation conducted in one instant). Total elapsed: **5,043 minutes = 3
days 12 hours**.

Where those minutes went:

| Stretch | Turns | Minutes | Share |
|---|---|---|---|
| t2338–2346 march back with the captive | 9 | 545 | 10.8% |
| t2347–2365 bathhouse, night I | 19 | 1,518 | 30.1% |
| t2366–2377 bathhouse, night II | 12 | 1,265 | 25.1% |
| t2378–2397 Magnimar morning, Ironbriar interview | 20 | 325 | 6.4% |
| t2398–2432 the Sable episode | 35 | 699 | 13.9% |
| t2433–2437 Sandpoint night and morning | 5 | 691 | 13.7% |

**68.9% of the campaign clock (3,474 of 5,043 minutes) is downtime.** The single largest advances are
t2347 (1,158 min) and t2366 (1,140 min) — the engine charging a night, correctly, and then playing the
night out in fifteen- and twenty-minute increments.

Now the teeth. Across a hundred turns the clock changed exactly one decision. At t2407 a FUTURE_EVENT is
filed from a prisoner's intelligence; at t2417 a recovered map names a low-tide arrival; at **t2420 the
party spends 240 minutes doing nothing but waiting for it**, and the narration pays it off in eleven words:
*"Right on time, as the tide out in the bay bottoms out."* FUTURE_EVENT_RESOLVED fires at t2432. One
schedule remains open — "Ironbriar identifies the magistrate behind the smudged caravan-payout seal", born
at clock 41910 (t2394), due at 44920, which is **27 in-game hours past the end of the window**. It is live,
not stale. It has simply not come due.

Everything else the clock could cost, it did not. There is no `REST` tag in the last-40 window except
t2434; spell recovery, travel and healing all resolved as prose.

**The insight the lens produces.** 1.1 is satisfied outright — this is the strictest time record the lens
has ever been shown, and it is strict in the way that matters: a zero is recorded as a zero. But 1.2 is the
real question, and the honest answer over a hundred turns is *once*. That is not a failure of the clock; it
is the clock's rationale (1.3) meeting a campaign where one party occupies one place and nothing else in
the world is on a timetable. He built the clock so that things happening elsewhere could collide with the
party. In this window exactly one thing was happening elsewhere. §0 caution 6 applies squarely: ask whether
a position solves a problem *this* game has. The apparatus is sound and the world is not yet dense enough
to load it.

**Recommendation — no change to the clock.** It is the healthiest procedural organ in the corpus and it
should not be touched. The measurement to keep is the *ratio*: one schedule alive per hundred turns. If the
lens has an ask, it is not for stricter time — it is for more things on the calendar, and that is a content
question for the world-generation surface, not a clock change. **Settled?** The clock's design is not
under dispute; nothing here re-opens it.

---

## 2. A hundred turns of play paid one quest milestone: exactly 850 XP

**Position applied:** 2.2 ● — "Monty Haul" is a named failure mode, not generosity (DMG glossary; "not…
some mad Midas", p.92); 2.3 ● — XP scales with the risk taken to win it (DMG pp.79–86); 2.1 ◐ — too-rapid
advancement puts the game beyond the referee's control (*The Dragon* #28, 1979).

**What the game does (measured).** The `version` field dates each turn. **v1.829 begins at t2420** — so the
#348 XP re-tune and its load-time floor landed inside this window, topping Ammut to the new Lv17 gate of
165,000 XP. His XP at t2437 is **165,850**. `MILESTONE_XP` (globals.js:67) is `{quest:50, boss:100,
act:200}` × level. At level 17, one quest milestone is **exactly 850**.

Eighteen turns of play, one payment, and it is the *only* payment. In the whole 40-turn tag window there
are **zero `XP` tags**, **zero `COMBAT_*` tags of any kind**, and one `QUEST` tag — at t2425, the close of
the Sable operation. The other two paymasters were structurally unreachable: `awardMilestoneXp("boss")`
fires only on a combat close (tag_table.js:1027) and there was no combat; `awardMilestoneXp("act")` fires
only on `[ACT_COMPLETE:]` (tag_table.js:1335) and every act is complete.

What that one payment bought: thirty-five turns (t2398–2432) of a self-generated operation — a road ambush
on a goblin scout, an interrogation, a recovered parcel and map, a cellar rigged with two wards and an
arcane lock, a capture under Zone of Truth, and an arrest handed to the sheriff — plus **850 gold in bearer
notes** and a district's complete route manifest (t2425). Gold moved. XP moved 850.

The Lv18 gate is 195,000. From 165,850 that is **29,150 XP = 34.3 more quest completions**, or roughly six
hundred turns at this window's observed rate.

**The insight the lens produces.** 2.2 is the Monty Haul warning and this is its mirror image — but a
mirror image is the same calibration failure, not its opposite. 2.3 is the entry that actually explains it.
Gygax engineered treasure-into-XP precisely so that an adventure won by cunning rather than by blood still
advanced the character; the Sable heist is *exactly* that adventure and it pays a rounding error. The lens
notes the owner declined treasure-for-XP in the first review and **records that as dissent, not as a
re-raise.**

The non-declined observation is structural and, the lens believes, unnoticed: **all three XP paymasters are
skeleton-shaped.** Two of the three (act, boss) cannot fire in a campaign that has finished its spine and
turned social. A design that offers the player an ending, and honours their refusal of it, has handed them
a mode in which one of its three reward channels survives.

**Recommendation — S, and it is not about treasure.** One of two, either sufficient:
(a) Give the post-spine state its own milestone kind at a seam the engine already detects — the
self-generated episode closes at t2425 with `QUEST` after `QUEST_STEP` at t2416/2417/2422; that shape is
detectable and could pay at an act-like rate rather than a quest-like one.
(b) Do nothing to the economy, and make the *readout* honest: `csXpMeter` (helpers.js) will show "0.3% to
Lv 18" for the rest of this campaign's life, which is a worse statement than "the story is what advances
now." A post-spine meter that says so is a thin DOM shell over an already-tested pure function.
The lens prefers (b) if the owner's position is that Lv17 is where Ammut stops — but that position should
be *stated*, per 2.5's test: a gate should be a design choice with a reason, not a fill-phase accident.
**Settled?** Treasure-for-XP is declined and stays declined; the XP curve re-tune is adopted and this
finding does not disturb it. The paymaster coverage gap is new ground.

---

## 3. The referee arbitrates the narrator well, and the player not at all

**Position applied:** 5.1 ● — "IT IS THE SPIRIT OF THE GAME, NOT THE LETTER OF THE RULES" (DMG p.230); 5.2
● — the referee is "final arbiter, rather than the interpreter of the rules" (DMG preface).

**What the game does (measured).** `noteLog` covers t2415–2434, a twenty-turn window. **Twelve turns of the
twenty (60%) carried an engine note**, mean 1,644 characters, one flagged `overBudget` (2,651 chars,
`buildRelationshipAudit`, t2422).

Of the notes whose contract names an acknowledging tag, **eight of nine were answered on the same turn or
the next**:

| Note | Turn | Acknowledging tag | Landed |
|---|---|---|---|
| `buildAgendaAskNote` | 2415 | COMPANION_AGENDA | t2416 ✓ |
| `buildUndefinedItemNudge` | 2416 | ITEM_DEF | t2416 ✓ |
| `buildSayComplianceNudge` | 2416, 2417 | SAY | same turn ✓ |
| `buildSceneCastNote` | 2418 | SCENE_CAST | t2419 ✓ |
| `buildLocationDescNudge` | 2419 | LOCATION_DESC | t2420 ✓ |
| `buildPresenceAudit` | 2421 | SCENE_CAST | **not landed** |
| `buildUndefinedItemNudge` | 2425 | ITEM_DEF | t2426 ✓ |
| `buildSceneCastNote` | 2431 | SCENE_CAST | t2432 ✓ |
| `buildConsumableNudge` | 2434 | ITEM_KEPT | t2435 ✓ |

That is a working arbiter. It states the reason, the narrator rules in spirit, and the ruling lands within
one turn. 5.1 is met better here than the lens expected.

Now the other direction. In a hundred turns the player addressed the referee out of character exactly once:
**t2418 — "GM: Who can cast an 'ambush ward'?"** It received no answer. The GM narrated a hike into
Sandpoint and a description of Ameiko's cellar, and the turn **advanced the clock 180 minutes**. The
question was consumed as an in-fiction action. At t2419 the player answered it himself by fiat: *"Have
Daeris set a Binding Ward on the grate. Have Morwen Arcane Lock the cellar exit stairs."*

**The insight the lens produces.** 5.2 asks who the arbiter is. The measured answer is that the arbiter is
the note system and it arbitrates the *narrator*, competently. It has no channel at all for the player
asking the referee a rules question inside the story channel — and, uniquely among no-op turns, the ask is
not merely dropped: it is charged three hours of campaign clock, which collides with finding 1. The player
then ruled for himself, which is the one thing the DMG preface says the referee exists to prevent.

Table Talk is that channel and the owner's ruling protects it; **this is not an argument against Table Talk
and is not offered as one.** It is the narrower observation that a `GM:` prefix typed into the Story box is
silently downgraded, and silence is against house rule ("no silent failures").

**Recommendation — S.** Detect a leading `GM:` / `OOC:` in `sendAction` and do one of two visible things:
route the text to Table Talk, or refuse the turn with a toast naming the reason. Either way it must **not
advance the clock**. This touches `sendAction` and is therefore Fable tier despite its size.
**Settled?** Table Talk's existence is settled and this finding endorses it rather than disputing it.

---

## 4. Ten filed rolls, ten successes, and the only armed confrontation resolved with none

**Position applied:** 5.4 ● — "You have every right to overrule the dice at any time" (DMG p.110), except
where the rules say never; 4.4 ● — "ALWAYS GIVE A MONSTER AN EVEN BREAK!" (DMG p.110); 4.6 ◐ — module
lethality was budgeted against stated party strength.

**What the game does (measured).** In the 40-turn tag window: `DICE` fires 10 times, `SKILL_SUCCESS` fires
10 times, and **every DICE co-occurs with a SKILL_SUCCESS**. Not one filed roll stands alone. The DICE
handler (tag_table.js:740) carries an `outcome` field and files it to `diceLog` — the record is *capable*
of showing a failure and showed none in forty turns.

The one armed confrontation of the hundred turns is the capture at t2421. An armed smuggler with a
crossbow, at range, in a dark cellar. The player writes *"Morwen, silence now! Slap the back of her hand
with cleaver, to knock the crossbow from her grip"* — and it simply happens. The t2421 tag set is
`TIME_CHECK, TIME_ADVANCE, SAY, SCENE_REF, NPC, NPC_PRONOUN, SUGGEST`. **No DICE. No COMBAT_START.** The
foe's whole defeat spans t2420–2425 and the combat tracker never opens.

Across all 100 narrations (127,431 characters), **zero contain initiative, damage-number or armour-class
language** — a scan for `initiative`, `takes N damage`, `hit points`, `rolls for damage`, `AC N` returns
nothing.

**The insight the lens produces.** 5.4 asks whether rolls are binding, advisory or decorative. The measured
answer is that in this window the question could not be asked: the two turns where an opposed outcome was
genuinely in doubt produced no roll to bind. 4.4's even break is not violable when there is no die to
withhold. And 4.6's challenge budget never engaged — the foe's threat floated entirely on prose, which is
the exact condition 4.6 names.

This is **not** a request for lethality. The death walk, the skeleton and the graded-consequence design are
declined ground and the lens does not re-open them. The point is narrower and is a *drift* point, which is
this project's own core concern: the state record contains only successes, so the drift-health readout has
no denominator. A referee whose ledger cannot distinguish a passed check from an unrolled one has lost the
artifact that makes 5.4 answerable at all.

**Recommendation — S.** Two independent options:
(a) Require a `[DICE:…|failure]` filing on any tested action the narration resolves against the party —
the field already exists; only the instruction is missing.
(b) Add the drift-health surface a *rolled-outcome ratio* over `diceLog` (successes / filed rolls) so a
window like this one reports "10/10" and a human can decide whether that is a Lv17 skills ladder working or
a narrator declining to roll. (b) is a `dev/`-and-readout change and is legal off-Fable; (a) is prompt
text and is Fable tier.
**Settled?** Model-narrated dice are settled (Leiber finding 5's note) and this recommendation keeps them
model-narrated — it asks only that the failures be *filed*, not that the engine roll.

---

## 5. The henchmen carry the scene, and never move unbidden

**Position applied:** 3.4 ● — "They usually spell the difference between failure and success" (DMG p.34),
and henchmen let play continue without the main PC.

**What the game does (measured).** Over 100 turns the spoken-line counts are Frizwick **191**, Morwen
**251** (across two name forms, below), Daeris **166**, against the hero Ammut's **186**. The three
companions out-speak the player character **608 to 186, a ratio of 3.3 : 1**. Each is `present` in 82–83
of the 100 turns — they are never absent.

Mechanically load-bearing? Partly, and demonstrably. The entire ambush is *their* capabilities:
`COMPANION_SPELL_USED` fires three times in the tag window, and t2420's narration is Daeris's Binding Ward
and Morwen's arcane lock doing the work while the hero waits in the rafters. `COMPANION_AGENDA` fires three
times — but only after the engine asked on **three consecutive turns** (`buildAgendaAskNote` at t2415,
2416, 2417). All three companions carry `want: null`.

And they move on the hero's word. In **11 of 100 turns the player names a companion and issues an
instruction** (t2341, 2350, 2351, 2356, 2379, 2398, 2419, 2421, 2424, 2426, 2430). The ambush design at
t2419 is a two-clause order. The only measured self-initiated companion action in the window is Morwen's
own agenda line at t2418, which the engine had to request three times to get.

**One record defect.** The speaker ledger splits Morwen into two identities: **"Morwen" on t2361–2393 (21
turns)** and **"Morwen Zethran" on 36 other turns**, and never both in the same turn — a clean contiguous
switch, not interleaving. A henchman's record of what she said and when is filed under two names.

**The insight the lens produces.** 3.4 has two halves. The first — henchmen decide success or failure — is
met, and vividly: the operation is unwinnable without them. The second half is not: these henchmen are the
hero's extended action economy, not independent actors, and the engine has to ask three times to get one
line of their own agenda. The lens does **not** read the direction pattern as a defect. It is the owner's
play style and the engine imposes nothing; §0 caution 4 keeps the lens away from it entirely. The `want:
null` is the #347 ruling working exactly as decreed — never manufacture one.

They are also one level behind and frozen there, on the same dead channel as finding 2: Lv16 against Lv17,
with `_xpMirror` carrying 850 XP each from the single quest close.

**Recommendation — XS, on the record only.** The Morwen alias split is an identity-ledger artifact, not a
fiction problem; the short form should resolve to the canonical name in the speaker tally the same way
`findCompanionChar` already resolves it elsewhere. No change to the direction pattern, no change to wants.
**Settled?** #347 (never manufacture a want) is settled and this finding endorses it.

---

## 6. The skeleton block still tells the GM to drive toward an arc that does not exist

**Position applied:** 1.4 ◐ — "I assumed no campaign with an end but connected episodes" (EN World 2003);
7.5 ◐ — "As for a story, that's an adjunct to the 'adventure'" (Dragonsfoot 2005); 2.6 ◐ — rule complexity
works against play speed.

**What the game does (measured).** With the spine complete, `buildSysPrompt` ships two instructions in the
same block. The #325 epilogue line (api.js, gated on `worldState.spineComplete`) says the tale is told and
*"do not open a new grand plot unasked."* Then, **twenty-some lines later, `lines.push(pacingNote)` runs
unconditionally — it sits outside the `if(activeAct)` block** (api.js:2322). With every act completed
`activeAct` is `null`, none of the enrichment branches fire, and the default text ships verbatim:

> "PACING: Drive scenes toward the CURRENT arc's objective… Do not stall — if a scene has run 4+ turns
> without advancing the arc, push toward a transition or resolution."

There is no current arc. There is no act. `[ARC_COMPLETE:]` and `[ACT_COMPLETE:]` cannot be emitted. This
line rode **every one of the hundred turns** under review, directly beneath a line saying the opposite.

Against that instruction, the actual play: the party sat in **Magnimar for 54 consecutive turns**
(t2344–2397). The GM was told on each of them that a scene running four or more turns without arc progress
should be pushed to a transition.

And yet — the window's most important measurement. Without any authored act, a **complete, self-organised
episode ran end to end**: a goblin sketcher intercepted on the road (t2398–2411) → a tarred parcel at a
carved spiral (t2414–2416) → a map naming the Rusty Dragon cellar and a low-tide arrival (t2417) → the
cellar rigged (t2419–2420) → the capture (t2421–2425) → the arrest handed to the sheriff (t2432). It
carried `QUEST_STEP` at t2416, 2417, 2422 and closed with `QUEST` at t2425. A `FUTURE_EVENT` born at t2407
resolved at t2432. **And it seeded the next one**: the still-open Ironbriar/magistrate schedule was born at
t2394 and comes due 27 in-game hours after the window ends.

Meanwhile the fourth button carried *"Write the ending — the tale of … is told"* (helpers.js:1227) for a
hundred turns and was never pressed.

**The insight the lens produces.** This is position 1.4 vindicated on the product's own instruments, and it
is the strongest finding in this review. **The three-act skeleton is not what made this stretch a
campaign.** The futureEvents ledger, the quest lifecycle and the location graph are — and they kept working
after the arc machinery had nothing left to say. The lens's first-review dissent against the skeleton was
declined by the owner and stays declined; this window does not revive it. What it does instead is *narrow*
it: the skeleton turns out to be removable without the campaign stopping, which means the argument for it
is about onboarding and shape, not about whether play can continue — a much better place for that argument
to sit.

What the window *does* indict is the prompt's failure to notice its own state. A contradiction that shipped
on a hundred consecutive turns, under an epilogue line written specifically for this state, is 2.6's
complexity cost in its purest form: a clause the GM must reconcile that has no referent.

**Recommendation — S, on the prompt.** Give the post-spine state its own pacing line. When
`worldState.spineComplete` is set and no act is active, `pacingNote` should speak in the vocabulary the
play actually uses — episodes, consequences, the open schedule ledger — instead of arcs and acts that
cannot exist. Drift-surface (`buildSysPrompt` text) → **Fable tier**, and it wants a stable-half
byte-identity check because `pacingNote` rides the skeleton block.
**Settled?** The ending offer (#325, offered-never-forced) is settled, and a hundred turns of a player
declining it is the best validation it will ever get. Nothing here touches it.

---

## 7. The referee's three largest un-acknowledged notes fired during the only action sequence

**Position applied:** 5.5 ◐ — "the rules for an RPG should facilitate the enjoyment" (EN World 2002); rule
lookup that interrupts play has inverted the priority. 2.6 ◐ — every clause the GM must honour is weight.

**What the game does (measured).** In the `noteLog` window, the three notes with no acknowledging tag and
the largest payloads are:

- **t2421 `buildPresenceAudit`** — 1,409 chars — the turn the smuggler steps into the trap.
- **t2422 `buildRelationshipAudit`** — 2,651 chars, flagged **`overBudget`** — two turns into the capture.
- **t2425 `buildMoodAudit`** (with `buildUndefinedItemNudge`, 2,224 chars combined) — the interrogation.

Those are turns 2421, 2422 and 2425. The capture runs t2420–2425. **Every one of the window's
un-acknowledged audits landed inside the six turns of the only confrontation in a hundred.** The
acknowledged, tag-bearing nudges (`buildSceneCastNote`, `buildLocationDescNudge`, `buildConsumableNudge`)
landed on quiet turns and all three were answered next turn.

Total engine-note payload over the twenty-turn window: **19,729 characters**.

**The insight the lens produces.** 5.5's question is which clauses earn their place in a turn's prompt. The
measurable answer here is that the ones that earn it are the ones with an acknowledgment tag — those have a
next-turn compliance rate of 8/9 (finding 3). The ones without a tag are unfalsifiable by construction:
they cost budget, one of them blew the budget, and there is no way to tell from the record whether any of
them changed a word. That they clustered on the six tensest turns of the corpus is probably coincidence at
n=3; that the clustering is *undetectable* by the system itself is not.

**Recommendation — XS, and it is a test, not a change.** The note catalog (`audits/RECORD_309_note_builder_catalog.md`)
already classifies note shapes. Extend the playtest audit to report, per note builder, its
**acknowledgment rate and its combat/tension-window firing rate** over a corpus — the same measurement this
finding took by hand. Adding a `dev/` measurement is always legal off-Fable, and it converts "the audits
seem to fire at bad moments" into a number the next review can act on. No note builder should be removed on
the strength of three data points.
**Settled?** Nothing settled is touched. The `combat:"silent"` flag already in the note-shape registry
(api.js:1841) suggests this concern has been anticipated for at least one builder; the measurement would
say whether the audits need it too.

---

## What changed from the first review

The first review (2026-09-05, v1.828) produced twenty findings against code and short synthetic corpora.
This window is a hundred turns of real play by the person the game is for. What it does to that record:

**Confirmed.**
- **The XP curve re-tune (adopted, #348) is confirmed as necessary and confirmed as insufficient on its
  own.** The floor landed mid-window at t2420 and the measurement is exact: 850 XP in the eighteen turns
  after it. The re-tune fixed the "17 levels in 30 in-game days" complaint completely — arguably past
  completely, at the far end of the curve where the coda lives (finding 2).
- **Levels landing at camp (adopted, #349) had nothing to land** and therefore neither confirms nor
  refutes: `REST` fired once (t2434) with no level owed. Not evidence either way.
- **The clock's strictness is confirmed at a standard the first review only inferred from code.** 100/100
  turn deltas exact, 0/100 label mismatches, zero-advance turns stamped rather than inferred (finding 1).
- **The engine's note-based arbitration is confirmed to work on live turns** — 8 of 9 acknowledgeable notes
  answered within a turn (finding 3). The first review argued this from the note builders' shape; here it
  is measured against what the GM actually then emitted.

**Weakened.**
- **The whole first-review argument against the skeleton is weakened as a practical objection and should be
  retired as one.** The owner declined it, and this window shows why the decline costs nothing: with every
  act complete, the campaign generated a full connected episode from the futureEvents ledger and the quest
  lifecycle alone. The skeleton's value is a shape-and-onboarding argument, not a can-play-at-all argument
  (finding 6). The lens records its dissent as narrowed, not as withdrawn.
- **The argument against the ending button is weakened to nothing.** A hundred turns of a player declining
  an offer that never forced itself is the design working. Offered-never-forced (#325) is validated.

**Made moot.**
- **Every first-review argument that depended on combat frequency is moot in this window.** There is no
  combat in a hundred turns: zero `COMBAT_*` tags, zero initiative or damage language in 127,431 characters
  of narration. Lethality, the graded-consequence ladder, foe morale and the challenge budget were all
  untestable here (finding 4 records only what the *ledger* can and cannot say). A coda is not the sample
  to argue lethality from, in either direction.
- **Convalescence, training time, pack pressure and the alignment toggle (all declined) are untouched by
  this window** and are not re-raised. For the record: the party rested, healed to full and moved on
  without any of them, and the window gives the lens no new evidence for any of the four.

**New ground this window opened that the first review could not see.**
- The XP paymaster coverage gap — two of three channels structurally unreachable post-spine (finding 2).
- The `GM:` ask consumed as an action, charged 180 minutes of clock (finding 3).
- The `pacingNote` contradiction shipping on every post-spine turn (finding 6).
- The Morwen speaker-ledger alias split (finding 5).
- The un-acknowledged audits' budget cost and clustering (finding 7).

---

## Verification gaps

- **`tagLog_last40` covers t2399–2437 and `noteLog` covers t2415–2434.** Every tag-count and note-count
  claim is scoped to those windows and *cannot* be extended to t2338–2398. In particular, "zero combat" is
  proven for t2399–2437 by tags and for all 100 turns only by the weaker narration scan; the `present`
  roster for the earlier turns lists foes (Face-Stealer on 18 turns, goblins on 12) and the lens does not
  know how those encounters resolved.
- **Companion XP is not in the fixture.** Finding 5's claim that the companions received the 850 XP mirror
  is inferred from `R._xpMirror` in `awardMilestoneXp`, not measured.
- **Finding 2's "exactly one quest milestone" rests on the v1.829 floor landing at t2420**, read from the
  `version` field. If the floor was applied at a load *between* t2419 and t2420 rather than at t2420's
  turn, the arithmetic holds; if XP moved before the floor and the floor was a no-op top-up, it does not. A
  single read of `worldState.character.xp` history would settle it.
- **Finding 7 is n=3.** The clustering of un-acknowledged audits on tense turns is an observation, not a
  result, and the recommendation is deliberately a measurement rather than a change.
- **No `diceLog` was in the fixture** — finding 4's "ten filed rolls, ten successes" is read from tag
  co-occurrence, not from the dice ledger itself. The ledger would show whether failures were filed as
  `DICE` without a `SKILL_SUCCESS` in earlier windows.
- **The lens has no standing on prose, voice, the intimate scenes, or anything about who this game is for**
  (§0 caution 4), and made no observation on any of them. Those belong to the Le Guin, Leiber, Abercrombie
  and Jemisin lenses.
- **Open source gaps carried from the lens itself** (§11) are unchanged: the EN World and Dragonsfoot
  quotes underpinning 1.4, 2.1 and 4.5 all reach this review through compilations, which is why 1.4 —
  finding 6's spine — carries ◐ and not ●.
