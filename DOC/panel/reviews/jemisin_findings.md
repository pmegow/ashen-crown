# Panel review — the Jemisin lens on Traffic and Dragons

**This is a rubric of documented positions, not the person.** Every entry below cites
[`DOC/panel/jemisin_lens.md`](../jemisin_lens.md) by section, with that entry's confidence grade. Where the lens
argues against something the owner has settled, the finding says **SETTLED** and the dissent is recorded rather
than actioned.

**Surfaces reviewed:** the second-person contract (`api.js` `buildSysPrompt`, `personDriftDetect`,
`tag_table.js` `[SAY:]`, `helpers.js` `toFirstPerson`); the world generator (`campaign_generator.js`, the blueprint
schema); `DEFAULT_RULES` and the `STYLE` tail; the memory tiers and whispers; the arc wall and the ending path.

**Prose measured:** `dev/corpus_playtest_v1847_sonnet5_344.json` (50 fresh-campaign turns, sonnet-5, the
`modeltestcampaign` slaver economy, prose voice `howard`), `dev/corpus_playtest_v1847_mature226_sonnet5.json` and
`_gemini.json` (20 late-game turns each from the Runelords save at t2097, prose voice `abercrombie`). 90 narrations
read. Live-save facts cited are the Runelords campaign at v1.848: turn 2,437, 68 NPCs, 11 chapters and eras, 22
core memories, ~28 map nodes.

---

## F1 — The game's second person is the good kind, and it got there without knowing why

**Position applied:** §1.1, §1.2, §1.5 (● primary) — "second person actually interferes with identification"; it
works by constant reminder that "this character's… beliefs and feelings are not yours"; the reader "can reject it
or empathize." Plus §1.9 (● primary, byte-verified slide): first and second person, single POV, sit at High
Immersion.

**What the game does.** Second person is asserted once in the cached stable half (`api.js:2169`, "Write vivid
second-person prose") and once more in a fifteen-word clause at the very end of the volatile half
(`api.js:2243`: `" PERSON: second person — 'you' is "+c.name+"; companions are third person by name."`). It holds:
**90 of 90 corpus turns narrate in second person**, one late-game atmospheric turn excepted, including 50 turns
under the `howard` voice that `api.js:2238` measured at 2.7–5.3% second person across 10,067 responses before that
terminal clause existed. `personDriftDetect` (`api.js`) re-arms on any drift and is compliance-boxed, not
time-boxed, pinned by the NARRATION-PERSON RETIREMENT CONTRACT at `dev/run-tests.js:77`.

The lens's actual mechanism — the sprite that keeps reminding you that "you" is not you — is present **three
times over, by accident**:

- `tag_table.js:177` requires the player's own spoken lines to be tagged with their character **name**, "never 'you'";
- `helpers.js:986` `toFirstPerson` rewrites a tapped suggestion button from second to **first** person — corpus t1's
  button "Draw your longsword and charge the treeline." becomes t2's action "Draw my longsword and scan the tree line.";
- the character sheet, portrait and alignment readout sit beside the prose all session.

So the protagonist carries three grammatical persons at once: *you* in narration, *I* in input, *Korrag* in
dialogue. That is precisely §1.2's video-game sprite, and it is why the mode does not collapse into wish-fulfilment.

**Insight.** The game treats second person as an immersion device and delivers a distancing one. That is the right
outcome from the wrong theory, and the wrong theory is load-bearing: the only instruction the GM receives about
the mode is *grammatical*. Nothing says what the mode is for. The measurable cost shows up at §1.5 — the offer the
reader may refuse becomes an assertion when the GM writes speech the player never typed. **13 of 50 turns in the
fresh-campaign corpus put a speech act in the player's mouth**; corpus t4, from the typed action "Refuse and demand
they leave.", produced `"Valerius can rot," you snarl, longsword leveled at Nolan's throat.` The words, the tone
and the threat are all the narrator's. That is the one place where "you" stops being an offer.

**Recommendation — XS, drift surface (Fable-tier).** Do not touch the mode. Extend the terminal `PERSON` clause by
one sentence naming what it is for, in the slot the file already documents as load-bearing: *'you' is the camera on
Korrag, not the player — never put words in the player's mouth that their action did not ask for; when their action
does not specify speech, narrate the attempt and let them speak next turn.* Fifteen words of prompt currently carry
the whole mode; a second sentence is cheap and testable (the corpus speaks-for-you rate is the metric). Verify the
stable half stays byte-identical — the clause is volatile-half already.

**Settled:** the mode itself. Second-person present is an owner ruling and the lens does not reopen it; §11 of the
lens records the dissent (she chose it once, for one character, and names its costs) as settled.

---

## F2 — The world generator asks for a story and never once for a system

**Position applied:** §2.1, §2.3, §2.6, §2.10 (● primary, byte-verified slides) — build physical → biological →
social → speculative → story; "Pick three sociological characteristics to start. The rest… will dictate the rest";
"Your story's people will have adapted to the above, too!"; "Don't forget the social sciences!". Plus §3.1 (◐, lesson
titles only) — "Power Dynamics" is a named worldbuilding chapter, and §3.5 (● primary) — her own world described
for a roleplaying game as "modular, with every resource — food, weapons, labor, knowledge — meant to be shuffled around."

**What the game does.** `generateBlueprintDraft` (`campaign_generator.js:143–162`) is the entire cold-start world
generator. It asks for: `name`, `tone`, `startingLocation`, `startingRegion`, `premise`, three `acts` with `arcs`,
a `deepTime` age ladder, 4–6 `npcs`, 3–6 `locations` with a `description` ("2-4 sentences of canonical description
the GM will inject verbatim"), and 0–3 `rules`. There is **no field for economy, ecology, labour, climate, or who
holds power and how they keep it.** The reviewer's constraint block (`campaign_generator.js:89`) then freezes that
schema: "Never propose new fields, sections, NPC rosters, or stat blocks."

Physical facts do exist, but they arrive *later and from play*: `[LOCATION_SIZE:]` (a scale and a walk time),
`[LOCATION_HOURS:]`, `[WARES:]`/`[WANTED:]`, `[LOCATION_RESIDENT:]`, `[FACTION:]`/`[FACTION_REL:]`. Every one is
GM-emitted mid-campaign; none is seeded, so nothing derives from anything.

The one place in the whole codebase that asks for power structures is a prose voice's `contentDNA` string —
`data.js:23`, the Le Guin entry: *"Social and political context is woven into every arc — factions, customs, and
power structures matter as much as physical threats."* It reaches the prompt only if the player picks that author.

**Insight.** `deepTime` (#227) proves the pattern works: one closed, campaign-constant, stable-half enum, written
once, and it durably fixed a real drift (the antiquity ratchet). It is the game's only piece of *derived world
canon* — and it is a chronology, not a system. The lens's whole method is that a world is a set of constraints you
keep deriving from; this generator produces a plot with scenery attached. The measured symptom in the fresh corpus:
across 50 turns in a port city, "child" appears 0 times, "family" 0, "born" 0, "children" once — in the phrase "a
story to scare children." A city with no reproduction, no households and no next generation is not a world the GM
can derive anything from. (`DEFAULT_RULES[0]`, `data.js:106`, forbids minors — a deliberate safety rule with an
unowned worldbuilding cost.)

**Recommendation — S.** Two optional string fields on the blueprint/skeleton schema, seeded once and injected in
the **stable** half beside `buildDeepTimeBlock` (same cache economics, same "written once, never mutated" property):

- `power` — who holds power here, and what it costs them to keep it;
- `livelihood` — what this place lives on, and who does that work.

Add the matching two lines to `generateBlueprintDraft`'s RULES and one clause to `SKELETON_REVIEW_CONSTRAINTS`'
schema list. `""`-clean for every legacy save, so existing campaigns stay byte-identical. This is the smallest
change that turns the generator from top-down to derivable, and #227's ladder is the precedent for all of it.

---

## F3 — A campaign about slavery in which no enslaved person speaks

**Position applied:** §3.2, §3.3 (● primary) — oppression is structural and self-maintaining, "you've got people
complicit in the system who are part of it themselves"; "I was not exploring a specific oppression… I didn't want
it to map." Plus §8.2 (● primary) — "all I can do is show that there are reasons for those choices."

**What the game does.** `samples/modeltestcampaign.blueprint` — the owner-ruled standard test campaign — has this
premise: *Korrag, a freed Northlander pit-fighter*, whose former master Valerius "is not just a slaver but the high
priest of a sorcerous death cult." Act 2's goal is to strike at "his supply of captives." Fifty turns were played.

Measured across those 50 turns: **76 quoted lines of dialogue. Not one belongs to an enslaved or branded person.**
Drovers speak (t11, t13, t14, t27), a gate guard speaks at length (t20–t24), a slaver captain speaks, a bookmaker
is described, a coin-woman is described, a hooded alchemist speaks. The enslaved appear only as marks and bodies:
a brand ("a serpent coiled around a crown", 13 mentions), a collar, a wordless fighter. At t44, the campaign's
emotional climax — the protagonist meets a man he knew, now branded and drugged — the narration reads
**"He does not answer with words."**

**Insight.** The system *is* rendered, and rendered well: a supply chain, an elixir, a brand, a bookmaker, a
coin-woman who counts purses by weight, a captain who says "Valerius don't want you dead. Wants you home." The
complicity §3.2 asks for is on the page. What is missing is the other half — the oppressed as people with reasons.
The engine is not at fault: `[SAY:]` compliance is measured at 88–95% of live responses, and the GM speaks whoever
it decides is in the scene. Nothing in `DEFAULT_RULES` or the scene-cast machinery says that the people a quest is
*about* should get a voice. `DEFAULT_RULES` at `data.js:109` mandates variety of *ancestry* by rule; there is no
equivalent for standing.

The mapping problem §3.3 names is live here too: "slaver" is being used as a stock antagonist noun, borrowing
historical weight without carrying the structure. The lens's answer is not to remove it — it is to make the people
inside it speak, which is also just better fiction.

**Recommendation — S, drift surface (Fable-tier).** One `DEFAULT_RULES` clause, in the voice of the existing rules:
*THE SUBJECT SPEAKS — when a quest, arc or scene turns on the fate of a class of people (the captives, the
conscripts, the plague ward, the tenants), at least one of them must be named, registered with `[NPC:]`, and given a
line of their own before the arc resolves. They are people with reasons, not the stakes of someone else's story.*
Pairs naturally with the existing `[SCENE_CAST:]` ask. Verify against the same 50-turn standard campaign: the metric
is whether a branded fighter ever gets a quoted line.

---

## F4 — The memory stack already is the unreliable past, and it is the strongest surface in the product

**Position applied:** §6.1 (◐) — knowledge "shift[s] over time and under the pressure of survival"; §6.3 (●) —
nostalgia is a distorting lens; §10.2 (●) — "Deep and close reading is something that I want readers to do with me."

**What the game does.** Three registers of pastness, kept apart by construction:

- **Record.** The transcript is sacred and never trimmed. The guestbook renders negatives as *"no recorded visit"*,
  never "was never here" — unrecorded is UNKNOWN. Canon deaths travel in `CANON_TXN` envelopes with receipts.
- **Memory.** Chapters compress into eras; the era block is labelled "Deep background: the CURRENT state blocks
  override anything here." RAG excerpts carry the same header. Core memories are engine-detected from HP crossings,
  alignment label flips, party joins and deaths, and weighty bond changes — not model-authored.
- **Rumour.** `buildWhispersNote` (`api.js:545`, every `WHISPERS_EVERY`=15 turns) asks for one in-character line
  drawn only from recorded decisions, finished quests and the latest defining moment, with this constraint:
  *"Rumour distorts: it may exaggerate, blame the wrong person, or get a name wrong, but it never invents an event
  that did not happen."* `buildWhispersBlock` (`api.js:558`) serves the newest three as "what is SAID of them… hearsay,
  not what is true."

Measured, mature save (Runelords, t2098–t2099): "Word's already crawling through the Shore District", then Wyla's
own account of how it works — **"truth walks in one door and comes out six mouths later"** wearing someone else's
coat. The gemini arm of the same fixture produces a *different* distortion of the same event ("a mad half-fey fiend
is butchering horrors in the alleys"), and by t2113 the rumour has mutated again on the road north. At 2,437 turns
the live save carries 11 chapters and eras and 22 core memories under this scheme.

**Insight.** This is the position implemented, not approximated. Rumour that may exaggerate, misattribute and
garble a name but may never invent an event is a precise formalisation of §6.1 — and the separation of *record*
from *what is said* is the thing most fiction engines get wrong. Table Talk adds §10.2's rereading surface: the
player can interrogate the campaign's own record out of character, against a state block that says which facts are
certain. The one honest limit is §6.2: eras compress forward only. Nothing ever re-reads an old era differently in
light of what came later, which is the move her trilogy makes each volume. That is a design idea, not a defect.

**Recommendation — no change.** Record as the product's strongest alignment with this lens. If the era tier is ever
revisited, §6.2 is the direction: a later revelation that *re-annotates* an earlier era rather than appending to it.

---

## F5 — The engine explains constantly and the prose almost never does, which is exactly right — with one leak

**Position applied:** §1.9, §7.1, §7.2 (● primary, byte-verified slides) — high immersion means "Explain little.
The strangeness of the world is conveyed mostly through context"; frequent explanation and direct address belong at
low immersion, flagged "Danger: infodumping!". Plus §7.4 (●) — "Overwriting is condescending."

**What the game does.** The system prompt is a research library — `GEOGRAPHY`, `DEEP TIME`, `BESTIARY`, `MEMORY
DIRECTORY`, `ACTIVE NPC DETAILS`, `CANONICAL SPELL RULES`, `PAST SCENE EXCERPTS`, `WHISPERS`, `DEFINING MOMENTS`,
the campaign skeleton. Every one of them is addressed to the **GM**, and two rules fence them from the prose:
`data.js:131` *"CANON IS NOT CONVERSATION — the reference blocks in this prompt… tell YOU what is true; they are not
things characters spontaneously say"*, and `api.js:2255` *"GM-EYES ONLY: this skeleton is your private planning
document. NO character in the world knows it."* The fence holds in the corpus: world facts arrive through people
with a reason to know and a reason to speak — a drover's rumour of the pits (t13), a gate guard's account of Saint
Ammon's collapse (t21), a smith's read on the docks (t2099).

**The leak.** `buildDeepTimeBlock` (`api.js:277–280`) does two jobs in one block. The first is a *ceiling* —
nothing predates the oldest named age, which is what killed the antiquity ratchet and is unambiguously good. The
second is an *exposition mandate*: "When something old enters the story, put it ON a rung and say which… **Naming
the rung is the information.**" That instructs the narrator to explain, in prose, at the top of the immersion
pyramid. Measured in the mature corpus, t2113: *"It has been waiting for ten thousand years."* — a rung named as
a number, in the closing beat of a scene. The gemini arm does it too at t2114: "He has had ten thousand years to
prepare for dying."

**Insight.** The architecture is hers: a huge iceberg, addressed to the teller, surfacing through characters. The
deep-time block is the one place the engine reaches around its own fence and tells the narrator to say a fact out
loud. It was built to *replace* a worse habit (unbounded "older than memory" escalation), and it succeeded — but
the replacement is exposition where the original was atmosphere, and the `STYLE` tail already contains the better
rule: *"if an age matters, state it plainly once, otherwise say what the thing is and move on."* The two
instructions do not agree about the default.

**Recommendation — XS, drift surface (Fable-tier).** Reconcile them in `buildDeepTimeBlock`: keep the ceiling and
the closed enum verbatim; change the mandate's default from *always name the rung* to *name the rung when the age
is what matters, and otherwise say what the thing is* — the `STYLE` wording, which is already shipped and already
owner-ruled. One line, stable-half (verify byte-identity across a turn, and that `""`-clean legacy saves are
untouched).

---

## F6 — The arc wall closes the player's story to protect the author's, and the lens seconds it

**Position applied:** §5.1 (●) — the shape was known from day one; §5.2 (●) — structure is an empathy-financing
instrument, "So I decided to trick readers into caring about her"; §9.1 (●) — the failure mode is the restoration
plot, not the passive protagonist.

**What the game does.** `buildArcWallNudge` (`api.js:1729`) tells the GM that emergent threads born inside an arc
"are SUBORDINATE to the arc — when it completes they are closed automatically, whatever state they are in", with
`ARC_WALL_WARN_LEAD`=15 turns of notice against `ARC_TURN_BUDGET`=50. It exists because of a measurement (#231,
archived): in the owner's finished Runelords campaign the authored spine was 3 acts and 10 arcs, while one emergent
thread grew to 18 quests — 1.8× the entire spine — spanning 1,458 of 2,324 turns. The owner's verdict was the
project's north star: *"by the end of that campaign I just wanted it over, and that is the OPPOSITE of how a player
should feel near the end."*

Against that, the engine protects player agency hard elsewhere: quests are player-gated and may never be
auto-accepted; abandoning one files a permanent decision — `api.js:349`, *"do not steer back toward it; it may
return only as a fresh offer"*; and the ending is **offered, never forced** (`helpers.js:1230` `endingOffered`, the
fourth button, routed to a modal and never to the model).

**Insight.** §5.1 and §5.2 both support the wall. She plans structure in advance and treats it as an instrument
that *finances* something — and the #231 measurement is exactly a financing failure: an emergent thread consuming
63% of a campaign's turns is spending attention the spine needed. Where the lens differs is in the remedy's shape.
Her instrument promotes: the braid exists so that a subplot pays *into* the main line. The wall only closes. The
engine cannot promote an emergent thread into the spine — the skeleton schema is frozen at exactly three acts
(`validateSkeletonStructure`, `campaign_generator.js:62`), so a thread the player loves has no upward path, only a
deadline.

Two things do already work, and should be said plainly. Archived quests of every status feed
`buildDenouementPrompt` (`api.js:648`), so a walled thread is still *named* at the end — and the denouement system
prompt requires it: *"leave the unfinished threads unfinished, named."* And both denouement variants are
forward-facing — "End on the world going on without the hero" and "the hero and the world they made" — never a
restoration to the opening state, which is §9.1's actual test, passed.

**Recommendation — no change.** The wall is measured, it fixed a real failure, and the denouement already carries
the residue. Record the honest limit for a future design conversation: **the engine can close an emergent thread
but cannot promote one**, and a three-act frozen schema is the reason.

---

## F7 — The mechanized-magic dissent, and why the product is right to keep the bible

**Position applied:** §4.1, §4.2 (● primary, her own blog) — "game logic should not apply to magic, because it's
fucking magic"; "I blame D&D for systematizing so many things that don't need to be"; Earthsea's magic was "never
repeatable, never predictable." Against §4.3 (● primary) — inside a world, people do quantify: "They quantify to
whatever degree they can. They treat it mechanistically."

**What the game does.** `capability_bible.js` is canon for every spell and ability, injected as *"CANONICAL SPELL
RULES (authoritative — these bounds are FIXED; never expand a spell's range, targets, duration, or effect beyond
what is written here…)"* (`api.js:2411`), with a mana economy, a per-tier cost, a refusal path for an empty pool,
and `SPELL_CANON_WINDOW`=30 to keep the block from growing without limit.

**Insight.** This is the lens's sharpest disagreement with the product and it should not be actioned, for a reason
she supplies herself. The bible is not a players' guide — it is an **anti-drift device**. An LLM narrator without
one gives the same spell three different ranges in three scenes, and the drift is silent. Her §4.3 is the exact
reconciliation: the *culture* systematizes, the *author* does not owe the reader a rulebook. The game's bible is
read by the GM and surfaces to the player only through their own sheet, and `data.js:131` forbids characters from
reciting canon as conversation.

The corpus shows the fence holding on the fiction's own strangeness: the elixir at t13/t30/t31/t36 is never given
rules, only symptoms — wounds that knit, a vein-dark stain, a fighter whose "muscles bunch too fast." That is
Earthsea-shaped: observed, unexplained, unreliable. Where it is *not* holding is the player-facing sheet — the Mana
line is a number the fiction never earned — but that is a UI question, and the settled model-narrated-dice ruling
already establishes the owner's position on visible mechanics.

**Recommendation — no change.** Record the dissent (lens §11, bullet 1). The one live test worth keeping: does the
prose ever narrate a bible rule *as a rule*? The corpus says no across 90 turns.

---

## F8 — Nothing in this game knows how long the player has been here

**Position applied:** §10.1 (● primary) — "your trust factor changes as you proceed through the book"; "you can
start to be very, very delicate with your brushstrokes." Plus §1.6 (●) — second person "spends trust the text has
not yet earned"; §7.4 (●) — "Overwriting is condescending."

**What the game does.** The prose contract is a constant. `getRulesBlock()` and the tone block sit in the **stable**
half, whose byte-identity turn to turn is a cache requirement enforced by an engine test — so their constancy is a
structural property, not an oversight. The `STYLE` tail is volatile, but its text is fixed too: the only parts that
vary are the person clause and the in-band-suggestions switch. `DEFAULT_RULES`' PROSE rule (`data.js:116`) says
"keep most responses tight, roughly 3-5 sentences" on turn 1 and on turn 2,437 alike. The only thing that grows with a
campaign is *state*: more NPCs, more chapters, more RAG excerpts, more core memories.

Measured. The fresh corpus's opening turns explain hard — t2 gives an antagonist's whole silhouette, t13 and t14
are two consecutive drover-exposition turns, t21 is a 150-word guardsman monologue delivering the district's
history. The mature corpus, 2,000 turns later, is doing the opposite: t2101 is five sentences of bellows and heat
with the plot entirely offstage, t2109 lands an arc's end on "That's the fourth. That's all of them." The GM found
the trust curve **on its own**, from context and momentum, with no instruction telling it that turn 2,100 has
earned something turn 2 has not.

**Insight.** §10.1 is the most actionable idea in the whole lens and the game has no surface for it. Every other
axis in this engine is a function of campaign age — RAG skips the last 10 turns, `SPELL_CANON_WINDOW` is 30,
`WHISPERS_EVERY` is 15, `REL_AUDIT_TURNS` is 40, the montage fires after 6 same-place turns, the drift-health
readout treats a *mature* campaign differently from a young one. Prose is the one axis held constant. That is not
obviously wrong — voice stability is a validated product value, and the constant is what makes the cache work —
but it means the opening turns, where §1.6 says the second person is most expensive, get no help, and the late
turns get no licence.

There is also a real tension to name: `STYLE` is volatile-half (it is at the end of the prompt on purpose), so a
turn-count-aware clause there costs **nothing in cache terms** — the volatile half is uncached by design. The
byte-identity constraint applies to the *stable* half, and the prose rules are split across both.

**Recommendation — M, drift surface (Fable-tier), design conversation before code.** Not a rewrite: a single
volatile clause appended to `STYLE` that switches on campaign age, in the `#227`/`#355` shape (one short sentence,
end-of-prompt, gated so young campaigns stay byte-identical). Two rungs, not a curve:

- **early** (below some turn threshold): *the player is new here — name people and places plainly the first time,
  and let a character explain what the scene needs explained;*
- **established**: *the player has been here a long time — assume they remember, and let a detail land without its
  gloss.*

This is genuinely uncertain and belongs to the owner: it touches prose voice, which is the product's core value,
and the "hold the person without competing with the voice" constraint at `api.js:2238` is the precedent for how
short such a clause must be. It is also the one recommendation in this review that the corpus suggests the model
may already be doing unaided — which is an argument for measuring before building. **Flagging the fork rather than
picking it.**

---

## What the Jemisin lens would actually take from this game

1. **The whispers tier.** Rumour that may exaggerate, misattribute and garble a name but may never invent an event —
   filed on a ring, served back as hearsay beside the record, never as truth. That is a formalisation of the
   unreliable past that no novel needs and every long-running world does.
2. **Death as a character with a contract.** One question, answered only from what the world already contains, never
   spending an unrevealed turning point, and whatever Death says becomes canon the GM must honour ever after. A
   ruling that turns a failure state into authored world-canon is a genuinely new device.
3. **The engine note as a channel.** The finding that an instruction which must beat the narrator's own recent
   output needs a new *position in the conversation*, not a louder rule — three rounds of field failure to learn it —
   is a craft insight about authority and recency that applies to any narrator, human or not.

## Verification gaps

- **Second person is the one lane where her positions are rich and the game's are load-bearing** — but the four
  sharpest quotes (§1.1–§1.3, §1.5, all Clarkesworld) came through a summarizing fetch layer twice plus search-index
  corroboration, and were never read off the raw page. F1's *argument* survives without them (§1.9's slide text is
  byte-verified twice, and `TRICK`/`BIGIDEA`/`WE` are her own words). Re-verify before printing any of them.
- **No sourced position on memory as a system.** F4 rests on §6.1's ◐ item plus two adjacent ● ones. The Broken
  Earth's forgotten-history architecture is not evidence of a stated craft position, and the best lead for one
  (UC Press *Elementa*, "Repairing the Broken Earth") returned 403.
- **No verified statement on AI or machine-narrated fiction.** Deliberately absent. F1's recommendation is grounded
  in her second-person positions, never in an imagined view of this product.
- **MasterClass is titles only** (403). §3.1 — power dynamics as a named worldbuilding step — is the backbone of F2
  and rests on a chapter list, not on her wording. F2's recommendation would be stronger with her actual lesson text.
- **`guardian.com` and `theatlantic.com` were read through kalamu.com reproductions.** §3.6 and §2.10's "Social
  sciences are sciences too" are ◐ for that reason.
- **The corpora are three fixtures, not a sample.** F1's "13 of 50 turns speak for you" and F3's "0 of 76 quoted
  lines" are measured on one 50-turn fresh campaign under one prose voice (`howard`) and one model. F3's finding in
  particular should be re-measured on a second campaign before the `DEFAULT_RULES` clause is written, since a single
  blueprint's authored cast may be doing the work rather than the engine.
- **F8's premise is measured; its remedy is not.** The corpus suggests the model may already find the trust curve
  unaided. Measure the early/late difference on a matched pair before adding prompt weight.
