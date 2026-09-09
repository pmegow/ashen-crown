var sabotage=require('./sabotage.js');process.exit(sabotage.prove({file:'ui-sheets.js',command:['node',['dev/tests-23-ui.js']],cases:[
 {label:'skill ranks collapse into a comma run',mustFail:'earned skills remain separate readable rows with canonical rank and bonus',find:'class="cs-skill-row"',replace:'class="lost-skill-row"'},
 {label:'ability details lose native keyboard activation',mustFail:'canonical ability details are native buttons and hostile prose remains inert',find:'<button type="button" class="cs-abil-nm cs-cap"',replace:'<span class="cs-abil-nm cs-cap"'}
]})?1:0);
