import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [coachingCenters, setCoachingCenters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyCoaching();
    }
  }, [userLocation]);

  const fetchNearbyCoaching = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/nearby-coaching`,
        {
          params: {
            lat: userLocation.lat,
            lng: userLocation.lng
          },
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
      setCoachingCenters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coaching centers:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nearby Coaching Centers</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coachingCenters.map((center) => (
          <div key={center._id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{center.name}</h2>
            <p className="text-gray-600 mb-4">{center.description}</p>
            <div className="mb-4">
              <img
                src={center.photos[0]}
                alt={center.name}
                className="w-full h-48 object-cover rounded"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Address: {center.address}</p>
              <p>Subjects: {center.subjects.join(', ')}</p>
              <p>Fees: ₹{center.fees}/month</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;