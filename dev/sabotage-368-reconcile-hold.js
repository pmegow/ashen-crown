// dev/sabotage-368-reconcile-hold.js — proves the #368 clock rules are guarded: the reconcile cap applies in both
// directions and an out-of-character turn never moves the clock.
//   node dev/sabotage-368-reconcile-hold.js
var sabotage = require("./sabotage.js");
var rc = sabotage.prove({
  file: "clock.js",
  command: ["node", ["dev/run-tests.js", "#368"]],
  cases: [
    { label: "the cap goes back to dawn-crossing only (the t2366 phantom night returns)",
      find: '  if(delta>RECONCILE_SKIP_MIN){\n    var _x=ph.tgt<off;', replace: '  if(ph.tgt<off&&delta>RECONCILE_SKIP_MIN){\n    var _x=ph.tgt<off;' },
    { label: "the skip forgets its direction (the demand note can no longer say same-day)",
      find: 'turn:worldState.turn||0,sameDay:!_x};', replace: 'turn:worldState.turn||0};' },
    { label: "the out-of-character hold is dropped — a GM: question is charged again",
      find: 'if(typeof worldState!=="undefined"&&worldState&&worldState.clockHold){', replace: 'if(false){' }
  ]
});
process.exit(rc);
