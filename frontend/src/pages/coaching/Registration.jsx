import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CoachingRegistration = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    subjects: '',
    fees: '',
    photos: []
  });
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: Location, 3: Photos, 4: Payment

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: files
    }));
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setStep(3); // Move to photos step after location
      },
      (error) => {
        setError('Error getting location. Please try again.');
        console.log(error);
        
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!location) {
      setError('Please set your location first');
      setLoading(false);
      return;
    }

    try {
      // Create form data for file upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'photos') {
          formData.photos.forEach(photo => {
            formDataToSend.append('photos', photo);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('location', JSON.stringify(location));

      // Save coaching details
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/coaching/register`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );

      // Create Stripe payment session
      const stripe = await stripePromise;
      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/coaching/create-payment`,
        {
          coachingId: response.data._id
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );

      // Redirect to Stripe payment
      const result = await stripe.redirectToCheckout({
        sessionId: paymentResponse.data.sessionId
      });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering coaching center');
    } finally {
      setLoading(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.description || !formData.address || !formData.subjects || !formData.fees) {
        setError('Please fill in all fields');
        return false;
      }
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Register Your Coaching Center
          </h2>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {['Details', 'Location', 'Photos', 'Payment'].map((text, index) => (
                <div key={text} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500' :
                    step === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
                  } text-white font-semibold`}>
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Coaching Center Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subjects (comma separated)
                  </label>
                  <input
                    type="text"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Monthly Fees (₹)
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="text-center">
                <p className="mb-4">We need your coaching center s location to help students find you.</p>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Current Location
                </button>
                {location && (
                  <p className="mt-4 text-green-600">Location successfully captured!</p>
                )}
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Photos (max 5)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="photos"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                </div>
                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {formData.photos.length} photos selected
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {loading ? 'Processing...' : 'Complete Registration (₹500)'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoachingRegistration;