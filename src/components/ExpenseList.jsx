import { formatINR } from '../utils/currency'

const CATEGORY_COLORS = {
  Food: 'success',
  Transport: 'info',
  Housing: 'warning',
  Entertainment: 'danger',
  Healthcare: 'primary',
  Shopping: 'secondary',
  Education: 'dark',
  Other: 'light',
}


function getCategoryBadgeClass(category) {
  const color = CATEGORY_COLORS[category] || 'secondary'
  return `badge badge-category bg-${color}${color === 'light' ? ' text-dark' : ''}`
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/**
 * Table of expenses.
 * Props:
 *   expenses: array
 */
export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="card p-5 text-center text-muted">
        <i className="bi bi-inbox display-4 mb-3 text-secondary"></i>
        <p className="mb-0">No expenses found. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover expense-table mb-0" id="expense-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col" className="text-end">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="text-muted small align-middle">{formatDate(expense.date)}</td>
                <td className="align-middle">
                  <span className={getCategoryBadgeClass(expense.category)}>
                    {expense.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="align-middle">
                  {expense.description || <span className="text-muted fst-italic">No description</span>}
                </td>
                <td className="text-end align-middle amount-cell">
                  {formatINR(expense.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
