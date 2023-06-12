import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {} as User,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = {} as User;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setReduxUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
