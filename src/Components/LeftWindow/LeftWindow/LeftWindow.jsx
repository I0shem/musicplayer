import React from "react";
import MiniMenu from "../LeftWindow/MiniMenu/MiniMenu.jsx";

import Player from "../LeftWindow/Player/Player.jsx";
import style from "./LeftWindow.module.css";

const LeftWindow = (props) => {
  return (
    <div className={style.LeftWindow}>
      <MiniMenu id="MiniMe" />
      <Player />
    </div>
  );
};

export default LeftWindow;
