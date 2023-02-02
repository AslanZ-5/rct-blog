import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticleList from "../ArticleList/ArticleList";
import ArticleDetails from "../ArticleDetails/ArticleDetails";
import Navbar from "../Navbar";
import Login from "../Login";
import Registration from "../Registration";
import Profile from "../Profile";
import classes from "./App.module.scss";

const App = () => {
  return (
    <div className={classes.App}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/details/:slug" element={<ArticleDetails />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
