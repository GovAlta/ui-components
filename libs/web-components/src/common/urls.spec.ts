import { isUrlMatch } from "./urls";
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
