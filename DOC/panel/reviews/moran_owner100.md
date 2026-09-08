# Panel review (second pass) — the Moran lens on the owner's own hundred turns

**Member:** the Moran lens ([`../moran_lens.md`](../moran_lens.md)) — a rubric of Jenna K. Moran's documented
design positions, **not the person, and not an impersonation**. Every finding cites the entry it applies.

**Corpus:** `testRuns/fixtures/owner_runelords_t2338-2437.json` — the last 100 turns of *Rise of the
Runelords (Ammut)*, the owner's own campaign, read in full (meta, all 100 narrations, `tagLog_last40`,
`storyBeats_from_2300`, `chapters_from_2200`, `noteLog`). Karzoug died at **t2331**; every turn here is the
coda after the climax. Hero: Ammut, Half-Fey Rogue [Arcane Trickster] Lv17, 165,850 XP, 131/131 HP, married
to all three companions. Clock: Day 27 7:37 pm → Day 31 7:40 am (5,043 minutes over 100 turns).

**Reading notes, stated up front.**
- Adult mode is on; turns t2348–t2363 are explicit. **Nothing from those turns is quoted anywhere in this
  document** — they are cited by turn number and described only at the level of "an intimacy scene". This is
  reviewed as craft: pacing, who speaks, what the engine recorded.
- The fixture's `action` column is offset by one against `narration`: the action on row *N* produced the
  narration on row *N+1* (verified at t2418→t2419, the "GM:" question and its answer). Quotes below are
  cited by the turn whose **narration** contains them; player actions by the turn where the **action** sits.
- These 100 turns span engine versions **v1.708 → v1.832** — roughly 125 releases. Several mechanisms this
  review discusses (#308 montage, v1.780; #325 ending offer, v1.800; #328 in-band buttons, v1.804; #347
  wants-are-optional, v1.828) came into existence *inside* the window. Every finding states which turns had
  the mechanism live.

---

## What the hundred turns actually were

Classified by dominant scene kind (one label per turn, 100 turns):

| Kind | Turns | Count | Mean narration |
|---|---|---:|---:|
| **Domestic** — meals, bath, hearth, bed, banter, care, spousal conversation | 2345–2347, 2364–2391, 2412–2413, 2433–2437 | **38** | 1,152 ch |
| **Intimacy (explicit)** | 2348–2363 | **16** | 1,148 ch |
| Investigation / interrogation / stealth | 2392–2397, 2399–2411, 2415–2417, 2423–2432 | 32 | 1,385 ch |
| Travel | 2338–2344, 2398, 2414 | 9 | 1,702 ch |
| Tactical (ambush set-up and spring) | 2419–2422 | 4 | 1,091 ch |
| Out-of-character ("GM:" to the GM) | 2418 | 1 | — |
| **Combat** | — | **0** | — |

**Domestic + intimacy = 54 of 100 turns.** There is no combat encounter in the entire coda: the tracker never
opens, no `COMBAT_*` tag appears anywhere in `tagLog_last40`, and the hero's HP is 131/131 at both ends. The
one physical contest is a grapple on an unarmed spy (t2402–t2403). Fifty-four consecutive turns sit at one
location, "Magnimar" (t2344–t2397). One turn in a hundred is out-of-character.

The player was offered the exit — "Write the ending" — and declined it for a hundred turns.

---

## 1. The coda is the campaign's emotional climax and the engine recorded a gold total

**Position applied:** 1.1 (●, S1 — XP is "first and foremost a dramatic pacing mechanism"), 1.2 (◐, S6/S10 —
each genre carries its own XP-action list), 5.2 (◐ — in the Pastoral genre the quiet scenes *are* the pacing).

**Measured.** Across the 40 turns with a tag record (t2399–t2437): **zero `[XP:]` tags, zero `STORY_BEAT`,
zero `CORE_MEMORY`, zero `ACT_COMPLETE`/`ARC_COMPLETE`, zero `COMBAT_*`, zero `ALIGNMENT`, zero
`RELATIONSHIP_*`.** The permanent marks the coda produced are exactly two: one `[QUEST:]` and one `[GOLD:]`,
both at t2425, both on the smuggler's lockbox. Story beats since t2300 number **two** — t2327 ("the Runelord
of Greed wakes") and t2331 ("Ammut and his companions slew Karzoug") — meaning **zero story beats in the 106
turns after the boss died**. The five surviving chapter summaries (t2417, 2421, 2425, 2431, 2434) all narrate
the smuggler operation; none of the 54 domestic turns is covered by one. `[REST:long]` fires at t2434 with no
owed levels to land, because nothing paid.

Against that: the material. t2365, Daeris on the offer of a week off — "I don't think I've ever had a week
that wasn't in service to something." t2385, Morwen — "I could get used to boring again. Might take
practice." t2368, Frizwick, with the joke deliberately withheld — "This is better." t2434's own chapter
summary closes on the party sleeping "straight through until dawn without checking the locks".

**Insight.** The harness pass argued the engine cannot value quiet and inferred it from code plus twenty
harness turns. The owner's play settles the empirical half: a human, at the end of a 2,437-turn campaign,
spent the majority of his remaining play on domestic scenes, and the engine's record of that stretch is one
quest tag and 850 gold. This is not a model failure — the prose is the best in the corpus — it is the reward
table having one column. Note also where the words went: the longest paragraphs are travel and investigation
(1,702 and 1,385 chars); the material the player actually chose gets the shortest (1,150).

**Recommendation — the fork from harness finding 1, unchanged, now carried by the owner's own evidence.**
Either a second, hard-capped award channel for a *named kind of scene* exists, or the honest answer is "no
change, and the coda's silence is the design working as intended". The lens cannot settle that; the XP curve
is closed (#348). What this pass adds is that the question is no longer hypothetical — it is about the last
hundred turns of the owner's main campaign. **See finding 3 for a constraint any such channel must obey.**

**Settled?** Adjacent to the settled XP curve. Proposes no change to it; the fork stays with the owner.

---

## 2. Once the tale is told, the engine's only authored suggestion is "stop playing" — and ignoring it never quiets it

**Position applied:** 4.7 (●, S1 — arc completion is a permanent upgrade *plus a transition*: "Your
character's story has ended; their next story continues from there"), 5.3 (●, S1 — yielding the spotlight is
sanctioned, and hers pays on the way out), 1.3 (◐, S6 — the menu is a reminder sheet for a player who is not
sure what to do next).

**Measured, from code plus state.** `engineFourthAction()` (game.js:166) evaluates in order: rest-if-badly-hurt
→ **`endingOffered()`** → consumable → accept-offered-quest → buy → `montageDue()` → wildcard. Ammut is at
full HP for all 100 turns, so the rest branch never pre-empts; `questLog` is empty, so no offer intercepts.
`endingOffered()` (helpers.js:1230) returns true whenever `spineComplete` is stamped and
`spineComplete.snoozedUntil` has not been set. **`snoozedUntil` is written in exactly one place** —
`endingDecide("play")` (game.js:3216) — which is reached only from the ending modal's "keep playing" button
(ui-modals.js:855), and that modal opens only when the player *chooses* the ending (game.js:2033). Ignoring
the button snoozes nothing.

The spine finished at t2331. In the window where the mechanism was live — **t2416–t2437, 22 turns, all at
v1.823+** — the fourth button therefore read "Write the ending — the tale of Rise of the Runelords (Ammut) is
told" on every turn the player had not just answered the modal, and the wildcard, the montage and the buy
branch were unreachable underneath it. `SUGGEST` fires on all 21 turns from t2417, so the buttons were
demonstrably live and rendering.

**Insight.** Her position 4.7 is that the ending is a *transition*, offered once at a threshold. The engine
turned it into a standing question. The behaviour the game cannot see is the one the player was actually
performing: continued play *is* the answer, repeated a hundred times, and the loop has no representation for
it. Worse, the branch this suppresses is the one the owner field-validated (the wildcard, "Do something
reckless"), so the phase of play with the least engine-supplied variety is the endgame — exactly backwards.

**Recommendation — S.** Treat continued play as a decline. Count the turns the offer has stood unchosen; past
a threshold, set `snoozedUntil` as if the player had answered "keep playing", and back the re-offer interval
off on each successive decline (`ENDING_REOFFER_TURNS` 15 → 30 → 60). Pure change inside `endingOffered()` /
a new counter; the button itself and its modal are untouched. This restores the other five branches to the
coda and stops the game asking a question it has already been answered.

**Settled?** The ending offer stays (#325, owner ruling 2026-09-03 — "it's the right call"). This changes only
its persistence, not its existence.

---

## 3. Three wants were manufactured in three turns; the owner deleted all three — and the lesson lands on my own harness recommendation

**Position applied:** 4.3 (●, S4 — an Issue resolves, or escalates when closure is missed), 4.4 (●/◐ —
Issues are GM-assigned, never player-chosen), 3.4 (●, S3 — she would rather let an award through than break
the scene; the engine's instinct is the opposite).

**Measured.** `noteLog`: `buildAgendaAskNote` fired on the prompts for **t2415, t2416 and t2417 — three
consecutive turns**. `tagLog`: `COMPANION_AGENDA` landed at **t2416, t2417 and t2418 — three consecutive
turns**, one per companion, each the turn after its ask. The wants, in the narration: Frizwick (t2416) on
"skinning whoever sold out my old crew in the Ashlands"; Daeris (t2417) — "I've spent thirty years watching
houses burn"; Morwen (t2418) wanting to "get my family's stolen arcanist grimoire back". Two of the three
invent content the campaign did not contain (an Ashlands crew, a Lorrath cabal courier). All three arrived
during pure exposition — the party reading a smuggler's directive on a wave-lashed cliff shelf. In `meta` at
t2437 all three companions carry `want: null`; TODO #347 records the owner's t2419 save cleaned into
`…_t2419_wants-cleared.tnd`, and the fix shipped at v1.828 — which appears in this very fixture at t2420.

**Insight.** This is already ruled, and the ruling is right; what the lens takes from seeing it in the raw is
the *shape* of the failure. The ask was rate-limited, capped, once-per-companion, and validated — and it
still invented, because it was a channel that had to fire. Her own emotion-XP essay gropes at this and never
lands it (S3 ●, "I'm not sure what the answer is"); this engine ruled it. **The lens must therefore correct
itself:** harness finding 1 proposed "a small, rate-limited engine award … at most once per N turns", which
is the same object — a cadence-triggered channel. On this evidence that design is disqualified. Any second
reward column must hang off something the GM already had its own reason to emit (the `SKILL_SUCCESS` shape,
harness finding 8), never off a timer.

**Recommendation — no change (settled), plus a withdrawal.** Wants-are-optional and never-manufactured stand
exactly as ruled. The lens formally withdraws the *cadence* half of its own harness finding 1.

**Settled?** Yes — #347, owner ruling 2026-09-05. Recorded as agreement, with a correction to this lens.

---

## 4. Every defining-moment trigger is violence-, death- or roster-shaped, so a coda cannot produce one

**Position applied:** 3.1 (●/◐ — another player feeling your emotion awards a point, up to once per fifteen
minutes), 3.3 (●, S3 — it "isn't just a 'reward for someone being amazing'"), 4.6 (●, S1 — arc steps have
mandated outcomes).

**Measured.** `detectCoreMoments()` (game.js:1453–1489) fires on exactly five things: an HP crossing below
10% of max; an alignment **label** flip; a party member joining or parting; a party member dying; a new
*weighty* durable bond (`WEIGHTY_REL_RE` on the bond axis, dynamics categorically excluded). Across these 100
turns: HP never left 131/131 (no combat at all); no `ALIGNMENT` tag fired; no companion joined or left (all
three were already married in); nobody died; no new weighty bond was possible because all three bonds already
read "Wife"/"Husband". **All five triggers are structurally incapable of firing in a coda.** Zero defining
moments in the campaign's final hundred turns, against 22 across 2,437.

What went unrecorded: two prisoners fed and released (Petrin Voss, t2406–t2411; Grik, t2426–t2428); the
decision to go home; the first night in the campaign's history nobody set a watch (t2434).

**Insight.** The harness pass put this as "the engine has a witness and an author but no audience". The
owner's play sharpens it to something structural: the witness is *blind by construction* to the entire mode
of play the player chose. And the moment a player-side file would matter most is precisely the moment nothing
else can fire. Her constraint remains the one that makes it safe: it must file a moment, never score a
performance (3.3 ●), so the filed text stays engine-composed.

**Recommendation — S, unchanged from harness finding 3, and promoted in priority.** A one-tap control on a
rendered GM message files `{kind:"player"}` into `coreMemories` with an engine-composed sentence (turn,
location, scene subject), witness-copied like every other moment, rate-limited, toasted per the #347
every-filing-toasts rule. Highest value-per-byte in either pass.

**Settled?** No. Touches the drift surface (core-memory injection) — Fable tier, test-first.

---

## 5. The hero's arc of self resolved inside the player's own typed actions, and the sheet still says otherwise

**Position applied:** 4.5 (●, S1 — every character is always on exactly one Arc, "the story about the person
they're becoming"), 4.6 (●, S1 — arc outcomes are mandated by the arc, not derived from events), 8.4 (●, S2
— wishing is a property of the character's heart), 2.2 (●, S2 — her worked quest examples are domestic:
"Practice the flute. Put out a game. Deal with grief.").

**Measured.** Ammut's sheet at t2437 reads, unchanged since creation: trait "Recklessly brave to the point of
stupidity", flaw "Violently protective of one specific person or thing", motivation **"To prove yourself
worthy of something lost"**. The coda is that motivation resolving, in the player's own words: t2364, "set
aside some time for family time"; t2380, "I'm saying we wrap this up here" and head home; t2381, "Sable is
the last"; t2376, keep Karzoug's jewels and "take them with us back to the cottage". Twice, unprompted, he
feeds a captured enemy and lets him go. The GM answered in kind — Morwen at t2385, "I could get used to
boring again."

The engine wrote none of it down. `[ACT_COMPLETE:]` had already fired at t2331, *before* the person finished
changing, and it named nothing about him; the motivation field is byte-identical a hundred turns later.

**Insight.** Harness finding 6 proposed hanging an arc-of-self note on `[ACT_COMPLETE:]`. The owner's play
shows that seam is in the wrong place: the plot's last act closed 106 turns before the character's did. The
seam that survives to the right moment is the **ending/denouement** — `buildDenouementPrompt()` already writes
the epilogue from the record, and it fires exactly when the person's story is done rather than when the
plot's is.

**Recommendation — S, revised.** Keep the `[ACT_COMPLETE:]` note (cheap, fires ~5× a campaign), and **add
one line to the denouement prompt**: name what the tale changed — or refused to change — in the hero, filed
as a defining moment. Two engine notes, no new tag, no schema change. It gives the ending button something to
land on, which finding 2 says the player is being asked to press every turn.

**Settled?** The skeleton and the ending button stay (#325). This adds a record at their seams, nothing else.

---

## 6. Every relationship dynamic in the party is a combat posture, after a hundred turns in which nobody fought

**Position applied:** 7.1 (◐, S6/S7 — Connections are skills, a bond you can act *through*), 7.2 (◐, S7 —
connections rise faster than other skills because they need presence, not study).

**Measured.** The three spouses' relationship rows at t2437 (`{entity, bond, dynamic}`, identity.js:539):
Frizwick → Ammut, bond "Wife — beloved family", dynamic **"eager, synchronized ambush"**; Daeris → Ammut,
dynamic **"disciplined, covering retreat"**; Morwen → Ammut, dynamic **"vigilant, covering flank"**. The only
other non-empty dynamic in the roster is Frizwick → Shalelu, "battle-forged respect". Every dynamic axis in
the party describes how these people fight. No `RELATIONSHIP_*` tag fired in the 40 logged turns;
`buildRelationshipAudit` was delivered at t2422 (over budget, 2,651 chars) and produced no axis write. The
tag documentation's own examples are the opposite kind: "tense, warming, owed a favor, or suspicious"
(tag_table.js:172).

**Insight.** The two-axis design is right and the bond axis did its job — the marriages are canon. The
dynamic axis is being filled from the only scenes the engine treats as eventful, which means the field
describing *how these four people are with each other right now* has nothing to say about the four days they
spent being married. This is the same one-column problem as finding 1, showing up in the identity layer
instead of the reward layer.

**Recommendation — XS.** `buildRelationshipAudit` already enumerates every bond and asks whether it still
matches the fiction. Have it name the **current dynamic** alongside the bond in what it prints back, and put
one non-combat example in the ask (the tag doc's own "warming" / "owed a favor"). One string change in an
existing note; no new tag, no schema move.

**Settled?** The W7 two-axis design stays. This changes only what the audit note asks about.

---

## 7. The clerical register #355 hunts is written into the sheets the prompt injects every turn

**Position applied:** 3.2 (◐, S6 — the emotion names who the character *is*, "not what they can do"), 8.1 (●,
S1 — the sheet shows "the dynamic evolution of your character"), 8.3 (●, S1 — prior story is sheet data).

**Measured.** Run the #355 census (`REGISTER_WORDS`, helpers.js:125) over these 100 narrations: **20 turns
trip it** — "ledger" ×15, "ledgers" ×3, "paperwork" ×2, "accountant", "accountants", "bookkeeper". One turn in
five. (The save is v1.708–v1.832; #355 post-dates it, so this is retrospective validation of the guard, not a
new defect.) But the source is not the model's tic. Two of three companion **motivation** fields — stable-half
prompt content, injected every turn — are written in contract-and-debt prose: Daeris, "Find the original
creditor … to close the account properly … the seventeen unmoored obligations"; Morwen, "primary source
material on Fey Court contract law to break or legally void … bloodline debts". Daeris's flaw field turns on
whether warmth is "being catalogued"; Morwen's trait is that she "catalogues everything she observes".

Separately: the coda's live plot is a paper trail the census cannot see — 12 turns carry requisition,
voucher, manifest, payout, seal, bearer-note, complaint, summons and countersignature (t2395–2397, t2416–2417,
t2424–2425, t2432), and the one open schedule item at t2437 is "Ironbriar identifies the magistrate behind the
smudged caravan-payout seal". DEFAULT_RULES bans exactly this — "Do NOT build quests or plots on paperwork,
ledgers, deeds, registrations, probate, debts, wages, tabs, or bureaucracy" (data.js:110) — and nothing
enforced it.

**Insight.** A note that fires once per slip is arguing with a sheet field that is present in the prompt every
single turn. That is the project's own "prompt channel beats position" lesson: an instruction that loses to
standing content needs a different channel, not a louder note. And the plot-level drift has a mechanism worth
naming: when the only column in the reward table is *an adventure was completed*, a coda with no monsters
left will reach for the only completable thing available, and a voucher chase is completable.

**Recommendation — S, extending #355 rather than loosening it.** ① Run `registerScan` at the **authoring**
seams — the creation wizard, blueprint import, `generateNpcSheet`, the #330 want-birth — so a new sheet can
never mint a clerical trait/flaw/motivation. ② For sheets that already carry one, **report, never rewrite**:
one line in the #17 drift-health readout (personality is not the player's to tailor, and it is not the
engine's to retro-edit either). ③ Consider whether the census word list should grow the plot-level nouns
(voucher, manifest, requisition, ledger-adjacent paperwork) — that half is a judgement call, since a single
seal on a document is not a bureaucratic plot.

**Settled?** #355 stays exactly as ruled; this extends its reach to the authoring path. Drift surface (prompt
content) — Fable tier.

---

## 8. The engine's model of who is in the room is wrong in precisely the scenes the player chose

**Position applied:** 7.2 (◐, S7 — connections rise through *presence*; presence is the input any relational
growth would read).

**Measured, with a caveat.** The fixture's per-turn `present` roster lists **Karzoug on five turns after he
was slain at t2331** — t2338, t2346 (the temple), t2364 (the bathhouse), t2380 (the bedroom at dawn), t2395
(Ironbriar's office). During the 16-turn intimacy block, five turns list someone who is not in the room:
"Iron Perdrath" (t2351, t2363), "Shaft-climber" (t2356, t2359), "Face-Stealer" (t2357). Seventy of the 100
turns list at least one non-party name. `buildPresenceAudit` ran at t2421 and t2433; `buildSceneCastNote` at
t2418 and t2431.

**Caveat, stated plainly:** the script that built this fixture is not in the repo, so whether `present` is
`buildSceneManifest().npcs` (which reaches the prompt) or a looser recently-mentioned roster **is not
established here**. If it is the manifest, the GM was told a dead Runelord was in the bedroom.

**Insight.** For this lens the stake is narrow and specific: presence is the one input already tracked that a
Moran-shaped connection mechanic would grow from (7.2), and in the coda's quiet scenes it is the least
trustworthy. Anything keyed to "who is here" — relationship growth, the scene-cast note, the fourth button's
wares check — is reading a room that contains people who are not in it.

**Recommendation — no change from this lens; refer out.** Establish the provenance of the field first, then
hand it to the identity surface (`DOC/contracts/identity.md`, W7 presence). If it is the manifest, it is a
referential-integrity defect and outranks anything else in this document.

**Settled?** N/A — referred, not ruled.

---

## What changed from the harness pass

The first pass measured random button-clicking. This one measured a person. Five things moved.

1. **The premise is confirmed, and it was the weak half.** The harness pass could only show the engine paying
   nothing for quiet; the "would a player *want* the quiet" half rested on Moran's table, not ours. The owner
   spent 54 of 100 post-climax turns on domestic and intimate scenes with the exit permanently on screen.
   The pastoral mode is not imported taste — it is what the owner's endgame actually is (finding 1).

2. **The montage was never the villain.** Harness finding 2 called `montageDue()` the design admitting quiet
   has no value, and recommended a "stay in it" sibling branch. On the real corpus the montage never got the
   chance: #308 shipped at v1.780 and the pastoral block ran at v1.710–v1.755, and where both mechanisms were
   live (t2416+) `endingOffered()` sits above `montageDue()` and pre-empted it on every turn. **The harness
   pass aimed at the wrong branch.** The fourth button's problem in a coda is not that it compresses the
   quiet; it is that it offers the door (finding 2). Harness finding 2's "stay in it" sibling is withdrawn as
   premature — fix the pre-emption first and see whether the montage ever misbehaves in the field.

3. **The lens's own headline recommendation is disqualified in its stated form.** Harness finding 1 proposed a
   rate-limited engine award firing "at most once per N turns". The owner's play contains a controlled
   experiment in exactly that shape: `buildAgendaAskNote` fired three turns running, produced three wants,
   two of them invented, and the owner deleted all three (finding 3). A channel that must fire will invent.
   Any second column has to hang off a tag the GM already had cause to emit.

4. **Defining moments went from "the player has no vote" to "the mechanism is structurally blind".** The
   harness pass counted 22 moments in 2,437 turns and read the triggers from code. Here all five triggers are
   demonstrably unreachable for a hundred consecutive turns, because every one of them is violence-, death-
   or roster-shaped (finding 4). That is a stronger claim and it makes the one-tap player file more urgent,
   not less.

5. **Two harness verification gaps closed, and one opened.** Closed: the live save's defining moments and the
   "resolution pays nothing" claim are both now grounded — no moment could fire, and no `COMPANION_AGENDA_DONE`
   ever appeared. Opened: harness finding 7 praised levels-landing-at-camp as the design's one pastoral
   instrument; this corpus contains a long rest (`[REST:long]`, t2434) with **no owed levels to land**,
   because nothing in the coda paid. The instrument is real and it was empty for a hundred turns. That does
   not weaken the mechanism — it confirms it is downstream of finding 1.

**Unchanged and re-affirmed:** wants-are-optional and never-manufactured (#347) is a stronger rule than
anything in her published writing on the same problem (S3 ●). Skills advancing through tested use remains the
most Moran-shaped mechanic in the codebase. Levels landing at camp remains convergent design worth
protecting.

---

## Verification gaps

- **The Chuubo's rulebook is still unread** (lens §11). Every ◐ position — including the genre XP-action
  structure that finding 1 rests on — comes from a fan digest or a reviewer.
- **The fixture's `present` field has unestablished provenance** (finding 8). The building script is not in
  the repo. The Karzoug observation is only as strong as that field's meaning.
- **No tag record exists before t2399.** `tagLog_last40` covers the last 40 turns only. Findings about the
  domestic block t2344–t2397 rest on narration, `noteLog`, story beats and end-state — not on that block's own
  tags. An `[XP:]` award inside t2338–t2398 cannot be ruled out from this fixture, though the two story beats
  since t2300 and the unchanged sheet make one unlikely.
- **Whether the ending offer was ever *pressed and declined* is unmeasured.** Finding 2's mechanism is read
  from code and state; the fixture logs no suggestion text, so whether the owner opened the modal (setting a
  15-turn snooze) or simply ignored the button is unknown. The recommendation holds either way — under the
  first reading the game asked him seven times, under the second it asked every turn.
- **Chapter absence is not record absence.** Live chapters cap at 10 and evict to `memory.archive.chapters`
  (memory.js:1549), so "no surviving chapter covers the domestic block" is a statement about the live tier
  only.
- **The intimacy block was read for structure, not quoted.** Craft observations about t2348–t2363 (pacing,
  who speaks, the three-companion staging) are stated at description level by design.
- **No Moran statement on AI narration or solo play exists.** Every translation from her table to this one is
  this lens's construction (lens caution 1).
