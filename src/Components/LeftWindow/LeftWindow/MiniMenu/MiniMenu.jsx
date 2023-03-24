import React from "react";
import s from "./MiniMenu.module.css";
import MiniMenuBox from "./MiniMenuBox";
import { ReactComponent as Sprite1 } from "../../../Icons/frame-1.svg";
import { ReactComponent as Sprite2 } from "../../../Icons/frame-2.svg";
import { ReactComponent as Sprite3 } from "../../../Icons/frame-3.svg";
import { Outlet } from "react-router-dom";
import Authentication from "./../../../Authentication/auth";

const MiniMenu = () => {
  return (
    <div className={s.MiniMenu}>
      <ul>
        <div className={s.Auth}>
          <Authentication />
        </div>
        <MiniMenuBox text="Home" To="/m" Sprite={Sprite1}></MiniMenuBox>
        <MiniMenuBox
          text="Search"
          To="/m/SearchPage"
          Sprite={Sprite2}
        ></MiniMenuBox>
        <MiniMenuBox
          text="Library"
          To="/m/LibraryPage"
          Sprite={Sprite3}
        ></MiniMenuBox>
      </ul>
      <Outlet />
    </div>
  );
};

export default MiniMenu;
