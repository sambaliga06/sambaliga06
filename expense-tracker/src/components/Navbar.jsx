import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/expenses">
          Life After Work
        </NavLink>

        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Expense Tracker
            </button>

            <ul className="dropdown-menu">
              <li>
                <NavLink className="dropdown-item" to="/expenses">
                  Expenses
                </NavLink>
              </li>

              <li>
                <NavLink className="dropdown-item" to="/expenses/analysis">
                  Analysis
                </NavLink>
              </li>
            </ul>
          </div>

          <NavLink className="nav-link" to="/time-tracker">
            Time Tracker
          </NavLink>

          <NavLink className="nav-link" to="/settings">
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;