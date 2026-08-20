import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import type { RootState } from "../../redux/store"
import { setSelectedJob } from "../../redux/slices/jobSlice"

interface Job {
  id: string
  _id?: string
  title: string
  description: string
  location: string
  salary: string
  skills?: string[]
}

const JobList: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { token, user } = useSelector((state: RootState) => state.auth)

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      setError("")

      try {
        const userId = user?.id || user?._id || ""
        const headers: Record<string, string> = {}

        if (token) headers["Authorization"] = `Bearer ${token}`
        if (userId) headers["userId"] = String(userId)

        const response = await axios.get("http://localhost:8080/jobs", { headers })

        if (Array.isArray(response.data)) {
          setJobs(response.data)
        } else {
          setJobs([])
        }
      } catch (err: any) {
        console.error("Failed to fetch jobs:", err)
        setError("Failed to load available job postings.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [token, user])

  const handleSelectJob = (job: Job) => {
    dispatch(setSelectedJob(job))
    const jobId = job.id || job._id
    navigate(`/job/${jobId}`)
  }

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
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Available Job Opportunities
        </h1>

        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
            ⏳ Loading jobs...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "3rem 1.5rem",
              borderRadius: "1rem",
              textAlign: "center",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e5e7eb",
            }}
          >
            <p style={{ fontSize: "1.125rem", color: "#4b5563" }}>
              No job postings available at the moment.
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {jobs.map((job) => (
            <div
              key={job.id || job._id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: "0.4rem",
                  }}
                >
                  {job.title}
                </h2>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
                  📍 {job.location} | 💰 {job.salary}
                </p>
                <p
                  style={{
                    color: "#374151",
                    fontSize: "0.925rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "orient",
                    overflow: "hidden",
                    margin: 0,
                  }}
                >
                  {job.description}
                </p>
              </div>

              <button
                onClick={() => handleSelectJob(job)}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "#ffffff",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobList