import { test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { verifyBundle } from "./verify-bundle";

function fixture(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "verify-bundle-"));
}

// A verifier that has only ever returned [] proves nothing. These plant known
// violations and confirm they are caught — the net actually has holes-detection.
test("verifyBundle catches a raw tag leaking outside code fences", () => {
  const dir = fixture();
  fs.mkdirSync(path.join(dir, "react", "components"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "react", "components", "bad.md"),
    "---\nid: bad\n---\n\n# Bad\n\n<div>leaked</div>\n",
  );
  const violations = verifyBundle(dir, path.join(dir, "no-mcp"));
  assert.ok(
    violations.some((v) => /raw tag/.test(v.message)),
    "should flag the raw <div> outside a code fence",
  );
});

test("verifyBundle catches an unrestored code placeholder", () => {
  const dir = fixture();
  fs.mkdirSync(path.join(dir, "react"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "react", "x.md"),
    "---\nid: x\n---\n\n@@CODEMASK@@0@@CODEMASK@@\n",
  );
  const violations = verifyBundle(dir, path.join(dir, "no-mcp"));
  assert.ok(violations.some((v) => /placeholder/.test(v.message)));
});

test("verifyBundle passes a clean minimal bundle", () => {
  const dir = fixture();
  fs.mkdirSync(path.join(dir, "react", "components"), { recursive: true });
  fs.writeFileSync(path.join(dir, "react", "index.md"), "# Index\n");
  fs.writeFileSync(
    path.join(dir, "react", "components", "ok.md"),
    "---\nid: ok\n---\n\n# OK\n\nClean prose.\n",
  );
  assert.deepEqual(verifyBundle(dir, path.join(dir, "no-mcp")), []);
});

test("verifyBundle flags a component-set mismatch in any framework, not just react", () => {
  const dir = fixture();
  const mcp = path.join(dir, "mcp");
  fs.mkdirSync(path.join(mcp, "components"), { recursive: true });
  fs.writeFileSync(path.join(mcp, "components", "a.json"), "{}");
  fs.writeFileSync(path.join(mcp, "components", "b.json"), "{}");
  // react and web-components match the MCP; angular is missing a component.
  for (const fw of ["react", "web-components"]) {
    fs.mkdirSync(path.join(dir, fw, "components"), { recursive: true });
    fs.writeFileSync(path.join(dir, fw, "components", "a.md"), "---\nid: a\n---\n\n# A\n");
    fs.writeFileSync(path.join(dir, fw, "components", "b.md"), "---\nid: b\n---\n\n# B\n");
  }
  fs.mkdirSync(path.join(dir, "angular", "components"), { recursive: true });
  fs.writeFileSync(path.join(dir, "angular", "components", "a.md"), "---\nid: a\n---\n\n# A\n");

  const violations = verifyBundle(dir, mcp);
  assert.ok(
    violations.some((v) => /angular/.test(v.file)),
    "should flag the angular set diverging from the MCP",
  );
});

test("verifyBundle flags frontmatter that is present but not valid YAML", () => {
  const dir = fixture();
  fs.mkdirSync(path.join(dir, "react", "components"), { recursive: true });
  // Frontmatter is shaped (open/close ---) but the value has an unterminated
  // quote, so a real parser rejects it. Shape-checking alone would miss this.
  fs.writeFileSync(
    path.join(dir, "react", "components", "bad.md"),
    '---\nname: "oops\n---\n\n# Bad\n\nClean prose.\n',
  );
  const violations = verifyBundle(dir, path.join(dir, "no-mcp"));
  assert.ok(
    violations.some((v) => /YAML/.test(v.message)),
    "should flag invalid YAML frontmatter, not just confirm it is present",
  );
});

test("verifyBundle flags an unterminated code fence", () => {
  const dir = fixture();
  fs.mkdirSync(path.join(dir, "react", "components"), { recursive: true });
  // An opening fence with no close: the code mask needs a closing fence, so the
  // contents would be stripped, and the scanner would otherwise treat the rest
  // of the file as code and silently stop checking it.
  fs.writeFileSync(
    path.join(dir, "react", "components", "stray.md"),
    "---\nid: stray\n---\n\n# Stray\n\n```js\nconst x = 1;\n",
  );
  const violations = verifyBundle(dir, path.join(dir, "no-mcp"));
  assert.ok(
    violations.some((v) => /unterminated/.test(v.message)),
    "should flag the unterminated fence rather than silently stop checking",
  );
});
