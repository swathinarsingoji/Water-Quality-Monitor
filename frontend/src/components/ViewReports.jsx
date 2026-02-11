import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function ViewReports() {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    const res = await fetch(`${API}/reports/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setReports(data);
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
      <h2>All Submitted Reports</h2>

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

          {report.status === "pending" && (
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
