# Panel review — the Laws lens on Traffic and Dragons

*This is a rubric of Robin D. Laws' documented positions, not the man.* Every finding cites the lens entry it
applies from [`../laws_lens.md`](../laws_lens.md) with that entry's confidence grade. Quotes from his
published work are capped at fifteen words; quotes from the game are file:line or corpus turn.

**Surfaces read** (no file modified): `CLAUDE.md`; `DOC/contracts/` prompt, quests, combat, memory, character,
clock; `DEFAULT_RULES` (data.js:105-134); the STYLE tail (api.js:2221); `engineFourthAction` (game.js:166-178);
`generateActions` + `SUGGESTION_MODE_BLOCK` (game.js:92-105, 559-605); the class bible header
(class_bible.js:1-30). **Corpora:** `dev/corpus_playtest_v1847_sonnet5_344.json` (50 turns, fresh campaign,
claude-sonnet-5); `dev/corpus_playtest_v1847_mature226_sonnet5.json` and `…_gemini.json` (20 turns each from
the same mature save). **Live-save facts** as supplied at v1.848.

---

## 1. The engine's fourth button offered a move the fiction refused ten times running

**Position applied:** 4.3 ● — "Preserve momentum. Keep the characters cool and competent. It's a gimme."
(See Page XX, "Make It A Gimme"); reinforced by 1.6 ● — clue dispensation means watching progress and
adjusting on the fly.

**What the game does (measured).** In `dev/corpus_playtest_v1847_mature226_sonnet5.json`, the engine-authored
fourth button read **"Use your travel rations (2 days)."** on **all 20 turns**. It was pressed 12 times. The
first press (t2098) worked. The other **10 were refused by the fiction** — t2108, verbatim: *"Nothing has
changed in your pouch since the last time your fingers found the bottom."* By t2107 the GM was writing the
refusal as a joke at the hero's expense: *"That's the fifth time you've gone digging in that bag."*

The mechanism is in `game.js:172`. `engineFourthAction` is stateless — it re-derives the button from
`c.inventory` every turn and has no memory that its own last offer produced nothing. Worse, the `use` branch
sits **above** the montage branch (`game.js:175`), so through the exact eleven-turn stretch at one anvil with
no fight and no move — the stall `montageDue()` exists to rescue — the engine's escape hatch was outranked by
a dead offer.

**The insight the lens produces.** This is the precise inverse of a gimme. Laws' rule is that the engine
should keep the hero looking cool and the story moving; here the engine's own button made the hero paw an
empty bag five times while the GM narrated the joke. Inventory drift is the *cause*, but the *design* defect
is that a button generated from state is never checked against the world's answer to it.

**Recommendation — S.** Two independent fixes, either sufficient: (a) give `engineFourthAction` a one-turn
refusal memory — if the previous turn's fourth button was the action sent and the turn produced no matching
state change, suppress that `kind` for N turns; (b) move `montage` above `use` in the ladder, so a stalled
stretch always gets the pacing tool rather than a consumable. Prefer (a); it generalises to `buy` and
`accept` too. Touches no settled ruling — inventory *size* is settled, inventory *truth* is not the subject.

---

## 2. Twenty-two turns with no up beat and no down beat

**Position applied:** 2.2 ● — "it fits the pattern of most satisfying narratives—a modulated but gradually
downward line" (*Beating the Story*); 2.3 ◐ — "Oscillate between hope and fear" (Laws in the DM's Deep Dive).

**What the game does (measured).** In the 50-turn fresh-campaign corpus, **t8 through t29** is flat on every
instrument the engine has: HP constant at 14/14, XP moved once (160 → 170 at t11) then held, zero combat, and
the tag stream is `LORE` / `NPC` / `TIME_ADVANCE` only. The **two longest narrations of the entire run sit
inside it** — t27 at 1,873 characters and t26 at 1,792 — both longer than the climax (t46, 925). The player
reached for the wildcard three times in that stretch (t8, t23, t29) and the montage once (t18): four presses
of the only two escape valves the engine has, in twenty-two turns.

**The insight the lens produces.** The engine measures a stall by *tags* — `montageDue()` (game.js:182-188)
requires six turns with no combat, no `LOCATION`, no `SUBLOCATION`, no `REST`. A plateau of pure
question-and-answer beats can carry a `LOCATION` tag every few turns and never trip it, which is exactly what
happened (t18, t26 both moved). Meanwhile `DEFAULT_RULES` entry 3 (data.js:108) demands *"a scene with no
stakes is a failed scene"* — but nothing anywhere measures whether the demanded stakes arrived. The rule is
an exhortation with no observer behind it, in a codebase that has observers for everything else.

**The insight is not that the plateau is bad prose.** It is well written. It is *one register held for
twenty-two turns*, which is the failure Laws names: the down-line never modulates because it never went up
or down at all.

**Recommendation — M.** Add a beat-shape observer to `NOTE_BUILDERS` alongside the existing stale-quest and
stale-combat nudges: count consecutive committed turns whose tag set is information-only (`LORE`/`NPC`/
`DECISION`, no `COMBAT_*`, no `QUEST` status change, no HP or GOLD delta) and, past a threshold, arm a
one-shot note asking the GM for an up or a down beat — a piece of good luck landing, or a threat arriving.
The machinery, the latch discipline and the budget are all already built. Touches no settled ruling.
**Drift-surface: this is a prompt-channel change → Fable tier.**

---

## 3. The suggested actions are a procedural menu; the dramatic beat is almost never offered

**Position applied:** 3.1 ● — "In roleplaying we've always done the first really well… The second, not so
much." (Keith Baker interview, on procedural versus dramatic play); 2.1 ● — the two load-bearing beat types.

**What the game does (measured).** Across the 50-turn run, **150 suggested actions**. Classified by leading
verb: **93 procedural** (charge, cut down, search, ride, push), **45 informational** (ask, listen, examine,
watch), **12** with any interpersonal charge at all (demand, refuse, tell). Not one proposes a scene *about* a
relationship. In the mature corpus — a hero with three Level-16 companions, two of them his wives — the 60
suggestions name a companion **8 times**, and every one uses them as an instrument: *"Ask Frizwick to spell
you"*, *"Check on Daeris's ward"*, *"Watch the shuttered window with Morwen"*.

The cause is in the prompt. `SUGGESTION_MODE_BLOCK` (game.js:97) enumerates the kinds the model
under-offers: *"buying or selling…, resting or making camp, using a carried item…, and accepting an offered
quest."* Every one of them is procedural. The engine's fourth button (game.js:166-178) offers rest, use, buy,
accept, montage, wildcard, ending — also all procedural. The one piece of DramaSystem this game already owns,
companion wants (#330/#347), has no button and no suggested-action kind.

**The insight the lens produces.** The game has built the emotional *data* — bonds and dynamics on two axes,
companion agendas, defining moments, alignment drift — and then offers the player a menu made entirely of
verbs that never touch it. Laws' claim is that dramatic scenes do not happen on their own; they happen when
the system makes asking for one a legal, visible move.

**Recommendation — S.** One clause in `SUGGESTION_MODE_BLOCK`'s legal-kinds line naming the dramatic kind:
press a present companion on something they want, admit something, refuse an ally, ask for or grant
forgiveness — an option, never a quota. The affordance gate already has everything needed to validate it
(present companions, `partyCaps`, the introduction axis). **Drift-surface: prompt assembly → Fable tier.**
Touches no settled ruling.

---

## 4. The engine offered "rest and recover" at the highest-tension moment of the run

**Position applied:** 4.3 ● — "Preserve momentum"; 2.3 ◐ — hope/fear oscillation; 2.4 ● — flourish beats
work only when rationed.

**What the game does (measured).** 50-turn corpus, **t47**: the hero is at 0 HP, downed in a fighting pit,
saved only by the villain's order — *"He does not die tonight. Drag him up."* — and hauled unconscious into a
cell. This is the run's single best down beat. The buttons rendered on that turn were: *Wake and take stock ·
Try to move, test your bonds · Listen for who else is near ·* **"Rest and recover — you are badly hurt."**
The harness took the fourth. **t48** opens in the cell at full 23/23 HP with a level landed.

The mechanism is `game.js:169`: the rest branch fires whenever `hp < maxHp/2` and no combat object is open,
and it sits at the **top** of the priority ladder, above the ending offer, above montage, above everything.
The combat had auto-closed when the foe went down, so a captured, unconscious, imprisoned hero read to the
engine as "wounded and idle".

**The insight the lens produces.** The engine's own button is the largest available shortcut from a down beat
to an up beat, and its trigger is a hit-point ratio with no reading of the scene. Laws' pacing objection is
not that the hero recovered — it is that the *engine proposed* the recovery at the moment the story had
finally earned its fear, and proposed it first, before any of the model's own three options.

**Recommendation — S.** Gate the rest branch on scene safety the engine already knows — captivity, pursuit, a
combat that closed within the last N turns, a `LOCATION_STATE` the GM has filed — or simply demote it below
`ending` and `montage` when a fight closed recently. **This is not a convalescence or healing-time mechanic**
(settled — do not recommend changing it); it is about when the *button appears*, not how fast HP returns.

---

## 5. Calibration: the game never gates a needed fact behind a failed roll — including when the roll fails

**Position applied:** 1.1 ● — "If you roll well, you get the clue. If not, you don't—and the story grinds to
a halt." (GUMSHOE SRD); 4.5 ● — "It takes out the boring, stupid failure in order to have more interesting
failures." (Geek Native).

**What the game does (measured).** The 50-turn run rolled 17 dice. Five were information rolls; four
succeeded. The one that failed is the interesting case — **t37, "Perception check | 13 | failed"**, searching
the pit crowd for the Alchemist. The GM did not stop the story. It withheld the target and handed over a
*different lead in the same paragraph*: a bookmaker who *"seems to know every face in this crowd by
reputation if not by sight."* The next turn (t38) the player watched the money instead and found the hooded
figure anyway. That is the core-clue posture and the credible-alternate-method rule (lens 1.7 ●), arrived at
without either being written down anywhere.

The structural reasons it holds: the GM narrates its own rolls (so there is no independent die to fail *at*
information); the optional `[CHECK:]` path (tag_table.js:134) stops the response *before* the outcome and
never adjudicates in advance; and the whispers note (api.js:533-546) is a free-information channel with a
hard fence — rumour *"never invents an event that did not happen"*, which is a cleaner statement of the
GUMSHOE fidelity rule than most published games manage.

**The insight the lens produces.** The property is real and it is undefended. Nothing in `DEFAULT_RULES`, the
MECHANICS line (api.js:2176) or the tag doc states it, so it survives on the model's instincts and on the
fact that the player currently has no dice of their own by default. The player-rolls-dice setting is exactly
the feature that could break it silently.

**Recommendation — XS.** One clause, in the MECHANICS line or as a `DEFAULT_RULES` entry: *a failed check
costs time, position, resources, safety or dignity — never the fact itself; give the player a different way
to the thing they need.* It is a two-sentence insurance policy on a property the game already has.
**Drift-surface: prompt text → Fable tier.** Touches no settled ruling (model-narrated dice stay).

---

## 6. Every fact arrives because the player asked for it

**Position applied:** 1.8 ● — "Ideally, exposition is conveyed in a seamless way, slipped into a scene that
does something else." (*From Plot Point to Scene*); 1.9 ● — the pipe beat plants information whose relevance
surfaces later.

**What the game does (measured).** The 50-turn run filed **9 `[LORE:]` tags**. Seven of them came from a
player action that was literally an interrogation: t13 *"Ask the drovers what they know of the pits"*, t14
*"Press him on the Shadow Alchemist's identity"*, t21, t22, t24, t40, t41. Only two arrived inside an action
doing something else (t9, searching a corpse; t23, the wildcard). In the mature corpus the same shape holds:
of 60 suggested actions, 24 begin with "Ask".

**The insight the lens produces.** The game has a rich private canon — skeleton, bestiary, authored NPC
dossiers, act-gated secrets — and exactly one delivery channel for it: a character answering a question the
player thought to ask. Laws' pipe beat is the missing shape: a fact planted *now*, unasked, inside an action
already underway, whose relevance lands three scenes later. The engine has a *promise* structure
(`futureEvents`, "things you said would happen") but no *plant* structure. And the whispers note proves the
pattern works — it is a one-shot, budgeted, fenced engine note that hands out information nobody asked for,
and the field record on it is good.

**Recommendation — S.** A sibling to the whispers builder: on a cooldown, ask the GM to deliver one canon
fact the player has *not* asked for, inside the action already happening, from a source with a reason to know
— and to file it as `[LORE:]` so it is retrievable. Same shape, same budget, one builder row (#309's registry
makes this one function plus one entry). **Drift-surface: prompt channel + memory tier → Fable tier.**

---

## 7. The wildcard is the best pacing instrument in the game and it fires on a metronome

**Position applied:** 2.6 ◐ — prep is "a bunch of things that might leap in as a upward or downward beat";
5.1 ● — "always be ready to jettison what you thought would happen in favor of what the players are making
happen."

**What the game does (measured).** `WILDCARD_EVERY = 7` (globals.js:148): every seventh turn, unconditionally,
the fourth button becomes *"Do something reckless."* and `buildRecklessNote` (api.js:679-682) instructs the
GM to *"let it work spectacularly or fail spectacularly — never mundanely, never punished for the choosing."*
That note is the single most Laws-shaped piece of text in the codebase: it is an explicit instruction to
produce a large up beat or a large down beat and forbid the lateral one. In the 50-turn run the wildcard
turns are t8 (1,063 chars), t23 (1,703 — the third-longest of the run) and t29 (1,452, which opened the
Widowmaker fight). It works.

**The insight the lens produces.** The instrument is excellent and its trigger is a turn counter. Laws'
pacing rule measures the next beat against the *recent* beats, not against a clock — which is precisely the
signal finding 2 proposes building. A wildcard offered on turn 7 of a fight is noise; a wildcard offered on
turn 22 of an interrogation plateau is the whole answer.

**Recommendation — XS/S, and it composes with finding 2.** Keep the button, the copy and the note exactly as
they are (owner-validated). Bias the *offer*: bring it forward when the plateau observer says the last N
turns carried no up or down beat, and hold it when a fight closed within the last turn or two. One condition
added to `game.js:176`, reading the same signal finding 2 builds. Touches no settled ruling.

---

## 8. Calibration: the skeleton's GM-eyes-only fence is textbook non-linear scenario discipline

**Position applied:** 7.1 ● — "A scenario that provides freedom and choices must include more material than
any single group could possibly activate"; 7.3 ● — branching means improvising whole scenes.

**What the game does (measured).** `buildSkeletonBlock` (api.js:2255): *"GM-EYES ONLY: this skeleton is your
private planning document. NO character in the world knows it."* — followed by the staging rule (bring a beat
into play as a rumour, a messenger or a discovery **first**, then let characters react to what they
witnessed) and the plot-armor block that pre-declares who cannot die yet and demands the escape cost the
player something takeable. That is the discipline most published scenarios omit, written down and enforced,
plus an act-gated secrets tier (#333) that withholds an authored NPC's truth until its act opens.

**Where the lens pushes back — recorded as dissent, not a defect.** The same block opens with *"Every scene,
quest, and encounter should serve this story. Do not invent unrelated side-plots that pull away from the
current arc"*, and the authored-campaign clause adds *"The player picked this story to live it; deliver it."*
Laws' position (7.1, 5.1) wants the opposite bias: surplus material, and a GM ready to abandon the plan for
what the players are making. The product's answer is sound — a 2,400-turn solo campaign with no human GM
dissolves without a spine — but it is a **departure** from him, not an application of him, and the three-act
skeleton and ending button are settled.

**Recommendation — no change.** Recorded so a future reader knows the tension is deliberate. If anything ever
does change here, the smallest honest version is one clause telling the GM that an arc the player never
touched is the design working, not a thread to sweep.

---

## What the Laws lens would actually take from this game

1. **The whispers note is a publishable technique** — an information channel that pushes reputation at the
   player unasked, with a fidelity fence ("rumour never invents an event that did not happen") that solves the
   distortion problem cleanly. Most tables improvise this badly; here it is a contract.
2. **`buildRecklessNote` is beat theory as a working instruction** — "never mundanely, never punished for the
   choosing" is a sharper statement of the up-or-down-beat rule than the analytical vocabulary usually
   produces, and the field record says players take it.
3. **The staging rule — plant it in the world before a character can know it — is the GM-knowledge fence he
   describes and almost nobody writes down.** That it is enforced against a model rather than a person is a
   detail; the rule is the same rule.

## Verification gaps

Positions I could not source well enough to carry a verdict; each is graded ○ or omitted in the lens file:

- ***Robin's Laws of Good Game Mastering* (2002) was not read.** The seven player types and the eight-step
  improvisation procedure come through close readings (Critical Hits), and the rpg.net reviews 302-redirect to
  the forum root. No finding above rests on §6 of the lens for that reason — which is a real loss, because the
  player-type material is the part most directly about a single player's preferred kind of fun.
- ***Hamlet's Hit Points* and *Beating the Story* were not read.** The beat taxonomy used in findings 2, 4 and
  7 comes from Laws' own blog and LiveJournal posts about the method plus Emily Short's reading. Claims about
  beat *proportions* (how many ups per down) are therefore not made anywhere above.
- **The GUMSHOE SRD was read via the Open Gaming Network mirror**, not Pelgrane's PDF (which returned binary).
- **Hillfolk's own text was not read**; the dramatic-scene definition behind finding 3 is graded ◐.
- **No Laws position on humour or comedic tone was located**, despite the brief asking for one and despite
  *Og*. Nothing above claims one.
- **No Laws statement about AI or computer game masters exists** in anything found. None is inferred, and none
  should be.
