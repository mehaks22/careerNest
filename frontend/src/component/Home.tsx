import React, { useEffect, useState } from "react"
import axios from "axios"

const Home: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

  const [stats, setStats] = useState({
    activeJobs: 0,
    companies: 0,
    candidates: 0,
    successRate: "0%"
  })

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/stats`)
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to load stats:", err))
  }, [])

  return (
    <div>
      {/* Stats Cards Section */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", margin: "2rem 0" }}>
        <div className="stat-card">
          <h3>{stats.activeJobs}+</h3>
          <p>Active Jobs</p>
        </div>
        <div className="stat-card">
          <h3>{stats.companies}+</h3>
          <p>Companies</p>
        </div>
        <div className="stat-card">
          <h3>{stats.candidates}+</h3>
          <p>Candidates</p>
        </div>
        <div className="stat-card">
          <h3>{stats.successRate}</h3>
          <p>Success Rate</p>
        </div>
      </div>
    </div>
  )
}

export default Home