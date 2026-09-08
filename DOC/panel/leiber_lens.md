# The Leiber lens — a sourced review rubric for Traffic and Dragons

**Read this when** a prose-voice, companion, city, sorcery, money or grief change wants a second opinion from
the man who named the genre this game says it is. Research deliverable of the TTRPG panel project
(owner ruling 2026-09-05: research only; the panel skill is TODO #338). Companion file to
[`gygax_lens.md`](gygax_lens.md), whose shape this one matches.

**What this is.** A rubric of Fritz Leiber's *documented* positions — his letters, essays, interviews, and
where nothing else exists, his own fiction read as evidence of practice — each with a source, a confidence
grade and the review question it asks of this game. **What this is not:** an impersonation. A review that
uses this file speaks as "the Leiber lens", never as Leiber, and cites the entry it is applying. Any claim
not in this file is not a Leiber position for our purposes.

**Confidence legend.** ● primary (his own words, verified at a source) · ◐ secondary (attributed by a
reliable source, or read through a compilation) · ○ uncertain or contested. A ○ entry may inform a question,
never a verdict. **Fiction as evidence:** entries marked ●ƒ quote Leiber's own published fiction. His text
is primary, but a character's line is evidence of what he *wrote*, not a design creed — an ●ƒ entry can
support a pattern, never settle a rule on its own.

**Quotes are capped at fifteen words.** Sources are listed in §12.

---

## 0. Cautions — read before applying anything below

1. **He named the genre, and his definition is thinner than people assume.** Everything Leiber said on the
   record in 1961 was that "sword-and-sorcery" fixes the *culture-level* and the *supernatural element*
   (1.1, 1.2 ●). He did not publish a manifesto of hero types, moral scale or story shape. Almost every
   richer "Leiber position" below is read out of his practice or the critical record and grades ◐ or ●ƒ.
   The lens must not dress a critic's reading as the author's rule.
2. **He is a stylist first.** His documented craft statements are about *effect* — understatement, wonder
   paired with fear, confirmation rather than revelation (§9 ●/◐). Where this game's questions are
   procedural (XP curves, item pricing, clocks), the Leiber lens usually has nothing to say and should
   recuse itself. Send those to the Gygax lens.
3. **He was a gamer, which gives the lens unusual standing here.** He and Harry Fischer built a Nehwon
   wargame with a corrugated-paper diorama in 1937, before the first story sold; TSR published a descendant
   as *Lankhmar* in 1976, and he wrote "Fafhrd & the Mouser Say Their Say" for *The Dragon* #1 (C:5, C:6 ◐).
   Unlike most of the panel, he did not think a game of his world was a category error.
4. **The saga was co-created.** Fischer conceived the Mouser and wrote part of one novel; "Fafhrd and Me"
   is Leiber's own account of a shared invention (C:3 ◐). Do not attribute the duo's whole design to one
   man's doctrine.
5. **The grief is biographical, and that is a reason for care, not for licence.** "Ill Met in Lankhmar"
   (1970) kills both heroes' lovers in one night, and the critical record reads it against Jonquil Leiber's
   death in 1969 (7.1 ◐). The lens may use this to argue that loss is the saga's engine. It must not
   psychoanalyse, and it must not recommend that a player's companion die to make better fiction.
6. **His fiction's sexual politics are of its time.** Lines like "Girls were for dessert" and the running
   joke of the two heroes' arrested adolescence are in the text (●ƒ, §8). They are evidence about the books,
   not a standard to import. Nothing in this lens touches who the game is for.
7. **The 15-word cap bites hardest here.** Several quotations below reach this lens through Wikiquote's
   rendering rather than a page of the book. Those carry ◐ and appear again in §11.

---

## 1. What sword and sorcery IS

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 1.1 | The name he chose fixes two things and only two: the technology level and the presence of the supernatural. | "This accurately describes the points of culture-level and supernatural element" — *Amra*, July 1961 (A:2 ●) | The game calls itself sword and sorcery in its own system prompt (`api.js:2169`) and in a DEFAULT_RULE (`data.js:110`). Do BOTH halves bite? Culture-level is everywhere; is the supernatural present as *supernatural*, or as a costed ability list? |
| 1.2 | The term was meant as a working catchphrase, not a theory. | "I'll use sword-and-sorcery as a good popular catchphrase for the field" — *Ancalagon* #2, April 1961 (A:1 ●) | A caution on this whole file. Where the game departs from "Leiberian" practice, ask whether it departs from anything he actually claimed. |
| 1.3 | The label exists to separate this from historical adventure — the marvellous is the differentiator. | Same *Amra* letter distinguishes it from "cloak-and-sword" (A:2 ●) | Strip the magic out of a session's twenty turns: does anything left still require a fantasy world? If a scene would play identically in a historical caper, it is cloak-and-sword. |
| 1.4 | The scale is personal. The subgenre's heroes pursue their own ambition, without irony imposed from above. | Encyclopedia of SF: heroes of "brutal, heroic ambition" viewed without irony (B:1 ◐) | The campaign skeleton supplies acts, arcs and a wizard-king. Is the *player's* reason for being there personal — a grudge, a purse, a promise — or inherited from the plot spine? |
| 1.5 | His own practice was not the Howard hero. His two protagonists are rogues, thieves and mercenaries who fail often. | Wikipedia's characterisation: "drinking, feasting, wenching, brawling, stealing, and gambling" (C:1 ◐) | The tone entry for Sword and Sorcery says the protagonist is "competent and ruthless" (`data.js:4`). Competent is a Howard word. Where in the prompt is the hero allowed to be *outmatched*? |
| 1.6 | He took the pulp form seriously as craft, not as slumming. | "Anything I like as well as I do some of the Conan stories" — *The Dark Barbarian*, 1984 (A:4 ◐) | The AUTHORS bank treats voice as first-class. This position endorses that instinct: pulp deserves prose care. |

## 2. The city as adventure ground

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 2.1 | His signal contribution was the fantasy city as the adventure, not the road between adventures. | SFE calls the depiction of Lankhmar and its under-city his memorable achievement (B:2 ◐); Wikipedia's setting section (C:1 ◐) | The location graph, `[SUBLOCATION:]`, `[LOCATION_HOURS:]`, `buildMarketNote` (`api.js:564`) and the whispers ask (`api.js:533`) are all city machinery. Do the arcs it serves stay in town, or does the skeleton pull the party to a mountain? |
| 2.2 | A city is made of trades, smells and specific streets, not of a name. | "thick with thieves and shaven priests, lean-framed magicians and fat-bellied merchants" — quoted as his of Lankhmar (C:1 ●) | Test a settlement's prose for *occupations*. A city populated by quest-givers and shopkeepers is a hub; a city populated by fish-gutters, dock rats and a boy paid to watch a street is Lankhmar. |
| 2.3 | The city's factions are the plot generator: a Thieves' Guild, an assassins' brotherhood, sorcerers in towers. | Wikipedia setting; the gaming record of Lankhmar as a faction sandbox (C:1, C:4 ◐) | `[FACTION:]`/`[NPC_FACTION:]`/`[FACTION_REL:]` exist in the vocabulary. Are factions *asked for* anywhere the way wares and whispers are asked for, or do they only appear if the GM volunteers them? |
| 2.4 | Reputation in a city travels by mouth and arrives wrong. | The stories run on hearsay and garbled fame (C:1 ◐); ●ƒ "Legends travel on rainbow wings and sport gaudy colors" (*The Knight and Knave of Swords*) | This is the whispers system almost verbatim (`api.js:533`, `tag_table.js:435`). Does the rumour ever *cost* the party — a door closed, a price raised — or is it only colour? |
| 2.5 | Urban horror was his other invention: the modern city as a haunted place. | SFE on "Smoke Ghost" and *Our Lady of Darkness* (B:2 ◐); ●ƒ "Modern cities should have ghosts." (*Our Lady of Darkness*) | Does the game's city have a night self? The clock knows the hour (`data.js:128`); does the prose treat 3 a.m. in a district as a different *place*, not just a locked door? |

## 3. The pair — friendship as the engine

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 3.1 | Two heroes, neither a sidekick; the friendship outranks every other loyalty in the series. | "their friendship for each other always comes first" (D:1 ◐) | Companions here are a party of up to several, with sheets, XP and death. Is any single companion's bond with the hero structurally privileged, or are they interchangeable slots? |
| 3.2 | The pair are complementary opposites — the tall barbarian and the small city rogue — and the contrast is the comedy and the competence both. | "Fafhrd and Me" on the two inventors modelling themselves (C:3 ◐); Wikipedia's romantic/cynical pairing (C:1 ◐) | `buildPartyHistoriesBlock` (`api.js:587`) hands the GM each companion's backstory, trait, flaw and motivation. Is contrast ever *engineered* — does anything check that the party is not four of the same person? |
| 3.3 | The two talk constantly, and the talk is the texture. | Wikipedia on the ironic pairings and dialogue-driven scenes (C:1 ◐) | `[SAY:]` attribution (#96, `tag_table.js:177`) makes tagged dialogue first-class. Does any rule ever ask for an exchange *between companions* rather than each to the player? |
| 3.4 | The duo are, in the late books, two halves of one older hero — the partnership is metaphysical, not logistical. | Critical starter: "the sundered halves of an even greater hero from ages past" (D:1 ◐) | Read as a design question, not lore: do companions exist to add actions per turn, or to be someone the story is *about*? The #330 wants system (`data.js:133`) is the strongest existing answer. |
| 3.5 | Companionship survives romance. The heroes take lovers and keep each other. | D:1 ◐; the arc of the series to Rime Isle (C:1 ◐) | The live save has three companions married to the hero. Does the prompt know that companion-to-companion bonds exist, or only companion-to-player? The mutual-bond rule (`data.js:119`) pairs the player with an NPC. |

## 4. Humour beside menace

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 4.1 | The mode ranges from sombre to broad comedy inside one series, sometimes one scene. | SFE: mood varies "from sombre introspection to broad comedy" (B:2 ◐) | Is humour anywhere a *permitted register* in this engine independent of the chosen author voice? |
| 4.2 | The humour is often dark and character-based; it is not relief tacked on after the horror. | Wikipedia: "an often dark sense of humor" (C:1 ◐) | A joke that lands inside the danger is different from a comic voice. The Dinniman entry (`data.js:18`) is a comic voice; is there a rule for the first kind? |
| 4.3 | Irony and melodrama belong together; the best fantasy holds both. | Moorcock, *Wizardry and Wild Romance*: "Melodrama and irony work very well together" (E:1 ◐) | The STYLE tail (`api.js:2221`) bans em-dashes, age flourishes and clerical metaphor. It asks for nothing tonal. Would a one-clause tonal balance instruction be a prompt-weight win or a voice-collision risk? |
| 4.4 | Aphorism is his comic instrument — the wry line that is also true. | ●ƒ "Gods have very sharp ears for boasts." (*Swords and Ice Magic*); ●ƒ "He who lies artistically treads closer to truth." (*Swords in the Mist*) | Does any NPC in a session get to be *funny* about the world, or only informative and afraid? |
| 4.5 | The comedy is frequently at the heroes' expense; they are ridiculous as often as they are formidable. | Wikipedia on their arrested adolescence and repeated humiliations (C:1 ◐) | The reckless wildcard (`api.js:679`) rewards spectacle either way. Is there any path where the hero is simply *embarrassed* — and would the game's second-person voice tolerate it? |

## 5. Sorcery — eerie, costly, and not the hero's tool

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 5.1 | The supernatural element is half the genre's definition; it is what makes the story not a historical caper. | *Amra* July 1961 (A:2 ●) | See 1.3. If magic in play reduces to a mana cost and a damage number, the definitional half has quietly gone. |
| 5.2 | Sorcery in his world is practised by *others* — patrons, adepts, priests — and dabbling in it goes badly. | The Mouser's failed apprenticeship in "The Unholy Grail"; Ningauble and Sheelba as the sources of power (C:1, C:3 ◐) | The player character casts from a bible-defined list with published effects and durations (`capability_bible.js`). Is any spell in the game *frightening to cast*? |
| 5.3 | The patrons are unreliable. They send the heroes into peril, tell them less than they know, and take payment. | Ningauble the "gossiper of the gods", Sheelba taciturn in his walking hut; both dispatch the pair on errands (C:1 ◐; D:1 ◐) | Quest-givers here are NPCs with attitudes and relations. Is there any adapter for a giver who *lies by omission* and is still the only door? The skeleton's secret gates are the closest thing. |
| 5.4 | Magic is transactional and the price is real, not a resource bar. | The tone entry's own phrasing, "Dark, transactional" (`data.js:4`), agrees; Moorcock's contentDNA states it as a rule (`data.js:40`) | The Howard contentDNA contains the sharpest statement of this in the whole codebase — "Ancient sorcery is always malevolent and beyond mastery" (`data.js:25`). Why is that clause scoped to one author voice rather than to the sword-and-sorcery tone? |
| 5.5 | The unnamable beats the described. | ●/◐ "Understatement is the horror writer's surest tool" — *Terror, Mystery, Wonder*, 1980 (A:5) | The engine's bestiary and `[SPELL_DEF:]`/`[ITEM_DEF:]` canon exist so the GM cannot drift. Is there a rule that lets a *thing* stay undefined on purpose? |

## 6. Money and its lack

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 6.1 | Poverty is the recurring motive: the pair take work because they are broke. | Wikipedia: poverty as recurring motivation for mercenary work (C:1 ◐) | The live save holds 16,683 gold and 84 items at turn 2,437. What in this engine can make a hero broke again? |
| 6.2 | Freedom has a price, and the price is having no money. | ●ƒ "Aye, there's the bitter core of all freedom: no pay!" (*Swords in the Mist*) | The market layer prices at value (`api.js:576`). Pricing is a *supply* mechanism. Where is the demand side — upkeep, carousing, tribute, theft, bribes? |
| 6.3 | The take rarely survives the story. Treasure is lost, spent, cursed, or was never real. | "Unlike men, rubies and emeralds do not rest quietly" ●ƒ (*Swords Against Death*); the pattern of the early stories (C:1 ◐) | Does any completed arc ever *end poorer than it started*? If not, the economy is a ratchet and gold has stopped being a motive by mid-campaign. |
| 6.4 | Gold as motive is compatible with the genre label he coined; grand destiny is optional. | The tone entry "Gold and glory drive action" (`data.js:4`) is squarely his | Where the campaign skeleton supplies a destiny, does gold still drive anything? A hero with 16,683 gp cannot be hired. |

## 7. Death, loss and grief

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 7.1 | The saga's engine event is a double bereavement: both heroes lose their lovers in one night, and never stop carrying it. | "Ill Met in Lankhmar" (1970); the critical record reads it against Jonquil Leiber's death in 1969 (C:1, C:2 ◐) | The engine has core memories, defining moments and durable bonds. Is there any machinery that treats a *loss* as a permanent alteration to the character, the way a level or an item is permanent? |
| 7.2 | Revenge does not repair the loss, and he says so in the text. | ●ƒ "Revenge is empty. It cannot bring back the dead." (*Swords Against Death*) | If a companion dies, does the engine offer anything but a revenge quest? |
| 7.3 | Grief is compatible with continuing the adventure — the stories go on, funnier and darker both. | The series runs decades past the deaths (C:1 ◐) | This is the anti-argument to any "make it sadder" recommendation. Loss is not a tone; it is a fact the comedy then has to live beside. |
| 7.4 | Killing is not laundered by the word for it. | ●ƒ "Killing is murder, no matter what nice names" (*Swords and Deviltry*; wording verified only via compilation, see §11) | The engine owns death and the whispers carry reputation. Does a killing ever reach the party as *blame* rather than as fame? |
| 7.5 | Death is not the only exit. His characters are cheated, marooned, transformed, shrunk, and enslaved. | *The Swords of Lankhmar*'s miniaturisation; the pattern across the books (B:2 ◐) | The plot-armor note (`api.js:549`) already asks for a graded exit — capture, a leap, a body never found. Is the same ladder available for the *player*, or does the hero only ever win or die? |

## 8. Sex and romance

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 8.1 | Sex is present, frank for its era, and often comic or transactional rather than romantic. | SFE notes the sophisticated and fetishistic content (B:2 ◐); ●ƒ "Girls were for dessert." (*Swords Against Death*) | Adult mode (`api.js:2108`) permits explicit content and forbids the fade to black. It says nothing about *register*. Explicit and earnest is a different genre from explicit and wry. |
| 8.2 | Romance carries menace: a lover is a danger, a hostage to fortune, or a doom. | Vlana and Ivrian's fate (C:1 ◐); ●ƒ "Sorcery and romantic love come to the same thing." (*Crazy Joanna*, 1968) | Three married companions in the live save. Does any prompt surface treat a spouse as *leverage an antagonist could use*? |
| 8.3 | Attachment does not domesticate the adventurer; the heroes stay rootless for most of the saga. | The late Rime Isle settling is the exception that ends the series (C:1 ◐) | Marriage here is a `RELATIONSHIP_BOND` axis and nothing else changes. Should it change anything? Leiber's answer is: not for a long time, and then everything. |

## 9. The supernatural's ambiguity, and how horror is made

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 9.1 | Wonder and fear are the same faculty. Remove one and the other dies. | ●/◐ "No wonder without fear, no fear without wonder" — *Terror, Mystery, Wonder*, 1980 (A:5) | The house system prompt asks for "danger, mystery, and wonder" (`api.js:2169`). This position says the three are not a list — wonder is *made of* fear. Does a wondrous scene in the corpus contain any dread at all? |
| 9.2 | Understatement, not display, is the tool. | ●/◐ same source (A:5) | Against the STYLE tail's "one main image per sentence" (`api.js:2221`) — the engine already legislates restraint at the sentence level. Does anything legislate restraint at the *reveal* level? |
| 9.3 | Lovecraft's method was confirmation, not revelation: the reader suspects early, and the climax proves it. | Leiber, "A Literary Copernicus", 1949, as summarised in the critical record (A:6 ◐) | The engine has `[FUTURE_EVENT:]` promises and a rule to honour them (`data.js:127`). That IS confirmation architecture. Is the payoff staged as proof of a dread already earned, or as a surprise? |
| 9.4 | Lovecraft's achievement was relocating dread into the real, indifferent universe. | Leiber's "literary Copernicus" formulation, 1949 (A:6 ◐) | The Lovecraft voice entry (`data.js:38`) carries this well. The question for the *game* is whether cosmic scale ever survives contact with a hit-point total. |
| 9.5 | To be taken seriously, fiction must convince. | ●/◐ "To merit serious consideration, fiction must convince the reader" — *Terror, Mystery, Wonder* (A:5) | The anti-drift stack exists to make the world stay true. This position is its literary justification: continuity is not bookkeeping, it is the thing that makes dread land. |

## 10. Form, pacing and the villain

| # | Position | Evidence | The question it asks |
|---|---|---|---|
| 10.1 | The natural unit is the story, not the novel. He wrote one great Lankhmar novel and dozens of tales. | The series is a story cycle; *The Swords of Lankhmar* is the outlier (B:2 ◐) | Chapters, arcs and acts here are novel-shaped. Does a single evening of play resolve *anything*, or only advance? |
| 10.2 | The cycle nonetheless has continuity: the heroes age, marry, take responsibility, and end somewhere. | Wikipedia on the arc to Rime Isle (C:1 ◐) | Episodes plus a real arc is exactly the game's design. This position endorses it; it is not a criticism. |
| 10.3 | Villains are local, venal and specific — a guild master, a rival, a bored adept — more often than cosmic. | The recurring antagonists of the Lankhmar stories (C:1 ◐) | The skeleton reaches for a wizard-king. Is there a rung below the arc antagonist — a nuisance with a grudge who never becomes a boss? |
| 10.4 | The world has gods, and they are petty, gossiping and dangerous rather than sublime. | ●ƒ "Gods have very sharp ears for boasts." (*Swords and Ice Magic*); Ningauble as "gossiper of the gods" (C:1 ◐) | The deity map (`data.js:141`) assigns a dignified patron per alignment. Nothing makes a god *inconvenient*. |
| 10.5 | Sorcery, treasure and menace are what a scene is for; a scene with none is not a story. | Read from the practice of the story cycle (◐); the same instinct is written into `data.js:108` | The DRIVE THE ADVENTURE rule is this position stated as engineering. It is the most Leiberian sentence in the codebase alongside `data.js:110`. |

## 11. Positions the lens does NOT hold (and must never assert)

- That Leiber defined sword and sorcery by hero type, moral ambiguity, or story length. He defined it by
  culture-level and the supernatural (1.1). Everything else is inference.
- That he was reacting *against* Howard. He praised the Conan stories and took them seriously (1.6).
- That "sword and sorcery" was coined in *Amra*. It was coined in *Ancalagon* #2 and reprinted in *Amra*
  (A:1, B:1).
- That Moorcock coined it or proposed it. Moorcock asked for a name and proposed "epic fantasy"; Leiber
  answered (A:1, B:1).
- That he thought fantasy games trivialised his work. The opposite is documented (0.3).
- That the deaths of Vlana and Ivrian are a stated authorial thesis about grief. The biographical reading is
  the critical record's, not his (7.1, and see §0.5).
- That he wanted humour to *undercut* menace. The sourced claim is that both are present, sometimes at once
  (4.1, 4.3) — not that the joke wins.
- Any quotation not in this file. Several famous "Leiber" epigrams circulate without a traceable occasion.

## 12. Sources

**A — his own writing.**
A:1 *Ancalagon* #2, 6 April 1961, letter of comment, quoted in the [Historical Dictionary of Science
Fiction](https://sfdictionary.com/view/235/sword-and-sorcery). A:2 *Amra* v2 #15, July 1961, quoted in the
same entry and at [Flogging Babel](http://floggingbabel.blogspot.com/2012/11/the-origin-of-sword-and-sorcery.html).
A:3 "Fafhrd and Me" (1963; collected *The Second Book of Fritz Leiber*, 1975). A:4 bridge passage for *The
Dark Barbarian* (1984), quoted at [ThePulp.Net](https://thepulp.net/pulp-articles/three-sought-adventure/).
A:5 "Terror, Mystery, Wonder" (1980), via [Wikiquote](https://en.wikiquote.org/wiki/Fritz_Leiber), which
cites *The World Fantasy Awards Volume Two*. A:6 "A Literary Copernicus" (1949), via the
[Lovecraft wiki](https://lovecraft.fandom.com/wiki/A_Literary_Copernicus) summary.
Fiction quotations (●ƒ) are from *Swords and Deviltry*, *Swords Against Death*, *Swords in the Mist*,
*Swords and Ice Magic*, *The Knight and Knave of Swords*, *Our Lady of Darkness* and *Crazy Joanna*, all
read through [Wikiquote](https://en.wikiquote.org/wiki/Fritz_Leiber).

**B — reference works.** B:1 [SFE: Sword and Sorcery](https://sf-encyclopedia.com/entry/sword_and_sorcery).
B:2 [SFE: Leiber, Fritz](https://sf-encyclopedia.com/entry/leiber_fritz).

**C — the biographical and historical record.**
C:1 [Wikipedia: Fafhrd and the Gray Mouser](https://en.wikipedia.org/wiki/Fafhrd_and_the_Gray_Mouser).
C:2 [Wikipedia: Ill Met in Lankhmar](https://en.wikipedia.org/wiki/Ill_Met_in_Lankhmar).
C:3 [Wikipedia: Harry Otto Fischer](https://en.wikipedia.org/wiki/Harry_Otto_Fischer).
C:4 [Black Gate, "Danger in Every Dark Alley"](https://www.blackgate.com/2018/04/10/danger-in-every-dark-alley-40-years-of-adventuring-in-lankhmar-fritz-leibers-great-fantasy-metropolis/).
C:5 [Wikipedia: Lankhmar (board game)](https://en.wikipedia.org/wiki/Lankhmar_(board_game)).
C:6 "Fafhrd & the Mouser Say Their Say", *The Dragon* #1, June 1976 (listing seen at ISFDB; text not read).

**D — the critical starter.** D:1
[EBSCO research starter, "Fafhrd and the Gray Mouser"](https://www.ebsco.com/research-starters/literature-and-writing/fafhrd-and-gray-mouser-fritz-leiber).

**E — the critical record.** E:1 Michael Moorcock, *Wizardry and Wild Romance* (1987), quoted in
[Murray Ewing's review](http://www.murrayewing.co.uk/mewsings/2014/08/31/wizardry-and-wild-romance-by-michael-moorcock/).

---

## 13. Where the lens would fight the product

These are the places the Leiber lens argues against something the product has settled or validated. They are
here so a review can state dissent honestly, not so dissent wins.

- **The hero is too rich, too armed, and too married to be a Leiber hero** (6.1–6.4, 8.3). Sixteen thousand
  gold and three living spouses is the *end* of a Leiber saga, not its middle. The product's answer is that
  the player earned all three, and a game that takes them away is a game that punishes play. The lens's
  reply is narrower and worth hearing: it is not asking for loss, it is asking whether *gold still buys
  anything the player wants*.
- **Prose voice as a picked author** (1.6, 4.3). He would probably endorse the feature and dispute the menu:
  the man who named the genre is not on it, while four of his descendants are. Settled feature; the entry
  gap is not.
- **The engine owns the dice** (settled). The lens has little standing here — his position is about effect,
  not procedure — and should recuse itself. Its one observation is 4.5: a system that reports fifteen
  consecutive successes has removed the ridiculous, and the ridiculous was half his comedy.
- **Second person, singular hero** (3.1–3.5). His form is third person and a *pair*. The product's answer is
  that the companions and `[SAY:]` attribution reconstruct the duo inside a solo frame. The lens should test
  that claim rather than assert the loss: does any companion ever speak to another companion?
- **The novel-shaped arc** (10.1). Settled (skeleton + ending). The dissent is recorded and goes no further.
- **Wonder legislated as a checklist item** (9.1). "Danger, mystery, and wonder" as three nouns in a system
  prompt is the opposite of his claim that wonder is made of fear. This is a one-clause quarrel, not a
  design objection, and it lives on the drift surface, so it is a Fable question if anyone acts on it.

## 14. Open verification gaps

- **"Fafhrd and Me" has not been read first-hand.** Every use of it here is second-hand (A:3, C:3). The
  brief's richest promised lane is therefore its weakest.
- **The full *Ancalagon* letter text is unread.** Only the one clause circulates (A:1).
- **The *Amra* letter is quoted only in secondary sources.** Two independent sources agree on the wording,
  which is why it grades ● — but no scan was seen.
- **Goodman Games' two Leiber essays returned HTTP 403** to every fetch. They are the most likely source of
  further primary quotation and should be tried from a browser.
- **Wikiquote is the only route to *Terror, Mystery, Wonder* and to every ●ƒ fiction line.** The fetch tool
  truncates at 125 characters, so at least one quotation above ("Killing is murder…") is very likely
  incomplete. Verify against a copy of the books before any of them is quoted in a shipped document.
- **Moorcock's Leiber chapter in *Wizardry and Wild Romance* is unread.** E:1 is a reviewer's quotation of a
  general principle, not of the Leiber passage.
- **No Leiber interview was located.** The Charles Platt *Dream Makers II* (1983) interview exists and would
  be the single highest-value source for §4, §8 and §10; it is not online.
- **No Leiber statement on computers, AI or automated narration exists.** Do not invent one. His engagement
  with games is the 1937 wargame and the 1976 *Dragon* piece, and that is the whole record (0.3).
- **"Fafhrd & the Mouser Say Their Say" (*The Dragon* #1) was identified but not read.** It is the one
  document in the record where he wrote his heroes *about gaming*, and it should be found.

## 15. How a review would use this file (for #338)

Name the member, the surface, and the entries applied. For each entry: the question, the finding against
actual prompt text, rule text at `file:line`, or a corpus turn with a quotation of fifteen words or fewer,
and the verdict in the AUDIT_FABLE shape (finding, remedy, living status, validation). Dissent from §13 is
labelled as dissent. Settled owner rulings are flagged `settled` and carry no recommendation. The review's
first line carries the lens's caveat: a rubric of documented positions, not the man.
