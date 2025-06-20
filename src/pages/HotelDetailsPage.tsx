import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoomCard from '@/components/hotels/RoomCard';
import RoomFilters from '@/components/hotels/RoomFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, Users } from 'lucide-react';
import hotelsData from '@/data/hotels';
import roomsData from '@/data/rooms';

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  
  const [roomFilters, setRoomFilters] = useState({
    priceRange: [0, 15000],
    hasAC: false,
    maxOccupancy: '',
    availableOnly: false
  });
  const [roomSortBy, setRoomSortBy] = useState('price');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundHotel = hotelsData.find(h => h.id === hotelId);
      const hotelRooms = roomsData.filter(r => r.hotelId === hotelId);
      
      setHotel(foundHotel);
      setRooms(hotelRooms);
      setFilteredRooms(hotelRooms);
      setLoading(false);
    }, 1000);
  }, [hotelId]);

  useEffect(() => {
    applyRoomFilters();
  }, [rooms, roomFilters, roomSortBy]);

  const applyRoomFilters = () => {
    let filtered = [...rooms];

    // Apply price range filter
    filtered = filtered.filter(room =>
      room.pricePerNight >= roomFilters.priceRange[0] &&
      room.pricePerNight <= roomFilters.priceRange[1]
    );

    // Apply AC filter
    if (roomFilters.hasAC) {
      filtered = filtered.filter(room => room.amenities.includes('AC'));
    }

    // Apply occupancy filter
    if (roomFilters.maxOccupancy) {
      filtered = filtered.filter(room => room.capacity >= parseInt(roomFilters.maxOccupancy));
    }

    // Apply availability filter
    if (roomFilters.availableOnly) {
      filtered = filtered.filter(room => room.isAvailable);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (roomSortBy) {
        case 'price':
          return a.pricePerNight - b.pricePerNight;
        case 'priceHigh':
          return b.pricePerNight - a.pricePerNight;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return 0;
      }
    });

    setFilteredRooms(filtered);
  };

  const calculateNights = () => {
    if (!fromDate || !toDate) return 1;
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const nights = calculateNights();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full" />
            </div>
            <div>
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <p className="text-gray-600">The hotel you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}>
        <Header />
      </div>
      
      <div className="pt-16">
        {/* Hotel Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 mx-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
            <div className="lg:col-span-2">
              <img 
                src={hotel.images[0]} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-4">
              {hotel.images.slice(1, 3).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${hotel.name} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: hotel.starCategory }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{hotel.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                  <span className="text-gray-500">({hotel.reviewCount} reviews)</span>
                </div>
              </div>
              
              {fromDate && toDate && (
                <div className="mt-4 lg:mt-0 text-right">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Stay Duration</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {fromDate} to {toDate}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 text-lg">{hotel.description}</p>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <RoomFilters 
                filters={roomFilters} 
                onFiltersChange={setRoomFilters}
                sortBy={roomSortBy}
                onSortChange={setRoomSortBy}
              />
            </div>

            <div className="lg:w-3/4">
              <div className="space-y-6">
                {filteredRooms.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No rooms found matching your criteria.</p>
                  </div>
                ) : (
                  filteredRooms.map((room) => (
                    <RoomCard 
                      key={room.id} 
                      room={room} 
                      fromDate={fromDate}
                      toDate={toDate}
                      nights={nights}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetailsPage;
