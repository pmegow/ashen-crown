// dev/sabotage-392-local-scene.js — proves the wares gate reads the SCENE, not the town: the local list's
// exact-spot limb, its observed limb, and the fourth button's choice of list.
//   node dev/sabotage-392-local-scene.js
var sabotage = require("./sabotage.js");
process.exit(sabotage.prove({
  file: "game.js",
  command: ["node", ["dev/run-tests.js", "class bible"]],
  cases: [
    { label: "local regains the same-town rule (a seller anywhere in the settlement is 'in the scene' again)",
      find: 'if(rls&&rls===rNode)addLocal(n.name);/* #392: the exact spot only */', replace: 'if(rls&&(rls===rNode||rls===rLoc||rls.indexOf(rLoc+"|")===0))addLocal(n.name);' },
    { label: "an observed seller no longer counts as local",
      find: 'addNpc(npcs[_oj].name);addLocal(npcs[_oj].name);/* #392: observed = in the scene */break;', replace: 'addNpc(npcs[_oj].name);break;' },
    { label: "the fourth button reads the town list again",
      find: 'waresOfferedHere(node,buildSceneManifest().local)', replace: 'waresOfferedHere(node,buildSceneManifest().npcs)' },
    { label: "the suggestion gate reads the town list again",
      find: '_bo=_bn?waresOfferedHere(_bn,man.local||man.npcs):[],_bi;/* #392 */', replace: '_bo=_bn?waresOfferedHere(_bn,man.npcs):[],_bi;' }
  ]
}));
