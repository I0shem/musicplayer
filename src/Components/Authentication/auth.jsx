import { useState, useEffect } from "react";
import s from "./auth.module.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { NewUser } from "../../redux/Actions";
import { firebaseApp } from "./firebase";
import { useDispatch, useSelector } from "react-redux";

const Authentication = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);
  const googleAuthProvider = new GoogleAuthProvider();
  const isLoggedIn = useSelector((state) => state.User).isLoggedIn;
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
      }
    });
    return unsub;
  }, [auth]);
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      dispatch(NewUser(userInfo));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn === true ? (
        ""
      ) : (
        <div>
          <button className={s.SignInBtn} onClick={handleSignIn}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
