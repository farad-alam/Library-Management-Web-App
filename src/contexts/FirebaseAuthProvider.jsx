import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
// Google provider
const googleProvider = new GoogleAuthProvider();

function FirebaseAuthProvider({ children }) {
  // console.log("FIREBASE INITILIZE");
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //   auth loading
  const [isLoading, setisLoading] = useState(true);

  const register = (email, password) => {
    setisLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setisLoading(false)
    );
  };
  const updateUserProfile = (name, imgURL) => {
    setisLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgURL,
    }).finally(() => {
      setisLoading(false);
    });
  };

  const login = (email, password) => {
    setisLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
    {
      // console.log(user);
      return setisLoading(false);
    }

    );
  };
  const logout = () => {
    setisLoading(true);
    return signOut(auth);
  };

  const signWithGoogle = () => {
    setisLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setisLoading(false)
    );
  };

  const resetPasswordEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setisLoading(false);
        // console.log(user);
      } else {
        setUser(null);
        setisLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // const value = {
  //   user,
  //   login,
  //   register,
  //   logout,
  //   isLoading,
  // };

  const userAuthDetails = {
    auth,
    isLoading,
    user,
    register,
    login,
    logout,
    signWithGoogle,
    updateUserProfile,
    resetPasswordEmail,
  };
  return (
    <AuthContext.Provider value={userAuthDetails}>
      {children}
    </AuthContext.Provider>
  );
}

export default FirebaseAuthProvider;
