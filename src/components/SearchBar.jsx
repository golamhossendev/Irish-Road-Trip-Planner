import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const irishDestinations = [
    // { name: "Dublin", lat: 53.3498, lon: -6.2603, region: "Leinster", description: "Capital city" },
    { name: "Galway", lat: 53.2707, lon: -9.0568, region: "Connacht", description: "Cultural heart" },
    { name: "Cork", lat: 51.8985, lon: -8.4756, region: "Munster", description: "Rebel county" },
    { name: "Belfast", lat: 54.5973, lon: -5.9301, region: "Ulster", description: "Titanic city" },
    { name: "Cliffs of Moher", lat: 52.9719, lon: -9.4265, region: "Clare", description: "Natural wonder" },
    { name: "Ring of Kerry", lat: 52.0599, lon: -9.5044, region: "Kerry", description: "Scenic drive" },
    { name: "Giants Causeway", lat: 55.2408, lon: -6.5116, region: "Antrim", description: "UNESCO site" },
    { name: "Dingle Peninsula", lat: 52.1409, lon: -10.2707, region: "Kerry", description: "Wild beauty" },
  ];

  // Filter destinations based on typing
  const filteredDestinations = irishDestinations.filter(dest =>
    dest.name.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (destination) => {
    setQuery(destination.name);
    setIsOpen(false);
    // Passes the destination object (with lat/lon) to your API function
    onLocationSelect(destination);
  };

  return (
    <div className="w-full max-w-3xl mx-auto" ref={dropdownRef}>
      <div className="relative">
        <form onSubmit={(e) => e.preventDefault()} className="relative z-20">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search or select a destination..."
            className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-300 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 shadow-lg transition-all"
          />
          <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </form>

        {/* --- DROPDOWN LIST --- */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto overflow-x-hidden p-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => handleSelect(dest)}
                  className="w-full flex items-center p-3 hover:bg-green-50 rounded-xl transition-colors text-left group"
                >
                  <MapPin className="h-5 w-5 text-gray-400 group-hover:text-green-600 mr-3" />
                  <div>
                    <div className="font-bold text-gray-800">{dest.name}</div>
                    <div className="text-xs text-gray-500">{dest.region} • {dest.description}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No Irish destinations found.</div>
            )}
          </div>
        )}
      </div>

      {/* --- QUICK SELECTION CARDS --- */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-green-600" />
          Popular in Ireland
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {irishDestinations.slice(0, 4).map((dest) => (
            <button
              key={dest.name}
              onClick={() => handleSelect(dest)}
              className="bg-white border-2 border-transparent hover:border-green-500 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="font-bold text-gray-800 group-hover:text-green-600 truncate">
                {dest.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">{dest.region}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;