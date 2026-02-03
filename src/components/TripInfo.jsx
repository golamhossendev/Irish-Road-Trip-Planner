import React from 'react';
import { Navigation, Clock, Fuel, Cloud, Package, Wind, Thermometer, MapPin } from 'lucide-react';
import WeatherComponent from './Weather';
import { baseCoords } from '../utils/utils';

const TripInfo = ({ tripData }) => {
  
  

  if (!tripData) {
    return (
      <div className="card max-w-4xl mx-auto">
        <div className="text-center py-8">
          <Navigation className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No Trip Planned Yet</h3>
          <p className="text-gray-500">Search for a destination to plan your Irish road trip!</p>
        </div>
      </div>
    );
  }

  const {
    destination,
    distance,
    duration,
    roadConditions,
    essentials
  } = tripData;

    const currentDest = destination ? baseCoords[destination.name] : baseCoords['Galway'];

    console.log(currentDest,"<<<<<<<currentDest");
    
  // Calculate estimated costs
  const fuelCost = (distance / 100 * 8.5 * 1.6).toFixed(2); // Assuming 8.5L/100km and €1.60/L
  const tollCost = distance > 150 ? "€5-€15" : "€0-€5";
  console.log(tripData,"tripData");

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Trip to {destination.name}</h2>
            <p className="text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {destination.region}, Ireland
            </p>
          </div>
          <div className="bg-ireland-green text-white px-4 py-2 rounded-lg">
            <div className="text-sm">Estimated</div>
            <div className="font-bold">{duration}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Distance & Time */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-celtic-blue" />
              Journey Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{distance} km</div>
                <div className="text-sm text-gray-600">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{duration}</div>
                <div className="text-sm text-gray-600">Travel Time</div>
              </div>
            </div>
          </div>

          {/* Weather */}
         <WeatherComponent city={destination.name} lon={currentDest[0]} lat={currentDest[1]}/>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Cost Estimates */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <Fuel className="h-5 w-5 mr-2 text-amber-600" />
              Cost Estimates
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel (approx)</span>
                <span className="font-semibold">€{fuelCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tolls</span>
                <span className="font-semibold">{tollCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Budget</span>
                <span className="font-semibold">€80-€150</span>
              </div>
              <div className="pt-3 border-t border-amber-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total (approx)</span>
                  <span className="text-ireland-green">€{(parseFloat(fuelCost) + 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Essentials */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-ireland-green" />
              What You'll Need
            </h3>
            <ul className="space-y-2">
              {essentials.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-ireland-green rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Road Conditions */}
      {roadConditions && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-700 mb-2">⚠️ Road Conditions Advisory:</h4>
          <p className="text-gray-600">{roadConditions}</p>
        </div>
      )}
    </div>
  );
};

export default TripInfo;