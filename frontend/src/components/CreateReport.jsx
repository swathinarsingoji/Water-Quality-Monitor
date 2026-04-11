import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function CreateReportFromAlert({ alertId, onBack }) {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [waterSource, setWaterSource] = useState("");

  const submitReport = async () => {
    await axios.post(`${API_BASE_URL}/reports/`, {
      location,
      description,
      water_source: waterSource,
      alert_id: alertId,
    });

    alert("Report Created Successfully");
    onBack();
  };

  return (
    <div>
      <h2>Create Report</h2>

      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Water Source"
        onChange={(e) => setWaterSource(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={submitReport}>Submit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default CreateReportFromAlert;
