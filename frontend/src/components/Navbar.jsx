function Navbar({ onNavigate, onLogout }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }

  return (
    <div style={navStyle}>
      <div>
        <button style={btnStyle} onClick={() => onNavigate("map")}>
          Station Map
        </button>

        <button style={btnStyle} onClick={() => onNavigate("alerts")}>
          Alerts
        </button>

        <button style={btnStyle} onClick={() => onNavigate("readings")}>
          Charts
        </button>

        {/* Admin Only */}
        {user?.role === "admin" && (
          <button style={btnStyle} onClick={() => onNavigate("stations")}>
            Manage Stations
          </button>
        )}

        {/* Citizen & NGO */}
        {(user?.role === "citizen" || user?.role === "ngo") && (
          <>
            <button style={btnStyle} onClick={() => onNavigate("report")}>
              Submit Report
            </button>

            <button style={btnStyle} onClick={() => onNavigate("view")}>
              My Reports
            </button>
          </>
        )}

        {/* Authority */}
        {user?.role === "authority" && (
          <button style={btnStyle} onClick={() => onNavigate("view")}>
            All Reports
          </button>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "white", marginRight: "15px" }}>
          {user?.name || "User"} ({user?.role || "role"})
        </span>

        <button style={logoutStyle} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#020617",
};

const btnStyle = {
  marginRight: "10px",
  padding: "8px 12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const logoutStyle = {
  padding: "8px 12px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Navbar;
