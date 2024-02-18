import React from "react";
import s from "./UserInfo.module.css";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../Authentication/firebase";
import { SignOut } from "../../../redux/Actions";
import { useDispatch } from "react-redux";
import NotFound from "../../Images/not-found.jpg";
const UserInfoBox = ({ userInfoBox, setUserInfoBox }) => {
  const UserInfo = useSelector((state) => state.User).userInfo;
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    dispatch(SignOut());
    setUserInfoBox(false);
  };
  return (
    <>
      {userInfoBox ? (
        <div
          className={s.UserInfoContainer}
          onClick={() => setUserInfoBox(false)}
        >
          <div className={s.UserInfo} onClick={(e) => e.stopPropagation()}>
            <div onClick={() => setUserInfoBox(false)} className={s.Exit}>
              X
            </div>
            <ul>
              <li>
                <img
                  loading="lazy"
                  className={s.userImg}
                  src={UserInfo.photoURL}
                  alt="File not found"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = NotFound; // Replace with default image
                  }}
                />
              </li>
              <li>{UserInfo.name}</li>
              <li>{UserInfo.email}</li>
            </ul>
            <span className={s.Logout} onClick={handleSignOut}>
              Sign out
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserInfoBox;
