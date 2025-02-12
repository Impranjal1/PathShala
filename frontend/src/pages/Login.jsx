import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { 
  ArrowRight, 
  Mail, 
  Lock, 
//   Student, 
  School,
  CheckCircle
} from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type');
  const navigate = useNavigate();
  const { googleSignIn, emailSignIn, emailSignUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isSignUp) {
//         await emailSignUp(email, password);
//       } else {
//         await emailSignIn(email, password);
//       }
//       navigate(userType === 'student' ? '/student/dashboard' : '/coaching/onboarding');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate(userType === 'student' ? '/student/dashboard' : '/coaching/onboarding');
    } catch (error) {
      setError(error.message);
    }
  };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     try {
//       if (isSignUp) {
//         const result = await emailSignUp(email, password);
        
//         // Send Email Verification
//         await result.user.sendEmailVerification();
//         alert('Verification email sent. Please check your inbox.');
  
//         // Store User Data in MongoDB
//         await fetch('http://localhost:5000/api/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             uid: result.user.uid,
//             email: result.user.email,
//             userType: userType
//           }),
//         });
  
//         // Poll for email verification
//         const interval = setInterval(async () => {
//           await result.user.reload();
//           if (result.user.emailVerified) {
//             clearInterval(interval);
//             navigate(userType === 'student' ? '/student/dashboard' : '/coaching/onboarding');
//           }
//         }, 3000);
        
//       } else {
//         const result = await emailSignIn(email, password);
//         if (!result.user.emailVerified) {
//           throw new Error('Please verify your email before signing in.');
//         }
//         navigate(userType === 'student' ? '/student/dashboard' : '/coaching/onboarding');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        const result = await emailSignUp(email, password);
  
        // Show a success message and stop navigation
        alert('Verification email sent. Please check your inbox and verify your email.');
  
        // Keep checking if the user has verified their email
        const interval = setInterval(async () => {
          await result.user.reload();
          if (result.user.emailVerified) {
            clearInterval(interval); // Stop checking
            navigate(userType === 'student' ? '/student/dashboard' : '/coaching/onboarding');
          }
        }, 3000); // Check every 3 seconds
  
      } else {
        const result = await emailSignIn(email, password);
        if (!result.user.emailVerified) {
          throw new Error('Please verify your email before signing in.');
        }
        navigate(userType === 'student' ? '/student/dashboard' : '/coaching/onboarding');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  
  const features = [
    { text: "Access to top coaching centers", forType: "student" },
    { text: "Personalized learning path", forType: "student" },
    { text: "Track your progress", forType: "student" },
    { text: "Get real-time tutor feedback", forType: "student" },
    { text: "Book sessions with expert tutors", forType: "student" },
    { text: "Access to study materials and resources", forType: "student" },
    { text: "Participate in peer-to-peer learning", forType: "student" },
  
    { text: "Reach more students", forType: "coaching" },
    { text: "Manage your institute", forType: "coaching" },
    { text: "Analytics and insights", forType: "coaching" },
    { text: "Student performance tracking", forType: "coaching" },
    { text: "Automated scheduling and reminders", forType: "coaching" },
    { text: "Create and manage multiple courses", forType: "coaching" },
    { text: "Receive student feedback", forType: "coaching" },
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      {/* Left Panel - Features */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-12 flex-col justify-between"
      >
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-6"
          >
            Welcome to Pathshala
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 mb-12"
          >
            {userType === 'student' 
              ? "Start your learning journey with the best educators" 
              : "Expand your reach and connect with more students"}
          </motion.p>

          <div className="space-y-6">
            {features
              .filter(f => f.forType === userType)
              .map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-blue-300" />
                  <span className="text-lg text-blue-100">{feature.text}</span>
                </motion.div>
              ))}
          </div>
        </div>

        <div className="text-blue-200 text-sm">
          © 2025 Pathshala. All rights reserved.
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              {userType === 'student' ? (
                <School className="h-12 w-12 text-blue-600" />
              ) : (
                <School className="h-12 w-12 text-blue-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 text-center mb-8">
              {isSignUp 
                ? 'Join us to start your journey' 
                : 'Please enter your details to sign in'}
            </p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-lg flex items-center justify-center group"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <FcGoogle className="mr-2 text-xl" />
              Continue with Google
            </motion.button>

            <p className="text-center text-gray-600 mt-8">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 font-medium ml-2"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;