#!/usr/bin/env node
/**
 * Publishes @abgov/design-system-mcp.
 *
 * The other packages release through semantic-release, which computes a
 * version from commit messages. This package's version names the design system
 * release its data describes: the major and minor follow @abgov/web-components,
 * and the patch counts our own builds within that line, so a team on
 * web-components 2.5.x pins a 2.5 version and, when it updates, moves within
 * 2.5 rather than to a newer line.
 *
 * Runs from the `release` target on a push to main (npm tag `latest`) or dev
 * (prerelease, npm tag `dev`), after the component libraries' own releases
 * (the target depends on ^release). In order:
 *   1. Picks the lane from the branch; any other branch skips.
 *   2. Reads the web-components version to match: the one this run published,
 *      or else the registry's tag for the lane.
 *   3. Computes the next version on that line from the registry and this
 *      package's own git tags.
 *   4. Holds the dev lane until a stable version exists, so `latest` is never
 *      a prerelease.
 *   5. Stamps dist's package.json, runs the smoke test on it, publishes, and
 *      creates the git tag and GitHub release.
 *
 * `--dry-run` does everything except publish and tag; `--branch <name>` (dry
 * runs only) pretends to be on that branch.
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const PACKAGE = "@abgov/design-system-mcp";
const SOURCE_PACKAGE = "@abgov/web-components";
const SOURCE_PACKAGE_JSON = "libs/web-components/package.json";
const SOURCE_DIST_PACKAGE_JSON = "dist/libs/web-components/package.json";
const TAG_PREFIX = "design-system-mcp-v";
const PKG_ROOT = "dist/libs/design-system-mcp";
const SMOKE_TEST = "libs/design-system-mcp/scripts/smoke-test.mjs";
const REGISTRY = "https://registry.npmjs.org/";

// Which branch publishes to which npm tag, and the prerelease id its versions
// carry. Any other branch skips, as semantic-release does for branches it is
// not configured for.
const LANES = {
  main: { npmTag: "latest", prerelease: null },
  dev: { npmTag: "dev", prerelease: "dev" },
};

function log(message) {
  console.log(`release: ${message}`);
}

function fail(message) {
  console.error(`release: ${message}`);
  process.exit(1);
}

// On Windows npm is a .cmd, which Node only runs through a shell; the same
// arrangement as the smoke test, so a dry run works there too.
function run(command, args, { allowFailure = false, inherit = false } = {}) {
  const options = { encoding: "utf8", stdio: inherit ? "inherit" : "pipe" };
  const result =
    process.platform === "win32" && command === "npm"
      ? spawnSync([command, ...args.map((a) => `"${a}"`)].join(" "), {
          ...options,
          shell: true,
        })
      : spawnSync(command, args, options);
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) {
    throw new Error(
      `${command} ${args.join(" ")} exited ${result.status}\n${result.stderr ?? ""}`,
    );
  }
  return result;
}

// ---------------------------------------------------------------------------
// Versions: X.Y.Z and X.Y.Z-<id>.N, the two shapes this package and
// web-components use. Anything else is ignored rather than guessed at.
// ---------------------------------------------------------------------------

export function parseVersion(text) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-([a-z]+)\.(\d+))?$/.exec(text);
  if (!match) return null;
  return {
    text,
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ? { id: match[4], n: Number(match[5]) } : null,
  };
}

export function compareVersions(a, b) {
  for (const key of ["major", "minor", "patch"]) {
    if (a[key] !== b[key]) return a[key] - b[key];
  }
  // A release outranks its own prereleases: 2.5.0 > 2.5.0-dev.9.
  if (!a.prerelease && !b.prerelease) return 0;
  if (!a.prerelease) return 1;
  if (!b.prerelease) return -1;
  if (a.prerelease.id !== b.prerelease.id) {
    return a.prerelease.id < b.prerelease.id ? -1 : 1;
  }
  return a.prerelease.n - b.prerelease.n;
}

function highest(versions) {
  return versions.reduce(
    (best, v) => (best === null || compareVersions(v, best) > 0 ? v : best),
    null,
  );
}

function inLane(version, lane) {
  return lane.prerelease
    ? version.prerelease?.id === lane.prerelease
    : version.prerelease === null;
}

// The versions that share a line with the source version: major.minor on the
// stable lane, and the full major.minor.patch on the dev lane, so 3.0.1-dev.*
// sorts after 3.0.0.
export function versionsOnLine(published, source, lane) {
  return published.filter(
    (v) =>
      inLane(v, lane) &&
      v.major === source.major &&
      v.minor === source.minor &&
      (lane.prerelease === null || v.patch === source.patch),
  );
}

export function nextVersion(published, source, lane) {
  const latest = highest(versionsOnLine(published, source, lane));
  if (lane.prerelease) {
    const n = latest ? latest.prerelease.n + 1 : 1;
    return `${source.major}.${source.minor}.${source.patch}-${lane.prerelease}.${n}`;
  }
  const patch = latest ? latest.patch + 1 : 0;
  return `${source.major}.${source.minor}.${patch}`;
}

// ---------------------------------------------------------------------------
// Reading the world: the registry, git tags, the built packages.
// ---------------------------------------------------------------------------

function laneFor(branch) {
  const lane = LANES[branch];
  return lane ? { name: branch, ...lane } : null;
}

// A package's registry record: every published version and the dist-tags.
// `write=true` asks for the uncached copy (npm's own unpublish reads it the
// same way); the plain URL is CDN-cached for five minutes. null means the
// package does not exist yet; any other failure throws, because nothing
// downstream can be computed without it.
export async function fetchPackument(name) {
  const response = await fetch(`${REGISTRY}${name.replaceAll("/", "%2F")}?write=true`, {
    headers: { Accept: "application/json" },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`the registry answered ${response.status} for ${name}`);
  }
  const body = await response.json();
  return { versions: body.versions ?? {}, distTags: body["dist-tags"] ?? {} };
}

export function publishedVersions(packument) {
  return packument
    ? Object.keys(packument.versions)
        .map(parseVersion)
        .filter((v) => v !== null)
    : [];
}

export function stableExists(packument) {
  return publishedVersions(packument).some((v) => v.prerelease === null);
}

function tagVersions(prefix) {
  return run("git", ["tag", "--list", `${prefix}*`])
    .stdout.split("\n")
    .filter((t) => t.startsWith(prefix))
    .map((t) => parseVersion(t.slice(prefix.length)))
    .filter((v) => v !== null);
}

function versionField(file) {
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")).version : null;
}

// Which web-components version this MCP describes. semantic-release's npm
// plugin writes the released version into dist's package.json before it
// publishes, and a failed publish fails the run before this task, so a dist
// version that differs from the source's is the one this run published: no
// registry lag, no git tags. When this run published nothing, the registry's
// dist-tag for the lane is the answer.
export function chooseSourceVersion({ distVersion, sourceVersion, packument, lane }) {
  const fromDist =
    distVersion && distVersion !== sourceVersion ? parseVersion(distVersion) : null;
  if (fromDist && inLane(fromDist, lane)) {
    return {
      version: fromDist,
      origin: `${SOURCE_DIST_PACKAGE_JSON}, published by this run`,
    };
  }
  const tagged = packument?.distTags?.[lane.npmTag];
  return {
    version: tagged ? parseVersion(tagged) : null,
    origin: `the registry's ${lane.npmTag} tag`,
    note: fromDist
      ? `${SOURCE_DIST_PACKAGE_JSON} says ${fromDist.text}, which is not a ${lane.name} version; ignoring it`
      : undefined,
  };
}

// ---------------------------------------------------------------------------
// Writing: package.json, the smoke test, npm, GitHub.
// ---------------------------------------------------------------------------

function stampPackageJson(version, source) {
  const file = join(PKG_ROOT, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.version = version;
  pkg.goa = { matches: `${SOURCE_PACKAGE}@${source.text}` };
  writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
  log(`wrote ${file}: version ${version}, matches ${pkg.goa.matches}`);
}

// The same check PR CI runs, on the stamped artifact about to ship. It exits
// non-zero on any failure, which stops the release here.
function runSmokeTest() {
  log(`running the smoke test on the stamped package`);
  const result = run("node", [SMOKE_TEST], { allowFailure: true, inherit: true });
  if (result.status !== 0) fail(`the smoke test failed; nothing published`);
}

// The same arrangement semantic-release uses: the npmrc references ${NPM_TOKEN}
// and npm expands it, so the token is never written to disk. Without a token,
// npm publishes as whatever it can authenticate as.
function npmrcForToken() {
  if (!process.env.NPM_TOKEN) return null;
  const file = join(mkdtempSync(join(tmpdir(), "design-system-mcp-release-")), ".npmrc");
  writeFileSync(file, `//registry.npmjs.org/:_authToken=\${NPM_TOKEN}\n`);
  return file;
}

function publish(lane, npmrc, dryRun) {
  const args = [
    "publish",
    resolve(PKG_ROOT),
    "--tag",
    lane.npmTag,
    "--registry",
    REGISTRY,
  ];
  if (npmrc) args.push("--userconfig", npmrc);
  if (dryRun) args.push("--dry-run");
  run("npm", args, { inherit: true });
}

// One call creates the tag at the commit and the release that shows it, in the
// tag format semantic-release gives the other packages.
async function createGitHubRelease(version, lane, source, dryRun) {
  const tag = `${TAG_PREFIX}${version}`;
  const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
  const body = `Design system MCP ${version}, matching ${SOURCE_PACKAGE} ${source.text}. Built from ${GITHUB_SHA ?? "(commit unknown)"}.`;
  if (dryRun) {
    log(`dry run: would create tag ${tag} and a GitHub release with the note "${body}"`);
    return;
  }
  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !GITHUB_SHA) {
    fail(
      `${PACKAGE}@${version} is published, but GITHUB_TOKEN, GITHUB_REPOSITORY and GITHUB_SHA are needed to create tag ${tag}; create it by hand`,
    );
  }
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPOSITORY}/releases`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        tag_name: tag,
        target_commitish: GITHUB_SHA,
        name: tag,
        body,
        prerelease: lane.prerelease !== null,
      }),
    },
  );
  if (!response.ok) {
    fail(
      `${PACKAGE}@${version} is published, but creating tag ${tag} failed: ${response.status} ${await response.text()}; create it by hand`,
    );
  }
  const release = await response.json();
  log(`created ${tag}: ${release.html_url}`);
}

// ---------------------------------------------------------------------------

async function main(argv) {
  const dryRun = argv.includes("--dry-run");
  const branchFlag = argv.indexOf("--branch");
  let branch = process.env.GITHUB_REF_NAME;
  if (branchFlag !== -1 && dryRun) branch = argv[branchFlag + 1];
  if (!branch) branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim();
  const lane = laneFor(branch);
  if (!lane) {
    log(`branch "${branch}" does not publish the MCP; releases run from main or dev`);
    return;
  }
  log(`${dryRun ? "dry run on" : "releasing from"} ${lane.name}: npm tag ${lane.npmTag}`);

  const choice = chooseSourceVersion({
    distVersion: versionField(SOURCE_DIST_PACKAGE_JSON),
    sourceVersion: versionField(SOURCE_PACKAGE_JSON),
    packument: await fetchPackument(SOURCE_PACKAGE),
    lane,
  });
  if (choice.note) log(choice.note);
  if (!choice.version)
    fail(`found no ${SOURCE_PACKAGE} version to match for the ${lane.name} lane`);
  const source = choice.version;
  log(`matching ${SOURCE_PACKAGE} ${source.text} (from ${choice.origin})`);

  // A version that was unpublished is gone from the registry and can never be
  // published again; this package's own tags remember it.
  const packument = await fetchPackument(PACKAGE);
  const ownTags = tagVersions(TAG_PREFIX);
  if (!packument) log(`${PACKAGE} is not on the registry yet; this is its first publish`);
  const seen = new Set();
  const known = [...publishedVersions(packument), ...ownTags].filter((v) =>
    seen.has(v.text) ? false : seen.add(v.text),
  );
  const version = nextVersion(known, source, lane);
  log(`next version on this line is ${version}`);

  if (lane.prerelease && !stableExists(packument)) {
    log(
      `held: no stable ${PACKAGE} exists yet, so ${lane.name} does not publish; the first publish must come from main so that the registry's latest tag is a stable release. Nothing is wrong; this run would have published ${version}.`,
    );
    return;
  }

  stampPackageJson(version, source);
  runSmokeTest();
  publish(lane, npmrcForToken(), dryRun);
  log(
    dryRun
      ? `dry run: would publish ${PACKAGE}@${version} to the ${lane.npmTag} tag`
      : `published ${PACKAGE}@${version} to the ${lane.npmTag} tag`,
  );
  await createGitHubRelease(version, lane, source, dryRun);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
) {
  main(process.argv.slice(2)).catch((error) => fail(error.stack ?? String(error)));
}
