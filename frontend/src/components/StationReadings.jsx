import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

function StationReadings() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedParameter, setSelectedParameter] = useState("pH");
  const [data, setData] = useState([]);

  const API = "http://localhost:8000";

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (selectedStation !== null) {
      fetchReadings(selectedStation);
    }
  }, [selectedStation, selectedParameter]);

  const fetchStations = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(`${API}/stations/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStations(res.data);

      if (res.data.length > 0) {
        setSelectedStation(res.data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReadings = async (stationId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(
        `${API}/stations/${stationId}/readings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!Array.isArray(res.data)) return;

      const filtered = res.data.filter(
        (r) => r.parameter === selectedParameter
      );

      const sorted = filtered.sort(
        (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
      );

      const formatted = sorted.map((item) => ({
        ...item,
        recorded_at: new Date(item.recorded_at).toLocaleTimeString(),
      }));

      setData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const thresholds = {
    pH: 8.5,
    turbidity: 5,
    DO: 6,
  };

  return (
    <div>
      <h2>Station Readings</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <select
          value={selectedStation || ""}
          onChange={(e) => setSelectedStation(Number(e.target.value))}
        >
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        <select
          value={selectedParameter}
          onChange={(e) => setSelectedParameter(e.target.value)}
        >
          <option value="pH">pH</option>
          <option value="turbidity">Turbidity</option>
          <option value="DO">DO</option>
        </select>
      </div>

      <LineChart width={900} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="recorded_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
        <ReferenceLine
          y={thresholds[selectedParameter]}
          stroke="red"
          strokeDasharray="4 4"
          label="Threshold"
        />
      </LineChart>
    </div>
  );
}

export default StationReadings;
