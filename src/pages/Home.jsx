import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  Navigation, 
  Cloud, 
  DollarSign, 
  Shield,
  Star,
  Users,
  Calendar
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Navigation className="h-10 w-10" />,
      title: "Smart Routing",
      description: "Find the most scenic routes across Ireland with intelligent pathfinding"
    },
    {
      icon: <Cloud className="h-10 w-10" />,
      title: "Live Weather",
      description: "Real-time weather updates for every stop on your journey"
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Budget Planning",
      description: "Accurate cost estimates for fuel, accommodation, and activities"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Safety First",
      description: "Road condition alerts and safety recommendations"
    }
  ];

  const popularTrips = [
    { from: "Dublin", to: "Galway", duration: "2h 30m", distance: "209.0 Km" },
    { from: "Dublin", to: "cork", duration: "3h 2m", distance: "251.5 km" },
    { from: "Dublin", to: " Belfast", duration: "1h 58m", distance: "165.2 km" },
    { from: "Dublin", to: "Cliffs of Moher", duration: "3h 21m", distance: "261.5 km" },
  ];

   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-ireland-green to-celtic-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Ireland's Magic
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
           Our smart planner will help you plan the ideal Irish road trip. Wild Atlantic Way to old castles and everything in between.
          </p>
          <Link to={isLoggedIn ? "/plan": "/login"}>
            <button className="bg-white text-ireland-green hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition duration-300 shadow-xl">
              Start Planning Your Adventure →
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Our Road Trip Planner?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition duration-300">
                <div className="text-ireland-green mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-grey-100">
            Popular Irish Routes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTrips.map((trip, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-ireland-green transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{trip.from} → {trip.to}</h4>
                    <p className="text-sm text-gray-500">Classic Irish Route</p>
                  </div>
                  <Star className="h-5 w-5 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{trip.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-semibold">{trip.distance}</span>
                  </div>
                </div>
                <Link to={isLoggedIn ? "/plan": "/login"}>
                  <button className="w-full mt-4 btn-primary text-sm">
                    Plan This Route
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-ireland-green mb-2">10,000+</div>
              <div className="text-gray-600">Trips Planned</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-celtic-blue mb-2">2,500 km</div>
              <div className="text-gray-600">of Irish Roads Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-ireland-orange mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Irish Adventure?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered Ireland's hidden gems with our planner.
          </p>
          <Link to={isLoggedIn ? "/plan": "/login"}>
            <button className="bg-gradient-to-r from-ireland-green to-celtic-blue hover:opacity-90 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 shadow-lg">
              Create Your Free Trip Plan Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;