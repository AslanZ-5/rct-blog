import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleTags } from "../../services/articleServer";

const getTags = createAsyncThunk("tags/getTags", getArticleTags);
const initialState = {
  tags: [],
  hasError: false,
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
    [getTags.rejected]: (state) => {
      state.hasError = true;
    },
  },
});
export { getTags };
export const { addTags } = tagsSlice.actions;
export default tagsSlice.reducer;
