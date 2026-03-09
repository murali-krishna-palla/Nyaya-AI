import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import ChatPage from './pages/ChatPage';
import ComplaintPage from './pages/ComplaintPage';
import './index.css';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function AuthRoute({ children }) {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : children;
}

/**
 * App — Root component with routing, theme provider, auth provider, and layout shell.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth pages — no navbar/footer */}
            <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
            <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

            {/* App pages — with navbar/footer */}
            <Route
              path="*"
              element={
                <div className="flex flex-col min-h-screen bg-theme-bg font-sans">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
                      <Route path="/analysis" element={<ProtectedRoute><AnalysisPage /></ProtectedRoute>} />
                      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                      <Route path="/complaint" element={<ProtectedRoute><ComplaintPage /></ProtectedRoute>} />
                    </Routes>
                  </main>
                  <Footer />
                  <BottomNavigation />
                </div>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
