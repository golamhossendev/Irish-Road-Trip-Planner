import React from 'react';
import { 
  Cloud, Thermometer, Wind, Droplets, 
  Sun, Sunrise, Sunset, Eye, Gauge 
} from 'lucide-react';

const WeatherDashboard = ({ data }) => {
  if (!data) return <div className="text-center p-10">No data available</div>;

  // Convert Unix timestamps to readable time
  const formatTime = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header / Search Area Mockup */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">{data.name}, {data.sys.country}</h1>
            <p className="text-slate-500">Live Weather Update</p>
          </div>
          <div className="text-right">
            <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium">
              {data.weather[0].description}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Temp Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl shadow-blue-100">
            <div className="flex justify-between items-start">
              <div className="text-6xl md:text-8xl font-black">
                {Math.round(data.main.temp)}°
              </div>
              <Cloud className="h-20 w-20 opacity-80" />
            </div>
            <div>
              <p className="text-xl opacity-90">Feels like {Math.round(data.main.feels_like)}°C</p>
              <div className="flex gap-4 mt-2">
                <span>H: {Math.round(data.main.temp_max)}°</span>
                <span>L: {Math.round(data.main.temp_min)}°</span>
              </div>
            </div>
          </div>

          {/* Sun & Moon Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-center space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunrise className="text-orange-400" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Sunrise</p>
                  <p className="font-bold">{formatTime(data.sys.sunrise)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sunset className="text-purple-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Sunset</p>
                  <p className="font-bold">{formatTime(data.sys.sunset)}</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center gap-3">
                <Gauge className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Pressure</p>
                  <p className="font-bold">{data.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={<Droplets className="text-blue-500" />} 
            label="Humidity" 
            value={`${data.main.humidity}%`} 
          />
          <StatCard 
            icon={<Wind className="text-teal-500" />} 
            label="Wind Speed" 
            value={`${(data.wind.speed * 3.6).toFixed(1)} km/h`} 
          />
          <StatCard 
            icon={<Eye className="text-indigo-500" />} 
            label="Visibility" 
            value={`${data.visibility / 1000} km`} 
          />
          <StatCard 
            icon={<Thermometer className="text-red-400" />} 
            label="Ground Level" 
            value={`${data.main.grnd_level} hPa`} 
          />
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-2 hover:shadow-md transition-shadow">
    <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
    <p className="text-xs text-slate-400 uppercase tracking-tighter">{label}</p>
    <p className="text-xl font-bold text-slate-800">{value}</p>
  </div>
);

export default WeatherDashboard;