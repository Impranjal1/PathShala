// contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { auth, firebaseService } from '../services/firebase';
import axios from 'axios';
import PropTypes from 'prop-types'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Update backend with user info after Firebase auth
  const updateUserInBackend = async (user, role = null) => {
    try {
      const token = await user.getIdToken();
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/update-user`, {
        uid: user.uid,
        email: user.email,
        role: role
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user in backend:', error);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, role) => {
    try {
      const user = await firebaseService.signUp(email, password);
      await updateUserInBackend(user, role);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      const user = await firebaseService.signIn(email, password);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in with Google
 // Inside AuthContext.jsx
const signInWithGoogle = async (role) => {
  try {
    const user = await firebaseService.signInWithGoogle();
    await updateUserInBackend(user, role);
    return user;
  } catch (error) {
    setError(error.message);
    throw error;
  }
};


  // Sign out
  const signOut = async () => {
    try {
      await firebaseService.signOut();
      setCurrentUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      await firebaseService.resetPassword(email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (displayName, photoURL) => {
    try {
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: displayName,
          photoURL: photoURL
        });
        setCurrentUser({ ...currentUser });
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get additional user data from backend
        try {
          const token = await user.getIdToken();
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCurrentUser({ ...user, ...response.data });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};