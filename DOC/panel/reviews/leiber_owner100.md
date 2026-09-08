# Panel review — the Leiber lens on the owner's own hundred turns

**Member:** the Leiber lens ([`../leiber_lens.md`](../leiber_lens.md)) — a rubric of Fritz Leiber's
documented positions, not the person, and not an impersonation. Every finding cites the entry it applies.
Grades: ● primary · ◐ secondary · ○ uncertain · ●ƒ his own fiction (evidence of practice, never a rule on
its own).

**Second pass.** The [first pass](leiber_findings.md) measured three *harness* corpora — twenty and fifty
turns, thrown-away characters, a script driving the player side. This pass reads
`testRuns/fixtures/owner_runelords_t2338-2437.json`: the last hundred turns of the owner's real campaign,
typed by a human, at the one moment in the source material the lens cares about most. Karzoug died at turn
2331. These hundred turns are the coda — the heroes down off the mountain with the take, in the city, which
in Leiber is precisely when the take is lost and the city comes calling.

**Adult mode is on and roughly fifteen turns are explicit.** No explicit line is quoted anywhere in this
document; those turns are cited by number and reviewed only as craft.

**The corpus, measured.**

| | |
|---|---|
| Turns | 100 (t2338–t2437), Day 27 7:37 pm → Day 31 7:40 am — **3½ in-world days** |
| Models | claude-sonnet-5 ×53, gemini-3.7-flash ×46, gemini-3.6-flash ×1 |
| Engine versions | v1.708 → v1.832 (**every turn predates the #355 register guard at v1.839**) |
| Where | Magnimar 54 · North Road 20 · Sandpoint 20 · sea approach 4 · Storval Stairs 2 |
| Open quests at the end | **0** · story beats after t2331: **0** · schedule entries: **1** |
| `GOLD` tags in the 40 turns with tag records | **1**, and it is a gain (+850 gp, t2425) |
| `DICE` outcomes in those 40 turns | **10 rolled, 10 `SKILL_SUCCESS`, 0 failures** |
| Combat | **none**. Hero HP 131/131 at the close; nobody in the party is wounded once |
| Turns with tagged speech from ≥2 companions | **47 of 100** (sonnet 17/53, gemini 29/46) |
| `REGISTER_WORDS` hits in the narration | **23 across 20 turns** (gemini 11, sonnet 12) |

---

## 1. The ledger ban lost a fifth of the owner's turns, both models equally, and the guard built for it cannot reach two of the three channels

**Position applied:** 10.5 (◐ — sorcery, treasure and menace are what a scene is for), 1.1 (● — the
definition fixes the culture-level and the supernatural element), 9.5 (●/◐ — "To merit serious
consideration, fiction must convince the reader").

**What the game does.** Three layers guard this. `data.js:110` NEVER ADMINISTRATIVE forbids building plots
on paperwork. The STYLE tail (`api.js:2221`) forbids the clerical *image*: "this world keeps no books.
Debts are blood, oaths, hunger and memory." And #355 (v1.839) added `registerScan` over a tight list of
fifteen clerical nouns plus `buildRegisterNote`, a one-shot next-turn correction naming the word.

**Measured.** Running the shipped `REGISTER_WORDS` list over these narrations flags **23 occurrences on 20
of 100 turns** — gemini 11, sonnet 12, a dead heat. The word "ledger"/"ledgers" alone accounts for 18. The
worst stretch is five *consecutive* sonnet turns in the quietest domestic scene in the corpus, t2374 to
t2378: "a woman who has stopped keeping a ledger on nights like this one" · "that quiet, ledger-closed
look" · "the ledger doesn't close itself, Ammut. Even when I want it to." · "that ledger-look gone soft
around the edges" · "the ledger in her head apparently granted a night off". Gemini's Temple of Abadar
scene does the same in four turns: an iron ledger, the church's ledgers, "the holy bookkeepers", and
Frizwick's "dump him on the holy accountants before someone notices we smell like burnt wizard".

Every one of these turns ran at v1.832 or earlier, so **this is the before-picture for #355 and the field
check now has a baseline number: 23 hits per 100 turns.**

Two channels remain outside the guard even after v1.839, and both are measured here:

- **The plot.** A scan for administrative nouns the #355 list deliberately excludes returns **31 hits on
  13 turns**, and they are not scattered colour — they are the entire clue chain of the arc the GM
  improvised for the coda. t2395–2397: a requisition complaint, a caravan loss report, a trade protection
  fund payout approved in four days, a smudged magistrate's seal. "Somebody wanted that complaint closed
  and forgotten." t2416–2417: payment vouchers, tallies, the counter-signature of a clerk named Varn.
  t2425: bearer notes, routing slips, manifests. The engine's *own* single scheduled promise for the whole
  coda is `sch1_44790`, "Ironbriar identifies the magistrate behind the smudged caravan-payout seal". The
  word scanner catches none of this, because none of these are on the list — correctly, since each word is
  legitimate English. `data.js:110` is the rule that applies, and nothing enforces it.
- **The party sheets.** `buildPartyHistoriesBlock` (`api.js:587`) injects each companion's authored
  motivation into **every turn, forever**. Daeris's reads: "Find the original creditor… close the account
  properly… the seventeen unmoored obligations." Morwen's: "Fey Court contract law to break or legally
  void the terms of active bloodline debts." Two of the three companions are, by authored canon,
  accountants. At t2417 Daeris says it out loud: "Every unrecorded transaction leaves a ghost behind."

**Insight.** This is the [prompt-channel-beats-position](../../../CLAUDE.md) lesson pointed at the guard
itself. `buildRegisterNote` is a one-shot note delivered *once, on the next turn*. It is competing against
a block that reappears on every turn and describes the speaker's whole reason for existing. A one-shot
cannot win that, and five straight sonnet turns of "ledger" is what losing looks like. The root cause of
this corpus's clerical register is not the model's metaphor vocabulary at all — it is that the character
sheets are ledgers and the prompt reads them aloud every turn.

Note also a **third surface with no guard at all**: `summarize` runs as a separate extraction call
(`kind:"summarize"`, `noHistory:true`, `memory.js`), receives the author voice but not the STYLE tail, and
is never scanned by `registerFile` (which runs only on the cleaned narration, `game.js:1808`). The chapter
summary at t2417 — player-visible in the quest journal — contains "ledgers" and, separately, compares a
person to Thanksgiving poultry.

**Recommendation — S now, M later, Fable both.** ① **XS, off-Fable:** run `registerScan` over the chapter
summary too, and add the missing plurals — "balance sheets" at t2363 escapes the list because
`balance sheet` is not pluralised in `REGISTER_WORDS`. ② **S, Fable:** when a companion's authored
motivation trips `registerScan`, that is a character-creation defect, not a narration defect; surface it
once at the sheet, not every turn in the prompt. ③ **M, Fable, and a genuine owner fork:** the
administrative *plot* is not reachable by any word list. The honest options are a plot-level rule with
teeth or an accepted carve-out that a heist's paper trail is a legitimate prop. The lens's own position is
narrower than a ban — 10.5 says a scene needs sorcery, treasure or menace, and a smuggler's manifest that
leads to a cellar ambush has menace. What it does not have is any of the other two.

**Settled?** Ledgers-banned-as-a-story-device is a settled owner ruling and this finding endorses it. What
is open is that three of the four channels carrying the violation are outside the shipped guard.

---

## 2. The take came home and was banked. One gold tag in forty turns, and it points up

**Position applied:** 6.3 (◐/●ƒ — the take rarely survives the story; "Unlike men, rubies and emeralds do
not rest quietly"), 6.1 (◐ — poverty is the recurring motive), 6.4 (● — "Gold and glory drive action" is
the tone's own text at `data.js:4`).

**Measured.** In the forty turns with tag records there is exactly **one `GOLD` tag, at t2425, and it is a
gain**: eight hundred and fifty gold in bearer notes out of Sable's lockbox. The hero closes at
**16,683 gp**, the same figure the first pass recorded. Across all 100 turns the narration contains two
outgoing payments — fifteen gold at the bathhouse door (t2347) and a ten-gold tip pressed on the attendant
(t2371) — and **both were typed by the player**, not asked for by the world. Nobody offers the party work.
Nobody names a price. Nobody steals anything. For handing a wanted Magnimar fence to the sheriff, the
entire compensation on offer is Hemlock's: "You'll get a receipt and a cold beer, Frizwick, and you will
like it."

The decisive moment is the player's own, at t2376. Daeris raises the one real economic problem in the
corpus — how to move a dead king's jewellery without a fence in the Underbridge selling them out — and the
owner types back that they do not need to sell the jewels *at all*, they will carry them home to the
cottage. The GM's reply is the character's honest one: "the ledger doesn't close itself, Ammut." But the
thread closes anyway. Frizwick's plan at t2364 — "spend an obscene amount of gold on something stupid" —
is never executed in the ninety-three turns that follow.

**Insight.** The first pass called this a ratchet and inferred it from twenty-turn harness windows. On a
hundred turns of a human's own play, at the exact narrative moment Leiber built the pattern for, it holds
and hardens: the coda is where the take is supposed to evaporate, and instead it is deposited. The lens
will not argue that the owner should be robbed. The finding is narrower and it is the one from §13 of the
rubric: **gold no longer buys anything the player wants.** Sixteen thousand gold and a Runelord's regalia
bought a bath, two bottles of wine and a plate of eggs. The single most alive economic beat in the corpus
is a tip — the player choosing, unprompted, to overpay a tired night attendant by ten gold because he liked
her, and getting a change in her posture for it. That is the demand side working perfectly, and the engine
had no part in it.

**Recommendation — M, Fable, and unchanged from the first pass except that it is now corroborated on human
turns.** #303 already ruled the shape (settlements offer something worth wanting; purchase through the
existing `[GOLD:-N]`), and #303 is archived as done. This corpus says the offer did not arrive in
fifty-four turns of Magnimar and twenty of Sandpoint. Before designing anything new, check whether
`buildMarketNote` fired at all in this window — the `noteLog` for t2415–t2434 shows it did not, across
twenty turns in a named settlement.

**Settled?** No. Inventory size is settled; the ratchet has still never been ruled on.

---

## 3. Something stood up under the mountain on the first turn of the coda, and no turn since has mentioned it

**Position applied:** 5.5 (●/◐ — "Understatement is the horror writer's surest tool"), 9.1 (●/◐ — "No
wonder without fear, no fear without wonder"), 9.3 (◐ — Lovecraft's method was confirmation, not
revelation), 7.5 (◐ — death is not the only exit; the heroes withdraw constantly).

**Measured.** t2338 is, by this lens's own standards, the best writing in the corpus. A crack in the
Pinnacle widening while the party watches; Morwen counting seconds and not liking her own math; the thing
below described only by what it is not — "that's not nothing settling. That's something standing up." The
party's answer is to leave: "We climbed this thing once. Once is the whole allotment." And the closing
image lets the unnamed thing keep breathing: "the crack keeps breathing its pale dust into the evening
sky", patient after ten thousand years of practice.

Then it is gone. A scan of all 100 narrations finds the Pinnacle mentioned three more times — as a place
receding (t2341, t2343, where the tremor fades "from a felt thing to a rumor to nothing at all") and once
at t2393 as the mountain Grik was posted on. The bone ring is never mentioned again. `storyBeats_from_2300`
records nothing after t2331. The single live `schedule` entry is the magistrate's seal. There is no
`FUTURE_EVENT` for it.

**Insight.** Two things are happening at once and both matter.

First, the retreat vocabulary the first pass found missing (finding 6: zero matches for `flee`, `retreat`,
`outmatched` anywhere outside the foe-side plot-armor code) **is present in this corpus** — and it arrived
from the player, on turn one, unprompted, as a joke. That is the lens's position 7.5 and 4.5 landing
together without any engine help.

Second, the engine filed nothing. The most Leiberian object the GM produced in a hundred turns — undefined
on purpose, unfought, refused — has no record anywhere in the save. The engine has rich machinery for
promises it *intends* to keep (`[FUTURE_EVENT:]`, schedules, the honour-the-promise rule at `data.js:127`),
and that machinery is currently holding one promise, and it is about a seal on a form.

**Recommendation — S, Fable.** Not "make the thing come back". The narrower ask is that a *declined* danger
be recordable: when the party knowingly walks away from something the narration framed as unresolved, the
GM should be able to file it as a standing dread rather than have it fall out of the world at the end of
the turn. `[FUTURE_EVENT:]` is nearly the right vessel already; what it lacks is any prompt-side ask that
fires on a refusal rather than on a promise. Position 9.3 is the argument: confirmation architecture only
works if the thing the reader is meant to suspect is written down somewhere first.

**Settled?** No. The retreat gap is now half-answered by evidence (players do it unaided); the filing gap
is new and open.

---

## 4. "Banter forbidden" is dead — forty-seven turns carry companions talking to each other — but gemini buys nearly every joke with an anachronism

**Position applied:** 3.3 (◐ — the two talk constantly, and the talk is the texture), 4.1 (◐ — mood ranges
from sombre introspection to broad comedy), 4.2 (◐ — the humour is dark and character-based, not relief
bolted on), 4.5 (◐ — the comedy is frequently at the heroes' expense).

**Measured.** The first pass's finding 5 — the word "banter" appears twice in the engine and both times it
is forbidden; the gemini corpus contained not one wry line — was a harness artefact. **It does not survive
here.**

*Companion-to-companion talk:* **47 of 100 turns** carry tagged speech from two or more companions
(sonnet 17/53, gemini 29/46). Ten quoted lines name another companion directly, and many more are
exchanges without a name in them. t2367 is the shape of it: the hero teases Frizwick about the first time
she got into the bath in her shirt; Morwen answers from across the pool without opening her eyes — "You
lasted twenty minutes." — and Daeris adds "You were terrified." Three people, one joke, none of it
addressed to the player. t2366: Frizwick demands Daeris write her grievance down, and Daeris refuses to
get involved. t2437 closes the corpus with Morwen threatening an ice cantrip on two people who will not
stop moving in bed.

*Humour density:* hand-counted wry beats run roughly **22 in sonnet's 53 turns and 17 in gemini's 46** —
comparable rates, and both high. Sonnet's are consistently at the hero's expense: "for a man who just
inherited a Greed ring, you're remarkably bad at hoarding food" (t2373); "A cave. Great. Love a cave. Never
once gone wrong for us." (t2409); an invisible hero frog-marching a spy is "floating luggage with
opinions" (t2403).

*The difference is register, and it is measurable.* A census of modern-world images finds sonnet reaching
outside the setting occasionally and at the metaphor level ("granola-bar diplomat" t2407, "dinner theater"
t2407, "grins like Christmas came early" t2391), while gemini's last fifteen turns carry roughly fourteen:
a goblin "working two different illegal smuggling rackets in the same fiscal quarter" (t2426); a Zone of
Truth that "hums like an angry refrigerator" (t2429); half the wharf going "into low orbit"; arcane
"napalm"; "We are public servants. You basically owe us a medal"; a receipt; an artillery strike; a
Christmas present; holiday hams; a dead starfish; a python. The chapter summarizer joins in with
Thanksgiving poultry and a divine polygraph clinic.

**Insight.** The first pass asked for a register that is wry and eerie at once, and argued the engine had
no rule for it. The engine did not need one — the owner's own play produced it, and produced it in volume.
What this corpus adds is the failure mode nobody had measured: **the humour is arriving, but on gemini it
arrives by leaving the world.** Position 4.2 is the exact objection — the humour is supposed to be dark and
character-based, not tonal escape. Sonnet's jokes are made of things inside Magnimar (the cook, the goat,
the judgmental fisherman, the cave); gemini's are made of things from ours. That is the same failure class
as #227's antiquity ratchet and #355's clerical vocabulary — house style beating the voice directive —
and it currently has no census at all.

**Recommendation — S, off-Fable for the census; the prompt half is Fable.** Add an anachronism scan to the
playtest audit alongside `registerScan`: a tight list of unambiguous modern nouns (refrigerator, orbit,
napalm, fiscal, artillery, receipt, Christmas, Thanksgiving, medal, spreadsheet is already there) run over
the cleaned narration *and* the chapter summary, so the drift is a number instead of a reading. Whether
the STYLE tail then gets a clause is a separate, later call — this corpus does not yet prove a clause would
help, and the tail is already long.

**Settled?** The first-pass finding it replaces is now retracted. Nothing here is settled; the anachronism
class is newly identified.

---

## 5. Magnimar's Shore District is Lankhmar. The Justice Court is a filing cabinet

**Position applied:** 2.1 (◐ — his signal contribution was the fantasy city as *the* adventure), 2.2
(● — a city is made of trades, smells and specific streets), 2.3 (◐ — the city's factions are the plot
generator), 10.3 (◐ — villains are local, venal and specific).

**Measured.** Seventy-four of the hundred turns happen inside a settlement, and the occupation census is
genuinely dense. Named locals with a job: Aldous Kreel (caravan master), Petrin Voss (dock loader), Varn
(clerk), Wyla Ashvane (smith, cooling warding bracelets in an oil trough at t2344), Ameiko Kaijitsu
(innkeeper), Belor Hemlock (sheriff), Ironbriar (justice), Sable (fence), Grik (goblin, "purely
logistics"). Unnamed trades doing work in the background: a night attendant, acolytes, an arbiter who mends
mind-scrapes, a counter girl, dock crews, three deputies, a circuit magistrate, a fence in the Underbridge.

t2383 is the passage the lens would point at. Gulls over the tide line; "fishmongers already elbow-deep in
the morning catch"; "A cook with forearms like ham hocks is flipping eggs" with violence usually reserved
for combat; someone laughing at a joke you did not hear the start of; a table shimmed with a folded
receipt. That is a city made of occupations, not of quest-givers — position 2.2 met in full, without an
engine note anywhere in the `noteLog` asking for it.

The villain satisfies 10.3 exactly. Sable is not cosmic: she is an elven fence with ink-stained knuckles
who moves relics because "the margins are garbage compared to ancient power sources" when you move people
instead. Local, venal, specific.

**Two things are missing.** *Factions never appear.* The lens asked at 2.3 whether factions are ever asked
for the way wares and whispers are; across 100 turns in two cities there is no `FACTION` tag and no faction
in the prose beyond a smuggling ring the party dismantles in a single evening. *And fame does not travel.*
`buildWhispersNote` (#317, shipped v1.785, so live for the last ~22 turns) never fires in the
`noteLog` across twenty consecutive Sandpoint turns — more than `WHISPERS_EVERY` (15) — and no `[WHISPER:]`
is filed anywhere in the 40-turn tag record. Instead the prose says the opposite, three separate times, as
a deliberate motif: a city "that has no idea a Runelord died screaming this week" (t2343); "the low
constant murmur of a city that has no idea" (t2379); and, at the chop-house table, "It's kind of nice,
honestly. Nobody here cares." (t2385).

**Insight.** The lens is of two minds and should say so. As *writing*, the indifferent city is one of the
best things in the corpus and is straight position 9.4 — dread and consequence relocated into a universe
that is not paying attention. As *machinery*, it means the whisper ring — which the first pass named the
most Leiberian machine in the engine — filed nothing across seventy-four turns of city time immediately
after the party killed the last Runelord of Thassilon, which is the single most rumour-worthy event the
campaign will ever produce. Position 2.4 says reputation travels by mouth and arrives wrong. Here it does
not travel at all.

**Recommendation — XS to verify, then judge.** The cheap check first: whether `memory.map.nodes` has a
truthy `size` for the Sandpoint and Magnimar nodes in this save. `buildWhispersNote` returns empty
immediately if it does not, and that would make this a map-hygiene defect (#156's territory) rather than a
design question. Do not write a design recommendation until that is checked. If the nodes *are* sized and
the note still did not fire, the latch is the next place to look.

**Settled?** No. The whisper mechanism itself is validated and untouched by this finding.

---

## 6. A hundred turns, ten rolls, ten successes, no wound, no fight, nothing at stake

**Position applied:** 1.5 (◐ — his heroes are rogues who fail often), 4.5 (◐ — they are ridiculous as often
as formidable), 7.5 (◐ — death is not the only exit).

**Measured.** In the forty turns with tag records: **10 `DICE` outcomes, 10 `SKILL_SUCCESS`, zero
failures.** No `COMBAT_START` anywhere. No hit point is lost by any party member in a hundred turns; the
hero closes at 131/131 and the corpus's own summary of the state is t2435's "Nobody is bleeding, the inn
isn't on fire". The one confrontation with an antagonist (t2420–t2424) is resolved before it starts: Daeris
lays a Binding Ward on the grate, Morwen an Arcane Lock on the stairs, Frizwick greases the hinges, and
Sable is pinned, silenced and truth-compelled within three turns of stepping into the cellar. No roll is
contested. The first-pass harness measured nineteen for nineteen; a human's own turns give ten for ten.

**Insight.** The honest reading is *not* "the GM is too soft". A level-17 party against a fence and a
goblin scout should win, and the ambush the player designed deserved to work. The finding is one level up:
across a hundred consecutive turns **nothing was at risk at all** — not life (no combat), not money
(finding 2), not reputation (finding 5), not a companion, not a promise. And the engine never notices. It
has audits for presence, mood, relationships, items, consumables, quests, location descriptions and scene
cast — the `noteLog` shows nine distinct nudge builders firing across twenty turns — and no audit for
"nothing has been at stake for a very long time".

Position 4.5 has one adjacent observation worth recording. The corpus does contain the hero being
embarrassed, and it is good: at t2387 Morwen recalls a bridge in Kaer Maga involving a rope, a goat and an
extremely judgmental fisherman that the hero has selectively forgotten. That is exactly the register the
lens said the second-person voice might not tolerate. It tolerates it fine. It arrived from the model, once
in a hundred turns.

**Recommendation — no change to the dice, and this is partly settled.** Model-narrated dice, plot armor and
the death walk are settled rulings and nothing here asks to move them. The one thing worth recording for a
later row is the absence above: there is no stakes audit, and a coda is exactly where one would earn its
keep. Whether that is wanted is an owner question — an engine that pesters a player for having earned a
quiet week is worse than the problem.

**Settled?** Mostly. Dice narration, plot armor and the death walk are settled; the missing stakes audit is
an open observation, not a defect.

---

## 7. Three wives, and the duo model survived them — but the one document that could have made a spouse leverage rules it out in writing

**Position applied:** 3.1 (◐ — neither is a sidekick; the friendship outranks every other loyalty), 3.5
(◐ — companionship survives romance), 8.2 (◐/●ƒ — a lover is a hostage to fortune), 8.3 (◐ — attachment
does not domesticate the adventurer, until the end).

**Measured, and it answers the first pass's open question.** The rubric asked at 3.5 whether the prompt
knows that companion-to-companion bonds exist, or only companion-to-player. The save's `meta` says it does:
Frizwick↔Morwen "Wife — leaned on, not alone", Frizwick↔Daeris "Wife — chosen family", Daeris↔Morwen
"Wife — chosen family", Morwen↔Frizwick "Wife — chosen family, hard-won trust". The graph also reaches
past the marriage entirely — Frizwick↔Shalelu Andosana "battle-forged respect", Morwen↔Cael Zethran
"sibling — debt discharged", Morwen↔Drixwick Lorrath "adversarial, bound by written agreement". And the
prose honours it: finding 4's forty-seven turns of companion-to-companion talk are the axes cashed out.

**On 8.2, the measurement is unusually clean.** The vellum directive recovered at t2416 is the one document
in the corpus that could have made a spouse into leverage. Its instruction to Sable's watchers is: **"Do
not engage the rogue or his wives unless cornered"** — the antagonist names the marriages and explicitly
declines to touch them. Nothing else in a hundred turns treats a spouse as a pressure point.

**On 8.3, the lens should concede rather than complain.** The coda is a bath, a supper, a breakfast, a
morning nobody gets out of bed for. That is domestication, and it is the *end* of a Leiber saga, not its
middle. But the campaign is at its end: the skeleton's final act is exhausted, zero quests are open, and
the engine is offering "Write the ending" on the fourth button. Position 8.3's own answer is "not for a
long time, and then everything" — and this is the "then everything". The lens's §13 dissent about a hero
too rich and too married to be a Leiber hero does not apply to a hero who has finished.

**Insight.** The product's claim — that companions plus `[SAY:]` attribution reconstruct the duo inside a
solo second-person frame — is the claim the first pass said should be tested rather than asserted. Tested
here, on a hundred turns of real play, **it holds.** Three companions, each with an authored trait, flaw
and motivation, talking to each other more often than to the player, carrying bonds among themselves and
to people outside the party. That is not a party of interchangeable action slots; it is the thing position
3.4 asks for.

**Recommendation — no change; recorded as validation.** The one XS observation carried over from the first
pass's finding 7 is still unverified and still cheap: does `detectCoreMoments` treat a companion death as a
defining moment automatically? No companion died here, so this corpus cannot answer it.

**Settled?** Yes on the design. `[SAY:]` attribution, party histories and the W7 relationship axes are
validated by this corpus and this finding proposes nothing.

---

## 8. The hero's sorcery fetched the eggs. The only magic that cost anything belonged to someone else

**Position applied:** 5.2 (◐ — sorcery is practised by *others*; the Mouser's dabbling goes badly), 5.4
(◐/● — magic is transactional and the price is real), 1.3 (● — the supernatural is what makes it not a
historical caper), 9.5 (●/◐ — fiction must convince).

**Measured.** Every casting in a hundred turns succeeds and costs nothing: Invisibility (t2402), Silent
Stalker (t2400–2401), Message (t2383, t2400, t2402), Arcane Lock (t2419, t2431), Binding Ward and
Consecrated Ground (t2419–2423), Silence (t2422), Zone of Truth (t2424, t2429), an ice cantrip threatened
in bed (t2437). The hero's signature spell in the coda is **Mage Hand, used twice to carry breakfast plates
across a chop-house** (t2388–2389) — including tucking a strand of hair behind his wife's ear, which she
calls cheating. It is charming and it is the least frightening use of sorcery imaginable.

**The single exception is not the hero's.** At t2342 Daeris heals the captive, and the cost is written into
the scene: she "looks tired around the eyes in the way she gets after real work, the kind that costs her
something instead of just costing time", and she says so — "I'm not made of that." That is position 5.4
executed properly, once, by a companion, for a stranger.

**One craft defect in the same turn, and it is worth flagging on its own.** The t2342 narration visibly
argues with itself on the page: "Wait, that's not right; you catch yourself before it goes wrong on the
page of your own memory… Actually, no. Guidance doesn't mend ribs either, and you know it." The narrator
is second-guessing which spell was cast, in the prose, in second person, and inviting the player into the
uncertainty. This is the same class as the first pass's engine-speak leak (finding 8: "The engine flags
nothing to charge") — the model's working process surfacing as narration — and it breaks `data.js:111`
("Never break character") harder than a stray "ledger" does, because it tells the reader the world's own
memory is unreliable. Position 9.5 is the argument: fiction must convince, and a narrator who corrects
himself mid-paragraph has stopped convincing.

**Recommendation — no change to the spell system; XS on the detector.** The mana economy is fine and this
is not an argument for nerfing anything. But finding 8 of the first pass asked for a scan for engine
vocabulary in narration, and this corpus supplies a second, worse member of the same class: narrator
self-correction. Both are cheap to detect and both belong in the same `dev/` scan as finding 4's
anachronism census — a `dev/` test addition, always legal off-Fable. Look for "wait, that's not right",
"actually, no", "correction", and the engine's own nouns, over the cleaned narration.

**Settled?** No, but nothing here touches a settled ruling.

---

## What changed from the harness pass

The first pass measured three scripted corpora and flagged, honestly, that findings 3, 4 and 6 were
inferred from twenty-turn windows and needed a wider sample. Here is what a hundred turns of a human's own
play did to each.

| First-pass finding | Verdict on the owner's turns |
|---|---|
| **1. The whisper ring is the most Leiberian machine in the engine** | **Weakened by absence.** Not one `[WHISPER:]` in the 40-turn tag record and no `buildWhispersNote` in twenty consecutive Sandpoint turns, immediately after the campaign's largest possible rumour. The mechanism's design is untouched; whether it *fires* in a mature save is now an open question (finding 5). |
| **2. Leiber is not in the voice bank** | **Unaffected and slightly strengthened.** Nothing here is written in a wry-and-eerie register on purpose; the corpus reaches it by accident on sonnet and misses it by anachronism on gemini (finding 4). |
| **3. Sorcery is a priced utility** | **Survives, and hardens.** Ten castings, ten successes, zero cost, one exception and it belongs to a companion (finding 8). |
| **4. The gold ratchet** | **Survives intact, on a human's turns, at the exact moment the source material says the take should vanish.** One `GOLD` tag in forty turns and it points up; the player himself retires the last reason to sell (finding 2). This is now the best-corroborated finding in either pass. |
| **5. "Banter forbidden" — no companion-to-companion dialogue, no wry lines on gemini** | **Retracted. It was a harness artefact.** 47 of 100 turns carry two or more companions speaking; both models are funny at comparable rates. The real finding underneath it is different: gemini's humour is bought with anachronism (finding 4). |
| **6. Nineteen rolls, nineteen passes; no retreat vocabulary** | **Half survives, half retracted.** The success rate reproduces (ten for ten, plus zero combat and zero wounds). But the *retreat* — the thing the engine had no words for — happened on turn one of the coda, from the player, unprompted, as a joke. What the engine lacks is not permission to withdraw; it is any way to record what was withdrawn from (finding 3). |
| **7. Loss is a relationship-axis edit, not an alteration** | **Untested — nobody died.** But the open question underneath it is answered: companion↔companion bonds do exist in the data and do drive the prose (finding 7). |
| **8. NEVER ADMINISTRATIVE holds, with one measured slip ("ledger", once in twenty turns)** | **Badly weakened.** 23 clerical-word hits on 20 of 100 turns, sonnet and gemini equally, five consecutive turns at the worst — plus an entire arc built on a requisition folder, and a second player-visible surface (chapter summaries) that no guard scans at all (finding 1). Every one of these turns predates the #355 guard, so this is its baseline, not its verdict. |

## Verification gaps

- **The source gaps from the first pass are unchanged.** "Fafhrd and Me", the full *Ancalagon* letter,
  Moorcock's Leiber chapter and the Platt *Dream Makers II* interview remain unread; positions 3.x, 4.x and
  8.x still rest on the critical record and on fiction, and no ●ƒ quotation appears in this document.
- **Only 40 of 100 turns carry tag records** (`tagLog_last40`). Every claim about `GOLD`, `DICE`,
  `WHISPER` and `COMBAT` counts is scoped to t2399–t2437 and is stated that way. The two narrated payments
  at t2347 and t2371 fall outside it, so **whether the engine actually debited them is unverified.**
- **`noteLog` holds only twelve committed entries** (t2415–t2434). "`buildWhispersNote` never fired" and
  "`buildMarketNote` never fired" are true of that window and are not proven for the other eighty turns.
- **Finding 5's whisper diagnosis is explicitly gated** on checking `memory.map.nodes[...].size` for
  Sandpoint and Magnimar in the live save. It is a hypothesis with a named test, not a verdict.
- **Humour counts in finding 4 are hand-tallied** from a full read, not machine-derived; the
  `REGISTER_WORDS`, anachronism and plot-paperwork counts are machine-derived and reproducible.
- **The `speakers` field's unit is not documented** and does not match quoted-line counts, so every
  dialogue claim here uses "turns in which N companions have tagged speech", never a line count.
- **The lens has no standing on the clock, XP, item pricing or the dice procedure** and made no
  recommendation on any of them. Those belong to the Gygax lens.
