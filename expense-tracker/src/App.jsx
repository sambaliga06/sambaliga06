import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ExpensesPage from "./pages/ExpensesPage";
import AnalysisPage from "./pages/AnalysisPage";
import TimeTrackerPage from "./pages/TimeTrackerPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <>
      <Layout>
  <Routes>
    <Route path="/" element={<Navigate to="/expenses" replace />} />
    <Route path="/expenses" element={<ExpensesPage />} />
    <Route path="/expenses/analysis" element={<AnalysisPage />} />
    <Route path="/time-tracker" element={<TimeTrackerPage />} />
    <Route path="/settings" element={<SettingsPage />} />
  </Routes>
</Layout>
    </>
  );
}

export default App;