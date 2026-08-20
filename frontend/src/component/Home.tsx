import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Stats {
  activeJobs: number | string;
  companies: number | string;
  candidates: number | string;
  successRate: string;
}

const Home: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const [stats, setStats] = useState<Stats>({
    activeJobs: 0,
    companies: 0,
    candidates: 0,
    successRate: "0%",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, [API_BASE_URL]);

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Main Hero Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "3rem 2rem",
            textAlign: "center",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            marginBottom: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#111827", marginBottom: "1rem" }}>
            Your Dream Job Awaits
          </h1>
          <p style={{ color: "#4b5563", fontSize: "1rem", marginBottom: "1.5rem" }}>
            Connect with top employers or find talented professionals. CareerNest is your gateway.
          </p>
          <Link
            to="/jobs"
            style={{
              backgroundColor: "#6366f1",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Explore Jobs
          </Link>
        </div>

        {/* Dynamic Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#4f46e5", margin: 0 }}>
              {stats.activeJobs}+
            </h2>
            <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>Active Jobs</p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#4f46e5", margin: 0 }}>
              {stats.companies}+
            </h2>
            <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>Companies</p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#4f46e5", margin: 0 }}>
              {stats.candidates}+
            </h2>
            <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>Candidates</p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#4f46e5", margin: 0 }}>
              {stats.successRate}
            </h2>
            <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>Success Rate</p>
          </div>
        </div>

        {/* Why Choose CareerNest Section */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            textAlign: "center",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#111827" }}>
            Why Choose CareerNest?
          </h2>
        </div>

      </div>
    </div>
  );
};

export default Home;