import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Other']

const DEFAULT_FORM = { amount: '', category: '', description: '', date: '' }

/**
 * Controlled form for adding a new expense.
 * Props:
 *   onSubmit(formData) -> Promise<boolean>
 *   isSubmitting: boolean
 *   submitError: string | null
 */
export default function ExpenseForm({ onSubmit, isSubmitting, submitError }) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})

  function validate(f) {
    const errs = {}
    if (!f.amount || isNaN(Number(f.amount)) || Number(f.amount) <= 0)
      errs.amount = 'Amount must be a positive number.'
    if (!f.category) errs.category = 'Please select a category.'
    if (!f.date) errs.date = 'Date is required.'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const payload = {
      amount: parseFloat(Number(form.amount).toFixed(2)),
      category: form.category,
      description: form.description.trim(),
      date: form.date,
    }
    const success = await onSubmit(payload)
    if (success) {
      setForm(DEFAULT_FORM)
      setErrors({})
    }
  }

  return (
    <div className="card p-4 mb-4">
      <h5 className="mb-3 fw-semibold">
        <i className="bi bi-plus-circle-fill text-primary me-2"></i>
        Add New Expense
      </h5>

      {submitError && (
        <div className="alert alert-danger py-2" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate id="add-expense-form">
        <div className="row g-3">
          {/* Amount */}
          <div className="col-sm-6 col-md-3">
            <label htmlFor="amount" className="form-label fw-medium">
              Amount (₹)
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                placeholder="0.00"
                value={form.amount}
                onChange={handleChange}
              />
              {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>
          </div>

          {/* Category */}
          <div className="col-sm-6 col-md-3">
            <label htmlFor="category" className="form-label fw-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>

          {/* Date */}
          <div className="col-sm-6 col-md-3">
            <label htmlFor="date" className="form-label fw-medium">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>

          {/* Description */}
          <div className="col-sm-6 col-md-3">
            <label htmlFor="description" className="form-label fw-medium">
              Description <span className="text-muted fw-normal">(optional)</span>
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="form-control"
              placeholder="e.g. Lunch with client"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <button
            id="submit-expense-btn"
            type="submit"
            className="btn btn-primary px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving…
              </>
            ) : (
              <>
                <i className="bi bi-check2-circle me-2"></i>
                Add Expense
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
