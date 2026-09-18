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
