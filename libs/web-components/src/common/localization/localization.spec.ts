import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  normalizeLanguage,
  resolveLanguage,
} from ".";

afterEach(() => {
  document.documentElement.removeAttribute("lang");
  document.body.innerHTML = "";
});

describe("normalizeLanguage", () => {
  it("matches supported languages without regard to case", () => {
    expect(normalizeLanguage("FR-ca")).toBe("fr-CA");
  });

  it("uses en-CA when a language is not supported", () => {
    expect(normalizeLanguage("fr-FR")).toBe(DEFAULT_LANGUAGE);
  });
});

describe("resolveLanguage", () => {
  it("uses en-CA when no language is supplied", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    expect(resolveLanguage(element)).toBe("en-CA");
  });

  it("uses the document language", () => {
    document.documentElement.lang = "fr-CA";
    const element = document.createElement("div");
    document.body.appendChild(element);

    expect(resolveLanguage(element)).toBe("fr-CA");
  });

  it("uses the nearest non-empty language", () => {
    document.documentElement.lang = "en-CA";
    const parent = document.createElement("section");
    parent.lang = "fr-CA";
    const child = document.createElement("div");
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(resolveLanguage(child)).toBe("fr-CA");
  });

  it("skips empty language attributes", () => {
    document.documentElement.lang = "fr-CA";
    const parent = document.createElement("section");
    parent.setAttribute("lang", "");
    const child = document.createElement("div");
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(resolveLanguage(child)).toBe("fr-CA");
  });

  it("uses en-CA when the nearest language is unsupported", () => {
    document.documentElement.lang = "fr-CA";
    const parent = document.createElement("section");
    parent.lang = "fr-FR";
    const child = document.createElement("div");
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(resolveLanguage(child)).toBe("en-CA");
  });

  it("crosses shadow root boundaries", () => {
    const parent = document.createElement("section");
    parent.lang = "fr-CA";
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });
    const child = document.createElement("div");
    shadowRoot.appendChild(child);
    parent.appendChild(host);
    document.body.appendChild(parent);

    expect(resolveLanguage(child)).toBe("fr-CA");
  });

  it("starts the language search outside nested shadow roots", () => {
    const parent = document.createElement("section");
    parent.lang = "fr-CA";
    const outerHost = document.createElement("div");
    const outerShadowRoot = outerHost.attachShadow({ mode: "open" });
    const innerHost = document.createElement("div");
    const innerShadowRoot = innerHost.attachShadow({ mode: "open" });
    const child = document.createElement("div");
    child.lang = "en-CA";
    innerShadowRoot.appendChild(child);
    outerShadowRoot.appendChild(innerHost);
    parent.appendChild(outerHost);
    document.body.appendChild(parent);

    expect(resolveLanguage(child)).toBe("fr-CA");
  });
});

describe("translations", () => {
  it("returns messages for the resolved language", () => {
    document.documentElement.lang = "fr-CA";

    expect(getTranslations().calendar.month).toBe("Mois");
  });
});
