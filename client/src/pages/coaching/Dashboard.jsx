import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const CoachingDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [coachingDetails, setCoachingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoachingDetails();
  }, []);

  const fetchCoachingDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/coaching/details`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
      setCoachingDetails(response.data);
      
      if (!response.data.hasRegistrationPaid) {
        navigate('/coaching/register');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coaching details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Coaching Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Center Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {coachingDetails.name}</p>
              <p><strong>Address:</strong> {coachingDetails.address}</p>
              <p><strong>Subjects:</strong> {coachingDetails.subjects.join(', ')}</p>
              <p><strong>Monthly Fees:</strong> ₹{coachingDetails.fees}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {coachingDetails.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Center photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingDashboard;