# The Le Guin lens — a sourced review rubric for Traffic and Dragons

**Read this when** prose, voice, naming, point of view, the shape of a session, or the weight of violence
wants a second opinion from the craft tradition the product's own prose ambition descends from — or before
wiring the panel review skill (TODO #338). Research deliverable of the TTRPG panel project (owner ruling
2026-09-05: research only, no skill yet). Companion to [`gygax_lens.md`](gygax_lens.md), which covers the
procedural half; this file covers the sentence.

**What this is.** A rubric of Ursula K. Le Guin's *documented* positions, each with a source, a confidence
grade and the review question it asks of this game. **What this is not:** an impersonation. A review that
uses this file speaks as "the Le Guin lens", never as Le Guin, and cites the entry it is applying. Any claim
not in this file is not a Le Guin position for our purposes. Quotations are capped at fifteen words.

**Evidence base.** Unlike the Gygax lens there are no per-lane briefs in [`sources/`](sources/) yet; every
entry below carries its source inline. The strongest tier is her own site (ursulakleguin.com), which hosts
the 2014 National Book Foundation speech and the *No Time to Spare* blog essays in full. *Steering the
Craft* (1998; revised 2015) is reached through a licensed Lit Hub excerpt and a quotation compilation.
*From Elfland to Poughkeepsie* (1973) and *The Carrier Bag Theory of Fiction* (1986) are reached through
secondary sources that quote them; the primary PDFs of both were located but would not render as text.

**Confidence legend.** ● primary (her own words at a source that publishes the text) · ◐ secondary (quoted
by a reliable source, or read through a compilation) · ○ uncertain. A ○ entry may inform a question, never
a verdict.

---

## 0. Cautions — read before applying anything below

1. **She is a novelist's lens, not a game designer's.** Nothing in the record addresses interactive
   fiction, a referee, dice, or a machine that writes. Every position below was written about prose a
   reader receives whole and cannot answer back. The product's medium — a page written to order, one turn
   at a time, that must also carry state — is outside her evidence. Where a position collides with an
   interactive constraint, the constraint is a fact and the position is a taste; say which is which.
2. **Two of her most-cited positions cut against each other here.** "The reduction of narrative to conflict
   is absurd" (4.1) and the carrier bag are an argument against the hero-and-spear shape. But she also
   wrote the Earthsea books, a hero cycle with a sword-bearing wizard on a quest, and defended fantasy's
   heroic tradition against literary condescension (10.2). The lens must not use the carrier bag as a
   blanket verdict against a sword-and-sorcery game; it uses it to ask *whether the container story is
   even available* in this engine, and the honest answer here is measurably yes.
3. **She revised herself in public and said so.** *Earthsea Revisioned* (1993) is a formal repudiation of
   the gendering in her own first trilogy (11.1). A lens built on her positions should expect the positions
   to be self-critical and should not treat any one of them as final doctrine.
4. **Her craft advice is prescriptive about revision, not about drafting.** "In the first draft, go ahead
   and crowd" — the leaping is a *revision* operation (6.2). A GM writing live has no revision pass. Any
   finding that asks the GM to leap must ask it as a generation constraint, which is a different and harder
   thing, and should say so.
5. **"Style is all rhythm" is Virginia Woolf, quoted by Le Guin, not Le Guin.** It appears in *Steering the
   Craft* as an epigraph-style citation. Do not attribute it to her.
6. **Two texts here are speeches, not essays.** Elfland was a 1972 workshop talk and the National Book
   Awards piece a five-minute acceptance. Both are performance registers, sharpened for a room. Weight them
   for direction, not for legal precision.
7. **Her market critique is about publishing, not about software.** §12 is included because this product
   sells a subscription and buys tokens, but she never applied the argument to a tool. Applying it is the
   reviewer's extrapolation and must be labelled as one.

---

## 1. The sound of the sentence

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 1.1 | Sound is the foundation, not the decoration. | "The sound of the language is where it all begins." — *Steering the Craft*, Lit Hub excerpt (●) | The STYLE tail (api.js:2221) legislates sentence *structure* (no em-dashes, no crammed clauses) but never sound. Is any part of the prompt about how a line sounds read aloud — which is exactly what Car Mode and TTS deliver? |
| 1.2 | The test of a sentence is aural. | "The test of a sentence is, Does it sound right?" — same (●) | Car Mode ships the prose as audio. Has any prose rule ever been judged by listening to it rather than reading it? |
| 1.3 | Pace and movement are rhythm, and rhythm is heard. | "Pace and movement depend above all on rhythm" — same (●) | Prose length is already banned as a quality signal (owner rule). Rhythm is the measurable thing that is not length. Nothing in the engine measures it. |
| 1.4 | Rhythm in prose is largely a function of sentence length and its variation. | "the rhythm of prose depends very much on the length of sentences" — *Steering the Craft*, compilation (◐) | Sentence-length variance is computable from any corpus. It separates the two shipped models sharply (findings §2). Should it join the drift-health census? |
| 1.5 | A writer needs a mind's ear — the internal listener that runs while composing. | "A good writer, like a good reader, has a mind's ear." — compilation (◐) | The GM has no ear. The engine is the only possible ear. Every prose rule the engine does not measure is a rule with no listener. |
| 1.6 | The long rhythm of a book is a two-beat alternation: stress, release. | "as simple as a rhythm can be: two beats. Stress, release." — "Rhythmic Pattern in *The Lord of the Rings*", quoted at length (◐) | A campaign at turn 2,437 is a long rhythm. Do chapters, arcs and the montage alternate stress and release, or does each turn independently try to be a stress beat? |
| 1.7 | Large structure is built from repetition, echo and reversal — deliberately. | "repetition, semirepetition, suggestion, foreshadowing, recollection, echo, and reversal" — same (◐) | The memory stack *is* a recollection engine. Distinguish the good repetition (a callback the RAG earned) from the bad (the same adjective twenty times). Only one of those is currently policed. |
| 1.8 | Every sentence owes the next one. | "The chief duty of a narrative sentence is to lead to the next sentence" — Lit Hub excerpt (●) | A turn that ends on a static tableau has not paid this. Do turns end on motion, or on a closing camera pan? |

## 2. Fantasy diction and the Poughkeepsie failure

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 2.1 | Style is what makes a fantasy a fantasy; the trappings are not enough. | "A writer may use all the trappings of fantasy without ever actually imagining anything." — Elfland, quoted (◐) | Strip every proper noun from a turn's narration. Does anything remain that could only happen in this world? |
| 2.2 | Elfland is not home; the reader must be a stranger there. | "But the point about Elfland is that you are not at home there." — Elfland, quoted (◐) | Second person makes the reader the *resident*, not the visitor. That is a deliberate inversion of her position, and the product should own it as one. |
| 2.3 | The wilderness must feel unsafe. | "It is a real wilderness, and those who go there should not feel too safe." — Elfland, quoted (◐) | This is the DEFAULT_RULES §3 danger clause in her words. Rare agreement between the two panel lenses and the product. |
| 2.4 | In fantasy there is no borrowed reality; the maker's voice is the only voice. | "the only voice that speaks there is the creator's voice. And every word counts." — Elfland, via Wikipedia (◐) | With an LLM GM the voice is borrowed by construction — it is a general-purpose register with a dial applied. That is the product's central craft risk and the AUTHORS table is its answer. |
| 2.5 | The act of speech in fantasy is the act of creation. | "The act of speech is the act of creation." — Elfland, via Wikipedia (◐) | Reinforces the naming positions in §3: in this engine speech literally creates records. |
| 2.6 | Fantasy is nearer poetry than naturalism; it is heightened, not decorated. | "nearer to poetry, to mysticism, and to insanity than naturalistic fiction" — Elfland, quoted (◐) | Distinguish heightening (compression, strangeness) from decoration (adjective stacking). The current STYLE tail bans the second and never asks for the first. |
| 2.7 | Fantasy sold as pastiche is exploitation, not craft. | "commercial exploitation of the holy ground of Myth" — Elfland, quoted (◐) | The blunt version of the de-branding row (TODO #104): a voice dial named after a living author is closer to pastiche than to craft. Her objection would be to the *pastiche*, not to the branding. |

## 3. Names and true names

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 3.1 | A thing's true name is the thing; naming is knowledge, not labelling. | "All things have a name." / "To change this rock into a jewel, you must change its true name." — *A Wizard of Earthsea*, quoted (◐) | `buildNamingClause` (identity.js:1780) states this as engine law: "the same name IS the same entity, permanently". Rare and exact convergence. |
| 3.2 | To hold a name is to hold power over the named. | "Who knows a man's name, holds that man's life in his keeping." — *Wizard*, quoted (◐) | The alias and merge tags (`NPC_ALIAS`, `NPC_MERGE`) are the mechanical form of this. Is a rename ever narrated as consequential, or only recorded? |
| 3.3 | Names must be earned, not generated; the mock-fantasy name is the giveaway of fake Elfland. | Elfland's central test — transpose the names and see whether anything changes (◐; the test is reported consistently, the exact wording was not verified) | `NAMES` (data.js:235) is generated phonetics offered ten at a time. Do the pools read as a language, or as a rhyme scheme? |
| 3.4 | Power must follow knowledge and serve need. | a wizard's power "must follow knowledge, and serve need" — *Wizard*, quoted (◐) | Applies to the bibles: a capability that exists because the table had room is power without need. |

## 4. The shape of story — carrier bag against spear

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 4.1 | Narrative is not reducible to conflict. | "The reduction of narrative to conflict is absurd." — *Carrier Bag*, quoted (◐) | DEFAULT_RULES §3 (data.js:108) says "a scene with no stakes is a failed scene" and "combat, monsters, traps, peril, and hard cost MUST happen". Stakes are broader than conflict; the second clause is not. |
| 4.2 | The untold story is the container, not the weapon. | "we have not heard about the thing to put things in" — *Carrier Bag*, quoted (◐) | An inventory, a party roster, a memory graph, a marriage: this engine is *made of* containers. Does the narration ever treat gathering as the event, or only as the interval between fights? |
| 4.3 | The hero story is a specific, chosen, and displacing shape. | "It is the story that hid my humanity from me" — *Carrier Bag*, quoted (◐) | Measurable here: the share of the three suggested actions that carry a violence verb. It is a shape the engine can count. |
| 4.4 | The killer story is named as a genre with a cost, not as neutral. | "about bashing, thrusting, raping, killing, about the Hero" — *Carrier Bag*, quoted (◐) | Quote with care; it is polemic. Use it to ask what the game loses when a session is all spear, not to condemn the genre the product chose. |
| 4.5 | A novel is a bundle holding things in relation. | "A novel is a medicine bundle, holding things in a particular, powerful relation" — *Carrier Bag*, quoted (◐) | The best available description of a mature save: 68 NPCs, 11 chapters, 138 beats, three marriages. The product's artifact is a bundle even when its turns are spears. |
| 4.6 | Story is the going; plot is the elaboration of the going. | "Story goes. Plot elaborates the going." — "The Narrative Gift as a Moral Conundrum", ursulakleguin.com (●) | The campaign skeleton is plot. The turn is story. When the skeleton's beats steer a turn, which one is serving which? |

## 5. Point of view, person and tense

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 5.1 | Point of view must be chosen and held; the modes are distinct and confusing them is the common failure. | *Steering the Craft* devotes two chapters to POV and changing POV (◐, structure verified on ursulakleguin.com) | `personDriftDetect` (api.js:1613) is exactly this discipline, mechanized and measured (2.8% drift on a 1,663-response campaign, false positives driven to zero). The product is ahead of the position here. |
| 5.2 | Present tense narrows the view to the immediate step. | present tense is "a narrow beam flashlight in the dark, limiting the view to the next step" — *Steering the Craft*, compilation (◐) | The best available description of the drift problem, written about grammar. The anti-drift stack is, read this way, an engine supplying the past and future the tense withholds. |
| 5.3 | Present tense is a fashion, and a writer uncomfortable in it should not be crowded into it. | "if you're not comfortable with it, don't let yourself be crowded into using it" — same (◐) | Dissent only. Second-person present is a settled owner ruling and the medium's natural tense. Record and move on. |
| 5.4 | Self-expression is not communication. | "It's dangerous to confuse self-expression with communication." — compilation (◐) | A voice dial is self-expression on the model's behalf. Is any prose rule written from the *player's* side of the line — what reaches them, not what the GM performs? |

## 6. Economy, crowding and the cut

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 6.1 | Crowd the prose with the relevant; leap over everything else. | "what you leave out is infinitely more than what you leave in" — *Steering the Craft*, compilation (◐) | The STYLE clause already says "when nothing much has changed, write LESS". That is the leaping instruction. Does the corpus obey it? (Findings §6: yes, measurably.) |
| 6.2 | Leaping is a revision act; crowding belongs to the draft. | reported consistently from the "Crowding and Leaping" chapter (◐) | A live GM has no revision pass. The engine's equivalent of revision is the note channel — which is where the leaping instruction already lives. |
| 6.3 | The word needs white space; the voice needs silence. | "There's got to be white space around the word, silence around the voice." — compilation (◐) | Every turn ends with three buttons and a speaker icon. Is there any place in this UI where a line is allowed to stand alone? |
| 6.4 | Listing is not describing. | "Listing is not describing." — compilation (◐) | Adjective stacking and clause-chaining are lists wearing description's clothes. Both are already banned in the STYLE tail; neither is measured. |
| 6.5 | Exposition must not clot. | "Crafty writers don't allow Exposition to form Lumps." — compilation (◐) | The prompt injects canon blocks; DEFAULT_RULES §131 ("CANON IS NOT CONVERSATION") is the anti-lump rule. Is it holding? |
| 6.6 | Put the quality in the verb rather than the adverb. | *Steering the Craft* on adverbs, compilation (◐) | A concrete, checkable style rule the STYLE tail does not currently carry. |
| 6.7 | To break a rule you must know it; a blunder is not a revolution. | "To break a rule you have to know the rule. A blunder is not a revolution." — compilation (◐) | Applies to the voice dials: a dial that licenses fragments licenses *deliberate* fragments. Is the difference expressible in a prompt? Probably not — which is an argument for fewer licences, not more. |
| 6.8 | The discipline of art is freedom. | "The discipline of art is freedom." — compilation (◐) | The house answer to any claim that a style constraint costs the GM range. |

## 7. Description, the senses and the generic

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 7.1 | Make the rhythm and movement of the sentences embody the physical reality described. | *Steering the Craft* exercise, Lit Hub excerpt (●) | The Gygax lens's "the referee is nature" (7.1 there) meets this one: sensory data is not enough; the sentence must move the way the thing moves. |
| 7.2 | Show off the whole orchestra — sound, alliteration, repetition, invented words — deliberately. | "Show off! Use the whole orchestra our wonderful language offers us!" — Lit Hub excerpt (●) | The one place the lens argues for *more*, not less. It is also the one thing a general-purpose model will not do unprompted, because it reads as risk. |
| 7.3 | A story is made of language, and language expresses delight. | "A story is made out of language, and language can and does express delight" — compilation (◐) | Prose length is banned as a quality signal; delight is not length. Is there any positive prose signal in the product, or only prohibitions? |
| 7.4 | Fake realism is escapism. | "Fake realism is the escapist literature of our time." — "Why Are Americans Afraid of Dragons?", quoted (◐) | Aimed at literary fiction, but it lands on procedural realism too: a world modelled for its own sake is the same evasion. Seconds Gygax 7.3. |

## 8. Violence and its weight

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 8.1 | The killer story is a choice with consequences for what a culture can imagine. | *Carrier Bag*, 4.3–4.4 above (◐) | Not a ban on violence: a demand that violence be one shape among several rather than the default affordance. |
| 8.2 | Heroism gendered as male excludes whole categories of act from being story-worthy. | *Earthsea Revisioned* (1993), summarized consistently; no verbatim quotation verified (○) | Asks whether the engine's affordances can make a non-combat act *count* mechanically — XP for a talked-down fight, a marriage, a night at a forge. The XP rules do carry a non-violent clause; is it ever paid? |
| 8.3 | Magic's cost is the moral content: every act disturbs a balance. | "To light a candle is to cast a shadow." — *Wizard*, quoted (◐) | The capability bible's cost axis is the mechanical form. Does the *narration* ever show the shadow, or only the candle? |
| 8.4 | Do not act until you know what will follow. | "You must not change one thing, one pebble, one grain of sand" — *Wizard*, quoted (◐) | The strongest available statement of consequence-before-action, and the anti-drift stack's own thesis in fictional form. |

## 9. What a world owes its reader

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 9.1 | The world must be consistent because there is nothing else holding it up. | Elfland, 2.4 (◐) | This is the entire drift surface, stated as an aesthetic rather than an engineering requirement. It is the best one-line justification the product has for the cost of the memory stack. |
| 9.2 | Every word counts, because nothing is borrowed. | Elfland, 2.4 (◐) | A licence to spend engineering on prose, not only on state. |
| 9.3 | Magic that has rules has meaning; magic without cost is decoration. | 8.3–8.4 (◐) | Applies to the wares economy and mana pools: are the costs ever *felt* in prose, or only debited? |

## 10. The moral seriousness of fantasy

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 10.1 | Fantasy is true without being factual. | "For fantasy is true, of course. It isn't factual, but it is true." — "Why Are Americans Afraid of Dragons?", quoted (◐) | The product's defence against the charge that it is a toy. |
| 10.2 | The fear of fantasy is a fear of freedom. | "They are afraid of dragons, because they are afraid of freedom." — same (◐) | Rhetorical, not analytic. Use it once or not at all. |
| 10.3 | Contempt for the imagination is a cultural default to be resisted. | "We tend, as a people, to look upon all works of the imagination either as suspect, or as contemptible." — same, quoted (◐, 14 words) | Directed at critics, not at products. Do not use it to deflect a craft criticism. |

## 11. The narrative gift as a moral problem

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 11.1 | Storytelling power is separable from prose quality, and the power can carry banal prose. | an author can succeed with "the most conventional, banal prose, if the writer has the gift" — ursulakleguin.com blog 51 (●) | The sharpest position in this file for an LLM product. A GM with perfect continuity and competent-at-best sentences will still be compulsive. Compulsiveness is therefore not evidence that the prose is good. |
| 11.2 | The conundrum is that she could not stop reading either the fluff or the gold. | "If one of the two books... is slightly soiled fluff while the other is solid gold" — blog 51 (●, 14 words) | Applies directly to playtest judging: "I kept playing" is not a prose verdict. Any audit that scores voice must score something a page-turner cannot fake. |
| 11.3 | She judged one book harshly for assuming a right to speak for people it had not earned. | the author's "assumption of a right to speak for people without earning that right" — blog 51 (●, 13 words) | The de-branding row's real question (TODO #104): a dial labelled with a living author's name asserts a right to their voice. The behaviours are fair game; the claim is not. |

## 12. Commerce and art

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 12.1 | Market production and the practice of an art are different activities. | "the difference between production of a market commodity and the practice of an art" — NBF Medal speech, ursulakleguin.com (●) | Applies to token cost as a design pressure: when a prose rule is chosen for spend rather than for the page, say so out loud. Prose length is already banned partly for TTS billing — an honest instance. |
| 12.2 | The profit motive is often in conflict with the aims of art. | "the profit motive is often in conflict with the aims of art" — same (●) | Extrapolation, labelled: the model-selection rulings are a live instance of this tension, resolved in favour of the page (gemini kept for its writing, opus unlisted on economics). |
| 12.3 | The needed writers are "realists of a larger reality" who can remember freedom. | "realists of a larger reality" — same (●) | The product's own aspiration, in five words. Reasonable as a north star for the prose-voice work. |

---

## 13. Where the lens would fight the product

Stated as dissent, not as defect. Each is answered.

- **Second person makes the reader a resident of Elfland (2.2).** Her position is that the reader must be a
  stranger there. The product's answer: this is a game, the player *is* the resident, and the strangeness
  budget moves from the pronoun to the world. **Settled** (owner ruling: second-person present narration).
- **Present tense is a flashlight (5.2, 5.3).** She would ask for a past-tense option. The product's answer:
  a turn is *now*, and the memory stack exists precisely to supply the past the tense withholds. **Settled.**
- **The three-button affordance is a shape, and it is usually a spear (4.1–4.4).** Every turn ends by
  offering the player three futures. What those three are is the strongest single statement the game makes
  about what a story is. Measured, one model offers violence in 39% of them and the other in 0%.
  Not settled — this is the lens's live argument, and it is countable.
- **A voice dial named for a living author (2.7, 11.3).** The dial claims a right the product has not
  earned; the *behaviours* it encodes are legitimate craft. The de-branding row (TODO #104) already agrees.
  The lens's contribution is the reason: not legal risk, but that a name is a claim and a behaviour is not.
- **"Mythic, timeless tone" in the Le Guin dial itself (data.js:22).** The dial commands an age-register
  and one extended metaphor per scene. Her documented positions command subtraction and warn against
  reaching for the sublime. The dial is a caricature of the lens, and the STYLE tail's own antiquity ban is
  in tension with it.
- **The market position (12.1) is an extrapolation.** She never applied it to software and the lens must
  not pretend she did.

## 14. Things the lens must never say

- That she opposed heroic fantasy, quests, swords, or genre. She wrote them and defended them (caution 2).
- That "style is all rhythm" is her line. It is Woolf's, quoted by her (caution 5).
- That the carrier bag forbids conflict. It refuses conflict as the *definition* of narrative (4.1).
- That she said anything about AI, LLMs, generated prose, or games. Nothing in the record touches them.
- That present tense or second person is *wrong*. She called present tense a fashion and told writers to
  suit themselves (5.3).
- That "every word counts" licenses more words. In her usage it is an argument for fewer.
- That the Elfland test is a rule about invented spellings. It is a test of whether the *voice* changes
  when the names do.
- Any quotation not in this file. Two primary PDFs (Elfland, Carrier Bag) resisted extraction; do not
  reconstruct their wording from memory.

## 15. Positions that moved, and how the lens weights them

| Topic | Early | Late | Lens weighting |
|---|---|---|---|
| The hero tale | Earthsea I–III (1968–72): a boy, a staff, a quest | *Carrier Bag* (1986), *Tehanu* (1990), *Earthsea Revisioned* (1993) | Weight the late position for the *question* it asks and the early practice for what she actually built. She never stopped writing quests; she stopped letting the quest be the only shape. |
| Style prescription | Elfland (1972): heightened, archaic-tolerant, anti-colloquial | *Steering the Craft* (1998/2015): plain, aural, economy-first | Not a contradiction — Elfland argues against *unearned* modern idiom, Steering argues against *unearned* ornament. Both are arguments against the default. Use both. |
| Genre and the literary establishment | 1974 essay: defensive, arguing for fantasy's seriousness | 2014 speech: confident, arguing against commodification | The later framing is the stronger one for this product. |

## 16. Verification gaps

Carried so a later pass knows where to dig.

- **The two central essays were never read first-hand.** The *Carrier Bag* PDF (otherfutures.nl) and the
  Elfland PDF (digginganddeepening.com) both returned unextractable binary. Every quotation from either is
  ◐, taken from a secondary that quotes it. A pass with working PDF extraction should upgrade or correct
  §2 and §4 wholesale.
- **The Elfland "transposition test"** (3.3) is reported by several secondaries but no verbatim statement
  of it was found. It informs a question here; it must not carry a verdict until sourced.
- ***Steering the Craft* was read through a licensed Lit Hub excerpt plus a quotation compilation.** Page
  numbers are unverified and the 1998/2015 editions differ. The POV chapter's actual content on second
  person was not obtained — a real gap, given the product narrates in second person.
- ***Earthsea Revisioned*** (8.2) has no verbatim quotation in this file. ○ throughout.
- **No statement on interactive fiction, games, or machine-written prose exists.** Do not invent one.
- **The AWP *Writer's Chronicle* craft interview** redirected to a dead archive index; it likely contains
  first-hand statements on tense and POV that would upgrade §5.
- **Her Book View Café blog** is reachable only through ursulakleguin.com's re-posts; the archive was not
  enumerated, so other craft posts may exist that this file misses.

## 17. How a review would use this file (for #338, not yet built)

A panel review names the member, the surface under review, and the entries applied. For each entry it
states the question, the finding against the actual prose or rule text (a corpus turn number with a short
quotation, or a rule at file:line), and the verdict, in the AUDIT_FABLE shape. Because this lens is about
prose, its findings must be **measured on a corpus**, never asserted from impression: sentence-length
variance, simile density, adjective concentration, affordance shape and register slips are all computable
from `dev/corpus_playtest_*.json`. Dissent from §13 is stated as dissent. The review's first line carries
the lens's own caveat: this is a rubric of documented positions, not the woman.
