import React from "react";

const ErrorHandling = (props) => {
  return (
    <div className="error-message">
      <p>{props.errorMessage}</p>
    </div>
  );
};

export default ErrorHandling;
