import React from "react";
import { Spin } from "antd";
import propTypes from "prop-types";
import classes from "./Spinner.module.scss";

const Spinner = ({ size }) => (
  <div className={classes.example}>
    <Spin size={size} />
  </div>
);
Spinner.defaultProps = {
  size: "default",
};
Spinner.propTypes = {
  size: propTypes.string,
};
export default Spinner;
