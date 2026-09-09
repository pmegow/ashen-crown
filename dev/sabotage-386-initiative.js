// dev/sabotage-386-initiative.js — proves companion initiative is guarded: the record, the toast, the cadence line.
//   node dev/sabotage-386-initiative.js
var sabotage = require("./sabotage.js");
var rc1 = sabotage.prove({
  file: "tag_table.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the toast is dropped (#347: every filing is a visible event)",
      find: 'if(typeof showToast==="function")showToast("\\u2605 "+cir.name+" acts on their own: "+cir.what);', replace: '' }
  ]
});
var rc2 = sabotage.prove({
  file: "api.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the cadence line is dropped from the volatile prompt",
      find: '+leftBlock+buildCompanionInitiativeLine()', replace: '+leftBlock' }
  ]
});
var rc3 = sabotage.prove({
  file: "helpers.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the window never closes — one act keeps the line forever",
      find: 'return (ws.turn-(r.turn||0)<every)?r:null;', replace: 'return r;' }
  ]
});
process.exit(rc1 || rc2 || rc3);
