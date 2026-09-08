# Panel review — the Le Guin lens on the owner's own hundred turns

*This is a rubric of documented positions, not the woman. Every entry cites
[`../leguin_lens.md`](../leguin_lens.md) by number and confidence, and every claim about the game is
measured: a turn number, a computed statistic, or a rule at file:line. Quotations are capped at fifteen
words. The explicit scenes are reviewed as prose craft — register, rhythm, what is left unsaid — and no
line from them is quoted.*

**Surface under review:** the narration of a real campaign at rest.
`testRuns/fixtures/owner_runelords_t2338-2437.json` — turns 2338–2437 of *Rise of the Runelords (Ammut)*,
the hundred turns after Karzoug was slain at t2331. 53 turns narrated by claude-sonnet-5, 46 by
gemini-3.7-flash, 1 by gemini-3.6-flash, **all under the same voice dial**, so every model difference below
is between models and not between dials. Engine versions v1.708 → v1.832. The hero is married to all three
companions; adult mode is on.

**Why this corpus is different from the first pass.** The first pass measured harness play — a scripted
proxy, half its sonnet turns a forced no-op, gemini's window a march to a boss fight. This is a person
playing his own campaign for pleasure, in a register the harness never produced: four people in a bathhouse,
a chop-house breakfast, a spy released instead of killed, a night that nothing threatens. It is the carrier
bag after the spear, which is exactly the shape the first pass said the product's own artefact argues for.
Several first-pass numbers do not survive contact with it. Those reversals are marked.

| | harness sonnet | harness gemini | **owner sonnet** | **owner gemini** |
|---|---|---|---|---|
| turns | 20 | 20 | **53** | **46** |
| words / turn | 108 | 151 | **235** | **204** |
| mean sentence | 14.5 w | 13.5 w | **14.7 w** | **17.5 w** |
| **sentence-length SD** | 10.2 | **7.1** | **11.1** | **10.3** |
| longest sentence | 42 w | 38 w | 52 w | 57 w |
| similes per 1k words | 3.71 | 3.99 | **7.08** | **4.07** |
| turns opening "You" | — | — | 27 / 53 (51%) | **33 / 47 (70%)** |
| shortest turn | **17 w** | 99 w | **110 w** | **114 w** |
| em/en dashes | 0 | 0 | 0 | 0 |

Harness figures recomputed through this review's pipeline so the columns are comparable; they land within
0.6 w of the first pass's own numbers on mean, SD and simile rate, so the pipelines agree. The "You"-opening
row is blank for the harness because those narrations arrive with a DOM header that eats the first word.

**One structural note before the findings.** In this fixture the `action` recorded on turn N is the action
the player typed *after* reading turn N's narration; narration N answers action N−1. Every turn-to-action
pairing below accounts for the offset.

---

## Finding 1 — In real play the turn length is a constant, and the leaping instruction never lands

**Position applied:** 6.1 "what you leave out is infinitely more than what you leave in" (◐); 6.2 leaping as
a revision act a live writer cannot perform (◐); 1.3 pace and movement depend on rhythm (●).

**What the game does.** The STYLE tail (api.js:2221) carries the leaping instruction in plain words: *"When
nothing much has changed since the last response, write LESS."* Across these hundred turns:

- Mean **220 words per turn**; standard deviation 53; **coefficient of variation 0.243**.
- **Not one turn falls below 110 words.** Eight of a hundred fall below 150. The harness sonnet run reached
  16 words on a dead action; here the floor is seven times higher.
- Correlation between how much the player asked for and how much the GM wrote: **r = 0.014** over 100 turns
  (mean action length 18.7 words, ranging from one word to ninety). Length is not a response to the input.
- Turns where the engine's own parser filed **`NO_CHANGE`** — its explicit statement that nothing changed —
  average **212 words** against a 221-word window mean (t2406 185w, t2410 217w, t2413 171w, t2417 264w,
  t2433 224w).
- Sorting by minutes advanced makes it worse: the turns that advanced the clock **zero** minutes average
  **241 words**, the highest of any bucket; turns advancing over an hour average 231.

**The honest half.** The leaping clause shipped at **v1.784** (commit c9ac2a9). Only the last **22 turns**
(v1.823–v1.832, t2416–t2437, all gemini) ran with it live; those 22 average 209 words with a 124-word floor,
and the two the engine flagged `NO_CHANGE` within them are 264 and 224 words — both at or above the window
mean. Small n, but it points the same way, and the other 78 turns are not evidence against a clause they
never saw.

**Insight.** First-pass Finding 6 said the leaping works and showed a clean 137 → 16 word decay. That decay
was produced by a harness feeding the same dead action ten times — a laboratory condition. Under real play
the same instruction produces a flat 220-word paragraph regardless of whether the player asked for one thing
or five, and regardless of whether the engine itself just declared that nothing changed. 6.2 warned that
leaping is a *revision* act; the prompt tail is the engine's substitute for revision, and on this evidence it
is a substitute only when the input is degenerate enough to make writing long absurd. In a coda — where by
definition little is at stake per turn — that is the exact condition the clause exists for, and it is the
exact condition where it is silent.

**Recommendation — S.** Census, not prompt. The engine already files `NO_CHANGE` and already has the
observer seam that `registerFile` (api.js:687) uses. Record narration word count per turn, and surface
**mean words on `NO_CHANGE` turns vs. mean words overall** on the #17 drift-health readout. That single pair
of numbers turns "is the leaping working" from a story about one harness run into a standing measurement.
Do not touch the STYLE tail on this evidence — it is drift surface and the clause is only 22 turns old here.

**Settled:** no. *(Amends first-pass Finding 6, which is now over-claimed.)*

---

## Finding 2 — The metronome was the march, not the model

**Position applied:** 1.4 "the rhythm of prose depends very much on the length of sentences" (◐); 1.6 the
two-beat stress/release pattern (◐); 11.1 the gift can carry banal prose (●).

**What the game does.** First-pass Finding 2 measured gemini's sentence-length SD at **5.8** against sonnet's
**9.7** on the same save, and named it a metronome. On the owner's campaign, same dial, both models:

- **sonnet SD 11.1, gemini SD 10.3.** The gap is 0.8, inside the noise of a regex segmenter. Recomputed on
  the harness files through this pipeline the old gap is still there (10.2 vs 7.1), so the change is in the
  corpus, not in the arithmetic.
- Gemini's **mean sentence is now the longer one** — 17.5 words against sonnet's 14.7 — and its longest
  sentence in the corpus (57 words) is longer than sonnet's (52).
- The simile rates **invert**. Harness: sonnet 3.71 / 1k, gemini 3.99. Owner: **sonnet 7.08, gemini 4.07**.
- Excluding the sixteen explicit turns (t2348–t2363) does not rescue the old result: gemini's remaining 31
  turns run SD 10.0, mean 16.4.
- The one first-pass metric that **holds**: turns opening with the word "You" — gemini **33/47 (70%)**,
  sonnet **27/53 (51%)**. Harness had 85% and 55%. The habit is real and it is the model's.

**Insight.** 1.6 asks whether a long campaign alternates stress and release. This corpus proves the models
do too — but on the *scene's* clock, not their own. Gemini writing a march produced short flat propulsive
lines; gemini writing a bathhouse, a kitchen and a cellar ambush produced longer, more varied ones. The
flatness the first pass attributed to a model was a property of the *material*. This matters practically:
a sentence-SD census that does not control for register will report a model as flat when the player has
merely been travelling, and the drift-health readout would then be lying with a number.

The lens's own dissent stands and sharpens. 11.1 says storytelling power is separable from prose quality and
that the gift carries banal prose. Both models here read well and neither is doing anything at sentence level
that a careful reader would call distinguished; what makes the coda compulsive is continuity — Frizwick's
shirt in the bath at t2367, a callback to an event long outside this window, landing correctly and with the
right embarrassment attached. "I kept playing" remains
not a prose verdict.

**Recommendation — S.** If the sentence-SD census from first-pass Finding 2 is built, it must carry a
**register key** — at minimum combat / travel / scene — and report per-key, never a campaign-wide scalar.
A single number across mixed registers is worse than none, because it will be believed. No prompt change.

**Settled:** the gemini preference is settled (owner ruling 2026-08-17). *(Reverses the "flattest rhythm"
half of first-pass Finding 2; the finding's caution about taste-vs-measurement survives intact.)*

---

## Finding 3 — The vehicle changes with the room; the frame is the fingerprint, and nothing measures it

**Position applied:** 1.7 repetition, echo and reversal as deliberate structure (◐); 6.4 "Listing is not
describing" (◐); 6.6 quality in the verb, not the adverb (◐); 7.1 the sentence must embody the thing (●).

**What the game does.** First-pass Finding 3 asked for a census of repeated simile *vehicles*. On this
corpus the vehicle turns out to be the wrong unit.

- **The vehicles track the scene.** In the harness march, gemini's similes were five predators and wraiths
  for one act of moving quietly. In the owner's kitchens and bedrooms the same model reaches for comic
  household objects: *"like a dead starfish"* (t2435), a squeezed watermelon seed (t2427), a green squash
  (t2426), *"like a python claiming a log"* (t2437), *"like an angry refrigerator in the background"*
  (t2429). Different bank, same habit — one object per beat, played for a laugh.
- **The frame does not track the scene; it tracks the model.** Sonnet uses a characterological hedge that
  gemini uses **zero** times: *"the particular X of Y"* **×9** (t2378, 2381, 2391, 2394, 2395, 2405 ×2,
  2408, 2409 — e.g. *"the particular stillness of someone filing a location away"*); *"the kind of / the
  kind that…"* **×8**; *"the way a man does / the way she…"* **×6**. Twenty-three instances in 12,429 words,
  **1.85 per 1,000**, and gemini's count for all three is 0.
- **Repetition at the scene scale.** The bathhouse block t2347–t2363 runs 3,336 words on a single sensory
  field: *cedar steam* **×7**, *mineral water* **×9**, *steam* ×19, *marble* ×9, *churn* ×9, *slick* ×9,
  *scalding* ×6. data.js:112 forbids reusing *"a specific detail, phrase, number, or image"* and says to
  *"reach for a completely different sense or device next time."*
- **Repetition of a number, which the same rule names explicitly.** *"ten thousand years"* appears four
  times — t2338, t2340, t2341, t2379 — three of them inside four turns. *"ancient horror(s)"* appears three
  times across both models, forty-seven turns apart (t2345, t2365, t2392).
- **The antiquity ban is again avoided in word and kept in gesture.** api.js:2221 forbids a character
  boasting of having waited longer than some other thing is old. t2338 closes on the mountain
  *"patient as anything that's had ten thousand years to practice"* — the boast, transferred to a cliff.
  t2340's *"Ten thousand years,"* spoken by a man who lived them, is the legal case the rule carves out.

**Insight.** 1.7 is the discriminator: repetition is not the enemy, *unearned* repetition is. The bathhouse
block is the clearest case in the corpus. Seventeen turns escalate, and the escalation is carried entirely by
verb intensity while the world stays a fixed backdrop of the same four nouns. 7.1 asks that the rhythm and
movement of the sentences embody the physical reality; here the sentences move and the room does not, so the
scene's own duration stops registering — it could be minute one or minute ninety. The single most frequent
content word in the whole hundred turns is **"against"** (108 uses, 44 of them in that block): the coda's
real grammar is prepositional contact, bodies and knees and foreheads *against* each other, which is a
genuinely carrier-bag sentence pattern and worth knowing the engine produced it unprompted.

**Recommendation — M, Fable-tier.** Build the repeat census on the proven `registerFile` shape, but census
**three units, not one**: (a) a content word or fixed phrase above a frequency threshold in a trailing
window (this catches *cedar steam*, *ancient horror*, *ten thousand years*); (b) a repeated **frame**, as a
small pattern list — `the particular …`, `the kind of/that …`, `the way (a man|she|he) …`, the age
comparison; (c) the simile vehicle, last, since it is the least stable. File to a ring beside
`registerSlips` and surface on drift health. Measurement only in this row; any one-shot note built on it
touches the prompt and inherits the full drift-surface protocol.

**Settled:** the antiquity ban is a settled owner ruling and is not challenged. *(Extends first-pass
Finding 3; corrects its choice of unit.)*

---

## Finding 4 — Poughkeepsie is worst in the copy that survives

**Position applied:** 2.1 "A writer may use all the trappings of fantasy without ever actually imagining
anything" (◐); 2.2 "the point about Elfland is that you are not at home there" (◐); 2.4 the maker's voice
is the only voice (◐).

**What the game does.** Modern-idiom count over a fixed list of terms with no place in Varisia:

- **Narration: 44 hits in 22,023 words — 2.0 per 1,000.** Both models. Sonnet: *"war crime"* (t2390),
  *"like Christmas came early"* (t2391), "dinner theater" and a "granola-bar diplomat" (t2407), "production
  values" (t2399), "professional composure" (t2402). Gemini: *"like an angry refrigerator in the
  background"* (t2429), *"working two different illegal smuggling rackets in the same fiscal quarter"*
  (t2426), "half the wharf goes into low orbit" (t2429), "arcane napalm" (t2430), "an artillery strike"
  (t2423), "public servants", "bar tab", "portraitist", "the holy grail".
- **Chapter summaries: 12 hits in 766 words — 15.7 per 1,000, nearly eight times the narration rate.**
  All five chapters (t2417, 2421, 2425, 2431, 2434) carry them: *"nothing says romance like checking off an
  informal spouse tax"*, *"turning the dark, beer-soaked cellar into a divine polygraph clinic"*,
  "blunt-force orthopedic trauma", "carved like Thanksgiving poultry", "goblin boot-leather artisan to his
  resume", "the Sandpoint legal system", "actual police work", "commit a felony", "a new survival record".

**Insight.** 2.1's test is to strip every proper noun and ask what remains that could only happen in this
world. Strip them from the chapter summaries and what remains is a 2020s American comedy voice. That would
be a transient blemish in narration — the player reads it once and it scrolls away — but a chapter summary
is *the copy the engine keeps*. It is re-injected as CHAPTER SUMMARIES every turn (memory.js:1377), it is
what an era compiles from (memory.js:1610), and chapters are declared immutable. So a Thanksgiving joke made
once at t2425 becomes part of the canon this campaign is narrated from, permanently. 2.4 says the world has
no borrowed reality and the maker's voice is the only voice; here the *record* borrows harder than the prose
does, and the record is the half with tenure.

There is a second, sharper instance of the same mechanism in these five chapters. The t2417 summary calls the
antagonist **"Sable himself"**; at t2421 Sable is revealed to be an elven woman, and the earlier chapter
keeps the wrong pronoun. The prose corrected itself in one turn; the immutable record did not.

**Recommendation — S.** The register guard already has every part needed: a word list (helpers.js:125), a
scanner (`registerScan`, helpers.js:128), a ring and a note (api.js:687/696). Add a **second list** for
modern idiom and — the load-bearing half — **run the scan on the chapter summary at write time**
(`memory.js` summarize path), not only on narration. A chapter that trips it can simply be re-asked once
before it is committed, since unlike a narration turn nobody has read it yet. This is the one place in the
prose surface where a retry is honest, because the chapter has no reader waiting.

**Settled:** no. The clerical ban's *word* list is settled; a modern-idiom list is a new thing and this is a
proposal, not a claim that one exists.

---

## Finding 5 — The clerical ban's true baseline, and the canon that feeds the habit from inside

**Position applied:** 2.4 the only voice is the creator's (◐); 9.1 the world must be consistent because
nothing else holds it up (◐); 1.7 unearned repetition (◐).

**What the game does.** The clerical ban and its census shipped as **v1.839** (commit 15ceea3, 2026-09-06).
This fixture ends at **v1.832**. Every turn here predates the guard by one version, which makes it the exact
pre-guard baseline — the corpus the rule was written against — and lets the guard be scored rather than
assumed.

- **The guard would have fired 25 times in 100 turns**: *ledger* / *ledgers* ×19, *paperwork* ×2,
  *accountant(s)* ×2, *bookkeeper(s)* ×1, *balance sheets* ×1. Both models: sonnet 12, gemini 13.
- **The word list misses 42 more hits of the same field**: *clerk* ×4, *seal* ×6, *balance* ×3, *tallies*
  ×2, *vouchers* ×2, *payout* ×2, *receipt* ×2, *cataloguing* ×2, *manifest(s)* ×3, *bureaucratic* ×2,
  *debt(s)* ×2, *accrued*, *audits*, *arbiter*, *requisition*, *fiscal*, *filed*, *filing*, *books*,
  *signature(s)* ×3. Whole images pass untouched: *"an expensive beacon of bureaucratic salvation"* (t2344),
  the temple's *"holy accountants"* and *"holy bookkeepers"* (t2344, t2347), and a companion addressed as
  *"bookkeeper"* as an endearment (t2348).
- **The habit is not the model's invention — the prompt supplies it.** Every turn the engine injects
  companion canon that is written in the banned register. Daeris's trait: *"She counts things quietly …
  and files them without comment."* Her motivation: *"close the account properly and ensure the seventeen
  unmoored obligations do not destroy people."* Morwen's motivation names *"Fey Court contract law"* and
  *"active bloodline debts."* Two of Morwen's four relationship labels read *"debt discharged"*.

**Insight.** This is the deeper form of first-pass Finding 3's point about lexical bans and rhetorical
habits. A one-shot correction note tells the GM not to say *ledger*; it cannot tell the GM to stop being
handed a cleric whose defining trait is bookkeeping. The guard and the canon are pulling against each other
inside the same prompt, and the canon has tenure — a character record persists, a note fires once. Worth
saying plainly: this is also the campaign's *good* material. The best line in the coda is t2378's *"For one
whole morning, nobody in this room owes anybody anything"*, and its force is entirely borrowed from the debt
register the rule bans. The ruling stands (owner, 2026-09-06: balancing data is good, driving a story is
horrible); the observation is that this campaign's emotional spine is a debt paid off, and the guard has no
way to tell that from a metaphor reached for out of habit.

**Recommendation — S/M, Fable-tier.** Two parts. (a) Widen the word list toward the field, not the word —
at minimum *clerk, vouchers, tallies, requisition, bureaucratic, accrued, balance sheet* — since half the
field currently walks through. (b) When `registerSlips` crosses a threshold for one campaign, the readout
should say **where the register is coming from**: run the same scanner over the injected character records
and name the offending fields. A slip the canon caused cannot be corrected by a note aimed at the narration.
Do not auto-edit a character record; surface it.

**Settled:** the clerical ban is a settled owner ruling and is not challenged. Its enforcement reach is what
this row is about.

---

## Finding 6 — A hundred turns, and the engine recorded that nothing happened

**Position applied:** 4.1 "The reduction of narrative to conflict is absurd" (◐); 4.2 the container as the
untold story (◐); 4.5 the novel as a bundle holding things in relation (◐); 8.2 whether a non-combat act
can be made to count (○).

**What the game does.** `storyBeats_from_2300` contains exactly **two** entries, both before this window:
the party reaching Karzoug's dais (t2327) and killing him (t2331). **Across all 100 coda turns: zero story
beats.**

`tag_table.js:175` states the trigger list the GM is given: *"a companion joins or leaves the party, an oath
or bargain is struck, a major revelation lands, first blood is drawn in a significant conflict, a quest
completes."* Inside this window, by the game's own record:

- **A quest completed.** t2425 carries `QUEST` and `GOLD` tags; the Sable network is dismantled and the
  manifests recovered. No beat.
- **The central revelation landed.** t2417: the enemy's staging ground is under the party's own
  friend's tavern. No beat.
- **A bargain was struck.** t2365 the four agree to "family time"; t2381 Morwen accepts *"After Sable, and
  then that's the last one."* No beat.
- **A companion's arc turned.** t2376–t2377, Daeris admits she cannot stop doing the math and then chooses
  to stop for a night. No beat.
- **The party released an enemy alive** rather than killing him (t2411), the single most consequential moral
  choice in the window. No beat.

Two of the doc's own five triggers fired in the fiction and produced nothing.

**Insight.** 4.5 calls a novel a medicine bundle holding things in a powerful relation, and this save is the
best available instance of one: 100 turns, three marriages, a slain god-king, a network unmade, a man let go.
The beat list is the engine's own statement of what mattered, and after all of it the statement is empty.
That is 4.1 rendered as a data structure. The trigger list is not neutral about shape — *"first blood is
drawn in a significant conflict"* is spear vocabulary, and the two triggers that could have caught a
domestic beat are phrased abstractly enough ("a major revelation", "an oath or bargain") that a model reading
the list beside the first-blood clause will read them all as combat-adjacent.

The consequence is not aesthetic. Beats also file to `keyDecisions` (tag_table.js:1206), so a hundred turns
of coda deposit nothing in the long memory but chapter summaries. Whatever the player and the GM built here,
the engine will not remember that it counted.

**Recommendation — S.** Census before vocabulary. Add **beats-per-100-turns** to the drift-health readout
beside the register line, so a drought this long is visible while it is happening rather than a hundred turns
later in a review. Rewriting the trigger doc is a tag-vocabulary change: full drift surface, Fable-tier, and
it should not be attempted until the census says how often the drought happens.

**Settled:** no.

---

## Finding 7 — The naming law works beautifully once, and the same corpus shows how it can be broken

**Position applied:** 3.1 "All things have a name" / naming as identity (◐); 3.2 "Who knows a man's name,
holds that man's life in his keeping" (◐); 3.3 the mock-fantasy name as the giveaway of fake Elfland (◐).

**What the game does — the win.** First-pass Finding 5 called 3.2 "the unclaimed half": the engine believes
a name is a person, but a rename is only bookkeeping and the conviction never reaches the fiction. In this
corpus it reaches it, and the mechanics back it exactly.

At t2396 an NPC exists only as hearsay: Ironbriar names a vanished informant, *Petrin Voss*. At t2400–t2404 a
hooded stranger is caught sketching the party, filed as "Robed figure (closed-eye cipher)". At t2410 the hero
asks his name — not for information, since the interrogation is already over, but because *"Figure you've
earned the right to be called something other than 'the captive'"*. He answers. And the tag log for t2410
carries `NPC_SUPERSEDE`, `NPC_MERGE`, `NPC` and `NPC_PRONOUN` in one turn: the record fuses the hearsay and
the stranger into one person at the moment the name is spoken. The narration dramatises the merge as
consequence, not bookkeeping — *"How do you know that name,"* he says, *"I thought she'd buried it."* That is
3.2 working in the fiction and in the data at the same instant, and the next turn (t2411) spends it: the
hero cuts him loose. *"You're really letting me walk."*

A quieter instance sits at t2341: a different captive reaches for his own name, produces *Corwyn*, and
immediately withdraws it — *"No. Not that."* The engine filed him as "Corwyn" all the same, on a name the man
himself disowned in the next clause.

**What the game does — the hazard.** The names the coda's GM invents cluster hard. Four new entities in the
same plot thread: **Petrin Voss** (t2396), **Varn** (t2417), **Magistrate Coraline Vess** (t2397), and **The
Viper** (t2417). All four begin with V; three are four or five letters; Voss and Vess differ by one vowel and
are, in the fiction, an informant and a magistrate on opposite sides of the same conspiracy. In an engine
whose first law is *"the same name IS the same entity, permanently"* (identity.js:1785) that is a live
collision risk, and it arrives from the GM rather than from the pools.

Note also that **Coraline Vess never appears in the narration at all** — she is filed into the NPC record at
t2397 while the prose deliberately withholds her, describing only a smudged seal and a cipher the magistrate
does not recognise. The record knows a name the story is still holding back.

**On the pools.** First-pass Finding 4's rhyme scheme does show, but only in the older, player-facing layer:
*Drixwick Lorrath* (`-wick`, `-rath`), *Wyla Ashvane* (`-vane`) are pool-shaped, and one married companion is
**Frizwick**. The coda's GM-invented names take a different and more varied family — Voss, Kreel, Varn, Vess,
Corwyn, Petrin — which reads as a language rather than a suffix. That is evidence *for* the first-pass
recommendation: the GM's own naming is already less rhymed than the pools it is told to imitate at
data.js:115.

**Recommendation — no change to the naming invariant**, which is load-bearing and was validated here in the
best way available: it worked, and the fiction noticed. Two small notes for other rows. (a) The V-cluster is
cheap to measure — a near-collision check over new NPC names against existing ones (shared initial, edit
distance ≤2) belongs in the identity lens's territory, not this one. (b) A name the prose withholds
(Coraline Vess) and a name the speaker disowns (Corwyn, t2341) are both filed as true names; whether that is
correct is an identity question, and this lens only records that the fiction and the record disagreed twice.

**Settled:** n/a. *(Claims the half first-pass Finding 5 left open.)*

---

## Finding 8 — Three ways the wall came down, none of which the person guard can see

**Position applied:** 5.1 point of view must be chosen and held (◐); 5.2 present tense as a narrow beam
(◐); 6.5 exposition must not clot (◐); 1.8 the chief duty of a sentence is to lead to the next one (●).

**What the game does.** `personDriftDetect` (api.js:1613) guards the *person* and does it well: across these
100 turns **zero** name the hero in narration outside dialogue — the guard's own arming condition — and only
**3 of 100** (t2389, t2419, t2427) carry no second-person pronoun outside dialogue at all, within a whisker
of the 2.8% baseline the guard's comment cites for a 1,663-response campaign. But the wall between the
fiction and the machine came down three separate ways, and every one of them stayed grammatically in second
person, so the guard saw nothing.

- **The GM revised itself inside the prose, in the hero's voice.** t2342, the cleric casts a heal. The
  narration begins the effect, then interrupts: *"Wait, that's not right; you catch yourself before it goes
  wrong"* — and again a paragraph later, *"Guidance doesn't mend ribs either, and you know it."* Three
  candidate spells are described and two retracted. This is the model's own revision pass, performed as the
  hero's memory. It is also, at 384 words, the second-longest turn in the corpus.
- **An out-of-character question was answered in the fiction.** t2418's action is *"GM: Who can cast an
  'ambush ward'?"* — a rules query addressed to the game, not the world. The answer arrives at t2419 as
  companion dialogue: Morwen and Daeris list their available wards to each other, with Frizwick supplying
  the joke — *"And while you two do the glowy geometry bullshit"*. It is a character sheet in quotation
  marks — and at 140 words it is among the three shortest turns gemini wrote in the window. Table Talk
  exists for exactly this channel and was not used.
- **Mechanics are named as proper nouns in prose on 20 of 100 turns.** Sonnet: *Silent Stalker* (t2400,
  2401), *Grappling* (t2402, 2403), *Investigation* (t2405), *Arcana* (t2401), *Message* (t2400, 2402),
  *Guidance* (t2342), "her blindsense" (t2399). Gemini: *Binding Ward* ×4, *Zone of Truth* ×2, *Arcane
  Lock*, *Mage Hand*, "abjuration", "cantrip". The sharpest case is t2402, where a skill is given a
  personality: *"Grappling earns its keep for once instead of just sitting on the sheet looking
  decorative."* There is no sheet in Varisia.

**Insight.** 5.1's discipline is that point of view is chosen and held. The engine mechanised *person* and
stopped there, but person is the cheapest half. A sentence that jokes about a character sheet has left the
world while every pronoun stays correct; the guard is measuring the one axis that did not move. 6.5 is the
second failure at t2419: the anti-lump rule keeps canon out of conversation, and here the *rules* entered
conversation instead — a spell menu wearing dialogue's clothes, which is the shape of a lookup rather than
a scene.

Set against this, the narratorial discipline in the ordinary turns is good and worth recording: interiority
is consistently hedged from outside (*"like she's turning the phrase over to check it for hidden clauses"*,
t2365) rather than entering another mind, and the corpus contains zero em-dashes across 22,023 words, which
is the STYLE tail's most reliably obeyed clause.

**Recommendation — S, two independent pieces.** (a) An action whose text begins `GM:` is unambiguously
out-of-character and should route to Table Talk, or at minimum be flagged rather than narrated — a UI/routing
change over an existing surface, not a prompt change. (b) Census capitalised mechanics appearing in cleaned
narration; the vocabulary is already enumerable from the capability and class bibles, so this is a list
intersection and costs nothing at runtime. File beside `registerSlips`. As with Findings 1, 3 and 6: measure
first, and let a note wait for the numbers.

**Settled:** second-person present narration is settled and is not challenged; the person guard is the
product ahead of the position, and this row is about the axes beside it.

---

## Reading it as a story

**Does the coda earn its length?** In scenes, yes. In turns, no — which is Finding 1.

The hundred turns have a real two-beat shape, which is 1.6's long rhythm and worth naming because nothing
planned it. Turns 2338–2346 are descent and delivery: the mountain behind them, a starving prisoner carried
down, a temple at four in the morning. 2347–2392 are release — bath, wine, furs, breakfast, an entire night
in which the largest question is whether the eggs get cold. 2393–2432 are a clean small arc with its own
rise: a magistrate's smudged seal, a spy in the scrub, a drop point, an ambush in a friend's cellar, an
enemy in irons. 2433–2437 fall back into release, and the last image of a hundred turns is a man pinned in a
bed by three sleeping wives while the world audibly gets on without him. That is a well-shaped coda. A
reader handed these turns as a chapter would not ask where the plot went.

**Where it lands.** The best material is not in either climax. It is at t2376–t2377, where a cleric admits
she cannot stop doing the arithmetic of her own life and then, offered a night off, takes it — the only
place in the corpus where a companion wants something the hero cannot simply give her. And at t2385, in a
chop-house, over bad chicory: *"I could get used to boring again. Might take practice."* That line is the
whole carrier-bag argument in eleven words, said by a character who spent the campaign as a weapon. The coda
also contains the corpus's best sentence, at t2378: *"For one whole morning, nobody in this room owes
anybody anything."* Le Guin's 4.2 asks whether the narration ever treats gathering as the event rather than
the interval between fights. Here it does, repeatedly, and the engine's own beat log records none of it
(Finding 6).

**What is unsaid.** Two things, one deliberate and good, one not.

The good one: the hero's release of Petrin Voss at t2411 is never explained. No one says why. Frizwick bets
five gold he runs to Sable, the hero bets ten he is too frightened to, and the party walks north. The
question is left standing and the coda never picks it up. That is 6.1's leaving-out done properly, and it is
the only place in a hundred turns where the prose trusts the reader with a silence.

The one that isn't: the marriage. A hero married to three women, sixteen explicit turns and forty domestic
ones, and no turn in the hundred contains a moment of friction between the three of them. Every offer is
accepted, every hand met, every question answered yes. The only jealousy in the corpus is a joke about a
breakfast seat (t2347). This is not a content objection — the explicit scenes are competently written,
consent is continuously signalled, and register is held: the surrounding prose does not change voice when the
scene does, which is harder than it sounds and is the right call. It is a craft observation, and it is the
same observation as Findings 1 and 6 wearing different clothes. Three people who each have a documented flaw
about withholding — Frizwick "defaults to concealment", Daeris "pulls the offer back", Morwen "treats
emotional acknowledgment as exposure" — go a hundred turns without one of those flaws costing anybody
anything. The engine holds those flaws in canon and injects them every turn. The coda's release is total,
and 1.6 says the long rhythm is *stress, release* — a release with nothing pushing back is not the second
beat, it is the absence of both.

**What the Le Guin lens would take from these hundred turns.** The name given at t2410 and spent at t2411 —
a stranger becomes a person by saying what he is called, the engine merges two records in the same breath,
and the hero lets him walk. Nothing in her craft books asks for that, because no novel needs the record to
agree with the scene. This one does, and it did.

---

## What changed from the harness pass

| First-pass claim | Status on the owner's play |
|---|---|
| **F1** — the bag/spear fork is model-dependent at equal prompt | **Weakened.** Both models write the bag here; gemini narrates the whole bathhouse arc — arrival, all sixteen explicit turns, the morning after — and sonnet narrates the interrogation. The fork tracks the *material*. The shape census remains worth building. |
| **F2** — gemini is the flat-rhythm model (SD 5.8 vs 9.7) | **Reversed.** SD 10.3 vs 11.1, gap inside noise; gemini's mean sentence is now the longer. Only the "You"-opening habit survives (70% vs 51%). A register-blind SD census would misreport. |
| **F3** — bans are lexical, habits are rhetorical | **Confirmed and extended.** 25 guard-catchable clerical words, 42 more the list misses, plus a per-model *frame* (23 instances, one model, zero in the other) no census would see. The unit should be the frame, not the vehicle. |
| **F4** — the name pools are a rhyme scheme | **Confirmed, and narrowed.** The rhyme shows in the older layer (Ashvane, Lorrath, Frizwick); the coda's GM-invented names are more varied. New hazard found: four V-names in one plot thread. |
| **F5** — the naming invariant is the best thing in the engine, but 3.2 is unclaimed | **Claimed.** t2410's merge-at-the-spoken-name, dramatised as consequence. |
| **F6** — the leaping works, 137 → 16 words | **Over-claimed.** That decay was a harness artefact. In real play: floor 110 words in 100 turns, r=0.014 against input length, `NO_CHANGE` turns at the window mean. |
| **F7** — Poughkeepsie in the pantheon (deity display strings) | **Untouched here** — no deity naming in this window. But the same failure appears one layer deeper: the *chapter summaries* run modern idiom at 15.7 per 1,000 words, eight times the narration rate, and chapters are immutable canon. |
| **F8** — the `leguin` dial contradicts the STYLE tail | **Untested.** This campaign runs a different dial. Still unexercised. |
| **F9** — second-person present, and the person guard | **Confirmed and bounded.** Zero person slips in 100 turns. But three wall breaks the guard cannot see (Finding 8). |

---

## Verification gaps

- **The two models did not narrate the same scenes.** Gemini has all sixteen explicit turns and the cellar
  ambush; sonnet has the road, the interrogation and most of the domestic dialogue. The per-model figures in
  the table are therefore *model plus material*, and Finding 2's whole point is that material moves them.
  What Finding 2 establishes is that the first pass's model attribution does not survive; it does not
  establish a clean new one. Only a matched-scene comparison could.
- **The leaping clause covers 22 of 100 turns.** Finding 1's headline numbers span the whole window,
  including 78 turns that ran before v1.784. The post-clause subset is small and single-model. The finding is
  stated with that split visible; a fresh 40-turn domestic sample at current version would settle it.
- **The register-guard scoring is a simulation, not a replay.** The 25 hits are what `registerScan`'s word
  list would have matched had it existed; the actual guard also fires a correction note that would have
  changed subsequent turns. The count is a ceiling on slips, not a prediction of the guarded run.
- **`minutesAdvanced` is a weak proxy for "little happened."** A zero-minute turn usually means the GM
  emitted no `TIME_ADVANCE`, not that the world stood still. The `NO_CHANGE` figures in Finding 1 are the
  stronger evidence and rest on only five turns, all inside the `tagLog_last40` window.
- **The `present` field is a retrieval set, not literal presence.** Karzoug, slain at t2331, appears in five
  coda turns; Sable appears in 31 before she walks on stage at t2421. No finding here rests on it. It is
  worth another lens's attention that the retrieved cast is dominated by combat-era figures (Face-Stealer
  ×18, Wounded Goblin ×12, Goblin straggler ×12) while the coda's actual people are retrieved once or twice
  (Ameiko ×0 by that name, Wyla Ashvane ×1, Attendant ×8).
- **The chapter list is truncated by design.** `memory.chapters` keeps ten live and archives the rest
  (memory.js:1549), so the five chapters in the fixture are the survivors, not the census. No claim is made
  about chapter cadence across the domestic stretch.
- **Sentence segmentation is regex-based.** Comparable across all files here because one pipeline produced
  them, and it reproduces the first pass's harness figures to within 0.6 words, but not publication-grade.
- **The modern-idiom and clerical-field counts use hand-built term lists**, so they are lower bounds on a
  fuzzy category, not exhaustive measurements. Both lists are in this review's numbers and can be re-run.
- **All three companions carry `want: null`** in the fixture's meta at t2437 while `COMPANION_AGENDA` tags
  fire at t2416, t2417 and t2418 and `buildAgendaAskNote` fires three turns running. That may be correct
  (owner ruling 2026-09-05: a want is never manufactured) or it may be a filing failure. It is outside this
  lens; recorded so another pass can check it.
- **The lens's own primary sources still have holes.** *From Elfland to Poughkeepsie* and *The Carrier Bag
  Theory of Fiction* were read through secondaries; the *Steering the Craft* point-of-view chapter — the one
  most relevant to a second-person game — was never obtained. See [`../leguin_lens.md`](../leguin_lens.md)
  §16.
