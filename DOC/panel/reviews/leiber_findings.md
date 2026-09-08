# Panel review — the Leiber lens on Traffic and Dragons

**Member:** the Leiber lens ([`../leiber_lens.md`](../leiber_lens.md)) — a rubric of Fritz Leiber's
documented positions, not the person, and not an impersonation. Every finding cites the entry it applies.
Grades: ● primary · ◐ secondary · ○ uncertain · ●ƒ his own fiction (evidence of practice, never a rule on
its own).

**Surfaces reviewed:** `DEFAULT_RULES` and `TONES`/`AUTHORS` (data.js), the STYLE tail and the whispers,
market, party-history, plot-armor and reckless note builders (api.js), the `[WHISPER:]`/`[SAY:]` handlers
(tag_table.js), and the contracts for prompt, quests, character, items and identity. Three play corpora at
v1.847, all twenty or fifty turns, read in full.

**Corpus measurements used throughout.**

| Corpus | Turns | Gold start → end | d20 outcomes | `[SAY:]` tags | `[WHISPER:]` filed |
|---|---|---|---|---|---|
| `dev/corpus_playtest_v1847_mature226_sonnet5.json` (forge vigil → departure) | 20 (t2098–t2117) | 9,634 → **9,632** | none rolled | 22 | 2 |
| `dev/corpus_playtest_v1847_mature226_gemini.json` (same fixture, took the fight) | 20 | 9,634 → **9,634** | **19 rolled, 19 passed, 0 failed** | 38 | 2 |
| `dev/corpus_playtest_v1847_sonnet5_344.json` (fresh campaign, Howard voice) | 50 | 40 → 75 | 18 rolled, 14 passed, 4 failed | 56 | 2 |

Live save for scale (Rise of the Runelords at v1.848): turn 2,437 · ≈30.1 days · Ammut, Half-Fey Rogue
[Arcane Trickster] Level 17 · **16,683 gold · 84 items** · 68 NPCs · **3 married companions, all living** ·
11 chapters · 138 story beats.

---

## 1. The whisper ring is the Lankhmar rumour-mill, and it is the most Leiberian machine in the engine

**Position applied:** 2.4 (◐/●ƒ — reputation in a city travels by mouth and arrives wrong; "Legends travel
on rainbow wings and sport gaudy colors"), 2.2 (● — a city is trades and specific streets), 1.5 (◐ — the
heroes are rogues whose fame is other people's business).

**What the game does.** `buildWhispersNote` (api.js:533) fires at a sized settlement every
`WHISPERS_EVERY` turns, hands the GM only the last five decisions, three finished quests and the newest
defining moment, and instructs: *rumour distorts, but never invents an event that did not happen.*
`[WHISPER:]` (tag_table.js:435) files it on a capped ring; `buildWhispersBlock` (api.js:555) serves the
newest three back framed as "what is SAID of them… hearsay, not what is true".

Measured, in all three corpora, unprompted-feeling and in character. Sonnet-5 t2099, the smith Wyla on how
her own street works: *"truth walks in one door and comes out six mouths later"*. Gemini t2113, Frizwick
reporting from the road: *"They gave us devil horns in the retelling."* And the fresh campaign gets there on
turn 9 without an engine note at all, a drover muttering behind the hero's back: *"By the time it reaches
Ashenveil it'll be twenty of us he killed bare-handed."*

**Insight.** This is the exact mechanism the lens would ask for and would not have expected to find: fame as
an *unreliable narrator held by the world*, not a reputation score. It also satisfies 2.2 — the whisper
carries occupations (dockhands, fish-gutters, horse-traders), which is what makes a city a city rather than
a hub. It is the sanctioned replacement for ledgers and it is doing the literary job, not just the
bookkeeping one.

**Recommendation — no change to the mechanism.** One observation for a later row rather than a change now:
the whisper is currently pure colour. In Leiber a garbled reputation *costs* — a price rises, a door shuts,
the wrong faction comes looking. Nothing reads `worldState.whispers` except the prompt block. Whether a
rumour should ever have teeth is a design question for the owner, not a defect.

**Settled?** No. Whispers-instead-of-ledgers is settled; extending them is open.

---

## 2. The man who named the genre is not in the voice bank

**Position applied:** 1.6 (◐ — "Anything I like as well as I do some of the Conan stories" — he took pulp
seriously as craft), 4.1–4.3 (◐ — mood ranging "from sombre introspection to broad comedy"; "an often dark
sense of humor"; Moorcock's "Melodrama and irony work very well together").

**What the game does.** `AUTHORS` (data.js:12–41) ships fifteen voices. Robert E. Howard is there
(data.js:24), Michael Moorcock is there (data.js:40), Glen Cook (data.js:26), Lovecraft (data.js:38), Poe,
Le Guin, Abercrombie. The `TONES` entry the whole product is named after — "Sword and Sorcery",
"Pulpy. Fast. Morally ambiguous." (data.js:4) — uses the phrase Leiber coined in *Ancalagon* #2 in April
1961 (lens 1.1 ●). He is the only author in the tone's own ancestry with no entry.

**Insight.** This is not sentimentality about attribution. The bank has no voice that *holds humour and
menace in the same scene*. Dinniman is "Be funny first" (data.js:18); Muir punctures the sublime with a
crude joke; Abercrombie has "a bleak joke in the grimmest moment" but forbids similes, lyricism and
grandeur. There is no entry for wry-and-eerie-at-once, which is the register the lens exists to describe —
and the corpus shows the gap: the gemini run is twenty turns of unbroken grandeur with not one wry line in
it, while the sonnet run's single best human moment is a joke (finding 5).

**Recommendation — S.** Add one `AUTHORS` entry: `{id:"leiber"}`, Fafhrd and the Gray Mouser — a `vc` that
asks for wry, ironic narration that never stops being frightening, concrete city sensory detail, dialogue
that is the texture, and one deflating human note inside each grand moment; a `contentDNA` built from the
sourced positions (the city as the adventure, sorcery practised by others at a price, unreliable patrons,
the take that never survives the story, companionship above every other loyalty). An `AUTHORS` entry
addition is explicitly on the safe-changes map (registry entries under a coverage guard), so this can ship
off-Fable. The author_voice_lab satellite is the right place to tune the `vc` before it lands.

**Settled?** The author-inspired voice feature is settled and this proposes no change to it — only a new row
in the table.

---

## 3. Sorcery is a priced utility, and the only clause in the codebase that says otherwise is scoped to one author's voice

**Position applied:** 5.2 (◐ — sorcery is practised by *others*; the Mouser's dabbling goes badly), 5.4
(◐/● — magic is transactional and the price is real), 1.3 (● — the supernatural element is *half* the
definition of the thing the game calls itself).

**What the game does.** The player's capabilities resolve through `capability_bible.js` with fixed
attributes — cost, range, targets, duration, save, dice — and `buildSpellBibleBlock` re-injects that canon
every turn so the GM cannot drift from it (items.md, capability_bible.js contract). The cost axis is mana.
The measured result, gemini t2115: *"Fey sorcery wraps cold around your skin."* Light bends; the runes do
not trigger; the party walks in. Across the same twenty turns: Flame Strike, Shadow Blade, Invisibility,
Silence, a holy blind — every one a reliable instrument, every one succeeding (finding 6).

Meanwhile the sharpest statement of the lens's own position that exists anywhere in this repository sits in
one author's `contentDNA` at data.js:25: *"Ancient sorcery is always malevolent and beyond mastery; never
make it a safe tool for the player to wield."* That is Howard's row. It applies only if the player picked
Howard.

**Insight.** The Sword and Sorcery `TONES` entry already declares magic "Dark, transactional" (data.js:4)
and its `vc` says "Magic is dangerous and tempting" — but a `vc` is prose direction, not a content rule, and
nothing downstream enforces it. So the tone promises the second half of Leiber's definition and the
capability system quietly delivers a spell list. This is not an argument for nerfing spells; the mana
economy is a fine resource system. It is an argument that *unearned* sorcery — a bargain, a borrowed power,
a thing an adept does that the hero cannot — has no channel at all.

**Recommendation — M, and it is a Fable task.** The cheapest honest version: give `TONES` a `contentDNA`
field parallel to `AUTHORS`, so a tone can carry content rules and not only prose direction, and let the
Sword and Sorcery row carry the sorcery-has-a-price clause. That makes the promise the tone already prints
on the wizard screen actually reach the GM. It touches `buildSysPrompt` and the stable/volatile split, so it
is drift surface: a critical review before any code, plus stable-half byte-identity for campaigns whose tone
carries no `contentDNA`.

**Settled?** No.

---

## 4. Twenty turns moved the purse by two gold, and nothing in the engine can make a hero poor

**Position applied:** 6.1 (◐ — poverty is the recurring motive), 6.2 (●ƒ — "Aye, there's the bitter core of
all freedom: no pay!"), 6.3 (◐/●ƒ — the take rarely survives the story), 6.4 (● — "Gold and glory drive
action" is the tone's own text at data.js:4).

**What the game does.** `buildMarketNote` (api.js:564) asks a sized node for `[WARES:item|price|note]`
priced *"at VALUE, never the party's purse"* — a genuinely good rule, and a **supply** mechanism. There is
no demand side. A repository-wide search of data.js and api.js for upkeep, carousing, theft or
pickpocketing returns nothing; the only match for "upkeep" is the location-tag rule (data.js:128), which
uses the word for bookkeeping. The DEFAULT_RULES currency clause (data.js:114) explicitly makes everything
under one gold piece *scene colour, never a transaction*.

Measured: the sonnet-5 mature run moved 9,634 → **9,632** across twenty turns, the entire two-gold delta
being a meal. The gemini run — same fixture, three stone giants killed, an ancient gold-plated city entered
— moved 9,634 → **9,634**: zero. The fresh campaign, where money still means something, went 40 → 75. The
live save stands at 16,683 gold and 84 items.

The one moment in sixty turns where money creates a scene is the fish stall, sonnet-5 t2115: *"Six coppers a
stick. Extra for the story, if it's a good one."* Six coppers is below the tracking floor. The best economic
beat in the corpus is, by rule, not an economic event.

**Insight.** This is the lens's strongest structural finding and it is not a plea for poverty. Gold here is a
**ratchet**: it can only go up, so by mid-campaign it has stopped being a motive and become a score. A hero
with 16,683 gp cannot be hired, cannot be tempted, and cannot be threatened with ruin — which removes one of
the two things the tone's own `vc` says drives action. Note that the market layer already knows how to price
at value; the missing half is anything that *spends*.

**Recommendation — M.** Not an upkeep tax; that is administration, and data.js:110 rightly forbids the
genre from becoming one. The Leiberian form is that the take is *lost in the story*: a fence takes a cut, a
patron demands tribute, a bribe opens the only door, the hoard was cursed or counterfeit or has an owner who
wants it back. The engine-shaped version is one note builder in the `NOTE_BUILDERS` family — a rare,
cooldown-gated ask, fired when the purse crosses a level-scaled threshold, inviting the GM to put the money
*at stake in a scene* rather than deducting it. Drift surface (prompt assembly), therefore Fable, therefore
a critical review before code and a design fork for the owner: is a ratcheting purse a defect or a
deliberate reward?

**Settled?** No. Inventory size is settled; the gold ratchet has never been ruled on.

---

## 5. The word "banter" appears twice in the whole engine, and both times it is forbidden

**Position applied:** 3.3 (◐ — the two talk constantly, and the talk is the texture), 4.1 (◐ — mood ranges
to broad comedy), 4.2 (◐ — the humour is dark and character-based, not relief bolted on).

**What the game does.** `grep -c banter` returns exactly one hit in data.js and one in api.js. Both are
prohibitions: CANON IS NOT CONVERSATION forbids dropping campaign-spine names "into idle banter or narrator
asides" (data.js:131), and the parallel-arc pacing note forbids the same for arc hooks (api.js:2317). Both
rules are correct and should stay — they exist because the GM was leaking unlearned canon through casual
talk. But the engine has no counterweight: no rule anywhere *asks* for wit, an exchange between two
companions, or a joke inside a dangerous scene. The STYLE tail (api.js:2221) legislates em-dashes, sentence
length, age flourishes and clerical metaphor, and says nothing tonal at all.

Measured. `[SAY:]` compliance is excellent — 22, 38 and 56 tagged lines across the three corpora, so
dialogue is plentiful and correctly attributed. What is scarce is dialogue *between companions*, and humour
in either direction. The gemini run's twenty turns contain not one wry line. The sonnet run contains one,
and it is the single most alive moment in the corpus — Frizwick at t2117, greeting a husband who went for
food and came back late: *"Finally. I was starting to think you'd married the fish woman too."*

**Insight.** That line is doing everything the lens says the mode needs: it is funny, it is at the hero's
expense, it establishes three relationships in twelve words, and it sits four sentences before the party
rides toward a wizard-king. It arrived by luck of the model, not by rule. Moorcock's judgement on the whole
tradition (lens 4.3 ◐) — melodrama and irony holding the tonal equilibrium — is the argument for making it
reachable on purpose.

**Recommendation — S.** One clause, in the tone or voice layer rather than DEFAULT_RULES (which is already
heavy): companions may speak to *each other*, not only to the player, and a scene may carry one deflating or
wry note without lowering the stakes. Pair it with finding 2 — a Leiber `AUTHORS` entry gets this for free
inside its own `vc`, and shipping the entry first is the cheap, off-Fable way to test whether the register
is even wanted before touching a shared prompt surface.

**Settled?** No.

---

## 6. Nineteen rolls, nineteen successes — and no rule anywhere permits the party to be outmatched

**Position applied:** 4.5 (◐ — the comedy is frequently at the heroes' expense; they are ridiculous as often
as formidable), 7.5 (◐ — death is not the only exit: cheated, marooned, captured, transformed), 1.5 (◐ —
his heroes fail often).

**What the game does.** DEFAULT_RULES gets this right at the level of intent: DRIVE THE ADVENTURE says
antagonists "scheme, ambush, resist, and fight… The player can fail, bleed, and lose; death must remain
possible" (data.js:108), and the STYLE tail closes with "Death is possible." (api.js:2221). The plot-armor
note (api.js:549) already carries an exemplary graded-exit ladder — *for foes*: the body never found, a leap
over the railing, a capture alive, and it must **cost** them something the player takes.

Measured, the gemini mature run: 19 d20 outcomes across turns 2105–2117, **19 successes, zero failures**,
covering perception, stealth, a Flame Strike, four attack sequences against stone giants, a cliff ascent and
an infiltration of a wizard-king's sanctum. Hit points went 76/96 → 110/110 — the hero ended the fight
healthier than it started. The fresh campaign at Level 1 is honest by comparison (14 of 18 passed, four
failed, one of them a saving throw the hero ate on-screen at t6). The failure rate is not a model problem;
it is a level-17 problem, and nothing in the prompt notices.

A search of data.js and api.js for `flee`, `retreat`, `outmatched` or `overwhelm` returns **zero** matches
outside the foe-side plot-armor code. The engine knows how to let an *enemy* break and run. It has no
vocabulary for the party doing so.

**Insight.** Leiber's heroes run away constantly, and it is never cowardice — it is the pacing. A world where
the party has never once been the weaker side is a world where the sorcery in finding 3 is safe, the gold in
finding 4 is never at risk, and the comedy in finding 5 has nothing to puncture. Note the connection: the
graded-exit ladder the engine already wrote for foes is the exact remedy, pointed the other way.

**Recommendation — M, partly settled.** The death walk, plot armor and model-narrated dice are all settled
and this proposes changing none of them. What is *not* settled is whether the GM is ever told that a fight
may be unwinnable and a retreat is a legitimate, non-punitive outcome. The smallest honest version is one
sentence in the same rule that already promises failure (data.js:108): some encounters are beyond the party,
and withdrawal — losing the ground, the prize, or a companion's freedom — is a real ending, not a failure
state. Prompt surface, so Fable.

**Settled?** Partly. Dice narration, the death walk and plot armor are settled; the missing retreat
vocabulary is open.

---

## 7. Three wives, no widower — loss is recorded as a relationship-axis edit, not as an alteration to the character

**Position applied:** 7.1 (◐ — the saga's engine event is a double bereavement both heroes carry for
decades), 7.2 (●ƒ — "Revenge is empty. It cannot bring back the dead."), 7.3 (◐ — grief is compatible with
going on, funnier and darker both), 8.2 (◐/●ƒ — a lover is a hostage to fortune).

**What the game does.** Bonds are first-class and well-engineered: DURABLE BONDS ARE MUTUAL (data.js:119)
requires both directed axes in the same response and calls a one-sided spousal bond "a bug".
`buildPartyHistoriesBlock` (api.js:587) feeds each companion's authored backstory, trait, flaw and
motivation into every turn, and #330/#347 lets a want grow only from lived history. The lens applauds all of
this: it is exactly position 3.4, companions who are someone the story is about.

The live save records three companions the hero has married, all living, at turn 2,437. Companion death is
mechanically possible — `[PARTY_MEMBER:name|false]` and the death propagation at a combat close handle it.
What does not exist is any machinery that treats a *loss* as a permanent alteration. A death removes a party
row and edits a relationship axis. Nothing in the prompt tells the GM that a bereavement is a thing the
character now carries into every subsequent scene the way a level or an item is carried. The corpus's own
closing line is the tell — sonnet-5 t2113, the hero leaving for the mountain: *"gather your wives and your
steel and walk out to meet it."* Wives and steel occupy the same grammatical slot: things you take.

**Insight.** The lens is careful here, per its own §0.5 caution: it must not recommend that a companion die
to make better fiction, and it does not. The finding is narrower and it is real — the engine has a rich
vocabulary for bonds forming and none for bonds *ending badly*. Core memories and defining moments are the
nearest existing hook, and a bereavement is precisely what they are for.

**Recommendation — no change, recorded as dissent, with one XS observation.** If a companion dies, does
`detectCoreMoments` treat it as a defining moment automatically? If it does, this finding is already
answered and should be closed with that evidence. If it does not, an XS entry in that detector is the entire
remedy, and it costs the prompt nothing. Verify before acting.

**Settled?** Adjacent to settled rulings (no convalescence; the death walk; plot armor). Nothing here asks
to change any of them.

---

## 8. NEVER ADMINISTRATIVE is Leiber's own instinct written as engineering — and the ban is doing real work, with one measured slip

**Position applied:** 10.5 (◐ — sorcery, treasure and menace are what a scene is for), 1.1 (● — the
definition fixes the culture-level and the supernatural element), 9.5 (●/◐ — "To merit serious
consideration, fiction must convince the reader").

**What the game does.** DEFAULT_RULES contains the single most on-point rule in the codebase for this lens
(data.js:110): *"NEVER ADMINISTRATIVE — this is sword and sorcery, never a clerical simulation."* It names
paperwork, ledgers, deeds, probate and wages, and it does the harder half too — it carves out the
*supernatural* legacy as prime quest material, "an inheritance of danger, not of paperwork". The STYLE tail
enforces the same at the image level: no ledgers or bookkeeping as metaphor, "this world keeps no books.
Debts are blood, oaths, hunger and memory." (api.js:2221). The whispers system (finding 1) is the sanctioned
replacement.

Measured, the ban mostly holds — and where it slipped, the harness caught it. The sonnet-5 corpus metadata
records exactly one register slip in twenty turns: `{turn:2102, word:"ledger"}`, in the prose *"strikes
itself from the ledger of things still in your pack."* Worth noting alongside it, in the same two turns, a
different and larger breach of a different rule: t2100 opens *"The engine flags nothing to charge, no
matching item, no wares to touch"* and t2102 *"The engine's own note settles that one"* — the engine's
internal vocabulary narrated in second person, against data.js:111 ("Never break character"). Both occurred
while the player was spamming a consumable the engine had already zeroed, so the nudge machinery was firing
into a degenerate loop.

**Insight.** The lens's verdict on the rule itself is unqualified approval — it is the clearest statement of
position 10.5 in any document reviewed, and it is enforced at two levels (content and image) with an
automated detector behind it. The observation for the record is that the *engine-speak* leak has no
equivalent detector: `registerSlips` scans for clerical vocabulary but nothing scans for the words "engine",
"note", "tag", or "the system" appearing in narration, and that is a louder immersion break than "ledger"
was.

**Recommendation — no change to the rule. XS on the detector.** Extend the corpus register scan the harness
already runs to flag engine-vocabulary leaks alongside clerical ones. That is a `dev/` test addition —
always legal off-Fable — and it turns a thing found by reading twenty narrations by hand into a thing the
playtest audit reports by itself.

**Settled?** Ledgers-banned-as-a-story-device is settled and this finding endorses it.

---

## What the Leiber lens would actually take from this game

1. **The whisper ring.** A hearsay layer that distorts but cannot invent is a better reputation system than
   any number, and it is the single design here that would have been at home in Lankhmar.
2. **`[SAY:]` attribution plus authored party histories.** Making every spoken line belong to a named,
   present, back-storied person is how a solo second-person frame can still grow a *pair* — which is the
   thing he would most have doubted was possible.
3. **NEVER ADMINISTRATIVE, and the ledger ban behind it.** A production rule that names the failure mode of
   its own genre and enforces it at both the plot and the metaphor level is craft, not housekeeping.

## Verification gaps

- **"Fafhrd and Me" was not read first-hand,** nor the *Ancalagon* letter in full, nor Moorcock's Leiber
  chapter, nor the Platt *Dream Makers II* interview. Positions 3.x, 4.x and 8.x rest on the critical record
  and on fiction, which is why none of them carries a ● alone. Findings 2, 5 and 7 would be strengthened or
  falsified by any of those four documents.
- **Every ●ƒ fiction quotation reached this review through Wikiquote,** whose rendering the fetch tool
  truncates at 125 characters. Do not reproduce any of them in a shipped document without checking a copy of
  the books.
- **Finding 7 is unverified in the code.** Whether `detectCoreMoments` already treats a companion death as a
  defining moment was not checked; the recommendation is explicitly gated on that check.
- **Findings 3, 4 and 6 are inferred from twenty-turn windows,** two of them from the same fixture. The gold
  ratchet is corroborated by the live save (16,683 gp); the roll-success rate and the sorcery-as-utility
  reading are not, and both deserve a wider sample before anything ships. A fifty-turn mature-save corpus
  would settle all three.
- **No measurement of companion-to-companion dialogue was taken.** Finding 5 counts `[SAY:]` tags in total,
  not by addressee. A speaker-pair histogram over the existing corpora would turn that finding's central
  claim from an impression into a number, and costs nothing to compute.
- **The lens has no standing on the dice, the clock, the XP curve or item pricing** and made no
  recommendation on any of them. Those belong to the Gygax lens.
