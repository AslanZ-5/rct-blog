import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://blog.kata.academy/api/articles/";

const getArticles = createAsyncThunk(
  "articles/getArticles",
  async (page = 1) => {
    try {
      const resp = await axios(`${url}?offset=${(page - 1) * 20}`);
      return resp.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
const getArticleDetails = createAsyncThunk(
  "article/getArticleDetails",
  async (slug) => {
    try {
      const resp = await axios(`${url}${slug}`);
      return resp.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const initialState = {
  articles: [],
  totalArticles: 0,
  currentPage: 1,
  loading: true,
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
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.loading = true;
    },
    [getArticles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload.articles;
      state.totalArticles = payload.articlesCount;
      console.log(payload.articles);
    },
    [getArticles.rejected]: (state) => {
      state.loading = false;
    },
    [getArticleDetails.pending]: (state) => {
      state.loading = true;
    },
    [getArticleDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("3333", payload);
      state.articleDetails = payload.article;
    },
    [getArticleDetails.rejected]: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

export { getArticles, getArticleDetails };
export const { passPage, clearDetails } = articlesSlice.actions;
export default articlesSlice.reducer;
