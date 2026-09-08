# Panel review, second pass — the Jemisin lens on the owner's own play

**This is a rubric of documented positions, not the person.** Every entry cites
[`DOC/panel/jemisin_lens.md`](../jemisin_lens.md) by section with that entry's confidence grade. Where the lens
argues against something the owner has settled, the finding says **SETTLED** and records the dissent rather than
actioning it.

**Corpus.** `testRuns/fixtures/owner_runelords_t2338-2437.json` — the last 100 turns of the owner's main
campaign, *Rise of the Runelords (Ammut)*, read in full: `meta`, all 100 `log[]` entries (action, narration,
model, clock, present, location, speakers), `tagLog_last40`, `storyBeats_from_2300`, `chapters_from_2200`,
`noteLog`. Karzoug was slain at turn 2,331; every turn here is coda, and "Write the ending" was on offer the
whole time. Clock: Day 27 7:37 pm → Day 31 7:40 am — 5,043 minutes, 3.50 days, 19 zero-advance turns.
Models: claude-sonnet-5 ×53, gemini-3.7-flash ×46, gemini-3.6-flash ×1. Versions v1.708 → v1.832.

**Reading convention.** In this fixture `action[N]` is the action the player typed *after* reading
`narration[N]`; it produces `narration[N+1]`. Turn 2,437 carries no action for that reason. All pairings below
follow that convention.

**Adult content.** Turns 2,347–2,363 are explicit. They are reviewed as craft and cited by turn number only.
No line from them is quoted anywhere in this document.

**Engine files read for grounding (none edited):** `api.js` (`buildDenouementPrompt`, `DENOUEMENT_SYS*`,
`registerFile`, `buildRegisterNote`), `game.js` (denouement call site, `registerFile` call site),
`helpers.js` (`registerScan`, `REGISTER_WORDS`, `endingOffered`), `identity.js` (`derivePresenceFromResponse`,
`presenceObserve`), `memory.js` (`summarize`), `tag_table.js`.

---

## O1 — With a human at the keyboard, "you" mostly transcribes. Where it doesn't, it edits

**Position applied:** §1.5 (● primary) — second person is "an offer the reader may refuse", and the offer
becomes an assertion when the GM writes speech the player never typed. Plus §1.2 (●) — the mode works by
constant reminder that the character's beliefs "are not yours"; §1.8 (●) — she resisted theorising the mode.

**Measured.** Hand-classified, **44 of the 99 typed actions carry the player's own dialogue** — he does not
issue commands, he writes his character's lines and mixes stage directions in with them. Machine-measured on
the unambiguous subset (a quoted line with an explicit `you say`-family attribution in the same paragraph):
21 turns carry such a line, and on **11 of them the substantive line is not in the typed action**
(t2341, 2343, 2364, 2365, 2400, 2402, 2407, 2408, 2409, 2417 and one more). A full hand pass over the
unattributed lines raises that to roughly 23 of 99 — comparable to the harness pass's 13/50.

The *distribution* is the finding, not the rate. Ten of the eleven machine-flagged inventions follow an action
that was stage direction only. Where the player supplied a line, it comes back near-verbatim: t2410 prints
`"Doesn't matter,"` and `"Petrin. You're free to go."` at 1.00 token overlap with what he typed; t2411's
44-word speech runs at 0.52; t2413 at 0.79; t2339 at 1.00.

**The third category, which the harness could not show.** On four turns the GM keeps the player's meaning and
rewrites his words. The clearest is t2365: he typed *"I think we're going to want to set aside some time for
family time."* The narration printed **"I think we're also just gonna carve out time,"** and then continued
into a sentence he never wrote. Same at t2342 (0.20 overlap), t2408 (0.25), t2414 (0.25 on the second clause).

**Insight.** The harness pass concluded that the offer becomes an assertion when the GM invents speech. Against
a real player the sharper failure is quieter: the GM *edits*. An invented line is visible — the player knows he
did not say it. A rewritten line reads as his own, in the house voice, and he will not notice that his register
was corrected. §1.5's "you have a choice, you can reject it or empathize" survives invention; it does not
survive silent revision, because there is nothing left to reject.

**Recommendation — XS, drift surface (Fable-tier).** Extend the harness pass's proposed `PERSON` clause with a
second obligation rather than a second sentence: *when the player's action supplies a line, print it as
written — the framing around it is yours, the words are not.* The metric already exists and is cheap: token
overlap between the typed action and the PC-attributed quoted line, which should be ≥0.9 whenever the action
contained dialogue. Volatile-half; stable half stays byte-identical.

**Settled:** second-person present. The lens records the dissent (lens §11) and does not reopen it.

---

## O2 — At turn 2,342 the narrator's uncertainty became the hero's failing memory

**Position applied:** §1.2, §1.3, §1.4 (● primary) — the mode's mechanism is the sprite that keeps reminding
you the character is not you; the design goal is distant and intimate held open at once; its original purpose
was to encode "the not-all-here of her". Plus §7.4 (●) — "Overwriting is condescending."

**Measured.** Turn 2,342, claude-sonnet-5. Daeris casts a healing on the rescued captive. The narration
describes the spell, then retracts itself — **"Wait, that's not right; you catch yourself before it goes
wrong"** — describes it differently, then retracts again: **"Actually, no. Guidance doesn't mend ribs either,
and you know it"**. The model was unsure which capability was in play, and wrote both corrections into the
second person, attributed to the hero's own mind.

One turn. One occurrence across 100. It is not a frequency problem.

**Insight.** In third person a narrator's self-correction is a stumble the reader forgives. In second person it
is characterisation, because the only mind in the sentence is the protagonist's. Twice inside one paragraph the
player is told that his memory of his wife's magic is unreliable — and this is a hero who has been married to
her for the length of a campaign. §1.4 is exact about what the mode was built to carry: a mind not all present.
The game delivered that effect, at full strength, about the wrong thing, on a turn whose actual content was
tenderness.

The engine cannot see it. `cleanTxt` strips tags; `personDriftDetect` checks grammatical person and would pass
this line, because it *is* second person; `registerScan` (#355) checks a vocabulary. There is no census for the
class "the narrator broke frame" — and #355 proves the class is cheap to cover.

**Recommendation — S, drift surface (Fable-tier).** One new scan in the #355 shape: a small closed word list of
self-correction openers (*"wait, that's not right"*, *"actually, no"*, *"correction:"*, *"scratch that"*,
*"let me rephrase"*, *"on second thought"* as a narrator-voice opener), run by the same `registerFile` call site
on the cleaned narration, filing to the same capped ring and arming a one-shot note in `buildRegisterNote`'s
pattern. This is a table entry plus a note builder, not a new mechanism, and the sabotage test writes itself:
plant one opener, assert the note fires once.

**Not settled.**

---

## O3 — The coda produced the harm this lens asks for, then closed it by arrest — and the name that would have opened it was already in the save

**Position applied:** §3.2 (●) — oppression must be structural and self-maintaining, "you've got people
complicit in the system who are part of it themselves"; §3.4 (●); §5.5 (●) — withholding is a reward, not a
trick; §7.3 (●) — glossaries and maps are spoilers, hers go at the back; §9.1 (●) — the named failure is the
restoration plot.

**Measured.** The coda's investigation is genuinely structural. At t2395–2397 Ironbriar lays it out: a caravan
loss compensated in four days with no investigation, a magistrate's seal deliberately smudged over a signature
that shouldn't be there, an informant who went quiet. **"Every thread that's touched this name so far has led
back to money moving somewhere it shouldn't."** He is explicit that the protection is internal: whoever runs
this is "inside these walls". At t2423, under Daeris's Zone of Truth — a compulsion the fiction treats as
canon-grade — Sable confirms the shape herself: **"You kill me, Varn clears the ledger by midnight."**

Two turns later, Morwen: **"Every single drop, buyer, and fence in the district. The network's done."** The
party hands Sable to Sheriff Hemlock, eats, and goes to bed. Varn, the Magnimar warehouse and the two crates of
volatile Thassilonian glass are never touched again across the remaining twelve turns.

Two engine facts sit underneath that.

1. **The schedule never fires.** `meta.schedule` holds exactly one entry: `sch1_44790`, *"Ironbriar identifies
   the magistrate behind the smudged caravan-payout seal"*, born at clock 41,910 (the Ironbriar interview) and
   due at 44,920. Play stops at clock 43,300. The promise is **1,620 minutes — 27 campaign hours — short of
   firing.** Ironbriar's own line is the promise: **"I can find out who that seal belongs to. Give me a day"**.
2. **The answer was minted before the question finished.** The presence roster for turn 2,397 — the very turn
   Ironbriar says he needs a day to turn the smudge into a name — reads
   `["Ironbriar","Sable","Magistrate Coraline Vess","Face-Stealer","Petrin Voss"]`. **"Magistrate Coraline
   Vess" appears in zero of the 100 narrations.** She exists in the save and has never been spoken.

**Insight.** This is §3.2 built and then unbuilt. The engine and the GM together produced exactly what the lens
asks for and the three-act skeleton usually cannot represent: a harm with no overlord to kill, financed,
self-maintaining, staffed by people complicit in it. Then the coda resolved it the way a villain plot resolves —
one person, one cell — while the fiction's own testimony said that would not work.

The instrument that would have carried the structure forward is the schedule, and the schedule is a clock the
player simply outran. Meanwhile the reveal it guards is already a registered entity, and the player-facing
surfaces (`map_viewer`, the NPC browser) are exactly the front-matter §7.3 objects to: a name in the roster
before it is a name in the story is a glossary spoiler with a magistrate's title attached.

**Recommendation — M, design conversation before code.** Two separable pieces, and the lens picks only the
first:

- **(a), recommended.** A schedule whose `dueMin` is past the campaign's last played minute is an unfired
  promise, and the denouement should name it. `buildDenouementPrompt` (api.js:648) does not read
  `worldState.schedules` at all. Adding a `PENDING` block beside `UNFINISHED` costs one loop and makes the
  ending honour the thread the coda actually ended on. Drift surface → Fable.
- **(b), flagged not picked.** Whether an NPC minted to answer an unasked question should be visible to the
  player before the reveal is a real design fork with a real cost on the other side (silent state is the
  product's stated enemy). Naming it, not resolving it.

**Not settled.**

---

## O4 — The denouement prompt cannot see the wives

**Position applied:** §5.2 (●) — structure is an empathy-financing instrument; §9.2 (◐ paraphrase) — endings
should open forward; §9.4 (●) — agency is dramatised by contrast between characters, not asserted about one.

**Code fact.** `buildDenouementPrompt` (`api.js:648–661`) assembles, in order: CAMPAIGN (hero name, class,
level), ERAS, CHAPTERS, QUESTS (`memory.quests`), UNFINISHED (`worldState.questLog`), DEFINING MOMENTS
(`coreMemories`), DEATHS, VOICE. The call at `game.js:3197` is
`callGM(buildDenouementPrompt(), denouementSys(), 1500, null, {kind:"other", noHistory:true})` — a sysOverride
with no history. **Those eight blocks are the entire input.** There is no companion block, no party roster, no
relationships, no schedules, no story beats, no locations.

**Measured against this save.** `meta.openQuests` is `[]`, so the UNFINISHED block would be empty. The chapter
tier, filtered from turn 2,200, holds **five summaries — all from turns 2,417–2,434, all narrating one night in
Ameiko's cellar**. So a denouement written at turn 2,437 for a 2,437-turn campaign draws on five paragraphs
about a pantry, an era block, 22 defining moments and a voice string.

The fiction at that moment holds at least seven live threads: the crack under the Pinnacle (t2338, Morwen:
**"That's something standing up."**); the magistrate's seal; Varn's warehouse; the two crates of glass;
Morwen's stolen Lorrath grimoire (`COMPANION_AGENDA` fired at t2416, 2417, 2418); Daeris's "seventeen unmoored
obligations"; Frizwick's search for "a place where leaving does not cost her something vital". **Three of the
seven live in companion motivation fields the ending prompt does not read.**

`DENOUEMENT_SYS_TOLD` asks the GM to "end on the hero and the world they made". Frizwick, Daeris and Morwen
reach that prompt only where a chapter summary happens to name them — as operatives in a cellar ambush. That
the hero is married to all three appears nowhere in the input.

**And the world he made is the part that is missing.** Read as authored behaviour rather than plot, these 100
turns have one consistent through-line, and it is the player's, not the GM's: **every captive is fed, named and
released.** The bound captive is healed, asked his name and delivered to sanctuary (t2338–2345); Petrin Voss is
fed from the party's own rations, given his name back, and cut loose with an hour's head start (t2405–2411);
Grik is untied, fed, and sent off to **"become a mushroom farmer"** (t2426–2428). He declines to loot the
Thassilonian glass because it would endanger Ameiko (t2429–2430). He tips a bathhouse attendant ten gold, well
past what he was buying. None of that is a quest. Most of it will not be in a chapter. It is the answer to
§9.1's actual test — this ending restores nothing and opens forward — and the ending machinery has no channel
for it.

**Recommendation — S, drift surface (Fable-tier).** Add a COMPANIONS block to `buildDenouementPrompt`: each
living party member's name, their relationship to the hero, their motivation, and any open
`COMPANION_AGENDA`. Same shape as the blocks already there, `""`-clean for a partyless save so every legacy
campaign stays byte-identical. This is the smallest change that lets §9.4's instrument reach the last page.

**Not settled.** The ending being *offered and never forced* (#325) is settled and correct; this finding is
about what the offer, once accepted, would be written from.

---

## O5 — "The world went on without the hero" is announced six times and staffed once

**Position applied:** §5.4 (●) — "I had to actually kind of stop that, because it was a little too obvious";
§3.5 (●) — a society is legible as a resource-allocation system, labour included; §8.2 (●) — the cost must be
shown; §2.6 (●) — environment generates pressure, pressure generates culture.

**Measured.** The world-indifference beat lands **six times in 100 turns**: t2338 (the world "don't yet know"),
t2343 — **"a city that has no idea a Runelord died screaming this week"** — t2379 (the same sentence, longer),
and t2385 twice, including **"entirely uninterested in the fact that the two of you just helped kill a
god-king"** followed by "Nobody here cares." It is a good line. It is the same line.

**The one turn that dramatises it instead of asserting it is t2344**, and it is the best beat in the fixture:
while the party was still on the mountain, Wyla Ashvane finished a batch of ember-rune bracelets, **"boxed them
up, and set them aside on her back workbench under a clean cloth"**, wondering who would live to collect them.
An offscreen NPC doing her job on the campaign's clock. **Wyla appears in the presence roster exactly once
across 100 turns.**

**Who does the work.** The labour roster is genuinely there and is one of the coda's real pleasures: a temple
night-attendant with ink-stained fingers, a bathhouse attendant, a chop-house cook with forearms like ham
hocks, a counter girl, fishmongers, dock crews, an innkeeper, a sheriff, a magistrate. But the speaker map
records the bathhouse attendant across **five turns** (t2345, 2369, 2371, 2382, 2383), eight lines at t2371
alone, two tips including ten gold — under the key **"Attendant"**. She is never named. In the same 100 turns
Grik the goblin, on stage for three turns, is named, untied, fed, given a future and released.

**Insight.** §3.5 is the single most transferable sentence in the lens — her own world, described for a
roleplaying game, as a system where "food, weapons, labor, knowledge" get shuffled around. This coda is halfway
there. It knows the city has workers and it puts them on the page with real specificity; it does not yet treat
them as people the record keeps. The asymmetry is exact: characters the *plot* needs get `[NPC:]` registration
and a name, characters the *world* needs get a role noun. And on the motif, §5.4 is the rule the engine has no
counterpressure for — the STYLE tail forbids overwriting a beat, but nothing notices a beat that has already
landed five times.

**Recommendation — no change to the motif** (it is the GM's choice, and the turn that does it properly, t2344,
shows the model can). One XS candidate, offered as an observation rather than a demand: the scene-cast ask
already exists; nothing in `DEFAULT_RULES` says a service character who speaks across three or more scenes has
earned a name and an `[NPC:]` line. Worth a measurement on a second campaign before it is written, since a
single save's cast may be doing the work.

---

## O6 — There is no trust curve. Register tracks scene function, not campaign age — which retires the harness pass's remedy

**Position applied:** §10.1 (● primary) — "your trust factor changes as you proceed through the book";
§7.1 (● byte-verified slide) — at high immersion, "Explain little"; §7.4 (●); §1.6 (●).

**What the harness pass claimed.** F8 measured that the prose contract is constant from turn 1 to turn 2,437,
proposed a two-rung volatile `STYLE` clause switching on campaign age, flagged it as a genuine fork, and
observed that the model "may already be doing it unaided — which is an argument for measuring before building."

**Measured here, on 100 real turns at the far end of the campaign.** Dialogue as a share of narrated words, by
phase: return/road (t2338–2346) 23%; the explicit stretch (t2347–2363) 7%; domestic (t2364–2393) 29%;
investigation (t2394–2417) 34%; the Sable operation and coda (t2418–2437) 34%. Turns carrying a single speech of
40 or more words: **0** in the explicit stretch, 5 in the domestic, **7 in the 24-turn investigation stretch**,
1 in the finale.

At **t2395, t2396 and t2397 — three consecutive turns at campaign turn 2,396 — Ironbriar delivers 56-, 58- and
59-word speeches**, at 72%, 67% and 66% dialogue. That is a three-turn exposition block, structurally identical
to the fresh-campaign t21 guardsman monologue the harness pass flagged as the onboarding cost of the mode.

And on the same day, in the same corpus, the GM does the delicate thing that §10.1 licenses late. At t2387, over
breakfast, Morwen asks: **"You really don't remember the bridge in Kaer Maga? The rope, the goat, the extremely
judgmental fisherman?"** No gloss. No follow-up. "Kaer Maga" appears once in 100 turns. That is §5.5's blanket —
a detail seeded and not chased — and it lands 2,387 turns in, in a scene with no plot in it.

**Insight, and the correction.** The variable is not how long the player has been here. It is whether the turn is
carrying information. At turn 2,396 the GM explains exactly as hard as at turn 21 — correctly, because that scene
*is* the informant interview and the player asked for the folder. Eight turns earlier it explains nothing,
correctly, because that scene is eggs.

A turn-count gate would therefore fire on the wrong axis: it would grant licence to be delicate in the one scene
where explaining is the job, and it would not touch the scenes that are already delicate. The model is choosing
correctly on the axis that matters, and the engine does not know that axis exists.

**Recommendation — no change, and retire F8's two-rung proposal.** The fork F8 flagged for the owner is settled
by measurement rather than by ruling: do not add a campaign-age prose clause. If a licence is ever wanted it
should key on scene function, and the honest reading of this corpus is that it would be prompt weight spent to
tell the model something it is already doing. **This is the finding I most want on the record, because it is the
harness pass's most actionable idea being withdrawn by real play.**

---

## O7 — Four campaign days of memory: five chapters about one pantry, one past that never happened, and the tier the register fence does not cover

**Position applied:** §6.1 (◐) — knowledge shifts "under the pressure of survival"; §6.2 (◐) — each volume
re-reads the past; §6.3 (●) — nostalgia distorts; §3.5 (●); §11 (settled) — the clerical-image ban.

**Measured, three ways.**

**(a) What the chapter tier kept.** `chapters_from_2200` holds five summaries, at t2417, 2421, 2425, 2431 and
2434 — every one from the final twenty turns, every one narrating the Sable cellar operation. Nothing from
t2338–2416: not the descent from the Pinnacle, not the captive who got his name back, not four days of marriage,
not the Ironbriar interview, not Petrin Voss. Either those turns rolled into era-level compression (the likely
reading — `compileEraIfDue` runs after each summarize) or they were never chaptered. Either way, **the CHAPTERS
block that `buildDenouementPrompt` reads verbatim is five paragraphs about one night in a cellar.**

**(b) What the GM invented and the record accepted.** The Kaer Maga anecdote at t2387 — the rope, the goat, the
judgmental fisherman — is new past, minted in a breakfast conversation. The player's own next action begins
*"Morwen have you EVER done anything humiliating? Not that I can remember."* He does not remember it because it
never happened. He played along, and it is now shared canon. This is §6.1 happening live and it is *good* fiction —
but nothing in the three registers distinguishes a past the GM recalled from a past the GM just wrote. Record,
memory and rumour are kept apart by construction (the harness pass's F4 stands); *invention* is not a fourth
register, and at turn 2,387 it entered through the front door.

**(c) The fence, and the tier behind it.** Running the shipped `registerScan` (helpers.js:125–128) over these
100 narrations flags **23 hits across 20 of 100 turns** — 12 from claude-sonnet-5, 11 from gemini-3.7-flash. It
is the campaign's idiom, not a model quirk; "ledger" appears in five consecutive turns at t2374–2378. The ban is
correctly scoped: it bans the *word*, not the economy. **None of the three companion sheets trips it** — Daeris's
motivation ("Find the original creditor… ensure the seventeen unmoored obligations do not destroy people who
never knew they were owed") survives untouched, which matters, because those three motivation fields are the
only social system this coda contains and §3.5 is the reason to protect them.

**The gap.** `registerFile` is called at exactly one site — `game.js:1808`, on the cleaned narration. Chapter
summaries produced by `summarize()` are never scanned. **Chapter t2417 contains "ledgers."** `buildDenouementPrompt`
reads `memory.chapters` verbatim. The banned register can therefore reach the campaign's last page through the one
tier the fence does not cover.

**Adjacent measurement, stated plainly because it is a cost of a stated preference.** Across the 100 turns,
gemini-3.7-flash carries modern-world referents at **0.59 per turn against claude-sonnet-5's 0.21** — 2.8×
(gemini: Christmas, fiscal quarter, refrigerator, low orbit, napalm, artillery, holy grail, python, starfish,
space heater; sonnet: Christmas, war crime, dinner theater, bargain bin, production values). Two of the five
chapter summaries carry them into permanent memory: "divine polygraph clinic" and "Thanksgiving poultry"
(t2425), "ancient napalm" and "crater" (t2431). A modern referent inside a turn is a slip the reader forgets; the
same referent inside a chapter summary is canon the ending will read. The owner's preference for gemini prose is
a settled ruling and this does not reopen it — but the leak hardening into the memory tier is a different fact
from the leak appearing in a turn, and it should be visible before it is priced.

**Recommendation — XS, drift surface (Fable-tier).** Call `registerFile` on each new chapter summary inside
`summarize()`, after `applySummaryExtract`, filing to the same capped ring so the next turn's note names it.
One call site, no new mechanism, and the failing test is direct: a chapter containing "ledgers" must arm the
register ping. The anachronism half is a measurement to repeat on a matched pair, not a fix to ship.

**Settled:** the clerical-image ban itself, and the gemini prose preference. Both recorded, neither reopened.

---

## O8 — What the engine believes is in the room, at the end of a coda

**Position applied:** §1.2 (●) — the mode works because the sprites keep reminding you the character is not you;
§6.1 (◐).

**Measured.** Across the 100 turns the per-turn `present` roster names **31 distinct entities. Thirteen ever
speak. Eighteen appear in no narration at all.** Among them:

- **Karzoug**, slain at turn 2,331, is listed present on 5 coda turns (t2338, 2346, 2364, 2380, 2395).
- **"Face-Stealer"** is listed present on **18 turns** (t2340 through t2415) and is named in zero narrations.
- **"Magnimar Apothecary (Wormwood's)"** — a shop — is listed present on 11 turns.

Separately, the same companion is recorded under two speaker keys: **"Morwen Zethran" on 36 turns** (t2338–2356,
t2398–2437) and **"Morwen" on 21** (t2361–2393). The identity registry's own relationship rows in `meta` use
"Morwen Zethran" throughout. The split is not cleanly model-aligned; both keys appear under both models.

**Insight.** §1.2 is why the second person holds here: the character sheet, the portrait, the named self in
`[SAY:]` are the sprites that keep "you" from collapsing into wish-fulfilment. A roster in which a dead Runelord,
an entity that has never been described, and an apothecary are all standing in the room is a sprite that has
stopped tracking. Nothing reached the page — that is precisely the point, and it is the silent-drift class the
product exists to catch.

**Recommendation — no change from this lens.** Hand the three counts to the identity contract as a reproduction
case. One caution for whoever takes it: `presenceObserve` explicitly refuses the dead (`identity.js` — "the dead
don't travel"), so whatever populates this roster is *not* that function. The mechanism is untraced, and a craft
review is not entitled to a diagnosis it did not earn.

---

## What changed from the harness pass

The first pass read 90 narrations from three fixtures (a 50-turn fresh campaign under `howard`, two 20-turn
mature slices under `abercrombie`), all machine-driven. This pass read 100 turns of a real person playing his own
campaign past its climax. Five things moved.

1. **The speaks-for-you finding survives but changes shape.** The harness rate was 13/50; the owner rate is
   comparable (~23/99 hand-counted, 11/99 on the strict machine subset). But because he writes his own dialogue on
   44 of 99 turns, the GM's dominant behaviour is transcription, not invention — and a *third* behaviour appears
   that the harness could not produce, because a harness never supplies a line to be edited: the GM keeps the
   player's meaning and rewrites his words (O1). That is the more dangerous version of the same fault.
2. **F8 is withdrawn.** The harness pass flagged the campaign-age prose clause as a genuine fork for the owner and
   asked for measurement first. The measurement is in: the GM's explanatory register tracks *scene function*, not
   campaign age, and explains as hard at turn 2,396 as at turn 21 when the scene is an interview (O6). A turn-count
   gate would fire on the wrong axis. No prompt weight should be spent here.
3. **F4 (the memory stack is the strongest surface) stands, with one qualification.** Record, memory and rumour are
   still kept apart. But invention is not one of the three registers, and at t2387 the GM wrote new shared past into
   a breakfast conversation, which the player ratified by playing along (O7b). That is good fiction and an open
   question, not a defect.
4. **F6's honest limit is now concrete.** The harness pass recorded that the engine can close an emergent thread but
   cannot promote one. This coda shows the cost from the other end: at t2437 `openQuests` is empty while the fiction
   holds at least seven live threads, three of them in companion motivation fields the ending prompt does not read,
   and one of them a schedule the player outran by 27 campaign hours (O3, O4).
5. **A finding the harness could not have produced at all.** O2 — the model's own self-correction printed into the
   second person as the hero's failing memory — requires a long, intimate, low-stakes scene to happen in. The
   harness never plays one.

**On the question the brief asked — what is the player writing, refusing the ending for 100 turns?** Not a
restoration plot. §9.1's failure mode is wanting the world back the way it was, and nothing here wants that: the
Pinnacle stays cracked, Magnimar stays corrupt, the magistrate stays unnamed, and Morwen says plainly at t2381
**"Sable doesn't go away because we stopped looking, Ammut."** He is writing a **denouement in real time, at
five-minute clock resolution** — 19 turns advance no time at all, and eight consecutive turns sit at 10:45 am. He
already wrote the ending's thesis himself, in his own hand, at action@2380: *"I'm saying we wrap this up here.
Head back to Sandpoint, say our goodbyes and head home."* Then he played 57 more turns of it.

What a denouement would owe him, on this evidence: the three releases and the food that went with each of them;
the attendant he overtipped; the cottage he has named twice and never seen; three wives with three unfinished
motivations; and the promise Ironbriar made that the clock never let him keep. The button offers to compress into
400 words the thing he has spent 100 turns choosing to inhabit — and the prompt behind that button, today, cannot
see six of those seven items.

---

## Verification gaps

- **§1.1–§1.3 and §1.5 (Clarkesworld) remain ◐ in practice.** O1 and O2 lean on §1.2/§1.4/§1.5. The §1.4 quotes
  (`TRICK`, `LH`) and §1.9's slide text are her own words and byte-verified; the Clarkesworld phrasings came through
  a summarizing fetch layer twice and were never read off the raw page. Re-verify before any of them is printed
  rather than applied.
- **One save, one player, one campaign.** Every count here is from a single 100-turn window of one person's play.
  O5's naming asymmetry and O1's 44/99 dialogue rate in particular describe *this* player's habits; a second owner
  campaign would say whether they describe the engine.
- **O8's mechanism is untraced.** The counts are solid; the cause is not. `presenceObserve` refuses the dead, so the
  roster is populated by something else, and this review deliberately stops there.
- **O7(a)'s chapter gap has two readings** — era compression (likely) or a summarize cadence anomaly (unlikely). The
  fixture carries no `eras` array, so the reading could not be closed from this file. The consequence for the
  denouement is the same either way, which is why the finding is stated on the consequence.
- **The action/narration off-by-one is a fixture convention, not an engine behaviour** — confirmed by t2437 carrying
  no action and by five verbatim action-to-next-narration matches. Any re-run of these scripts must use the same
  pairing or every overlap number inverts.
- **No verified statement from her about AI-generated fiction exists** (lens caution 6). Nothing in this review
  attributes a view of a machine narrator to her; O2 is grounded entirely in her second-person positions.
- **§3.1 (power dynamics as a named worldbuilding step) is MasterClass titles only.** O3 leans on §3.2 and §3.4,
  both ● from her own blog and Cornell, rather than on that ◐ item.
