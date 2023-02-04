import React from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useIsAuthenticated } from "react-auth-kit";
// import avtr from "./avtr.jpeg";
import { toggleLikeArticle } from "../../features/articles/articlesSlice";
import classes from "./Article.module.scss";
import formataDate from "../../helper/formatDate";

const Article = ({ article }) => {
  const dispatch = useDispatch();
  const isAuth = useIsAuthenticated()();
  const [day, month, year] = formataDate(article.createdAt);
  const likeArticle = async (slug) => {
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${Cookies.get("_auth")}`,
        },
      }
    );
    const result = await res.json();
    return result;
  };

  const unLikeArticle = async (slug) => {
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${Cookies.get("_auth")}`,
        },
      }
    );
    const result = await res.json();
    return result;
  };
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
          <Link to={`/details/${article.slug}`} className={classes.title}>
            {article.title}
          </Link>
          <HeartOutlined
            className={`${classes.likeIcon} liked`}
            onClick={() => likeHandler(article)}
          />

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
