// dev/sabotage-373-agenda-offer.js — proves the coda offer is guarded: the anchor window, the quest-open gate,
// the coda gate, the once-per-want latch, and the offered-not-active instruction.
//   node dev/sabotage-373-agenda-offer.js
var sabotage = require("./sabotage.js");
process.exit(sabotage.prove({
  file: "api.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "the anchor window is ignored (a moment from a hundred turns ago justifies the offer)",
      find: 'if(!m||typeof m.turn!=="number"||now-m.turn>win)continue;', replace: 'if(!m||typeof m.turn!=="number")continue;' },
    { label: "the quest-open gate is dropped (the offer lands on top of a live quest)",
      find: 'var ql=worldState.questLog||[],i;for(i=0;i<ql.length;i++)if(ql[i]&&(ql[i].status==="active"||ql[i].status==="offered"))return"";', replace: 'var i;' },
    { label: "the coda gate is dropped (the offer fires mid-spine)",
      find: 'if(!worldState||worldState.combat||typeof codaState!=="function"||!codaState())return"";', replace: 'if(!worldState||worldState.combat)return"";' },
    { label: "the once-per-want latch is dropped",
      find: 'if(ask&&ask.name===cs.name&&ask.want===want)continue;', replace: '' },
    { label: "the note tells the GM to file it active",
      find: 'Offered is not accepted: the player takes it up or lets it lie. Never file it active yourself,', replace: 'File it active.' }
  ]
}));
