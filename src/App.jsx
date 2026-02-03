import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TripPlanner from "./pages/TripPlanner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WeatherApp from "./pages/WeatherApp";
import Progress from "./pages/Progress";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/login" element={<AuthPage />} />
            <Route
              path="/plan"
              element={
                <ProtectedRoute>
                  <TripPlanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
