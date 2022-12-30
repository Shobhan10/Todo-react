import { useEffect } from "react";

const Alert = ({ msg, type, hideAlert, todoList }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [todoList, hideAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
