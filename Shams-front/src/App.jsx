import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Library from './pages/Library';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tests from './pages/Tests';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import AIAssistant from './pages/AIAssistant';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Layout wrapper for authenticated routes
  const AuthLayout = ({ children }) => (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute>
            <AuthLayout>
              <Courses />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/course/:id" element={
          <ProtectedRoute>
            <AuthLayout>
              <CourseDetails />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/library" element={
          <ProtectedRoute>
            <AuthLayout>
              <Library />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/tests" element={
          <ProtectedRoute>
            <AuthLayout>
              <Tests />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/forum" element={
          <ProtectedRoute>
            <AuthLayout>
              <Forum />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <AuthLayout>
              <Profile />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/my-courses" element={
          <ProtectedRoute>
            <AuthLayout>
              <MyCourses />
            </AuthLayout>
          </ProtectedRoute>
        } />
        <Route path="/ai-assistant" element={
          <ProtectedRoute>
            <AuthLayout>
              <AIAssistant />
            </AuthLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;