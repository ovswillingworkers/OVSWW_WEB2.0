
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import jobPostingsReducer from './jobPostingsSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  jobPostings: jobPostingsReducer,
  // Add more reducers as needed...
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

  