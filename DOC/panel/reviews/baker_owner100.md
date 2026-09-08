# Panel review, second pass — the Baker lens on the owner's own hundred turns

**Caveat, first line.** This is a review written through [`baker_lens.md`](../baker_lens.md), a rubric of
Vincent Baker's *published craft positions*. It speaks as "the Baker lens", never as Baker, and it cites the
lens entry it applies. Positions graded ◐ inform questions, never verdicts. Settled owner rulings are
recorded as dissent and not relitigated.

**Corpus.** `testRuns/fixtures/owner_runelords_t2338-2437.json` — 100 consecutive turns of the owner's own
play in *Rise of the Runelords (Ammut)*, T2338–T2437, save version v1.838. Karzoug died at T2331; every turn
here is the coda after the climax, with the engine offering "Write the ending" on the fourth button. Models:
claude-sonnet-5 ×53, gemini-3.7-flash ×46, gemini-3.6-flash ×1. Clock 38257 → 43300 (Day 27 evening → Day 31
morning). Read in full. Adult mode is on and T2347–T2363 are explicit; those turns are reviewed as craft and
**cited by turn number only — no line from them is quoted anywhere in this file.**

**What is different about this pass.** The first pass measured a script clicking buttons. This one measures a
human typing. That difference reverses two of the earlier findings and sharpens three others; the changes are
tabulated at the end.

---

## 1. The coda's whole plot is the one plot the rules explicitly forbid

**Position applied** — 8.3 ● (a rule that stops nothing is waste — *"Rules vs Vigorous Creative Agreement"*,
`ANY-360`), 7.3 ● (the mechanical layer gives the fiction *momentum*, not description), 2.1 ● ("what the
rules demand" is one of the four things the MC always says).

**What the game does — measured.**

Two surfaces already ban this, and both are emphatic. `data.js:110`: *"Do NOT build quests or plots on
paperwork, ledgers, deeds, registrations, probate"* — the NEVER ADMINISTRATIVE clause. The STYLE tail
(`api.js:2221`): *"no ledgers, invoices, paperwork, bookkeeping or accountants as metaphor, image or plot
device"*.

Measured against the corpus:

| | count |
|---|---|
| turns whose narration trips the v1.839 REGISTER census (`REGISTER_WORDS`, `helpers.js:125`) | **20 of 100** (23 word hits) |
| the word `ledger*` alone | 18 occurrences across 17 turns |
| paperwork plot-nouns **outside** the census word list (requisition, payout, voucher, manifest, bearer note, routing slip, counter-signature, trade protection fund, complaint) | **16 occurrences on 8 turns** |

The 8 turns in that second row are not decoration. They are the spine. T2395–T2397 is the corpus's best-written
scene and its entire content is a requisition complaint: a caravan loss report, a payout approved in four days,
a smudged magistrate's seal, a signature cipher. T2416–T2417 is a voucher packet counter-signed by a clerk.
T2425 is a haul of bearer notes and routing slips. And the engine's **one open forward commitment** in the
whole save is, verbatim from `meta.schedule`: *"Ironbriar identifies the magistrate behind the smudged
caravan-payout seal"*. The anti-drift machinery is faithfully holding a bureaucracy countdown open.

The dating matters and exonerates the build. The register guard (#355 — STYLE ban, per-narration census,
`buildRegisterNote`) shipped in **v1.839**. This save ends at **v1.838**. This corpus is the pre-guard
baseline, and it is very probably the evidence that produced both the guard and the owner's 2026-09-06 ruling.

**The insight.** The guard that shipped catches the *word*. What this corpus shows is that the word was the
symptom: fifteen of the twenty flagged turns are Daeris's ledger-of-the-heart metaphor, which is harmless
character colour, while the eight turns that actually violate `data.js:110` — the ones where a plot is built
out of a filing cabinet — trip the census **zero times**, because "requisition" and "voucher" are not on the
list. A ban on the vocabulary, enforced on narration only, leaves the quest generator, the schedule label and
the `[QUEST]`/`[QUEST_STEP]` text completely unpoliced. Baker's test in 8.3 is exactly this: a rule earns its
place by what it *stops*, and the older, stronger half of this ban has stopped nothing in a hundred turns.

**Recommendation — S, and measure before building.** Do not widen `REGISTER_WORDS` — that would spam the
Daeris metaphor and miss the plot. Instead run the census over the **labels**, not the prose: a `[QUEST:]`,
`[QUEST_STEP:]` or `[SCHEDULE:]` whose text carries a paperwork noun is the actual `data.js:110` violation,
and it is one scan at one boundary. First re-measure a post-v1.839 corpus, since the word half is now guarded
and the plot half may already have thinned. Drift surface (prompt + tag text) → **Fable tier**.

**Settled rulings touched:** none. The no-ledgers ruling (owner, 2026-09-06) is *supported* by this finding,
not relitigated.

---

## 2. Nothing cost anything in a hundred turns — and the engine cannot tell that this was earned

**Position applied** — 8.1 ● (*"the purpose of an rpg's rules is to create the unwelcome and the unwanted"*),
1.2 ● ("Make the players' characters' lives not boring"), 8.4 ● (the magic trick), with lens caution 0.6 (the
lens argues from a stated taste the owner may decline).

**What the game does — measured.** Across the 100 turns:

- **0** `HP` tags of any sign. Hero 131/131 and all three companions at full at both ends.
- **10** `DICE` rolls in the 40 tagged turns, **10** `SKILL_SUCCESS`, **0** `SKILL_FAIL`. A 100% success rate.
- **1** `GOLD` tag, an inflow of 850 gp in bearer notes at T2425, against a standing purse of 16,683.
- **4** `ITEM_LOST`, every one voluntary and trivial — rations handed to a prisoner (T2407) and to a goblin
  (T2428). Voluntary coin spent all run: 15 gp at a bathhouse, a 10 gp tip, a handful of coins, four
  breakfasts.
- **0** `COMBAT_START`. The run's only armed antagonist arrives at T2421 with a loaded hand-crossbow, is
  pinned by a ward the instant her heel lands, and is disarmed at T2422 before taking a single action.
- **54 consecutive turns** (T2344 arriving in Magnimar → T2397 leaving the Justice Court) in which nothing
  whatever happens *to* the character.

**The insight.** The first pass measured the same zero over 90 harness turns and blamed the model's revealed
preference. That reading does not survive contact with a human. The owner bought the bath, poured the wine,
tipped the attendant, freed the prisoner and asked to go home; he was not denied cost, he *chose* leisure, and
after killing a Runelord he had earned it. Baker's 1.2 does not forbid a rest. What the corpus actually
exposes is narrower and more useful: **the engine has no representation of "the climax is past"**. The
skeleton's final act is exhausted, the fourth button is offering the ending, and the state carries no flag
that says *this is a wind-down, not a stall*. So every costless-stretch detector the first pass proposed —
including mine — would fire hardest exactly where it is most wrong, and a detector that fires on the wrong
fifty turns is worse than none.

Two turns in the corpus show the engine *does* have the raw material. At T2379 Morwen opens the day herself;
at T2392 she closes the family scene with *"Everyone's fed, nobody's dying. Which means it's time to talk
about Sable."* The prose knows when the rest is over. The state does not.

**Recommendation — M, re-scoped from pass 1.** Keep the `cost` outcome token (pass-1 finding 1a) unchanged.
**Drop** the "N costless turns" note (pass-1 finding 1b) as specified, and replace its trigger: a costless
stretch is only a defect when the campaign is not in a declared coda. The cheap version is a single derived
predicate — every act of the skeleton complete *and* the ending offer standing — that suppresses the
consequence family entirely. Build the predicate before the detector. Drift surface → **Fable tier**.

**Settled rulings touched:** plot armour and the death walk stay; nothing here asks for a death. Recorded per
lens §9: the lens wants cost, the product's owner chose a peaceful coda, and in a coda he is right.

---

## 3. The world moved twice in a hundred turns, and both times it only told the party something

**Position applied** — 3.7 ● ("Think offscreen too"), 4.2 ● ("Announce future badness" / "Announce off-screen
badness"), 5.1 ● (every threat carries an impulse), 5.4 ● (stakes questions).

**What the game does — measured.** Enumerating every event in 100 turns that the player did not ask for:

1. **T2344** — *"Wyla Ashvane finished cooling the last of those ember-rune warding bracelets"*, hours ago,
   somewhere else, while the party rode. A named NPC doing her own work off-screen. This is 3.7 executed
   perfectly, in one sentence, at zero cost, by gemini, unprompted.
2. **T2416–T2417** — the recovered packet reveals a completed operation: *"Someone isn't just watching
   Sandpoint. They're sitting right under Ameiko's floorboards."* The world had been busy while the party
   climbed a mountain.

That is the list. Two events, both purely informational; neither takes anything from the party. Beyond them:
**zero** non-party NPCs initiate an approach, an attack, a demand or a betrayal in 100 turns.

The coda's only adversary does not survive scrutiny as world initiative either. At T2398 the narration ends on
a joke and mentions no watcher. The player then types *"Ask Daeris if she senses anything watching the
road."* — and T2399 answers *"we've been watched since the tree line thinned out."* The single antagonist of
the hundred turns was conjured by a yes-and to the player's own suspicion.

Supporting: `present` carries **29 distinct names** across the run; **13** ever receive a spoken line; 16
never appear in a line of prose at all, including Karzoug, dead since T2331 and still listed present in a
bathhouse at T2364. The engine noticed — `buildPresenceAudit` and `buildSceneCastNote` fired 4 times in the
20 logged turns of `noteLog`. And Frizwick states a genuine stakes question at T2411 — *"Bet you five gold he
runs straight to Sable anyway"* — which nothing files and which never resolves across the remaining 26 turns.

**The insight.** Pass 1 called the world "continuous in memory and static in initiative", and a human player
does not change that; he only masks it, because he supplies the initiative himself. The refinement the owner's
play adds is the *trigger*. Pass 1 proposed firing on "no new SCHEDULE in N turns" — and finding 4 below shows
a SCHEDULE was set correctly here, so that trigger would have stayed silent through all 100 turns. The
condition that actually discriminates is **"no non-party NPC has acted of their own accord in N turns"**,
which was true for 54 straight turns and would have fired.

**Recommendation — S/M, retrigger only.** Keep pass-1 finding 8's note in its established shape; change its
latch from schedule-staleness to NPC-initiative staleness, and gate it behind the coda predicate from finding
2 so it stays quiet during an earned rest. Pairs with finding 5's flaw clause: the party's own three
companions are the nearest available actors. Drift surface → **Fable tier**.

**Settled rulings touched:** none.

---

## 4. The Ironbriar countdown is the best thing in the corpus, and it reverses my last pass

**Position applied** — 6.4 ● ("Create a countdown" — the third disclaim-decision-making tool), 4.3 ● ("Tell
them the possible consequences and ask"), 6.3 ● ("Put it in the players' hands"), 5.4 ●.

**What the game does — measured.** At T2397 Ironbriar says *"Give me a day, maybe two, and I'll have a name
instead of a smudge."* The engine turned that sentence into state: `sch1_44790`, born at clock **41910**, due
at **44920** — 3010 minutes, fifty hours, exactly "a day, maybe two". The run ends at clock 43300, so it is
still 1620 minutes from due and correctly **pending, not overdue**. Alongside it, one `FUTURE_EVENT` written
at T2407 and one `FUTURE_EVENT_RESOLVED` at T2432: a forward commitment made and paid inside 25 turns. (The
fixture carries tag *names* only, so the pairing of those two is inferred, not proven.)

The same scene is also the corpus's only real instance of 4.3. Ironbriar names the price before handing the
decision over — *"Every time somebody's dug at this network, the digging's gotten somebody killed"* — and then
refuses to make the call: *"You want my advice? Don't wait on me."* A cost stated, a choice returned, in
dialogue, unprompted by any engine note.

**The insight.** Pass 1 measured 1 `SCHEDULE_RESOLVED` and **no SCHEDULE being set** in 90 harness turns and
concluded the forward-commitment machinery was "write-only-on-close". **That is wrong.** In real play the
machinery works, and it works the way Baker specifies: the countdown is born out of an NPC's own promise
rather than declared by the referee, which is 6.4 and 6.2 in one move. The harness had not produced a scene in
which an NPC promised anything, so it measured the absence of the input, not a defect in the mechanism.

The residual is small and real: in the 40 turns after it was created, the schedule is never surfaced to the
player once. If it comes due in a scene the player is not in, the entire payoff of a fifty-hour countdown is
an unnoticed state change.

**Recommendation — no change** to the schedule mechanism; record as calibration and as an explicit reversal.
Optional **XS**: surface a pending schedule in the quest journal so the player can see a clock he is standing
inside. Off-Fable (read-only panel), if it ships at all.

**Settled rulings touched:** none.

---

## 5. Six hundred companion lines, and not one refusal

**Position applied** — 5.1 ● (an impulse is an engine, a mood is a reaction), 6.2 ● ("Put it in your NPCs'
hands"), 3.1 ● ("Be a fan of the players' characters" — a fan wants the character tested).

**What the game does — measured.** Attributed spoken lines across the 100 turns: **1057** total. Companions
**608** (57.5%: Frizwick 191, Daeris 166, Morwen 251 across two handles), the hero himself **186** (17.6%),
and every other character in the world combined **263** (24.9%) — of which Ironbriar and the bound captive
account for 165, from two scenes.

Across all 608 companion lines: **zero** instances of a companion refusing an instruction, acting against the
player's stated plan, or holding a position across two consecutive turns.

The clearest measurement is Morwen, whose sheet carries the flaw *"Concedes ground precisely once,
reluctantly, and only when the concession is involuntary."* She raises the Sable thread on her own initiative
at T2364, presses it again at T2379–T2380, and argues to pursue it now. At T2380 the player says he wants to
go home. At T2381 she answers *"Sandpoint, then. Home. I like the sound of that more than I expected to."* —
a full, voluntary concession, in one turn, on the one thing she has pressed for seventeen turns. The player
then reverses himself in the same message, and at T2382 she agrees to the opposite position just as readily.
Her other authored flaw — *"Will choose deflection over honesty at nearly every juncture"* — is inverted at
T2384 and T2385, where she is the most emotionally forthcoming character in the run. Daeris's and Frizwick's
flaws never produce friction either.

One open thread for verification, not a verdict: all three companions carry `want: null` in the fixture's
record, yet `buildAgendaAskNote` fired on T2415, T2416 and T2417 and `COMPANION_AGENDA` tags came back on
T2416, T2417 and T2418. Either the agendas were filed into a slot the fixture does not read, or three
consecutive asks were answered and dropped. That is worth one grep before anything is designed on top of it.

**The insight.** Pass 1's finding 4 asked for a `want` per NPC. The owner's play makes that recommendation
*less* urgent and points at a better lever, because the thing the lens wants — an NPC who will not simply
agree — is **already authored, already in the prompt, and simply never costs anything**. Every companion has a
one-line flaw written in the voice of a real person; the engine injects them; the GM narrates around them.
Baker's 3.1 is the exact point: fandom is not protection, and a companion who agrees with the player 608 times
running is being protected from her own character sheet. Adding a new field would be building a second engine
next to an idle one.

**Recommendation — S, and verify first.** Do **not** manufacture wants (owner ruling 2026-09-05 stands, and
this finding does not need them). One clause where the companion block is assembled: a companion's stated flaw
must cost the party something visible at least once per N turns — a refusal, a withheld truth, a concession
not given. Run the `want: null` check before touching anything. Drift surface (identity + prompt) →
**Fable tier**.

**Settled rulings touched:** none. Companion-wants-optional is respected: this asks nothing of `want`.

---

## 6. The GM never asks "what do you do?" — and this particular player never needed asking

**Position applied** — 4.9 ● ("After every move: 'what do you do?'"), 2.3 ● (say what happens, then ask),
6.3 ● ("Put it in the players' hands"), 4.3 ●.

**What the game does — measured.** The final sentence of all 100 narrations was sampled. **0 of 100** end with
a prompt to the player. **2** end on a question mark, both NPC dialogue; only T2428's is a choice
— *"shall we deliver our trussed friend to Hemlock"* or stand in the sewer air — and it is a false binary.
`SUGGEST` fired on 21 of the 40 tagged turns. Pass-1 finding 3 therefore survives unchanged as a measurement.

Its *significance* does not survive. All 99 player actions in this corpus are free-typed prose. 57 carry
quoted dialogue or first-person narration no suggestion could have supplied; 10 begin lowercase; and **15
carry the owner's own misspellings** — "happed", "diety", "morewen", "reuinite", "trafficing", "magrimar",
"Stay right where I are". A button did not write those. The direction of the fiction is entirely his: the
birthday joke to Ironbriar at T2394, the full-nelson at T2402, freeing the prisoner at T2410.

The sharpest single fact in the corpus sits at T2410–T2411. The player offers Petrin Voss a choice with the
price named — a head start toward the sea cave, or walk the other way entirely, *"Might honestly be the smart
play"*, one hour, his call — then cuts the ropes. That is Baker's 4.3 and 4.4 executed cleanly, **by the
player, to an NPC**, in a game whose GM makes that move once in a hundred turns and only through Ironbriar's
mouth.

**The insight.** The menu-versus-question dissent in lens §9 is real but it is not this player's problem; it
is the problem of the player who does not type like this. For a typist the buttons are inert scenery, and the
cost of pass-1's proposed clause is a prompt edit that buys him nothing. For a Car Mode player, or a tired
one, or a new one, the three buttons *are* the whole conversation. That is a genuine fork and it should be
stated rather than averaged.

**Recommendation — keep pass-1 finding 3's clause, downgrade the priority from S to XS.** The clause (three
options must differ in approach or risk; one should let the player withdraw, wait or pay) is correct and
cheap. It is simply not what is limiting *this* corpus, and it should not be sequenced ahead of findings 1, 2
and 5. Drift surface → **Fable tier** when it ships.

**Settled rulings touched:** the three buttons plus the engine fourth stay. Note also that 6.3 was exercised
and honoured here: the ending was offered and the player declined it twice — verbally at T2380 (*"I'm saying
we wrap this up here"*) and then by extending his own condition at T2381 (*"After Sable. but Sable is the
last"*). The disclaim-decision-making discipline is doing exactly what it was built to do.

---

## 7. Seventeen turns in the hardest register the game writes, and the characters hold

**Position applied** — 3.2 ● ("Name everyone, make everyone human"), `AW-REF` ● ("Elide the action sometimes,
and zoom in on its details other times"), 3.8 ● downgraded per caution 0.3 (as output shape: the fiction shows
the consequence, never the machinery).

**What the game does — measured.** T2347–T2363 is a continuous 17-turn explicit sequence, all
gemini-3.7-flash. **No line from it is quoted in this file.** Measurements only:

- Median narration **182 words** against the run's median of 219 — the shortest sustained stretch in the run,
  which is the correct direction: these turns carry one beat each and the STYLE tail's "write LESS when little
  changed" is landing here.
- The three companions stay individuated throughout. Daeris keeps her obligation-and-debt vocabulary, Morwen
  stays tactical and possessive, Frizwick keeps deflecting through jokes — measured by their distinct
  `speakers` shares across the stretch and by voice, not by count. The #96 `[SAY:]` authoring survives the
  register that most reliably collapses distinct characters into one narrator, which is a real result.
- Consent is asked by the player at T2356 and answered in the fiction at T2357 before the scene proceeds.
- Contract compliance across all 100 turns: **0** em-dashes or en-dashes (STYLE forbids them), **0** slips out
  of second person, **0** meta or engine vocabulary in prose.

The structural note is the same one finding 5 makes: across 17 turns there is not one refusal, redirection or
surprise. Each turn is one player instruction and one compliance, with the clock advancing 15–25 minutes on
rails. Whatever else it is, it is not a conversation with two parties.

The single machinery leak in the entire corpus is at **T2342**, where the narration visibly retracts its own
choice of spell twice inside the prose — *"Wait, that's not right"*, then *"Actually, no. Guidance doesn't mend
ribs either"* — dressed as the hero second-guessing his own memory. One instance in a hundred turns is an
excellent rate; it is worth naming only because it is the exact failure 3.8 describes, and because it happened
on a sonnet turn in an ordinary healing scene, not under any load.

**Recommendation — no change** to the scene handling; record as calibration. If T2342's shape recurs in a
later corpus, it is a STYLE clause ("never narrate a correction of your own previous sentence"), not a
mechanism. **XS at most, and only on a second sighting.**

**Settled rulings touched:** none. The lens has no documented position on content settings (caution 0.5) and
takes none.

---

## What changed from the harness pass

| Pass-1 finding | Status after 100 owner turns |
|---|---|
| **1. Ninety turns cost almost nothing** | **Survives, cause reversed.** Same zero (0 HP tags, 10/10 rolls succeed, +850 net gold). But the human *chose* the peace after his climax. The recommendation is re-scoped in finding 2: keep the `cost` token, drop the costless-stretch trigger, build a coda predicate first. |
| **2. 47 of 64 engine notes are about the filing cabinet** | **Survives, reinforced.** The 12 logged `noteLog` entries in T2415–T2434 are: agenda-ask ×3, say-compliance ×2, scene-cast ×2, presence-audit ×2, undefined-item ×2, location-desc, relationship-audit, mood-audit, stay-behind, consumable. **Not one moves the fiction.** One over-budget note at T2422. |
| **3. The GM never asks "what do you do?"** | **Survives as a measurement (0/100), collapses as a priority.** The owner types 99 free-prose actions with 15 of his own misspellings; the buttons are scenery for him. Downgraded S → XS in finding 6, with the fork stated. |
| **4. NPCs have moods where they need impulses** | **Partly moot, better lever found.** A `want` field is not the gap — three authored *flaws* already sit in the prompt and produce zero friction in 608 companion lines. Finding 5 redirects to the flaw and respects the never-manufacture ruling. |
| **5. The fourth button and the montage note are already Baker moves** | **Holds, and 6.3 got a live test.** The ending was offered and the player declined it twice on his own terms (T2380, T2381). Neither the reckless wildcard nor the montage fired in these 100 turns, so their content is still unmeasured in owner play. |
| **6. The downed ladder stops halfway** | **Untested here.** No HP was lost in 100 turns; there was no downed event, no combat tracker, no roll that failed. The pass-1 caveat stands: that finding still generalises from a single S344 sequence. |
| **7. Ten of twenty turns are a costless "no"** | **Reversed.** `NO_CHANGE` appears on **5 of 40** tagged turns here and never as a refusal — the shortest narration in the run is 110 words, against S226's 19-word floor. The pass-1 defect was a harness artefact (a script repeatedly clicking "eat rations" with none in the pack), not a GM behaviour. **Withdraw the `ENGINE_NOTES_PROTOCOL` clause proposed there.** |
| **8. The world does not move while the clock does** | **Half reversed, half sharpened.** The claim "no SCHEDULE being set" is **wrong** — finding 4 shows one born correctly from NPC dialogue and correctly pending. The underlying gap is real (2 unprompted world events in 100 turns, 0 NPC-initiated approaches), but the trigger must change from schedule-staleness to NPC-initiative-staleness. |
| **9. Every turn is the same size** | **Softened.** Run-wide 110–384 words, median 219; sonnet median 229 (110–384), gemini median 200 (114–306). Real variance by scene: the Ironbriar interrogation runs 251–329 and the explicit stretch 148–278. The clause is landing better than G226 suggested. Stays XS / verification-only. |

## Verification gaps

- **One campaign, one player, one coda.** Every finding here describes post-climax play by a highly fluent
  typist. Nothing in this pass measures a new player, a mid-campaign act, Car Mode, or a fight.
- **`tagLog_last40` covers only T2399–T2437**, and `noteLog` only T2415–T2434. All tag and engine-note counts
  are over those windows, never over the full hundred; the earlier 60 turns are prose-only evidence.
- **The `present` field's provenance is unverified.** It may be the scene cast or the RAG-injected NPC block.
  The safe claim used in finding 3 is the one that does not depend on which: 16 of its 29 names never appear
  in a line of prose.
- **The clock label was checked and cleared.** "Day 27, 12:07 am" at T2343 and the Day 28 → Day 29 boundary at
  T2364–T2365 look like regressions but are not: `clockMin` is strictly monotonic across all 100 turns, and
  `clock.js:236-249` documents the dawn-to-dawn projection (`clock%1440==0` is dawn, +6h wrap) that produces
  exactly this rendering. **No defect.**
- **The model-to-scene correlation is unexplained.** gemini wrote T2344–T2363 (the explicit stretch) and
  T2415–T2437 (the ambush and coda); sonnet wrote T2367–T2411 (the whole investigation). Whether the owner
  routes deliberately by scene type is not knowable from the fixture and was not assumed anywhere above.
- **Finding 1's plot-noun list is mine, not the product's**, and was written after reading this corpus. It
  should be derived from `data.js:110`'s own enumeration before any scan ships.
- **The lens itself** still carries the unread sources named in `baker_lens.md` §11. Every finding above rests
  on ● entries; no ◐ entry carries a verdict in this pass.
