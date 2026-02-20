import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiHome, FiStar, FiDollarSign, FiUser } from 'react-icons/fi';

// We'll create these components next
const Home = () => <div className="p-8">Home Page</div>;
const Astrology = () => <div className="p-8">Astrology Page</div>;
const Crypto = () => <div className="p-8">Crypto Page</div>;
const Profile = () => <div className="p-8">Profile Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 fixed w-full z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold glow-text">
                🌌 Cosmic Portfolio
              </Link>
              
              <div className="flex space-x-6">
                <Link to="/" className="flex items-center space-x-1 hover:text-purple-400">
                  <FiHome /><span>Home</span>
                </Link>
                <Link to="/astrology" className="flex items-center space-x-1 hover:text-purple-400">
                  <FiStar /><span>Astrology</span>
                </Link>
                <Link to="/crypto" className="flex items-center space-x-1 hover:text-purple-400">
                  <FiDollarSign /><span>Crypto</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-purple-400">
                  <FiUser /><span>Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;