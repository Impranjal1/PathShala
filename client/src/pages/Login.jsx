import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

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
  
  const role = location.state?.role || 'student';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate(`/${role}/dashboard`);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          email,
          password,
          role
        });
        setShowVerification(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyEmail = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
        email,
        code: verificationCode
      });
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Register'} as {role}
        </h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        
        {!showVerification ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded mb-4"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
            
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white py-2 rounded mb-4"
            >
              Continue with Google
            </button>
            
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-blue-500"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </>
        ) : (
          <div>
            <p className="mb-4">Please enter the verification code sent to your email</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter verification code"
            />
            <button
              onClick={verifyEmail}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Verify Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;