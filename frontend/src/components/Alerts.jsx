import { useEffect, useState } from "react";
import axios from "axios";

function Alerts({ onCreateReport }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8000/alerts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlerts(res.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  return (
    <div>
      <h2>Alerts</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Station</th>
            <th>Parameter</th>
            <th>Value</th>
            <th>Threshold</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.station_id}</td>
              <td>{alert.parameter}</td>
              <td>{alert.value}</td>
              <td>{alert.threshold}</td>
              <td>{alert.message}</td>
              <td>
                <button onClick={() => onCreateReport(alert.id)}>
                  Create Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Alerts;
