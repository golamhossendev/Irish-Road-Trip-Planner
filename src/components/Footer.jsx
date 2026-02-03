import React from 'react';
import { Heart, Coffee, Map } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Map className="h-6 w-6 text-ireland-orange" />
              <h3 className="text-xl font-bold">Irish Road Trip Planner</h3>
            </div>
            <p className="text-gray-400 mt-2">Your guide to exploring Ireland's beauty</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400">
              Come with Golam Hassan  <Heart className="inline h-4 w-4 text-red-400" /> and 
              Enjoy a <Coffee className="inline h-4 w-4 text-amber-500" /> in Ireland
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © 2024 Road Trip Planner for Specific Place Ireland.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;