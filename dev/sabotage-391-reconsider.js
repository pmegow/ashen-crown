// dev/sabotage-391-reconsider.js — proves the way out of a pending roll is guarded: the ping, the note's
// "never roll" instruction, the card control, and the in-combat delivery.
//   node dev/sabotage-391-reconsider.js
var sabotage = require("./sabotage.js");
var rc1 = sabotage.prove({
  file: "game.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the withdrawal never reaches the GM (the ping is not armed)",
      find: 'worldState.checkWithdrawnPing={turn:worldState.turn,label:chk.label,mod:chk.mod||0,dc:(chk.dc!=null?chk.dc:null)};', replace: '' },
    { label: "the withdrawal is filed as a rolled failure (the #371 ratio and #374 counter would count it)",
      find: 'total:null,outcome:"withdrawn"});', replace: 'total:null,outcome:"failed"});' }
  ]
});
var rc2 = sabotage.prove({
  file: "api.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the note no longer forbids rolling the withdrawn check",
      find: 'never roll or resolve that check for them, and never treat the hold-back as a failure.]', replace: 'narrate freely.]' },
    { label: "the card loses its way out",
      find: ' <span class="roll-alt" onclick="event.stopPropagation();reconsiderPendingCheck()" title="Back out: no roll is made; say what you do instead">&middot; or reconsider</span>', replace: '' },
    { label: "the note goes silent in combat (a combat check could not be withdrawn)",
      find: 'var p=worldState&&worldState.checkWithdrawnPing;if(!p||!p.label)return"";', replace: 'var p=worldState&&worldState.checkWithdrawnPing;if(!p||!p.label||worldState.combat)return"";' }
  ]
});
process.exit(rc1 || rc2);
