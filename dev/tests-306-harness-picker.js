#!/usr/bin/env node
// tests-306-harness-picker.js — the #306 scripted layer is PURE; prove its priorities and its refusal
// to repeat, without a browser. Usage: node dev/tests-306-harness-picker.js
"use strict";
var choose=require("./playtest-harness.js").choose,fails=0,n=0;
function ok(c,name){n++;if(c)console.log("PASS "+name);else{fails++;console.log("FAIL "+name);}}
var acts=["Look around.","Talk to the guard.","Head east."];
var r=choose(acts,{hp:14,maxHp:14,turn:3},{});ok(r.kind==="random"&&acts.indexOf(r.text)>=0,"idle: a random pick from the live buttons");
var seen={},i;for(i=0;i<40;i++){var q=choose(acts,{hp:14,maxHp:14,turn:3},{text:"Look around.",kind:"random"});seen[q.text]=1;}
ok(!seen["Look around."],"never repeats the previous action");
ok(choose(acts,{hp:3,maxHp:14,turn:3,combat:false},{}).kind==="rest","rest under a third HP");
ok(choose(acts,{hp:3,maxHp:14,turn:3,combat:true},{}).kind!=="rest","never rests mid-fight");
ok(choose(acts,{hp:3,maxHp:14,turn:3},{kind:"rest"}).kind!=="rest","does not rest twice running");
ok(/Healing salve/.test(choose(acts,{hp:9,maxHp:14,turn:3,consumables:["Healing salve"]},{}).text),"uses a carried consumable when hurt");
ok(choose(acts,{hp:14,maxHp:14,turn:3,consumables:["Healing salve"]},{}).kind==="random","no consumable at full health");
var a=choose(acts,{hp:14,maxHp:14,turn:8,offered:["The Bell Below","The Salt Road"]},{});ok(a.kind==="accept"&&/Salt Road/.test(a.text),"accepts the NEWEST offer on an 8th turn");
ok(choose(acts,{hp:14,maxHp:14,turn:9,offered:["x"]},{}).kind==="random","no accept off-cycle");
var d1=choose(acts,{downed:true},{});ok(d1.kind==="downed-struggle","downed: struggle first");
var d2=choose(acts,{downed:true},d1);ok(d2.kind==="downed-yield","downed: then yield — the run exercises the escort");
ok(choose(acts,{deathStage:"question"},{}).kind==="death-question","the escort's question is asked");
ok(choose(acts,{deathStage:"choose"},{}).kind==="death-back","the walk goes BACK (onward would end the run)");
ok(choose(acts,{downed:true,hp:0,maxHp:14,consumables:["Healing salve"]},{}).kind==="downed-struggle","downed outranks every other rule");
// #363: the consumable branch cannot loop — one use per item per run; a [NO_CHANGE:] answer retires the item;
// a different consumable is still used; the suppressed branch is reported as `skipped` for the audit.
var used={};var u1=choose(acts,{hp:76,maxHp:96,turn:5,consumables:["travel rations (2 days)"],used:used},{});
ok(u1.kind==="use"&&u1.item==="travel rations (2 days)","#363 first use picks the item and names it");
used[u1.item]=true;
var u2=choose(acts,{hp:76,maxHp:96,turn:6,consumables:["travel rations (2 days)"],used:used},{kind:"random",text:"x"});
ok(u2.kind==="random"&&u2.skipped==="use","#363 the same item is never used twice in a run (and the skip is reported)");
var u3=choose(acts,{hp:76,maxHp:96,turn:7,consumables:["travel rations (2 days)","Healing salve"],used:used},{kind:"random",text:"x"});
ok(u3.kind==="use"&&u3.item==="Healing salve","#363 a different consumable is still used");
var used2={};var v1=choose(acts,{hp:76,maxHp:96,turn:5,consumables:["Travel rations x8"],used:used2},{});
var v2=choose(acts,{hp:76,maxHp:96,turn:6,consumables:["Travel rations x8"],used:used2,lastNoChange:true},v1);/* the turn after the use: the GM answered NO_CHANGE */
var v3=choose(acts,{hp:76,maxHp:96,turn:7,consumables:["Travel rations x8"],used:used2},v2);/* the turn after that: the branch would fire again, but the item is retired */
ok(v1.kind==="use"&&v2.kind==="random"&&v3.kind==="random"&&v3.skipped==="use"&&used2["Travel rations x8"]===true,"#363 a [NO_CHANGE:] answer to a use retires the item (the #226 sequence: use → NO_CHANGE → never again)");
var w=choose(acts,{hp:76,maxHp:96,turn:5,consumables:["Healing salve"],used:{},lastNoChange:true},{kind:"random",text:"x"});
ok(w.kind==="use","#363 a NO_CHANGE after a NON-use turn does not suppress the branch");
ok(choose(acts,{hp:14,maxHp:14,turn:3},{}).skipped===null||choose(acts,{hp:14,maxHp:14,turn:3},{}).skipped===undefined,"#363 no consumable wanted → nothing skipped");
console.log((fails?"FAILED ":"ALL GREEN — ")+(n-fails)+"/"+n+" (#306 harness picker)");
process.exit(fails?1:0);
