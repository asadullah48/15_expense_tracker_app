// Pure, framework-free expense logic — id generation, validation, and
// persistence parsing — split out of components/expense-tracker.tsx so it
// can be unit tested without rendering React or touching real localStorage.

export type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
};

/**
 * Next unique id for a new expense. The previous implementation used
 * `expenses.length + 1`, which collides after any delete: e.g. delete
 * item #2 from a 4-item list (length becomes 3), add one -> id 4, which
 * already belongs to item #4. Using max(existing ids) + 1 is collision-free
 * regardless of delete order.
 */
export function nextExpenseId(expenses: Expense[]): number {
  if (expenses.length === 0) return 1;
  return Math.max(...expenses.map((e) => e.id)) + 1;
}

export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export interface ExpenseDraft {
  name: string;
  amount: string;
  date: Date;
}

/** True when a draft has everything needed to become a real Expense. */
export function isValidDraft(draft: ExpenseDraft): boolean {
  const amount = parseFloat(draft.amount);
  return (
    draft.name.trim().length > 0 &&
    Number.isFinite(amount) &&
    amount > 0 &&
    !Number.isNaN(draft.date.getTime())
  );
}

/**
 * Parse the JSON blob read from localStorage back into Expense[], reviving
 * date strings into Date objects. Returns null (rather than throwing) for
 * anything that isn't valid JSON or isn't shaped like an expense list, so a
 * corrupted/tampered localStorage value degrades to "no saved data" instead
 * of crashing the app on load.
 */
export function parseStoredExpenses(raw: string): Expense[] | null {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.map((expense: Expense) => ({
      ...expense,
      date: new Date(expense.date),
    }));
  } catch {
    return null;
  }
}
