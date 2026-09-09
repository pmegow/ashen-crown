// dev/sabotage-389-named-wake.js — proves the named wake is guarded: the in-band guard (t37), the transient
// restWake, the named roll, and the whispers yield while a clock repair is pending.
//   node dev/sabotage-389-named-wake.js
var sabotage = require("./sabotage.js");
var rc1 = sabotage.prove({
  file: "clock.js",
  command: ["node", ["dev/run-tests.js", "campaign clock"]],
  cases: [
    { label: "the in-band guard dies — a dawn nap at dawn names a wake and rolls a whole day (the t37 case returns)",
      find: 'if(!ph)return null;var off=c.min%MIN_PER_DAY;if(off>=ph.b0&&off<ph.b1)return null;', replace: 'if(!ph)return null;' },
    { label: "the named roll is dropped — the mode is named but the roll is the fixed eight hours",
      find: 'if(mode==="named"){r=(worldState.restWake.tgt-(c.min%MIN_PER_DAY)+MIN_PER_DAY)%MIN_PER_DAY;if(r<=0)r=SLEEP_FIXED_MIN;', replace: 'if(mode==="named"){r=SLEEP_FIXED_MIN;' },
    { label: "TIME_CHECK names a wake (the opening declaration read as the wake)",
      find: 'match(/\\[TIME:([^\\]]+)\\]/g)||[];if(!all.length)return null;', replace: 'match(/\\[TIME(?:_CHECK)?:([^\\]]+)\\]/g)||[];if(!all.length)return null;' }
  ]
});
var rc2 = sabotage.prove({
  file: "tag_table.js",
  command: ["node", ["dev/run-tests.js", "campaign clock"]],
  cases: [
    { label: "restWake is never cleared — it persists onto the save and names every later rest",
      find: 'try{_slept=restSpells(true);}finally{delete worldState.restWake;}', replace: '_slept=restSpells(true);' }
  ]
});
var rc3 = sabotage.prove({
  file: "api.js",
  command: ["node", ["dev/run-tests.js", "campaign clock"]],
  cases: [
    { label: "whispers no longer yields to a pending clock repair",
      find: 'if(worldState.reconcileSkip)return "";/* #389:', replace: 'if(false)return "";/* #389:' }
  ]
});
process.exit(rc1 || rc2 || rc3);
