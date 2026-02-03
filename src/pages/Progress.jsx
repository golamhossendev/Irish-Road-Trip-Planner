import React, { useEffect, useState } from "react";
import {
  MapPin,
  Thermometer,
  Clock,
  Euro,
  CheckCircle,
  X,
  Navigation,
  Clock1,
  Milestone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Progress = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [userName, setUserName] = useState("Guest");
  const [tripToDelete, setTripToDelete] = useState(null);
  // 1. New state for database trips
  const [dbTrips, setDbTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user profile name
  const getProfileName = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const data = await res.json();
      if (res.ok) setUserName(data.name);
    } catch (e) {
      console.error("Profile fetch failed:", e);
    }
  };

  // 2. NEW: Fetch saved trips from database
  const fetchMyTrips = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/trips/my-trips", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const data = await res.json();
      if (res.ok) {
        setDbTrips(data);
      }
    } catch (e) {
      console.error("Trips fetch failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId) => {
    // Optional: Add a confirmation pop-up
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/trips/${tripId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (res.ok) {
        // Update the UI by filtering out the deleted trip
        setDbTrips(dbTrips.filter((trip) => trip._id !== tripId));
        setTripToDelete(null);
      } else {
        const data = await res.json();
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    getProfileName();
    fetchMyTrips();
  }, []);

  console.log(dbTrips, "<<<<<<<<<");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Hi <span className="text-green-600 capitalize">{userName}</span>{" "}
          <br />
          Your Saved Trips
        </h1>
        <Link
          to="/plan"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          Plan New Trip
        </Link>
      </header>

      {loading ? (
        <div className="text-center py-10">Loading your adventures...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 3. Map over dbTrips instead of mock data */}
          {dbTrips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-2"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="flex items-center text-lg font-semibold text-slate-700">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />{" "}
                      {trip.title}
                    </h2>
                    <div className="flex gap-16 justify-between items-center mt-2">
                      <div className="flex justify-between items-center gap-2 text-gray-400">
                        <Milestone />
                        <span className="text-2xl font-bold">
                          {trip.distance}km
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2 text-gray-400">
                        <Clock1 />{" "}
                        <span className="text-2xl font-bold text-gray-400 ">
                          {trip.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" /> Weather
                    </h3>
                    <p className="text-xl font-bold">
                      {trip.temperature}°C, {trip.condition}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-orange-700 mb-2 flex items-center">
                      <Euro className="w-4 h-4 mr-1" /> Fuel Estimate
                    </h3>
                    <p className="text-xl font-bold text-emerald-600">
                      {trip.fuel}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium"
                    onClick={() => setSelectedTrip(trip)}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setTripToDelete(trip._id)}
                    className="px-4 border border-red-200 text-red-500 hover:bg-red-50 py-2 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                  {/* Delete Confirmation Modal */}
                  {tripToDelete && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">
                            Delete Trip?
                          </h3>
                          <p className="text-slate-500 mb-6">
                            Are you sure you want to remove{" "}
                            <span className="font-semibold text-slate-700">
                              "{trip.title}"
                            </span>
                            ? This action cannot be undone.
                          </p>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setTripToDelete(null)}
                              className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(tripToDelete)}
                              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition shadow-lg shadow-red-200"
                            >
                              Yes, Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal - Updated to use DB fields */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-emerald-600" />
                {selectedTrip.title}
              </h2>
              <button
                onClick={() => setSelectedTrip(null)}
                className="p-1 hover:bg-gray-200 rounded-full transition"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <span className="text-xs font-bold text-blue-600 uppercase">
                    Route Details
                  </span>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-black text-blue-900">
                      {selectedTrip.distance}
                    </span>
                    <span className="text-blue-700 mb-1">
                      {selectedTrip.duration}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl">
                  <span className="text-xs font-bold text-orange-600 uppercase">
                    Fuel Estimate
                  </span>
                  <div className="mt-2 text-lg font-bold text-orange-900">
                    {selectedTrip.fuel}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Weather
                    </span>
                    <p className="text-lg font-bold text-slate-800">
                      {selectedTrip.temperature}°C, {selectedTrip.condition}
                    </p>
                  </div>
                </div>

                <div className="border border-emerald-100 bg-emerald-50/50 p-4 rounded-xl">
                  <span className="text-xs font-bold text-emerald-700 uppercase">
                    Packing List
                  </span>
                  <ul className="mt-2 space-y-2">
                    {selectedTrip.essentials.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-emerald-900"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
