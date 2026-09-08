# Panel review, second pass — the Laws lens on the owner's own hundred turns

*This is a rubric of Robin D. Laws' documented positions, not the man.* Every finding cites the lens entry it
applies from [`../laws_lens.md`](../laws_lens.md) with that entry's confidence grade. Quotes from his published
work and from the corpus are capped at fifteen words. **Adult-mode scenes are reviewed as craft like any other
scene and are never quoted — turns 2347–2362, 2373 and 2434–2437 are cited by number only.**

**Corpus.** `testRuns/fixtures/owner_runelords_t2338-2437.json` — turns 2338–2437 of *Rise of the Runelords
(Ammut)*, the owner's own play, read in full (meta, 100 log entries, `tagLog_last40` for 2399–2437,
`storyBeats_from_2300`, `chapters_from_2200`, `noteLog`). Models: sonnet-5 ×53, gemini-3.7-flash ×46,
gemini-3.6-flash ×1. Engine versions v1.708 → v1.832. **Every turn here is a coda:** Karzoug died at t2331, so
the spine has been complete for 106 turns and the engine has been offering "Write the ending" throughout.

**Reading convention.** In this fixture `log[i].action` is the action that produced `log[i+1].narration`
(verified at t2338→t2339, t2364→t2365, t2418→t2419; t2437 carries no successor action). Turn references below
follow that pairing.

**Code read for mechanism** (no file modified): `game.js:166-188` (`engineFourthAction`, `montageDue`),
`game.js:1375` (`sendSuggestedAction`), `game.js:3205-3218` (`endingDecide`), `helpers.js:986-1008`
(`toFirstPerson`, `punctuateAction`), `helpers.js:1227-1235` (`endingOffered`), `globals.js:133,146,148`.

---

## 1. The ending offer occupies the beat slot, and it is the only offer the ladder cannot outrank

**Position applied:** 4.3 ● — "Preserve momentum. Keep the characters cool and competent. It's a gimme."
(XX-gimme); 2.6 ◐ — prep is "a bunch of things that might leap in as a upward or downward beat" (SLY);
2.4 ● — flourish beats register "most satisfyingly when used sparingly" (BEAT).

**What the game does (measured).** `engineFourthAction` (game.js:168-177) is an ordered ladder: rest → **ending**
→ use → accept → buy → montage → wildcard. `endingOffered()` (helpers.js:1230) returns true from the moment the
last act closes and stays true until the player presses the button and picks "play on", which snoozes it for
`ENDING_REOFFER_TURNS = 15`. Across these 100 turns the record shows no ending taken, no ending text in any
action, and 106 turns of play past `spineComplete`.

The cost is arithmetic. `WILDCARD_EVERY = 7` and `worldState.turn % 7 === 0` lands on exactly **15 turns** in
this range (2338, 2345, … 2436 — 2338 is 7 × 334). `montageDue()` recomputed over the retained tag log is
**true on 20 of the 40 turns 2399–2437** — the unbroken runs 2404–2413 and 2424–2433. Every one of those 35
offers sits *below* `ending` in the ladder. The log cannot show whether the owner ever opened the modal and
snoozed; to have kept the button clear he would have had to do so about seven times in a hundred turns, and a
plain tap appends the button's text to the input box, where none of the 99 actions carries it.

Independent of the snooze question, one thing is unconditional: **the offer re-arms forever.** Fifteen turns
after any dismissal it is back at rank two, and it will be back at rank two on turn 3000.

**The insight the lens produces.** This is the harness pass's finding 1 — the rations button the fiction refused
ten times running — at campaign scale, and worse, because the ending is not a beat at all. It is a *mode
switch* holding the slot the engine reserved for its two beat instruments. Laws' rationing rule (2.4) cuts both
ways: the montage and the wildcard are the flourishes, and here they were rationed to zero by a standing offer
the player had already answered in prose (see finding 7). The engine's most Laws-shaped instrument — the one the
first pass called the best pacing tool in the codebase — was unreachable for the whole coda.

**Recommendation — S.** Move the ending off the fourth button and onto a persistent surface of its own (a
header row, a menu item, the wrap-up path), so the beat slot returns to the ladder; or, minimally, auto-snooze
the offer whenever a turn commits without taking it, so it re-appears on a cadence instead of standing
permanently. Also let `endingChoiceFromText` — already pure — read a committed action, so a player who declares
the ending in prose is heard. **Settled ruling respected:** #325 says the ending is *offered, never forced*;
every option above keeps the offer and changes only which surface carries it. **Drift surface (suggestion
assembly) → Fable tier.**

---

## 2. The stall detector counts movement and combat, so it read the owner's best scenes as dead air

**Position applied:** 2.1 ● — "dramatic beats of personal interaction and procedural beats in which characters
overcome external obstacles" (BEAT); 2.7 ◐ — interaction has no beat instrument here; 3.1 ● (BAKER).

**What the game does (measured).** `montageDue()` (game.js:184-188) declares a stall when six committed turns
carry none of ten tags: `COMBAT_START`, `ENEMY_HP`, `ENEMY_SLAIN`, `COMBAT_END`, `COMBAT_ROUND`, `LOCATION`,
`SUBLOCATION`, `SUBLOCATION_LEAVE`, `REST`, `TIME_ADVANCE_LARGE`. All ten are procedural. Nothing dramatic
counts.

In the retained window 2399–2437, `SAY` fired on **37 of 40 turns**, `SCENE_CAST` on 10 and `COMPANION_AGENDA`
on 3 — and the detector still says "montage due" on 20 of those 40. The clearest case is **t2404–2413**: ten
turns, seven of them frozen at Day 30, 10:45 am, in which the party takes a road-watcher prisoner, reads his
sketchboard, feeds him, learns Sable's drop point and his name, and then lets him walk. The engine's reading of
that is *"Skip ahead — a montage to the next real decision."*

**The insight the lens produces.** The engine has an observer for the procedural pillar and none for the
dramatic one, so on the mode the owner actually plays it is not merely silent — it is actively wrong, and its
proposed remedy is to delete the scene. Finding 1 is the only reason that never reached the screen: the ending
offer masked the miscalibrated stall detector for a hundred turns. Two defects cancelling is not two fixes; it
is one latent failure waiting for the other to move.

**Recommendation — S.** Make speech count. `montageDue()` should return false for a window whose turns mostly
carry `SAY` (or any of `SCENE_CAST` / `COMPANION_AGENDA` / `NPC_NOTE`) — a turn with a dozen tagged spoken
lines is a scene, not a plateau. Pure, engine-testable, one predicate. **Drift surface (pacing signal feeding a
prompt-visible button) → Fable tier.**

---

## 3. Seventy-one of ninety-nine actions are the owner's own words, and the game he types is dramatic

**Position applied:** 3.1 ● — "In roleplaying we've always done the first really well… The second, not so
much." (BAKER); 2.1 ●; 6.3 ● — "character sheets as orders for the type of fun they'd like to have" (STEW).

**What the game does (measured).** A tapped suggestion is deterministic: `toFirstPerson` (helpers.js:986)
capitalises the first letter and rewrites second person, `punctuateAction` guarantees terminal punctuation, and
`sendSuggestedAction` appends with exactly one space. So an action carrying a quoted line, a parenthetical, a
"GM:", a question mark, a digit, a subject "I", a "we", a surviving "you", a double space, a lower-case opening
or more than 130 characters **cannot** be an unedited suggestion. **70 of 99 actions carry at least one such
marker.** At most 29 could be button text, and several of those are seam-joined combos of two or three buttons
(t2340 is three; t2342, t2371, t2373, t2395, t2404 and t2433 are two each).

Classified by target and purpose — dramatic (the target is a person and the purpose is emotional), procedural
(an external obstacle), informational (obtaining a fact) — the 99 actions run **58 dramatic / 28 procedural /
12 informational / 1 out-of-character**. That is close to the mirror image of the harness pass's menu, which
was 93 procedural / 45 informational / 12 with any interpersonal charge at all.

The button-candidate rate falls exactly along that axis: **58% of informational turns** (7/12), **32% of
procedural** (9/28), **22% of dramatic** (13/58). By stretch: 41% in the travel-and-investigation half
(t2338–2344, t2395–2436) against 18% across the fifty domestic turns t2345–2394.

**The insight the lens produces.** Harness finding 3 survives with its diagnosis intact and its consequence
reversed. The menu is still a procedural menu — but the dramatic scene happens anyway, because the player
writes it himself, and the buttons degrade into a convenience for the half of the game he cares least about.
Laws reads the sheet as an order for the kind of fun wanted (6.3); this sheet has three companions with a
trait, a flaw, a motivation and named relationship axes each, and the player spends 58% of his turns on them.
The engine's fourth-button ladder, its stall detector and its suggestion mode block are all tuned on the other
29%.

The counter-example is worth as much as the count. **t2379, "Ask Morwen what's weighing on her mind."** — a
clean, button-shaped, purely dramatic offer — produced t2380, Morwen's unprompted "I don't think it's finished
just because Karzoug's dead," which is the hinge of the entire coda (finding 7). One dramatic suggestion
redirected the campaign.

**Recommendation — S.** The harness pass asked for one clause in `SUGGESTION_MODE_BLOCK` naming the dramatic
kind (press a companion on something they want, admit something, refuse an ally, ask for or grant forgiveness).
Real play upgrades that from a nicety to the finding: the mode the owner plays most has zero representation in
a menu the engine writes every turn. Same size, higher priority. **Drift surface (prompt assembly) → Fable
tier.** Touches no settled ruling — this is an option, never a quota, and it manufactures nothing (companion
*wants* stay owner-ruled).

---

## 4. The GM planted its own down beat in the first turn and disarmed it by the sixth; nothing retained it

**Position applied:** 1.9 ● — the pipe beat "surreptitiously plants information which at the time seems
tangential" (INFO); 2.6 ◐; 2.2 ● — "a modulated but gradually downward line" (BEAT).

**What the game does (measured).** t2338 plants a textbook pipe *with a fuse*: the crack over the bone ring
widening, Morwen's "That's something standing up," and her clock — "I wouldn't bet my life it isn't collapsing
in the next five days," spoken on Day 27, i.e. due about Day 32. It echoes at t2339 and t2341. At **t2343 the
narration retires it in one clause** — "its tremor fading from a felt thing to a rumor to nothing at all." In
the remaining 94 turns it appears twice, both times as dismissal: a joke at t2364 ("mountain's probably still
having a seizure") and an explicit all-clear at t2378 ("No bone spirals. No tolling bells.").

Meanwhile the engine's promise machinery works — for promises a *character speaks*. The single open schedule
row at the end of the run is `sch1_44790`, "Ironbriar identifies the magistrate behind the smudged
caravan-payout seal", born at clockMin 41910, which is precisely the Ironbriar scene at t2394–2397 where he
says "Give me a day, maybe two." Filed, dated, still pending. The mountain got nothing.

The rest of the instrument panel says the same thing. Across 100 turns the word "fail" occurs **once** (t2338,
of masonry, not of a check). The retained tag window shows **10 `DICE` and 10 `SKILL_SUCCESS` — no failures**.
There is **no `COMBAT_*` tag in 39 turns**; the one armed confrontation (Sable, t2421–2424) was resolved by a
disarm and a Zone of Truth without the tracker ever opening.

**The insight the lens produces.** A pipe is by definition *unvoiced* — scenery with a fuse — and the engine's
retention channels (`FUTURE_EVENT`, the schedule) only catch things a character promises out loud. So the one
beat type Laws names as the carrier of the tease is the only one the engine structurally cannot hold, and the
model, given nothing to hold it with, wrote its own plant out of the story five turns later.

**The finding is not "the coda needed a monster."** Falling action is allowed to be up, and the death walk is
settled. The finding is that the GM itself judged the story needed a shadow, authored a good one with a
deadline inside the campaign's own remaining clock, and the engine had nowhere to put it.

**Recommendation — M.** A narrator-plant sibling to `FUTURE_EVENT`: the GM files a *plant* — a fact placed with
no promise attached, a soft due window, and no obligation to pay off — and the engine re-injects it once,
later, unasked. It composes directly with harness finding 6 (the missing unasked-information channel) and reuses
the whispers-note budget and latch discipline. **Drift surface (memory tier + prompt channel) → Fable tier.**

---

## 5. Four turns of one NPC talking, with the three best-written characters in the game standing silent

**Position applied:** 7.5 ● — witnesses answer specific questions rather than delivering exposition in bulk
(XX-two); 1.8 ● — exposition "slipped into a scene that does something else" (SCENE); 1.3 ● — investigation is
about interpreting what you found.

**What the game does (measured).** The Ironbriar scene, **t2394–2397**. Tagged spoken lines: Ironbriar 7, 31,
28, 32 — **98 lines from one NPC**. Companion lines across those four turns: **zero**. Clock: +30 minutes, then
0, 0, 0 — four turns standing at Day 30, 8:30 am. Three of the four player actions begin "Ask Ironbriar…". Of
the 15 turns in the whole run where no companion speaks, four are this scene.

One turn earlier the game does the same job better. **t2393** answers "what do we ourselves actually know?" with
Frizwick 7 lines, Morwen 20, Daeris 10 — three distinct voices assembling the same evidence and ending on a
real branch: "whether we chase the paper trail first, or go straight to Thistletop." Across the run companions
carry 608 of 1,057 tagged lines; in this one scene they carry none.

Ironbriar also takes the interpretation ("Every thread that's touched this name so far has led back to money
moving…") and then the decision itself ("You want my advice? Don't wait on me.").

**The insight the lens produces.** The witness pattern is right — he answers exactly what he is asked — but
Laws' point in 1.3 is that the *party* does the interpreting, and here the NPC did the finding, the
interpreting and the choosing while three characters with forty years of paranoia and a catalogue habit between
them said nothing. The game demonstrably owns the better technique one turn earlier and does not reach for it
when the source is an NPC.

**Recommendation — S.** An engine note on the `buildAgendaAskNote` / whispers pattern: when the same non-party
NPC carries the majority of tagged speech for N turns running, ask the GM to route the next beat through a
present companion's reading of it. The `speakers` tally is already computed per turn — the observer exists and
nothing consumes it. **Drift surface (prompt channel) → Fable tier.**

---

## 6. Calibration — the out-of-character rules question was answered in character, and correctly

**Position applied:** 5.4 ● — "The History of No" (XX-no): find the way to say yes, with specifics; 1.8 ●;
1.5 ● — a clue can arrive simply on entering the scene (XX-clue).

**What the game does (measured).** The single "GM:" action in the hundred turns is **t2418: "Who can cast an
'ambush ward'?"** — a rules question typed into the story input rather than Table Talk. The reply (t2419) never
breaks frame and never refuses: Morwen offers a chalk perimeter ward plus Arcane Lock, Daeris offers a Binding
Ward and Consecrated Ground over the grate, either can drop Silence, and Frizwick greases the hinges. Nine
spoken lines, three named tradeoffs, no rules voice. One of them is the whole column in a sentence: "A Binding
Ward will hold them without burning down Ameiko's winter potatoes." The player then issued the plan verbatim,
and the engine recorded the execution — `COMPANION_SPELL_USED` at t2420, t2422 and t2431.

**The insight the lens produces.** The answer to "can I" was a menu of yeses with costs — the "yes, but" shape,
not the "yes, and" one — and it was also exposition smuggled into a scene doing something else: the capability
audit *is* the heist-planning scene. The player reached for the story channel instead of Table Talk (settled,
unchanged) and lost nothing by it, which is the strongest possible argument that the Table Talk split is a
convenience rather than a requirement.

**Recommendation — no change.** Recorded as the standard the model already meets unprompted, so a future change
to the affordance gate or a rules-answer path has a benchmark to beat.

---

## 7. The ending was negotiated in prose across three turns, and the engine was not a party to it

**Position applied:** 5.1 ● — "always be ready to jettison what you thought would happen in favor of what the
players are making happen" (BAKER); 2.2 ●; 8.1 ● — the throughline is what the characters are and do (DESIGN).

**What the game does (measured).** **t2380**: Morwen opens, unprompted, with the campaign's real closing
question — "I don't think it's finished just because Karzoug's dead." The player answers in his own words:
"I'm saying we wrap this up here… Head back to Sandpoint, say our goodbyes and head home." **t2381**: the GM
accepts and reframes it — "Sandpoint, then. Home." The player adds the one condition: "After Sable. but Sable
is the last." **t2382**: the GM holds him to it — "I'm holding you to that." Everything from t2382 to t2437 —
**56 turns** — executes that plan: Ironbriar, the road capture, the coast, the cellar ambush, Sable in the
sheriff's custody, the celebration, and a last morning in bed with the three of them.

The engine's record of all this is one schedule row about a magistrate's seal. Nothing anywhere holds "Sable is
the last." The pacing shape confirms the player was running his own act structure: Day 30 alone absorbs **56 of
the 100 turns** (Day 27: 9, Day 28: 18, Day 29: 13, Day 31: 4), and 19 turns advance the clock by zero minutes.

**The insight the lens produces.** The player did the thing Laws asks a *GM* to do — named the shape of the
ending and committed to it — and the engine's single model of an ending is a button that writes the denouement
now. There is no representation of "the player has declared the last act", which is exactly the state that
should have re-ranked the fourth button (finding 1), silenced the stall detector (finding 2) and told the
suggestion writer what the remaining beats were for.

**Recommendation — S/M.** When the ending offer is declined, let the "play on" path capture a one-line
**closing condition** in free text, stored beside `spineComplete` and injected as a one-line engine note for as
long as it stands. It is the smallest possible fourth act, it uses machinery that already exists, and it makes
the ending a scene the two authors negotiate rather than a modal. **Settled ruling respected:** the ending
stays offered, never forced, and the skeleton is untouched. **Drift surface (prompt channel + state) → Fable
tier.**

---

## What changed from the harness pass

The harness pass measured a script clicking buttons. Real play changes what the same instruments mean.

**Survives, strengthened.**
- **Harness 1 (the fourth button repeats an offer the fiction refuses).** The rations button refused ten times
  becomes the ending offered for a hundred turns, with fifteen wildcard slots and twenty montage-due turns
  behind it (finding 1). The defect class is confirmed: *a button derived from state is never checked against
  the world's answer to it* — and it now has a second, larger instance.
- **Harness 3 (the suggestions are a procedural menu).** Confirmed by the button-usage gradient: 58% of the
  owner's informational turns could be button text, 22% of his dramatic ones (finding 3). The prescription is
  unchanged and the priority is higher.
- **Harness 6 (every fact arrives because the player asked).** Confirmed and sharpened: eleven of the twelve
  informational actions are literally "Ask…", and the biggest information node in the run is four consecutive
  turns of an NPC answering questions (finding 5). The plant channel is still missing, and finding 4 shows the
  *model* trying to build one without help.
- **Harness 5 (a failed roll never withholds a needed fact).** Untested here rather than confirmed: ten rolls,
  ten successes, no narrated failure in a hundred turns. The property is still undefended by any prompt text,
  and this corpus supplies no counterexample because it supplies no failures.

**Reverses.**
- **Harness 3's consequence** — that the dramatic scene therefore does not happen — is false on real play. It
  happens constantly; the player types it. The engine does not offer it, does not measure it, and does not know
  it is the main event.
- **Harness 2 (twenty-two flat turns as a pacing defect).** On owner play a fifty-turn low-external-stakes
  stretch is not a plateau to be rescued; it is what the player came for. The beat-shape observer that finding
  recommended must therefore *not* be built on the tag classes the harness pass implied — those are exactly the
  procedural tags finding 2 shows misreading this play. The recommendation survives; its signal must change.

**Made moot by the coda.**
- **Harness 4 (the rest button offered at 0 HP in a cell).** Unexercised: no combat, no damage, no down state in
  a hundred turns. Rank one of the ladder never fired, and rank two ate everything below it.
- **Harness 7 (the wildcard fires on a metronome).** Moot in the strongest possible way — in this range the
  metronome struck fifteen times and the wildcard was never offered at all.
- **Harness 8 (the skeleton's GM-eyes-only fence).** Nothing to test: the skeleton is spent. What replaces it is
  finding 7 — with no spine left, the player supplied one in prose and the engine had no way to hold it.

**One measured aside for another lens.** The `speakers` tally records "Morwen" (139 lines) and "Morwen Zethran"
(112) as two speakers across the same hundred turns. That is an attribution split on one character, not a
pacing matter — flagged for the identity lens.

---

## Verification gaps

- **The suggestion buttons themselves are not in the fixture.** Finding 3's split is derived from what
  `toFirstPerson`/`punctuateAction`/`sendSuggestedAction` provably *cannot* produce, so "70 typed" is a firm
  lower bound and "29 button-derived" a firm upper bound; the true button rate is at or below 29%.
- **Whether the owner ever opened the ending modal is unobservable.** Pressing it produces no GM turn. Finding 1
  states the mechanism and the unconditional half (the offer re-arms at rank two forever); the count of
  suppressed wildcards and montages is exact only if the offer was never dismissed.
- **Tags exist only for 2399–2437.** All tag-derived counts (montage-due windows, dice outcomes, combat
  absence) are stated over those 39 turns and are not extrapolated to the earlier 61.
- **The book gaps from the first pass stand unchanged:** *Robin's Laws* (2002), *Hamlet's Hit Points* and
  *Beating the Story* were not read; the GUMSHOE SRD was read via the Open Gaming Network mirror; Hillfolk's own
  text was not read, so the dramatic-scene definition behind finding 3 remains ◐. No Laws position on humour,
  and none on AI game masters, exists in anything found — none is inferred.
