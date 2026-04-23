// ─────────────────────────────────────────────────────────────
// MOCK API  —  swap this file out for the real fetch version
//              once the backend is running.
// ─────────────────────────────────────────────────────────────

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

let _idCounter = 100

// In-memory store pre-seeded with realistic sample data
let _store = [
  {
    id: '1',
    amount: 3500,
    category: 'Food',
    description: 'Grocery run — D-Mart',
    date: '2026-04-22',
    created_at: '2026-04-22T08:10:00Z',
  },
  {
    id: '2',
    amount: 250,
    category: 'Transport',
    description: 'Ola cab to office',
    date: '2026-04-21',
    created_at: '2026-04-21T09:00:00Z',
  },
  {
    id: '3',
    amount: 18000,
    category: 'Housing',
    description: 'April rent',
    date: '2026-04-01',
    created_at: '2026-04-01T10:00:00Z',
  },
  {
    id: '4',
    amount: 649,
    category: 'Entertainment',
    description: 'Netflix + Spotify subscriptions',
    date: '2026-04-15',
    created_at: '2026-04-15T12:00:00Z',
  },
  {
    id: '5',
    amount: 1200,
    category: 'Healthcare',
    description: 'Pharmacy — prescription refill',
    date: '2026-04-18',
    created_at: '2026-04-18T14:30:00Z',
  },
  {
    id: '6',
    amount: 899,
    category: 'Shopping',
    description: 'Flipkart — USB-C cables',
    date: '2026-04-20',
    created_at: '2026-04-20T16:00:00Z',
  },
  {
    id: '7',
    amount: 180,
    category: 'Food',
    description: 'Chai & samosa',
    date: '2026-04-23',
    created_at: '2026-04-23T07:45:00Z',
  },
  {
    id: '8',
    amount: 2999,
    category: 'Education',
    description: 'Udemy course — React Advanced',
    date: '2026-04-10',
    created_at: '2026-04-10T11:00:00Z',
  },
]

/**
 * Mock: GET /expenses
 * Supports ?category= and ?sort=date_desc
 */
export async function getExpenses({ category = '', sortDateDesc = true } = {}) {
  await delay(500) // simulate network latency

  let results = [..._store]

  if (category) {
    results = results.filter((e) => e.category === category)
  }

  if (sortDateDesc) {
    results.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return results
}

/**
 * Mock: POST /expenses
 * Appends to the in-memory store and returns the created record.
 */
export async function addExpense(data) {
  await delay(600) // simulate network latency

  // Uncomment to test error handling:
  // throw new Error('Simulated server error')

  const newExpense = {
    id: String(++_idCounter),
    amount: data.amount,
    category: data.category,
    description: data.description || '',
    date: data.date,
    created_at: new Date().toISOString(),
  }

  _store = [newExpense, ..._store]
  return newExpense
}
