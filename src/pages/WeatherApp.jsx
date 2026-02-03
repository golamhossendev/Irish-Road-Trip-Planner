import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import WeatherDashboard from './WeatherDashboard'; 

const WeatherApp = () => {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '0c64b9e957adb2b530a744b2b2aa94cf';

  const fetchByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) throw new Error("City not found");

      const { lat, lon } = geoData[0];

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await weatherRes.json();
      
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchByCity('Belfast');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      fetchByCity(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
         

          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search city (e.g. Ireland, Cork,dublin)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <button type="submit" className="hidden">Search</button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-slate-500 font-medium">Updating local weather...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
            <p className="font-bold">Oops!</p>
            <p>{error}. Please check the spelling and try again.</p>
          </div>
        ) : (
          <WeatherDashboard data={weatherData} />
        )}
      </main>
    </div>
  );
};

export default WeatherApp;