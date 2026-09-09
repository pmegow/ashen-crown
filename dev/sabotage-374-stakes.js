// Observation-only stakes counter, bounded record and coda display; each proof names its test.
var sabotage=require("./sabotage.js");
process.exit(sabotage.prove({file:"helpers.js",command:["node",["dev/run-tests.js","#374"]],cases:[
  {label:"turn distance loses a turn",mustFail:"#374 counter finds the most recent risk",find:"{turns:now-last,kind:kind,capped:false}",replace:"{turns:now-last+1,kind:kind,capped:false}"},
  {label:"quiet ring conceals the cap",mustFail:"#374 cap reports only the retained quiet window",find:"{turns:age,kind:null,capped:true}",replace:"{turns:age,kind:null,capped:false}"},
  {label:"earned coda no longer suppresses the display warning",mustFail:"#374 coda flag sits beside the counter",find:"inCoda||riskRead.turns<20",replace:"riskRead.turns<20"},
  {label:"schedule pressure disappears",mustFail:"#374 due schedule is current pressure",find:"c.min>=e.dueMin",replace:"false&&c.min>=e.dueMin"},
  {label:"healing is mistaken for HP loss",mustFail:"#374 risk kinds require loss receipts",find:"/^Took [1-9][0-9]* damage$/",replace:"/^(Took [0-9]+ damage|Healed [0-9]+ HP)$/"}
]}));
