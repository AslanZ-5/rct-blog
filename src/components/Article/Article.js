import React from "react";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import avtr from "./avtr.jpeg";
import classes from "./Article.module.scss";

const Article = ({ article }) => {
  const date = new Date(article.createdAt);
  const [day, year] = [date.getDate(), date.getFullYear()];
  const month = date.toLocaleString("en", { month: "long" });

  return (
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
