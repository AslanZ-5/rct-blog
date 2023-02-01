import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Registration.module.scss";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /.{3,20}/;
const PWD_REGEX = /.{6,60}/;

const Registration = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [regError, setRegError] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const username = watch("Username");
  const email = watch("Email");
  const password = watch("Password");
  const confirm = watch("repeatPassword");

  const handleCheckBox = (e) => {
    const { checked } = e.target;
    setIsAgreed(checked);
  };
  const handleOnSubmit = (data) => {
    console.log(data);
    fetch("https://blog.kata.academy/api/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: data.Username,
          email: data.Email,
          password: data.Password,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user) {
          setSuccess(true);
        } else {
          setRegError(res.errors);
        }
      });
  };
  if (success) {
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  let regErrors;
  if (regError) {
    regErrors = Object.entries(regError);
  }

  return (
    <section className={classes.container}>
      <h1 className={classes.header}>Create new account</h1>
      <form className={classes.regForm} onSubmit={handleSubmit(handleOnSubmit)}>
        {regErrors && (
          <ul>
            {regErrors.map((error) => {
              return (
                <li
                  key={`${error[0]}-${error[1]}`}
                >{`${error[0]} ${error[1]}`}</li>
              );
            })}
          </ul>
        )}

        <label className={classes.regLabel} htmlFor="username">
          Username
          <FontAwesomeIcon
            icon={faCheck}
            className={
              !errors?.Username?.message && username
                ? classes.valid
                : classes.hide
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              !errors?.Username?.message ? classes.hide : classes.invalid
            }
          />
        </label>
        <input
          className={classes.regInput}
          {...register("Username", {
            required: true,
            pattern: {
              value: USER_REGEX,
              message:
                "username должен быть от 3 до 20 символов (включительно)",
            },
          })}
          type="text"
          id="username"
          placeholder="Username"
          autoComplete="off"
          required
          aria-invalid={!errors.Username ? "false" : "true"}
          aria-describedby="uidnote"
        />
        {errors.Username?.message && (
          <p id="uidnote" className={classes.instructions}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {errors?.Username?.message}
          </p>
        )}

        <label className={classes.regLabel} htmlFor="email">
          Email address
          <FontAwesomeIcon
            icon={faCheck}
            className={
              !errors?.Email?.message && email ? classes.valid : classes.hide
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={!errors?.Email?.message ? classes.hide : classes.invalid}
          />
        </label>
        <input
          {...register("Email", {
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: "email должен быть корректным почтовым адресом",
            },
          })}
          className={classes.regInput}
          type="text"
          id="email"
          placeholder="Email address"
          autoComplete="off"
          required
          aria-describedby="emailnote"
        />
        {errors.Email?.message && (
          <p id="emailnote" className={classes.instructions}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {errors?.Email?.message}
          </p>
        )}

        <label className={classes.regLabel} htmlFor="password">
          Password
          <FontAwesomeIcon
            icon={faCheck}
            className={
              !errors?.Password?.message && password
                ? classes.valid
                : classes.hide
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              !errors?.Password?.message ? classes.hide : classes.invalid
            }
          />
        </label>
        <input
          {...register("Password", {
            required: true,
            pattern: {
              value: PWD_REGEX,
              message:
                " password должен быть от 6 до 40 символов (включительно)",
            },
          })}
          className={classes.regInput}
          type="password"
          id="password"
          placeholder="Password"
          required
          aria-invalid={!errors.Password ? "false" : "true"}
          aria-describedby="pwdnote"
        />
        {errors.Password?.message && (
          <p id="pwdnote" className={classes.instructions}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {errors?.Password?.message}
          </p>
        )}

        <label className={classes.regLabel} htmlFor="confirm_pwd">
          Repeat Password
          <FontAwesomeIcon
            icon={faCheck}
            className={
              !errors?.repeatPassword?.message && confirm
                ? classes.valid
                : classes.hide
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              !errors?.repeatPassword?.message ? classes.hide : classes.invalid
            }
          />
        </label>
        <input
          {...register("repeatPassword", {
            required: true,
            validate: (value, formValues) => {
              if (value === formValues.Password) {
                return true;
              }
              return " password и repeat password должны совпадать";
            },
          })}
          className={classes.regInput}
          type="password"
          id="confirm_pwd"
          placeholder="Password"
          required
          aria-invalid={!errors.repeatPassword ? "false" : "true"}
          aria-describedby="confirmnote"
        />
        {errors.repeatPassword?.message && (
          <p id="confirmnote" className={classes.instructions}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {errors?.repeatPassword?.message}
          </p>
        )}

        <div className={classes.agreement}>
          <input
            className={classes.checkBox}
            type="checkbox"
            onChange={handleCheckBox}
          />
          <p>I agree to the processing of my personal information</p>
        </div>

        <button
          className={classes.regBtn}
          type="submit"
          disabled={!isAgreed ? true : false}
        >
          Create
        </button>
      </form>
      <p>
        Already have an account?
        <span className={classes.line}>
          <a href="/">Sign In</a>
        </span>
      </p>
    </section>
  );
};

export default Registration;
