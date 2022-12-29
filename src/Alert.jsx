const Alert = ({ msg, success }) => {
  return (
    <p className={`alert ${success ? "alert-success" : "alert-danger"}`}>
      {msg}
    </p>
  );
};

export default Alert;
