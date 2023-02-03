import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { Avatar } from "antd";
import { useIsAuthenticated, useSignOut, useAuthUser } from "react-auth-kit";
import { clearUser, addUser } from "../../features/profile/profileSlice";
import classes from "./Navbar.module.scss";
import img from "./defaultAvatar.png";

const Navbar = () => {
  const isAuthenticated = useIsAuthenticated()();
  const signOut = useSignOut();
  const dispatch = useDispatch();
  // const { username, image } = useAuthUser()();
  const auth = useAuthUser()();
  console.log(auth);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios("https://blog.kata.academy/api/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
        });
        dispatch(addUser(response.data.user));
      } catch (err) {
        console.log("dd", err);
      }
    };
    if (isAuthenticated) {
      getUser();
    }
  }, [dispatch]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      {isAuthenticated && (
        <Link to="/new-article" className="btn btn-outline-success ml-auto">
          Create Article
        </Link>
      )}
      {isAuthenticated ? (
        <button
          className="btn btn-outline-secondary my-1 my-sm-0 ml-2"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            signOut();
            dispatch(clearUser());
          }}
        >
          logout
        </button>
      ) : (
        <div className=" ml-auto">
          <Link
            to="sign-in/"
            className="btn btn-outline-secondary my-1 my-sm-0 mr-1"
          >
            Sign In
          </Link>
          <Link to="sign-up/" className="btn btn-outline-success my-1 my-sm-0">
            Sign Up
          </Link>
        </div>
      )}

      <Link to="/profile" className={classes.prof}>
        {auth?.username && (
          <div className={classes.profCont}>
            <p> {auth?.username}</p>
            <Avatar src={auth?.image || img} />
          </div>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
