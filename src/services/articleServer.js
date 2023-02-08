import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://blog.kata.academy/api",
  headers: {
    Authorization: `Bearer ${Cookies.get("_auth")}`,
    "Content-Type": "application/json",
  },
});

async function getArticleTags() {
  try {
    const res = await api.get("/tags");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getArticleList(page = 1) {
  try {
    const resp = await api.get(`/articles/?offset=${(page - 1) * 20}`);
    return resp.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getSingleArticleDetails(slug) {
  try {
    const resp = await api.get(`/articles/${slug}`);
    return resp.data;
  } catch (error) {
    throw new Error(error);
  }
}

const likeArticle = async (slug) => {
  const resp = await api.post(`/articles/${slug}/favorite`);
  return resp.data;
};

const unLikeArticle = async (slug) => {
  const resp = await api.delete(`/articles/${slug}/favorite`);
  return resp.data;
};

export {
  getArticleTags,
  getArticleList,
  getSingleArticleDetails,
  likeArticle,
  unLikeArticle,
};
