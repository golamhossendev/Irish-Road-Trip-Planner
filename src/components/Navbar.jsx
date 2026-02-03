import React from 'react';
import { MapPin, Navigation, Cloud, Fuel, Sunrise } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
            <Link to="/plan" className="hover:text-ireland-orange transition flex items-center space-x-2">
              <Cloud className="h-5 w-5" />
              <span>Plan Trip</span>
            </Link>
            <Link to="/weather" className="hover:text-ireland-orange transition flex items-center space-x-2">
              <Sunrise className="h-5 w-5" />
              <span>Weather</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;