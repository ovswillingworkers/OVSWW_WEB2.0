
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import userReducer from './userSlice';
import jobPostingsReducer from './jobPostingsSlice';


const rootApplyReducer = combineReducers({

  jobPostings: jobPostingsReducer,
  // Add more reducers as needed...
});




export type RootApplyState = ReturnType<typeof rootApplyReducer>;

export default rootApplyReducer;


  