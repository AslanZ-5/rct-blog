import React from "react";
import { Avatar } from "antd";
import avtr from "./avtr.jpeg";
import classes from "./Article.module.scss";

function Article() {
  return (
    <div className={classes.container}>
      <div className={classes.article}>
        <header className={classes.header}>
          <a href="/" className={classes.title}>
            Some article title
          </a>
          <i className="fa fa-heart-o" />
          <p>12</p>
        </header>
        <div className={classes.tags}>
          <button type="button">Tag1</button>
          <button type="button">SomeTag</button>
        </div>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          dolor atque velit impedit ratione commodi nulla a omnis laudantium
          cupiditate?
        </p>
      </div>
      <div className={classes.avatar}>
        <div className={classes.info}>
          <div className={classes.name}>John Doe</div>
          <div className={classes.date}>March 5, 2020 </div>
        </div>
        <Avatar size={46} src={avtr} />
      </div>
    </div>
  );
}

export default Article;
