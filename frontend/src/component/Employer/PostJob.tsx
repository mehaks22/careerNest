import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../../redux/store";

interface User {
  id?: string;
  _id?: string;
  email: string;
  role: string;
  name?: string;
  username?: string;
}

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth?.token) || localStorage.getItem("token");
  const user = useSelector((state: RootState) => state.auth?.user) as User | null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userId = user?.id || user?._id || localStorage.getItem("userId") || "";
    const userEmail = user?.email || localStorage.getItem("userEmail") || "";
    const username = user?.username || user?.name || userEmail;

    const payload = {
      ...formData,
      employerId: userId,
      userId: userId,
      postedBy: userEmail,
      employerEmail: userEmail,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      userId: String(userId),
      username: String(username),
    };

    try {
      // Primary POST endpoint attempt
      await axios.post(`${API_BASE_URL}/jobs`, payload, { headers });
      navigate("/jobs");
    } catch (err: any) {
      if (err.response?.status === 404) {
        try {
          // Fallback endpoint if /jobs return 404
          await axios.post(`${API_BASE_URL}/api/jobs`, payload, { headers });
          navigate("/jobs");
          return;
        } catch (fallbackErr: any) {
          console.error("POST fallback failed:", fallbackErr);
        }
      }

      setError(
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response?.data : "Failed to post job. Check server endpoints.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "3rem 1rem",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Post a Job
        </h1>

        {error && (
          <div
            style={{
              padding: "0.75rem",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "8px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
              Salary
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              placeholder="Java, Spring Boot, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
              Deadline
            </label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "0.85rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;