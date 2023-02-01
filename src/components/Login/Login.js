import React from "react";
import { useForm } from "react-hook-form";

import classes from "./Login.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const handleOnSubmit = (data) => {
    console.log(data);
  };
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
        {errors.Email?.message && <p>{errors.Email?.message}</p>}

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
        {errors.Password?.message && <p>{errors.Password?.message}</p>}
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
