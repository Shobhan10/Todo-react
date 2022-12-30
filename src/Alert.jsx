import { useEffect } from "react";

const Alert = ({ msg, type, hideAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [hideAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
