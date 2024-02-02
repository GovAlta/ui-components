import { getTimestamp } from "./utils";
import { it, describe } from "vitest";

describe("getTimestamp", () => {
  it("sets the correct postfix", () => {
    const vals = {
      1: "1st",
      2: "2nd",
      3: "3rd",
      4: "4th",
      5: "5th",
      6: "6th",
      7: "7th",
      8: "8th",
      9: "9th",
      10: "10th",
      11: "11th",
      12: "12th",
      13: "13th",
      14: "14th",
      15: "15th",
      16: "16th",
      17: "17th",
      18: "18th",
      19: "19th",
      20: "20th",
      21: "21st",
      22: "22nd",
      23: "23rd",
      24: "24th",
      25: "25th",
      26: "26th",
      27: "27th",
      28: "28th",
      29: "29th",
      30: "30th",
      31: "31st",
    }

    for (const [day, val] of Object.entries(vals)) {
      const d = new Date(2023, 2, parseInt(day, 10))
      expect(getTimestamp(d)).toContain(val)
    }
  })

  it("handles the 12th hour", () => {
    expect(getTimestamp(new Date(2023, 1, 1, 12, 23))).toContain("12:23 PM")
    expect(getTimestamp(new Date(2023, 1, 1, 0, 23))).toContain("12:23 AM")
  })
})
