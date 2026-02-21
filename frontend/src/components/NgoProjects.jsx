import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function NgoProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${API}/ngo-projects`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProjects(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>NGO Projects</h2>
      {projects.map(p => (
        <div key={p.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          <h4>{p.project_name}</h4>
          <p>{p.contact_email}</p>
        </div>
      ))}
    </div>
  );
}

export default NgoProjects;