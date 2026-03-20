import { transformProps, lowercase, kebab } from "./extract-props";
import { describe, it, expect } from "vitest";

describe("transformProps", () => {
  describe("lowercase transform", () => {
    it("should convert camelCase props to lowercase", () => {
      const props = {
        headingSize: "large",
        maxWidth: "500px",
        testId: "my-test",
      };

      const result = transformProps(props, lowercase);

      expect(result).toEqual({
        headingsize: "large",
        maxwidth: "500px",
        testid: "my-test",
      });
    });

    it("should pass through data- props unchanged", () => {
      const props = {
        "data-grid": "cell",
        "data-grid-column": "name",
        headingSize: "large",
      };

      const result = transformProps(props, lowercase);

      expect(result).toEqual({
        "data-grid": "cell",
        "data-grid-column": "name",
        headingsize: "large",
      });
    });
  });

  describe("kebab transform", () => {
    it("should convert camelCase props to kebab-case", () => {
      const props = {
        verticalPosition: "top",
        horizontalPosition: "center",
      };

      const result = transformProps(props, kebab);

      expect(result).toEqual({
        "vertical-position": "top",
        "horizontal-position": "center",
      });
    });

    it("should pass through data- props unchanged in kebab mode", () => {
      const props = {
        "data-grid": "cell",
        verticalPosition: "top",
      };

      const result = transformProps(props, kebab);

      expect(result).toEqual({
        "data-grid": "cell",
        "vertical-position": "top",
      });
    });
  });

  describe("edge cases", () => {
    it("should handle empty props object", () => {
      const result = transformProps({}, lowercase);
      expect(result).toEqual({});
    });

    it("should skip props with undefined values", () => {
      const props = {
        headingSize: undefined,
        maxWidth: "500px",
      };

      const result = transformProps(props, lowercase);

      expect(result).toEqual({
        maxwidth: "500px",
      });
    });

    it("should handle props with null values", () => {
      const props = {
        headingSize: null,
        maxWidth: "500px",
      };

      const result = transformProps(props, lowercase);

      expect(result).toEqual({
        headingsize: null,
        maxwidth: "500px",
      });
    });

    it("should use lowercase as default when no transform specified", () => {
      const props = {
        headingSize: "large",
      };

      const result = transformProps(props);

      expect(result).toEqual({
        headingsize: "large",
      });
    });
  });

  describe("destructuring pattern (recommended usage)", () => {
    it("should work with rest props after destructuring excluded props", () => {
      // Simulating the recommended pattern:
      // const { onChange, open, children, ...rest } = props;
      // const _props = transformProps(rest, lowercase);

      const originalProps = {
        headingSize: "large",
        onChange: () => {
          /* noop */
        },
        open: true,
        children: "some content",
      };

      // Destructure the props that need special handling
      const { onChange, open, children, ...rest } = originalProps;

      const result = transformProps(rest, lowercase);

      expect(result).toEqual({
        headingsize: "large",
      });
      // onChange, open, children are available separately
      expect(typeof onChange).toBe("function");
      expect(open).toBe(true);
      expect(children).toBe("some content");
    });
  });
});

describe("transform functions", () => {
  describe("lowercase", () => {
    it("should convert string to lowercase", () => {
      expect(lowercase("HeadingSize")).toBe("headingsize");
      expect(lowercase("maxWidth")).toBe("maxwidth");
      expect(lowercase("testId")).toBe("testid");
    });
  });

  describe("kebab", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(kebab("verticalPosition")).toBe("vertical-position");
      expect(kebab("horizontalPosition")).toBe("horizontal-position");
      expect(kebab("maxWidth")).toBe("max-width");
      expect(kebab("testId")).toBe("test-id");
    });
  });
});
