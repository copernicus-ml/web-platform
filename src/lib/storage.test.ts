import { beforeEach, describe, it, expect } from "vitest";
import { addSearchHistory, maxRecords, readLastSearch } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns undefined when no history", () => {
    expect(readLastSearch()).toBeUndefined();
  });

  it("stores and retrieves one record", () => {
    addSearchHistory("AAPL", "60D", "pricemomentum");
    const record = readLastSearch();
    expect(record).not.toBeUndefined();
    expect([record?.ticker, record?.window, record?.group]).toEqual([
      "AAPL",
      "60D",
      "pricemomentum",
    ]);
    expect(readLastSearch()).toBeUndefined();
  });

  it("keeps one record per ticker, and move a repeated one to the end", () => {
    addSearchHistory("AAPL", "60D", "pricemomentum");
    addSearchHistory("MSFT", "1Y", "kdj");
    addSearchHistory("AAPL", "1Y", "pricemomentum");
    expect(Object.values(readLastSearch()!)).toEqual(["AAPL", "1Y", "pricemomentum"]);
    expect(Object.values(readLastSearch()!)).toEqual(["MSFT", "1Y", "kdj"]);
  });

  it("keeps the record size controlled", () => {
    for (let i = 0; i < maxRecords + 5; i++) {
      addSearchHistory(String(i), "1Y", "bollingerbands");
    }
    for (let i = 0; i < maxRecords; i++) {
      readLastSearch();
    }
    expect(readLastSearch()).toBeUndefined();
  });
});
