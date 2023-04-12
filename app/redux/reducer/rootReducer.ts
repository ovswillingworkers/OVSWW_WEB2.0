
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import userReducer from './userSlice';
import jobPostingsReducer from './jobPostingsSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  jobPostings: jobPostingsReducer,
  // Add more reducers as needed...
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

  