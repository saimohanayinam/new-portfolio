import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import Landing from './pages/Landing';
import ThemeSelection from './pages/ThemeSelection';
import AuthGuard from './components/AuthGuard';
import { useThemeStore, useAuthStore } from './lib/store';

function App() {
  const { theme } = useThemeStore();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
            
            {/* Protected routes */}
            <Route
              path="/theme-selection"
              element={
                <AuthGuard>
                  <ThemeSelection />
                </AuthGuard>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            
            {/* Portfolio routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/:username" element={<UserProfile />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;