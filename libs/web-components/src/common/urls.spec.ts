import { getMatchedLink, isUrlMatch } from "./urls";
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
      weight: -1,
    },
    {
      desc: "root path only match",
      windowUrl: new URL("http://localhost"),
      testUrl: "/",
      weight: 1,
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
    try {
      expect(isUrlMatch(spec.windowUrl, spec.testUrl)).toEqual(spec.weight);
    } catch (error) {
      throw new Error(spec.desc);
    }
  }
});

interface MenuTest {
  desc: string;
  windowUrl: URL;
  activeMenuHref: string | undefined;
}

it("should fix bug/1368 getMatchedLink", () => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const links: any[] = [
    {
      getAttribute: (attr: string) => (attr === "href" ? "/" : null),
    },
    {
      getAttribute: (attr: string) => (attr === "href" ? "/get-started" : null),
    },
    {
      getAttribute: (attr: string) => (attr === "href" ? "/accordion" : null),
    },
    {
      getAttribute: (attr: string) => (attr === "href" ? "/patterns" : null),
    },
    // Make sure external link won't be able to highlighted in any case, even it matched
    {
      getAttribute: (attr: string) => {
        if (attr === "href") return "https://google.com/choose";
        if (attr === "target") return "_blank";
        return null;
      },
    },
  ];

  const specs: MenuTest[] = [
    {
      desc: "return home menu / if we navigate to /",
      windowUrl: new URL("http://localhost/"),
      activeMenuHref: "/",
    },
    {
      desc: "return Get started menu if we navigate to /get-started",
      windowUrl: new URL("http://localhost/get-started"),
      activeMenuHref: "/get-started",
    },
    {
      desc: "return Get started menu if we navigate to /get-started/developers",
      windowUrl: new URL("http://localhost/get-started/developers"),
      activeMenuHref: "/get-started",
    },
    {
      desc: "return Accordion if we navigate to /accordion#tab-0",
      windowUrl: new URL("http://localhost/accordion#tab-0"),
      activeMenuHref: "/accordion",
    },
    {
      desc: "return patterns menu if we navigate to /patterns#tab-1",
      windowUrl: new URL("http://localhost/patterns#tab-1"),
      activeMenuHref: "/patterns",
    },
    {
      desc: "return no menu if we navigate to /profile",
      windowUrl: new URL("http://localhost/profile"),
      activeMenuHref: undefined,
    },
  ];

  for (const spec of specs) {
    const matchedLink = getMatchedLink(links, spec.windowUrl);
    try {
      expect(matchedLink?.getAttribute("href")).toEqual(spec.activeMenuHref);
    } catch (error) {
      throw new Error(spec.desc);
    }
  }
});
