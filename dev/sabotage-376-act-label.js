// dev/sabotage-376-act-label.js — proves the shared act-label formatter is guarded on all three surfaces.
//   node dev/sabotage-376-act-label.js
var sabotage = require("./sabotage.js");
var rc1 = sabotage.prove({
  file: "helpers.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the authored-prefix guard is dropped — every surface doubles an 'Act 2:' title again",
      find: 'return /^act\\s/i.test(at)?at:"Act "+n+": "+at;', replace: 'return "Act "+n+": "+at;' },
    { label: "the quest panel stops using the shared formatter",
      find: 'var s=actLabel(b.actN,b.actTitle);', replace: 'var s="Act "+b.actN+": "+b.actTitle;' }
  ]
});
var rc2 = sabotage.prove({
  file: "api.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the skeleton block stops using the shared formatter",
      find: 'label=actLabel(i+1,act.title);', replace: 'label="Act "+(i+1)+": "+act.title;' }
  ]
});
process.exit(rc1 || rc2);
