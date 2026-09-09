var sabotage=require('./sabotage.js');process.exit(sabotage.prove({file:'ui-modals.js',command:['node',['dev/tests-23-onboarding.js']],cases:[
 {label:'dialog loses accessible identity',mustFail:'onboarding separates instructions and exposes a focused named dialog',find:'m.setAttribute("role","dialog")',replace:'m.setAttribute("role","group")'},
 {label:'escape fails to dismiss',mustFail:'onboarding keyboard dismisses once and returns focus without sending a turn',find:'if(e.key==="Escape")',replace:'if(false)'},
 {label:'Car Mode gets an unwanted overlay',mustFail:'onboarding stays absent in Car Mode and retains one modal',find:'if(typeof carMode!=="undefined"&&carMode)return;',replace:'if(false)return;'}
]})?1:0);
