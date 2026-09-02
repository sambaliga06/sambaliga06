import { useState } from "react";

function ExpenseCalendar({ expenses })  {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  function getExpensesForDay(day) {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getFullYear() === year &&
      expenseDate.getMonth() === month &&
      expenseDate.getDate() === day
    );
  });
}
//const selectedExpenses = selectedDay  ? getExpensesForDay(selectedDay)  : [];

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
    setSelectedDay(null);
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
    setSelectedDay(null);
  }

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="card shadow-sm w-100">
      <div className="card-body ">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-outline-secondary"
            onClick={goToPreviousMonth}
          >
            ‹
          </button>

          <h5 className="mb-0">
            {monthName} {year}
          </h5>

          <button
            className="btn btn-outline-secondary"
            onClick={goToNextMonth}
          >
            ›
          </button>
        </div>

        <div className="calendar-grid text-center fw-semibold mb-2" >
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="calendar-grid text-center">
          {calendarDays.map((day, index) => (
            <div key={index}>
  {day && (() => {
    const dayExpenses = getExpensesForDay(day);

    const total = dayExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return (
      <div>
        <button type="button" className={`border rounded p-1 p-sm-2 w-100 bg-white text-start ${total > 0 ? "border-success" : ""} ${selectedDay === day ? "border-primary border-2" : ""}`} onClick={() => setSelectedDay(day)}>
          <div className="fw-semibold">
            {day}
          </div>

          {total > 0 && (
            <div className="text-success small fw-semibold mt-1">
              ₹{total}
            </div>
          )}
        </button>

        {selectedDay === day && dayExpenses.length > 0 && (
          <div className="calendar-expenses mt-1">
            {dayExpenses.map((expense) => (
              <div className="card shadow-sm mb-1" key={expense._id}>
                <div className="card-body p-2">
                  <div className="small fw-semibold">
                    {expense.category}   ₹{expense.amount}
                  </div>


                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );

            })()}
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

export default ExpenseCalendar;