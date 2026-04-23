import { useEffect, useState } from "react";
import { getCategorySummary } from "../api/expenses";

export default function CategorySummary() {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await getCategorySummary();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchSummary();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h3>Category Summary</h3>

      {summary.length === 0 ? (
        <p>No data available</p>
      ) : (
        summary.map((item, index) => (
          <div key={index}>
            <strong>{item.category}</strong> : ₹{item.total}
          </div>
        ))
      )}
    </div>
  );
}