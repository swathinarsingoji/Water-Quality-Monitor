import { useState } from "react";
import StationMap from "./components/StationMap";
import Navbar from "./components/Navbar";
import SubmitReport from "./components/SubmitReport";
import ViewReports from "./components/ViewReports";
import Login from "./components/Login";
import Alerts from "./components/Alerts";
import StationReadings from "./components/StationReadings";
import StationForm from "./components/StationForm";
import NgoProjects from "./components/NgoProjects";
import CreateNgoProject from "./components/CreateNgoProject";
import Dashboard from "./components/Dashboard";

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
      {page === "stations" && <StationForm />}
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

      

      {page === "ngo-projects" && <NgoProjects />}
      {page === "create-ngo-project" && <CreateNgoProject />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;