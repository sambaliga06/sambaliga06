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
      <div className="row g-3">
        <div className="col-md-5">
          <label className="form-label">
            From
          </label>

          <input   type="date" className="form-control"   value={startDate}   onChange={(e) =>    handleStartDateChange(e.target.value)  } />
        </div>

        <div className="col-md-5">
          <label className="form-label">
            To
          </label>

          <input type="date"  className="form-control" value={endDate}  onChange={(e) =>  handleEndDateChange(e.target.value)   }  />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button   type="button"  className="btn btn-outline-secondary w-100" onClick={handleClear}     >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default DateRangeFilter;