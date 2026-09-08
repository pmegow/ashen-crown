# Panel review — the Abercrombie lens on Traffic and Dragons

**Caveat, first line, per protocol:** this is a review written against a rubric of Joe Abercrombie's
documented craft positions ([`../abercrombie_lens.md`](../abercrombie_lens.md)), not an impersonation and
not his opinion of this product. Entry references are `§n.n`; confidence grades carry over from the lens.

**Surface reviewed.** Prose voice and the STYLE tail; violence and the combat close; the downed ladder and
the death walk; alignment drift; antagonists; companion dialogue; the reckless wildcard.

**Evidence base (measured, v1.847/v1.848).**
- `dev/corpus_playtest_v1847_sonnet5_344.json` — 50 turns, fresh campaign, **Howard** voice
  (`samples/modeltestcampaign.blueprint`: `proseAuthor:"howard"`, tone `swords`), claude-sonnet-5. Three
  fights; the hero drops to 0 HP in a fighting pit at t46 and is spared at t47.
- `dev/corpus_playtest_v1847_mature226_sonnet5.json` and `_gemini.json` — 20 late-game turns each from
  `testRuns/fixtures/todo-226-mature-t2097.tnd`, hero at Level 17.
- Read: all 50 fresh turns and all 40 mature turns; every fight in all three.
- Live save context supplied by the owner (Rise of the Runelords, v1.848): turn 2,437; ≈30.1 days;
  Level 17; 68 NPCs; 3 companions; 110 GM lines mentioning death; three walks back from Death.

**Prose measurements** (narration only, dice and button text stripped):

| Corpus | Sentences | Mean words/sentence | Median | >20 words | Simile markers (`like` / `as if` / `as though`) |
|---|---|---|---|---|---|
| Fresh, Howard voice, sonnet-5 | 285 | **32.1** | 30 | 69% | 54 — one per **5.3** sentences |
| Mature, sonnet-5 | 97 | 25.3 | 24 | 60% | 8 — one per 12.1 |
| Mature, gemini-3.7-flash | 171 | 19.6 | 18 | 39% | 12 — one per 14.3 |

---

## Finding 1 — The pit fight is the lens's own recipe, executed. No change.

**Position applied.** §2.2 ● (a close-POV fight needs "blood, pain, fear, and horror"); §3.1 ◐
(consequence is the argument for the detail); §5.1 ● (would this person really say this here?).

**What the game does.** Fresh corpus t44–t47. HP falls 14 → 7 (t31) → 1 (t45) → 0 (t46). The engine takes
the wheel: `buildDownedNote` (api.js:716) replaces the suggestion buttons with two — struggle or yield —
and the model resolves it in one turn. Measured tags: `t46 [HP:-7] [CONDITION:Dazed|…|Branded Fighter's
blow to the jaw]`, `t47 [DOWNED_RESOLVED:intervened|…] [HP:+4]`. The prose at the moment of collapse:
"Your vision swims red and white, the torchlight fracturing into streaks." The mercy at t47 is not a
rescue but a *refusal*: "he does not finish it. His fist trembles at his side," followed by the hooded
figure's "He does not die tonight. Drag him up."

**Insight.** Three of the lens's four combat requirements land in one turn — blood, pain and fear all
present — and the fourth, horror, is carried by the branded man being someone the hero knew. More
important: the sparing **costs**. The hero wakes in a cell at t48, not at camp. This is the engine and the
model doing complementary work: the engine forced a fork that could not be narrated away (two buttons, no
free text), and the model spent the fork on character rather than on a heal. It is the strongest single
stretch of fiction in the 90 turns measured, and it is the only place in those 90 turns where violence
changed anything.

**Recommendation.** No change. Protect the shape: the value came from the engine *removing* the player's
options for one turn, which is the opposite of the usual instinct. Note for future work — this is the
existence proof that an engine-narrowed turn produces better prose than an open one.

---

## Finding 2 — At Level 17, violence is free: five combat turns, zero damage taken.

**Position applied.** §2.1 ● ("lasting physical damage"); §2.4 ● ("beat up, injured both physically and"
mentally); §2.3 ● (war is "random, dirty, unpredictable"); §3.1 ◐.

**What the game does.** Mature gemini run, t2098–t2117. Five turns carry a combat block: a three-stone-giant
ambush (t2107–t2110, foes at 88 HP each) and the assault on Karzoug's sanctum (t2116–t2117, a 180 HP boss
and 120 HP rune-giant wardens). Hero HP logged at **every one** of the twenty turns: `2099:110` through
`2117:110`. The complete set of HP tags emitted in the run is one: `t2099 [HP:+20]` — a rest heal. Zero
`[CONDITION:]` tags. One `[COMBAT_END:victory]`. The prose matches: "ending its struggles before the body
hits the shale"; "severing the giant's arm in a single savage stroke."

**Insight.** The engine cannot know a fight hurt unless the GM says so, and nothing asks. `combat.md`
carries `buildCombatStaleNudge` — which fires on *tag silence* for an open encounter — but there is no
sibling that notices a fight which closed with the party untouched. The result is that the game's best
mechanism for consequence (`[HP:]`, `[CONDITION:]`) simply idles at the level where the fiction most needs
it, and every fight becomes what §2.3 says real fighting never is: clean and decided by competence. The
fresh corpus proves the model *will* spend HP when the numbers are small; the mature corpus shows the
habit evaporating once the hero's pool is large enough that the model reads him as unbeatable.

**Recommendation.** **S** — a `buildUnscathedNudge` in `NOTE_BUILDERS`, same one-shot-ask shape as
`buildRegisterNote`: an encounter that closes victorious with ≥1 foe slain and no `[HP:-N]` and no
`[CONDITION:]` on any party member gets one engine note next turn asking what it cost — a wound, a broken
weapon, a spent charge, a companion hurt, a thing left behind. **This changes no dice and no difficulty**;
it asks the narrator to report a price it already had the vocabulary for. Drift surface (NOTE_BUILDERS +
prompt) → Fable tier, test-first.

**Settled?** No. The settled rulings cover the death walk, the three-turn grace, model-narrated dice, no
convalescence. "A fight may close with nobody hurt" is not among them.

---

## Finding 3 — The alignment axes did not move once in 90 turns, including a scene of extortion.

**Position applied.** §6.4 ● ("good people in bad corners might have to" do bad things); §6.5 ◐ (heroism
examined honestly needs its darkness); §8.1 ● (be honest).

**What the game does.** `[ALIGNMENT:]` tag count across all three corpora: **zero** in 90 turns. The rule
text is a parenthetical in the tag doc — `tag_table.js:145`: `[ALIGNMENT:law+1] [ALIGNMENT:good-1] (use on
morally significant choices only)`. Meanwhile the mechanism downstream is elaborate: axes clamped to
[-3,3], `alignSeedAxes` at creation, migration healing, and a label flip filing a ★ defining moment for
player and companions (`quests.md` §12).

The scene that should have moved it is fresh-corpus t23. The hero seizes a city guardsman by the cloak,
drags him into shadow, and threatens to expose him to every debtor in the district unless he talks. The
narration itself names the moral shape: "Orvun's fear has bought you gold's worth of truth without
spending a coin," and closes on the cost — "you have made an enemy of his pride." The GM understood
exactly what had happened. It filed no tag.

**Insight.** The stated-vs-actual split is one of the most Abercrombie-shaped things in the product, and
it is starved of input by a single word: "only." The tag doc's guidance reads as a *restriction* rather
than an obligation, and there is nothing in `DEFAULT_RULES` requiring the tag the way the sheet-upkeep
rule requires `[CONDITION:]` and `[QUEST:]` ("If the narrative says it happened, the tag must be in that
response"). Worse for the lens: the *only* place in the codebase instructing the GM to make the
protagonist complicit is `data.js:17` — the `abercrombie` voice's `contentDNA` — which ships only if the
player picks that one voice out of ten.

**Recommendation.** **S** — one clause into `DEFAULT_RULES` beside the existing upkeep rule: when a scene
is won by threat, betrayal, cruelty, deceit, or by mercy that costs the player something, the
`[ALIGNMENT:]` tag rides that same response, same discipline as every other state tag. Do not touch
display (settled) and do not touch the axes' maths. Under TODO #104, "make the protagonist complicit in
something uncomfortable" is a content dial that deserves promotion to house level rather than deletion
with the brand.

**Settled?** "Alignment shown" is settled; this recommendation does not touch display.

---

## Finding 4 — Antagonists are required to be dangerous. Nothing requires them to have a reason.

**Position applied.** §6.1 ● ("no one's the villain of their own story"); §6.2 ● ("peel back the lid on
the villains"); §6.3 ● (reasons need not excuse); §5.4 ● (people are understandable to themselves).

**What the game does.** The house rule on antagonists is `data.js:108`: "DANGER IS REAL: antagonists
scheme, ambush, resist, and fight; they do NOT fold into friendly agreement." That is the complete
instruction — it makes them a threat, not a person. The only text in the product asking for an antagonist's
own logic is `data.js:17`, the `abercrombie` `contentDNA`: "the apparent villain has genuine reasons" —
voice-scoped, absent under the nine other entries including the Howard voice this corpus ran.

Measured against the fresh corpus: the campaign's hooded antagonist speaks across t39, t40, t41, t49 and
t50 — five appearances, thirteen lines — and states no want of its own. Its register is riddle and menace:
"You reek of the Widowmaker's blood. Bold, to wear it into my house." The nearest thing to a motive
belongs to the offstage Valerius, and it arrives second-hand at t3 through Nolan Grimtide: "Valerius don't
want you dead, Korrag. Wants you home." That single line is the most human thing any antagonist says in
50 turns, and it is spoken by a man the wildcard kills five turns later.

**Insight.** Interiority for antagonists is the one Abercrombie position with no engine at all behind it.
The engine gives foes HP, morale, an `engaged` pointer and a plot-armour budget (`PLOT_ARMOR_ESCAPES`=2,
`buildPlotArmorNote` api.js:549 — which does require the escape to *cost* them something, and is well
built for what it does). It gives them nothing to want. Compare the care spent on companion wants (#330,
#347, `data.js:133`) and the asymmetry is stark: the people beside the hero have agendas; the people
against him have hit points.

**Recommendation.** **S** — one `DEFAULT_RULES` clause: a recurring antagonist (one the player has met
twice, or one named in the skeleton) must have a reason a person could state, and must state it in their
own mouth at least once before the reckoning. It need not excuse anything (§6.3) and it must not make them
misunderstood. This is prompt-only and needs no tag; the skeleton already carries villain names, and the
GM-eyes-only clause (`api.js:2255`) already governs when they may be surfaced.

**Settled?** No.

---

## Finding 5 — The STYLE tail asks for one image per sentence and gets 32 words with a simile every fifth.

**Position applied.** §8.4 ● ("a few telling details" beat burying the reader); §8.3 ● (unconvincing
writing "weakens the effect"); §8.2 ● (does the thing really look like that?); §7.2 ● (when in doubt, cut).

**What the game does.** `api.js:2221` (STYLE, the uncached tail): "Do not cram multiple clauses or similes
into one long sentence; break a long thought into several short ones, one main image per sentence." The
Howard voice active in this corpus says the same thing independently (`data.js`, `howard.vc`): "ONE vivid
image per sentence, never stacked clauses."

Measured over 285 narration sentences: **mean 32.1 words**, median 30, **69% over 20 words**, one simile
marker every **5.3 sentences**. A representative t2 sentence runs 44 words and carries two similes; the
first is "men rising up out of the scrub like the dead climbing out of shallow" graves. The same directive
fares better under gemini (19.6 mean, 39% over 20) — so the instruction is followed by one model and not
another, which is the definition of an unenforced rule.

**Insight.** The STYLE tail contains two *bans* that work (clerical imagery, comparative age) and one
*shape* instruction that does not. The difference is measurement: the bans have a scanner and a note
builder behind them; the shape instruction has nothing. This matters more than taste — §8.3 says the
dishonest sentence weakens the effect, and a 44-word sentence with two stacked similes is not what anyone
thinks while a man is dying in front of them. It is also the mechanism by which the *player's chosen
voice* silently fails: a player who picks the terse voices (Cook: "Short clipped sentences"; Abercrombie:
"most under twelve words") is currently buying a directive with no enforcement, on the evidence that a
model can miss the house rule by a factor of three.

**Recommendation.** **M** — a `buildSentenceShapeNote` in `NOTE_BUILDERS`, modelled exactly on
`buildRegisterNote` (api.js:696): a pure function over the committed narration computes mean sentence
length and simile-marker density; over threshold, one combat-silent, one-shot-ask note next turn naming
the offending shape ("the last narration averaged N words a sentence — break the long thoughts"). Cheap,
deterministic, engine-testable, and it does not touch the STYLE text. Drift surface (STYLE + note
builders + prompt) → Fable tier, failing assertion first, plus a sabotage clause.

**Settled?** No. (The voice feature itself is settled; this enforces it rather than changing it.)

---

## Finding 6 — The clerical-image ban is the only closed loop between STYLE and output, and it works.

**Position applied.** §8.2 ● (interrogate the metaphor); §8.1 ●; §6.6 ● (slant-wise at the clichés).

**What the game does.** Mature sonnet-5 run, `meta.registerSlips: [{turn:2102, word:"ledger"}]`. The prose
that turn reads: "finally strikes itself from the ledger of things still in your pack." The banned image
got through the STYLE tail's blanket prohibition; the scanner caught it, `buildRegisterNote` (api.js:696)
fired one note — "Debts here are blood, oaths, hunger and memory" — and the word does not reappear in the
remaining fifteen turns of the run.

**Insight.** This is the template. A rule in the prompt is a hope; a rule with a scanner and a one-shot
note is a contract. The owner's ledgers ruling produced the only place in the product where a prose
standard is *measured against the output and corrected*, and the measurement shows it catching a real slip
from a frontier model at turn 2,102 of a live-shaped campaign. Every other prose standard in the STYLE
tail — sentence shape, the "write less when little happened" clause, the ban on restating the player's
action — has the prompt half and not the loop half. Finding 5 is this same machine pointed at a second
target.

**Recommendation.** No change. Cite it as the pattern of record for prose enforcement, and copy its shape
rather than inventing a second one.

---

## Finding 7 — The reckless wildcard is the best-designed button in the product; its trigger is a metronome.

**Position applied.** §2.3 ● (victory from "strange coincidences, personality clashes, mistakes"); §5.6 ●
(characters generate situations); §3.5 ● (escalation); §7.4 ● (carry the reader along).

**What the game does.** `buildRecklessNote` (api.js:679) tells the GM: "let it work spectacularly or fail
spectacularly — never mundanely, never punished for the choosing." The fresh corpus fires it three times.
t8: the hero throws his sword rather than press the attack, rolls a 20, and kills the campaign's opening
antagonist outright — a named foe removed from the story on turn eight by a choice no plan contained. t23:
he throttles a guardsman for information and gets it, and the turn closes on the price — "you have made an
enemy of his pride, and pride is a debt" paid slow. t29: he kicks in the warehouse door instead of
scouting it and walks straight into the Widowmaker, the fight that eventually puts him on the pit floor at
t46.

**Insight.** Every one of the three succeeded *and* cost, which is precisely §2.3's shape and the thing
the rest of the game's suggestion machinery cannot do (three validated, affordance-gated buttons are by
construction things that will work). The wildcard is where the fiction gets its accidents. The one weak
seam is the trigger: `WILDCARD_EVERY`=7 (globals.js:148) makes recklessness a clock, offered on turns 7,
14, 21, 28. In the source positions, disaster arrives because of who someone is at a particular moment,
not on a schedule; and a fourth button that appears every seventh turn regardless of the scene is a
pattern a long-running player will learn to read.

**Recommendation.** **XS** — add state triggers alongside the cadence in `engineFourthAction`
(game.js:166): offer the wildcard after a refusal, a humiliation, a failed check on something the
character is supposed to be good at, or a companion contradicting the player — the moments where a person
actually does something stupid. Keep the cadence as the floor. **Do not touch the note text**; it is the
best-written engine note in the file.

**Settled?** No. (The fourth button itself is field-validated and must not be destabilised — this adds
occasions, changes no wording.)

---

## Finding 8 — Companions have wants by design and positions by accident, so dialogue defaults to a chorus.

**Position applied.** §5.1 ● (would they really say this here?); §5.2 ● (replace the generic with the
distinctive in dialogue); §5.4 ● (understandable to themselves); §5.5 ● (the small group on the road is
the richest engine); §1.2 ●.

**What the game does.** Three companions speak in 12 of the 20 mature gemini turns. Every line endorses
the plan in progress. t2105: "Then we ride hard. Let their scouts find empty dust." t2111: "Then we'd best
not waste the light we have." t2114: "Draw your steel, husband." Across the 40 mature turns — the only ones with a
party; the fresh campaign runs the hero solo — no companion contradicts the player once. The nearest
approach is teasing (mature sonnet-5 t2107, Frizwick: "That's the fifth time you've gone digging in that
bag"), which is affectionate, not a position.

The mechanism that would produce contradiction is real and well written — `DEFAULT_RULES` COMPANION
AGENDAS (`data.js:133`): a want "colours what they choose and say; when the party's course cuts against it
they say so, and once per arc they may refuse an order." But the same clause opens with "most carry none
for long stretches, and that is right" (#347, owner ruling — a want is never manufactured), and closes
with "Refusal is the ceiling." So the *only* engine-supported reason a companion may push back is a want
that is deliberately rare. A companion without one has, in prompt terms, no position at all — and #341
already puts their authored backstory, trait, flaw and motivation into the stable half where nothing tells
the GM to *act* on them.

**Insight.** This is a want-vs-position confusion, not a want problem. A want is a story goal and should
stay rare (settled). A *position* — what this person will not do, what they push for in a scene, what they
are wrong about — is characterisation, and every companion has the raw material for one sitting unread in
the stable prompt. §5.2's whole revision pass exists to convert exactly that material into distinctive
speech; the engine has the crib sheet (§5.3) and no pass that uses it. The measured symptom is that four
people on a mountain road for twenty turns sound like one person agreeing with himself.

**Recommendation.** **S** — prompt-only, no new tag: in `partyBlock`, state that a companion's authored
trait, flaw and motivation govern *how they take an order*, and that disagreeing with the player's method
while still following is normal, expected, and not a want. Explicitly separate it from the agenda clause
so the settled want ruling is untouched. Verify by re-running the mature fixture and counting turns
containing a companion objection.

**Settled?** The companion-want ruling (#347) is settled and this does not re-open it — the
recommendation is on a different axis and must say so in the rule text.

---

## Finding 9 — Dissent, recorded: the walk back is well built; the body is not what comes back.

**Position applied.** §3.2 ○ (do not feel entirely safe — informs a question only); §3.3 ● ("if you're
comfortable with it all, then it ain't really worked"); §3.5 ● (escalation); §2.1 ●.

**What the game does.** On a true death, `deathSceneBegin` (game.js:3136) stages Death's arrival, one
question, one answer, and a choice of back or onward. `deathArrivalDirective` requires Death to remember
the earlier walks and to name the last one as the last; `RESPAWNS_PER_CAMPAIGN`=3 (globals.js:150), after
which `campaignDenouement` writes the ending. The answer is filed as mandatory canon —
`fileLore` plus `fileCoreMemory("death-gift", …)`. The owner's live save has taken this walk three times.

**Insight, in two directions.** The lens's first instinct — three guaranteed returns is plot armour — is
half wrong on the evidence. §3.5 asks for scale and pace that mount with each part, and this design does
exactly that: the walks are counted, the count is spoken aloud inside the fiction, and the third one ends
the campaign. That is escalation with a fuse, and it is better than the fantasy default of an unbounded
resurrection economy. The dissent is narrower and survives: what returns from the walk is a *memory*, not
a body. The fresh corpus is the clean demonstration — the hero is beaten unconscious on a pit floor at
t46, wakes in a cell at 4 HP at t47, and stands at 23/23 with the wounds gone one rest later at t48
("Your body has knit what it can on its own"). The engine files the event as a Defining Moment
(`tag_table.js` DOWNED_RESOLVED → `fileCoreMemory("downed", …)`), which is a real and thoughtful choice —
but §2.1's "lasting physical damage" has no home in this system, and Finding 2 shows what that costs at
high level.

**Recommendation.** No change — settled twice over (the death walk; no convalescence). Recorded so a later
pass knows the lens looked and why it stood down. If the owner ever wants a body-side consequence without
convalescence, the cheapest shape consistent with every settled ruling is a *narrative* scar: a permanent
`[CONDITION:]`-shaped entry that carries no mechanical penalty and is visible on the sheet and in the
prompt. Not recommended here; noted as the available door.

**Settled?** Yes — both clauses. Dissent recorded, no action.

---

## What the Abercrombie lens would actually take from this game

1. **The engine-narrowed turn.** Taking the player's options away for one turn at 0 HP produced the best
   writing in 90 measured turns (Finding 1) — a lesson that runs against the instinct to widen choice.
2. **A prose rule with a scanner behind it.** The ledger ban is a working feedback loop between a stated
   standard and generated text (Finding 6); no novelist has one, and it caught a frontier model at turn
   2,102.
3. **The wildcard's contract** — "spectacularly or spectacularly, never mundanely, never punished for the
   choosing" (api.js:679) is a cleaner statement of how disaster should be rewarded in fiction than
   anything in the source material, and the corpus shows it delivering three times in fifty turns.

## Verification gaps

- **No campaign was measured with the `abercrombie` voice selected.** The fresh corpus ran Howard. Every
  claim about how the game's own Abercrombie model performs is untested; Finding 5's terse-voice argument
  is inference from the Howard result, not measurement.
- **The mature sonnet-5 run is a degenerate harness artifact.** Ten of its twenty turns are the same
  "use travel rations" action against an empty pouch, driven by the fourth button's consumable rule. It
  supplied the register-slip evidence (Finding 6) and prose statistics; it says nothing about combat,
  because it contains none.
- **Only two combat encounters were measurable at high level** (both in the gemini mature run, both in the
  same twenty turns). Finding 2's "violence is free at Level 17" is strongly evidenced within that window
  and would be firmer across a second high-level fixture on a different model.
- **The live save (turn 2,437; 110 death-mentioning GM lines; three walks) was not read directly** — those
  figures are the owner's, used as context only, and no finding rests on them.
- **Lens gaps carry through.** Writer Unboxed and Grimdark Magazine both 403'd (lens §11), so the sourcing
  under §3 (consequence) leans harder on blog posts than on interview statements, and §3.2 is ○ and
  carries no verdict here.
- **Alignment**: zero tags in 90 turns is a strong negative, but all three corpora are harness runs with
  scripted or button-chosen actions. A player-driven campaign might provoke the tag where these did not.
