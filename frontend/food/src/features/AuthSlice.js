import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    UserLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    UserLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { UserLogin } = AuthSlice.actions;
export default AuthSlice.reducer;
