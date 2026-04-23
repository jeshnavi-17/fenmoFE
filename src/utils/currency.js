/**
 * Format a number as Indian Rupees (₹) using the Indian numbering system.
 * e.g. 1200 → "₹1,200.00", 100000 → "₹1,00,000.00"
 */
export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0)
