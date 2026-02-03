import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { baseCoords } from '../utils/utils';

const RoutingMachine = ({ destCoords, setRouteInfo }) => {
  const map = useMap();

  useEffect(() => {
 if (!map || !destCoords || !Array.isArray(destCoords)) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(53.3498, -6.2603),
        L.latLng(destCoords[0], destCoords[1])
      ],
      lineOptions: { styles: [{ color: '#9b1616ff', weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false
    }).addTo(map);

    // Event listener to get distance and time
    routingControl.on('routesfound', function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      setRouteInfo({
        distance: (summary.totalDistance / 1000).toFixed(1), // Meters to KM
        time: Math.round(summary.totalTime / 60) // Seconds to Minutes
      });
    });

    return () => map.removeControl(routingControl);
  }, [map, destCoords, setRouteInfo]);

  return null;
};

const RouteMap = ({ destination }) => {
  const [routeInfo, setRouteInfo] = useState({ distance: 0, time: 0 });


  const currentDest = destination ? baseCoords[destination.name] : baseCoords['Galway'];

  // Convert minutes to hours and minutes
  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Trip Details</h3>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Total Distance</p>
          <p className="text-2xl font-black text-blue-900">{routeInfo.distance} <span className="text-sm font-normal">KM</span></p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Estimated Time</p>
          <p className="text-2xl font-black text-green-900">{formatTime(routeInfo.time)}</p>
        </div>
      </div>

      <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-inner border border-gray-200">
        <MapContainer center={[53.3498, -6.2603]} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RoutingMachine destCoords={currentDest} setRouteInfo={setRouteInfo} />
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteMap;