import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://blog.kata.academy/api/tags/";

const getTags = createAsyncThunk("tags/getTags", async () => {
  try {
    const resp = await axios(url);
    return resp.data;
  } catch (error) {
    throw new Error(error);
  }
});
const initialState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, { payload }) => {
      state.user = { ...payload };
    },
  },
  extraReducers: {
    [getTags.fulfilled]: (state, { payload }) => {
      state.tags = payload.tags;
    },
  },
});
export { getTags };
export const { addTags } = tagsSlice.actions;
export default tagsSlice.reducer;
