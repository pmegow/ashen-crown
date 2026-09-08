# Panel review — the Moran lens on Traffic and Dragons

**Member:** the Moran lens ([`../moran_lens.md`](../moran_lens.md)) — a rubric of Jenna K. Moran's documented
design positions, not the person, and not an impersonation. Every finding cites the entry it applies.

**Surfaces reviewed:** the XP and quest economy (DOC/contracts/quests.md, `MILESTONE_XP`, DEFAULT_RULES),
the fourth button and the montage (`engineFourthAction`, `montageDue`, `buildMontageNote`), core memories
(`detectCoreMoments`, `buildCoreMemoryBlock`), companion wants (#330/#347), the character schema and the
class bible, and three play corpora at v1.847.

**Corpus measurements used throughout.**

| Corpus | Turns | XP awarded | When |
|---|---|---|---|
| `dev/corpus_playtest_v1847_mature226_sonnet5.json` (forge vigil → departure) | 20 (t2098–t2117) | **+40 total** | once, t2113 |
| `dev/corpus_playtest_v1847_mature226_gemini.json` (same fixture, took the fight) | 20 | **+140 total** | once, t2110 (giants) |
| `dev/corpus_playtest_v1847_sonnet5_344.json` (fresh campaign) | 50 | **+278 total** | t8 (+160), t11 (+10), t32 (+108) |

Live save for scale: turn 2,437 · Level 17 · 165,850 XP · 22 defining moments · 138 story beats · 0 open quests.

---

## 1. The reward economy speaks one genre, and the quiet twenty turns paid 40 XP

**Position applied:** 1.2 (◐, S6/S10 — each genre carries its own XP-action list; Pastoral pays "just
relaxing with a friend and enjoying the scenery", adventure fantasy pays "being outmatched by a dangerous
foe") and 1.1 (●, S1 — XP is "first and foremost a dramatic pacing mechanism").

**What the game does.** `MILESTONE_XP={quest:50,boss:100,act:200}` × level (globals.js:67) is the whole
menu, plus the GM's flavour award clamped at `GM_XP_CAP_PER_LEVEL`=10 × level per response (globals.js:69,
DEFAULT_RULES "XP IS ENGINE-CONTROLLED", data.js:120). Measured: the sonnet-5 forge vigil — three in-game
hours of bellows work, hunger, a companion sharing bread, a smith handing over four finished bracelets
"like a woman handing over her own children" (t2113) — moved the hero 106,720 → 106,760 XP. Forty points at
Level 17. The same fixture played toward the giants paid 140 in one turn (gemini t2110). In the fresh
campaign, 47 of 50 turns paid nothing.

**Insight.** The lens does not object to sword and sorcery; she wrote a combat system for exactly that
audience (caution 3). It objects that the table has one column. A design where only violence, completion
and act-closure register cannot pace a quiet scene — and it shows, because the engine's own answer to a
quiet scene is to offer to skip it (finding 2). The nearest thing to a genre XP action already exists and
already works: `SKILL_SUCCESS` grows a skill through tested use with no currency in between (finding 8).

**Recommendation — M.** Not "add pastoral XP". Add **one** second column and cap it hard: a small,
rate-limited engine award for a named *kind of scene* the campaign's tone declares (a `TONES` entry gains
an XP-action list of three or four; the engine pays 1× level, at most once per N turns, on a tag the GM
already has cause to emit). The design fork worth putting to the owner first: whether an XP channel that is
not a milestone is compatible with the closed #348 curve at all. If it is not, the honest answer is "no
change, and the montage is the design's own admission" — which is a legitimate outcome of this finding.

**Settled?** Adjacent to the settled XP curve and levels-at-camp ruling. This proposes a new channel, not a
change to the curve, but it cannot ship without the owner's read on that boundary.

---

## 2. The montage is the design admitting quiet time has no value — where her whole Pastoral genre says it is the pacing

**Position applied:** 5.1 (●, S2 — Chuubo's is "built for a more pastoral/Miyazaki kind of story") and 5.2
(◐, S6/S10 — pastoral scenes are what set the pace).

**What the game does.** `montageDue()` (game.js:182) fires after `MONTAGE_AFTER_TURNS`=6 committed turns
with no combat tag and no movement tag; `engineFourthAction()` (game.js:166) then offers "Skip ahead — a
montage to the next real decision." The engine note (api.js:669) instructs: compress the stretch, advance
the clock, and land "at the next real decision". Measured: it fired twice in 50 fresh turns (t18, t42) and
the prose was good — "The road eats the hours the way it eats everything else out here" (t18).

**Insight.** The trigger condition *is* the definition of a pastoral stretch: same place, no fight, no
travel. The engine detects it accurately and concludes it should end. In her model the same six turns are a
chapter's backbone and each one is worth a point. This is the cleanest statement of finding 1 in code: the
only thing the design knows to do with quiet is spend it.

**Recommendation — S, and it is a sibling not a replacement.** When `montageDue()` is true, the fourth
button currently has one branch. Give it a second the player can reach — a "stay in it" beat that asks the
GM for one scene of the party being people (the note already exists in shape: `buildMontageNote`'s inverse).
Cheap, reversible, and it tests finding 1's premise without touching the XP curve. If the owner's read is
that the montage is correct because listening time is the scarce resource (Car Mode), record that and close
this — the dissent is honest either way.

**Settled?** No. The fourth button's *montage* branch is field-validated and stays; this adds a branch.

---

## 3. Defining moments are threshold crossings, not moments that landed — and the player has no vote

**Position applied:** 3.1 (●/◐, S1/S6 — another player feeling your XP emotion awards a point) and 3.3 (●,
S3 — emotion XP "isn't just a 'reward for someone being amazing'", because otherwise "there's social weight
on not rewarding people").

**What the game does.** `detectCoreMoments()` (game.js:1453) fires on: an HP crossing below 10% of max, an
alignment *label* flip, a companion joining, a party member dying, and a weighty W7 bond change. All five
are numeric or structural crossings. `[CORE_MEMORY:]` lets the GM file one; nothing lets the player. Rate:
22 defining moments across 2,437 turns — roughly one per 111 turns. Her comparator is one per fifteen
minutes.

**Insight.** The engine has a witness (thresholds) and an author (the GM) but no audience. In her design the
award exists precisely because the *recipient's* judgment is not the one that counts — and she is emphatic
that it must not be a quality score (S3). A player-side "that mattered" file is therefore not a reward
button and would not become one: it files a memory into a tier that already exists, is already capped at
`CORE_MEMORY_CAP`=25, already dedupes, and is already injected every turn by `buildCoreMemoryBlock`
(api.js:290). The drift-surface caution is real — core memory is canon injection — so the filed text must be
engine-composed from the turn, never player-authored prose.

**Recommendation — S.** A one-tap control on a rendered GM message that files `{kind:"player"}` into
`coreMemories` with an engine-composed sentence (the turn number, the location, the scene's subject), witness-
copied exactly like every other moment. Rate-limit it (one per N turns) and toast it, per the #347 "every
filing toasts" rule. This is the single highest value-per-byte import in this review.

**Settled?** No. Touches the drift surface (core memory injection) — Fable tier, test-first.

---

## 4. The suggestion buttons already ARE an XP-action menu; they just pay nothing

**Position applied:** 1.3 (◐, S6 — "Think of your 'XP actions' list as a reminder sheet. Whenever you
aren't sure what to do next, look down") and 2.7 (●, S2 — the system answers "here's what you might gain",
not "you should").

**What the game does.** Three GM-authored suggestions ride in-band on the turn (#328) plus
`engineFourthAction()`'s engine-authored fourth. The affordance gate validates them against the scene. They
are a visible, per-turn, four-item menu of what to do next — the same object as a Chuubo's XP-action list,
built for the same reason (the player not knowing what to do next), and validated to a higher standard than
hers ever was.

**Insight.** The infrastructure for finding 1 is already shipped and already field-validated. The missing
piece is not a menu; it is a *payoff marked on the menu*. Her framing is the important part: an XP action
is not an instruction, it is a stated gain — which is exactly why marking one is not railroading.

**Recommendation — S, contingent on finding 1.** If a second XP column ever ships, mark it here: one of the
four buttons per turn carries the genre action, visibly. If it does not ship, no change — an unmarked menu
is still a good menu.

**Settled?** No, but downstream of finding 1's fork.

---

## 5. Companion wants are Issues, and the #330/#347 design got the hard part right — but a resolved want pays nothing

**Position applied:** 4.4 (●/◐, S1/S7 — Issues are GM-assigned, never player-chosen), 4.3 (●, S4 — an Issue
resolves for 4 XP + 1 MP, or escalates when closure is missed) and 4.2 (●, S4 — level 1 of an Issue states
the character's *self-deception*: "You always face your issues head-on.").

**What the game does.** A companion carries one active want plus a silent backlog (`agendaFile`,
helpers.js:157), readable on the sheet and never editable — "personality is not the player's to tailor"
(helpers.js:151). Sources: a blueprint seed, the GM when the story earns it, or a defining moment at
`AGENDA_BIRTH_CHANCE`=0.25 (globals.js:130). The recruitment ask was retired at #347 because it manufactured
three wants in three days. The stable rule (data.js:133) sets refusal as the ceiling and forbids inventing a
faction, artifact or person. `[COMPANION_AGENDA_DONE:]` fulfils it and promotes the next.

**Insight.** Three of Moran's four Issue properties are present and were arrived at independently: GM/engine
assigned, not player-tailored, escalating in a queue rather than all at once. The owner's "never
manufactured" ruling is a *stronger* version of her position, and the #347 retirement is the same lesson she
records in S3 — a mechanism that must fire produces hollow output. Two gaps: (a) resolution is unrewarded —
`agendaComplete` files history and promotes, and nothing else in the world changes; (b) every want is a
sincere statement of desire, where the craft of an Issue is that its first face is a lie the character tells
themselves.

**Recommendation — XS for (a):** pay a milestone-scale award on `[COMPANION_AGENDA_DONE:]` (the tag already
lands; `MILESTONE_XP` already has the shape) and file the fulfilment as a defining moment, so the party
carries it. **No change for (b)** — a self-deceiving want would need the GM to hold two readings of one
character across a long campaign, and the drift record says that class of instruction decays. Record it as
considered and declined.

**Settled?** Wants-are-optional and never-manufactured are settled and this proposes no change to either.

---

## 6. The hero has an XP track and no arc of self; act completion pays 200×level and names nothing about the person

**Position applied:** 4.5 (●, S1 — every character is always on exactly one Arc, "the story about the person
they're becoming"), 4.6 (●, S1 — arc steps have mandated outcomes independent of the quest: finishing an
Otherworldly 3 means "you'll always discover a part of yourself… that hasn't been changed") and 8.4 (●, S2 —
wishing is a property of the character's heart).

**What the game does.** Companions carry a want. The player character carries `trait`, `flaw`, `motivation`
(static since creation; shipped to the GM in the stable half by #341/#358, api.js:587) and nothing that
progresses. `[ARC_COMPLETE:]` and `[ACT_COMPLETE:]` (tag_table.js:178–180) advance the skeleton and pay
`MILESTONE_XP.act`=200 × level. Neither records a change in the hero. Growth is levels, features from the
class bible (Rogue L2 "Cunning Action", L5 "Uncanny Dodge" — class_bible.js:365ff) and skill successes.

**Insight.** The class bible answers "what can this person do"; nothing answers "who is this person
becoming". Her arc mechanism is cheap precisely because the outcome is *mandated by the arc, not derived
from the events* — the engine does not have to be clever, it only has to ask the right question at the right
seam, and the seam already exists.

**Recommendation — S.** At `[ACT_COMPLETE:]`, one engine note asks the GM for a single sentence naming what
the act changed — or refused to change — in the hero, filed as a defining moment (`kind:"act"`). One note,
one tag, one sheet write, at a seam that fires perhaps five times a campaign. It gives the ending button
something to land on, and it is the cheapest character-arc in this file.

**Settled?** The skeleton and the ending button stay (settled); this adds nothing to either, only a record at
their seams.

---

## 7. Levels landing at camp is already the Moran move — say so, and protect it

**Position applied:** 5.3 (●, S1 — a character out of XP options "fades into the background" so the clock can
move) and 1.1 (●, S1 — XP as pacing).

**What the game does.** #349 (v1.830): XP accrues immediately but the level *arrives at the next long rest*;
`landOwedLevels()` runs inside `restSpells()` before the heal, and the whole party levels together
(DOC/contracts/quests.md §11).

**Insight.** This is the one place where the design makes a reward wait for a quiet scene, and it is exactly
the instrument the lens spends findings 1 and 2 asking for. It converts a camp — otherwise a resource
transaction — into the beat where the story of the characters advances. The corpus shows the scene the rule
is buying: the gemini rest at t2099, the whole party asleep in the smithy; the sonnet-5 hero at t2109 in "a
fatigue that has gone past pain into something almost peaceful".

**Recommendation — no change.** Record it as convergent design and treat the camp scene as a protected
surface: anything that lets a level land outside a rest would remove the only pastoral beat the reward
economy currently honours.

**Settled?** Yes — levels-at-camp is closed. Recorded as agreement.

---

## 8. Skills advance by doing, not by spending — the design's most Moran-shaped mechanic, and it is undersold

**Position applied:** 1.6 (●/◐, S1/S6 — learning is an experience, not an XP dump).

**What the game does.** `[SKILL_SUCCESS:skill_id]` on a *tested* success advances that skill's counter
toward `SKILL_THRESHOLDS` [1,5,12,25,50]; the prompt block states plainly that auto-successes never earn
progress, "only rolled or genuinely tested successes earn progress" (api.js:2336, api.js:2338). There is no
currency between the act and the growth. Companions earn their own ladder.

**Insight.** This is her model of advancement running live in a shipped feature, and it covers 37 skills. It
is also the proof that this engine *can* pay for a kind of doing without a milestone — which is the technical
objection finding 1 would otherwise face. Note the boundary that keeps it honest and would have to be
respected by any new channel: routine work earns nothing.

**Recommendation — no change.** Cite this seam as the precedent if finding 1's second column is ever built:
same shape (a tag the GM already emits, a counter, a threshold), same anti-grind rule.

**Settled?** N/A — recorded as strength.

---

## 9. The downed ladder is escalate/stagger/fold, and it is the right answer to "what replaces the die"

**Position applied:** 6.2 (●, S5 — five postures, four of them descriptive), 6.3 (●, S5 — "if you believe
your character can escalate… then they can") and 6.1 (●, S2 — the negotiated shape of a conflict matters
more than the number).

**What the game does.** The three-turn downed grace, the death walk and plot armor form a graded ladder
between fine and dead. Measured at t47 of the fresh campaign: the player's action was literally a stagger
("Struggle — fight for consciousness, crawl, cling to life"), the CON save succeeded, and the outcome was
neither victory nor death — "the hesitation buys you the one thing you have left: time." The foe declined
to finish it for a stated in-character reason.

**Insight.** Model-narrated dice are settled, and the lens has no quarrel with them (caution 2 — she ships
dice herself). What her combat subsystem contributes is the reminder that the *ladder*, not the roll, is
what makes a fight readable: escalate, press, hold steady, stagger, fold. The player's side of that ladder
is built. The foes' side is HP plus prose. The gemini corpus shows the cost — six consecutive turns where
giants absorb damage and die without once escalating, pressing or folding.

**Recommendation — no change to the player ladder (settled).** Optional S if the combat tracker is ever
reopened: give a tracked foe one posture field (pressing / holding / staggering / folding) that the GM sets
and the prompt reads back, so a fight has a shape the engine can see. Not urgent; recorded for the next
combat pass.

**Settled?** Death walk, plot armor, three-turn grace and model-narrated dice are all settled. Recorded as
agreement plus one deferred idea.

---

## What the Moran lens would actually take from this game

1. **Wants that are never manufactured.** #347 retired a mechanism that had to fire and therefore invented —
   a discipline her own emotion-XP essay gropes toward and never lands (S3 ●, "I'm not sure what the answer
   is"). This engine ruled it and shipped it.
2. **Defining moments as a permanent, witness-copied tier that survives a campaign change.** Her Issues
   resolve and vanish into history; core memories are carried by everyone who was there and ride into the
   next adventure. That is a better memory than hers.
3. **Levels that land at camp.** One line of engine ordering turns a resource transaction into the beat
   where the characters change — the pacing effect she wanted from XP, achieved without an XP economy.

## Verification gaps

- **The Chuubo's rulebook was never read** (lens §11). Every position graded ◐ — including the whole genre
  XP-action structure that findings 1, 2 and 4 rest on — comes from a fan digest or a reviewer. Before any
  of those findings drives code, the book's own text should be checked.
- **The forge-vigil corpus is a harness artifact, not a play sample.** Nine of the twenty sonnet-5 turns are
  the same "I use my travel rations" action repeated; the GM handled it gracefully ("That's the fifth time
  you've gone digging in that bag", t2107) but those turns cannot be read as a player's pacing choices. The
  XP measurement stands (no action in twenty turns paid anything but the departure); the *pastoral quality*
  reading of that stretch is softer than it looks.
- **No corpus covers a rest-to-level.** Finding 7 asserts the camp beat's value from the contract and two
  rest turns, not from a measured level landing.
- **The live save's 22 defining moments were not inspected**, only counted. Finding 3's claim that they are
  all threshold crossings is read from `detectCoreMoments` (game.js:1453), not from the moments themselves;
  some may be GM-filed `[CORE_MEMORY:]` enrichments, which would soften it.
- **Companion want resolutions were not measured.** Finding 5's "resolution pays nothing" is read from
  `agendaComplete` (helpers.js:164); no corpus turn shows one firing.
- **No Moran statement on AI narration or solo play exists.** Every translation from her table to this one
  is the lens's construction and is flagged as such in lens caution 1.
