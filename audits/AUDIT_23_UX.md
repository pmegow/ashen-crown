# #23 UX passes — Astra, 2026-09-09

## ③ Skills and abilities

Mobile baseline rendered skill names, ranks and bonuses as one comma run. Canonical ability names were clickable spans, inaccessible to keyboard activation; descriptions used small low-contrast text. The shared sheet renderer now separates earned skills into wrapping name/rank/bonus rows, uses native detail buttons where canon exists, and raises description size/contrast with long-word wrapping. Unknown abilities stay inert. All three sheet hosts retain one renderer and the same existing skillLevel/skillLevelBonus/capabilityLookup functions. No mechanics or rule text changed.

Two focused DOM fixture groups fail on the baseline and pass after, including hostile names/prose and unchanged world state; two retained named mutations prove them. Desktop/mobile before/after screenshots: `audits/screenshots/23-skills-*.png`. The same synthetic character is used in both. Rendering reviewed at 390×844 and 1200×1100. Full engine gate passes before commit. No accumulating collections, timers or persistent resources were added.
