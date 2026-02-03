import { useState } from "react";

function SubmitReport() {
  const [form, setForm] = useState({
    location: "",
    description: "",
    water_source: "",
    photo_url: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/reports/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to submit report");
      }

      alert("Report submitted successfully!");

      setForm({
        location: "",
        description: "",
        water_source: "",
        photo_url: "",
        status: "pending",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Submit Water Pollution Report</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="water_source"
          placeholder="Water Source (River, Lake, etc.)"
          value={form.water_source}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="photo_url"
          placeholder="Photo URL (optional)"
          value={form.photo_url}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}

export default SubmitReport;
