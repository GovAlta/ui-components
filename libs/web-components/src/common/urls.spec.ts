import {getMatchedLink, isUrlMatch} from "./urls";
import { it } from "vitest";

interface MyTest {
  desc: string;
  windowUrl: URL;
  testUrl: string;
  weight: number;
}

it("should match urls", async () => {
  const specs: MyTest[] = [
    {
      desc: "paths don't match",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "/bar",
      weight: -1,
    },
    {
      desc: "partial path should not match",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "/foobar",
      weight: -1,
    },
    {
      desc: "partial path should not match",
      windowUrl: new URL("http://localhost/foobar"),
      testUrl: "/foo",
      weight: -1,
    },
    {
      desc: "no match",
      windowUrl: new URL("http://localhost"),
      testUrl: "/foo",
      weight: -1,
    },
    {
      desc: "no match when window url is shorter than the test url",
      windowUrl: new URL("http://localhost/foo/bar"),
      testUrl: "/foo/bar/bam/boom",
      weight: -1,
    },
    {
      desc: "empty test url",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "",
      weight: 0,
    },
    {
      desc: "root path only match",
      windowUrl: new URL("http://localhost"),
      testUrl: "/",
      weight: 0,
    },
    {
      desc: "path match",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "/foo",
      weight: 1,
    },
    {
      desc: "parent path matches",
      windowUrl: new URL("http://localhost/foo/bar"),
      testUrl: "/foo",
      weight: 1,
    },
    {
      desc: "match with querystring",
      windowUrl: new URL("http://localhost/foo?someval=val"),
      testUrl: "/foo",
      weight: 1,
    },
    {
      desc: "match with path and hash",
      windowUrl: new URL("http://localhost/foo#somehash"),
      testUrl: "/foo",
      weight: 1,
    },
    {
      desc: "match with path and subpath",
      windowUrl: new URL("http://localhost/foo/bar"),
      testUrl: "/foo/bar",
      weight: 2,
    },
    {
      desc: "match with path and subpath",
      windowUrl: new URL("http://localhost/foo/bar/bam"),
      testUrl: "/foo/bar",
      weight: 2,
    },
    {
      desc: "match with path and subpath",
      windowUrl: new URL("http://localhost/foo/bar/bam"),
      testUrl: "/foo/bar/bam",
      weight: 3,
    },
    {
      desc: "match with path and subpath",
      windowUrl: new URL("http://localhost/foo/bar/bam/boom"),
      testUrl: "/foo/bar/bam",
      weight: 3,
    },
    {
      desc: "match with path and subpath",
      windowUrl: new URL("http://localhost/foo/bar/bam/boom"),
      testUrl: "/foo/bar/bam/boom",
      weight: 4,
    },
    {
      desc: "match with hash only",
      windowUrl: new URL("http://localhost#foo"),
      testUrl: "#foo",
      weight: 1,
    },
    {
      desc: "match with hash and forward slash",
      windowUrl: new URL("http://localhost/#foo"),
      testUrl: "#foo",
      weight: 1,
    },
  ];

  for (const spec of specs) {
    expect(isUrlMatch(spec.windowUrl, spec.testUrl)).toEqual(spec.weight);
  }
});

describe("should getMatchedLink", () => {
  const links: any[] = [
    { getAttribute: () => "#/" },
    { getAttribute: () => "#/get-started" },
    { getAttribute: () => "#/tabs" },
    { getAttribute: () => "/patterns" },
  ];

  it("should return Home menu if we navigate to a root URL", () => {
    const windowUrl = "/ui-components/#/";
    const result = getMatchedLink(links, windowUrl);
    expect(result?.getAttribute("href")).toEqual("#/");
  });

  it("should return get-started if we navigate to /get-started", () => {
    const windowUrl = "/ui-components/#/get-started";
    const result = getMatchedLink(links, windowUrl);
    expect(result?.getAttribute("href")).toEqual("#/get-started");
  });

  it("should return get-started if we navigate to /get-started/developers", () => {
    const windowUrl = "/ui-components/#/get-started/developers";
    const result = getMatchedLink(links, windowUrl)
    expect(result?.getAttribute("href")).toEqual("#/get-started");
  });

  it("should return tabs if we navigate to /tabs#tab-0", () => {
    const windowUrl = "/ui-components/#/tabs#tab-0";
    const result = getMatchedLink(links, windowUrl);
    expect(result?.getAttribute("href")).toEqual("#/tabs");
  });

  it("should return null if we navigate to /accordion", () => {
    const windowUrl = "/ui-components/#/accordion";
    const result = getMatchedLink(links, windowUrl);
    console.log(result?.getAttribute("href"));
    expect(result).toBeNull();
  });

  it("should return patterns menu if we navigate to /patterns", () => {
    const windowUrl = "/patterns#tab-0";
    const result = getMatchedLink(links, windowUrl);
    expect(result?.getAttribute("href")).toEqual("/patterns");
  });

  it("should return patterns menu if we navigate to /patterns/complex-form", () => {
    const windowUrl = "/patterns/complex-form";
    const result = getMatchedLink(links, windowUrl);
    expect(result?.getAttribute("href")).toEqual("/patterns");
  });
})
