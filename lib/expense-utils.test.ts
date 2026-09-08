import { describe, expect, it } from "vitest";
import {
  calculateTotal,
  isValidDraft,
  nextExpenseId,
  parseStoredExpenses,
  type Expense,
} from "./expense-utils";

const expense = (id: number, amount = 100): Expense => ({
  id,
  name: `Item ${id}`,
  amount,
  date: new Date("2024-06-01"),
});

describe("nextExpenseId", () => {
  it("returns 1 for an empty list", () => {
    expect(nextExpenseId([])).toBe(1);
  });

  it("returns max(id) + 1 for a normal list", () => {
    expect(nextExpenseId([expense(1), expense(2), expense(3)])).toBe(4);
  });

  it("does not collide after a middle item is deleted (the original bug)", () => {
    // Original list [1,2,3,4], delete id 2 -> [1,3,4]. The old
    // `length + 1` logic would return 4, colliding with the existing id 4.
    const afterDelete = [expense(1), expense(3), expense(4)];
    expect(nextExpenseId(afterDelete)).toBe(5);
  });
});

describe("calculateTotal", () => {
  it("sums expense amounts", () => {
    expect(calculateTotal([expense(1, 100), expense(2, 250.5)])).toBe(350.5);
  });

  it("returns 0 for an empty list", () => {
    expect(calculateTotal([])).toBe(0);
  });
});

describe("isValidDraft", () => {
  const validDate = new Date("2024-06-01");

  it("accepts a well-formed draft", () => {
    expect(isValidDraft({ name: "Groceries", amount: "42.50", date: validDate })).toBe(true);
  });

  it("rejects a blank name", () => {
    expect(isValidDraft({ name: "  ", amount: "42.50", date: validDate })).toBe(false);
  });

  it("rejects a non-numeric amount", () => {
    expect(isValidDraft({ name: "Groceries", amount: "abc", date: validDate })).toBe(false);
  });

  it("rejects a zero or negative amount", () => {
    expect(isValidDraft({ name: "Groceries", amount: "0", date: validDate })).toBe(false);
    expect(isValidDraft({ name: "Groceries", amount: "-5", date: validDate })).toBe(false);
  });

  it("rejects an invalid date", () => {
    expect(isValidDraft({ name: "Groceries", amount: "10", date: new Date("not-a-date") })).toBe(false);
  });
});

describe("parseStoredExpenses", () => {
  it("parses a valid JSON array and revives dates", () => {
    const raw = JSON.stringify([{ id: 1, name: "Rent", amount: 300, date: "2024-06-01" }]);
    const result = parseStoredExpenses(raw);
    expect(result).not.toBeNull();
    expect(result![0].date).toBeInstanceOf(Date);
  });

  it("returns null for corrupt JSON instead of throwing", () => {
    expect(parseStoredExpenses("{not valid json")).toBeNull();
  });

  it("returns null for valid JSON that isn't an array", () => {
    expect(parseStoredExpenses(JSON.stringify({ not: "an array" }))).toBeNull();
  });
});
