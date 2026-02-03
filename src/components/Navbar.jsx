import React from 'react';
import { MapPin, Navigation, Cloud, Fuel, Sunrise, Search, ChartBarIncreasing, Van, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  
  // Check if user is logged in (checking localStorage)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/'); // Send user home after logout
    window.location.reload(); // Refresh to update navbar state
  };

  return (
    <nav className="bg-gradient-to-r from-ireland-green to-celtic-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <MapPin className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Irish Road Trip Planner</h1>
              <p className="text-sm text-green-100">Explore the Famous Cities of Ireland</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-ireland-orange transition flex items-center space-x-2">
              <Navigation className="h-5 w-5" />
              <span>Home</span>
            </Link>
           
            <Link to="/weather" className="hover:text-ireland-orange transition flex items-center space-x-2">
              <Cloud className="h-5 w-5" />
              <span>Weather</span>
            </Link>
        
         {/* CONDITIONAL LOGIC STARTS HERE */}
            {isLoggedIn ? (
              <>
               <Link to="/plan" className="hover:text-ireland-orange transition flex items-center space-x-2">
              <Van className="h-5 w-5" />
              <span>Plan Trip</span>
            </Link>
                {/* Show Progress only if Logged In */}
                <Link to="/progress" className="hover:text-ireland-orange transition flex items-center space-x-2">
                  <ChartBarIncreasing className="h-5 w-5" />
                  <span>Progress</span>
                </Link>
                
                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500 px-3 py-1 rounded-md transition border border-red-400 flex items-center space-x-1"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* Show Login only if Not Logged In */
              <Link to="/login" className="bg-white text-ireland-green px-4 py-2 rounded-lg font-bold hover:bg-ireland-orange hover:text-white transition flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;