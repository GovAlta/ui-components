const SC = require("./lib/design-tokens");
const rm = require("rimraf");
const fs = require("fs");

describe("GoA Design Tokens", () => {
  beforeEach((next) => {
    rm("./tmp", next);
    console.log = () => { }; // one of the libs has some console.log statements
  });

  it("should create css and scss files", async () => {
    SC.generate("./tmp");

    const cssfiles = fs.readdirSync("./tmp/dist");
    expect(cssfiles.length).toBe(3);
    expect(cssfiles[0]).toBe(`dark-theme.css`);
    expect(cssfiles[1]).toBe(`tokens.css`);
    expect(cssfiles[2]).toBe(`tokens.scss`);
  });

  it("should create valid css output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/dist/tokens.css", { encoding: "utf8" });
    expect(raw).not.toContain("[object Object]");
  });
  it("should create valid scss output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/dist/tokens.scss", { encoding: "utf8" });
    expect(raw).not.toContain("[object Object]");
  });

  it("should not contain double goa prefixes", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/dist/tokens.css", { encoding: "utf8" });
    expect(raw).not.toContain("--goa-goa");
  });

  it("should not contain undefined values", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/dist/tokens.css", { encoding: "utf8" });
    expect(raw.toLowerCase()).not.toContain("undefined");
  });
});
