import React from "react"
import { useNavigate } from "react-router-dom"

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
        {/* Hero Section */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "3rem 2rem",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            marginBottom: "2.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: "#111827",
              marginBottom: "1rem",
            }}
          >
            Your Dream Job Awaits
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#4b5563",
              marginBottom: "2rem",
            }}
          >
            Connect with top employers or find talented professionals.
            CareerNest is your gateway.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            style={{
              backgroundColor: "#6366f1",
              color: "#ffffff",
              padding: "0.85rem 2rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Explore Jobs
          </button>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { label: "Active Jobs", count: "5000+" },
            { label: "Companies", count: "2000+" },
            { label: "Candidates", count: "10000+" },
            { label: "Success Rate", count: "95%" },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#ffffff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "bold",
                  color: "#4f46e5",
                }}
              >
                {stat.count}
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "2rem",
            }}
          >
            Why Choose CareerNest?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            <div>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                🚀
              </div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.25rem",
                }}
              >
                Fast & Easy
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.4' }}>
                Apply to jobs in seconds with one-click applications.
              </p>
            </div>

            <div>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                🔒
              </div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.25rem",
                }}
              >
                Secure
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.4' }}>
                Your data is protected with enterprise-level security.
              </p>
            </div>

            <div>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                💼
              </div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.25rem",
                }}
              >
                Professional
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.4' }}>
                Connect with top companies and talented professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home