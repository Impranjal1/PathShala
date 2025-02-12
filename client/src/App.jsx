import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import CoachingDashboard from './pages/coaching/Dashboard';
import CoachingRegistration from './pages/coaching/Registration';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/student/dashboard"
        element={
          // <ProtectedRoute role="student">
            <StudentDashboard />
          // {/* </ProtectedRoute> */}
        }
      />
      <Route
        path="/coaching/dashboard"
        element={
          <ProtectedRoute role="coaching">
            <CoachingDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coaching/register"
        element={
          <ProtectedRoute role="coaching">
            <CoachingRegistration />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;