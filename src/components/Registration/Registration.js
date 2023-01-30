import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Registration.module.scss";

const Registration = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const USER_REGEX = /.{3,20}/;
  const PWD_REGEX = /.{6,60}/;
  const userRef = useRef();
  const errRef = useRef();

  const [isAgreed, setIsAgreed] = useState(false);
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  //   const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  const handleCheckBox = (e) => {
    const { checked } = e.target;
    setIsAgreed(checked);
  };
  return (
    <section className={classes.container}>
      <p
        ref={errRef}
        className={errMsg ? classes.errmsg : classes.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className={classes.header}>Create new account</h1>
      <form className={classes.regForm}>
        <label className={classes.regLabel} htmlFor="username">
          Username
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? classes.valid : classes.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !user ? classes.hide : classes.invalid}
          />
        </label>
        <input
          className={classes.regInput}
          type="text"
          id="username"
          ref={userRef}
          placeholder="Username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName
              ? classes.instructions
              : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          username должен быть от 3 до 20 символов (включительно)
        </p>
        <label className={classes.regLabel} htmlFor="email">
          Email address
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? classes.valid : classes.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? classes.hide : classes.invalid}
          />
        </label>
        <input
          className={classes.regInput}
          type="text"
          id="email"
          placeholder="Email address"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="uidnote"
          className={
            emailFocus && email && !validEmail
              ? classes.instructions
              : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          email должен быть не пустой, должен быть корректным почтовым адресом
        </p>

        <label className={classes.regLabel} htmlFor="password">
          Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? classes.valid : classes.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? classes.hide : classes.invalid}
          />
        </label>
        <input
          className={classes.regInput}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={
            pwdFocus && !validPwd ? classes.instructions : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          password должен быть от 6 до 40 символов (включительно)
        </p>

        <label className={classes.regLabel} htmlFor="confirm_pwd">
          Repeat Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? classes.valid : classes.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? classes.hide : classes.invalid}
          />
        </label>
        <input
          className={classes.regInput}
          type="password"
          id="confirm_pwd"
          placeholder="Password"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={
            matchFocus && !validMatch ? classes.instructions : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          password и repeat password должны совпадать
        </p>
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
          onClick={() => console.log("clicked")}
          type="button"
          disabled={
            !validName || !validPwd || !validMatch || !validEmail || !isAgreed
              ? true
              : false
          }
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
