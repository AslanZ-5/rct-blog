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
          <Route path="/" element={<ArticleList />} />
          <Route path="/details/:slug" element={<ArticleDetails />} />

          <Route
            path="/new-article"
            element={
              <RequireAuth loginPath="/sign-in">
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <RequireAuth loginPath="/sign-in">
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
