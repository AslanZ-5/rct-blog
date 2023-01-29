import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import Article from "../Article/Article";
import { getArticles, passPage } from "../../features/articles/articlesSlice";
import ErrorBoundry from "../ErrorBoundry";
import Spinner from "../Spinner";

const ArticleList = () => {
  const { articles, loading, totalArticles, currentPage } = useSelector(
    (state) => state.article
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);
  if (loading) {
    return <Spinner size="large" />;
  }
  return (
    <ErrorBoundry>
      <div>
        {articles.map((article) => {
          return <Article key={article.slug} article={article} />;
        })}
        <Pagination
          current={currentPage}
          onChange={(page) => {
            dispatch(passPage(page));
            dispatch(getArticles(page));
          }}
          total={totalArticles}
          showSizeChanger={false}
          pageSize={20}
          defaultCurrent={1}
        />
      </div>
    </ErrorBoundry>
  );
};

export default ArticleList;
