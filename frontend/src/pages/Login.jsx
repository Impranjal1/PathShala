import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaSpinner, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const role = location.state?.role || 'student';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate(`/${role}/dashboard`);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          email,
          password,
          role
        });
        setShowVerification(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
        email,
        code: verificationCode
      });
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transition-all transform hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isLogin ? 'Login' : 'Register'} as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        {!showVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex justify-center items-center transition-all hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">Enter the verification code sent to your email</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Verification Code"
            />
            <button
              onClick={verifyEmail}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex justify-center items-center mt-4 transition-all hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : 'Verify Email'}
            </button>
          </div>
        )}
        <div className="my-4 text-center">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all hover:bg-red-600"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaGoogle className="mr-2" />} Continue with Google
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-blue-500 text-center mt-4 font-medium hover:underline"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;