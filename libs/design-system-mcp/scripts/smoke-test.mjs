/**
 * Smoke test for the built @abgov/design-system-mcp package.
 *
 * Packs dist/libs/design-system-mcp, installs the tarball into a throwaway
 * folder, and drives the installed server over JSON-RPC the way a consuming
 * team's MCP client starts it: through the npm bin on every platform (on
 * Windows the .cmd shim runs through a shell, since nothing else can run
 * one). Exits non-zero on any
 * failure so CI stops instead of shipping a broken package.
 *
 * Checks:
 *   1. The packed data carries at least 300 records across the collections.
 *   2. Example-to-component relationship edges exist.
 *   3. initialize succeeds through the bin symlink, and serverInfo.version
 *      matches the installed package.json (the version is read at runtime).
 *   4. tools/list exposes search and get.
 *   5. search finds the button component and get returns the record asked for.
 *   6. A filtered search returns its top matches from the whole ranking, with
 *      the true total.
 *   7. An empty query with a filter lists what the filter matches; the
 *      framework filter keeps examples whose frameworks were never recorded.
 *   8. Every name a developer types (React, web component, Angular, display)
 *      finds its component, in get and in the component filter.
 *   9. get's default answer names and describes every record; search carries
 *      status and the internal/subcomponent/size/productType fields.
 *  10. Product types and guidance relate their components; every call a
 *      component answer suggests next returns something.
 *  11. Bad input is an error, never an empty success.
 *  12. A question names its component ("how do I use the X component").
 */
import { spawn, spawnSync } from "child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import { join } from "path";

const RECORD_FLOOR = 300;
const TIMEOUT_MS = 60_000;
const isWindows = process.platform === "win32";

// On Windows npm is a .cmd (or an exe shim under managers like Volta), which
// Node only runs through a shell; the shell's own lookup finds whichever one
// is installed. The whole command goes as one pre-quoted string (an args
// array combined with a shell is deprecated), so paths with spaces survive.
function runNpm(args, cwd) {
  return isWindows
    ? spawnSync(["npm", ...args.map((a) => `"${a}"`)].join(" "), {
        cwd,
        encoding: "utf8",
        shell: true,
      })
    : spawnSync("npm", args, { cwd, encoding: "utf8" });
}

let work;
function cleanup() {
  if (!work) return;
  try {
    // Windows can hold just-written files briefly (the exiting child, or a
    // virus scanner); retry, and never let a temp-folder hiccup turn a
    // finished run into a failure.
    rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch (err) {
    console.error(`smoke-test: warning - could not remove ${work}: ${err?.message ?? err}`);
  }
}
let serverChild = null;
function fail(message) {
  console.error(`smoke-test: FAIL - ${message}`);
  if (serverChild) {
    try {
      serverChild.kill();
    } catch {
      // already gone
    }
  }
  cleanup();
  process.exit(1);
}
function ok(message) {
  console.log(`smoke-test: ok - ${message}`);
}

const distDir = join(process.cwd(), "dist/libs/design-system-mcp");
if (!existsSync(join(distDir, "main.js"))) {
  fail(`no bundle at ${distDir} (run the build first)`);
}
if (!existsSync(join(distDir, "data", "components"))) {
  fail(`no data at ${join(distDir, "data")} (run the build first)`);
}
if (!existsSync(join(distDir, "package.json"))) {
  fail(`no package.json at ${distDir} (run the build first)`);
}

work = mkdtempSync(join(tmpdir(), "goa-mcp-smoke-"));

// 1. Pack dist, exactly what a publish uploads.
const pack = runNpm(["pack", "--pack-destination", work, "--loglevel=error"], distDir);
if (pack.status !== 0) fail(`npm pack exited ${pack.status}:\n${pack.stderr}`);
const tarball = pack.stdout.trim().split(/\r?\n/).pop();
if (!tarball) fail("npm pack reported no tarball name");
ok(`packed ${tarball}`);

// 2. Install it into a fresh consumer folder, like a team would.
const consumer = join(work, "consumer");
mkdirSync(consumer);
writeFileSync(
  join(consumer, "package.json"),
  JSON.stringify({ name: "smoke-consumer", private: true }),
);
const install = runNpm(
  ["install", join(work, tarball), "--no-audit", "--no-fund", "--loglevel=error"],
  consumer,
);
if (install.status !== 0) fail(`npm install exited ${install.status}:\n${install.stderr}`);

const installedRoot = join(consumer, "node_modules", "@abgov", "design-system-mcp");
// npm wires the bin as a symlink on Unix and a .cmd shim on Windows.
const binBase = join(consumer, "node_modules", ".bin", "goa-design-system-mcp");
const bin = isWindows ? `${binBase}.cmd` : binBase;
if (!existsSync(bin)) fail(`installed package has no bin at ${bin}`);
const pkg = JSON.parse(readFileSync(join(installedRoot, "package.json"), "utf8"));
ok(`installed ${pkg.name}@${pkg.version} with a working bin entry`);

// 3. Data floor, measured on the installed copy (tests the tarball contents).
const dataDir = join(installedRoot, "data");
if (!existsSync(dataDir)) fail(`installed package has no data folder at ${dataDir}`);
let records = 0;
let edges = 0;
let exampleId = null;
for (const collection of readdirSync(dataDir)) {
  const dir = join(dataDir, collection);
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  records += files.length;
  if (collection === "examples") {
    for (const file of files) {
      const record = JSON.parse(readFileSync(join(dir, file), "utf8"));
      const count = Array.isArray(record.components) ? record.components.length : 0;
      edges += count;
      if (count > 0 && !exampleId && typeof record.id === "string") {
        exampleId = record.id;
      }
    }
  }
}
if (records < RECORD_FLOOR) {
  fail(`packed data has ${records} records, below the floor of ${RECORD_FLOOR}`);
}
if (edges <= 0) fail("packed data has no example-to-component relationship edges");
if (!exampleId) fail("no example record with components found to test get against");
ok(`${records} records, ${edges} relationship edges`);

// Every record, read straight from the installed files. Checks 6 onward
// compare the server's answers with these, never with its own lookups.
const recordsBy = {};
for (const collection of readdirSync(dataDir)) {
  recordsBy[collection] = readdirSync(join(dataDir, collection))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(dataDir, collection, f), "utf8")));
}

// 4. Drive the installed server over JSON-RPC through the bin symlink.
// On Unix, start the server through the bin symlink itself: that is how MCP
// clients start it, and the indirection once hid a real data-resolution bug.
// Windows shims are .cmd files that need a shell, so there the installed
// entry file runs directly; the shim's existence is already checked above.
// The server honors GOA_MCP_DATA_DIR above every probe, and the readme tells
// developers to export it, so it is removed here or the test would quietly
// answer from that folder instead of the packed data. Windows environment
// names are case-insensitive, so every casing goes.
const childEnv = { ...process.env };
for (const key of Object.keys(childEnv)) {
  if (key.toUpperCase() === "GOA_MCP_DATA_DIR") delete childEnv[key];
}
// Start the server the way an MCP client does: through the npm bin. On Unix
// the .bin symlink runs directly; Windows shims are .cmd files only a shell
// can run, so there the quoted path goes through one as a single command
// string (an args array combined with a shell is deprecated).
const child = isWindows
  ? spawn(`"${bin}"`, { stdio: ["pipe", "pipe", "pipe"], env: childEnv, shell: true })
  : spawn(bin, [], { stdio: ["pipe", "pipe", "pipe"], env: childEnv });
serverChild = child;
let shuttingDown = false;
let stderrTail = "";
child.stderr.on("data", (chunk) => {
  stderrTail = (stderrTail + chunk.toString()).slice(-2000);
});
const pending = new Map();
let buffer = "";
child.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  let newline;
  while ((newline = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, newline);
    buffer = buffer.slice(newline + 1);
    if (!line.trim()) continue;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      fail(`server wrote a non-JSON line to stdout: ${line.slice(0, 200)}`);
    }
    if (message.id !== undefined && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  }
});
child.on("error", (err) => fail(`could not start the installed bin: ${err.message}`));
child.stdin.on("error", (err) => {
  if (shuttingDown) return;
  fail(`could not write to the server (${err.code ?? err.message}). stderr:\n${stderrTail}`);
});
child.on("exit", (code) => {
  if (pending.size > 0) {
    fail(`server exited early (code ${code}). stderr:\n${stderrTail}`);
  }
});

let nextId = 1;
function request(method, params) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, resolve);
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    setTimeout(() => {
      if (pending.has(id)) reject(new Error(`timed out waiting for ${method}`));
    }, TIMEOUT_MS).unref();
  });
}
function notify(method) {
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method }) + "\n");
}

try {
  const init = await request("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "smoke-test", version: "0.0.0" },
  });
  const serverInfo = init.result?.serverInfo;
  if (!serverInfo) fail(`initialize returned no serverInfo: ${JSON.stringify(init).slice(0, 300)}`);
  if (serverInfo.version !== pkg.version) {
    fail(
      `serverInfo.version is "${serverInfo.version}" but the installed package.json says "${pkg.version}" (the runtime version read is broken)`,
    );
  }
  ok(`initialize through the installed bin, serverInfo.version ${serverInfo.version}`);
  notify("notifications/initialized");

  const tools = await request("tools/list", {});
  const names = (tools.result?.tools ?? []).map((t) => t.name).sort();
  if (!(names.includes("search") && names.includes("get"))) {
    fail(`tools/list returned [${names.join(", ")}], expected search and get`);
  }
  ok(`tools: ${names.join(", ")}`);

  // Scoped to components so the button assertion is order-proof: button is
  // the only component that can top a "button" search, while the unscoped
  // ranking carries a wide score tie that load order could shuffle past any
  // page size.
  const search = await request("tools/call", {
    name: "search",
    arguments: { query: "button", collection: "components", limit: 25 },
  });
  const searchText = search.result?.content?.[0]?.text ?? "";
  if (search.result?.isError || searchText.length === 0) {
    fail(`search for "button" failed or returned nothing: ${JSON.stringify(search).slice(0, 300)}`);
  }
  // The text is a JSON envelope: { query, count, results, next }. A length
  // check alone would pass on an empty envelope, so assert the contents.
  let searchBody;
  try {
    searchBody = JSON.parse(searchText);
  } catch {
    fail(`search returned text that is not JSON: ${searchText.slice(0, 200)}`);
  }
  if (!(searchBody.count > 0) || !Array.isArray(searchBody.results) || searchBody.results.length === 0) {
    fail(`search for "button" returned an empty result set: ${searchText.slice(0, 200)}`);
  }
  if (!searchBody.results.some((r) => r.id === "button")) {
    fail(
      `search for "button" did not include the button component: ${searchBody.results
        .map((r) => r.id)
        .join(", ")}`,
    );
  }
  ok(`search found ${searchBody.count} results, button among them`);

  const get = await request("tools/call", { name: "get", arguments: { id: exampleId } });
  const getText = get.result?.content?.[0]?.text ?? "";
  if (get.result?.isError || getText.length === 0) {
    fail(`get for "${exampleId}" failed or returned nothing: ${JSON.stringify(get).slice(0, 300)}`);
  }
  // Same idea as search: the text is a JSON envelope ({ id, collection,
  // entry, related, next }), so assert it is the record that was asked for.
  let getBody;
  try {
    getBody = JSON.parse(getText);
  } catch {
    fail(`get returned text that is not JSON: ${getText.slice(0, 200)}`);
  }
  if (getBody.id !== exampleId || getBody.collection !== "examples" || !getBody.entry) {
    fail(
      `get for "${exampleId}" returned the wrong record or no entry: ${getText.slice(0, 200)}`,
    );
  }
  ok(`get returned "${exampleId}" with its entry`);

  // One tool call, parsed. A validation error can arrive as a JSON-RPC error
  // or as an isError result; both count as an error here.
  const call = async (name, args) => {
    const res = await request("tools/call", { name, arguments: args });
    const text = res.result?.content?.[0]?.text ?? res.error?.message ?? "";
    let body = null;
    try {
      body = JSON.parse(text);
    } catch {
      // An error message, not JSON.
    }
    return { isError: Boolean(res.error || res.result?.isError), body, text };
  };
  const ids = (answer) => (answer.body?.results ?? []).map((r) => r.id);
  const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();
  const componentIds = recordsBy.components.map((c) => c.id);

  // 6. Filtering after an early cut of the ranking left filtered searches
  // short or empty, so the first page must equal the unfiltered ranking with
  // the filter applied here, and the total must count every match.
  const ranked = await call("search", { query: "error message", limit: 1000 });
  const rankedExamples = (ranked.body?.results ?? []).filter((r) => r.collection === "examples");
  const filtered = await call("search", { query: "error message", collection: "examples" });
  const wantTop = rankedExamples.slice(0, 10).map((r) => r.id);
  if (ids(filtered).join() !== wantTop.join()) {
    fail(`search "error message" in examples returned [${ids(filtered).join(", ")}]; the ranking holds [${wantTop.join(", ")}]`);
  }
  if (filtered.body?.total !== rankedExamples.length) {
    fail(`search "error message" in examples reports a total of ${filtered.body?.total}; ${rankedExamples.length} match`);
  }
  ok(`a filtered search returns its top ${wantTop.length} of ${rankedExamples.length} matches`);

  // 7. Listing: an empty query with a filter answers with everything the
  // filter matches. A framework filter keeps the components that have a name
  // in that framework and the examples that come in it. An example with no
  // recorded frameworks is unknown, not unsupported, so the filter keeps it.
  const listed = await call("search", { query: "", collection: "components", limit: 1000 });
  if (!sameSet(ids(listed), componentIds) || listed.body?.total !== componentIds.length) {
    fail(`listing components returned ${ids(listed).length} (total ${listed.body?.total}); the data holds ${componentIds.length}`);
  }
  const frameworkNameField = { react: "reactClassName", angular: "angularSelector", "web-components": "webComponentTag" };
  for (const [framework, nameField] of Object.entries(frameworkNameField)) {
    const components = await call("search", { query: "", collection: "components", framework, limit: 1000 });
    const wantComponents = recordsBy.components.filter((c) => c[nameField]).map((c) => c.id);
    if (!sameSet(ids(components), wantComponents)) {
      fail(`listing ${framework} components returned ${ids(components).length}; ${wantComponents.length} have a name in ${framework}`);
    }
    const examples = await call("search", { query: "", collection: "examples", framework, limit: 1000 });
    const wantExamples = recordsBy.examples
      .filter((e) => !Array.isArray(e.frameworks) || e.frameworks.includes(framework))
      .map((e) => e.id);
    if (!sameSet(ids(examples), wantExamples)) {
      fail(`listing ${framework} examples returned ${ids(examples).length}; ${wantExamples.length} come in ${framework} or record no frameworks`);
    }
  }
  ok(`lists all ${componentIds.length} components; the framework filter keeps what comes in each framework`);

  // 8. Every name a developer types finds its component: the React, web
  // component and Angular names and the display name, through get and
  // through the search's component filter.
  const nameMisses = [];
  for (const c of recordsBy.components) {
    for (const form of [c.reactClassName, c.webComponentTag, c.angularSelector, c.name]) {
      if (!form) continue;
      const hit = await call("get", { id: form });
      if (hit.isError || hit.body?.id !== c.id) nameMisses.push(`${form} -> ${hit.body?.id ?? "not found"}`);
    }
  }
  if (nameMisses.length) {
    fail(`get missed ${nameMisses.length} component names, e.g. ${nameMisses.slice(0, 5).join("; ")}`);
  }
  const spaced = recordsBy.components.filter((c) => / /.test(c.name ?? ""));
  let spacedWithGuidance = 0;
  for (const c of spaced) {
    const byId = await call("search", { query: "", collection: "guidance", component: c.id, limit: 1000 });
    const byName = await call("search", { query: "", collection: "guidance", component: c.name, limit: 1000 });
    if (byName.isError || !sameSet(ids(byName), ids(byId))) {
      fail(`the component filter answers differently for "${c.name}" and "${c.id}"`);
    }
    if (ids(byId).length > 0) spacedWithGuidance++;
  }
  if (spacedWithGuidance === 0) {
    fail("no component with a spaced display name had guidance, so the filter check proved nothing");
  }
  ok(`get resolves every component name; the component filter takes display names (${spaced.length} checked)`);

  // 9. get's default answer says what every record is, and search carries the
  // fields a developer needs, exactly as the data records them.
  const nameless = [];
  for (const [collection, list] of Object.entries(recordsBy)) {
    for (const r of list) {
      const e = (await call("get", { id: r.id, collection })).body?.entry ?? {};
      if (!(e.name?.trim?.() && e.summary?.trim?.())) nameless.push(`${collection}/${r.id}`);
    }
  }
  if (nameless.length) {
    fail(`get's default answer has no name or summary for ${nameless.length} records, e.g. ${nameless.slice(0, 3).join(", ")}`);
  }
  const listedExamples = await call("search", { query: "", collection: "examples", limit: 1000 });
  const recordOf = new Map([...recordsBy.components, ...recordsBy.examples].map((r) => [r.id, r]));
  const fieldMisses = [];
  for (const r of [...(listed.body?.results ?? []), ...(listedExamples.body?.results ?? [])]) {
    for (const field of ["status", "internal", "subcomponent", "size", "productType"]) {
      if (recordOf.get(r.id)?.[field] !== r[field]) fieldMisses.push(`${r.id}.${field}`);
    }
    if (!r.summary?.trim?.()) fieldMisses.push(`${r.id}.summary`);
  }
  if (!listedExamples.body?.results?.length) {
    fail("listing examples returned nothing, so the field check proved nothing");
  }
  if (fieldMisses.length) {
    fail(`search results differ from the data on ${fieldMisses.length} fields, e.g. ${fieldMisses.slice(0, 5).join(", ")}`);
  }
  ok(`get names and describes every record; search carries status and flags`);

  // 10. get says what a record is connected to, as real component ids, and
  // every call a component answer suggests next returns something.
  const componentSet = new Set(componentIds);
  for (const pt of recordsBy.productTypes) {
    const related = (await call("get", { id: pt.id, collection: "productTypes" })).body?.related?.components ?? [];
    if (!sameSet(related.map((c) => c.id), pt.components ?? [])) {
      fail(`get "${pt.id}" relates ${related.length} components; the record lists ${(pt.components ?? []).length}`);
    }
  }
  let guidanceLinks = 0;
  for (const g of recordsBy.guidance) {
    if (!(g.appliesTo?.components ?? []).length) continue;
    const related = ((await call("get", { id: g.id, collection: "guidance" })).body?.related?.components ?? []).map((c) => c.id);
    if (!related.length || related.some((id) => !componentSet.has(id))) {
      fail(`get "${g.id}" relates [${related.join(", ")}]; it applies to [${g.appliesTo.components.join(", ")}]`);
    }
    guidanceLinks += related.length;
  }
  for (const c of recordsBy.components) {
    for (const next of (await call("get", { id: c.id, collection: "components" })).body?.next?.suggested_calls ?? []) {
      const asGet = next.match(/^get\(\{ id: '([^']+)' \}\)$/);
      const asSearch = next.match(/^search\(\{ query: '([^']*)', collection: '([^']+)', component: '([^']+)' \}\)$/);
      const follow = asGet
        ? await call("get", { id: asGet[1] })
        : asSearch
          ? await call("search", { query: asSearch[1], collection: asSearch[2], component: asSearch[3] })
          : null;
      if (!follow || follow.isError || (asSearch && ids(follow).length === 0)) {
        fail(`get "${c.id}" suggests ${next}, which answers nothing`);
      }
    }
  }
  ok(`product types and guidance relate their components (${guidanceLinks} guidance links); every suggested call answers`);

  // 11. Bad input is an error, never an empty success.
  for (const [args, what] of [
    [{ query: "dropdown", limit: -5 }, "a negative limit"],
    [{ query: "dropdown", limit: 0 }, "a zero limit"],
    [{ query: "dropdown", limit: 2.5 }, "a fractional limit"],
    [{ query: "dropdown", component: "not-a-component" }, "an unknown component"],
    [{ query: "  " }, "a blank query and no filter"],
  ]) {
    const answer = await call("search", args);
    if (!answer.isError) {
      fail(`search with ${what} answered ${answer.body?.results?.length ?? "?"} results instead of an error`);
    }
  }
  // A filter that can't match its collection is bad input too: a framework on
  // a collection that isn't tied to one, or a status, size or product type no
  // record there carries, in one collection or across all of them.
  const noFramework = Object.keys(recordsBy).filter((collection) => !["components", "examples"].includes(collection));
  for (const collection of noFramework) {
    if ((await call("search", { query: "", collection, framework: "react" })).isError) continue;
    fail(`search with a framework on ${collection} answered instead of an error`);
  }
  const filterValues = {
    status: ["published", "stable", "deprecated"],
    size: ["interaction", "section", "page", "task", "product"],
    productType: ["workspace", "public-form"],
  };
  const everyRecord = Object.values(recordsBy).flat();
  for (const [collection, list] of [...Object.entries(recordsBy), [undefined, everyRecord]]) {
    for (const [field, values] of Object.entries(filterValues)) {
      const used = new Set(list.map((r) => r[field]).filter(Boolean));
      for (const value of values.filter((v) => !used.has(v))) {
        if ((await call("search", { query: "", collection, [field]: value })).isError) continue;
        fail(`search for ${field} ${value} in ${collection ?? "every collection"} answered instead of an error`);
      }
    }
  }
  const padded = await call("get", { id: `  ${componentIds[0]}  ` });
  if (padded.isError || padded.body?.id !== componentIds[0]) {
    fail(`get with surrounding spaces did not resolve "${componentIds[0]}"`);
  }
  ok("bad input answers with an error; an id with surrounding spaces still resolves");

  // 12. A question names its component: "how do I use the X component" puts X
  // first among the components, for every stable, public, top-level component,
  // so the hint to fetch the first result points at the right one.
  const askable = recordsBy.components.filter((c) => c.status === "stable" && !c.internal && !c.subcomponent);
  const lost = [];
  for (const c of askable) {
    const answer = await call("search", {
      query: `how do I use the ${c.name.toLowerCase()} component`,
      collection: "components",
    });
    if (ids(answer)[0] !== c.id) lost.push(`${c.id} (first: ${ids(answer)[0] ?? "none"})`);
  }
  if (lost.length) {
    fail(`a question about ${lost.length} of ${askable.length} components put another first, e.g. ${lost.slice(0, 5).join(", ")}`);
  }
  ok(`a question puts its component first, for all ${askable.length} stable public components`);

  // 13. A component's API reads cleanly in every framework: every event and
  // margin is described, no raw @default tag shows, and no slot outside React
  // talks about React. These are rules, not named props, so renaming a prop
  // never fails this check.
  const frameworksOf = {};
  for (const c of recordsBy.components) {
    const full = await call("get", { id: c.id, collection: "components", detail: "full" });
    frameworksOf[c.id] = full.body?.entry?.api?.frameworks ?? {};
  }
  const apiGaps = [];
  for (const [id, frameworks] of Object.entries(frameworksOf)) {
    for (const [fw, api] of Object.entries(frameworks)) {
      for (const e of api.events ?? []) {
        if (!e.description?.trim()) apiGaps.push(`${id} ${fw} event ${e.name} has no description`);
      }
      for (const p of api.props ?? []) {
        if (["mt", "mr", "mb", "ml"].includes(p.name) && !p.description?.trim()) {
          apiGaps.push(`${id} ${fw} ${p.name} has no description`);
        }
      }
      for (const item of [...(api.props ?? []), ...(api.events ?? []), ...(api.slots ?? [])]) {
        if (/@default\b/.test(item.description ?? "")) apiGaps.push(`${id} ${fw} ${item.name} shows a raw @default tag`);
      }
      for (const s of api.slots ?? []) {
        if (fw !== "react" && /React/.test(s.description ?? "")) apiGaps.push(`${id} ${fw} slot ${s.name} names React`);
      }
    }
  }
  if (apiGaps.length) {
    fail(`component APIs have ${apiGaps.length} gaps, e.g. ${apiGaps.slice(0, 5).join("; ")}`);
  }
  ok(`every component's events and margins are described, with no raw tags or React wording elsewhere`);

  // 14. An example's code travels with it: get's full answer carries the files
  // for each framework it was detected in, while get's default answer and
  // search stay small. And an example with code or a source link for a
  // framework says it comes in that framework, so the framework filter finds it.
  let examplesWithCode = 0;
  for (const e of recordsBy.examples) {
    const detected = ["interaction", "section"].includes(e.size) ? (e.frameworks ?? []) : [];
    const full = (await call("get", { id: e.id, collection: "examples", detail: "full" })).body?.entry;
    const missing = detected.filter((fw) => !(full?.code?.[fw] ?? []).some((f) => f.content?.trim()));
    if (missing.length) fail(`get "${e.id}" in full carries no ${missing.join(" or ")} code`);
    if (full?.code) examplesWithCode++;
    const summary = (await call("get", { id: e.id, collection: "examples" })).body?.entry;
    if (summary?.code) fail(`get "${e.id}" carries code in its default answer`);
  }
  if (examplesWithCode === 0) fail("no example carried code, so the check proved nothing");
  if ((listedExamples.body?.results ?? []).some((r) => r.code)) fail("search results carry example code");
  const sourceLinkField = { react: "reactSourceUrl", angular: "angularSourceUrl", "web-components": "webComponentsSourceUrl" };
  const unlisted = recordsBy.examples.filter((e) =>
    Object.keys(frameworkNameField).some(
      (framework) =>
        (e.code?.[framework] || e[sourceLinkField[framework]]) &&
        !(Array.isArray(e.frameworks) && e.frameworks.includes(framework)),
    ),
  );
  if (unlisted.length) {
    fail(`${unlisted.length} examples have code or a source link for a framework they don't list, e.g. ${unlisted.slice(0, 5).map((e) => e.id).join(", ")}`);
  }
  ok(`${examplesWithCode} examples carry their code in get's full answer`);
} catch (err) {
  fail(err instanceof Error ? err.message : String(err));
}

// The server exits on its own when stdin closes; end it that way so the
// whole process tree winds down (kill only as backstop), then wait before
// removing a folder the child may still hold open on Windows.
shuttingDown = true;
const exited = new Promise((resolve) => {
  child.once("exit", resolve);
  setTimeout(resolve, 5000).unref();
});
child.stdin.end();
await exited;
if (child.exitCode === null) child.kill();
cleanup();
console.log(
  `smoke-test: PASS (${records} records, ${edges} edges, v${pkg.version} through the npm bin)`,
);
