import { Routes, Route } from 'react-router-dom';
import Hero from "./pages/Hero"
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import CoachingDashboard from './pages/coaching/Dashboard';
import Bookmarks from './pages/student/Bookmarks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/bookmarks" element={<Bookmarks />} />
      <Route path="/coaching/dashboard" element={<CoachingDashboard />} />
      <Route path="/coaching/onboarding" element={<CoachingDashboard />} />
    </Routes>
  );
}

export default App;