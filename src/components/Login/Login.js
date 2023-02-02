import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.scss";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const handleOnSubmit = async (data) => {
    console.log("ddddaaattaa", data);
    try {
      const response = await axios.post(
        "https://blog.kata.academy/api/users/login",
        {
          user: {
            email: data.Email,
            password: data.Password,
          },
        }
      );

      signIn({
        token: response.data.user.token,
        expiresIn: "500",
        tokenType: "Bearer",
        authState: response.data.user.username,
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };
  if (success) {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <section className={classes.logSec}>
      <h1 className={classes.logHeader}>Sign In</h1>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={classes.logForm}>
        <label className={classes.logLab} htmlFor="email">
          Email address
        </label>
        <input
          {...register("Email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          className={classes.logInput}
          placeholder="Email address"
          type="text"
          id="email"
          autoComplete="off"
        />
        {errors.Email?.message && (
          <p className={classes.instructions}>{errors.Email?.message}</p>
        )}

        <label className={classes.logLab} htmlFor="password">
          Password
        </label>
        <input
          {...register("Password", { required: "This field is required" })}
          className={classes.logInput}
          placeholder="Password"
          type="password"
          id="password"
        />
        {errors.Password?.message && (
          <p className={classes.instructions}>{errors.Password?.message}</p>
        )}
        <button className={classes.logBtn} type="submit">
          Sign In
        </button>
      </form>
      <p className={classes.regLink}>
        Don’t have an account?
        <span className={classes.line}>
          <a href="/">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
