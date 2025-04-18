import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import TestInterface from './pages/TestInterface';
import TestResult from './pages/TestResult';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FeedbackProvider } from './contexts/FeedbackContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/global.css';
import './App.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  if (!user) {
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FeedbackProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
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
              <Route path="/payments" element={
                <ProtectedRoute>
                  <AuthLayout>
                    <Payments />
                  </AuthLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AuthLayout>
                    <Settings />
                  </AuthLayout>
                </ProtectedRoute>
              } />
              <Route path="/test-interface/:testId" element={
                <ProtectedRoute>
                  <AuthLayout>
                    <TestInterface />
                  </AuthLayout>
                </ProtectedRoute>
              } />
              <Route path="/test-result/:testId" element={
                <ProtectedRoute>
                  <AuthLayout>
                    <TestResult />
                  </AuthLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </FeedbackProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;