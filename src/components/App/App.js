import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { useDispatch } from "react-redux";
import { getTags } from "../../features/tags/tagsSlice";
import ArticleList from "../ArticleList";
import ArticleDetails from "../ArticleDetails";
import EditArticle from "../EditArticle";
import CreateArticle from "../CreateArticle";
import Navbar from "../Navbar";
import Login from "../Login";
import Registration from "../Registration";
import Profile from "../Profile";
import classes from "./App.module.scss";
import ErrorPage from "../../errorPage";
import {
  detailsPath,
  ErrorPath,
  homePath,
  newArticlePath,
  loginPath,
  registerPath,
  profilePath,
  articleEditPath,
} from "../../routes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  return (
    <div className={classes.App}>
      <Router>
        <Navbar />
        <Routes>
          <Route path={ErrorPath} element={<ErrorPage />} />
          <Route path={homePath} element={<ArticleList />} />
          <Route path={detailsPath} element={<ArticleDetails />} />

          <Route
            path={newArticlePath}
            element={
              <RequireAuth loginPath={loginPath}>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path={articleEditPath}
            element={
              <RequireAuth loginPath={loginPath}>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route path={registerPath} element={<Registration />} />
          <Route path={loginPath} element={<Login />} />
          <Route path={profilePath} element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
