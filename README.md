# Fenmo — Expense Tracker (Frontend)

A React + Vite frontend for the Fenmo Expense Tracker API.

## Features

- **Add expenses** via a validated form (amount, category, description, date)
- **Filter** by category — re-fetches from the API with `?category=X`
- **Sort by date** (newest first) via `?sort=date_desc`
- **Total amount** of currently visible expenses
- **Category summary** breakdown (total per category with %)
- **Loading** and **error** states with retry support
- **Duplicate submit protection** — button disabled while request is in flight

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Backend API running (see backend README)

### Configure API URL

Copy `.env` and set your backend URL:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Install & Run

```bash
npm install
npm run dev
```

App runs at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Bundler | Vite |
| UI | Bootstrap 5 + Bootstrap Icons |
| HTTP | Native `fetch` |
| State | `useState` / `useEffect` / custom hook |

## Project Structure

```
src/
├── api/expenses.js          # GET /expenses, POST /expenses
├── hooks/useExpenses.js     # All async logic + derived state
├── components/
│   ├── ExpenseForm.jsx      # Add expense form with validation
│   ├── ExpenseList.jsx      # Expense table
│   ├── FilterBar.jsx        # Category filter dropdown
│   ├── TotalAmount.jsx      # Running total display
│   ├── CategorySummary.jsx  # Per-category breakdown
│   ├── LoadingSpinner.jsx   # Loading state
│   └── ErrorBanner.jsx      # Error state with retry
└── App.jsx                  # Root layout
```
