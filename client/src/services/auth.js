// // services/auth.js
// import axios from 'axios';
// import { firebaseService } from './firebase';

// const API_URL = import.meta.env.VITE_API_URL;

// axios.interceptors.request.use(async (config) => {
//   try {
//     const user = firebaseService.getCurrentUser();
//     if (user) {
//       const token = await user.getIdToken();
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// });

// export const authService = {
//   register: async (email, password, role) => {
//     try {
//       const firebaseUser = await firebaseService.signUp(email, password);
      
//       await axios.post(`${API_URL}/auth/register`, {
//         email,
//         role,
//         firebaseUid: firebaseUser.uid
//       });

//       return firebaseUser;
//     } catch (error) {
//       throw error;
//     }
//   },

//   login: async (email, password) => {
//     try {
//       const firebaseUser = await firebaseService.signIn(email, password);
//       const token = await firebaseUser.getIdToken();
      
//       const response = await axios.get(`${API_URL}/auth/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   googleLogin: async (role) => {
//     try {
//       const firebaseUser = await firebaseService.signInWithGoogle();
//       const token = await firebaseUser.getIdToken();

//       await axios.post(`${API_URL}/auth/update-user`, {
//         uid: firebaseUser.uid,
//         email: firebaseUser.email,
//         role
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       return firebaseUser;
//     } catch (error) {
//       throw error;
//     }
//   }
// };