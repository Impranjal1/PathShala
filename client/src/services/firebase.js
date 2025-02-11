// services/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Auth Services
export const firebaseService = {
  // Sign up with email and password
  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      return userCredential.user;
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  // Send password reset email
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  // Send email verification
  sendVerificationEmail: async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
      }
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  }
};

// Error message handler
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email address is already registered';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/user-disabled':
      return 'User account has been disabled';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code';
    case 'auth/invalid-verification-id':
      return 'Invalid verification ID';
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later';
    default:
      return 'An error occurred during authentication';
  }
};