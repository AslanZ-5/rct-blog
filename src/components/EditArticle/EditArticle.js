import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorPage from "../../errorPage";
import { getArticleDetails } from "../../features/articles/articlesSlice";
import ArticleForm from "../ArticleForm";
import Spinner from "../Spinner";

const EditArticle = () => {
  const { slug } = useParams();
  const {
    articleDetails: article,
    detailLoading,
    hasError,
  } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleDetails(slug));
  }, [dispatch]);

  if (detailLoading) {
    return <Spinner size="large" />;
  }
  if (hasError) {
    return <ErrorPage />;
  }
  return <ArticleForm article={article} type="PUT" />;
};

export default EditArticle;
