// Unit tests for the decisions release.mjs makes: how versions parse and
// order, the next version on a line, and which web-components version to
// match. Everything runs on synthetic inputs, so it needs no build and no
// network.
import { describe, expect, it } from "vitest";
import {
  chooseSourceVersion,
  compareVersions,
  nextVersion,
  parseVersion,
  publishedVersions,
  stableExists,
  versionsOnLine,
} from "./release.mjs";

const stable = { name: "main", npmTag: "latest", prerelease: null };
const dev = { name: "dev", npmTag: "dev", prerelease: "dev" };
const v = (text) => parseVersion(text);
const list = (...texts) => texts.map(v);

// A packument: versions and dist-tags, nothing else matters here.
const pack = (versions, distTags = {}) => ({
  versions: Object.fromEntries(versions.map((text) => [text, {}])),
  distTags,
});

describe("parseVersion", () => {
  it("reads the two shapes this package and web-components use", () => {
    expect(v("2.5.0")).toEqual({
      text: "2.5.0",
      major: 2,
      minor: 5,
      patch: 0,
      prerelease: null,
    });
    expect(v("3.0.0-dev.12").prerelease).toEqual({ id: "dev", n: 12 });
  });

  it("ignores every other shape rather than guessing", () => {
    for (const text of [
      "2.5",
      "v2.5.0",
      "2.5.0-dev",
      "2.5.0-rc1",
      "2.5.0+build.1",
      "garbage",
    ]) {
      expect(v(text)).toBeNull();
    }
  });
});

describe("compareVersions", () => {
  const order = (a, b) => Math.sign(compareVersions(v(a), v(b)));

  it("ranks a release above its own prereleases", () => {
    expect(order("2.5.0", "2.5.0-dev.9")).toBe(1);
    expect(order("2.5.0-dev.9", "2.5.0")).toBe(-1);
  });

  it("compares numbers as numbers", () => {
    expect(order("2.10.0", "2.9.0")).toBe(1);
    expect(order("3.0.0-dev.2", "3.0.0-dev.10")).toBe(-1);
    expect(order("3.0.0-dev.1", "3.0.0-dev.1")).toBe(0);
  });
});

describe("versionsOnLine and nextVersion", () => {
  it("the stable line is major.minor; prereleases and other lines are not on it", () => {
    const published = publishedVersions(
      pack(["2.5.0", "2.5.0-next.1", "2.5.1", "2.6.0", "2.5.2-dev.1"]),
    );
    expect(versionsOnLine(published, v("2.5.4"), stable).map((x) => x.text)).toEqual([
      "2.5.0",
      "2.5.1",
    ]);
  });

  it("the dev line is major.minor.patch, so 3.0.1-dev.* sorts after 3.0.0", () => {
    const published = publishedVersions(
      pack(["3.0.0-dev.1", "3.0.1-dev.1", "3.0.0", "3.0.0-alpha.2"]),
    );
    expect(versionsOnLine(published, v("3.0.0-dev.4"), dev).map((x) => x.text)).toEqual([
      "3.0.0-dev.1",
    ]);
  });

  it("starts a stable line at .0 and counts its own patches, whatever web-components' patch is", () => {
    expect(nextVersion([], v("2.5.3"), stable)).toBe("2.5.0");
    expect(nextVersion(list("2.5.0", "2.5.1"), v("2.5.3"), stable)).toBe("2.5.2");
    expect(nextVersion(list("2.5.10", "2.5.9"), v("2.5.0"), stable)).toBe("2.5.11");
    expect(nextVersion(list("2.5.4"), v("2.6.0"), stable)).toBe("2.6.0");
  });

  it("counts dev prereleases independently of web-components' own counter", () => {
    expect(nextVersion([], v("3.0.0-dev.1"), dev)).toBe("3.0.0-dev.1");
    expect(
      nextVersion(
        list("3.0.0-dev.1", "3.0.0-dev.2", "3.0.0-dev.3"),
        v("3.0.0-dev.2"),
        dev,
      ),
    ).toBe("3.0.0-dev.4");
    expect(nextVersion(list("3.0.0-dev.5", "3.0.1-dev.1"), v("3.0.0-dev.7"), dev)).toBe(
      "3.0.0-dev.6",
    );
    expect(nextVersion(list("3.0.0"), v("3.0.0-dev.1"), dev)).toBe("3.0.0-dev.1");
  });

  it("never reuses a version known only from our own tag (unpublished from the registry)", () => {
    // 2.5.3 was published and then unpublished: gone from the registry, still tagged.
    const registry = publishedVersions(pack(["2.5.0", "2.5.2"]));
    const ownTags = list("2.5.0", "2.5.2", "2.5.3");
    const seen = new Set();
    const known = [...registry, ...ownTags].filter((x) =>
      seen.has(x.text) ? false : seen.add(x.text),
    );
    expect(nextVersion(known, v("2.5.0"), stable)).toBe("2.5.4");
  });
});

describe("publishedVersions and stableExists", () => {
  it("keeps only the version shapes this package uses", () => {
    const packument = pack(["2.5.0", "1.39.0-alpha.3", "2.0.0-next.1", "garbage"]);
    expect(
      publishedVersions(packument)
        .map((x) => x.text)
        .sort(),
    ).toEqual(["1.39.0-alpha.3", "2.0.0-next.1", "2.5.0"]);
  });

  it("stableExists is false with no packument or only prereleases, true with any stable", () => {
    expect(stableExists(null)).toBe(false);
    expect(stableExists(pack(["3.0.0-dev.1", "3.0.0-dev.2"]))).toBe(false);
    expect(stableExists(pack(["3.0.0-dev.1", "2.5.0"]))).toBe(true);
  });
});

describe("chooseSourceVersion", () => {
  const registry = pack(["2.4.0", "2.5.0", "3.0.0-dev.1"], {
    latest: "2.5.0",
    dev: "3.0.0-dev.1",
  });

  it("matches the version this run published: dist's version differs from the source's", () => {
    const onMain = chooseSourceVersion({
      distVersion: "2.6.0",
      sourceVersion: "0.0.0",
      packument: registry,
      lane: stable,
    });
    expect(onMain.version.text).toBe("2.6.0");
    expect(onMain.origin).toMatch(/dist\/libs\/web-components\/package\.json/);
    expect(onMain.note).toBeUndefined();
    const onDev = chooseSourceVersion({
      distVersion: "3.0.0-dev.2",
      sourceVersion: "0.0.0",
      packument: registry,
      lane: dev,
    });
    expect(onDev.version.text).toBe("3.0.0-dev.2");
  });

  it("falls back to the registry's dist-tag when this run published nothing", () => {
    const onMain = chooseSourceVersion({
      distVersion: "0.0.0",
      sourceVersion: "0.0.0",
      packument: registry,
      lane: stable,
    });
    expect(onMain.version.text).toBe("2.5.0");
    expect(onMain.origin).toMatch(/registry's latest tag/);
    const onDev = chooseSourceVersion({
      distVersion: "0.0.0",
      sourceVersion: "0.0.0",
      packument: registry,
      lane: dev,
    });
    expect(onDev.version.text).toBe("3.0.0-dev.1");
  });

  it("compares dist against the source's own version, not a fixed 0.0.0", () => {
    const choice = chooseSourceVersion({
      distVersion: "0.0.1",
      sourceVersion: "0.0.1",
      packument: registry,
      lane: stable,
    });
    expect(choice.version.text).toBe("2.5.0");
  });

  it("uses the registry when dist has no package.json (no local build)", () => {
    const choice = chooseSourceVersion({
      distVersion: null,
      sourceVersion: "0.0.0",
      packument: registry,
      lane: stable,
    });
    expect(choice.version.text).toBe("2.5.0");
  });

  it("ignores a dist version from the other lane, with a note", () => {
    const choice = chooseSourceVersion({
      distVersion: "3.0.0-dev.2",
      sourceVersion: "0.0.0",
      packument: registry,
      lane: stable,
    });
    expect(choice.version.text).toBe("2.5.0");
    expect(choice.note).toMatch(/3\.0\.0-dev\.2, which is not a main version/);
  });

  it("ignores a dist version it cannot parse", () => {
    const choice = chooseSourceVersion({
      distVersion: "2.6.0-beta",
      sourceVersion: "0.0.0",
      packument: registry,
      lane: stable,
    });
    expect(choice.version.text).toBe("2.5.0");
  });

  it("offers nothing when the registry has no tag for the lane, or no package", () => {
    const noDevTag = pack(["2.5.0"], { latest: "2.5.0" });
    expect(
      chooseSourceVersion({
        distVersion: "0.0.0",
        sourceVersion: "0.0.0",
        packument: noDevTag,
        lane: dev,
      }).version,
    ).toBeNull();
    expect(
      chooseSourceVersion({
        distVersion: "0.0.0",
        sourceVersion: "0.0.0",
        packument: null,
        lane: stable,
      }).version,
    ).toBeNull();
  });
});
