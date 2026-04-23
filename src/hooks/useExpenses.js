import { useState, useEffect, useMemo, useCallback } from 'react'
import { getExpenses, addExpense as apiAddExpense } from '../api/expenses'

/**
 * Custom hook that manages all expense state and API interactions.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortDateDesc, setSortDateDesc] = useState(true)   // true = newest first
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Fetch expenses whenever the category filter changes
  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getExpenses({ category: categoryFilter, sortDateDesc })
      setExpenses(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [categoryFilter, sortDateDesc])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  // Unique categories derived from full expense list (for the filter dropdown)
  const categories = useMemo(() => {
    const all = expenses.map((e) => e.category).filter(Boolean)
    return [...new Set(all)].sort()
  }, [expenses])

  // Total of currently displayed expenses
  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  }, [expenses])

  // Per-category summary
  const categorySummary = useMemo(() => {
    const map = {}
    for (const e of expenses) {
      const cat = e.category || 'Uncategorized'
      map[cat] = (map[cat] || 0) + Number(e.amount)
    }
    return Object.entries(map)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  // Add a new expense via API then re-fetch
  const addExpense = useCallback(
    async (formData) => {
      setIsSubmitting(true)
      setSubmitError(null)
      try {
        await apiAddExpense(formData)
        // Re-fetch to get the latest list (including the new entry from the server)
        await fetchExpenses()
        return true // success
      } catch (err) {
        setSubmitError(err.message)
        return false // failure
      } finally {
        setIsSubmitting(false)
      }
    },
    [fetchExpenses],
  )

  return {
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
    refetch: fetchExpenses,
  }
}
