// reducers/jobPostingsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { JobPosting } from '../../components/jobpost';


interface JobState {
  jobPostings: JobPosting[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobPostings: [] as JobPosting[],
  loading: false,
  error: null,
};


const jobPostingsSlice = createSlice({
  name: 'jobPostings',
  initialState,
  reducers: {
    getJobPostingsStart(state) {
      state.loading = true;
    },
    getJobPostingsSuccess(state, action) {
      state.loading = false;
      state.jobPostings = action.payload;
    },
    getJobPostingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setJobPosting(state, action) {
      console.log("THIS IS JOBPSTOING REDUCER SLICER ")
      state.jobPostings = action.payload;
    },
    clearJobPosting(state) {
      state.jobPostings = [];
    },
    // Add more reducers as needed...
  },
});

export const { getJobPostingsStart, getJobPostingsSuccess, getJobPostingsFailure, setJobPosting, clearJobPosting } = jobPostingsSlice.actions;

export default jobPostingsSlice.reducer;
