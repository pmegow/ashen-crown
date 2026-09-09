# #23 UX passes — Astra, 2026-09-09

## ③ Skills and abilities

Mobile baseline rendered skill names, ranks and bonuses as one comma run. Canonical ability names were clickable spans, inaccessible to keyboard activation; descriptions used small low-contrast text. The shared sheet renderer now separates earned skills into wrapping name/rank/bonus rows, uses native detail buttons where canon exists, and raises description size/contrast with long-word wrapping. Unknown abilities stay inert. All three sheet hosts retain one renderer and the same existing skillLevel/skillLevelBonus/capabilityLookup functions. No mechanics or rule text changed.

Two focused DOM fixture groups fail on the baseline and pass after, including hostile names/prose and unchanged world state; two retained named mutations prove them. Desktop/mobile before/after screenshots: `audits/screenshots/23-skills-*.png`. The same synthetic character is used in both. Rendering reviewed at 390×844 and 1200×1100. Full engine gate passes before commit. No accumulating collections, timers or persistent resources were added.

## ④ First-turn onboarding

Baseline put four instructions in a single small-text paragraph. The same sentences are grouped by next move, suggestions and Table Talk, with larger text and a 44px Start playing control. The dialog has a programmatic name, initial focus, Tab containment and Escape dismissal; dismissal returns focus to the action input without sending. Existing once-per-device and Car Mode guards are unchanged. The panel scrolls within a short viewport.

Three focused fixture groups (two failed on baseline) and three retained named mutation proofs pass. Actual Chrome QA: desktop 1200×1100, mobile 390×844, short landscape 568×320; screenshots under `audits/screenshots/23-onboarding-*.png`. Native focus return verified. No document-level listeners, timers or persistent data beyond the existing seen flag. The modal's handler dies with the removed modal. Separate commit and version/cache bump from ③.

Both assigned passes are ready for owner review. The unrelated protected v1258 replay drift remains present on origin/master; no baseline was changed. #23's other owner/quest-history obligations remain open.
