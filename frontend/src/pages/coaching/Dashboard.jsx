import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [coachingData, setCoachingData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    centerName: '',
    description: '',
    subjects: [],
    address: '',
    phone: ''
  });

  useEffect(() => {
    fetchCoachingData();
  }, []);

  const fetchCoachingData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/coaching/profile`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` }
      });
      setCoachingData(response.data);
      setFormData(response.data);
    } catch (error) {
      setError('Failed to fetch coaching data. Please try again.');
      console.error('Error fetching coaching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/coaching/profile`,
        formData,
        { headers: { Authorization: `Bearer ${await user.getIdToken()}` } }
      );
      setCoachingData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('photo', file);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/coaching/upload-photo`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${await user.getIdToken()}`
          }
        }
      );
      fetchCoachingData();
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <header className="bg-white shadow p-6 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Coaching Center Dashboard</h1>
      </header>

      <main className="max-w-4xl mx-auto py-6">
        <div className="bg-white shadow rounded-lg p-6">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              {['centerName', 'description', 'address', 'phone'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'phone' ? 'tel' : 'text'}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Subjects</label>
                <select
                  multiple
                  value={formData.subjects}
                  onChange={(e) => setFormData({
                    ...formData,
                    subjects: Array.from(e.target.selectedOptions, (option) => option.value)
                  })}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                >
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map((subject) => (
                    <option key={subject} value={subject.toLowerCase()}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{coachingData.centerName}</h2>
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
              </div>
              <p className="text-gray-600">{coachingData.description}</p>
              <div className="mt-6">
                <h3 className="font-semibold">Subjects Offered</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {coachingData.subjects?.map((subject) => (
                    <span key={subject} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{subject}</span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold">Center Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {coachingData.photos?.map((photo, index) => (
                    <img key={index} src={photo} alt={`Photo ${index + 1}`} className="w-full h-40 object-cover rounded" />
                  ))}
                </div>
                <div className="mt-4">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer inline-block">Add Photo</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
