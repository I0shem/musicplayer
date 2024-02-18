import React, { useState } from "react";
import s from "./MiniMenu.module.css";
import MiniMenuBox from "./MiniMenuBox";
import { ReactComponent as Sprite1 } from "../../../Icons/frame-1.svg";
import { ReactComponent as Sprite2 } from "../../../Icons/frame-2.svg";
import { ReactComponent as Sprite3 } from "../../../Icons/frame-3.svg";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOut } from "../../../../redux/Actions";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../../Authentication/firebase";
import UserInfoBox from "../../../Authentication/UserInfo/UserInfo";

const MiniMenu = () => {
  const userInfo = useSelector((state) => state.User).userInfo;
  const isLoggedIn = useSelector((state) => state.User).isLoggedIn;
  let name = userInfo.name;
  const checkLength = (name) => {
    if (name.length > 17) {
      let newName = name.slice(0, 23) + "...";
      return newName;
    } else {
      return name;
    }
  };
  const [userInfoBox, setUserInfoBox] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    dispatch(SignOut());
  };
  return (
    <div className={s.MiniMenu}>
      <div className={s.Auth}>
        {isLoggedIn ? (
          <>
            <div onClick={() => setUserInfoBox(true)} className={s.user}>
              Hi, {checkLength(name)}!
            </div>
            <span className={s.Logout} onClick={handleSignOut}>
              Sign out
            </span>
          </>
        ) : (
          ""
        )}
      </div>
      <div className={s.userBox}>
        <UserInfoBox
          userInfoBox={userInfoBox}
          setUserInfoBox={setUserInfoBox}
        />
      </div>
      <ul>
        <MiniMenuBox
          text="Home"
          To="/musicplayer"
          Sprite={Sprite1}
        ></MiniMenuBox>
        <MiniMenuBox
          text="Search"
          To="/musicplayer/SearchPage"
          Sprite={Sprite2}
        ></MiniMenuBox>
        <MiniMenuBox
          text="Library"
          To="/musicplayer/LibraryPage"
          Sprite={Sprite3}
        ></MiniMenuBox>
      </ul>
      <Outlet />
    </div>
  );
};

export default MiniMenu;
