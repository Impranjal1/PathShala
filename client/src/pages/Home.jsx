import { useNavigate } from 'react-router-dom'; 
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Pathshala</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Your journey to academic excellence starts here. Connect with the best coaching centers near you and start learning today!
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Get Started
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Students */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center text-center border-t-4 border-blue-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaGraduationCap className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">For Students</h2>
            <p className="text-gray-600 mb-6">
              Find top coaching centers near you and elevate your learning experience. Take the first step towards academic success!
            </p>
            <button
              onClick={() => navigate('/login', { state: { role: 'student' } })}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Join as Student
            </button>
          </motion.div>

          {/* For Coaching Centers */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center text-center border-t-4 border-green-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaUniversity className="text-6xl text-green-500 mb-4" />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">For Coaching Centers</h2>
            <p className="text-gray-600 mb-6">
              Expand your reach by registering your coaching center. Connect with students and help them achieve their academic goals!
            </p>
            <button
              onClick={() => navigate('/login', { state: { role: 'coaching' } })}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Register Coaching Center
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;