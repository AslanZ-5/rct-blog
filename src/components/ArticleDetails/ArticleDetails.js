import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "antd";
import Spinner from "../Spinner";
import {
  getArticleDetails,
  clearDetails,
} from "../../features/articles/articlesSlice";
import ErrorBoundry from "../ErrorBoundry";
import ErrorPage from "../../errorPage";
import classes from "./ArticleDetails.module.scss";

const ArticleDetails = () => {
  const {
    articleDetails: article,
    loading,
    hasError,
  } = useSelector((state) => state.article);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleDetails(slug));
    return () => dispatch(clearDetails());
  }, [dispatch]);
  if (loading) {
    return <Spinner size="large" />;
  }
  if (hasError) {
    return <ErrorPage />;
  }
  return (
    <ErrorBoundry>
      <div className={classes.container}>
        <div className={classes.article}>
          <header className={classes.header}>
            <Link to={`/details/${article.slug}`} className={classes.title}>
              {article.title}
            </Link>
            <i className="fa fa-heart-o" />
            <p>{article.favoritesCount}</p>
          </header>
          <div className={classes.tags}>
            {article.tagList.map((tag, inx) => {
              if (tag.length) {
                return (
                  <button key={`${tag}${inx}`} type="button">
                    {tag}
                  </button>
                );
              }
              return "";
            })}
          </div>

          <p className={classes.text}>{article.description}</p>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
        <div className={classes.avatar}>
          <div className={classes.info}>
            <div className={classes.name}>{article.author.username}</div>
            {/* <div className={classes.date}>{`${month} ${day}, ${year}`} </div> */}
          </div>
          <Avatar
            className={classes.img}
            size={46}
            src={classes.author?.image}
          />
        </div>
      </div>
    </ErrorBoundry>
  );
};

export default ArticleDetails;
