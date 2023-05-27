import React from "react";
import s from "./LoginWindow.module.css";
import Authentication from "../auth";

const LoginWindow = () => {
  return (
    <div className={s.LoginScreen}>
      <div className={s.LoginMenu}>
        Login to continue:
        <div className={s.Auth}>
          <Authentication />
        </div>
      </div>
    </div>
  );
};

export default LoginWindow;
