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

test("verifyBundle catches raw inline-formatting tags leaking outside fences", () => {
  // The tag list previously stopped at block-level tags, so a raw inline tag (an
  // anchor, or bold/italic that should have become Markdown) could leak
  // unflagged. Each of these is a real leak the verifier must catch.
  for (const tag of ["a", "b", "i", "em", "strong", "code", "blockquote", "hr"]) {
    const dir = fixture();
    fs.mkdirSync(path.join(dir, "react", "components"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, "react", "components", "bad.md"),
      `---\nid: bad\n---\n\n# Bad\n\nSome <${tag}>leaked</${tag}> text.\n`,
    );
    const violations = verifyBundle(dir, path.join(dir, "no-mcp"));
    assert.ok(
      violations.some((v) => /raw tag/.test(v.message)),
      `should flag a raw <${tag}> outside a code fence`,
    );
  }
});

test("verifyBundle expects React and Angular to omit web-component-only components", () => {
  const dir = fixture();
  const mcp = path.join(dir, "mcp");
  fs.mkdirSync(path.join(mcp, "components"), { recursive: true });
  fs.writeFileSync(path.join(mcp, "components", "button.json"), "{}");
  fs.writeFileSync(path.join(mcp, "components", "focus-trap.json"), "{}");
  // web-components carries the full MCP set; react and angular correctly omit
  // the web-component-only focus-trap.
  fs.mkdirSync(path.join(dir, "web-components", "components"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "web-components", "components", "button.md"),
    "---\nid: button\n---\n\n# Button\n",
  );
  fs.writeFileSync(
    path.join(dir, "web-components", "components", "focus-trap.md"),
    "---\nid: focus-trap\n---\n\n# Focus Trap\n",
  );
  for (const fw of ["react", "angular"]) {
    fs.mkdirSync(path.join(dir, fw, "components"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, fw, "components", "button.md"),
      "---\nid: button\n---\n\n# Button\n",
    );
  }
  assert.deepEqual(
    verifyBundle(dir, mcp),
    [],
    "omitting a web-component-only component from React/Angular is expected, not a divergence",
  );
});
