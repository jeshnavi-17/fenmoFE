import { formatINR } from '../utils/currency'

/**
 * Displays the total amount of currently visible expenses.
 * Props:
 *   total: number
 *   categoryFilter: string
 */
export default function TotalAmount({ total, categoryFilter }) {
  const label = categoryFilter ? `Total for "${categoryFilter}"` : 'Total (all visible)'

  return (
    <div className="d-flex align-items-center justify-content-between mb-3 px-1">
      <span className="text-muted small">
        <i className="bi bi-calculator-fill me-1"></i>
        {label}
      </span>
      <span id="total-amount" className="badge total-badge rounded-pill fs-6 px-3 py-2">
        {formatINR(total)}
      </span>
    </div>
  )
}
