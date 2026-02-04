import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import TripInfo from "../components/TripInfo";
import RouteMap from "../components/RouteMap";
import { Download, Share2, Printer, Save } from "lucide-react";

const TripPlanner = () => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data generator for demonstration
  const generateMockTripData = (destination) => {
    // Calculate fake distance based on destination name
    const distanceMap = {
      Dublin: 0,
      Galway: 208,
      Cork: 253,
      Belfast: 167,
      "Cliffs of Moher": 265,
      "Ring of Kerry": 115,
      "Giants Causeway": 95,
      "Dingle Peninsula": 320,
    };

    const distance =
      distanceMap[destination.name] || Math.floor(Math.random() * 300) + 100;
    const hours = Math.floor(distance / 80);
    const minutes = Math.floor((distance % 80) / 1.33);
    const duration = `${hours}h ${minutes}m`;

    // Mock weather data
    const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Windy", "Foggy"];
    const randomCondition =
      weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

    // Mock essentials based on destination
    const essentialsMap = {
      Galway: [
        "Waterproof jacket",
        "Comfortable walking shoes",
        "Camera",
        "Irish phrasebook",
      ],
      "Cliffs of Moher": [
        "Warm layers",
        "Sturdy footwear",
        "Binoculars",
        "Windbreaker",
      ],
      "Ring of Kerry": [
        "Full tank of fuel",
        "Picnic supplies",
        "Swimwear",
        "Hiking gear",
      ],
      "Dingle Peninsula": [
        "Sea sickness tablets",
        "Waterproof bag",
        "Snorkel gear",
        "Local map",
      ],
    };

    const essentials = essentialsMap[destination.name] || [
      "Waterproof clothing",
      "Power bank",
      "Snacks",
      "First aid kit",
      "Road map",
    ];

    // Add weather-specific items
    if (randomCondition === "Rainy") {
      essentials.push("Umbrella", "Waterproof shoes");
    } else if (randomCondition === "Sunny") {
      essentials.push("Sunscreen", "Sunglasses", "Hat");
    }

    return {
      destination,
      distance: distance,
      duration: duration,
      weather: {
        temp: Math.floor(Math.random() * 15) + 8, // 8-23°C
        feelsLike: Math.floor(Math.random() * 15) + 6,
        condition: randomCondition,
        wind: Math.floor(Math.random() * 40) + 10, // 10-50 km/h
      },
      fuelEstimate: `${(distance / 15).toFixed(1)} liters`, // Assuming 15km/L
      roadConditions:
        distance > 200
          ? "Some mountain roads may be narrow. Drive carefully in rural areas."
          : "Main roads in good condition. Watch for local traffic.",
      essentials: essentials,
    };
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockDestination = {
        name: query,
        region: query.includes("Cliffs")
          ? "Clare"
          : query.includes("Ring")
            ? "Kerry"
            : query.includes("Giants")
              ? "Antrim"
              : query.includes("Dingle")
                ? "Kerry"
                : "Various",
        description: "Beautiful Irish destination",
      };

      const tripData = generateMockTripData(mockDestination);
      setCurrentTrip(tripData);
      setIsLoading(false);
    }, 1500);
  };

  const handleLocationSelect = (destination) => {
    setIsLoading(true);
    setTimeout(() => {
      const tripData = generateMockTripData(destination);
      setCurrentTrip(tripData);
      setIsLoading(false);
    }, 1000);
  };


  const handleSaveTrip = async (currentTrip) => {
  const token = localStorage.getItem('token');

  const tripData = {
    title: currentTrip.destination.name,
    distance: currentTrip.distance,
    duration: currentTrip.duration,
    temperature: currentTrip.weather.temp,
    condition: currentTrip.weather.condition,
    fuel: currentTrip.fuelEstimate,
    essentials: currentTrip.essentials
  };

  try {
    const res = await fetch('http://localhost:3000/api/trips/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(tripData)
    });

    const data = await res.json();
    if (res.ok) {
      alert("Trip saved successfully!");
    } else {
      console.error("Save failed:", data.error);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};


  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Plan Your Irish Road Trip
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Any destination can be searched in Ireland and a full travel
            arrangement is provided including distance. weather, prices, and all
            you should know.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchBar
            onSearch={handleSearch}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ireland-green mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-700">
              Planning your Irish adventure...
            </h3>
            <p className="text-gray-600">
              Calculating routes and checking weather conditions
            </p>
          </div>
        )}

        {/* Trip Results */}
        {!isLoading && currentTrip && (
          <>
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
           onClick={() => handleSaveTrip(currentTrip)}
                className="flex items-center space-x-2 btn-primary"
              >
                <Save className="h-5 w-5" />
                {isLoading ? <span>loading</span> : <span>Save Trip</span>}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                <Printer className="h-5 w-5" />
                <span>Print</span>
              </button>
            </div>

            {/* Trip Content */}
            <div className="space-y-8">
              <TripInfo tripData={currentTrip} />
              <RouteMap
                route={currentTrip}
                destination={currentTrip.destination}
              />
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !currentTrip && (
          <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl">
            <div className="max-w-lg mx-auto">
              <div className="text-6xl mb-6">🗺️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Start Your Irish Adventure
              </h3>
              <p className="text-gray-600 mb-8">
                Search for any destination in Ireland above. We'll show you:
              </p>
              <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>Distance & Time</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>Live Weather</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>Cost Estimates</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>What to Pack</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            💡 Tips for Irish Road Trips
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-3">🛣️ Road Rules</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Drive on the LEFT side</li>
                <li>• Speed limits in km/h</li>
                <li>• Roundabouts clockwise</li>
                <li>• Watch for sheep crossings</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-3">🌦️ Weather Prep</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• "Four seasons in one day" is real</li>
                <li>• Always carry a waterproof layer</li>
                <li>• Check local forecasts hourly</li>
                <li>• Coastal roads can be foggy</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-3">💰 Budget Tips</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Fuel cheaper outside cities</li>
                <li>• B&Bs offer best value</li>
                <li>• Many attractions are free</li>
                <li>• Buy snacks at supermarkets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
