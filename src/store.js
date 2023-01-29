import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./features/articles/articlesSlice";
import hasErrror from "./features/hasError/hasErrorSlice";

const store = configureStore({
  reducer: {
    article: articlesSlice,
    hasError: hasErrror,
  },
});

export default store;
