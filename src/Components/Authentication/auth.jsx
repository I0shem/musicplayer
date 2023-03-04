import { useState, useEffect } from "react";
import s from "./auth.module.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "./firebase";

const Authentication = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);
  const googleAuthProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
      }
    });
    return unsub;
  }, [auth]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user != null ? (
        <div className={s.Authentication}>
          <button className={s.SignOutBtn} onClick={handleSignOut}>
            Sign Out
          </button>
          <p>Signed in as {user.displayName}</p>
        </div>
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
