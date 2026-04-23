const BASE_URL = "https://fenmobe-production.up.railway.app/expenses";

const generateKey = () => crypto.randomUUID();

export async function getExpenses({ category = "", page = 0, size = 5, sort } = {}) {
  const params = new URLSearchParams({ page, size });

  if (sort) params.append("sort", sort);
  if (category) params.append("category", category);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch expenses");

  return await res.json();
}

export async function addExpense(expense) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": generateKey(),
    },
    body: JSON.stringify({
      ...expense,
      amount: Number(expense.amount),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    if (err.error) throw new Error(err.error);
    throw new Error(Object.values(err).join(", "));
  }

  return await res.json();
}

export async function getCategorySummary() {
  const res = await fetch(`${BASE_URL}/summary`);

  if (!res.ok) throw new Error("Failed to fetch summary");

  return await res.json();
}