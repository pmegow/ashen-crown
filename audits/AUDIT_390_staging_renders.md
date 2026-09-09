# #390 staging renders — the six-render A/B on the High Reach gate scene (2026-09-09)

**Question.** The #390 MOVEMENT clause (v1.870) put "direction of travel relative to the focal point" into the prompt-writer's brief. Two owner renders on Seedream still drew Nyla, the companion, in profile running across the frame. The writer's text was correct both times ("leaning into the advance toward the gate", "torso squared toward the gates"). Which half fails, the writer or the painter, and on what?

**Method.** The owner's second writer prompt, verbatim, rendered through the game's own fal path from the t129 save in a signed-out local preview (no sync). Model, seeds and two wording variables changed one at a time. Cost ≈ $0.35 against the $25/week allowance.

| # | Painter | Seeds | Companion wording | Result |
|---|---|---|---|---|
| 1 | Seedream 5 Pro (owner) | none (Seedream declares no party refs) | "seen from behind at the right flank", face described | miss — profile, running right |
| 2 | Seedream 5 Pro (owner) | none | "captured in profile on the right flank", face described | miss — profile, running right |
| 3 | Seedream 5 Pro | none | same as 2 | miss — profile, running left |
| 4 | Nano Banana 2 | player + companion portraits | same as 2 | miss — profile, running right |
| 5 | GPT Image 2 | none | same as 2 | miss — profile, facing left |
| 6 | Seedream 5 Pro | none | "seen from behind in three-quarter rear view, on the same path", face described | miss — facing the camera |
| 7 | Seedream 5 Pro | none | "back to the camera, on the same path", **no face words** (hair, build, clothes only) | **hit — seen from behind, running up the causeway at the gate** |

**Finding.** Neither the model nor the seeds nor the view-angle wording moved the companion. Removing her facial descriptors did, in one render. The painter shows the face it is given, and a shown face turns the body toward or across the camera; no movement or orientation wording survives that. The protagonist confirms it from the other side: Silas's eyes and jaw are described in every prompt and he has never once been drawn in the "three-quarter rear view" the prompt asks for.

**Cause in the brief.** The header demanded "gender, hair colour, eye colour, skin tone, clothing and visible gear" for EVERY character, so the writer described every face, so every figure faced the camera. The #209f "faces are optional" licence spoke to the writer's view-angle choice but never told it to withhold the face words.

**Fix (v1.877).** The header demands eye colour only for characters whose pose clause shows the face, and a new clause, "A DESCRIBED FACE IS A SHOWN FACE", tells the writer to carry a rear-view character's identity through hair, build, silhouette, clothing and gear only. Both pinned by the #165/#209 render-request test.

**Honest limits.** One hit is one hit; the miss set is five across three painters, which is what makes the single variable convincing. The next party-in-motion renders in play are the validation. Not tested: whether the writer, given the new clause, reliably withholds the face words on its own (the hit used a hand-edited prompt).

Renders 3 and 7 are retained beside this file as `screenshots/390-seedream-face-described.jpg` and `screenshots/390-seedream-no-face-words.jpg`.
