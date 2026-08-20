import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const Signup: React.FC = () => {
  const navigate = useNavigate()

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    role: "JOB_SEEKER",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    // Send full formData (including role) inside the JSON payload
    await axios.post(
      `${API_BASE_URL}/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    navigate("/login")
  } catch (err: any) {
    console.error("Signup failed:", err.response?.data || err)

    let errorMessage = "Registration failed."
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    } else if (err.message) {
      errorMessage = err.message
    }

    setError(String(errorMessage))
  } finally {
    setLoading(false)
  }
}


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
        padding: "2rem 1rem",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          padding: "2.5rem 2rem",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        {/* Brand Icon & Heading */}
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💼</div>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "0.25rem",
          }}
        >
          CareerNest
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "1.75rem", fontSize: "0.95rem" }}>
          Create an account to get started
        </p>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              padding: "0.75rem",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "8px",
              marginBottom: "1.25rem",
              fontSize: "0.875rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          {/* Email Input */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.4rem",
              }}
            >
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="emp@gmail.com"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          {/* First Name & Last Name (Row) */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  marginBottom: "0.4rem",
                }}
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  boxSizing: "border-box",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  marginBottom: "0.4rem",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  boxSizing: "border-box",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Phone Input */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.4rem",
              }}
            >
              📞 Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.4rem",
              }}
            >
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          {/* Role Select */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.4rem",
              }}
            >
              👤 Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
                fontSize: "0.95rem",
                outline: "none",
                backgroundColor: "#ffffff",
              }}
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              padding: "0.85rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1.5rem",
              transition: "background-color 0.2s",
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Link */}
        <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup