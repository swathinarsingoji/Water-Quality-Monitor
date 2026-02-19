import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function ViewReports() {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchReports = async () => {
    try {
      if (!token) return;

      
      const endpoint =
        role === "authority" || role === "admin"
          ? `${API}/reports/`
          : `${API}/reports/me`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${API}/reports/${id}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      fetchReports();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {role === "authority" || role === "admin"
          ? "All Submitted Reports"
          : "My Reports"}
      </h2>

      {reports.length === 0 && <p>No reports available</p>}

      {reports.map((report) => (
        <div
          key={report.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px",
          }}
        >
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Description:</strong> {report.description}</p>
          <p><strong>Water Source:</strong> {report.water_source}</p>
          <p><strong>Status:</strong> {report.status}</p>

          {/* Only authority can verify */}
          {role === "authority" && report.status === "pending" && (
            <>
              <button onClick={() => updateStatus(report.id, "verified")}>
                Verify
              </button>
              <button
                onClick={() => updateStatus(report.id, "rejected")}
                style={{ marginLeft: "10px" }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ViewReports;
