import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" to="/expenses">
          Life After Work
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Expense Tracker
              </button>

              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                    to="/expenses"
                  >
                    Expenses
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                    to="/expenses/analysis"
                  >
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
      </div>
    </nav>
  );
}

export default Navbar;
