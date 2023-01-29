import React, { Component } from "react";
import propTypes from "prop-types";

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something is wrong !!!</h1>;
    }
    return children;
  }
}

ErrorBoundry.defaultProps = {
  children: {},
};
ErrorBoundry.propTypes = {
  children: propTypes.object,
};
export default ErrorBoundry;
