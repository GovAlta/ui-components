import { extractProps } from "./extract-props";
import { describe, it, expect } from "vitest";

describe("extractProps", () => {
  describe("lowercase mode (default)", () => {
    it("should convert camelCase props to lowercase", () => {
      const props = {
        headingSize: "large",
        maxWidth: "500px",
        testId: "my-test",
      };

      const result = extractProps(props, {
        attributeMapping: "lowercase",
      });

      expect(result).toEqual({
        headingsize: "large",
        maxwidth: "500px",
        testid: "my-test",
      });
    });

    it("should exclude specified props", () => {
      const props = {
        headingSize: "large",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
        open: true,
      };

      const result = extractProps(props, {
        exclude: ["onChange", "open"],
        attributeMapping: "lowercase",
      });

      expect(result).toEqual({
        headingsize: "large",
      });
    });

    it("should always exclude children and ref", () => {
      const props = {
        headingSize: "large",
        children: "some content",
        ref: { current: null },
      };

      const result = extractProps(props, {
        attributeMapping: "lowercase",
      });

      expect(result).toEqual({
        headingsize: "large",
      });
    });

    it("should pass through data- props unchanged", () => {
      const props = {
        "data-grid": "cell",
        "data-grid-column": "name",
        headingSize: "large",
      };

      const result = extractProps(props, {
        attributeMapping: "lowercase",
      });

      expect(result).toEqual({
        "data-grid": "cell",
        "data-grid-column": "name",
        headingsize: "large",
      });
    });
  });

  describe("kebab mode", () => {
    it("should convert camelCase props to kebab-case", () => {
      const props = {
        verticalPosition: "top",
        horizontalPosition: "center",
      };

      const result = extractProps(props, {
        attributeMapping: "kebab",
      });

      expect(result).toEqual({
        "vertical-position": "top",
        "horizontal-position": "center",
      });
    });

    it("should handle testId specially - must be excluded for kebab mode", () => {
      const props = {
        verticalPosition: "top",
        testId: "my-test",
      };

      // In kebab mode, testId would become test-id, but we want testid
      // So it should be excluded and handled manually
      const result = extractProps(props, {
        exclude: ["testId"],
        attributeMapping: "kebab",
      });

      expect(result).toEqual({
        "vertical-position": "top",
      });
      // testId is excluded and should be set manually as testid={props.testId}
    });

    it("should pass through data- props unchanged in kebab mode", () => {
      const props = {
        "data-grid": "cell",
        verticalPosition: "top",
      };

      const result = extractProps(props, {
        attributeMapping: "kebab",
      });

      expect(result).toEqual({
        "data-grid": "cell",
        "vertical-position": "top",
      });
    });
  });

  describe("edge cases", () => {
    it("should handle empty props object", () => {
      const result = extractProps({}, { attributeMapping: "lowercase" });
      expect(result).toEqual({});
    });

    it("should skip props with undefined values", () => {
      const props = {
        headingSize: undefined,
        maxWidth: "500px",
      };

      const result = extractProps(props, {
        attributeMapping: "lowercase",
      });

      expect(result).toEqual({
        maxwidth: "500px",
      });
    });

    it("should handle props with null values", () => {
      const props = {
        headingSize: null,
        maxWidth: "500px",
      };

      const result = extractProps(props, {
        attributeMapping: "lowercase",
      });

      expect(result).toEqual({
        headingsize: null,
        maxwidth: "500px",
      });
    });

    it("should use lowercase as default when no attributeMapping specified", () => {
      const props = {
        headingSize: "large",
      };

      const result = extractProps(props, {});

      expect(result).toEqual({
        headingsize: "large",
      });
    });
  });
});
