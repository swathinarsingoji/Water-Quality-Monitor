import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API = "http://127.0.0.1:8000";

function StationMap() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch(`${API}/stations/`)
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch((err) => console.error("Failed to load stations", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          marginBottom: "14px",
          paddingLeft: "12px",
          borderLeft: "4px solid #38bdf8",
          color: "#6b2fa7",
          fontWeight: "600",
        }}
      >
        Real-time Station Map
      </h2>

      <div
        style={{
          height: "500px",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#0f172a",
          boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
        }}
      >
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
            >
              <Popup>
                <strong>{station.name}</strong>
                <br />
                Location: {station.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default StationMap;
