import { useState } from "react";

function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) {
  const [error, setError] = useState("");

function handleStartDateChange(value) {
  if (endDate && value > endDate) {
    setError("Start date cannot be after end date.");
    return;
  }

  setError("");
  onStartDateChange(value);
}

function handleEndDateChange(value) {
  if (startDate && value < startDate) {
    setError("End date cannot be before start date.");
    return;
  }

  setError("");
  onEndDateChange(value);
}

  function handleClear() {
    setError("");
    onStartDateChange("");
    onEndDateChange("");
  }

  return (
    <div>
      <label>
        From:
        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            handleStartDateChange(e.target.value)
          }
        />
      </label>

      <label>
        To:
        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            handleEndDateChange(e.target.value)
          }
        />
      </label>

      <button onClick={handleClear}>
        Clear Dates
      </button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default DateRangeFilter;