import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  const redirectToMainPage = () => {
    history.push("/");
  };

  return (
    <div>
      <h3>404: Page not found</h3>
      <button onClick={redirectToMainPage}>Go back to main page</button>
    </div>
  );
};

export default NotFound;
