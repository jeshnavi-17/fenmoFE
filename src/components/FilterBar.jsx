/**
 * Category filter dropdown + clickable sort order toggle.
 * Props:
 *   categories: string[]
 *   categoryFilter: string
 *   onCategoryChange(value: string): void
 *   sortDateDesc: boolean
 *   onSortToggle(): void
 *   totalCount: number
 */
export default function FilterBar({
  categories,
  categoryFilter,
  onCategoryChange,
  sortDateDesc,
  onSortToggle,
  totalCount,
}) {
  return (
    <div className="card p-3 mb-4">
      <div className="row align-items-center g-2">
        {/* Category filter */}
        <div className="col-auto">
          <i className="bi bi-funnel-fill text-primary me-1"></i>
          <span className="fw-semibold me-2">Filter:</span>
        </div>

        <div className="col-sm-auto">
          <select
            id="category-filter"
            className="form-select form-select-sm"
            style={{ minWidth: '160px' }}
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sort toggle */}
        <div className="col-auto ms-auto">
          <button
            id="sort-toggle-btn"
            type="button"
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
            onClick={onSortToggle}
            title="Toggle sort order"
          >
            <i className={`bi ${sortDateDesc ? 'bi-sort-down' : 'bi-sort-up'}`}></i>
            <span>
              Date:{' '}
              <span className="fw-semibold">
                {sortDateDesc ? 'Newest first' : 'Oldest first'}
              </span>
            </span>
          </button>
        </div>

        {/* Count */}
        <div className="col-auto text-muted small">
          <span className="fw-semibold text-dark">{totalCount}</span>{' '}
          {totalCount === 1 ? 'expense' : 'expenses'}
        </div>
      </div>
    </div>
  )
}
