import { createSlice } from "@reduxjs/toolkit";



interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setBulkUser: (state, action) => {
      state.users = [action.payload];
      state.loading = false;
      state.error = null;
    },
    clearUsers(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setBulkUser: setRedUser, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
