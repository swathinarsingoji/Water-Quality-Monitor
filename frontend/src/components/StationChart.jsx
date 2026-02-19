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

function StationChart({ data, threshold }) {
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="recorded_at" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        name="Parameter Value"
      />

      <ReferenceLine
        y={threshold}
        stroke="red"
        strokeDasharray="3 3"
        label="Threshold"
      />
    </LineChart>
  );
}

export default StationChart;
