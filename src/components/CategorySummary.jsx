import { formatINR } from '../utils/currency'

/**
 * Shows a breakdown of total spending per category.
 * Props:
 *   summary: { category: string, amount: number }[]
 *   grandTotal: number
 */

export default function CategorySummary({ summary, grandTotal }) {
  if (!summary || summary.length === 0) return null

  return (
    <div className="card p-4 mb-4">
      <h6 className="mb-3 fw-semibold">
        <i className="bi bi-pie-chart-fill text-primary me-2"></i>
        Spending by Category
      </h6>
      <div className="row g-2">
        {summary.map(({ category, amount }) => {
          const pct = grandTotal > 0 ? ((amount / grandTotal) * 100).toFixed(1) : 0
          return (
            <div className="col-sm-6 col-lg-4" key={category}>
              <div className="d-flex justify-content-between align-items-center small border rounded p-2 bg-light">
                <span className="fw-medium text-truncate me-2">{category}</span>
                <div className="text-end text-nowrap">
                  <span className="fw-semibold text-success">{formatINR(amount)}</span>
                  <span className="text-muted ms-1">({pct}%)</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
