import * as React from "react";

interface IOwnProps {
  error: any;
}

const ErrorMessage: React.FC<IOwnProps> = (props) => {
  return (
    <>
      <div className="error">
        <small>{props.error.toString()}</small>
      </div>
    </>
  );
};

export default ErrorMessage;
