import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, rtDB } from "../services/firebase";
import { toast } from "react-toastify";
import { onDisconnect, OnDisconnect, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  const INACTIVITY_TIME_LIMIT = 30 * 60 * 1000;

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);

        if (user) {
          handleUserStatus(user.uid, true);
        }
      });

      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, INACTIVITY_TIME_LIMIT);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);

    logoutTimer = setTimeout(async () => {
      await logout();
    }, INACTIVITY_TIME_LIMIT);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  const register = async (email, password) => {
    try {
      const makeNewUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (makeNewUser) {
        const user = makeNewUser.user;
        setCurrentUser(user);

        nav("/");

        toast.success("Register Success!", {
          position: "top-right",
        });
        handleUserStatus(user.uid, true);
      }
      return;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const signin = async (email, password) => {
    try {
      const checkUser = await signInWithEmailAndPassword(auth, email, password);
      const user = checkUser.user;
      setCurrentUser(user);

      toast.success("Sign In Success!", {
        position: "top-right",
      });
      handleUserStatus(user.uid, true);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const signWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const checkUserGoogle = await signInWithPopup(auth, provider);
      const user = checkUserGoogle;
      setCurrentUser(user);

      toast.success("Sign with Google Success!", {
        position: "top-right",
      });

      handleUserStatus(user.uid, true);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        handleUserStatus(currentUser.uid, false);
      }
      await signOut(auth);
      setCurrentUser(null);
      localStorage.clear();

      toast.success("Logout successful, see you again soon!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleUserStatus = (uid, isOnline) => {
    const userStatusRef = ref(rtDB, `users/${uid}/status`);

    set(userStatusRef, {
      online: isOnline,
      lastSeen: Date.now(),
    });

    const offlineStatus = {
      online: false,
      lastSeen: Date.now(),
    };

    onDisconnect(userStatusRef).set(offlineStatus);
  };

  const value = {
    currentUser,
    register,
    signin,
    signWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
