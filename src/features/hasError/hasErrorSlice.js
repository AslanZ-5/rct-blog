import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasError: false,
};

const hasError = createSlice({
  name: "hasError",
  initialState,
  reducers: {
    throwError: (state) => {
      state.hasError = true;
    },
  },
});

export const { throwError } = hasError.actions;
export default hasError.reducer;
