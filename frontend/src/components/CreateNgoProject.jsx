import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function CreateNgoProject() {
  const [formData, setFormData] = useState({
    project_name: "",
    contact_email: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post(`${API}/ngo-project`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Project Published Successfully");
  };

  return (
    <div>
      <h2>Create NGO Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="project_name"
          placeholder="Project Name"
          onChange={handleChange}
        />
        <br/><br/>
        <input
          name="contact_email"
          placeholder="Contact Email"
          onChange={handleChange}
        />
        <br/><br/>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreateNgoProject;