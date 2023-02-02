import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = { ...payload };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, clearUser } = profileSlice.actions;
export default profileSlice.reducer;
