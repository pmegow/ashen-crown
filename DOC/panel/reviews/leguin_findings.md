# Panel review — the Le Guin lens on Traffic and Dragons

*This is a rubric of documented positions, not the woman. Every entry below cites
[`../leguin_lens.md`](../leguin_lens.md) by number and confidence, and every claim about the game is
measured: a corpus turn with a short quotation, a computed statistic, or a rule at file:line.*

**Surface under review:** prose voice — the STYLE tail (api.js:2221), the register and antiquity guards,
`DEFAULT_RULES` (data.js:105–133), the `AUTHORS` dials (data.js:12–42), the name pools (data.js:235) and
`DEITY_MAP` (data.js:141).

**Corpus.** 90 narrations read, all three v1.847 corpora:
`dev/corpus_playtest_v1847_mature226_sonnet5.json` and `..._mature226_gemini.json` (20 turns each, the same
`testRuns/fixtures/todo-226-mature-t2097.tnd` save, turns 2097–2117, two models) and
`dev/corpus_playtest_v1847_sonnet5_344.json` (50 turns, fresh campaign). **All three run the same voice
dial** — the mature fixture carries `"proseAuthor":"howard"` and so does the fresh campaign — so every
difference below is between *models*, not between dials. Statistics are computed on narration only; the
suggestion tail and the dice readout are stripped.

| | sonnet-5 (mature) | gemini-3.7 (mature) | sonnet-5 (fresh) |
|---|---|---|---|
| words / turn | 106 | 142 | 166 |
| mean sentence | 15.1 w | 13.5 w | 19.4 w |
| **sentence-length SD** | **9.7** | **5.8** | **12.9** |
| longest sentence | 42 w | 28 w | 72 w |
| similes (`like` / `as if`) per 1k words | 3.8 | 4.2 | 6.5 |
| turns opening "You…" | 11 / 20 | **17 / 20** | 28 / 50 |
| combat turns | 0 | 5 | 8 |
| **violence-verb buttons** | **0 / 80 (0%)** | **25 / 64 (39%)** | 22 / 165 (13%) |
| register slips logged | 1 (`ledger`, t2102) | 0 | not logged in this run |

---

## Finding 1 — The bag and the spear are the same save, two turns apart

**Position applied:** 4.1 "The reduction of narrative to conflict is absurd" (◐); 4.3 the hero story as a
displacing shape (◐); 4.2 the container as the untold story (◐).

**What the game does.** Both mature corpora start from the identical fixture at turn 2097, with identical
prompt, rules and STYLE tail. Sonnet-5 spends all 20 turns inside one container: a night at Wyla's forge,
hunger, a friend's last hard bread, a rumour crossing the docks, a farewell, a fish stall at dawn. Zero
combat turns, and **zero of its 80 suggested actions carry a violence verb**. Its best line is a piece of
pure carrier-bag observation — t2099, Wyla on gossip: *"truth walks in one door and comes out six mouths
later wearing somebody else's coat."* **This is the Conan dial**: `proseAuthor` is `howard` throughout, and
it still produced a domestic night of bread and bellows — the dial does not determine the shape. Gemini-3.7,
on the same dial and the same save state, is riding out the North Gate by
t2101, ambushing a giant patrol by t2107, and standing in Karzoug's throne sanctum by t2115. **39% of its
buttons carry a violence verb**; t2110 alone lands five damage rolls.

**Insight.** The three suggested actions are the strongest statement this game makes about what a story is,
and they are the only part of the prose the player is *guaranteed* to read. The engine already counts
register slips; it counts nothing about shape. The finding is not that gemini is wrong — it is that the
carrier-bag/spear fork is **model-dependent at equal prompt**, measurable in one line of regex, and
currently invisible. The product's own artifact argues for the bag: 68 NPCs, 11 chapters, three marriages,
138 beats — 4.5's "medicine bundle" is a better description of the live save than of any single turn in it.

**Caveat, stated plainly.** The comparison is not clean. The sonnet harness alternated a forced no-op
("use my travel rations") into half its turns, holding the scene still; and its window is the tail of a
long crafting sequence, where the spear was legitimately not due. Gemini's window is a march to a boss.
The *rate* difference is real; the causal share owed to the model rather than the window is not established.

**Recommendation — S.** Add a **shape census** to the existing observer pattern: on each turn, count how
many of the three rendered suggestions lead with a violence verb, and expose the trailing-40-turn share on
the #17 drift-health readout beside the register-slip line. Read-only measurement, no prompt change, no
verdict — it simply makes the fork visible. (Any *note* built on it would touch the prompt and is Fable-tier.)

**Settled:** no.

---

## Finding 2 — The voice the owner plays for its writing is the one with the flattest rhythm

**Position applied:** 1.4 "the rhythm of prose depends very much on the length of sentences" (◐); 1.6 the
two-beat stress/release pattern (◐); 1.3 "Pace and movement depend above all on rhythm" (●).

**What the game does.** On the same save and the same `howard` dial, gemini's sentence-length standard deviation is **5.8** against
sonnet's **9.7**; its longest sentence in 2,845 words is 28 words, and **17 of its 20 turns open with the
word "You"** (sonnet: 11 of 20). Its content vocabulary concentrates hard: *iron* appears 20 times in 1,973
content tokens, *black* 10, *basalt* 9, *jagged* 7. Its similes are one device in five costumes — t2108
*"You vault the crest like a starving panther"*, then a stalking lynx, a hunting cat, t2113 *"Frizwick
mirrors your stride, moving like a phantom"*, t2116 *"like a mountain ghost"* — five predator-or-wraith
similes for the single act of moving quietly.

**Insight.** This is a metronome, and a metronome is the specific failure 1.6 names: stress with no release.
It is also, on the eye, *good* prose — clean, propulsive, never clotted, never a run-on, zero em-dashes,
zero register slips. That combination is exactly 11.1: *"the most conventional, banal prose, if the writer
has the gift."* The gift here is continuity and momentum; the flatness is invisible while you are inside it
and obvious the moment you measure it. The owner's preference for this voice is settled and the lens does
not argue with a reader's ear — but "it reads well" and "it varies" are different claims, and only one of
them is currently checkable.

**Recommendation — S.** Extend the same census as Finding 1 with **sentence-length SD per model per 40
turns**, recorded in the playtest corpus `meta` and surfaced in the audit template. It costs nothing at
runtime and turns a taste argument into a comparable number across future model sweeps. Do **not** add a
STYLE clause about sentence variety on this evidence alone — the STYLE tail is drift surface and already
carries a length instruction that is working (Finding 6).

**Settled:** the gemini preference is settled (owner ruling 2026-08-17, voice continuity outranks recovery
speed). The measurement is not.

---

## Finding 3 — The bans are lexical; the habits are rhetorical, and only the lexical ones are caught

**Position applied:** 1.7 repetition as deliberate structure, not accident (◐); 6.4 "Listing is not
describing" (◐); 7.1 the sentence must embody the thing (●).

**What the game does.** The register guard works exactly as designed. `registerFile` (api.js:687) scanned
t2102's narration, found *"finally strikes itself from the ledger of things still in your pack"*, filed the
slip, and `buildRegisterNote` (api.js:696) fired the one-shot correction on the next turn. `meta.registerSlips`
records it. That is a clean, closed loop on one word.

Every other prose ban is unmeasured, and the corpus shows each of them slipping:

- **The antiquity ratchet.** api.js:2221 forbids comparative age as a flourish. Sonnet t2113: *"The mountain
  is waiting. It has been waiting for ten thousand years."* — legal under the rule's own carve-out (an age
  stated plainly). Four turns later, t2117: *"a mountain's ancient patience waiting somewhere past the edge
  of every map you own."* The *word* was avoided; the *gesture* was not. Gemini t2114 does it too: *"He has
  had ten thousand years to prepare for dying."*
- **The no-repeat rule.** data.js:112 forbids reusing *"a specific detail, phrase, number, or image"* and
  says to *"reach for a completely different sense or device next time."* In the fresh Howard run the sigil
  is *"a coiled shape like a snake swallowing its own crown"* (t9) and then *"a shape like a snake eating a
  crown"* (t24); the crowd *"rises and breaks like surf"* (t28) and later *"breaks like a wave over the
  pit"* (t44). Gemini repeats *iron* 20 times in 20 turns.
- **Clerical imagery.** The fresh run at t37 writes *"a wiry man with ink-stained fingers and a ledger of
  names shouted rather than written"* — the image negated in the same clause, but reached for all the same.
  That run's `meta` carries no `registerSlips` field at all, so nothing recorded it.

**Insight.** A ban on a word catches the word. It does not touch the *reach* — the model's preference for a
particular rhetorical move, which simply re-dresses. This is the same lesson the register guard itself was
built on and it generalises one step further than it has been taken. 1.7 is the discriminator the engine
needs: repetition is not the enemy, *unearned* repetition is, and the difference is whether a callback came
from the memory stack or from the model's thesaurus.

**Recommendation — M, Fable-tier.** A second census on the proven `registerFile` shape: over a trailing
window of narrations, flag (a) any content word above a frequency threshold, (b) a repeated simile vehicle,
(c) a repeated figure-structure (age comparison, animal-motion simile). File to a ring like `registerSlips`,
surface on the drift-health readout, and *only then* consider a one-shot note. Measurement first; the note
touches the prompt and inherits the full drift-surface protocol.

**Settled:** the clerical ban and the antiquity ban are settled owner rulings. This finding does not touch
either; it argues their enforcement stops one level too shallow.

---

## Finding 4 — The name pools are a rhyme scheme, and the prompt tells the GM to keep rhyming

**Position applied:** 3.3 the mock-fantasy name as the giveaway of fake Elfland (◐); 2.1 the trappings are
not the imagining (◐); 3.1 the name is the thing (◐).

**What the game does.** `NAMES` (data.js:235):

- **gnome: 39 of 40 names end in `-wick`** — Drixwick, Alwick, Fimwick, Bilwick, Sprockwick, Buzzwick,
  Dazzwick, Clipwick… The single exception is Cogwhistle.
- **elf: 32 of 50 end in `-ndel` or `-ndra`**; 38 of 50 contain `ind`, `iel` or `rel`.
- **dwarf: 42 of 50** end in one of `-un / -in / -ak / -ik / -ur`.
- **surnames:** `-wick` ×7, `-rath` ×5, `-vane` ×5, `-moor` ×4.
- **"other"** (the hollow-born / grim pool) is 50 ordinary English nouns of gloom — Void, Ash, Scar, Bale,
  Spite, Gloom, Dread, Murk — with two duplicated (*Murk*, *Brand*).

And the loop closes at data.js:115: when no offered name fits, the GM is told to *"invent a thematic one in
the same style as the provided pool."* The uniformity is not merely present, it is instructed to reproduce.

In the live save this matters: one of the three companions the hero has married is named **Frizwick**.

**Insight.** 3.3 is the Elfland test applied to the one surface where this game generates its own language.
An "other" pool of English abstract nouns fails it outright — those are not names in a world, they are
adjectives with capital letters, and they would read identically in Poughkeepsie. A gnome pool with one
phoneme is worse than a short pool: every gnome the campaign will ever meet is audibly the same person, and
after 2,437 turns the player has married one of them. This is also, unusually for this file, a **cheap**
fix: name pools are registry data, the shape is guarded by the naming clause, and the change is entries only.

**Recommendation — S.** Rebuild the pools so each ancestry carries **three or four distinct phonological
families** rather than one suffix, keeping list length. Replace the "other" pool's bare English nouns with
names that *derive* from them rather than being them. Under the safe-changes map this is registry entries
with an existing coverage guard — legal off-Fable, one line in the off-Fable log.

**Settled:** no.

---

## Finding 5 — The engine already believes in true names, and that is the best thing in it

**Position applied:** 3.1 "All things have a name" / naming as identity (◐); 3.2 "Who knows a man's name,
holds that man's life in his keeping" (◐); 9.1 the world must be consistent because nothing else holds it
up (◐).

**What the game does.** `buildNamingClause` (identity.js:1785) opens the stable prompt with: *"the same name
IS the same entity, permanently, and a reused name writes into the existing file."* data.js:115 gives the
prose-side law — never switch between a short form and a full name, *"that splits one character into two"* —
and provides `[NPC_ALIAS:]` and `[NPC_MERGE:]` as the sanctioned rites for a name that changes or a stranger
who turns out to be someone. Presence, death gating and the relationship axes all key off the same string.

**Insight.** This is Earthsea's law of naming implemented as a data invariant, and it was arrived at from
the engineering side, not from the literary one. It is also the concrete form of 9.1: in a world with no
borrowed reality, consistency *is* the world, and the name is where consistency is enforceable. The lens
records this as the place where the product is ahead of the position rather than behind it.

**The unclaimed half.** 3.2 is about *consequence*: holding a name is power. Here a rename is a bookkeeping
event — the merge is narrated as a reveal, but the engine's own conviction that the name is the person never
surfaces in the fiction. In a game whose engine genuinely believes this, an NPC guarding their name, or a
name given as trust, is a story the mechanics would back for free.

**Recommendation — no change.** Protect the invariant; it is load-bearing. The 3.2 idea is a design note for
a future row, not a defect.

**Settled:** n/a.

---

## Finding 6 — The leaping works, and the corpus proves it turn by turn

**Position applied:** 6.1 "what you leave out is infinitely more than what you leave in" (◐); 6.2 leaping as
a revision act a live writer cannot perform (◐); 1.8 the sentence owes the next one (●).

**What the game does.** The STYLE tail (api.js:2221) carries the leaping instruction in plain words: *"When
nothing much has changed since the last response, write LESS: a short reply is the right reply when little
happened, and length is never a virtue in itself."* The sonnet mature run is an accidental controlled
experiment on exactly that, because the harness fed the same dead action ten times. Word counts on the
repeated no-op, in order:

**137 → 96 → 75 → 82 → 74 → 39 → 47 → 16 → 62 → 89**

By t2108 the GM is writing 39 words; at t2112 it is down to sixteen — *"The pouch is still empty."* plus one
clause. The rebound to 62 and 89 is honest: by then the bracelets were finished and the party was leaving,
so the world *had* changed. Meanwhile the same run's live turns run 140–217 words. The model is not writing
short; it is writing short **when nothing happened**, which is the instruction.

**Insight.** 6.2 says leaping is a revision operation and a live GM has no revision pass. This engine's
substitute is the prompt tail, and on this evidence it is doing the job a revision pass would do. That is a
genuine craft result and it is worth naming, because most of the prose surface is prohibitions and this one
is a positive instruction that measurably lands.

The counter-observation belongs here too: 6.3, *"There's got to be white space around the word, silence
around the voice."* Every one of those sixteen-word turns is immediately followed by four buttons and a
speaker glyph. The engine can write the silence but the UI never lets it stand.

**Recommendation — no change** to the prose rule; it is working and it is drift surface. The 6.3 observation
is a UI note: a very short turn is a deliberate beat, and rendering it identically to a 200-word turn spends
the beat. Worth a row, not a fix here.

**Settled:** n/a.

---

## Finding 7 — Poughkeepsie in the pantheon

**Position applied:** 2.1 the trappings without the imagining (◐); 2.2 "you are not at home there" (◐);
3.3 the transposition test (◐).

**What the game does.** `DEITY_MAP` (data.js:141) supplies every deity-centric character's default god from
our world's pantheons: *Apollo, God of the Sun, Healing and Prophecy*; *Athena, Goddess of Wisdom, Law and
the City*; *Thor, God of Thunder and Strength*; *Set*, *Tyr*, *Hecate*, *Yemoja*, *Cernunnos*, *Tiamat*,
*The Morrígan*. This is TODO #362, an owner ruling dated 2026-09-07 — the day before this review — replacing
a published RPG's roster with domain-and-alignment analogs drawn from real cultural pantheons.

**Insight.** The ruling solved a real problem and the analog mapping is careful work. But by 3.3's test it
trades one borrowed roster for another: a player who knows what Athena is brings all of it through the door
with them, and the world does not get to say what its own gods are. 2.2's point is precise here — Elfland
must not be home, and Apollo is home. Note also that the character sheet and the deity-drift nudge match on
these exact strings, so the fictional surface and the engine key are currently the same object.

**Recommendation — XS.** Keep the ruling and the mapping exactly as they are; give each entry an **in-world
epithet as the display string** while the pantheon name stays as the designer-facing analog in a comment —
"the Sun's Physician", "the Crow Mother", "the Oathkeeper". The domain-and-alignment logic, the drift nudge
and the analog documentation all survive unchanged; only the name the player reads becomes the world's own.
If the string is load-bearing for the nudge match, the epithet ships as a display field beside it.

**Settled:** the *source* of the pantheon is a fresh owner ruling and is not challenged here. The dissent is
narrow and about the display string only.

---

## Finding 8 — The Le Guin dial is a caricature of the Le Guin positions

**Position applied:** 11.3 the assumption of a right to speak for others without earning it (●); 6.1 leaving
out (◐); 2.7 pastiche as exploitation (◐); and the STYLE tail's own antiquity ban.

**What the game does.** data.js:22, the `leguin` voice: *"Develop ONE quiet extended metaphor across the
scene… Mythic, timeless tone."* Both halves argue against the documented positions. An extended metaphor
per scene is a **mandate to decorate**, where 6.1 and 6.4 ("Listing is not describing") are mandates to
subtract; and a "timeless tone" is precisely the age-register the STYLE tail bans nine lines later in the
same prompt (*"NEVER use comparative age as a flourish… no 'older than memory / names / language / time'"*).
The dial and the tail are asking for opposite things in one system prompt.

The same pattern is visible in the dial that *was* exercised. `howard` (data.js:24) says *"ONE vivid image
per sentence, never stacked clauses"* and then, three clauses later, *"Bold and a little grandiose… keep it
relentlessly propulsive."* Under that dial the fresh run reaches **6.5 similes per 1,000 words, 9.6% of
sentences over 35 words, one sentence of 72 words, 1.51 commas per sentence** — with stacked pairs in a
single breath (t28: *"like fists on flesh, like bodies meeting stone"*). The behaviour clause says one
image; the tone clause says grandiose and propulsive; the tone wins. The two mature runs on the same dial
sit far lower (3.8 and 4.2 similes per 1k), so the dial is not *forcing* the crowding — it is failing to
prevent it, which is what a contradicted instruction does.

**Insight.** 11.3 is the honest form of the de-branding row (TODO #104): the objection is not the trademark,
it is that a name is a **claim** and a behaviour is not. "Le Guin" asserts a right to a voice; "short
declarative sentences, one sense per beat, never name the emotion, leave the last thing unsaid" asserts
nothing and is also a far better instruction, because a model can check itself against it. De-branding is
therefore not a legal chore — it is the change that would make the dials work.

**Recommendation — S.** When #104 rewrites the dials, rewrite them as **checkable behaviours, not tones**.
Concretely for this entry: replace "Mythic, timeless tone" and "ONE quiet extended metaphor" with sentence
and sense constraints (short declaratives; one sense per beat; no named emotion; end the scene one sentence
earlier than feels right). Audit every dial for a tone clause that contradicts the STYLE tail — the
`leguin`/antiquity collision is unlikely to be the only one.

**Settled:** the author-voice feature is settled. Its de-branding is an open row and this finding feeds it.

---

## Finding 9 — Second-person present is a flashlight, and the memory stack is the lamp behind it

**Position applied:** 5.2 present tense as *"a narrow beam flashlight in the dark, limiting the view to the
next step"* (◐); 5.1 point of view must be chosen and held (◐).

**What the game does.** api.js:2169 declares *"vivid second-person prose"* and api.js:2243 fixes the person
(*"second person — 'you' is [name]; companions are third person by name"*). **Tense is never specified
anywhere in the prompt** — all three models converge on present tense unprompted. The POV *person* is
guarded properly: `personDriftDetect` (api.js:1613) arms only on two consecutive third-person responses that
name the hero in narration rather than dialogue, a discrimination the comment records as taking the
false-positive rate to zero on a 1,663-response campaign where 2.8% of responses lack second person.
Narratorial discipline in the corpus is good: only 8 interiority constructions in 50 fresh turns, and nearly
all correctly hedged from outside (*"weighing whether silence or talk is the safer road"*, *"the way a man
does when he wants a question to have never been asked"*) rather than entering another mind.

**Insight.** The lens's dissent on tense is settled, and it converts into something more useful than a
complaint. Le Guin's objection to present tense is that it has *no past and no future* — which is a precise
description of the failure mode this entire product is engineered against. Read that way, the anti-drift
stack is not a memory feature bolted to a narrator; it is the **grammatical complement of the chosen tense**,
supplying the past the tense refuses to carry. That reframing is worth having in the contract, because it
explains why the drift surface is the product's core rather than one subsystem among many.

**Recommendation — no change.** One documentation note: `DOC/contracts/prompt.md` should record that tense
is emergent and unspecified, since three models agreeing today is not a contract.

**Settled:** yes — second-person present narration.

---

## What the Le Guin lens would actually take from this game

1. **The naming invariant.** "The same name IS the same entity, permanently" is Earthsea's deepest law
   arrived at from the engineering side, and the alias/merge tags are its rites. Nothing in her craft books
   asks for it because no novel needs it; a persistent world does, and this one built it.
2. **The leaping instruction, and the proof it lands.** 137 words down to 16 as the world stops changing,
   then back up when it moves again. She said the leap is a revision act; this engine achieves it in the
   draft, from a prompt, and can show the numbers.
3. **The bag is available and the engine can already count which one it is offering.** Twenty turns of a
   forge, hunger, bread and gossip on one model, and a march to a throne room on another, from the same
   save. The shape of a session is a measurable property here, not a mood — and almost nothing else in
   fiction can say that.

## Verification gaps

- **The two mature corpora are not a clean model comparison.** Same fixture and prompt, but the harness fed
  sonnet a forced no-op on ten of twenty turns while gemini's proxy chose freely from its own suggestions.
  Finding 1's *rate* difference is solid; the causal share owed to the model rather than the action stream is
  not. A matched-action re-run (identical scripted actions, both models) would settle it.
- **Only one voice dial was sampled at all.** All three corpora run `howard` (verified in the fixture and
  the campaign), so the model comparison is clean but **no cross-dial evidence exists**. Whether any other
  dial changes rhythm, simile density or affordance shape is untested.
- **The `leguin` dial has never been run.** Finding 8 argues from the dial's text against the lens's
  positions; no corpus exercises it. A 20-turn run on that dial would test whether "timeless tone" actually
  produces the flourishes the STYLE tail bans.
- **The fresh-run corpus carries no `registerSlips` field**, so the t37 `ledger` hit was found by hand.
  Whether the guard fired that turn and the field simply was not persisted is unknown.
- **Sentence segmentation is regex-based** (period/quote boundaries) and the narration arrives with dice
  lines and suggestion tails concatenated; both were stripped heuristically. The SD figures are comparable
  across the three files because the same pipeline produced them, but they are not publication-grade.
- **The lens's own primary sources have holes.** *From Elfland to Poughkeepsie* and *The Carrier Bag Theory
  of Fiction* were both read through secondaries; the *Steering the Craft* point-of-view chapter — the one
  most relevant to a second-person game — was never obtained. See [`../leguin_lens.md`](../leguin_lens.md) §16.
