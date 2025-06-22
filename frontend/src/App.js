import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeetComponent from './pages/videoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/history.jsx';
import Layout from './pages/layout.jsx';
import About from './pages/about.jsx';
import { AlertProvider } from './contexts/AlertContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <AlertProvider>
            <Routes>
              <Route path="/auth" element={<Authentication />} />
              <Route element={<Layout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
                <Route path=":url" element={<VideoMeetComponent />} />
              </Route>
            </Routes>
          </AlertProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;