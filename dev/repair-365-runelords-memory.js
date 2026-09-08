// repair-365-runelords-memory.js — TODO #365: the Runelords save has carried the Iron Meridian's
// memory since the 2026-09-05 half-switch (#337). This grafts the post-swap Runelords additions
// back onto the last NATIVE memory (the t2412 export, 2026-08-31) and pairs the result with the
// newest worldState.
//
// Usage:
//   node dev/repair-365-runelords-memory.js <native.tnd> <foreign.tnd>            — SURVEY, writes nothing
//   node dev/repair-365-runelords-memory.js <native.tnd> <foreign.tnd> --apply    — writes <foreign>_REPAIRED.tnd + receipts JSON
//
// Every mutation is receipted {op, detail, preimage}; the receipt set is archived into
// memory.archive.repairBundles as well as a sidecar JSON (the t1788 bundle precedent).
// Rules (owner ruling 2026-09-07): the native memory is the base; ONLY records the Runelords play
// wrote after the native turn are grafted (chapters, decisions, the coda quest, the six native NPC
// entries' new events/knowledge/attitude, the Sandpoint visit, the arrival pointer, nameIdx);
// nothing from the Iron Meridian crosses over; no normalize sweeps.
var fs = require("fs"), path = require("path");
var eng = require("./load-engine.js");
eng.loadEngine();
global.addMsg = function () {}; global.showToast = function () {}; global.syncUI = function () {};
global.updateMemStatus = function () {}; global.saveAll = function () {}; global.carNotify = function () {};

var nativePath = process.argv[2], foreignPath = process.argv[3];
var APPLY = process.argv.indexOf("--apply") !== -1;
if (!nativePath || !foreignPath) { console.error("usage: node dev/repair-365-runelords-memory.js <native.tnd> <foreign.tnd> [--apply]"); process.exit(1); }
var nat = JSON.parse(fs.readFileSync(path.resolve(nativePath), "utf8"));
var frn = JSON.parse(fs.readFileSync(path.resolve(foreignPath), "utf8"));
var NT = nat.worldState.turn, FT = frn.worldState.turn;
if (!(NT < FT)) { console.error("native turn " + NT + " must precede foreign turn " + FT); process.exit(1); }
if (nat.worldState.campId !== frn.worldState.campId) { console.error("the two saves are not the same campaign: " + nat.worldState.campId + " vs " + frn.worldState.campId); process.exit(1); }
var FOREIGN_MARKERS = ["Vessa Corrow", "Ambassador Ferrin Lyle", "The Bilge Wards"];
var isForeign = FOREIGN_MARKERS.some(function (n) { return frn.memory.npcs[n] || frn.memory.map.nodes[n]; });
var natClean = !FOREIGN_MARKERS.some(function (n) { return nat.memory.npcs[n] || nat.memory.map.nodes[n]; });
if (!isForeign || !natClean) { console.error("expected a foreign target memory and a clean native one (markers: " + FOREIGN_MARKERS.join(", ") + ")"); process.exit(1); }

var RECEIPTS = [];
function rec(op, detail, preimage) { var r = { op: op, detail: detail }; if (preimage !== undefined) r.preimage = preimage; RECEIPTS.push(r); console.log((APPLY ? "  ✔ " : "  ▷ ") + op + " — " + detail); }
function skip(op, why) { RECEIPTS.push({ op: op, skipped: why }); console.log("  ⊘ " + op + " — " + why); }
function clone(x) { return JSON.parse(JSON.stringify(x)); }
function turnOf(e) { var k, ks = ["turn", "t", "at", "born"]; for (k = 0; k < ks.length; k++) if (e && typeof e[ks[k]] === "number") return e[ks[k]]; return null; }
// a record the foreign memory holds that the native one lacks is adopted whole when it was born AFTER the native turn
// (Runelords play on the wrong memory); an older one is the other campaign's and is dropped.
function bornAfter(turns) { var i; for (i = 0; i < turns.length; i++) if (typeof turns[i] === "number" && turns[i] > NT) return true; return false; }
function union(a, b) { var out = (a || []).slice(), i; for (i = 0; i < (b || []).length; i++) if (out.indexOf(b[i]) < 0) out.push(b[i]); return out; }

var mem = clone(nat.memory), fm = frn.memory, ws = frn.worldState;
// the shipping resolver (step 8) and the heal/TOC validation operate on the globals — bind them to the graft now
global.worldState = ws; global.memory = mem; global.sessionLog = frn.sessionLog || [];
console.log("native t" + NT + ": npcs " + Object.keys(nat.memory.npcs).length + ", map " + Object.keys(nat.memory.map.nodes).length + ", chapters " + nat.memory.chapters.length);
console.log("foreign t" + FT + ": npcs " + Object.keys(fm.npcs).length + ", map " + Object.keys(fm.map.nodes).length + ", chapters " + fm.chapters.length);

// 1. chapters written after the native turn, through the SHIPPING cap (fileChapter's 10-live rule)
var lateCh = fm.chapters.filter(function (c) { return c.turn > NT; });
lateCh.forEach(function (c) {
  mem.chapters.push(clone(c));
  if (mem.chapters.length > 10) { var ev = mem.chapters.shift(); if (!mem.archive) mem.archive = {}; if (!mem.archive.chapters) mem.archive.chapters = []; mem.archive.chapters.push(ev); }
});
rec("chapters.graft", lateCh.length + " chapter(s) t" + lateCh.map(function (c) { return c.turn; }).join(", t") + " appended; " + mem.chapters.length + " live, " + (mem.archive.chapters.length - nat.memory.archive.chapters.length) + " evicted to the archive");

// 2. key decisions after the native turn
var lateKd = fm.keyDecisions.filter(function (d) { return (turnOf(d) || 0) > NT; });
lateKd.forEach(function (d) { mem.keyDecisions.push(clone(d)); });
rec("keyDecisions.graft", lateKd.length + " decision(s) appended (turns " + lateKd.map(turnOf).join(", ") + ")");

// 3. lore after the native turn (none expected; grafted if present)
var lateLore = (fm.lore || []).filter(function (l) { return (turnOf(l) || 0) > NT; });
if (lateLore.length) { lateLore.forEach(function (l) { mem.lore.push(clone(l)); }); rec("lore.graft", lateLore.length + " lore entries"); } else skip("lore.graft", "no lore filed after t" + NT);

// 4. quests: Runelords-native keys the foreign memory gained (present in the foreign memory, absent from the native, and referenced by the worldState quest record or the late chapters)
var natQ = nat.memory.quests, newQ = Object.keys(fm.quests).filter(function (k) { return !natQ[k]; });
var lateText = lateCh.map(function (c) { return c.summary; }).join(" ") + " " + lateKd.map(function (d) { return d.desc || ""; }).join(" ");
newQ.forEach(function (k) {
  var q = fm.quests[k], hit = lateText.indexOf(k) >= 0 || (turnOf(q) || 0) > NT || (q.completedTurn || 0) > NT;
  if (hit) { mem.quests[k] = clone(q); rec("quests.graft", "\"" + k + "\" (" + (q.status || "?") + ")"); }
  else skip("quests.graft", "\"" + k + "\" belongs to the foreign campaign (no late reference)");
});

// 5. the NPC entries both memories hold — native record as the base, the coda's additions on top
Object.keys(fm.npcs).forEach(function (n) {
  var f = fm.npcs[n], b = mem.npcs[n];
  if (!b) { var ft = [f.lastSeenTurn, f.lastMentioned].concat((f.events || []).map(turnOf)); if (bornAfter(ft)) { mem.npcs[n] = clone(f); rec("npcs.adopt", n + " (first met after t" + NT + ", last seen t" + f.lastSeenTurn + ")"); } else skip("npcs.merge", n + " is not in the native memory — foreign record, dropped"); return; }
  var pre = clone(b);
  var lateEv = (f.events || []).filter(function (e) { return (turnOf(e) || 0) > NT; });
  b.events = (b.events || []).concat(clone(lateEv));
  var addedK = 0; (f.knowledge || []).forEach(function (k) { if (b.knowledge.indexOf(k) < 0) { b.knowledge.push(k); addedK++; } });
  if (f.attitude && f.attitude !== b.attitude && !/^(?:unspecified|unknown)/i.test(f.attitude)) b.attitude = f.attitude;
  ["lastSeenTurn", "lastMentioned"].forEach(function (k) { if (typeof f[k] === "number" && (typeof b[k] !== "number" || f[k] > b[k])) b[k] = f[k]; });
  if (f.lastSeenAt && (f.lastSeenTurn || 0) >= (pre.lastSeenTurn || 0)) { b.lastSeenAt = f.lastSeenAt; if (f.lastSeenSrc) b.lastSeenSrc = f.lastSeenSrc; }
  b.aliases = union(b.aliases, f.aliases);
  if (!b.pronouns && f.pronouns) b.pronouns = f.pronouns;
  rec("npcs.merge", n + ": +" + lateEv.length + " event(s), +" + addedK + " knowledge, attitude \"" + pre.attitude + "\" → \"" + b.attitude + "\"", pre);
});

// 6. locations: the coda's Sandpoint visit onto the native record
Object.keys(fm.locations).forEach(function (k) {
  var f = fm.locations[k], b = mem.locations[k];
  if (!b) { if (bornAfter(f.visited || [])) { mem.locations[k] = clone(f); rec("locations.adopt", k + " (visited t" + (f.visited || []).join(", t") + ")"); } else skip("locations.merge", k + " — foreign record, dropped"); return; }
  var pre = clone(b), lateV = (f.visited || []).filter(function (t) { return t > NT; });
  b.visited = union(b.visited, lateV); b.notes = union(b.notes, (f.notes || []).filter(function (x) { return (turnOf(x) || 0) > NT; }));
  rec("locations.merge", k + ": +" + lateV.length + " visit(s)", pre);
});

// 7. map: the two Sandpoint nodes the coda re-created — guestbook, visits, npcs, mentions onto the native nodes
Object.keys(fm.map.nodes).forEach(function (k) {
  var f = fm.map.nodes[k], b = mem.map.nodes[k];
  if (!b) { if (bornAfter([f.firstVisit, f.lastVisit])) { mem.map.nodes[k] = clone(f); rec("map.adopt", k + " (first visit t" + f.firstVisit + ")"); } else skip("map.merge", k + " — foreign node, dropped"); return; }
  var pre = clone(b);
  b.visits = (b.visits || 0) + (f.visits || 0);
  if (typeof f.lastVisit === "number" && f.lastVisit > (b.lastVisit || 0)) b.lastVisit = f.lastVisit;
  if (!b.description && f.description) b.description = f.description;
  b.npcs = union(b.npcs, f.npcs);
  if (f.guestbook) { if (!b.guestbook) b.guestbook = {}; Object.keys(f.guestbook).forEach(function (nm) {
    var g = f.guestbook[nm], h = b.guestbook[nm];
    if (!h) { b.guestbook[nm] = clone(g); return; }
    h.turns = union(h.turns, g.turns).sort(function (x, y) { return x - y; }); h.by = h.by || {}; Object.keys(g.by || {}).forEach(function (t) { h.by[t] = g.by[t]; });
    if (g.agg) { if (!h.agg) h.agg = clone(g.agg); else { h.agg.last = Math.max(h.agg.last || 0, g.agg.last || 0); h.agg.count = (h.agg.count || 0) + (g.agg.count || 0); } }
  }); }
  if (f.mentions) b.mentions = (b.mentions || []).concat(clone(f.mentions.filter(function (m) { return (m.t || 0) > NT; })));
  rec("map.merge", k + ": visits " + pre.visits + " → " + b.visits + ", guestbook " + Object.keys(b.guestbook || {}).length + " name(s)", pre);
});
if (fm.map.lastArrivalFrom && mem.map.nodes[fm.map.lastArrivalFrom]) { rec("map.lastArrivalFrom", "\"" + mem.map.lastArrivalFrom + "\" → \"" + fm.map.lastArrivalFrom + "\"", mem.map.lastArrivalFrom); mem.map.lastArrivalFrom = fm.map.lastArrivalFrom; }
else skip("map.lastArrivalFrom", "\"" + fm.map.lastArrivalFrom + "\" is not a native node; kept \"" + mem.map.lastArrivalFrom + "\"");
// edges: any late edge between native nodes
(fm.map.edges || []).forEach(function (e) { if ((e.turn || 0) > NT && mem.map.nodes[e.from] && mem.map.nodes[e.to]) { mem.map.edges.push(clone(e)); rec("map.edge", e.from + " → " + e.to + " (t" + e.turn + ")"); } });

// 8. pending future events the coda resolved on the wrong memory: the Sable network is done (QUEST completed t2425, custody t2434)
var sableDone = lateKd.some(function (d) { return /Sable/.test(d.desc || "") && /(custody|handed|hand her over)/i.test(d.desc || ""); });
mem.futureEvents.slice().forEach(function (fe) {
  if (/Sable/.test(fe.what || "") && sableDone) { var pre = clone(fe); resolveFutureEvent(fe.what); if (!mem.archive.futureEvents) mem.archive.futureEvents = []; mem.archive.futureEvents.push({ what: pre.what, when: pre.when, setTurn: pre.setTurn, resolvedTurn: FT, by: "repair-365" }); rec("futureEvents.resolve", "\"" + pre.what.slice(0, 70) + "…\" resolved by the coda (archived)", pre); }
});
// 9. the name rotation index only ever climbs
if ((fm.nameIdx || 0) > (mem.nameIdx || 0)) { rec("nameIdx", mem.nameIdx + " → " + fm.nameIdx, mem.nameIdx); mem.nameIdx = fm.nameIdx; }
// 10. the owner stamp (#365 guard)
mem.campId = ws.campId; rec("memory.campId", "stamped " + ws.campId);

// validate through the shipping heal + TOC on the grafted pair
healMemory();
var toc = memoryTOC(); if (typeof toc !== "string" || !toc.length) { console.error("memoryTOC produced nothing — aborting"); process.exit(2); }
var still = FOREIGN_MARKERS.filter(function (n) { return mem.npcs[n] || mem.map.nodes[n] || mem.locations[n]; });
if (still.length) { console.error("foreign markers survived: " + still.join(", ")); process.exit(2); }
console.log("\nresult: npcs " + Object.keys(mem.npcs).length + ", locations " + Object.keys(mem.locations).length + ", map " + Object.keys(mem.map.nodes).length + " (Magnimar " + (mem.map.nodes.Magnimar ? mem.map.nodes.Magnimar.size : "MISSING") + ", Sandpoint " + mem.map.nodes.Sandpoint.size + "), chapters " + mem.chapters.length + " (t" + mem.chapters[0].turn + "…t" + mem.chapters[mem.chapters.length - 1].turn + "), quests " + Object.keys(mem.quests).length + ", futureEvents " + mem.futureEvents.length + ", TOC " + toc.length + " chars");

if (!APPLY) { console.log("\nSURVEY only — " + RECEIPTS.length + " op(s) planned. Re-run with --apply to write."); process.exit(0); }
if (!mem.archive.repairBundles) mem.archive.repairBundles = [];
mem.archive.repairBundles.push({ id: "repair-365", at: new Date().toISOString(), nativeTurn: NT, foreignTurn: FT, ops: RECEIPTS.length });
var out = foreignPath.replace(/\.tnd$/, "") + "_REPAIRED.tnd";
fs.writeFileSync(out, JSON.stringify({ worldState: ws, sessionLog: frn.sessionLog || [], memory: mem }), "utf8");
fs.writeFileSync(out.replace(/\.tnd$/, "_receipts.json"), JSON.stringify(RECEIPTS, null, 1), "utf8");
console.log("\nwrote " + out + " (+ receipts)");
