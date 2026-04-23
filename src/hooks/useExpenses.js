import { useEffect, useState } from "react";
import { getExpenses, getCategorySummary, addExpense } from "../api/expenses";

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortDateDesc, setSortDateDesc] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getExpenses({
        category: categoryFilter,
        page,
        sort: `date,${sortDateDesc ? "desc" : "asc"}`,
      });

      const content = data.content || [];

      setExpenses(content);
      setTotalPages(data.totalPages || 0);

      if (page >= data.totalPages && data.totalPages > 0) {
        setPage(data.totalPages - 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await getCategorySummary();
      setCategorySummary(data || []);

      const cats = data.map((item) => item.category);
      setCategories(cats);

      if (!categoryFilter) {
        const grandTotal = data.reduce((sum, item) => sum + item.total, 0);
        setTotal(grandTotal);
      } else {
        const selected = data.find(
          (item) => item.category === categoryFilter
        );
        setTotal(selected ? selected.total : 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await addExpense(expense);

      setPage(0);

      // ✅ sequential refresh (correct fix)
      await fetchExpenses();
      await fetchSummary();

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [categoryFilter, page, sortDateDesc]);

  useEffect(() => {
    fetchSummary();
  }, [categoryFilter]);

  useEffect(() => {
    setPage(0);
  }, [categoryFilter, sortDateDesc]);

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
    addExpense: handleAddExpense,
    refetch: fetchExpenses,
    page,
    setPage,
    totalPages,
  };
}