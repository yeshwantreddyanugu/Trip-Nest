import React, { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';


const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hotels');
  const [selectedLocation, setSelectedLocation] = useState('Goa');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const uid = localStorage.getItem('firebaseUID');
  const isGuest = !uid;

  const tabs = [
    { id: 'hotels', label: 'Hotels', icon: '🏨' },
    { id: 'resorts', label: 'Resorts', icon: '🏝️' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚗' }
  ];

  const popularCities = ['Goa', 'Manali', 'Udaipur', 'Hyderabad', 'Pondicherry', 'Mumbai', 'Delhi', 'Bangalore', 'uppal'];

  const handleSearch = () => {
    if (isGuest) {
      navigate('/auth');
      return;
    }

    const searchParams = new URLSearchParams();

    if (activeTab === 'hotels') {
      if (selectedLocation) searchParams.set('city', selectedLocation);
      if (checkIn) searchParams.set('fromDate', checkIn);
      if (checkOut) searchParams.set('toDate', checkOut);
      navigate(`/hotels?${searchParams.toString()}`);
    } else if (activeTab === 'resorts') {
      if (selectedLocation) searchParams.set('location', selectedLocation);
      if (checkIn) searchParams.set('checkIn', checkIn);
      if (checkOut) searchParams.set('checkOut', checkOut);
      navigate(`/resorts?${searchParams.toString()}`);
    } else if (activeTab === 'vehicles') {
      if (selectedLocation) searchParams.set('location', selectedLocation);
      if (checkIn) searchParams.set('fromDate', checkIn);
      if (checkOut) searchParams.set('toDate', checkOut);
      navigate(`/vehicles?${searchParams.toString()}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          ✈️
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-pulse">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          ☁️
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Hero Text */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Book hotels, resorts, and vehicles with premium experiences at unbeatable prices
          </p>
        </div>

        {/* Search Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl p-6 md:p-8 animate-scale-in">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (isGuest && tab.id !== 'hotels') {
                    toast({
                      title: "Please Sign Up First",
                      description: "You must sign-up to use this website.",
                      // variant: "destructive",
                    });
                    return;
                  }
                  setActiveTab(tab.id);
                }}

                className={`flex items-center px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
              >
                <span className="mr-2 text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {activeTab === 'vehicles' ? 'Pick-up Location' : 'Where to?'}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => !isGuest && setSelectedLocation(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {popularCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {activeTab === 'vehicles' ? 'From Date' : 'Check In'}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => !isGuest && setCheckIn(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* To Date */}
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {activeTab === 'vehicles' ? 'To Date' : 'Check Out'}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => !isGuest && setCheckOut(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ✅ Search Button - Only redirects if guest */}
            <Button
              size="lg"
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Now
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-in">
          {[
            { number: '10,000+', label: 'Hotels' },
            { number: '5,000+', label: 'Resorts' },
            { number: '3,000+', label: 'Vehicles' },
            { number: '1M+', label: 'Happy Travelers' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
