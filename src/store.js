import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./features/articles/articlesSlice";
import hasErrror from "./features/hasError/hasErrorSlice";
import profileSlice from "./features/profile/profileSlice";
import tagsSlice from "./features/tags/tagsSlice";

const store = configureStore({
  reducer: {
    article: articlesSlice,
    hasError: hasErrror,
    profile: profileSlice,
    tags: tagsSlice,
  },
});

export default store;
