import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../redux/store"
import { logout } from "../../redux/slices/authSlice"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get state from Redux
  const authState = useSelector((state: RootState) => state.auth)

  // Fallback to localStorage if Redux state isn't initialized
  const storedToken = localStorage.getItem("token")
  const storedUserRaw = localStorage.getItem("user")
  let storedUser = null

  if (storedUserRaw && storedUserRaw !== "undefined") {
    try {
      storedUser = JSON.parse(storedUserRaw)
    } catch (e) {
      storedUser = null
    }
  }

  const isUserLoggedIn = authState.isAuthenticated || !!storedToken
  const activeUser = authState.user || storedUser

  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear()
    navigate("/login")
  }

  const userRole = activeUser?.role?.toUpperCase() || ""
  const isEmployer = userRole.includes("EMPLOYER")

  return (
    <nav
      style={{
        backgroundColor: "#6366f1",
        color: "#ffffff",
        padding: "0.85rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "#ffffff",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
        <span>💼</span>
        <span>CareerNest</span>
      </Link>

      {/* Navigation Options */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {isUserLoggedIn ? (
          <>
            {/* Display Active User Role / Name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "0.4rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              <span>👤</span>
              <span>{activeUser?.email || activeUser?.username || "Logged In"}</span>
            </div>

            {/* Jobs Navigation Button */}
            <button
              onClick={() => navigate("/jobs")}
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                padding: "0.45rem 0.9rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              📋 Jobs
            </button>

            {/* Employer Action */}
            {isEmployer && (
              <button
                onClick={() => navigate("/post-job")}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#4f46e5",
                  border: "none",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                ➕ Post Job
              </button>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ef4444",
                color: "#ffffff",
                border: "none",
                padding: "0.45rem 0.9rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                backgroundColor: "#ffffff",
                color: "#4f46e5",
                border: "none",
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar