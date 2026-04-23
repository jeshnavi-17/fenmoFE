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
    expenses,
    loading,
    error,
    categoryFilter,
    setCategoryFilter,
    sortDateDesc,
    setSortDateDesc,
    categories,
    total,
    categorySummary,
    isSubmitting,
    submitError,
    addExpense,
    refetch,
  } = useExpenses()

  return (
    <div className="min-vh-100">
      {/* ── Navbar ── */}
      <nav className="navbar navbar-dark shadow-sm mb-4" style={{ background: 'var(--fenmo-primary)' }}>
        <div className="container">
          <span className="navbar-brand fw-bold fs-4 mb-0">
            <i className="bi bi-wallet2 me-2"></i>
            Fenmo <span className="fw-light opacity-75">Expense Tracker</span>
          </span>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="container pb-5">
        {/* Add Expense Form */}
        <ExpenseForm
          onSubmit={addExpense}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />

        {/* Category Summary (nice-to-have) */}
        {!categoryFilter && categorySummary.length > 0 && (
          <CategorySummary summary={categorySummary} grandTotal={total} />
        )}

        {/* Filter Controls */}
        <FilterBar
          categories={categories}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          sortDateDesc={sortDateDesc}
          onSortToggle={() => setSortDateDesc((prev) => !prev)}
          totalCount={expenses.length}
        />

        {/* Total Amount */}
        <TotalAmount total={total} categoryFilter={categoryFilter} />

        {/* Expense List */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBanner message={error} onRetry={refetch} />
        ) : (
          <ExpenseList expenses={expenses} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="text-center text-muted small py-3 border-top">
        Fenmo &copy; {new Date().getFullYear()} &mdash; Expense Tracker
      </footer>
    </div>
  )
}
