// dev/sabotage-393-sub-leave.js — proves the sub-location-left observer is guarded: the veto, the two-cue floor,
// the location-tag clear, and the nudge's instruction.
//   node dev/sabotage-393-sub-leave.js
var sabotage = require("./sabotage.js");
var rc1 = sabotage.prove({
  file: "game.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the veto and party discipline are dropped (a hypothetical or a bystander's exit counts)",
      find: 'for(si=0;si<sents.length;si++){sent=sents[si];if(_LOC_CUE_VETO.test(sent)||!_LOC_CUE_PARTY.test(sent))continue;\n    var m=sent.match(_SUB_EXIT_RE);', replace: 'for(si=0;si<sents.length;si++){sent=sents[si];\n    var m=sent.match(_SUB_EXIT_RE);' },
    { label: "one cue pings (a step onto the balcony empties the suite)",
      find: 'if(sw.count>=SUBLEAVE_TURNS){worldState.subLeavePing', replace: 'if(sw.count>=1){worldState.subLeavePing' },
    { label: "a location tag no longer clears the watch",
      find: 'if(hasLoc||!worldState.world||!worldState.world.sublocation){delete worldState.subLeaveWatch;if(hasLoc)delete worldState.subLeavePing;}', replace: 'if(!worldState.world||!worldState.world.sublocation){delete worldState.subLeaveWatch;}' }
  ]
});
var rc2 = sabotage.prove({
  file: "api.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the nudge stops naming the tags that settle it",
      find: 'If they have left, emit [SUBLOCATION_LEAVE] (open ground in the settlement) or [SUBLOCATION:the place they stand in now] in THIS response.', replace: 'If they have left, say so.' }
  ]
});
process.exit(rc1 || rc2);
