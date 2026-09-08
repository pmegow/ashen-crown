# Harper lens — second pass, against the owner's own play (turns 2338–2437)

**First line, per the method:** this is a rubric of John Harper's *documented* design positions
([`harper_lens.md`](../harper_lens.md)), not the man. Every position cited carries its source and confidence
grade; the lens's largest hole — the Blades GM chapter is not in the evidence base — is declared in the
lens's §0 caution 1 and repeated in the gaps below.

**Corpus.** `testRuns/fixtures/owner_runelords_t2338-2437.json` — the last 100 turns of *Rise of the
Runelords (Ammut)*, the owner's own main campaign, read in full. Karzoug was slain at turn 2331, so every
turn here is the coda: the skeleton's final act is exhausted, `meta.openQuests` is empty, and "Write the
ending" sits on the fourth button throughout. Models: claude-sonnet-5 ×53, gemini-3.7-flash ×46,
gemini-3.6-flash ×1. Clock: Day 27 7:37 pm → Day 31 7:40 am (5,043 minutes). Tags are available for turns
2399–2437 only (`tagLog_last40`); engine notes for 2415–2434 (`noteLog`). Adult mode is on and several
scenes are explicit — reviewed as craft, cited by turn number only, never quoted.

**Reading convention (verified before measuring).** In this fixture the `action` logged at turn N is the
player's input that produced the **narration at turn N+1** — confirmed at t2401→t2402 (the action's line
appears as dialogue in the next turn's prose) and at t2418→t2419. Every citation below names the field it
means: "action t2418" or "narration t2419".

**No game file was modified.**

---

## 1. Ten rolls, ten successes, nothing at risk anywhere in the window — the dice stopped being dice

**Position applied:** 1.1 (● "If there's no danger or trouble at hand, you don't make an action roll"),
1.4 (● risky is the default), 2.2 (● LF: "The situation always changes after a roll, for good or ill"),
2.3 (● a bad result may still carry partial effect).

**Measured.** In the 39 tagged turns (2399–2437) there are **10 `[DICE:]` turns, and all ten also carry
`[SKILL_SUCCESS:]`**: t2399, 2400, 2401, 2402, 2403, 2405, 2412, 2415, 2416, 2417. Not one turn in the
window carries `[HP:]`, `[CONDITION:]`, `[ENEMY_HP:]` or any `COMBAT_*` tag. The only `[GOLD:]` in 39 turns
is the +850 loot at t2425. All four `[ITEM_LOST:]` are things the hero *gave away* — rations to the captive
(t2407), rations to the goblin (t2428). Across all 100 narrations a damage-word scan returns three hits and
none is the party taking a wound. The prose pattern is uniform: the check is named *inside* the sentence
that describes it succeeding — narration t2402, "Grappling earns its keep for once instead of just sitting
on the sheet"; narration t2405, "Investigation does the rest, eyes catching every mark that matters."

**Insight.** The harness pass found the die stamped after the outcome was written. Owner play sharpens that
into something worse for the instrument: the roll is not merely narrated late, it is **uncontested by
construction**. A Lv17 Arcane Trickster rolling Stealth, Grapple, Perception and Investigation against a
lone roadside spy has no doubt in it, and the engine has no rule that stops a roll whose result the fiction
has already settled (§1.1). Ten consecutive successes teach the player that `[DICE:]` is a decoration on
competence, not a moment of risk — which is exactly the currency this game will need if it ever wants one
roll to matter.

**Recommendation (S).** One clause in MECHANICS, the mirror of the harness pass's finding 1: *if nothing is
genuinely at risk, do not roll — narrate the competence and emit no `[DICE:]`; if you do roll, say what
failure would cost before the roll.* Cheaper than the harness recommendation and it removes noise rather
than adding text. **Taste risk to flag to the owner:** he may enjoy seeing the numbers on routine actions;
if so, keep the roll and keep only the stake clause. **Drift surface** (prompt text read every turn) →
Fable tier.

**Settled-ruling flag:** model-narrated dice are settled. Nothing here asks to change who rolls.

---

## 2. Two turns advanced the clock nineteen hours each on continuous fiction — 46% of the corpus's elapsed time

**Position applied:** 3.5 (● "A clock is like a speedometer in a car" — it reflects the fiction), 3.4
(● racing/mission clocks put a real window on the fiction).

**Measured.** The corpus advances 5,043 minutes. **2,298 of them (45.6%) come from two turns.**

- **t2366, +1,140m, fully determined.** The clock stood at 40,320 — offset 0 within the engine-day, i.e.
  exactly dawn. `TIME_PHASES` maps "late night" to `tgt:1140`, so a `[TIME:late night]` from that offset
  rolls forward 19 hours *without crossing dawn* — the largest legal same-day reconcile there is. The
  narration at t2366 is the direct continuation of the splash begun in narration t2365, same pool, same
  conversation: zero fiction elapsed. `clock.js`'s #142 guard presumes a mislabel only when `ph.tgt < off`
  (the cross-dawn case); this roll is structurally outside it.
- **t2347, +1,158m.** Not a round human estimate, and it lands exactly on the midnight target minute
  (1,080). The narration is one continuous walk from the temple to the bathhouse. The likeliest mechanism is
  a GM `[TIME_ADVANCE:18h]` topped up 78 minutes by the reconciler; I cannot separate the two writers
  without the raw response, so I report the arithmetic and not the culprit.

Both are gemini-3.7-flash, at v1.710 and v1.745 — well after #142 shipped (v1.563). Strip the two and the
remaining 98 turns average 28 minutes and median **10**.

**Insight.** The headline "four in-game days across 100 turns" is roughly 2.4 days of narrated time plus two
phantom nights. Harper's whole defence of a clock is that it is a readout: it reflects the fiction, it does
not invent it (§3.5). A speedometer that adds 19 hours while the party is still in the bath is worse than no
clock, because everything downstream — deadlines, schedules, the "days run dawn to dawn" display, the
chapter summaries — is computed off it in good faith. Note the collateral: those 2,298 free minutes were
also 2,298 minutes of silent progress on the one live deadline (finding 3).

**Recommendation (M).** Extend #142's mislabel presumption to the same-day direction: **any**
`clockReconcilePhase` roll larger than `RECONCILE_SKIP_MIN` should skip-and-demand, not roll, whether or not
it crosses dawn — a 19-hour top-up is a mislabel in both directions, and the legitimate doors into tomorrow
(`[REST:long]`, an explicit `[TIME_ADVANCE:]`) already bypass the reconciler. Separately, consider a
plausibility ceiling on a bare `[TIME_ADVANCE:]` that is not accompanied by `[REST:]`, `[LOCATION:]` or a
montage note; `CLOCK_MAX_RESPONSE_ADVANCE` is 30 days and catches nothing here. **Drift surface (clock)** →
Fable tier; sabotage clause required, and the existing pinned #142 cases must stay green.

---

## 3. Three deadlines were spoken in the prose. One got a clock — and it is the only one nobody used.

**Position applied:** 3.1 (● draw a clock for trouble on its way), 3.3 (● when it fills, the danger
arrives), 3.4 (● mission clocks put a window on the fiction), 3.5 (● the clock reflects the fiction).

**Measured.** Three deadline-shaped statements appear in the last 45 turns:

| Where | The promise | Registered? |
|---|---|---|
| narration t2397 | Ironbriar: "Give me a day, maybe two, and I'll have a name instead of a smudge." | **Yes** — `sch1_44790`, born 41910, due 44920 |
| narration t2416 | the vellum directive: deliver all reports "before the new moon" | No `[SCHEDULE:]` in t2416's tags |
| narration t2417 | "Sable will arrive on the night of the low tide"; Morwen: "Low tide is tonight" | No `[SCHEDULE:]` in t2417's tags |

The tagged one is the only schedule in the save. From t2398 to t2437 — **40 turns, 1,390 in-game
minutes** — a grep of every narration for *Ironbriar / magistrate / seal / cipher* returns exactly one hit
after t2398, and it is an unrelated "circuit magistrate" in narration t2432. Meanwhile `buildClockBlock`
(clock.js:649) put an `UPCOMING:` line carrying that label and a recomputed gap into **every one of those 40
prompts**. The corpus ends 1,620 minutes before it was due, so the engine did nothing wrong: `scheduleDue`
never fired, `buildScheduleEscalation` (3h-overdue trigger) legitimately never armed. Nobody looked at it.

The two *untagged* deadlines are the ones that ran the back half of the campaign. The low-tide window was
ticked by the **player**, by hand: action t2419 sets the trap, action t2420 is "Wait until their leader
steps fully into the cellar," and the engine charges +240m — the ambush fires in narration t2420–2421,
right on the tide.

**Insight.** The harness pass concluded that zero clocks are ever started. Owner play refutes that (one was
started, by a GM NPC volunteering a two-day turnaround) and replaces it with something more useful: **the
engine caught the deadline that did not matter and missed both that did.** Harper's clock is not a database
row; it is a thing the table can see, so the fiction keeps referring to it (§3.1, §3.4). A countdown that
lives only in the prompt is a clock with no face on it.

**Recommendation (M) — endorse the harness pass's finding 3, now with real positives.** The proposed
deadline observer (extend `buildCommitmentNudge`'s axis to threats and promises with a stated horizon) would
have fired cleanly twice here, on "before the new moon" and "the night of the low tide", and produced
correct schedules. Add a second, cheaper half: when a pending schedule's gap crosses a threshold, let the
prompt's `UPCOMING` line carry an instruction to *reference it in the fiction*, not merely to hold it.
**Drift surface** (engine note + clock lifecycle) → Fable tier; sabotage clause required.

---

## 4. The GM telegraphed twice, textbook — and then never struck

**Position applied:** 7.4 (● LF: "Introduce the threat by showing evidence of its recent badness"; "Before a
threat does something to the characters, show signs that it's about to happen"), 3.3 (● the danger comes to
fruition), 2.2 (● the situation always changes).

**Measured.** Two clean telegraphs, one per model:

1. **Sonnet, narration t2397.** Ironbriar names the danger before it acts: "the digging's gotten somebody
   killed. Voss went quiet right after." That is LF's step one — evidence of recent badness — and the
   memory system pays it off **thirteen turns later**, when the roadside captive finally gives his name in
   narration t2410: Petrin Voss, "the Shore District informant. The one who went silent two months ago."
2. **Gemini, narration t2417.** The recovered directive shows the wind-up with a real window ("Sable will
   arrive on the night of the low tide"), the party spends t2418–2420 preparing, and the arrival lands
   exactly on schedule in narration t2420–2421.

And then nothing happens to anybody. **Zero `[HP:]`, zero `[CONDITION:]`, zero combat tags in the 39 tagged
turns; no combat prose in any of the 100 narrations.** Voss turns out to be a starving prisoner who is fed
(narration t2407) and released (narration t2410–2411). Sable — the antagonist of these 100 turns — gets
one taunt before Daeris's Binding Ward pins her (narration t2421), and her entire agency for the arc is
that taunt. The party's plan works exactly as designed for thirteen consecutive turns (2419–2431) with no
roll, no contest, and no counterplay.

**Insight.** This inverts the harness pass's finding 6, which concluded that nothing tells the GM to
telegraph. Given a real player with real plans, the GM telegraphs *well* — and then declines the third step.
A wind-up with no follow-through teaches the same lesson as no wind-up at all: the menu of three buttons
after each turn is still a menu of reactions to nothing. Some of this is correct: a Lv17 party in a coda
after slaying a Runelord *should* be hard to threaten, and Harper would not manufacture danger to prove a
point. But nothing in the engine knows this is a coda — DEFAULT_RULES' DRIVE clause is still asserting
"DANGER IS REAL" into every one of these prompts while the game quietly ships a hundred consequence-free
turns. The flatness is an accident, not a posture (see finding 5).

**Recommendation (S).** If the DRIVE clause proposed in the harness pass's finding 6 ships, write it as
**three** steps, not two: the evidence, the wind-up, *and* the threat acting on its own initiative if the
players do not move first. A two-step telegraph is what this corpus already does. **Drift surface** → Fable
tier; the natural validation is a playtest counting telegraphed threats that never act.

---

## 5. The coda has no design — the engine's only post-climax instrument is a stop button

**Position applied:** 7.3 (● present opportunities, then follow the chain of action), 7.9 (● the GM points
the conversation at the interesting parts), 6.5 (● the world acts from its own agenda between scores),
7.1 (● every NPC gets a concrete desire and a preferred method), 5.5 (◐ speed of entry is a design goal).

**Measured.** 106 turns after the story beat at t2331, `meta.openQuests` is empty, the skeleton's final act
is exhausted, and the fourth button offers "Write the ending" — the engine's entire vocabulary for what
comes after the climax. Every thread that gave the last 46 turns their shape was found by the **player**:
action t2392, "Before we hit up the justice court and ironbriar, what do we ourselves actually know?";
action t2393, "Let's head over and talk to Ironbriar first"; action t2397, agreeing to go to Thistletop. The
Sable arc exists because the player went looking.

The one thing the engine volunteered is the best thing in the corpus. `buildAgendaAskNote` fires at t2415,
2416 and 2417 (noteLog), and `[COMPANION_AGENDA:]` lands three turns running: Frizwick's grudge about the
crew who sold her out in the Ashlands (narration t2416) and Morwen's stolen family grimoire and the Lorrath
cabal's courier (narration t2418). Both surface *during downtime*, unprompted, as the companion's own
business — a want with a method, arriving between scores.

**Insight.** That is Harper §7.1 and §6.5 exactly, and it arrived from a completely different direction
(#330/#347's character-colour channel). It is also the answer to the problem this finding names. The
engine's model of a campaign is a skeleton with an end; when the skeleton is spent, the only lever left is
to stop playing — but the owner has now played 106 turns past the end and is clearly not finished. The
agendas are already the coda's motor and the engine treats them as flavour.

**Recommendation (S).** When the skeleton's final act is complete **and** no quest is open, let a live
companion agenda be promotable to an *offered* quest rather than staying colour — offered only, under the
existing #191 rules, so the player still accepts or ignores it (§7.3, which this engine already enforces
better than most tables can). Nothing pre-written; the want is already in the save.

**Settled-ruling flag:** the three-act skeleton and the ending button are settled owner rulings. This asks
for nothing authored in advance — only that the engine keep offering after the spine runs out.

---

## 6. The engine's scarcest channel is spent on bookkeeping, and it spends hardest at the climax

**Position applied:** 9.1 (● a complete game fits on one page — every rule the GM must honour is prompt
weight), 7.9 (● the GM points the conversation at the interesting parts).

**Measured.** `noteLog` covers turns 2415–2434. Twelve of those twenty turns carry an engine note,
**18,729 characters** in total. Every single one is housekeeping: presence audit ×2, relationship audit,
mood audit, scene-cast ask ×2, agenda ask ×3, undefined-item nudge ×2, consumable nudge, stay-behind nudge,
location-description nudge, SAY-compliance nudge ×2. **Not one concerns stakes, danger, or the deadline
that was pending in every one of those prompts.**

The worst placement is exact: the largest note in the log — `buildRelationshipAudit`, 2,651 characters,
flagged `overBudget:true` — fires at **t2422**, the turn the party pins the arc's antagonist and drops a
Zone of Truth on her. Across the ambush window 2419–2431, five notes totalling 8,864 characters ride the
climax. Every one of those builders is declared `combat:"silent"` in `NOTE_BUILDERS` — and the ambush was
never `worldState.combat`, so the silence rule never engaged.

**Insight.** The engine has exactly one word for "this scene is under pressure" and that word is `combat`.
A knife-at-the-throat interrogation under a divine truth-zone is, to the note system, indistinguishable from
a bath. That is a §9.1 problem before it is a §7.9 problem: the notes are the one channel that reliably
beats the GM's own momentum (the "prompt channel beats position" lesson), and the corpus shows it being
spent on relationship-axis bookkeeping at the one moment the campaign was tense.

**Recommendation (M).** Widen the `combat:"silent"` gate from the combat flag to a *scene-under-pressure*
predicate — combat **or** a hostile/unwilling NPC in `[SCENE_CAST:]` **or** a schedule inside its escalation
window. One predicate, one place, no new tags; the audits already know how to stand down, they are just
never told to. **Drift surface** (the note budget, which every turn reads) → Fable tier; sabotage clause
required, and the existing per-note combat pins must stay green.

---

## 7. Downtime is 54 of the 100 turns, and it is the product — the harness pass's montage recommendation should be withdrawn

**Position applied:** 6.1 (● "we take out a different toolbox and resolve downtime on its own terms"), 6.2
(● downtime is a reprieve, quieter and cheap), 6.3 (● recovery costs a risk), 5.1 (● cut to the action).

**Measured.** 54 of 100 turns are in Magnimar (t2344–2397), and roughly 31 of those are the bathhouse, an
extended intimate sequence (t2347–2363, cited by number only), wine and supper (t2370–2377), and a
breakfast with one wife while the others sleep (t2378–2391). None of it is skipped or compressed. Nineteen
turns advance the clock **zero minutes**; the longest zero-run is **seven consecutive turns**, t2404–2410 —
a roadside interrogation conducted one question per full-price GM turn, during which the campaign's only
live deadline got no closer at all. The owner's own version of a vice roll is typed into the action box
rather than rolled: action t2432, "Time to Eat too much, Drink too much, and sleep too little."

**Insight.** The harness pass read four bellows-pumping turns as waste and recommended making `montageDue`
cheaper to trigger on a downtime *signature*. Measured against the owner's own play that recommendation is
**actively wrong**: this quiet material is not filler between scores, it is what he is buying, and a lower
montage threshold would have put "skip ahead" on the fourth button through the emotional centre of his
campaign. `montageDue`'s bad-tag list (`COMBAT_*`, `LOCATION`, `SUBLOCATION`, `REST`, `TIME_ADVANCE_LARGE`)
does not include ordinary `[TIME_ADVANCE:]`, so long single-location stretches like t2347–2363 already
satisfy it today; the offer was almost certainly on the button and was declined, repeatedly.

What the corpus *does* support is the other half of §6.1, the half the harness recommendation skipped:
Harper's phase split is about **price**, not length. Seven turns of interrogation and thirty turns of
domestic life cost exactly what thirty turns of dungeon cost, in tokens and in latency. That is a real
economic observation for a product that bills by the turn — but the answer is a cheaper toolbox for the
quiet material, never a shorter scene.

**Recommendation: withdraw the harness pass's finding-8 threshold change; no change to `montageDue`.** If
downtime economics are revisited later, revisit the *price* (a lighter prompt for a turn whose signature is
one location, no dice, no combat), not the length. Any such change is drift surface (the stable/volatile
split) → Fable tier.

**Settled-ruling flag:** free long rests and no convalescence are settled. §6.3's vice risk is noted as
lens dissent and is not relitigated.

---

## 8. The player supplies the channels the design does not have

**Position applied:** 1.2 (● the player states a concrete goal before the roll; the GM's job is to pin it),
9.3 (● LF: a channel to ask the fiction a direct question and get an honest answer), 1.3 (● position and
effect are set before the dice), 2.4 (● the player owns the severity of what lands).

**Measured.** The owner does the GM's §1.2 job himself, in the action box, nearly every turn. Action t2399
states goal, method and contingency before anything is resolved: feign ignorance, break line of sight, cast
invisibility, circle back, and use Message to tell the party the plan. Action t2419 sets his own position
and effect for the whole confrontation — Binding Ward on the grate, Arcane Lock on the stairs, everyone in
position — and that declaration is *why* the arc resolved with no rolls at all. There is exactly one
out-of-character message in 100 turns: action t2418, "GM: Who can cast an 'ambush ward'?", asked on the
Story tab rather than in Table Talk, and narration t2419 answers it beautifully in fiction, with each
companion naming what she can actually cast — the affordance gate speaking through characters.

**Insight.** The design's answer to §1.2 is currently *this player*. Nothing in the prompt asks the player
what he is trying to achieve, and nothing pins the goal before resolution; he volunteers it, and the quality
of these hundred turns rests partly on that habit. The harness corpus — random button clicks — has none of
it, which is the cleanest illustration of why the two corpora disagree so often. Worth recording as a
constraint on future work: any prompt clause written to exploit stated goals must be validated against a
player who does *not* state them, or it will look excellent here and do nothing in the wild.

**Recommendation: no change.** Protect the affordance gate's in-fiction answering style (narration t2419 is
the model case) and note the "GM:" prefix as a player-invented convention that the Story tab handles
gracefully today.

---

## What changed from the harness pass

Measured against the owner's own transcript, the first pass's nine findings sort as follows.

| Harness finding | Status on owner play |
|---|---|
| 1 — die stamped after the outcome, no stake declared | **Confirmed and sharpened.** Not merely undeclared: with 10/10 successes and no cost anywhere, there was no stake at all (finding 1). |
| 2 — DC is the only dial, no effect axis | **Unmeasurable.** No roll in the window was contested, so no partial outcome could have been expressed or missed. Neither confirmed nor refuted. |
| 3 — zero progress clocks are ever started | **Partly refuted, remedy strengthened.** A real `[SCHEDULE:]` was started here, by an NPC volunteering a two-day turnaround. But two *un*registered deadlines drove the back half, which gives the proposed observer two clean live positives (finding 3). |
| 4 — every consequence is a number | **Unmeasurable, weakly consistent.** Nothing bad happened to anyone in 100 turns; `[CONDITION:]` count is 0 in 39 tagged turns, matching the mature-run measurement. |
| 5 — the downed ladder works | **Untested.** Never reached; no character came near 0 HP. |
| 6 — nothing tells the GM to telegraph | **Refuted, and the defect moves.** Owner play telegraphs twice, textbook, one per model, with a 13-turn payoff. The gap is the third step: the wind-up never becomes a blow (finding 4). |
| 7 — the reckless wildcard's price is left blank | **Not observed.** No wildcard was taken in 100 turns; the recommendation stands unmeasured. |
| 8 — downtime at score prices; make the montage cheaper | **Reversed.** The quiet stretch is what the owner is buying; a cheaper montage would compress the campaign's emotional centre. Withdraw the threshold change; keep only the price argument (finding 7). |
| 9 — "offered is not active" is Harper's opportunity principle | **Untested here** (no quest was open), but finding 5 leans on the same machinery: the coda needs the engine to keep *offering*, not to steer. |

The first pass's own stated gap — "all findings about frequency come from harness runs driving random
actions… findings 4 and 8 should be re-measured against the owner's own transcript before any prompt change
ships" — is now closed, and it was right to insist: one of the two recommendations it guarded had to be
withdrawn.

Two findings are new to this pass and could not have come from harness play: the phantom nineteen-hour
nights (finding 2), which need a real multi-day campaign to show up, and the note budget landing on the
climax (finding 6), which needs a climax.

---

## Settled rulings honoured

Model-narrated dice; the three-act skeleton and the ending button; the three-turn downed grace, death walk
and plot armor; free long rests and no convalescence; companion wants are never manufactured (all three
companions here carry `want: null`, correctly, while their `motivation` fields do the same work); the ledger
ban (finding 3 argues for a *readout* the fiction refers to, never a paper-trail plot). Nothing above asks
to reopen any of them.

## Verification gaps

- **Tags exist only for turns 2399–2437** and notes only for 2415–2434. Every count in findings 1, 3 and 6
  is over that window; the 61 untagged turns are read from prose alone. A `dev/tag-census.js` pass over the
  live save would let findings 1 and 4 speak for the whole hundred.
- **Finding 2's t2347 mechanism is inferred, not proved.** +1,158m landing exactly on the midnight target
  minute points at the reconciler as the last writer, but a GM `[TIME_ADVANCE:18h]` plus a 78-minute top-up
  fits the same arithmetic. The raw response would settle it. t2366 is fully determined and is sufficient
  on its own for the recommendation.
- **One unexplained datum.** The schedule's id is `sch1_44790` (born + exactly 2,880 minutes = "a day, maybe
  two") while its live `dueMin` is 44,920 — a 130-minute drift between the id and the deadline. Probably a
  later restatement or a dawn snap; not chased, and not load-bearing for finding 3.
- **The Blades GM chapter was never read** (lens §0 caution 1). Finding 4 rests on *Lasers & Feelings* and
  the SRD Basics chapter; no finding here cites the goals/actions/principles list, and none may.
- ***Deep Cuts*' revised Action, Harm and diceless-Downtime systems are unread** (paywalled). If they revise
  partial success or the downtime economy, findings 1 and 7 may be arguing with a superseded version of his
  own design.
- **One campaign, one player, one coda.** These hundred turns are post-climax by construction; the absence
  of danger (finding 4) and the absence of quests (finding 5) are partly a property of *where* in the
  campaign this window sits. A hundred owner turns from mid-campaign would test whether the telegraph-
  without-a-blow pattern survives outside a coda.
