import { useExpenses } from './hooks/useExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import FilterBar from './components/FilterBar'
import TotalAmount from './components/TotalAmount'
import CategorySummary from './components/CategorySummary'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBanner from './components/ErrorBanner'

export default function App() {
  const {
    expenses = [],
    loading,
    error,
    categoryFilter,
    setCategoryFilter,
    sortDateDesc,
    setSortDateDesc,
    categories = [],
    total = 0,
    categorySummary = [],
    isSubmitting,
    submitError,
    addExpense,
    refetch,
    page,
    setPage,
    totalPages,
  } = useExpenses()

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      {/* Header */}
      <div className="bg-white border-bottom mb-4">
        <div className="container py-3">
          <h3 className="mb-0 fw-semibold">Expense Tracker</h3>
        </div>
      </div>

      {/* Main Content */}
      <main className="container flex-grow-1">

        {/* Form */}
        <div className="mb-4">
          <ExpenseForm
            onSubmit={addExpense}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </div>

        {/* Summary */}
        {categorySummary?.length > 0 && (
          <div className="mb-4">
            <CategorySummary summary={categorySummary} grandTotal={total} />
          </div>
        )}

        {/* Filters */}
        <div className="mb-3">
          <FilterBar
            categories={categories}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortDateDesc={sortDateDesc}
            onSortToggle={() => setSortDateDesc((prev) => !prev)}
            totalCount={expenses.length}
          />
        </div>

        {/* Total */}
        <div className="mb-3">
          <TotalAmount total={total} categoryFilter={categoryFilter} />
        </div>

        {/* List */}
        <div className="bg-white border rounded p-3">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorBanner message={error} onRetry={refetch} />
          ) : (
            <ExpenseList expenses={expenses} />
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="text-muted small">
            Page {page + 1} of {totalPages || 1}
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page >= totalPages - 1 || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-top text-center py-3 mt-4">
        <small className="text-muted">
          © {new Date().getFullYear()} Expense Tracker
        </small>
      </footer>

    </div>
  )
}