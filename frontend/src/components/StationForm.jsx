import { useEffect, useState } from "react";
import axios from "axios";

function StationForm() {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    managed_by: "",
  });

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8000/stations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStations(res.data);
    } catch (error) {
      console.error("Error fetching stations:", error.response?.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStation = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as Admin");
        return;
      }

      await axios.post(
        "http://localhost:8000/stations/",
        {
          ...formData,
          latitude: String(formData.latitude),
          longitude: String(formData.longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Station added successfully!");

      fetchStations();

      setFormData({
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        managed_by: "",
      });

    } catch (error) {
      console.error("Error adding station:", error.response?.data);
      alert("Failed to add station");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Water Stations</h2>

        <div style={gridStyle}>
          <input
            style={inputStyle}
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
          />

          <input
            style={{ ...inputStyle, gridColumn: "span 2" }}
            name="managed_by"
            placeholder="Managed By"
            value={formData.managed_by}
            onChange={handleChange}
          />
        </div>

        <button style={buttonStyle} onClick={addStation}>
          Add Station
        </button>

        {stations.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "15px" }}>Existing Stations</h3>

            {stations.map((station) => (
              <div
                key={station.id}
                style={{
                  padding: "15px",
                  borderRadius: "8px",
                  background: "#f1f5f9",
                  marginBottom: "10px",
                }}
              >
                <strong>{station.name}</strong>
                <div>
                  {station.location} ({station.latitude},{" "}
                  {station.longitude})
                </div>
                <div>Managed By: {station.managed_by}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  padding: "40px",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  width: "700px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default StationForm;
