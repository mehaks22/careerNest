import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface Job {
  id?: string;
  _id?: string;
  title: string;
  location: string;
  salary: string;
  description: string;
  postedBy?: string;
  employerId?: string;
  employerEmail?: string;
  userId?: string;
  email?: string;
}

const JobList: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // First try standard /jobs endpoint
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        setJobs(Array.isArray(response.data) ? response.data : response.data.jobs || []);
      } catch (err: any) {
        console.warn("GET /jobs failed, attempting fallback to /api/jobs...", err);
        try {
          // Fallback if backend controller uses /api/jobs prefix
          const fallbackRes = await axios.get(`${API_BASE_URL}/api/jobs`);
          setJobs(Array.isArray(fallbackRes.data) ? fallbackRes.data : fallbackRes.data.jobs || []);
        } catch (fallbackErr: any) {
          console.error("Failed to fetch jobs from both endpoints:", fallbackErr);
          setFetchError("Unable to load jobs from server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_BASE_URL]);

  const employerJobs = jobs.filter((job) => {
    const currentEmail = (userEmail || "").trim().toLowerCase();
    const currentId = String(userId || "").trim();

    const jobEmail = (
      job.postedBy ||
      job.employerEmail ||
      job.email ||
      ""
    ).trim().toLowerCase();

    const jobId = String(
      job.employerId ||
      job.userId ||
      ""
    ).trim();

    const matchesEmail = currentEmail !== "" && jobEmail === currentEmail;
    const matchesId = currentId !== "" && currentId !== "null" && jobId === currentId;

    return matchesEmail || matchesId;
  });

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {userRole === "EMPLOYER" ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h1 style={{ fontSize: "1.875rem", fontWeight: "800", color: "#111827", margin: 0 }}>
                  Employer Dashboard
                </h1>
                <p style={{ color: "#6b7280", margin: "0.25rem 0 0 0" }}>
                  Manage your active job listings and review applications.
                </p>
              </div>
              <button
                onClick={() => navigate("/post-job")}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Post New Job
              </button>
            </div>

            {fetchError && (
              <div style={{ padding: "1rem", backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "1rem" }}>
                ⚠️ {fetchError}
              </div>
            )}

            {loading ? (
              <p style={{ textAlign: "center", color: "#6b7280" }}>Loading your listings...</p>
            ) : employerJobs.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {employerJobs.map((job, index) => {
                  const jobId = job.id || job._id || `job-${index}`;
                  return (
                    <div
                      key={jobId}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h3 style={{ margin: "0 0 0.5rem 0", color: "#111827", fontSize: "1.25rem" }}>
                          {job.title}
                        </h3>
                        <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
                          📍 {job.location} | 💰 {job.salary}
                        </p>
                        <p style={{ margin: "0.5rem 0 0 0", color: "#4b5563", fontSize: "0.9rem" }}>
                          {job.description}
                        </p>
                      </div>
                      <Link
                        to={`/job/${job.id || job._id || ""}`}
                        style={{
                          backgroundColor: "#6366f1",
                          color: "#ffffff",
                          padding: "0.5rem 1rem",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: "500",
                          fontSize: "0.875rem",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "3rem",
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>No Jobs Posted Yet</h3>
                <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                  You haven't published any job openings. Click below to create your first listing!
                </p>
                <button
                  onClick={() => navigate("/post-job")}
                  style={{
                    backgroundColor: "#4f46e5",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  + Post a Job Now
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: "1.875rem", fontWeight: "800", color: "#111827", marginBottom: "1.5rem" }}>
              Available Job Opportunities
            </h1>

            {loading ? (
              <p style={{ textAlign: "center", color: "#6b7280" }}>Fetching available jobs...</p>
            ) : jobs.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {jobs.map((job, index) => {
                  const jobId = job.id || job._id || `job-${index}`;
                  return (
                    <div
                      key={jobId}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h3 style={{ margin: "0 0 0.5rem 0", color: "#111827", fontSize: "1.25rem" }}>
                          {job.title}
                        </h3>
                        <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
                          📍 {job.location} | 💰 {job.salary}
                        </p>
                        <p style={{ margin: "0.5rem 0 0 0", color: "#4b5563", fontSize: "0.9rem" }}>
                          {job.description}
                        </p>
                      </div>
                      <Link
                        to={`/job/${job.id || job._id || ""}`}
                        style={{
                          backgroundColor: "#6366f1",
                          color: "#ffffff",
                          padding: "0.5rem 1rem",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: "500",
                          fontSize: "0.875rem",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "#6b7280", margin: 0 }}>No active job listings found right now.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;