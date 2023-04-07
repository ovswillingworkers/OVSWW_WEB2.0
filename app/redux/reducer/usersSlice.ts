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
    setRedUser: (state, action) => {
      state.users = [action.payload];
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setRedUser, clearUser } = usersSlice.actions;

export default usersSlice.reducer;
