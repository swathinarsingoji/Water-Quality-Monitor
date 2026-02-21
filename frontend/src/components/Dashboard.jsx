import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API = "http://127.0.0.1:8000";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/dashboard-data`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return <p style={{ padding: "30px" }}>Loading Dashboard...</p>;

  const alertData = [
    { name: "Alerts", value: data.asc?.total_alerts || 0 },
  ];

  const reportData = Object.entries(data.rsc || {}).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Dashboard Overview</h1>

      <div style={cardContainer}>
        <DashboardCard title="Water Stations" value={data.tws} />
        <DashboardCard title="Total Readings" value={data.trc} />
        <DashboardCard title="Avg Readings / Station" value={data.arps} />
        <DashboardCard title="Avg Reports / Station" value={data.areps} />
      </div>

      <div style={chartContainer}>
        <div style={chartBox}>
          <h3 style={chartTitle}>Alert Distribution</h3>
          <PieChart width={320} height={300}>
            <Pie
              data={alertData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {alertData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div style={chartBox}>
          <h3 style={chartTitle}>Report Status</h3>
          <PieChart width={320} height={300}>
            <Pie
              data={reportData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {reportData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div style={chartSection}>
        <h3 style={chartTitle}>Water Parameter Statistics</h3>
        <BarChart width={800} height={350} data={data.box_data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="parameter" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="min" fill="#3b82f6" />
          <Bar dataKey="avg" fill="#10b981" />
          <Bar dataKey="max" fill="#ef4444" />
        </BarChart>
      </div>

      <div style={listContainer}>
        <div style={listBox}>
          <h3>Latest Alerts</h3>
          {data.latest_alerts?.map((alert) => (
            <div key={alert.id} style={listItem}>
              {alert.message}
            </div>
          ))}
        </div>

        <div style={listBox}>
          <h3>Latest Reports</h3>
          {data.latest_reports?.map((report) => (
            <div key={report.id} style={listItem}>
              {report.description} ({report.status})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <p style={cardTitle}>{title}</p>
      <h2 style={cardValue}>{value}</h2>
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const headingStyle = {
  marginBottom: "30px",
  fontSize: "28px",
  fontWeight: "600",
};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const cardTitle = {
  color: "#64748b",
  marginBottom: "10px",
};

const cardValue = {
  fontSize: "24px",
  fontWeight: "600",
};

const chartContainer = {
  display: "flex",
  gap: "40px",
  marginTop: "50px",
  flexWrap: "wrap",
};

const chartBox = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const chartSection = {
  marginTop: "50px",
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const chartTitle = {
  marginBottom: "20px",
};

const listContainer = {
  display: "flex",
  gap: "30px",
  marginTop: "50px",
  flexWrap: "wrap",
};

const listBox = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const listItem = {
  padding: "8px 0",
  borderBottom: "1px solid #e2e8f0",
};

export default Dashboard;