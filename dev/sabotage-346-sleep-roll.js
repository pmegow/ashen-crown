// dev/sabotage-346-sleep-roll.js — proves the #346 long-rest rule is guarded: daylight rests sleep a fixed
// eight hours, evening rests roll to dawn, and the window's two boundaries are exactly 18:00 and 04:00.
//   node dev/sabotage-346-sleep-roll.js
var sabotage = require("./sabotage.js");
var rc = sabotage.prove({
  file: "clock.js",
  command: ["node", ["dev/run-tests.js", "#73 campaign clock"]],
  cases: [
    { label: "the daylight branch is dropped — every rest rolls to dawn again (the t37 whole-day nap returns)",
      find: 'var r=(clockSleepMode()==="dawn")?MIN_PER_DAY-(c.min%MIN_PER_DAY):SLEEP_FIXED_MIN;', replace: 'var r=MIN_PER_DAY-(c.min%MIN_PER_DAY);' },
    { label: "the evening window opens an hour early (5 pm rolls to dawn)",
      find: 'SLEEP_EVENING_FROM=18', replace: 'SLEEP_EVENING_FROM=17' },
    { label: "the evening window closes an hour late (4 am still rolls to dawn)",
      find: 'SLEEP_EVENING_TO=4', replace: 'SLEEP_EVENING_TO=5' },
    { label: "the fixed sleep grows to nine hours",
      find: 'SLEEP_FIXED_MIN=8*MIN_PER_HOUR', replace: 'SLEEP_FIXED_MIN=9*MIN_PER_HOUR' },
    { label: "the #142 door is dropped — a demanded heal rest no longer reaches dawn from daylight",
      find: 'if(typeof worldState!=="undefined"&&worldState&&worldState.reconcileSkip)return "dawn";', replace: '' },
    { label: "the mode reads the wrong zero (dawn treated as midnight — 6 am counts as evening)",
      find: '/MIN_PER_HOUR)+DAWN_HOUR)%24', replace: '/MIN_PER_HOUR)+0)%24' }
  ]
});
process.exit(rc);
