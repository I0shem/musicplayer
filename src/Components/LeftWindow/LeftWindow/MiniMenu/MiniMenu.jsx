import React from "react";
import styles from "./MiniMenu.module.css";
import MiniMenuBox from "./MiniMenuBox";
import { ReactComponent as Sprite1 } from "../../../Icons/frame-1.svg";
import { ReactComponent as Sprite2 } from "../../../Icons/frame-2.svg";
import { ReactComponent as Sprite3 } from "../../../Icons/frame-3.svg";
import { Outlet } from "react-router-dom";

function MiniMenu() {
  return (
    <div className={styles.MiniMenu}>
      <ul>
        <MiniMenuBox text="Home" To="/" Sprite={Sprite1}></MiniMenuBox>
        <MiniMenuBox
          text="Search"
          To="/SearchPage"
          Sprite={Sprite2}
        ></MiniMenuBox>
        <MiniMenuBox
          text="Library"
          To="/LibraryPage"
          Sprite={Sprite3}
        ></MiniMenuBox>
      </ul>
      <Outlet />
    </div>
  );
}

export default MiniMenu;
