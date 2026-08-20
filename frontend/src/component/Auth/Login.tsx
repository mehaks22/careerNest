import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { login } from "../../redux/slices/authSlice"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Dynamic Base URL: Uses VITE_API_BASE_URL on production/Vercel and falls back to localhost locally
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email,
        username: email,
        password: password,
      })

      const resData = response.data
      const token =
        resData.token ||
        resData.jwt ||
        resData.accessToken ||
        resData.data?.token

      // Normalize user object for both EMPLOYER and JOB_SEEKER
      const rawUser = resData.user || resData.userDto || resData.data?.user || resData

      const rawRole = rawUser.role || resData.role || "JOB_SEEKER"
      const normalizedRole = String(rawRole).toUpperCase()

      const user = {
        id: rawUser.id || rawUser.userId || resData.id || resData.userId,
        email: rawUser.email || email,
        role: normalizedRole,
        username: rawUser.username || rawUser.name || rawUser.email || email,
      }

      // Dispatch normalized state
      dispatch(login({ token, user }))

      // Save values to localStorage so JobList.tsx can read them immediately
      localStorage.setItem("userRole", user.role)
      localStorage.setItem("userEmail", user.email)
      if (user.id) localStorage.setItem("userId", String(user.id)) // 👈 Added userId saving
      if (token) localStorage.setItem("token", token)

      // Redirect both roles appropriately
      navigate("/jobs")
    } catch (err: any) {
      console.error("Login attempt failed:", err.response?.data)
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response?.data
          : "Invalid credentials. Please check your email and password.")
      setError(message)
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
          maxWidth: "420px",
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
          Welcome back! Please enter your details.
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
          {/* Email / Username Input */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
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
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Login Button */}
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer Link */}
        <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login