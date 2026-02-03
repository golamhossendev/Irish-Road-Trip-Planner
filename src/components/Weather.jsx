import React, { useState, useEffect } from "react";
import { Cloud, Thermometer, Wind, AlertCircle, Sunrise, Sunset } from "lucide-react";

const WeatherComponent = ({ city, }) => {
 const formatTime = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const API_KEY = '0c64b9e957adb2b530a744b2b2aa94cf';
  
    const fetchByCity = async (cityName) => {
      setLoading(true);
      setError(null);
      try {
        // 1. Get Lat/Lon from City Name (Geocoding)
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();
  
        if (!geoData.length) throw new Error("City not found");
  
        const { lat, lon } = geoData[0];
  
        // 2. Use those coordinates in your main API
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
  

  console.log(weatherData, "<<<<<weather");

  // 1. Error Display
  if (error) {
    return (
      <div className="bg-red-50 p-5 rounded-xl text-red-600 flex items-center">
        <AlertCircle className="mr-2" /> Error: {error}
      </div>
    );
  }

  // 2. Loading Display
  return (
    <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-5 rounded-xl min-h-[140px]">
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
        <Cloud className="h-5 w-5 mr-2 text-sky-500" />
        Weather at {weatherData?.name}, {weatherData?.sys?.country}
      </h3>
      <p> {weatherData?.weather[0]?.description}</p>

      {!city ? (
        <p className="text-gray-500 italic">Please provide a city name...</p>
      ) : loading ? (
        <p className="text-gray-500 animate-pulse">Fetching live weather...</p>
      ) : weatherData ? (
        <>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <div className="text-2xl font-bold"> {Math.round(weatherData?.main.temp)}°C</div>
              <div className="text-gray-600"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-600">
              <Wind className="h-4 w-4 mr-1" />
              {(weatherData?.wind.speed * 3.6).toFixed(1)} km/h
            </div>
            <div className="text-sm text-gray-500">
              Feels like {Math.round(weatherData?.main?.feels_like)}°C
            </div>

          </div>
        </div>
   
          <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <Sunrise className="text-orange-400" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Sunrise</p>
                  <p className="font-bold">{formatTime(weatherData?.sys?.sunrise)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sunset className="text-purple-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Sunset</p>
                  <p className="font-bold">{formatTime(weatherData?.sys?.sunset)}</p>
                </div>
              </div>
            </div>
        </>
      ) : null}
    </div>
  );
};

export default WeatherComponent;
