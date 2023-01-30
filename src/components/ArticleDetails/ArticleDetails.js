import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "antd";
import Spinner from "../Spinner";
import { getArticleDetails } from "../../features/articles/articlesSlice";
import ErrorBoundry from "../ErrorBoundry";
import ErrorPage from "../../errorPage";
import classes from "./ArticleDetails.module.scss";
import formataDate from "../../helper/formatDate";

const ArticleDetails = () => {
  const {
    articleDetails: article,
    detailLoading,
    hasError,
  } = useSelector((state) => state.article);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [day, month, year] = formataDate(article.createdAt);

  useEffect(() => {
    dispatch(getArticleDetails(slug));
  }, [dispatch]);
  if (detailLoading) {
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
            <div className={classes.favorites}>
              <i className="fa fa-heart-o" />
              <p>{article.favoritesCount}</p>
            </div>
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
            <div className={classes.date}>{`${month} ${day}, ${year}`} </div>
          </div>
          <Avatar
            className={classes.img}
            size={46}
            src={article.author.image}
          />
        </div>
      </div>
    </ErrorBoundry>
  );
};

export default ArticleDetails;
