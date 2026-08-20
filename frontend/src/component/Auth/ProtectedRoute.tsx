import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role) {
    const userRole = String(user.role).toUpperCase().replace("ROLE_", "")
    const targetRole = String(requiredRole).toUpperCase().replace("ROLE_", "")

    if (userRole !== targetRole) {
      console.warn(`Access denied. Required: ${targetRole}, Found: ${userRole}`)
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute