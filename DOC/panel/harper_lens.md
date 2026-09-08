# The Harper lens — a sourced review rubric for Traffic and Dragons

**Read this when** a consequence, clock, risk, downtime, death-ladder or scene-framing change wants a second
opinion from the modern fiction-first tradition, or before wiring the panel review skill (TODO #338).
Research deliverable of the TTRPG panel project (owner ruling 2026-09-05: research only, no skill yet).

**What this is.** A rubric of John Harper's *documented* design positions, each with a source, a confidence
grade and the review question it asks of this game. **What this is not:** an impersonation. Harper is a
living person; this file uses public craft statements only, never speculation about him. A review that uses
this file speaks as "the Harper lens", never as Harper, and cites the entry it is applying. Any claim not in
this file is not a Harper position for our purposes. Quotes are capped at fifteen words.

**Evidence base.** Three lanes, all read first-hand by the author of this file:

- **`S:<section>`** — the *Blades in the Dark* SRD, Harper's own rules text released under CC-BY. Read in
  full from the community mirror (`amazingrando/blades-in-the-dark-srd-content`,
  `Blades-in-the-Dark-SRD.md`); the *Basics*, *Setting Position & Effect*, *Consequences & Harm* and
  *Progress Clocks* sections were additionally verified word-for-word at <https://bladesinthedark.com>.
- **`LF`** — *Lasers & Feelings* v1.4, one page, game text © 2013 John Harper, extracted verbatim from
  `onesevendesign.com/lasers_and_feelings_rpg.pdf`.
- **`Q`** — Harper's typed answers in a live RPGnet Q&A, 6 April 2015, log archived at
  `gmshoe.wordpress.com/2015/04/06/qa-john-harper-blades-in-the-dark/`.
- **`DC`** — the *Blades in the Dark: Deep Cuts* product page and Harper's own comment replies,
  `johnharper.itch.io/deep-cuts`.

**Confidence legend.** ● primary (his own published text, read at a source by me) · ◐ secondary (his words
transmitted through a third-party archive or an interviewer) · ○ uncertain or unverified. A ○ entry may
inform a question, never a verdict.

---

## 0. Cautions — read before applying anything below

1. **The GM chapter is NOT in the evidence base.** The famous Blades gamemastering list — goals, actions,
   principles, best practices, bad habits (ch. 7 of the print book) — is not in the public SRD and I could
   not verify a single line of it. **"Be a fan of the PCs" is not sourced here at all**, and it originates
   with Vincent Baker's *Apocalypse World* in any case. Where this lens states a GM principle, it states it
   from the SRD's Basics chapter or from *Lasers & Feelings*, both of which I read. Do not fill the gap from
   memory or from community paraphrase.
2. **Blades is a crew game; this product is a solo game.** "Moving up the ladder is really the point of the
   game" (Q ◐) — the crew, the faction ladder, heat, claims and turf are the spine that downtime, vice and
   the score phase hang from. One player and a party of companions is a different animal. Import the
   *consequence grammar* and the *scene framing*; be careful importing the crew economy.
3. **Blades' GM does not roll dice** (Q ◐). Almost every mechanical position below assumes a human player
   rolling and a human GM setting risk. This game's arbiter is an engine and its narrator is a model. Where
   a position depends on who holds the dice, say so rather than scoring the game against a structure it
   deliberately does not have (model-narrated dice are a settled owner ruling).
4. **He treats his own systems as modular and revisable.** *Deep Cuts* (2024) ships "6 modular rules
   systems" including diceless downtime and "a new Action system" (DC ●). The lens should never present a
   2017 rule as a permanent law of design; it is one settled answer by a designer who kept editing.
5. **This is a design lens, not a taste lens.** Nothing here licenses an opinion about prose voice,
   subject matter, or who the game is for.

---

## 1. The fiction-first loop and the action roll

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 1.1 | You roll only when the outcome is genuinely in doubt AND something is at stake. | "If there's no danger or trouble at hand, you don't make an action roll" — S:action-roll (●) | `api.js:2176` teaches DC bands with no trigger rule. When does this GM roll, and does anything stop a roll whose outcome the prose has already settled? |
| 1.2 | The player states a concrete goal *before* the roll; the GM's job is to ask and clarify it. | "it's the GM's job to ask and clarify the goal when necessary" — S:action-roll (●) | The player types intent; the model narrates goal, roll and outcome in one block. Is the stated goal ever pinned before resolution? |
| 1.3 | The GM sets position and effect *before* the dice, and they are two independent variables. | "The GM sets position and effect for an action roll at the same time" — S:setting-position-effect (●); "nine combinations to choose from" (●) | The engine's only dial is a DC (10/15/20). One axis where Blades has two. Can this GM say "you can do it, but it will only get you halfway"? |
| 1.4 | Risky is the default; danger moves it, it is not a difficulty knob. | "By default, an action roll is risky" — S:action-roll (●) | Is there a default risk posture in this game's prompt at all, or is every scene's danger re-invented per turn? |
| 1.5 | A player may trade position for effect — more danger for more accomplished. | S:effect ▸ Trading Position for Effect (●) | Nothing offers the player "faster but riskier". The reckless wildcard (#305) is the nearest thing, and it is periodic, not situational. |
| 1.6 | You cannot roll an action your character is not performing in the fiction. | "You can't roll a given action rating unless your character is presently performing that action" — S:action-roll (●) | The affordance gate (#126 → #343) enforces this harder than Blades does: an unowned capability is refused before the button renders. Straight agreement. |
| 1.7 | The Devil's Bargain: a named price, accepted before the roll, paid regardless of the result. | "The Devil's Bargain occurs regardless of the outcome of the roll" (●); "always a free choice" (●) — S:action-roll | `buildRecklessNote` (api.js:679) rewards recklessness and forbids punishing the choice. Is the price ever *named* to the player before they commit? |

## 2. Consequences and harm — the grammar

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 2.1 | Consequences come in five named kinds: reduced effect, complication, lost opportunity, worse position, harm. | S:consequences-harm (●) | The tag vocabulary is `[HP:]`, `[GOLD:]`, `[ITEM_LOST:]`, `[CONDITION:]`, `[ENEMY_HP:]`. Four of the five kinds have no engine surface at all. |
| 2.2 | A roll always moves the situation; failure is never "nothing happens". | "The situation always changes after a roll, for good or ill" — LF (●); "Use failures to push the action forward" — LF (●) | Measure a failed check in the corpus: did the world change, or did the turn re-offer the same three options? |
| 2.3 | A bad result may still leave partial effect if that is more interesting; the GM decides. | S:action-roll ▸ step 6 (●) | Does anything in this prompt permit a *partial* outcome, or is `[DICE:…\|success/failed]` binary by construction? |
| 2.4 | The player owns the severity of what lands: resistance always works, and it costs. | "Resistance is always automatically effective" (●); "reduces the severity of a consequence" (●) — S:resistance-armor | The downed ladder (struggle / yield) is this game's only player-facing lever on a consequence. What else can the player push back on? |
| 2.5 | Whether consequences are *reduced* or *avoided* is the dial that sets a campaign's tone. | "the GM establishes the overall tone of your game" — S:resistance-armor (●) | Plot armor (#319, two escapes), the three-turn downed grace, three respawns: this game's dial is *reduce*, consistently. That is a coherent tone choice — is it stated anywhere as one? |
| 2.6 | Harm is described, not just numbered — "Chest Wound", "Cut to the Ribs" — and it degrades capability. | S:consequences-harm ▸ HARM (●) | `[CONDITION:name\|duration\|cause]` is exactly this shape and carries the cause. Measured use: 2 conditions in 50 turns, 0 in either 20-turn mature run. |

## 3. Progress clocks — visible pressure

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 3.1 | Draw a clock for ongoing effort *or* for trouble on its way. | "Draw a progress clock when you need to track ongoing effort against an obstacle" (●); "the approach of impending trouble" (●) — S:progress-clocks | `clock.js` `[SCHEDULE:label\|when]` is a strictly better instrument (real durations, engine-recomputed countdowns). Is one ever started in play? |
| 3.2 | The clock names the obstacle, never the method. | "make it about the obstacle, not the method" — S:progress-clocks (●) | Quest objectives are the analog. #191 already rules that objectives are OUTCOMES, not rituals — the same principle, independently arrived at. |
| 3.3 | Danger clocks: complications tick it; when it fills, the danger arrives. | "When the clock is full, the danger comes to fruition" — S:progress-clocks (●) | Does anything in this engine accumulate toward a bad outcome, or does every threat arrive fully formed on the turn it is narrated? |
| 3.4 | Racing and mission clocks put a window on the fiction; running out changes the situation. | S:progress-clocks ▸ Racing / Mission (●) | Schedules can do this. `buildScheduleEscalation` exists for the firing end; nothing observes prose for a deadline that was promised and never registered. |
| 3.5 | The clock reflects the fiction — it does not drive it. | "A clock is like a speedometer in a car" — S:progress-clocks (●) | Directly compatible with the owner's ban on ledgers as a story device: a clock is a readout, not a plot. |
| 3.6 | Clock size is a group judgment about this obstacle, not a stat block. | "Clocks are like HP" (◐); "the group sets the clock size, based on the judgment of the fiction" — Q (◐) | Foes here carry real HP from `[COMBAT_START:]`. Is foe HP judged against the scene, or copied from a monster-manual instinct? |

## 4. Stress and trauma versus hit points

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 4.1 | Stress is a resource you *spend* to refuse a consequence — the player chooses when to burn it. | "Stress is like HP, but you spend it to avoid bad consequences" — Q (◐) | HP here is subtracted *to* the player. Is there any resource the player spends to say "no, not that"? |
| 4.2 | Running out does not kill you; it takes you out and marks you. | "you're taken out of action" (●); "Trauma conditions are permanent" (●) — S:stress-trauma | The downed ladder is this exact shape: 0 HP is out-of-action, resolved by capture / rescue / intervention, and the engine files the scar as a Defining Moment. |
| 4.3 | The permanent mark is a *personality* change the player then plays. | Trauma list: Cold, Haunted, Obsessed, Paranoid, Reckless, Soft, Unstable, Vicious — S:stress-trauma (●) | Defining Moments and alignment drift are the analogs. Does a scar ever change how the character is *played*, or only what the sheet remembers? |
| 4.4 | Death exists, is rare, and is usually a choice the player consents to. | "If they suffer level 4 fatal harm and they don't resist it, they die" (●); "Sometimes this is a choice a player wants to make" (●) — S:resistance-armor | Death walk / plot armor is settled. Note the agreement: in both designs death is opt-in-ish and structurally hard to stumble into. |
| 4.5 | Armor is a limited, spendable "not this time" that refreshes at the phase boundary. | S:resistance-armor ▸ Armor (●) | `RESPAWNS_PER_CAMPAIGN`=3 and `PLOT_ARMOR_ESCAPES`=2 are armor boxes by another name — bounded, countable, spent. Same instinct. |

## 5. Flashbacks, planning and framing

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 5.1 | Planning scenes are cut: pick a plan type, supply one detail, start in motion. | "the GM will cut to the action as the first moments of the operation unfold" — S:planning-engagement (●) | How many turns of this game are preparation the fiction did not need? The montage (#308) is the engine's own answer to that question. |
| 5.2 | Competence is proven retroactively: the flashback buys what the character already did. | S:planning-engagement ▸ Flashbacks (●) | No analog exists here, and none is obviously needed — but the *goal* (no dead prep turns) is exactly #308's goal. |
| 5.3 | A flashback cannot undo what is already established on-screen. | "A flashback isn't time travel" — S:planning-engagement (●) | `[RETCON:]` and the #147 correction pin are the local machinery for the same boundary. Same rule, different direction. |
| 5.4 | Prep should attach to the problems that *did* happen, not the ones that might. | "your 'flashback planning' will be focused on the problems that do happen" — S:planning-engagement (●) | The campaign skeleton pre-writes acts and an ending. Settled ruling; the dissent belongs in §10, not in a finding. |
| 5.5 | Speed of entry is a design goal, stated as one. | "designed so you can get to the scores quickly … don't have to waste hours planning stuff" — Q (◐) | What is this game's equivalent of "get to the score"? The first ten turns of a fresh campaign are the measurable answer. |

## 6. Downtime, vice and heat

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 6.1 | Downtime is a *different toolbox*, deliberately kept out of the way during action. | "we take out a different toolbox and resolve downtime on its own terms" — S:downtime (●) | This game has one toolbox and one price per turn. Four consecutive turns of bellows-pumping cost exactly what four combat turns cost. |
| 6.2 | Downtime is a break in energy, not a break in play — quieter, personal, cheap. | "Downtime gives them a reprieve so they can catch their breath" — S:downtime (●) | The montage and "wrap up" bookends (#308) are the local instrument. Do they fire while the quiet stretch is still cheap? |
| 6.3 | Recovery costs a risk: the vice roll can overshoot into a bad decision. | "A vice is not a reliable, controllable habit" — S:downtime-activities (●) | Long rests here are free and total (heal to full, mana refilled, levels land). Settled: no convalescence. Note the divergence, do not relitigate it. |
| 6.4 | Reputation is a tracked, mounting cost of doing business — and killing costs double. | "+2 heat if killing was involved (whether the crew did the killing or not)"; "bodies draw attention" — S:heat (●) | Whispers (#317) are the analog and are *better suited to this product's taste*: hearsay served as rumour, never as a ledger. |
| 6.5 | Entanglements: the world acts on the crew between scores, from its own agenda. | S:entanglements (●); "The GM advances their project clocks" — S:downtime-activities (●) | Do this game's NPCs and factions do anything while the party rests, or does the world idle until addressed? |

## 7. The GM's job (sourced from the Basics chapter and Lasers & Feelings only)

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 7.1 | The GM's first job is a world that moves: every NPC gets a want and a method. | "giving each one a concrete desire and preferred method of action" — S:basics (●) | NPC records store status, relation and notes. Companion *wants* (#330/#347) are exactly a desire — for companions only, and deliberately optional. |
| 7.2 | The GM is not in charge of the story and does not pre-plan events. | "The GM isn't in charge of the story and doesn't have to plan events" — S:basics (●) | The skeleton, act goals and the ending button are direction. Settled ruling — record the dissent in §10 and move on. |
| 7.3 | Offer opportunities, then follow the consequences wherever they go. | "present interesting opportunities to the players, then follow the chain of action" — S:basics (●) | `quests.md`: an offered quest is NOT a goal; the GM may not steer toward or advance it until the player accepts. Verbatim agreement, in code. |
| 7.4 | Telegraph: show the threat's evidence first, show the wind-up second, ask third. | "Introduce the threat by showing evidence of its recent badness" (●); "Before a threat does something to the characters, show signs that it's about to happen" (●) — LF | DEFAULT_RULES' DRIVE clause orders the GM to introduce danger on its own initiative. It never says to show the sign *before* the blow. |
| 7.5 | Ask the players questions and build the world out of their answers. | "Ask questions and build on the answers" — LF (●) | The only place this game asks the *player* anything is Death's one question (#301). Every other turn ends in three engine-shaped options. |
| 7.6 | Do not pre-decide outcomes. | "Don't pre-plan outcomes—let the chips fall where they may" — LF (●) | With a model narrating its own dice, "pre-planned" is the default state unless the prompt fights it. `[CHECK:]` mode (#329) is the structural fix, off by default. |
| 7.7 | Threats are qualitative first, quantified only where a quantity helps. | "It's not quantified. It's qualitative" — Q (◐); "You need as many details as you can so the threats are brought to life" — Q (◐) | `[COMBAT_STATS:]` demands six ability scores and a CR for every foe. Which of those numbers is ever read by anything? |
| 7.8 | Authority is split by category, and the split is written down. | Players have final say on which actions are reasonable; the GM on danger, on consequences, and on whether to roll — S:core-system ▸ Judgment calls (●) | Who is the arbiter here: the engine (tags), the model (prose), or the player (Sync modal, Table Talk)? The split exists; it is not written down as a split. |
| 7.9 | The GM organizes the conversation toward the interesting parts. | "helps organize the conversation of the game so it's pointed toward the interesting elements" — S:basics (●) | The suggestion buttons are this instrument. The engine fourth button (rest / use / accept / buy / montage / wildcard / ending) is the engine doing the pointing itself. |

## 8. Advancement

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 8.1 | XP is paid for *taking the risk*, not for winning: a desperate roll marks xp either way. | S:advancement ▸ PC Advancement (●) | XP here comes from quest milestones and boss kills — outcomes. Does anything reward a risk that failed? |
| 8.2 | XP is also paid for playing the character: beliefs, heritage, background, and struggling with vice or trauma. | "It doesn't matter if the action is successful or not. You get xp either way" — S:advancement (●) | Defining Moments, alignment drift and companion wants are the character-expression channels. None of them pays. |
| 8.3 | The player, not the GM, judges whether a character-expression trigger fired. | "Which events … match the experience triggers … The players have final say" — S:core-system (●) | Here the engine pays and the GM may add flavour XP under a cap. The player has no say at all — a deliberate anti-drift choice worth naming as one. |
| 8.4 | Advancement rate is a dial a group should be able to turn. | "A modified Advancement system to customize the rate at which characters progress" — DC (●) | `classXpLevels()` is a bible table — already the right shape for a dial. Settled: the curve is closed. |

## 9. Minimal rules — the Lasers & Feelings position

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 9.1 | A complete game fits on one page: one number, one roll, one reading. | LF, whole text (●) | Every rule the GM must honour is prompt weight. Which bible clauses in the stable half have never changed a single narrated outcome? |
| 9.2 | A partial success is the GM's cue to add, not to subtract. | "The GM inflicts a complication, harm, or cost" — LF (●) | Three verbs, one line, no table. This is the cheapest possible version of §2.1 and would cost this prompt about twenty tokens. |
| 9.3 | Give the player a channel to ask the fiction a direct question and get an honest answer. | "Ask the GM a question and they'll answer you honestly" — LF ▸ Laser Feelings (●) | Table Talk is an out-of-character help desk; Death's question (#301) is the in-fiction one, and it is the strongest scene tech in the corpus. |
| 9.4 | Helping is fictional first: say how you help, then roll. | LF ▸ Helping (●) | Companions act on their own sheets each turn. Is a companion's help ever the *player's* declared move? |
| 9.5 | Play to find out — including what kind of person the character turns out to be. | "Play to find out how they defeat the threat" — LF (●); "playing to find out how bad or good you turn out" — Q (◐) | Alignment drift with two independent axes is a mechanical version of this. It is measured, shown, and never used to gate anything. |

---

## 10. Where the lens would fight the product

Stated as honest dissent, not as a defect list. Several are settled owner rulings; they are recorded so a
review can say the disagreement out loud and then say why the product disagrees.

- **Pre-written structure versus play-to-find-out** (7.2 ●, 5.4 ●). The three-act skeleton, the authored
  spine ("steer scenes toward the CURRENT arc's objective", api.js `buildSkeletonBlock`) and the ending
  button are exactly the planning Blades refuses. *Settled ruling — skeleton and ending stay.* The product's
  answer is that a solo player with no table needs a spine, and that the quest system (7.3) keeps the choice
  live. The honest form of this dissent is per-feature: does the player's choice still change the outcome?
- **The GM rolls its own dice** (7.6 ●, Q ◐). A narrator that writes the number after writing the result has
  no dice at all. *Settled ruling — model-narrated dice stay.* `[CHECK:]` (#329) is the product's own answer,
  shipped and defaulted off.
- **Consequences priced only in hit points** (2.1 ●). Blades' whole craft argument is that "worse position"
  and "lost opportunity" are what make a scene tense without shaving a number. This lens will keep pressing
  on that, because it costs prompt text rather than architecture.
- **No stress, no player-side refusal** (4.1 ◐). The player here can never say "no, not that, and here is
  what it costs me". The downed ladder is the one exception, and it only opens at zero.
- **Downtime at score prices** (6.1 ●). One toolbox, one price. This is a real economic difference for a
  product that bills by the turn, and #308's montage is the product agreeing with the lens already.
- **The crew is missing by design** (caution 2). Heat, turf and the faction ladder do not port to one hero
  and three companions. Whispers (#317) are the correct small translation; do not recommend the rest.

## 11. Things the lens must never say

- That "be a fan of the PCs" is a Harper quote or a Harper position. It is not in this evidence base and it
  originates with Vincent Baker's *Apocalypse World*.
- That "play to find out what happens" is Harper's coinage. He uses it (S:score ●, LF ●); Baker wrote it.
- That the Blades GM chapter says X. This lens never read it (caution 1).
- That Harper opposes dice, numbers or GM authority. He wrote HP-shaped clocks ("Clocks are like HP", Q ◐),
  gave the GM final say on danger and consequences (7.8 ●), and designed a resistance economy in six-stress
  units.
- That clocks are secret GM tools. They are shown to the table: "so the group can gauge how they're doing"
  (S:progress-clocks ●).
- That flashbacks rewrite established fiction (5.3 ●).
- That *Deep Cuts* repudiates *Blades*. It is a modular expansion of alternative systems, by his own
  description (DC ●).
- Anything about Harper personally, his table, his opinions on AI, or on this product. No such statement
  exists in this evidence base, and he is a living person.

## 12. Positions that moved, and how the lens weights them

| Topic | 2013–2017 | 2024 (*Deep Cuts*) | Lens weighting |
|---|---|---|---|
| Action resolution | Position + effect, six-step action roll (S ●) | "A new Action system, which overhauls and streamlines the action resolution" (DC ●) | The 2017 text is the settled, readable position; the revision proves he treats it as a module, not a law. Never quote the 2017 rule as final. |
| Downtime | Roll-driven: vice roll, recover, long-term project (S ●) | "Diceless Downtime, with modified Vice, Healing, Crew Development" (DC ●) | The *phase separation* (6.1) is the durable position; the dice inside it were always negotiable. Weight the separation. |
| Harm & advancement | Fixed harm ladder, fixed xp triggers (S ●) | "More flexible and impactful Harm & Trauma"; advancement rate customizable (DC ●) | Treat rate and severity as dials, and treat *any* recommendation to hard-code one as against the grain. |
| Direction of travel | — | "empower players even more and speed up the process of play" (DC ●) | Where two readings of a position are possible, prefer the one that gives the player more say and takes less table time. |

## 13. Open verification gaps

- **The GM chapter (goals / actions / principles / best practices / bad habits) is unread.** It is not in the
  CC-BY SRD and the book is not in this evidence base. Every GM position above comes from Basics or
  *Lasers & Feelings* instead. This is the single largest hole in the lens.
- Most SRD text was read from a community mirror; four sections were verified at bladesinthedark.com. A
  future pass should verify the stress/trauma, downtime, heat, flashback and advancement sections against
  the official pages directly.
- The 2015 Q&A is a live IRC log archived by a third party. Typos in the log ("Kreigspiel", "obtacle") are
  his own typing, not transcription damage, but the archive is not authoritative — graded ◐ throughout.
- *Deep Cuts* itself is paywalled; only Harper's own product-page description and comment replies were read.
  The actual revised Action system, harm ladder and diceless downtime are **not** in this lens.
- *Lady Blackbird*, *Ghost Lines*, *Ghost Echo*, *World of Dungeons* and *Agon* 2e were not extracted (the
  Ghost Lines PDF resisted text extraction; the others were not reachable in this pass). Each likely carries
  its own GM-principles page in his own words — the cheapest way to close gap 1.
- No Harper statement about AI game masters, LLM narration, or this class of product exists in this evidence
  base. Do not invent one, and do not infer one from his remarks about video games or play-by-post.

## 14. How a review would use this file (for #338, not yet built)

A panel review names the member, the surface under review, and the entries applied. For each entry it states
the question, the finding against actual code, prompt text or corpus turns, and the verdict, in the
AUDIT_FABLE shape (finding, remedy, living status, validation). Dissent from §10 is stated as dissent, and a
settled owner ruling is flagged as settled in the finding itself. The review's first line carries the lens's
own caveat: this is a rubric of documented positions, not the man.
