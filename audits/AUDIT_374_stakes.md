# #374 — stakes readout verification

The save already retained dice outcomes and tag receipts, but Drift health offered no measure of the last recorded risk or whether the campaign was in its coda.

The new row follows Rolled outcomes. The pure counter reads existing rings and due schedule data without writing state; the schedule predicate is tested against scheduleDue, avoiding clockEnsure's migration/repair side effects. The row uses the existing codaState predicate. Duplicate and missing turn records cannot inflate the quiet-window lower bound. Old dice history cannot bypass the 40-entry tag cap. No growing collection is retained between calls.

Seven new tests were run before implementation (missing counter/row failures), then passed. Five named sabotage cases prove distance, cap, coda, schedule pressure, and healing exclusion. Full gate: 2,069 engine assertions and 28 standalone suites, ALL GREEN. Existing assertions and frozen hashes unchanged.

Inspected an actual local save: The Iron Meridian, Gazz Quickfuse, t228 (authored-repaired export). Its last recorded risk is -5 gp at t197. The row reads **31 turns since recorded risk (gold spent); coda: yes**, HEALTHY. Restoring an active act in the disposable browser fixture changes only the display to WATCH and coda: no. Empty/young records are N/A; a quiet full ring reads 40+ turns. The modal's existing renderer handles the row without changes.

Chrome screenshots, 1200px desktop and 390px mobile, captured with an isolated profile and external requests blocked. No campaign was synced or modified on disk.

- [Before](screenshots/374-before.png)
- [Real coda](screenshots/374-coda.png)
- [Active act comparison](screenshots/374-active.png)
- [Mobile](screenshots/374-mobile.png)

Built for owner testing (◉); no master push or deployment.

Final integration carries upstream #388 unchanged. Its concurrent v1.869 landing collided with the initial stakes marker; stakes now uses v1.873 / tnd-v3-20260909e, after the versions reserved by the other assigned UI PRs. TODO #374 explicitly remains built/owner-test (◉). No upstream functionality was removed.
