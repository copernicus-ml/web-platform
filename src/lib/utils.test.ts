import { describe, expect, it } from "vitest";
import {
  cn,
  computePriceChange,
  digitToPercent,
  getMonthName,
  parseDate,
  parseVolume,
} from "./utils";

describe("utils", () => {
  it("merges conflicting Tailwind classes", () => {
    expect(cn("px-2", "px-4", "text-red-500")).toBe("px-4 text-red-500");
  });

  it("splits a trade date into year, month, and day", () => {
    expect(parseDate("20261027")).toEqual(["2026", "10", "27"]);
  });

  it("formats thousands and millions as volume strings", () => {
    expect(parseVolume(1_250)).toBe("1.25K");
    expect(parseVolume(1_250_000)).toBe("1.25M");
  });

  it("computes price changes and handles missing prices", () => {
    expect(computePriceChange(100, 110)).toBe("10.00%");
    expect(computePriceChange(undefined, 110)).toBe("0%");
  });

  it("returns a month abbreviation", () => {
    expect(getMonthName("10")).toBe("Oct");
  });

  it("formats decimal values as percentages", () => {
    expect(digitToPercent(0.1234)).toBe("12.34%");
    expect(digitToPercent(0.1234, 1)).toBe("12.3%");
  });
});
