# The Abercrombie lens — a sourced review rubric for Traffic and Dragons

**Read this when** a prose-voice, violence, consequence, companion-dialogue, antagonist or ending change
wants a second opinion from a working craftsman of exactly the register this game is trying to write.
Research deliverable of the TTRPG panel project (TODO #338); shaped to match
[`gygax_lens.md`](gygax_lens.md).

**What this is.** A rubric of Joe Abercrombie's *documented craft positions*, each with a source, a
confidence grade and the review question it asks of this game. **What this is not:** an impersonation. A
review that uses this file speaks as "the Abercrombie lens", never as Abercrombie, and cites the entry it
is applying. Any claim not in this file is not an Abercrombie position for our purposes.

**Evidence base.** Two lanes, both read first-hand this pass. **Lane A — his own blog**
(joeabercrombie.com): *The Value of Grit*, *Gritty Washback*, *Why the Third Person?*, *First Words*,
*When is it Good Enough?*, *Advice for Budding Fantasists*, *Ending Like an Avalanche*, *2nd Draft* and
*2nd Draft Part 2*. **Lane B — interviews** read at their own pages: SFFWorld 2007, Fantasy-Faction 2011
(*The Heroes*), Dark Matter Zine, Fantasy-Hive 2019 (*A Little Hatred*), Winter is Coming 2025 (*The
Devils*), and the Damien Walter–hosted grimdark discussion. Entry references below are `A:<post>` and
`B:<outlet>`. Quotes are capped at fifteen words throughout.

**Confidence legend.** ● primary (his own words, verified on the page cited) · ◐ secondary (his words read
through a host or compilation, or the original occasion unverified) · ○ uncertain (search summary only,
no page verified). A ○ entry may inform a question, never a verdict.

**Living person.** Public craft statements only. Nothing in this file touches his person, politics,
opinions of other writers, or anything outside how he says fiction is made.

---

## 0. Cautions — read before applying anything below

1. **He is a novelist, not a game designer.** Every position below was stated about writing books that a
   single author controls, revises four times and ends where he chooses. This game is improvised at
   runtime by a model that cannot revise, in front of a player who can walk off in any direction. Where a
   position depends on *revision* (§7.1, §7.2, §8.2) it converts into a question about the engine's
   feedback loops, never into "the GM should have written it better the first time."
2. **He rejects the label the lens is being hired for.** On grimdark: "I much preferred it when it was an
   out and out piss-take" (B:Walter ◐); "I never know what people are referring to" (B:Walter ◐). Do not
   use this lens to certify the game as grimdark, or to argue that darker is better. He argues the exact
   opposite in §2.5.
3. **He argues for range, not for grit.** "Grit is an inclusion. Not grit is an absence" (A:Grit ●) is a
   claim that grit *widens* the palette. Every position here about blood and cost is bounded by §2.5:
   more of it is worth less. A lens finding that amounts to "add more gore" is a misuse.
4. **Three of the game's seven shipped voices are not his.** Howard, Le Guin, Gaiman, Cook, Wells, Muir
   and Clines are on the same `AUTHORS` table, and the fresh corpus this review measured runs **Howard**.
   The lens judges *whether the voice the player chose actually lands*, never whether the game sounds like
   Abercrombie. The game's own `abercrombie` entry (`data.js:17`) is a third-party model of him and is
   evidence about the product, not about him.
5. **TODO #104 will de-brand the voices into attribute dials.** This file is internal review scaffolding,
   never a product feature. Nothing here should be read as an argument for keeping a living author's name
   on a shipped control.
6. **Two useful sources refused to load.** Writer Unboxed 2008 parts 1 and 2 and Grimdark Magazine's
   interview both returned 403. Positions that would have been strengthened there are graded ○ or absent;
   see §11.

---

## 1. Point of view and voice

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 1.1 | Tight third-person limited is the working default: less intimate than first, far more flexible. | "Third person limited doesn't have quite the level of intimacy first person can provide" — A:Why the Third Person? ● | This game is locked to **second person present**, and `api.js:1597` records that two attempts to move it failed. Second person is *more* intimate than either. Does the prose actually use that intimacy, or narrate at the player from outside? |
| 1.2 | Voice is not decoration; it is the character. Each POV gets its own vocabulary and rhythm. | "so a Logen chapter instantly has a different voice, a different vocabulary, a different rhythm" — A:Why the Third Person? ● | One narrator serves one player character plus every companion. Does a companion's speech carry a vocabulary of their own, or the narrator's? |
| 1.3 | The style itself carries characterisation before any event does. | "The style hopefully communicates something about the nature of that character right away" — A:Why the Third Person? ● | The `AUTHORS.vc` directive sets the *narrator's* style campaign-wide. Nothing sets a per-NPC style. Is that a gap or a deliberate simplification? |
| 1.4 | Getting the reader inside heads is the single stated aim. | "get the reader into the heads of the characters" · "give each point of view as strong and distinct a voice as possible" — B:Winter is Coming ● | The engine has no interiority tag. Companion inner life exists only as prompt text (`buildPartyHistoriesBlock`, #341). Is it ever *read back* into what they say? |
| 1.5 | Characterisation arrives through action, dialogue and small interjections — not exposition. | "allowing one to appear through action and dialogue and subtle interjections of thought and style" — A:First Words ● | Character sheets, relationship axes and defining moments are all told to the GM as facts. Which of them ever become behaviour the player can see without being told? |

## 2. Violence, and what it costs

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 2.1 | Violence is ugly and it damages permanently. | "Real violence is painful, dirty and deeply unpleasant, with sudden and explosive lasting physical damage" — A:Grit ● | HP returns to full at one long rest (`restSpells`). Damage is therefore never lasting by construction. The owner has settled "no convalescence" — so where *does* a fight leave a mark? |
| 2.2 | A close-POV fight cannot be written honestly without the physical detail. | "very hard to write a convincing, immersive combat scene in tight point of view" · "blood, pain, fear, and horror" — A:Grit ● | Do the game's fights carry fear, or only choreography? Fear is the one of the four that a competent hero at high level stops feeling. |
| 2.3 | Real fighting is random, dirty and decided by accident as often as skill. | "war in the real world tends to be a more random, dirty, unpredictable business" · "strange coincidences, personality clashes, mistakes, and bad luck" — B:Fantasy-Faction ● | The engine owns the dice and the GM narrates them. Does a bad roll ever produce an *accident* — a dropped weapon, a slip, a mistake — or only a miss? |
| 2.4 | Combatants come out of it damaged in body and mind. | "Soldiers tend to end up a little bit beat up, injured both physically and" [mentally] — B:Fantasy-Hive ● | `[CONDITION:]` exists and is the mechanism for exactly this. Measure how often it fires after a fight. |
| 2.5 | **Grit devalues with volume.** More of it is worth less. | "There's a degree to which grit loses its power the more of it there" [is] — A:Grit ● | The hard bound on every finding above. A recommendation that increases the *rate* of blood rather than its *meaning* fails this entry. |
| 2.6 | The point of darkness is contrast, not saturation. | "extremes of darkness only allow the glimpses of light to twinkle" — A:Grit ● | Does the game ever go quiet, warm or funny long enough for a dark turn to land? Car Mode's montage and the fourth button are the levers. |

## 3. Consequence and the refusal of safety

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 3.1 | Consequence is the whole argument for the unflinching detail — not the detail itself. | "an unflinching approach to the details of sex and violence and their consequences" — B:Walter ◐ | Consequence in this engine is state: HP, conditions, alignment, relationships, whispers, quests. Which of those actually change after a violent scene? |
| 3.2 | The reader should not feel safe. | Search summary only; no page verified — ○ | Informs a question, never a verdict: does the player *feel* at risk, given three guaranteed returns from death? The design answer is that the risk is the campaign ending, not the character. |
| 3.3 | An ending you are comfortable with has failed. | "If you're comfortable with it all, then it ain't really worked" — A:Ending Like an Avalanche ● | The `campaignDenouement` path and the #325 offered ending. Do they resolve, or do they tidy? |
| 3.4 | He resists the sentimental landing specifically. | "drowning in a saccharine bog of sentimentality" — A:Ending Like an Avalanche ● | Death's walk hands the player a canonical gift (`fileCoreMemory("death-gift")`). Is the gift a comfort or a cost? |
| 3.5 | Escalation is structural: each part larger and faster than the last. | "build steadily so that scale and pace mounted with each part" — A:Ending Like an Avalanche ● | `RESPAWNS_PER_CAMPAIGN`=3 with the last walk announced as the last is textbook this. So is the act/arc spine. Does the *prose* escalate with them, or stay level? |
| 3.6 | Real darkness is rarer in fantasy than the genre's reputation suggests. | "Real darkness is pretty rare in any genre, but particularly in epic fantasy" — A:Ending Like an Avalanche ● | A caution against grading this product against a reputation instead of against its own turns. |

## 4. Humour and register

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 4.1 | Humour is one of his four named strengths, alongside character, dialogue and action. | "Characters, dialogue, humour, action." — B:SFFWorld ● | Four things. The game's STYLE tail governs sentence shape and bans two images; it says nothing about humour at all. |
| 4.2 | Dark and funny are the same breath, not alternating modes. | "Something can be humorous and still be dark, often at the same time" — B:SFFWorld ● | Can a scene in this game be both? Or does the tone directive (`TONES.vc`) pick one register and hold it? |
| 4.3 | Gallows humour is a *texture* running through, not a joke slot. | "a thick vein of gallows humour" — B:Winter is Coming ● | Texture is exactly what a per-turn prompt is bad at. Is there any channel that carries texture rather than instruction? |
| 4.4 | He is funnier in life than on the page; the fiction is the restrained version. | "In real life I am a lot more hilarious than my fiction" — B:Dark Matter Zine ● | Guards against the opposite failure: a GM that quips constantly. The Dinniman voice already occupies that end of the dial. |
| 4.5 | Swearing was one of the three things that made his first book a hard sell — and he kept it. | "too violent, too dark but too funny at the same time, too sweary" — B:Fantasy-Faction ● | Adult mode unlocks profanity globally (`api.js:2108`) and `profane:true` gates it per voice. Register is therefore a *setting*, not a character trait. Should a foul-mouthed NPC swear in a clean-mode campaign? |
| 4.6 | Modern relevance beats period flavour. | "I don't want to write fantasy that feels archaic or arcane" — B:Dark Matter Zine ● | The STYLE tail bans the antiquity ratchet (#227) for exactly this reason. The lens seconds that ban without reservation. |

## 5. Dialogue and the cast

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 5.1 | Dialogue is tested by one question: would this person really say this here? | "would this character really say these words in this situation?" — A:Advice for Budding Fantasists ● | The single most portable test in this file. Apply it to companion lines in any corpus turn. |
| 5.2 | A whole revision pass exists to replace generic speech with specific speech. | "replace the generic with the distinctive both in dialogue and description" — A:2nd Draft Part 2 ● | The GM gets one pass and no revision. The engine's substitute is the note-builder loop. Which note builder polices *speech*? (`buildSayComplianceNudge` polices attribution, not character.) |
| 5.3 | He keeps a crib sheet of every significant character's mannerisms and speech tics before that pass. | A:2nd Draft Part 2 ● (described, not quoted at length) | `memory.npcs` plus `buildPartyHistoriesBlock` *is* that crib sheet. Is it read for mannerism, or only for facts? |
| 5.4 | People are understandable to themselves — including the ones behaving badly. | "the vast, vast majority of people are understandable to themselves" — B:Fantasy-Hive ● | Every NPC in this game is stored with a `status` and a `rel` toward the player. Nothing stores what they want for themselves except a companion's optional `agenda`. |
| 5.5 | The small group on the road is the richest engine for character. | "the interplay between a small group, often on the road" was "the most fun" — B:Winter is Coming ● | This is precisely the game's default shape: a hero and up to three companions travelling. The lens says the product's core loop is the right one. |
| 5.6 | Characters generate situations, and situations demand characters — the traffic runs both ways. | "The action I want dictates the type of characters I need" — B:Dark Matter Zine ● | The campaign skeleton authors situations first. Do companions and NPCs get to *cause* scenes, or only react to authored ones? |

## 6. Heroes, villains and morality

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 6.1 | Nobody is the villain of their own story. | "no one's the villain of their own story" — B:Fantasy-Hive ● | Is there any house rule requiring an antagonist to have a reason? Or is that content dial attached to one voice? |
| 6.2 | The interesting work is going *inside* the villain, not opposite them. | "peel back the lid on the villains and see why they might behave" — B:Fantasy-Hive ● | The engine gives villains HP, morale and a plot-armour budget. It gives them no want. |
| 6.3 | Their reasons need not excuse anything — they only need to be real. | "they still have their reasons and their motives" — B:Fantasy-Hive ● | Guards against the opposite failure: a sympathetic-villain rule that makes every antagonist misunderstood. |
| 6.4 | Total good and total evil are no longer credible; good people in bad corners do bad things. | "Perhaps we no longer accept the idea that people can be totally good or" [totally evil] · "Everyone thinks they're good, and that good people in bad corners might have to" [do bad things] — A:Grit ● | The alignment axes are the mechanism for exactly this. Do they move when the player does something ugly and wins? |
| 6.5 | Heroism cannot be examined honestly without its darkness. | "it's hard to have an honest look at heroism without also considering the darkness" — B:Walter ◐ | Argues *for* the game's stated/actual alignment split rather than against it. |
| 6.6 | Sidelong subversion of the genre's clichés was the founding aim. | "Taking a slant-wise look at some of the clichés of epic fantasy was always" [one of my main aims] — B:SFFWorld ● | The DEFAULT_RULES ban on clerical plots and the #227 antiquity ban are the same instinct at rule level. Which *other* clichés does the game reproduce without noticing? |

## 7. Structure, pacing and the ending

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 7.1 | The opening is the most important part, and it is where the heaviest cutting happens. | "The start is probably the most important part of your book." — A:First Words ● | The freeform campaign start gets one review pass (`campaign_generator.js`). Is it a *cutting* pass or an additive one? |
| 7.2 | When in doubt, cut — with a jackhammer, not a scalpel. | "if you have your doubts about something, cut" · "more like a jackhammer than a scalpel" — A:First Words ● | The STYLE tail already says a short reply is the right reply when little happened. Measure whether that clause has any observable effect. |
| 7.3 | Tightening a story in time and place forces characters into each other. | "focusing the action very tightly in terms of time and space" — B:Fantasy-Faction ● | The montage (#308) does the opposite by design: it skips the low-pressure stretch. Both are legitimate; which does a given campaign need? |
| 7.4 | Entertainment first: the book must carry the reader along. | "A book should first of all be entertaining, carry the reader along." — B:SFFWorld ● | Directly at odds with the Gygax lens's §8 objection that performance degrades the referee. Where the two lenses disagree, say so and let the product choose. |
| 7.5 | Endings should be dark, strong and unsettling — the avalanche, not the whimper. | "I like my tea dark and strong, and my endings the same way." — A:Ending Like an Avalanche ● | The settled skeleton-and-ending design. The lens's contribution here is a question about the *denouement's* register, not the ending's existence. |
| 7.6 | Craft and application carry the work when inspiration does not. | "the shortfall has to be made up by earthier virtues of craft and application" — A:Structure ● | Read as: the engine's guard rails *are* the application. A note builder is the machine equivalent of showing up. |

## 8. Honesty, description and what "realism" means

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 8.1 | One rule governs everything: be honest. | "You have to try to be honest. In every area of your writing." — A:Advice for Budding Fantasists ● | The lens's master entry. Every finding below traces back here. |
| 8.2 | Every metaphor must survive being asked whether the thing really looks like that. | "does that thing really look the way you're describing it" — A:Advice for Budding Fantasists ● | The `buildRegisterNote` ban on clerical imagery is this test, mechanised for one image. Nothing generalises it. |
| 8.3 | Dishonest writing weakens the effect regardless of how good it sounds. | "Everything that seems dishonest, that seems unconvincing, that seems untrue, weakens the effect." — A:Advice for Budding Fantasists ● | A stacked simile that nobody would think in the moment is a small dishonesty. Measure them. |
| 8.4 | A light hand on description; a few telling details beat a full inventory. | "Better to communicate a few telling details than to bury the reader under unnecessary" [blandness] — A:Advice for Budding Fantasists ● | Directly measurable: words per sentence, images per sentence, characters per turn. |
| 8.5 | "Realism" is the wrong word for fantasy; *honest* is the word. | "Realism is always a tough word to use in relation to fantasy" · "something that feels in some way honest, that says something about our world" — B:Walter ◐ | Protects the game from the trap of simulating a world. Consistent with Gygax 7.3 from the other direction. |
| 8.6 | Grit is a tool in a toolbox, chosen for a job. | "Gritty is one tool in the writer's arsenal" — A:Grit ● | The `TONES` table already *is* a toolbox with grit as one entry. The lens endorses the shape. |
| 8.7 | Nothing is ever finished; it is abandoned at exhaustion. | "The book is ready when I reach a point of bafflement and exhaustion with it" · "It's always been the best there is. And it's never good enough." — A:When is it Good Enough? ● | A turn is generated once and can never be revised. Every improvement must therefore live *before* the turn (prompt) or *after* it (note). There is no third place. |

---

## 9. Where the lens would fight the product

Stated as dissent so a review can record it honestly, not so the dissent wins by default. Several of these
are **settled owner rulings** and are marked as such; the lens records them and moves on.

- **The death walk is safety with ceremony** (3.2 ○, 3.3 ●). Three guaranteed returns is plot armour by
  the owner's own description. *Settled.* The lens's honest concession: the walk *escalates* (3.5 ●) and
  the campaign really can end, so the risk was moved rather than removed.
- **Full healing at rest erases 2.1's "lasting physical damage".** *Settled* ("no convalescence"). The
  lens's remaining question is not mechanical: what does the *story* keep?
- **Engine-owned dice make 2.3's accidents unavailable.** A d20 that misses cannot produce a dropped
  weapon. *Settled* (model-narrated dice). The available surface is the *narration* of a failure, not its
  resolution.
- **Suggestion buttons are a comfort the page does not have.** Three offered actions plus an engine fourth
  is a menu; his fiction runs on characters doing the thing nobody offered. The product's answer is that
  the free-text box is always open and the wildcard exists precisely to break the menu.
- **Author-branded voices are a category he would find odd** — the whole of §1 says voice belongs to a
  character, not to a campaign setting. *Settled* (the voice feature ships); #104 de-branding partly
  answers it by turning names into dials.
- **He would recuse himself on Table Talk and Car Mode entirely.** Neither is fiction. *Settled.*

## 10. Things the lens must never say

- That he endorses grimdark, or thinks darker is better. He calls the label a piss-take (§0.2) and argues
  grit devalues with volume (2.5).
- That he is against happy endings. He is against *unearned* ones (3.4).
- That "kill your darlings" or "no plot armour" are his phrases. Neither was found in any source read here.
- That he thinks violence should be gratuitous. Every violence entry is subordinate to consequence (3.1)
  and honesty (8.1).
- That he prescribes second person, or has any recorded view on it. He has not; §1.1 is a conversion.
- That he has said anything about AI, game masters, or a machine writing fiction. **No such statement was
  found.** Do not invent one.
- That the game's `abercrombie` voice directive quotes him. It is a third-party stylistic model
  (`data.js:17`) and none of its wording appears in any source in this file.
- Anything about his person, opinions of other authors, or life outside stated craft.

## 11. Open verification gaps

- **Writer Unboxed 2008, parts 1 and 2 — 403.** Likely the richest single source on early-career craft
  intent; unread.
- **Grimdark Magazine's interview — 403.** The obvious place for a verified statement on violence and
  consequence in his own words; every grimdark-magazine claim here is therefore absent or ○.
- **The Damien Walter–hosted grimdark discussion** is a third-party page reproducing a conversation; the
  original occasion was not verified. Everything sourced `B:Walter` is ◐ for that reason.
- **"I don't want to feel entirely safe" (3.2)** exists only as a search-result paraphrase. No page found.
  It is ○ and carries no verdict.
- **A Guardian quote about *The First Law* being a reaction against shiny heroic fantasy** surfaced in
  search and was not verified at the Guardian. Deliberately excluded.
- **No statement on profanity as anachronism** was found, despite looking. §4.5 rests on one aside about
  his first book being "too sweary"; do not build a register doctrine on it.
- **Nothing on solo play, on a reader who is also a protagonist, or on improvised fiction.** The whole of
  §1's conversion to second person is the lens's inference and is flagged as such.

## 12. How a review would use this file

Same protocol as the Gygax lens. A panel review names the member, the surface under review and the entries
applied. For each entry: the question, the finding against actual prose or code (a corpus turn with a
≤15-word quote, or rule text at `file:line`), and the verdict in the AUDIT_FABLE shape. Dissent from §9 is
stated as dissent, with settled rulings marked settled. The review's first line carries the caveat: this is
a rubric of documented positions, not the man.

The first review written against this file is
[`reviews/abercrombie_findings.md`](reviews/abercrombie_findings.md) (v1.848 corpora).
