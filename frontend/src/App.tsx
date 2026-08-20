import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./component/Common/Navbar"
import Home from "./component/Home"
import Login from "./component/Auth/Login"
import Signup from "./component/Auth/Signup"
import ProtectedRoute from "./component/Auth/ProtectedRoute"
import JobList from "./component/JobSeeker/JobList"
import JobDetails from "./component/JobSeeker/JobDetails"
import PostJob from "./component/Employer/PostJob"

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} /> {/* 👈 Added alias route */}

        {/* Protected Routes - General Auth Access */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Employer Only */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute requiredRole="EMPLOYER">
              <PostJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App