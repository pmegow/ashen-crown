// Account-story isolation, stale callbacks and export ownership; disposable clone proofs.
var sabotage=require("./sabotage.js"),rc=0;
rc|=sabotage.prove({file:"mementos.html",command:["node",["dev/tests-291-mementos.js"]],cases:[
 {label:"reused hidden iframe loses visible story",mustFail:"reader is visible before navigating the sandbox document",find:"freshReader=oldReader.cloneNode(false)",replace:"freshReader=oldReader"},
 {label:"preview gains script permission",mustFail:"reader contracts retain sandbox, CSP, palette and navigation seams",find:'sandbox=""',replace:'sandbox="allow-scripts"'},
 {label:"preview loses its restrictive policy",mustFail:"reader contracts retain sandbox, CSP, palette and navigation seams",find:"default-src ",replace:"ignored-src "},
 {label:"story title becomes executable HTML",mustFail:"roster titles are inert and HTML is fetched only on demand",find:"n.textContent=text",replace:"n.innerHTML=text"},
 {label:"stale story callback replaces a later selection",mustFail:"older story or list responses cannot replace the current selection",find:'if(run!==generation)return;\n      if(err||!data||typeof data.html',replace:'if(false)return;\n      if(err||!data||typeof data.html'},
 {label:"download retains its object URL",mustFail:"download URLs are released and delete needs confirmation",find:"URL.revokeObjectURL(url)",replace:"void url"},
 {label:"deletion bypasses confirmation",mustFail:"download URLs are released and delete needs confirmation",find:"if(!window.confirm(",replace:"if(false&&!window.confirm("}
]});
rc|=sabotage.prove({file:"ui-files.js",command:["node",["dev/tests-291-mementos.js"]],cases:[
 {label:"repeated save loses its in-flight guard",mustFail:"account save reuses the narrative exporter without mutating the transcript",find:"if(saveNarrativeMemento.pending)return;",replace:"if(false)return;"}
]});
process.exit(rc?1:0);
