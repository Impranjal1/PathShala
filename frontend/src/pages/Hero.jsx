import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Contact from "../components/Contact"
import { GraduationCap, School, ArrowRight, Users, Book, Trophy } from 'lucide-react';


const Hero = () => {
    const navigate = useNavigate();
    
    const features = {
        student: [
          { icon: <Users className="w-5 h-5" />, text: "Connect with top educators" },
          { icon: <Book className="w-5 h-5" />, text: "Access quality study material" },
          { icon: <Trophy className="w-5 h-5" />, text: "Track your progress" }
        ],
        coaching: [
          { icon: <Users className="w-5 h-5" />, text: "Reach more students" },
          { icon: <Book className="w-5 h-5" />, text: "Manage courses easily" },
          { icon: <Trophy className="w-5 h-5" />, text: "Build your reputation" }
        ]
      };
    return (
        <>
            <Navbar />
            <div className="relative overflow-hidden">
      {/* Background with gradient and animated shapes */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-70 right-200 w-50 h-50 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-[600px] flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold leading-tight"
              >
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  Pathshala
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-blue-50"
              >
                Your journey to academic excellence starts here. Connect with the best coaching centers near you and start learning today!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex gap-4"
              >
                <button 
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
                <button 
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>

            {/* Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-full hidden md:block"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="w-full h-[500px]  backdrop-blur-lg rounded-2xl p-6">
                <img src="./study.png" alt=""  className=''/>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

                {/* Main Content */}
                <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Choose Your Path
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you re seeking knowledge or sharing it, we have the perfect platform for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Student Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-1 rounded-full"
                >
                  For Learners
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join as Student</h3>
              <p className="text-gray-600 mb-8">
                Start your learning journey with access to top coaching centers and expert guidance. Transform your academic future today!
              </p>

              <div className="space-y-4 mb-8">
                {features.student.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-600"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => navigate('/login?type=student')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-6 py-4 flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Coaching Center Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <School className="w-8 h-8 text-emerald-600" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full"
                >
                  For Educators
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Register Coaching Center</h3>
              <p className="text-gray-600 mb-8">
                Expand your reach and impact more students. Join our platform to showcase your expertise and grow your coaching business.
              </p>

              <div className="space-y-4 mb-8">
                {features.coaching.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-600"
                  >
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => navigate('/login?type=coaching')}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl px-6 py-4 flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 group"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
                <TestimonialCarousel />
                <Contact />
          
        </>
    );
};

export default Hero;

