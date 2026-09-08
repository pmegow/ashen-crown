# The Moran lens — a sourced review rubric for Traffic and Dragons

**Read this when** an XP, quest, companion, pacing or "what happened to this character" change wants a second
opinion from the designer who made *doing the kind of thing the genre wants* the whole reward economy.
Research deliverable of the TTRPG panel project (TODO #338, owner ruling 2026-09-05: research only).

**What this is.** A rubric of Jenna K. Moran's *documented* design positions, each with a source, a
confidence grade and the review question it asks of this game. **What this is not:** an impersonation. A
review that uses this file speaks as "the Moran lens", never as Moran, and cites the entry it is applying.
Any claim not in this file is not a Moran position for our purposes. She is a living person: only public
craft statements are in scope — nothing about her life, her politics, or her opinions of other people.

**Evidence base.** Unlike the Gygax lens, this one has no `sources/` briefs behind it; the primary sources
are short enough to cite directly, and the load-bearing ones were **read as raw page text**, not through a
summarizer. Quotes are capped at fifteen words.

| Key | Source | Kind | Read how |
|---|---|---|---|
| S1 | ["An Overview of Play"](https://jennamoran.tumblr.com/post/55245139106/an-overview-of-play), jennamoran.tumblr.com, 2013 — the flow-of-play section she drafted for the Chuubo's core book | her own words | raw page text |
| S2 | [Q&A IRC transcript](https://gmshoe.wordpress.com/2014/02/28/qa-jenna-moran-nobilis-chuubos-marvelous-wish-granting-engine/), The Hardboiled GMshoe's Office, 2014-02-28 | her own words | raw page text |
| S3 | ["On XP Emotions"](https://jennamoran.tumblr.com/post/183613702338/on-xp-emotions), jennamoran.tumblr.com, 2019-03-21 | her own words | raw page text |
| S4 | ["Issue Design for Chuubo's Marvelous Wish-Granting Engine"](https://jennamoran.tumblr.com/post/82771598450/issue-design-for-chuubos-marvelous-wish-granting), 2014-04-15 | her own words | raw page text |
| S5 | ["A Combat Subsystem for the Chuubo's… RPG"](https://jennamoran.tumblr.com/post/114902706018/a-combat-subsystem-for-the-chuubos-marvelous), 2015-03-28 | her own words | raw page text |
| S6 | [CMWGE Players Guide](http://chuubo.wikidot.com/cmwge-players-guide), The Glass-Maker's Archive (fan wiki digest of the rulebook) | secondary | raw page text |
| S7 | [Chuubo's Rules Summary](https://samhaine.wordpress.com/2016/04/04/chuubos-rules-summary/), System sans Setting, 2016 | secondary | fetch summary |
| S8 | ["Chuubo Talk: Quest Design"](https://www.indiegamereadingclub.com/indie-game-reading-club/chuubo-talk/), Indie Game Reading Club | secondary | fetch summary |
| S9 | [The Far Roofs press release](https://www.rascal.news/the-far-roofs/), Rascal News, 2024 | publisher copy | raw page text |
| S10 | [Rand Brittain's Chuubo's writeup](https://writeups.letsyouandhimfight.com/rand-brittain/chuubos-marvelous-wishgranting-engine/) | secondary | fetch summary |

**Confidence legend.** ● primary (her own words, verified at a source) · ◐ secondary (a rules digest or a
reviewer's reading of the book) · ○ uncertain. A ○ entry may inform a question, never a verdict.

---

## 0. Cautions — read before applying anything below

1. **Her games are group games about players rewarding each other.** Emotion XP is given by *other players*
   (S1, S3 ●); genre XP goes into a shared pot the whole table divides (S6 ◐); quest goals are hit by
   players helping each other hit them (S6 ◐). Traffic and Dragons has one player and a model. **Every
   position that routes through a second human needs a stated translation before it is applied** — usually
   "the player" or "the engine" takes the other players' seat, and that substitution is a design choice the
   lens must name out loud, not smuggle.
2. **She is not anti-dice, and never was.** Chuubo's is diceless, but she wrote optional dice rules for it
   herself, and The Far Roofs "uses a 5d6 dice pool for standard actions" (S9 ◐). The lens must never argue
   that removing chance is the point. The point is that *something* must carry the dramatic weight chance is
   not carrying.
3. **Chuubo's has an adventure mode, and she built one on purpose.** She wrote a combat subsystem because
   "I wanted to be able to recommend Chuubo's for generic adventure fantasy" (S5 ●), and the genre list runs
   from Pastoral through Road of Trials to Adventure Fantasy (S6, S10 ◐). The lens is *not* the voice that
   says sword and sorcery is the wrong genre. It is the voice that asks whether the reward economy knows
   more than one.
4. **"Pastoral" is a genre setting with its own XP list, not a mood.** In the Pastoral genre the tea-drinking
   scenes are the ones that *set the pace* (S6, S10 ◐). Do not read her as recommending slice-of-life
   content inside an adventure's reward structure; she would change the reward structure or leave it alone.
5. **Much of Chuubo's is a card economy that this game has no surface for.** Quest cards, Issue cards, MP,
   Will, Intentions, Perks (S6, S7 ◐). Ask whether a position survives the translation to "a hidden tag and a
   prompt block" before importing it; several do not, and saying so is a legitimate finding.
6. **Her design writing is exploratory.** S3 ends "I'm not sure what the answer is." S4 opens by calling its
   examples "pretty rough; I'm just having fun." Treat those entries as questions she was asking, not
   doctrine she settled.

---

## 1. XP as a menu of genre-appropriate actions

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 1.1 | XP is a pacing device before it is a reward: "first and foremost a dramatic pacing mechanism for the game" | S1 ● | XP here paces nothing — `MILESTONE_XP` (globals.js) pays on quest/boss/act, and levels are the only consequence. What in this design decides *when a beat ends*? If the answer is "nothing", the tempo is entirely the model's. |
| 1.2 | The XP menu is genre-scoped: each genre carries its own list of XP actions, and the list defines what the game is about. Pastoral pays "just relaxing with a friend and enjoying the scenery"; adventure fantasy pays "being outmatched by a dangerous foe" | S6 ◐, S10 ◐ | This game has exactly one implicit genre in its reward table: a milestone was reached, a boss died, an act closed. Would a second, cheap channel — the small award for a *kind of scene* — cost anything the design values? |
| 1.3 | The player is meant to *steer toward* the menu: "Think of your 'XP actions' list as a reminder sheet." | S6 ◐ | The three suggested buttons plus the engine fourth are structurally the same object as an XP-action list — a visible menu of what to do next. They pay nothing. Is that deliberate? |
| 1.4 | Two XP actions per chapter per player, into a shared pot divided at the chapter's end | S6 ◐, S1 ● | Rate-limiting is the mechanism that stops the menu becoming a grind. Any award channel added here needs its own cap, the way `GM_XP_CAP_PER_LEVEL` caps the GM's flavour XP. |
| 1.5 | Sillier options recur every fifteen minutes; solemn ones are limited to once or twice a chapter | S1 ● | A frequency ladder that encodes weight. The engine's opposite is a flat clamp. Do the game's rare awards *feel* rarer, or just arrive less often? |
| 1.6 | Learning is an experience, not a purchase: quests, not XP, are what you spend growth on; skills come out of what a story arc gave you | S1 ●, S6 ◐ | `SKILL_SUCCESS` grows a skill through tested use with no currency in between (api.js skill-mechanics block). That is her shape already — name it and protect it. |

## 2. Quests — what one is, and what it is for

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 2.1 | A quest is anything a life contains: "anything that your character is working on… can be a quest" | S1 ● | The game's quest rule requires an "adventurous core: danger, mystery, the supernatural" (DEFAULT_RULES, data.js). That is a deliberate genre commitment. Does it leave *any* slot for a goal that is neither an errand nor a monster? |
| 2.2 | Her worked examples are domestic: "Practice the flute. Put out a game. Deal with grief." | S2 ● | "Deal with grief" is not administration and not adventure. The owner's ledger ban targets paperwork, not quiet stakes. Is the gap between them currently unreachable by design or by accident? |
| 2.3 | Every character is on at least one quest at all times, and quests combine into a larger Arc | S1 ● | This game runs to zero open quests (the live save's final act). In her model that is impossible; the arc always supplies the next one. Should a zero-quest state be a condition the engine notices? |
| 2.4 | A quest is a *menu of goals*, not a task: minor recurring beats worth 1 XP, one-time major beats worth about 5 | S6 ◐, S8 ◐ | Quest objectives here are booleans on a checklist and pay nothing individually; only completion pays. The lens asks whether the objective list could carry weights without becoming a ledger. |
| 2.5 | Quests are abandonable mid-play for partial credit; the player keeps agency over the story they are in | S8 ◐ | `declineQuest` archives as `declined` with no credit. Consistent with the engine-paid model, but worth stating as a choice. |
| 2.6 | Quest goals are hit collaboratively — players help each other reach their goals, and that interplay is the game | S6 ◐ | The single-player translation is the *companions*: do their wants ever give the player a goal to help with, or only a stance to bump into? |
| 2.7 | The system tells you payoffs, not obligations: "here's what you might gain" rather than "you should" | S2 ● | Suggested actions are framed as things to do, never as things that pay. A visible payoff is a different instrument from a suggestion, and she prefers the first. |

## 3. Emotional XP — rewarding the moment that landed

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 3.1 | Each character carries an XP emotion; another player feeling it awards a point, at most once per fifteen minutes | S1 ●, S6 ◐ | There is no channel by which this game's player says "that landed". The only witness with a vote is the engine. |
| 3.2 | The emotion names who the character *is*: "not what they can do, but how others would describe their personality" | S6 ◐ | The sheet already carries `trait` / `flaw` / `motivation` and (since #358) ships them to the GM. An XP-emotion analog would be one more field of the same kind — and it would have a consumer. |
| 3.3 | Emotion XP is deliberately **not** a reward for excellence — "isn't just a 'reward for someone being amazing'" — because then "there's social weight on not rewarding people" | S3 ● | The design principle is that the reward measures a *response*, not a performance. Any "that mattered" button here must file a moment, never a score. |
| 3.4 | She does not police the rule at the table; she lets an over-generous award through rather than break the scene | S3 ● | A soft, uncapped, imprecise channel is acceptable to her. The engine's instinct is the opposite (measure, clamp, verify). The tension is real and worth naming. |
| 3.5 | She left the tension unresolved: emotion XP skews toward the better moments anyway, and that may be unfixable | S3 ● | ○-adjacent honesty: do not cite her as having solved this. |

## 4. Issues and Arcs — the character-growth engines

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 4.1 | Issues are assigned by the GM, *retroactively*, to give a chapter's events "structure and meaning" | S1 ● | The engine's nearest kin is `fileCoreMemory` and the chapter summarizer — both retroactive, both engine-run. That half is already Moran-shaped. |
| 4.2 | Issues are written as in-character thoughts, including denial: "You always face your issues head-on." is level 1 of *In Denial* | S4 ● | Companion wants are written as plain statements of desire. An Issue's craft is that level 1 states the *self-deception*. Nothing in this game models a character being wrong about themselves. |
| 4.3 | An Issue escalates through five steps and resolves for a concrete reward (4 XP + 1 MP) — or escalates again when closure is missed | S4 ● | `[COMPANION_AGENDA_DONE:]` resolves a want for **nothing** — no XP, no level, no recorded change. A resolution that costs the engine nothing to notice pays nothing either. |
| 4.4 | Issues are not player-chosen; the GM hands them out | S1 ●, S7 ◐ | Matches the owner's rule exactly: wants are readable, never editable — "personality is not the player's to tailor" (helpers.js #330). Record this as convergent design, not borrowed. |
| 4.5 | Every character is always on exactly one Arc, and the Arc is "the story about the person they're becoming" | S1 ●, S6 ◐ | Companions carry a want. The **hero carries none.** The player character has an XP track and no arc of self. |
| 4.6 | Arc steps have *mandated outcomes independent of the quest that filled them* — finishing an Otherworldly 3, whatever it was, means "you'll always discover a part of yourself… that hasn't been changed" | S1 ● | `[ACT_COMPLETE:]` pays 200×level and names nothing about the person. The cheapest Moran import in this whole file: at an act's close, say what it changed in the hero. |
| 4.7 | Arc completion is a *permanent, substantive upgrade* plus a transition: "Your character's story has ended; their next story continues from there." | S1 ● | The "write the ending" button is exactly this beat, and it exists (settled). Is there an equivalent for the smaller ending — an act closing, a companion's want fulfilled? |
| 4.8 | Arcs come in eight colors, each a different *flavor of story*, and the color is chosen by feel, not by the ability it will buy | S6 ◐ | The blueprint's three-act skeleton picks the plot. Nothing picks the *shape of the growth*. Whether that is a gap or a scope decision is a genuine fork. |

## 5. Pacing — pastoral, adventure, chapters, books

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 5.1 | The system is "built for a more pastoral/Miyazaki kind of story than cosmic-level play" — quiet is a *mode*, not a lull | S2 ● | The engine's answer to a quiet stretch is `montageDue()` at `MONTAGE_AFTER_TURNS`=6: compress it and land at the next decision. The opposite instinct. |
| 5.2 | In the Pastoral genre those quiet scenes are the pacing backbone; the timeframe is built around them | S6 ◐, S10 ◐ | The forge-vigil corpus is twenty turns of exactly this material and the engine registered it as time to skip. Is the montage a pacing tool or an admission? |
| 5.3 | A chapter ends when everyone has taken their XP actions; a character who is out of options "fades into the background" so the GM can move the clock | S1 ● | Structurally this is the game's fourth button and the montage combined — a sanctioned way to yield the spotlight. The difference is that hers *pays* on the way out. |
| 5.4 | Chapters gather into books that are "the stories or the seasons of your game" | S1 ● | `memory.chapters` and eras are the same tier. Do they ever declare a season *closed* in a way the player feels, or only compress tokens? |
| 5.5 | Genre determines pacing mechanically — Immersive Fantasy is the fastest, Pastoral chapters last a week | S10 ◐ | This game's tempo is set by the model plus the clock. The lens asks whether campaign tone (`TONES`, data.js) should touch pace at all, or whether that is over-mechanizing. |

## 6. Resolution — what replaces the die

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 6.1 | Conflicts are resolved by asking what the two actions actually *say*: "wriggling around the space defined by that conflict is more important" than the number | S2 ● | Model-narrated dice are settled. The lens's contribution is the reminder that the interesting part is the negotiated shape of the outcome, not the number. |
| 6.2 | Her combat is a ladder of postures — Escalate, Press, Hold Steady, Stagger, Fold — and four of the five are purely descriptive | S5 ● | Downed-grace, the death walk and plot armor are a graded ladder already. Do the *foes* have one, or do they only have HP? |
| 6.3 | Permission is generous: "if you believe your character can escalate… then they can", with the GM free to veto | S5 ● | The engine's opposite is PLAYER ACTIONS ARE INTENT (DEFAULT_RULES) — verify against the sheet first. Both are defensible; the difference is whether the sheet or the fiction holds the veto. |
| 6.4 | Combat should be "narrative and not tactical" and should "get the pacing right" | S5 ● | Pacing is her stated success criterion for a fight, not fairness or tactical depth. Worth holding against any future combat-tracker change. |
| 6.5 | Individual combat beats should be shorter than story beats: a stagger is "I'm still desperately backpedaling" | S5 ● | Prose length in fights is a live concern here (no verbosity credit — owner rule). She agrees, and for a craft reason: a fight beat is *supposed* to be clipped. |

## 7. Companions, connections and other people

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 7.1 | Connections are skills — a bond with a person or a place you can *act through* | S6 ◐, S7 ◐ | Relationships here are two labeled axes (bond, dynamic) that no roll ever reads. Nothing mechanical flows through a relationship. |
| 7.2 | Connections rise faster than other skills because they need presence, not study | S7 ◐ | Presence is already tracked (`buildSceneManifest`, split members, W7 presence). The input exists; nothing consumes it as growth. |
| 7.3 | There are no hard protagonist/antagonist lines — "there's just Main Characters" — and she avoids people "unworthy of empathy" because "empathy is important" | S2 ● | Against DRIVE THE ADVENTURE's "antagonists scheme, ambush, resist". Not a defect: a genre difference, honestly stated. But do *any* foes get an interior? |

## 8. What a character sheet is for

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 8.1 | Competence is deliberately not central: the sheet is built to show "the dynamic evolution of your character", not a static state | S1 ● | This sheet is a state snapshot with a growth log bolted on (`storyBeats`, `coreMemories`). Which half does the player actually read? |
| 8.2 | Skills are freeform and include non-adventuring life: "Domestic Tasks 2, Kindness 2, Good Smile 2" | S2 ● | 37 fixed skills across 8 categories, all of them competences an adventurer uses. A closed list is a genre statement. |
| 8.3 | The sheet carries the *stories lived through* before play began — Arc Traits and Perks are prior stories, mechanized | S1 ● | `backstory` reached the GM only at turn zero until #358 fixed it. The lens seconds that fix: prior story is sheet data, not flavour text. |
| 8.4 | Wishing is a character property, not a plot device: "the wishing power in the heart to make the impossible possible" is what the classes formalize | S2 ● | The game has no wish, want or wish-analog on the player's sheet at all. Companions have wants; the hero has a class. |

---

## 9. Where the lens would fight the product

Stated as dissent, not as a defect list. Several of these are settled owner rulings; the dissent is recorded
and closed.

- **The reward economy knows one genre.** Milestones, boss kills and act closes pay; everything else is
  narration. She would call that an adventure-fantasy XP list with the other seven lists deleted (1.2).
  The product's answer is that this *is* a sword and sorcery game and the model supplies the texture for
  free. The measurable question the lens keeps asking: if the texture is free, why does the engine offer to
  skip it (5.2)?
- **Engine-paid XP with a clamped GM is the opposite of a shared pot.** Her XP flows from players to players
  and the GM mostly stays out of it. Here the engine is the sole payer and the GM is capped at
  `GM_XP_CAP_PER_LEVEL` (settled — XP curve and levels-at-camp are closed). The lens notes the cost:
  nobody at this table can say "that was worth something" except the engine.
- **The montage.** Her whole Pastoral genre exists to make the montage unnecessary. Settled in the sense
  that the fourth button is field-validated and the owner likes it; the dissent is recorded at finding 2.
- **Dicelessness is not the fight.** She ships dice when a game wants them (caution 2). The lens has no
  quarrel with model-narrated dice (settled) and should not manufacture one.
- **The three-act skeleton.** Her arcs are *character* arcs; the skeleton is a *plot* arc. She would ask
  where the story of the person is. Settled — the skeleton and the ending button stay — so the lens's
  live question is the smaller one: can a character arc ride alongside a plot skeleton cheaply (4.6)?
- **Solo play.** Emotion XP, the shared pot, and "help the other players hit their goals" all need a second
  human. The lens must translate, and must say when a translation is weak.

## 10. Things the lens must never say

- That she is against dice, or that dicelessness is the point of her design (caution 2, S9).
- That she is against adventure, combat, or danger. She wrote a combat system to make Chuubo's usable for
  adventure fantasy (S5 ●), and Road of Trials pays for suffering adversity (S10 ◐).
- That emotion XP rewards good roleplaying. She argues at length that it specifically must not (S3 ●).
- That Issues are chosen by players (S1 ●, S7 ◐) — that would invert the exact rule this game already
  shares with her.
- That slice-of-life means low stakes. Her pastoral setting includes a shot-down sun, ogres and a student
  council of horrors (S2 ●).
- That she thinks mechanics should model the world. Her stated aim is that mechanics pull the players'
  ideas out of them (S2 ●) — a claim about the *table*, not about simulation.
- Anything about her as a person, her life, or her views outside game craft.

## 11. Verification gaps

- **The Chuubo's rulebook itself was never read.** Every mechanical claim graded ◐ comes from a fan digest
  (S6), a rules summary (S7), or a reviewer (S8, S10). Page-level citations do not exist in this file, and
  a claim that matters should be checked against the book before it drives a change.
- **Nobilis 3e was not read first-hand.** All Nobilis positions here come from her IRC answers (S2).
- **The Far Roofs and Glitch were not read.** S9 is a press release; the "cost-based system instead of
  dice" line for Glitch traced only to a search summary of an interview and is graded ○ — it is not used in
  any position above.
- **The Ludogogy podcast (2024-03-29) and the Far Roofs video interview (2024-03-13) are audio/video and
  were not transcribed.** Likely the richest untapped seam of her own words on the newest design.
- **RPGGeek's Geek of the Week Q&A (thread 726735) returned 403** and could not be read; it is a long
  first-person Q&A and would probably add several ● entries.
- **No Moran statement on AI, LLM narration or solo play exists in anything read here.** Do not invent one.
  Caution 1 is the lens's own construction, not hers.
- **S7, S8 and S10 were read through a fetch summarizer**, not raw. Their entries carry ◐ partly for that
  reason; anything load-bearing should be re-read raw.

## 12. How a review uses this file

Name the member, the surface, and the entries applied. For each entry: the question, the finding measured
against real code, prompt text or corpus turns, and the verdict, in the AUDIT_FABLE shape. Dissent from §9
is stated as dissent, and a settled owner ruling is flagged as settled with the dissent recorded and closed.
The review's first line carries the caveat: this is a rubric of documented positions, not the person.
