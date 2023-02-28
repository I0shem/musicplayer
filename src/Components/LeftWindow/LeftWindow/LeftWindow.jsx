import React from "react";
import MiniMenu from "../LeftWindow/MiniMenu/MiniMenu.jsx";
import TrackImage from "../LeftWindow/TrackImage/TrackImage.jsx";
import Player from "../LeftWindow/Player/Player.jsx";
import style from "./LeftWindow.module.css";

function RightWindow() {
  return (
    <div className={style.LeftWindow}>
      <MiniMenu id="MiniMe" />
      <TrackImage />
      <Player />
    </div>
  );
}

export default RightWindow;
