import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [] as User[],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setBulkUser: (state, action) => {
      state.users = action.payload;
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

export const { setBulkUser, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
