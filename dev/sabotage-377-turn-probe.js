// dev/sabotage-377-turn-probe.js — proves the boot push's turn probe is guarded: it seeds the base only when the
// server is not ahead, and it never adopts.
//   node dev/sabotage-377-turn-probe.js
var sabotage = require("./sabotage.js");
process.exit(sabotage.prove({
  file: "storage-adapter.js",
  command: ["node", ["dev/tests-jp011-flush-dirty.js"]],
  cases: [
    { label: "the probe seeds the base even when the server is AHEAD (the CAS guard would then accept a clobber)",
      find: 'if (typeof st === "number" && st <= _localTurn && _lastAckTurn < 0) _lastAckTurn = st;', replace: 'if (typeof st === "number" && _lastAckTurn < 0) _lastAckTurn = st;' },
    { label: "the probe adopts the server turn onto the local state",
      find: 'if (typeof st === "number" && st <= _localTurn && _lastAckTurn < 0) _lastAckTurn = st;', replace: 'if (typeof st === "number" && _lastAckTurn < 0) { _lastAckTurn = st; worldState.turn = st; }' }
  ]
}));
