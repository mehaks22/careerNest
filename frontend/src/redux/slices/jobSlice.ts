import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  skills: string[];
  employerName: string;
  postedDate: string;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
  },
});

export const { setJobs, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;