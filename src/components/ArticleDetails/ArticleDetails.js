import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Avatar, Modal } from "antd";
import Cookies from "js-cookie";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import Spinner from "../Spinner";
import { getArticleDetails } from "../../features/articles/articlesSlice";
import ErrorBoundry from "../ErrorBoundry";
import ErrorPage from "../../errorPage";
import classes from "./ArticleDetails.module.scss";
import formataDate from "../../helper/formatDate";
import { buildArticleEditPath } from "../../routes";

const ArticleDetails = () => {
  const { confirm } = Modal;
  const auth = useAuthUser()();
  const navigate = useNavigate();
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
  const deleteArticle = async () => {
    try {
      const response = await axios(
        `https://blog.kata.academy/api/articles/${article.slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        }
      );
      if (response.status === 204 || response.status === 200) {
        return navigate("/");
      }
      return response.status;
    } catch (err) {
      return err;
    }
  };
  const showPromiseConfirm = () => {
    confirm({
      title: "Are you sure to delete this article??",
      icon: <ExclamationCircleFilled />,
      content: "Really?",
      onOk() {
        deleteArticle();
      },
      onCancel() {},
    });
  };
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
            <h2>{article.title}</h2>

            <div className={classes.favorites}>
              <i className="fa fa-heart-o" />
              <p>{article.favoritesCount}</p>
            </div>
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
          <ReactMarkdown>{article.body}</ReactMarkdown>
          {auth?.username && auth?.username === article.author.username ? (
            <div className={classes.editDel}>
              <Link
                type="button"
                to={buildArticleEditPath(article.slug)}
                className={`btn btn-success ${classes.btnEdit}`}
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={showPromiseConfirm}
                className={`btn btn-danger ${classes.btnDelete}`}
              >
                delete
              </button>
            </div>
          ) : (
            ""
          )}
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
