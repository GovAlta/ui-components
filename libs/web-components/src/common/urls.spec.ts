import { isUrlMatch } from "./urls";

interface MyTest {
  desc: string;
  windowUrl: URL;
  testUrl: string;
  matches: boolean;
}

it("should match urls", async () => {
  const specs: MyTest[] = [
    {
      desc: "path match",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "/foo",
      matches: true,
    },
    {
      desc: "paths don't match",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "/bar",
      matches: false,
    },
    {
      desc: "parent path matches",
      windowUrl: new URL("http://localhost/foo/bar"),
      testUrl: "/foo",
      matches: true,
    },
    {
      desc: "partial path should not match",
      windowUrl: new URL("http://localhost/foo"),
      testUrl: "/foobar",
      matches: false,
    },
    {
      desc: "partial path should not match",
      windowUrl: new URL("http://localhost/foobar"),
      testUrl: "/foo",
      matches: false,
    },
    {
      desc: "match with querystring",
      windowUrl: new URL("http://localhost/foo?someval=val"),
      testUrl: "/foo",
      matches: true,
    },
    {
      desc: "match with path and hash",
      windowUrl: new URL("http://localhost/foo#somehash"),
      testUrl: "/foo",
      matches: true,
    },
    {
      desc: "match with hash only",
      windowUrl: new URL("http://localhost#foo"),
      testUrl: "#foo",
      matches: true,
    },
    {
      desc: "match with hash and forward slash",
      windowUrl: new URL("http://localhost/#foo"),
      testUrl: "#foo",
      matches: true,
    },
  ];

  for (const spec of specs) {
    expect(isUrlMatch(spec.windowUrl, spec.testUrl)).toEqual(spec.matches);
  }
});
