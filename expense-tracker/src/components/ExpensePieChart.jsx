import {
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

  return (
    <PieChart width={500} height={350}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={renderLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Pie>

      <Tooltip
        formatter={(value) => [`₹${value}`, "Amount"]}
      />

      <Legend />
    </PieChart>
  );
}

export default ExpensePieChart;