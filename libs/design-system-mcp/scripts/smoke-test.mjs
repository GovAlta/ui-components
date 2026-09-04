/**
 * Smoke test for the built @abgov/design-system-mcp package.
 *
 * Packs dist/libs/design-system-mcp, installs the tarball into a throwaway
 * folder, and drives the installed server through its npm bin over JSON-RPC,
 * the same path a consuming team's MCP client uses. Exits non-zero on any
 * failure so CI stops instead of shipping a broken package.
 *
 * Checks:
 *   1. The packed data carries at least 300 records across the collections.
 *   2. Example-to-component relationship edges exist.
 *   3. initialize succeeds through the bin symlink, and serverInfo.version
 *      matches the installed package.json (the version is read at runtime).
 *   4. tools/list exposes search and get.
 *   5. search returns hits and get returns a real record.
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

let work;
function cleanup() {
  if (work) rmSync(work, { recursive: true, force: true });
}
function fail(message) {
  console.error(`smoke-test: FAIL - ${message}`);
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
const pack = spawnSync("npm", ["pack", "--pack-destination", work, "--loglevel=error"], {
  cwd: distDir,
  encoding: "utf8",
});
if (pack.status !== 0) fail(`npm pack exited ${pack.status}:\n${pack.stderr}`);
const tarball = pack.stdout.trim().split("\n").pop();
if (!tarball) fail("npm pack reported no tarball name");
ok(`packed ${tarball}`);

// 2. Install it into a fresh consumer folder, like a team would.
const consumer = join(work, "consumer");
mkdirSync(consumer);
writeFileSync(
  join(consumer, "package.json"),
  JSON.stringify({ name: "smoke-consumer", private: true }),
);
const install = spawnSync(
  "npm",
  ["install", join(work, tarball), "--no-audit", "--no-fund", "--loglevel=error"],
  { cwd: consumer, encoding: "utf8" },
);
if (install.status !== 0) fail(`npm install exited ${install.status}:\n${install.stderr}`);

const installedRoot = join(consumer, "node_modules", "@abgov", "design-system-mcp");
const bin = join(consumer, "node_modules", ".bin", "goa-design-system-mcp");
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
const child = spawn(bin, [], { stdio: ["pipe", "pipe", "pipe"] });
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
  ok(`initialize through the bin symlink, serverInfo.version ${serverInfo.version}`);
  notify("notifications/initialized");

  const tools = await request("tools/list", {});
  const names = (tools.result?.tools ?? []).map((t) => t.name).sort();
  if (!(names.includes("search") && names.includes("get"))) {
    fail(`tools/list returned [${names.join(", ")}], expected search and get`);
  }
  ok(`tools: ${names.join(", ")}`);

  const search = await request("tools/call", {
    name: "search",
    arguments: { query: "button" },
  });
  const searchText = search.result?.content?.[0]?.text ?? "";
  if (search.result?.isError || searchText.length === 0) {
    fail(`search for "button" failed or returned nothing: ${JSON.stringify(search).slice(0, 300)}`);
  }
  ok(`search returned content (${searchText.length} chars)`);

  const get = await request("tools/call", { name: "get", arguments: { id: exampleId } });
  const getText = get.result?.content?.[0]?.text ?? "";
  if (get.result?.isError || getText.length === 0) {
    fail(`get for "${exampleId}" failed or returned nothing: ${JSON.stringify(get).slice(0, 300)}`);
  }
  ok(`get returned "${exampleId}" (${getText.length} chars)`);
} catch (err) {
  fail(err instanceof Error ? err.message : String(err));
}

child.kill();
cleanup();
console.log(
  `smoke-test: PASS (${records} records, ${edges} edges, v${pkg.version} through the npm bin)`,
);
