import React from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
// import avtr from "./avtr.jpeg";
import { toggleLikeArticle } from "../../features/articles/articlesSlice";
import classes from "./Article.module.scss";
import formataDate from "../../helper/formatDate";
import { likeArticle, unLikeArticle } from "../../services/articleServer";
import { buildDetailsPath } from "../../routes";

const Article = ({ article }) => {
  const dispatch = useDispatch();
  const isAuth = useIsAuthenticated()();
  const [day, month, year] = formataDate(article.createdAt);

  const likeHandler = (post) => {
    if (isAuth) {
      if (post.favorited) {
        unLikeArticle(post.slug).then((res) =>
          dispatch(toggleLikeArticle(res.article))
        );
      } else {
        likeArticle(post.slug).then((res) =>
          dispatch(toggleLikeArticle(res.article))
        );
      }
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.article}>
        <header className={classes.header}>
          <Link to={buildDetailsPath(article.slug)} className={classes.title}>
            {article.title}
          </Link>
          {article.favorited ? (
            <HeartFilled
              className={`${classes.likeIcon}`}
              style={{ color: "red" }}
              onClick={() => likeHandler(article)}
            />
          ) : (
            <HeartOutlined
              className={`${classes.likeIcon}`}
              onClick={() => likeHandler(article)}
            />
          )}

          <p className={classes.likeCount}>{article.favoritesCount}</p>
        </header>
        <div className={classes.tags}>
          {article.tagList.map((tag, inx) => {
            if (tag?.length) {
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
      </div>
      <div className={classes.avatar}>
        <div className={classes.info}>
          <div className={classes.name}>{article.author.username}</div>
          <div className={classes.date}>{`${month} ${day}, ${year}`} </div>
        </div>
        <Avatar className={classes.img} size={46} src={article.author.image} />
      </div>
    </div>
  );
};

Article.defaultProps = {
  article: {},
};
Article.propTypes = {
  article: PropTypes.object,
};
export default Article;
