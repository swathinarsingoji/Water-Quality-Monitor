import { useState } from "react";
import StationMap from "./components/StationMap";
import Navbar from "./components/Navbar";
import SubmitReport from "./components/SubmitReport";
import ViewReports from "./components/ViewReports";
import Login from "./components/Login";

import Alerts from "./components/Alerts";
import CreateReportFromAlert from "./components/CreateReport";
import StationReadings from "./components/StationReadings";
import StationForm from "./components/StationForm";   // ✅ added

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [page, setPage] = useState("map");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Navbar onNavigate={setPage} onLogout={handleLogout} />

      {page === "map" && <StationMap />}
      {page === "stations" && <StationForm />}   {/* ✅ added */}
      {page === "report" && <SubmitReport />}
      {page === "view" && <ViewReports />}

      {page === "alerts" && (
        <Alerts
          onCreateReport={(id) => {
            setSelectedAlert(id);
            setPage("createAlertReport");
          }}
        />
      )}

      {page === "createAlertReport" && (
        <SubmitReport
          alertId={selectedAlert}
          onBack={() => setPage("alerts")}
        />
      )}

      {page === "readings" && <StationReadings />}
    </div>
  );
}

export default App;
