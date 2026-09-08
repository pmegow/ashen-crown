# Panel review (second pass) — the Abercrombie lens on the owner's own play

**Caveat, first line, per protocol:** this is a review written against a rubric of Joe Abercrombie's
documented craft positions ([`../abercrombie_lens.md`](../abercrombie_lens.md)), not an impersonation and
not his opinion of this product. Entry references are `§n.n`; confidence grades carry over from the lens.
The first pass against harness corpora is [`abercrombie_findings.md`](abercrombie_findings.md); findings
below are numbered `O1…O8` and reference that pass as `H1…H9`.

**Surface reviewed.** Prose voice and the STYLE tail; violence and its cost in a post-climax coda;
companion dialogue and distinctiveness; antagonist interiority; alignment; humour; the story-beat record.

**Evidence base.** `testRuns/fixtures/owner_runelords_t2338-2437.json` — the owner's Rise of the Runelords
campaign (Ammut, Half-Fey Rogue [Arcane Trickster] Lv17, Chaotic Neutral, married to all three
companions), turns 2338–2437, read in full: 100 turns of `action`/`narration`/`model`/`clock`/`present`/
`speakers`, plus `tagLog_last40` (t2399–2437), `storyBeats_from_2300`, `chapters_from_2200` and `noteLog`.
Karzoug was slain at t2331; every turn here is coda. Model split: claude-sonnet-5 ×53, gemini-3.7-flash
×46, gemini-3.6-flash ×1, under one voice dial. Adult mode on; t2348–t2363 is an explicit sequence,
reviewed as craft and cited by turn number only, never quoted. Engine text checked at `api.js:2221`
(STYLE), `data.js:108/110` (DANGER IS REAL / NEVER ADMINISTRATIVE), `helpers.js:125` (`REGISTER_WORDS`),
`tag_table.js:145/175` (ALIGNMENT / STORY_BEAT docs).

**Data note, load-bearing.** The fixture's `action` field is offset by one: `log[i].action` is the action
that produced `log[i+1].narration` (verified at t2338→2339, t2345→2346, t2360→2361; `log[99].action` is
`undefined`). Every action/narration pairing below uses the corrected alignment. Nothing here reports the
GM ignoring a player action, because it never does.

**Prose measurements** (narration only; tags stripped; "narrator-only" additionally drops paragraphs that
open on a quotation mark, isolating the narrating voice from dialogue):

| Model | Turns | Chars/turn | All sentences | Mean | >20 words | Narrator-only mean | Narrator-only >20w | Similes, narrator-only |
|---|---|---|---|---|---|---|---|---|
| claude-sonnet-5 | 53 | 1,339 | 630 | 19.4 | 42% | **22.8** | 59% | 1 per **5.7** sentences |
| gemini-3.7-flash | 46 | 1,197 | 433 | 21.4 | 50% | **22.8** | 57% | 1 per **10.3** |

Em-dashes and en-dashes in 100 turns of narration: **zero**, both models. (The 18 in the file are 17 in
owner-authored `meta` text and one in a chapter summary — the summariser, not the narrator.)

---

## Finding O1 — Narrator sentence shape is model-independent. The harness pass blamed the wrong variable.

**Position applied.** §8.4 ● ("a few telling details" beat burying the reader); §8.3 ●; §7.2 ● (when in
doubt, cut); §1.2 ● (voice is the character).

**Measured fact.** On one campaign, one voice dial, the two models converge exactly: narrator-only mean
**22.8 words** on both (339 sonnet sentences, 267 gemini), >20-word share 59% and 57%. The STYLE tail
(`api.js:2221`) asks for "one main image per sentence" and for long thoughts broken into short ones; both
models miss it, by the same margin, on the same campaign. The harness pass (H5) measured 32.1 for sonnet
against 19.6 for gemini and concluded "the instruction is followed by one model and not another" — that
gap does not survive a controlled campaign, so it was the fixture and the voice, not the model.

Where the models genuinely differ is **image density**: one simile marker per 5.7 narrator sentences under
sonnet against one per 10.3 under gemini, nearly two to one. Sentences carrying two markers are rare in
both (4 in the sonnet half).

The second measurement is the more interesting one. The same STYLE sentence carries an absolute ban on em-
and en-dashes. Compliance across 100 live turns, both models, is **100%**. There is no scanner and no note
builder behind the dash ban.

**Insight.** H6 concluded that a prose rule works when it has a scanner behind it. The dash ban has none
and is obeyed perfectly; the shape instruction has none and is missed by 14%. The discriminator is not
measurement — it is **substitutability**. "Never use an em-dash" has a mechanical substitute the model can
reach for in one token (a comma, a full stop). "One main image per sentence" is a judgement made afresh at
every clause, and there is nothing to reach for. That reframes the fix: a shape note builder is worth
building for the axis that actually varies between models and turns, not for the mean word count, which is
a stable house-wide 22.8 and would fire every single turn.

**Recommendation.** **M, revised from H5.** Keep `buildSentenceShapeNote` but retarget it at **simile
density** (markers per narrator sentence over a committed narration), not mean sentence length — the
former separates a 5.7 turn from a 10.3 turn, the latter separates nothing. Drop H5's model-blaming
rationale from the row; it is falsified. Drift surface (STYLE + note builders + prompt) → Fable tier,
failing assertion first, plus a sabotage clause.

**Settled?** No. (The voice feature is settled; this enforces a house clause, not a voice.)

---

## Finding O2 — Seventeen turns carry the banned clerical image and one three-scene arc *is* the banned plot. This corpus is the pre-guard baseline.

**Position applied.** §8.2 ● (does the thing really look like that?); §6.6 ● (slant-wise at the clichés);
§8.1 ●. Owner ruling: no ledgers as story device.

**Measured fact.** "ledger / ledgers / bookkeeper(s)" appears in narration on **17 of 100 turns** (t2344,
2345, 2347 ×2, 2357, 2365, 2366 ×2, 2368, 2374, 2375, 2376, 2377, 2378, 2394, 2395, 2404, 2416, 2423).
Five consecutive sonnet turns make it Daeris's recurring epithet: t2374 "a woman who has stopped keeping a
ledger on nights like this"; t2375 "that quiet, ledger-closed look"; t2377 "that ledger-look gone soft
around the edges"; t2378 "the ledger in her head apparently granted a night off."

Separately, t2394–t2432 is a **paper-trail procedural**: a requisition-complaint folder, a caravan payout
approved in four days, a deliberately smudged magistrate's seal (t2396–2397), then payment vouchers
counter-signed by "a clerk named Varn", route manifests, bearer notes and payout slips (t2416, 2417, 2425),
closing on Morwen's verdict at t2423, "Varn is definitely the accountant."

**Version check, and it changes the verdict.** The log runs v1.708–v1.832. The register guard — the STYLE
clerical clause, `registerScan`, `buildRegisterNote` — shipped at **v1.839** (`15ceea3`). No scanner
existed during any of these turns. These 17 hits are not guard failures; they are the **baseline the guard
was built to fix**, measured on the owner's own campaign rather than a harness. But `DEFAULT_RULES`
"NEVER ADMINISTRATIVE" (`data.js:110`) has been live since v1.55 and explicitly forbids building quests or
plots on "paperwork, ledgers, deeds, registrations, probate, debts, wages" and bureaucracy — and the arc
above is exactly that, offered by the GM at t2395 unprompted and then pursued by the player because it was
the lead on the table.

**Insight.** Two things the shipped guard does not reach. First, `REGISTER_WORDS` (`helpers.js:125`) is a
tight list of clerical *nouns*; it catches all 17 metaphors and **none** of the plot vocabulary —
voucher, manifest, requisition, bearer note, routing slip, counter-signature, payout slip. The same STYLE
sentence bans the image "as metaphor, image or plot device"; the census only implements the first two.
Second, and larger: the pressure is coming from **canon, not style**. Two of the three companions'
authored motivations are debt instruments sitting in the stable prompt every turn — Daeris's "close the
account properly" and her "seventeen unmoored obligations", Morwen's "Fey Court contract law" and
"bloodline debts". The prompt tells the GM the world is made of books on one line and "this world keeps no
books" on another. The model resolved that contradiction the way it always will: in favour of the
character sheet.

**Recommendation.** **S.** Extend the census to the plot nouns as a **separate counter that does not fire a
note** — feed it to the drift-health readout instead (§2.5: more correction is worth less than better
correction, and a per-turn note on a word the campaign's own canon supplies would be a metronome). Then a
Fable-tier look at the real seam: whether `buildPartyHistoriesBlock` should restate a debt-shaped
motivation in the house's own terms ("debts here are blood, oaths, hunger and memory") at the point where
it enters the prompt, rather than letting STYLE argue with the sheet every turn.

**Settled?** The ledgers ruling is settled and not reopened. This is about the guard's reach, not its
existence.

---

## Finding O3 — All the violence in the coda is against the restrained, and it costs nobody anything.

**Position applied.** §2.1 ● (violence damages permanently); §2.4 ● (combatants end up beat up); §3.1 ◐
(consequence is the argument for the detail); §6.4 ● (good people in bad corners do bad things).

**Measured fact.** No combat encounter opens in 100 turns. `tagLog_last40` (t2399–2437) contains **zero**
`HP`, `CONDITION`, `COMBAT_*` and **zero** `ALIGNMENT` tags. The violence that does occur is all against
people who cannot fight back:

- t2402–2404. The hero, invisible, tackles an unarmed observer, drives "a knee into the back of a leg",
  locks a full nelson and hogties him with cord.
- t2422. He drops from the rafters onto a woman already pinned by a Binding Ward and brings the cleaver
  "down hard across the back of Sable's right knuckles with a muted crunch."
- t2423. The ward is "grinding her kneecaps right into the grit" while he stands over her.
- t2424. Zone of Truth compels her answer: "veins bulging along her temples as she tries to swallow the
  answer."

Nine turns later she is intact enough to spit at the sheriff (t2432). Nobody in the party takes a scratch.

**Insight.** This is H2 and H3 confirmed on real play, on a much uglier scene than the harness's extortion
turn. A Chaotic Neutral hero striking a bound prisoner with steel and then torturing a confession out of
her by magic is precisely the §6.4 case the alignment axes exist to register, and the axes did not move.
The reason is visible in the rule text: `tag_table.js:145` ends its ALIGNMENT line with "(use on morally
significant choices only)". "Only" reads as a permission to omit, not an obligation to file — and the GM
plainly understood the moral shape of the scene, because it wrote the compulsion as bodily distress rather
than as a clean interrogation. It understood and filed nothing.

The mercy has the same shape. At t2411 the hero cuts Petrin Voss loose and Frizwick names the price out
loud: "Bet you five gold he runs straight to Sable anyway." Sable walks into the trap eleven turns later
undisturbed; **Petrin never appears again in narration**. The scene set its own wager and the campaign
never paid it, so a mercy that could have cost something cost nothing.

**Recommendation.** No new recommendation — **H3's S-sized `DEFAULT_RULES` clause is the fix** and this
corpus upgrades its evidence from a harness turn to the owner's own campaign. Two additions to that row's
trigger list, both witnessed here: **violence done to someone already restrained**, and **an answer taken
by magical compulsion**. Do not touch display (settled) or the axes' maths.

**Settled?** "Alignment shown" is settled. The tag obligation is not.

---

## Finding O4 — The only antagonist interiority in 100 turns was extracted by a compulsion spell.

**Position applied.** §6.1 ● ("no one's the villain of their own story"); §6.2 ● (peel back the lid);
§6.3 ● (reasons need not excuse); §5.4 ● (understandable to themselves).

**Measured fact.** Sable is the stretch's only antagonist. She arrives at t2421 and speaks eight
attributed lines across t2422–2429. Every line she offers **voluntarily** is threat or contempt: t2422
"You think you're clever, half-blood?"; t2423 "You kill me, Varn clears the ledger by midnight." The one
place she explains herself is t2424, under Daeris's Zone of Truth, and it is the best moment she gets — the
hero asks how many people she has trafficked, the compulsion drags out "None," and then a working reason:
flesh is messy, it rots, and the margins are worse than ancient power sources. The answer surprises the
player and defuses the violence he was about to do; his next action opens "Not trafficking innocents also
keep me from carving you."

**Insight.** H4 said the engine gives antagonists hit points and no want. This corpus shows the sharper
version: the product's *only* route into a villain's head, across a hundred turns, was a coercion spell the
party happened to bring. `data.js:108` — "DANGER IS REAL: antagonists scheme, ambush, resist, and fight"
— made her a threat and nothing asked for a person, so the only interiority that reached the page did so
because the player forced it. That the forced version worked so well is the argument for the clause, not
against it: the scene's turn is the moment she becomes explicable.

**Recommendation.** Reaffirm **H4's S-sized `DEFAULT_RULES` clause**, with one refinement it earns here:
the reason must arrive **uncompelled and before the reckoning**, in the antagonist's own mouth. It need not
excuse anything (§6.3). Prompt-only, no new tag.

**Settled?** No.

---

## Finding O5 — The companions are distinguishable, and H8's "chorus" does not survive real play.

**Position applied.** §5.1 ● (would this person really say this here?); §5.2 ● (replace the generic with
the distinctive); §5.3 ● (the crib sheet); §1.2 ●; §5.5 ●.

**Measured fact.** 134 attributed companion lines: Frizwick 50, Morwen 47, Daeris 37. Blind-readable by
register:

- **Frizwick** deflates whatever is in front of her, and carries all 8 of the profanities: t2344 "Let's go
  dump him on the holy accountants"; t2345 "Civic religion. Efficient as hell once you terrify the night
  shift"; t2398 "I choose to hear it as 'goblins who respect a good comeback story.'"
- **Daeris** qualifies, counts and forecasts: t2417 "Every unrecorded transaction leaves a ghost behind";
  t2428 "I give him four days before he accidentally poisons a raccoon."
- **Morwen** states the next move flat: t2417 "We just need to be sitting in Ameiko's cellar when the door
  opens"; t2425 "The network's done."

Those are three people, and §5.1 passes on each. But the separation is model-dependent and
scene-dependent. Under sonnet the mean attributed line length separates the three (9.1 / 10.2 / 14.5
words); under gemini it collapses to a flat 9.8 / 8.3 / 8.9. And across the explicit sequence t2348–t2363
(13 turns, all gemini) all three registers flatten to short encouragements: the accountant stops counting,
the tactician stops planning and the joker stops joking for thirteen consecutive turns. That is measurably
the one place the crib sheet stops being read.

One further observation, minor but exact. At t2418 the owner asks out of character — `GM: Who can cast an
'ambush ward'?` — and the engine answers it **in character**, as Morwen reciting a two-option spell menu
in dialogue (t2419), with Daeris supplying the comparison. It reads smoothly and it is the only turn where
a companion is a user-interface element rather than a person.

**Recommendation.** **XS.** The explicit content is settled and is not the subject; the craft note is that
`buildPartyHistoriesBlock` is worth one clause saying a companion's trait and flaw govern how they speak in
intimate and quiet scenes too, since that is precisely and only where they stop applying. No change for the
`GM:` prefix — but record that answering an out-of-character question through a companion's mouth turns a
person into a menu, and the honest alternative is Table Talk, which the lens recuses itself from (§9).

**Settled?** Adult content is settled.

---

## Finding O6 — Companions *do* hold positions here, and one of them wins an argument. H8's premise is falsified.

**Position applied.** §5.4 ● (understandable to themselves); §5.6 ● (characters generate situations);
§5.2 ●.

**Measured fact.** H8 reported that across 40 harness turns "no companion contradicts the player once."
On the owner's campaign they do:

- **t2380.** The player wants to wrap the campaign up and go home. Morwen argues against it for a full
  turn: "I don't think it's finished just because Karzoug's dead." The player's very next action concedes
  — "After Sable. but Sable is the last." She then half-concedes herself at t2381: "Sable doesn't go away
  because we stopped looking, Ammut." A position, held, that changed what the player did.
- **The #347 want machinery visibly fires.** `noteLog` shows `buildAgendaAskNote` at t2415, 2416 and 2417;
  `COMPANION_AGENDA` tags land at t2416, 2417 and 2418; and the want arrives in Morwen's own mouth at
  t2418 — recovering her family's stolen arcanist grimoire from the Lorrath cabal's courier. Frizwick
  states an unasked one at t2416 — sailing south to find "whoever sold out my old crew in the Ashlands."
- **t2413.** Daeris cuts the scene short against the player's mood: "Tides don't wait for marital vanity."

**Insight.** The mechanism the harness pass proposed to fix works. What it cannot yet produce is narrower
and harder: **a disagreement the player must lose**. Every position here is either agreed with inside one
turn or deferred to later; no companion is ever right about something the player is wrong about, and no
one refuses. That is a design fork for the owner (§5.4 versus a player's authority over his own party),
not a defect, and the lens states it as a question rather than a recommendation.

**Recommendation.** **Withdraw H8's S-sized `partyBlock` recommendation as written** — its measured premise
does not hold on player-driven play. No change. Record the narrower open question above for the owner.

**Settled?** The #347 companion-want ruling is settled, and this corpus is evidence it works in the wild.

---

## Finding O7 — Humour is the coda's oxygen and it is doing the §2.6 work unregulated.

**Position applied.** §4.1 ● (humour is one of the four); §4.2 ● (dark and funny in the same breath);
§4.3 ● (texture, not a joke slot); §2.6 ● (darkness needs the glimpses of light); §8.2 ●.

**Measured fact.** The joke rate never drops, including inside the ugly scenes. In the cellar, over a
bound prisoner: t2423 Frizwick, "I love when they're feisty before we take all their stuff"; t2426, on
recognising the goblin, "the economy in Varisia must be in absolute shambles"; t2428 Daeris on the freed
goblin, "I give him four days before he accidentally poisons a raccoon." Ameiko closes the night at t2433
with "Drink up, assholes. The cells are full, the cellar is locked." The STYLE tail says **nothing** about
humour; all of it is arriving from the voice dial and the companions' own registers.

The failure mode is the one §4.4 warns about from the other side — not too many jokes, but comparisons the
point-of-view character could not have made. Two turns reach for the same anachronism: t2391 "grins like
Christmas came early", and t2424, catching a lockbox "like an oversized Christmas present." Ammut has
never had a Christmas. The single gemini-3.6-flash turn also produced a grammatical slip, t2414 "grinning
like a idiot."

**Insight.** §2.6 says extremes of darkness only let the light twinkle, and this coda is the product's
best working demonstration of it: the bathhouse, the chop-house eggs, the mage-hand plate delivery at
t2388 and Morwen's "Showing off. In a chop-house. For eggs." are what make the cellar land. The lens's one
correction is §8.2's test, which is about honesty and not about jokes: a simile is dishonest when the
narrator could not have thought it, and "Christmas" fails that on the same logic as the antiquity ratchet
(#227) — it is the model's own idiom overriding the world's.

**Recommendation.** **No change on humour** — do not add a humour instruction (§4.4, and the Dinniman voice
already owns that end of the dial). If anything ships, it is the anachronism test, and it belongs in the
**same census shape as the register guard**, not as a new note builder: a small watch-list of
out-of-world idioms scored into drift health, never a per-turn correction.

**Settled?** No.

---

## Finding O8 — A hundred turns of coda and the engine's own record of what mattered is empty.

**Position applied.** §3.3 ● ("if you're comfortable with it all, then it ain't really worked"); §3.5 ●
(escalation is structural); §7.5 ● (the avalanche, not the whimper); §2.6 ●.

**Measured fact.** `storyBeats_from_2300` contains exactly two entries, both **before** this window: t2327
Karzoug wakes, t2331 Karzoug slain. Across t2338–2437 — a ten-thousand-year-old captive delivered to a
temple, a smuggling network dismantled, a named crime lord taken and handed to the sheriff, a party
deciding to go home — the count of `STORY_BEAT` tags is **zero**. `openQuests` is empty. The chapter
summariser kept working throughout (five chapters, t2417–2434) and calls the cellar ambush "a massive win
for the party", so the engine *knows* things happened; the beat layer does not.

The mechanism is the same one O3 found on ALIGNMENT. `tag_table.js:175` reads "use sparingly for truly
significant moments only", then lists concrete triggers including "a major revelation lands" and "first
blood is drawn in a significant conflict" — both of which occurred (t2417, t2422). Two tags whose doc lines
end in a restriction, both silent for a hundred turns, both with obviously qualifying scenes. That is a
class, not two instances.

**Insight, in two directions.** The coda itself is good and the lens says so plainly: the bathhouse, the
eggs, Petrin's release and the last three turns of four people refusing to get out of bed are the strongest
sustained §2.6 stretch in either corpus, and the fixture records that the engine has been offering "Write
the ending" on the fourth button throughout and the owner has declined it for over a hundred turns. He is
right to. But §3.3's warning bites exactly here: a coda with no recorded spine cannot escalate, and what
it does instead is tidy. The engine's memory of these hundred turns will contain chapters and no
milestones, which is also a memory-tier consequence, not only a craft one.

**Recommendation.** **S — a record fix, not a story fix.** Surface "no `STORY_BEAT` filed in N turns" in
the drift-health readout (#17), the way tag silence is already surfaced for an open combat encounter. Do
**not** add a note builder that asks for beats — that manufactures significance, which is the §2.5 failure
and the #347 failure both. And treat the "only"/"sparingly" wording as a class defect worth one pass across
the tag docs, paired with H3's clause.

**Settled?** The ending design and the fourth button are settled; nothing here touches either.

---

## What changed from the harness pass

The harness pass (`abercrombie_findings.md`) measured 90 turns of scripted and button-driven play across
three fixtures. Reading 100 turns of the owner's own campaign moves four of its nine findings.

1. **H5's mechanism was wrong.** The 32.1-vs-19.6 sentence-length gap was the fixture and the voice, not
   the model: on one campaign both models write a 22.8-word narrator sentence. The surviving difference is
   simile density (5.7 vs 10.3), which is what a shape note builder should actually watch (O1).
2. **H6 overstated the scanner.** It concluded a prose rule works when it has a scanner behind it. The
   em-dash ban has no scanner and is obeyed 100% across 100 turns; the clerical image was used on 17 turns
   in this same window. The discriminator is whether the model has a substitute to reach for, not whether
   the engine is watching (O1, O2). H6's underlying observation — that the register loop caught a slip at
   t2102 — still stands; its generalisation does not.
3. **H8 is falsified as stated.** "No companion contradicts the player once" was an artifact of harness
   play. On the owner's campaign a companion argues a position at t2380 and the player concedes to it, the
   agenda machinery fires visibly at t2415–2418, and the three companions are blind-distinguishable by
   register. The recommendation is withdrawn; the narrower open question — a disagreement the player must
   *lose* — replaces it (O5, O6).
4. **H2 and H3 are strengthened, not changed.** "Violence is free at high level" and "the alignment axes
   never move" both reproduce on real play, and the owner corpus supplies a far stronger test case than the
   harness did: a bound prisoner struck with steel and magically compelled to confess, with zero tags of
   any consequence-bearing kind (O3). O8 then shows the same "only" wording silencing a second tag, making
   it a class defect rather than an ALIGNMENT quirk.

Unchanged and reaffirmed: H1 (the engine-narrowed turn), H4 (antagonists have no want — O4 sharpens it),
H7 (the wildcard), H9 (the death walk, settled, no action).

## Verification gaps

- **The voice dial is not recorded in the fixture.** `meta` carries no `proseAuthor`, so every measurement
  in O1 is against the house-wide STYLE clause only. Whether the *player's chosen voice* landed is
  untestable from this file; a re-export carrying `proseAuthor` would close it.
- **`tagLog` covers only t2399–2437.** The "zero ALIGNMENT / zero CONDITION / zero HP" claims in O3 are
  measured across 39 turns, not 100. The three violent scenes all fall inside that window, so the finding
  holds; a full-range tag log would make it airtight.
- **`noteLog` covers only t2415–2437 (12 entries).** No claim is made about which note builders fired
  earlier, and O2's version check — not the note log — is what establishes that the register guard was
  absent.
- **This corpus predates the register guard (v1.839) and the elapsed-ticker work.** O2 is therefore a
  baseline measurement, not a regression report, and must not be cited as the guard failing.
- **Model attribution of dialogue is regex-derived** (attributed-speech patterns around three names), so
  the per-companion line counts in O5 and O6 are lower bounds; unattributed lines in multi-speaker
  paragraphs are excluded.
- **No fight occurred.** O3's claim about what violence costs is measured on restrained-target violence
  only. A high-level *combat* encounter on the owner's own save remains unmeasured on both passes; H2's
  window is still the only evidence for it.
- **Lens gaps carry through** (lens §11): Writer Unboxed and Grimdark Magazine both 403'd, so §3
  (consequence) still leans on blog posts, and §3.2 remains ○ and carries no verdict here.
