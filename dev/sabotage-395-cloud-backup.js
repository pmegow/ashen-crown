// dev/sabotage-395-cloud-backup.js — proves the cloud-backed snapshot skip is guarded: the proof conditions
// (acked turn ≥ local, no conflict, server mode) and the partial-slot clear.
//   node dev/sabotage-395-cloud-backup.js
var sabotage = require("./sabotage.js");
process.exit(sabotage.prove({
  file: "state.js",
  command: ["node", ["dev/run-tests.js", "quota hardening"]],
  cases: [
    { label: "a cloud copy BEHIND the local turn counts as proof (the last turns would be lost)",
      find: '&&_ss.lastAckTurn>=0&&_ss.lastAckTurn>=_lt)_cloud={turn:_ss.lastAckTurn};', replace: '&&_ss.lastAckTurn>=0)_cloud={turn:_ss.lastAckTurn};' },
    { label: "a conflict no longer refuses (another device is ahead and this copy would vanish)",
      find: 'if(_ss&&!_ss.conflict&&typeof _ss.lastAckTurn==="number"', replace: 'if(_ss&&typeof _ss.lastAckTurn==="number"' },
    { label: "the partial slot write is left behind (a half copy the picker would offer as whole)",
      find: 'try{store.del(campSlotKey(id,"ws"));store.del(campSlotKey(id,"sl"));store.del(campSlotKey(id,"mem"));}catch(_cd){}', replace: '' }
  ]
}));
