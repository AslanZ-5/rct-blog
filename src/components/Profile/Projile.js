import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthUser } from "react-auth-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Profile.module.scss";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /.{3,20}/;
const PWD_REGEX = /.{6,60}/;

const Profile = () => {
  const auth = useAuthUser()();
  const [success, setSuccess] = useState(false);
  const [regError, setRegError] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      Username: auth?.username,
      Email: auth?.email,
      image: auth?.image,
    },
  });

  const username = watch("Username");
  const email = watch("Email");
  const password = watch("Password");
  const confirm = watch("repeatPassword");

  const handleOnSubmit = (data) => {
    console.log("ddd$$$$$$", data);
    fetch("https://blog.kata.academy/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("_auth")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: data.Username,
          email: data.Email,
          password: data.Password,
          image: data.image,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        Cookies.set(
          "_auth_state",
          JSON.stringify({
            username: res.user?.username,
            email: res.user?.email,
            image: res.user?.image,
          })
        );

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
          pathname: "/",
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
      <h1 className={classes.header}>Edit Profile</h1>
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
          Avatar image (url)
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
          {...register("image")}
          className={classes.regInput}
          type="text"
          id="image"
          placeholder="Avatar image"
          aria-describedby="imagenote"
        />
        {errors.repeatPassword?.message && (
          <p id="imagenote" className={classes.instructions}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {errors?.repeatPassword?.message}
          </p>
        )}

        <button className={classes.regBtn} type="submit">
          Edit
        </button>
      </form>
    </section>
  );
};

export default Profile;
