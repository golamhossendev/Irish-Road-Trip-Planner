import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WeatherApp from './pages/WeatherApp';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<TripPlanner />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;