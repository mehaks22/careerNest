import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobList: React.FC = () => {  // 👈 Ensure this exact declaration is present
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (userRole !== "EMPLOYER") {
      axios.get(`${API_BASE_URL}/api/jobs`)
        .then(res => setJobs(res.data))
        .catch(err => console.error(err));
    }
  }, [userRole]);

  if (userRole === "EMPLOYER") {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2>🏢 Employer Dashboard</h2>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          As an employer, you can post new job openings and manage your active listings.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/post-job")}
            style={{ padding: "0.75rem 1.5rem", backgroundColor: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            + Post a New Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Available Job Opportunities</h1>
      {/* Map over jobs state here */}
    </div>
  );
};

export default JobList;