// import { createContext, useContext, useState, useEffect } from 'react';
// import { 
//   GoogleAuthProvider, 
//   signInWithPopup, 
//   signOut, 
//   onAuthStateChanged,
//   sendEmailVerification,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// } from 'firebase/auth';
// import { auth } from '../config/firebase';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const googleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const emailSignUp = async (email, password) => {
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       await sendEmailVerification(result.user);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const emailSignIn = async (email, password) => {
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     user,
//     loading,
//     googleSignIn,
//     emailSignUp,
//     emailSignIn,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    setAuthLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw new Error("Failed to sign in with Google. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const emailSignUp = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);
      return result;
    } catch (error) {
      console.error("Sign-Up Error:", error.message);
      throw new Error("Failed to create account. Please check your email and try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const emailSignIn = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Sign-In Error:", error.message);
      throw new Error("Invalid email or password. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw new Error("Failed to log out. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const authValue = useMemo(
    () => ({ user, loading, authLoading, googleSignIn, emailSignUp, emailSignIn, logout }),
    [user, loading, authLoading]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
