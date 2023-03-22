import "@testing-library/jest-dom";

import { toArray } from "./utils";

describe("Utils", () => {
  describe("toArray", () => {
    it("should convert a string to an array", () => {
      const val = toArray("a,b,c");
      expect(val).toEqual(["a", "b", "c"]);
    });

    it("should return an empty array if no string is provided", () => {
      const val = toArray(null);
      expect(val).toEqual([]);
    });

    it("should trim whitespace from the array", () => {
      const val = toArray(" a, b , c ");
      expect(val).toEqual(["a", "b", "c"]);
    });
  });
});