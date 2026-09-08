// dev/sabotage-369-pressure.js — proves the #369 pressure observers are guarded: the deadline axis on the
// commitment detector and the near-schedule ask in UPCOMING.
//   node dev/sabotage-369-pressure.js
var sabotage = require("./sabotage.js");
var rc1 = sabotage.prove({
  file: "game.js",
  command: ["node", ["dev/run-tests.js", "#369"]],
  cases: [
    { label: "the horizon axis is dropped — the low-tide threat goes unregistered again",
      find: "var hm=s.match(horizon),cm=s.match(cue);if(!hm||!cm||Math.abs(hm.index-cm.index)>160||hypoH)return null;", replace: "return null;" },
    { label: "the hypothetical fence is dropped — an if-clause arms a phantom deadline",
      find: "if(!hm||!cm||Math.abs(hm.index-cm.index)>160||hypoH)return null;", replace: "if(!hm||!cm||Math.abs(hm.index-cm.index)>160)return null;" }
  ]
});
var rc2 = sabotage.prove({
  file: "clock.js",
  command: ["node", ["dev/run-tests.js", "#369"]],
  cases: [
    { label: "the near-schedule ask is dropped from UPCOMING",
      find: '((pending[i].dueMin-c.min)<=SCHEDULE_NEAR_MIN?" — near:', replace: '(false?" — near:' },
    { label: "the near window grows to two days (a far solstice gets the ask)",
      find: "var SCHEDULE_NEAR_MIN=6*MIN_PER_HOUR;", replace: "var SCHEDULE_NEAR_MIN=6*MIN_PER_DAY;" }
  ]
});
process.exit(rc1 || rc2);
