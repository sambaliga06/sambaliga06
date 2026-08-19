import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function ExpensePieChart({ data }) {
  if (data.length === 0) {
    return <p>No expenses for this period.</p>;
  }

  const renderLabel = ({ category, percent }) =>
    `${category} ${(percent * 100).toFixed(1)}%`;

  const COLORS = [  "#0d6efd",  "#198754",  "#ecb81e",  "#dc3545",  "#583698",  "#fd7e14",  "#34e2ae",  "#2ad1f3"];

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="45%"
            outerRadius="65%"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip            formatter={(value) => [`₹${value}`, "Amount"]}          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;