function ExpenseFilter({ month, year, onMonthChange, onYearChange }) {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">
          Year
        </label>

        <select
          className="form-select"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Month
        </label>

        <select
          className="form-select"
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>
    </div>
  );
}

export default ExpenseFilter;

