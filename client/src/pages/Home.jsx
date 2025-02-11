import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Pathshala</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">For Students</h2>
            <p className="mb-4">Find the best coaching centers near you</p>
            <button
              onClick={() => navigate('/login', { state: { role: 'student' } })}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Join as Student
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">For Coaching Centers</h2>
            <p className="mb-4">Register your coaching center and reach more students</p>
            <button
              onClick={() => navigate('/login', { state: { role: 'coaching' } })}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Register Coaching Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;