import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import type { RootState } from "../../redux/store"
import { setSelectedJob } from "../../redux/slices/jobSlice"

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 1. Get user & auth state from Redux
  const reduxJob = useSelector((state: RootState) => state.jobs?.selectedJob)
  const user = useSelector((state: RootState) => state.auth?.user)
  const token = useSelector((state: RootState) => state.auth?.token)
  const isAuthenticated = useSelector((state: RootState) => state.auth?.isAuthenticated)

  const [job, setJob] = useState<any>(reduxJob)
  const [loading, setLoading] = useState<boolean>(!reduxJob)
  const [error, setError] = useState<string | null>(null)

  // Form & UI States
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState("")
  const [applying, setApplying] = useState(false)
  const [appliedSuccess, setAppliedSuccess] = useState(false)
  const [applyError, setApplyError] = useState("")
  const [hasApplied, setHasApplied] = useState(false)

  // Fetch job details if not available in Redux
  useEffect(() => {
    if (!job && id) {
      setLoading(true)
      axios
        .get(`http://localhost:8080/jobs/${id}`)
        .then((res) => {
          setJob(res.data)
          dispatch(setSelectedJob(res.data))
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching job by ID:", err)
          setError("Job not found or has been removed.")
          setLoading(false)
        })
    }
  }, [id, job, dispatch])

  // Check if user has already applied
  useEffect(() => {
    if (job && user) {
      const jobId = job.id || job._id
      const userId = user.id || user._id

      axios
        .get(`http://localhost:8080/applications/job/${jobId}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            const alreadyApplied = res.data.some(
              (app: any) => String(app.seekerId) === String(userId)
            )
            setHasApplied(alreadyApplied)
          }
        })
        .catch((err) => {
          console.error("Error checking application status:", err)
        })
    }
  }, [job, user])

  // Handle clicking "Apply Now" button
  const handleApplyClick = () => {
    if (!isAuthenticated || !user) {
      navigate("/login")
      return
    }
    setShowApplyForm(true)
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resumeFile) {
      setApplyError("Please select a resume file.")
      return
    }

    setApplying(true)
    setApplyError("")

    try {
      const jobId = job.id || job._id
      const userId = user.id || user._id

      // Build Multipart FormData payload
      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("coverLetter", coverLetter)

      // Send via Axios
      await axios.post(
        `http://localhost:8080/applications?jobId=${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            userId: String(userId),
          },
        }
      )

      // Show success banner (do NOT trigger hasApplied on instant submission)
      setAppliedSuccess(true)
      setShowApplyForm(false)
      setResumeFile(null)
      setCoverLetter("")
    } catch (err: any) {
      const errorMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "Failed to submit application."

      setApplyError(errorMsg)

      // If duplicate detected from backend, lock form
      if (errorMsg.includes("already applied")) {
        setHasApplied(true)
        setShowApplyForm(false)
      }
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <p className="text-gray-600 text-lg">⏳ Loading job details...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#f9fafb' }}>
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
        <p className="text-gray-600 mb-6">{error || "Could not retrieve details for this position."}</p>
        <button
          onClick={() => navigate("/jobs")}
          className="btn-primary"
        >
          Back to Jobs
        </button>
      </div>
    )
  }

  return (
    // Outer Wrapper: Centers the content card on the screen
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', padding: '3rem 1rem', width: '100%' }}>

      {/* Main Job Card */}
      <div style={{ width: '100%', maxWidth: '650px', backgroundColor: '#ffffff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>

        <button
          onClick={() => navigate("/jobs")}
          className="btn-outline mb-6"
          style={{ padding: '0.4rem 1rem' }}
        >
          ← Back to Jobs
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <p className="text-gray-600 text-lg mb-6 flex items-center gap-2">
          📍 {job.location} | 💰 {job.salary}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </div>

        {/* 1. Show 'Already Applied' banner ONLY when returning/reloading */}
        {hasApplied && !appliedSuccess && (
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg font-medium text-center mb-6 border border-yellow-300">
            ⚠️ You have already applied for this job.
          </div>
        )}

        {/* 2. Show Success Banner right after submission */}
        {appliedSuccess && (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg font-medium text-center mb-6 border border-green-300">
            ✅ Application submitted successfully!
          </div>
        )}

        {/* 3. Error Banner */}
        {applyError && !hasApplied && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg text-center mb-6 border border-red-300">
            ⚠️ {applyError}
          </div>
        )}

        {/* Action Button */}
        {!showApplyForm && !appliedSuccess && !hasApplied && (
          <div className="flex justify-center">
            <button
              onClick={handleApplyClick}
              className="btn-primary w-full sm:w-auto"
            >
              {isAuthenticated ? "Apply Now" : "Login to Apply"}
            </button>
          </div>
        )}

        {/* Application Form */}
        {showApplyForm && !hasApplied && (
          <form onSubmit={handleSubmitApplication} className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Your Application</h3>

            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Upload Resume File (PDF, DOC, DOCX)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0])
                  }
                }}
                className="input-field bg-white"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="input-field h-32"
                placeholder="Why are you a good fit?"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                disabled={applying}
                className="btn-secondary"
              >
                {applying ? "Submitting..." : "Submit Application"}
              </button>
              <button
                type="button"
                onClick={() => setShowApplyForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default JobDetails