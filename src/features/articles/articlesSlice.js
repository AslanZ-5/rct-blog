import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getArticleList,
  getSingleArticleDetails,
} from "../../services/articleServer";

const getArticles = createAsyncThunk("articles/getArticles", getArticleList);
const getArticleDetails = createAsyncThunk(
  "article/getArticleDetails",
  getSingleArticleDetails
);

const initialState = {
  articles: [],
  totalArticles: 0,
  currentPage: 1,
  loading: true,
  detailLoading: true,
  articleDetails: {},
  hasError: false,
};

const articlesSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    passPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    clearDetails: (state) => {
      state.articleDetails = {};
    },
    toggleLikeArticle: (state, { payload }) => {
      const index = state.articles.findIndex(
        (item) => item.slug === payload.slug
      );
      state.articles = [
        ...state.articles.slice(0, index),
        payload,
        ...state.articles.slice(index + 1),
      ];
    },
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.loading = true;
    },
    [getArticles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload?.articles;
      state.totalArticles = payload?.articlesCount;
    },
    [getArticles.rejected]: (state) => {
      state.loading = false;
    },
    [getArticleDetails.pending]: (state) => {
      state.detailLoading = true;
    },
    [getArticleDetails.fulfilled]: (state, { payload }) => {
      state.detailLoading = false;
      state.articleDetails = payload.article;
    },
    [getArticleDetails.rejected]: (state) => {
      state.detailLoading = false;
      state.hasError = true;
    },
  },
});

export { getArticles, getArticleDetails };
export const { passPage, clearDetails, toggleLikeArticle } =
  articlesSlice.actions;
export default articlesSlice.reducer;
