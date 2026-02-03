
import React, { useState } from 'react';
import { MapPin, Thermometer, Clock, Euro, CheckCircle, X, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Progress = () => {
const [selectedTrip, setSelectedTrip] = useState(null); // State for the Modal


  // This data would normally come from your database (MongoDB/Firebase/etc)
  const trips = [
    {
      id: 1,
      destination: "Trip to Cork",
      distance: "253 km",
      time: "3h 9m",
      weather: "5°C, Overcast",
      fuel: "€34.41",
      tolls: "€5-15",
      budget: "€80-150",
      total: "€134.41",
    packingList: ["Waterproof clothing", "Power bank", "Snacks", "First aid kit"]
    },
    {
      id: 2,
      destination: "Trip to beflast",
      distance: "252 km",
      time: "3h 9m",
      weather: "5°C, Overcast",
      fuel: "€34.41",
      tolls: "€5-15",
      budget: "€80-150",
      total: "€134.41",
      packingList: ["Waterproof clothing", "Power bank", "Snacks", "First aid kit"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Your Saved Trips</h1>
        <Link to="/plan" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
          Plan New Trip
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-2">
            <div className="p-6">
              {/* Header Info */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="flex items-center text-lg font-semibold text-slate-700">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" /> {trip.destination}
                  </h2>
                  <div className="flex gap-4 mt-2">
                    <span className="text-2xl font-bold">{trip.distance}</span>
                    <span className="text-2xl font-bold text-gray-400">{trip.time}</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Estimated {trip.time}</span>
              </div>

              {/* Weather & Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                    <Thermometer className="w-4 h-4 mr-1" /> Weather at {trip.destination}
                  </h3>
                  <p className="text-xl font-bold">{trip.weather}</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-orange-700 mb-2 flex items-center">
                    <Euro className="w-4 h-4 mr-1" /> Cost Estimates
                  </h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span>Fuel</span> <b>{trip.fuel}</b></div>
                    <div className="flex justify-between"><span>Tolls</span> <b>{trip.tolls}</b></div>
                    <div className="flex justify-between pt-2 border-t border-orange-200 mt-2">
                      <span className="font-bold">Total</span> <span className="text-emerald-600 font-bold">{trip.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium"
                onClick={() => setSelectedTrip(trip)}
                >View Details</button>
                <button className="px-4 border border-red-200 text-red-500 hover:bg-red-50 py-2 rounded-lg font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
          {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-emerald-600" />
                {selectedTrip.destination}
              </h2>
              <button 
                onClick={() => setSelectedTrip(null)}
                className="p-1 hover:bg-gray-200 rounded-full transition"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Side: Journey Stats */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <span className="text-xs font-bold text-blue-600 uppercase">Route Details</span>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-black text-blue-900">{selectedTrip.distance}</span>
                    <span className="text-blue-700 mb-1">{selectedTrip.time}</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-2 italic">{selectedTrip.details}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl">
                  <span className="text-xs font-bold text-orange-600 uppercase">Cost Breakdown</span>
                  <div className="mt-2 space-y-1 text-sm text-orange-900">
                    <div className="flex justify-between"><span>Fuel Estimate:</span> <b>{selectedTrip.fuel}</b></div>
                    <div className="flex justify-between"><span>Tolls:</span> <b>{selectedTrip.tolls}</b></div>
                    <div className="flex justify-between pt-2 border-t border-orange-200 font-bold text-lg">
                      <span>Total:</span> <span>{selectedTrip.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Weather & List */}
              <div className="space-y-4">
                <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Weather</span>
                    <p className="text-lg font-bold text-slate-800">{selectedTrip.weather}</p>
                  </div>
                  <Thermometer className="text-orange-500" />
                </div>

                <div className="border border-emerald-100 bg-emerald-50/50 p-4 rounded-xl">
                  <span className="text-xs font-bold text-emerald-700 uppercase">Packing List</span>
                  <ul className="mt-2 space-y-2">
                    {selectedTrip.packingList.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-emerald-900">
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
              <button 
                onClick={() => setSelectedTrip(null)}
                className="px-6 py-2 text-gray-600 font-semibold hover:text-gray-800 border border-red-600 rounded-md"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;