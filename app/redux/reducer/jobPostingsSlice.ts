// reducers/jobPostingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobPostings: [],
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
    // Add more reducers as needed...
  },
});

export const { getJobPostingsStart, getJobPostingsSuccess, getJobPostingsFailure } = jobPostingsSlice.actions;

export default jobPostingsSlice.reducer;
