import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const history = useNavigate("/m");

  const redirectToMainPage = () => {
    history.push("/m");
  };

  return (
    <div onLoad={redirectToMainPage}>
      <h3>404: Page not found</h3>
      <button onClick={redirectToMainPage}>Go back to main page</button>
    </div>
  );
};

export default NotFound;
