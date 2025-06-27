import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoomCard from '@/components/hotels/RoomCard';
import RoomFilters from '@/components/hotels/RoomFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, Users, Heart, Wifi, Tv, Coffee, Snowflake, Dumbbell } from 'lucide-react';

interface HotelData {
  id: string;
  name: string;
  location: string;
  images: string[];
  rating: number;
  reviewCount: number;
  amenities: string[];
  starCategory: number;
  description: string;
}

interface Room {
  id: string;
  hotelId: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  bedType: string;
  amenities: string[];
  isAvailable: boolean;
  mainImage: string;
}

const Base_url = `https://a0bd-2401-4900-1cb4-2028-78a2-eabb-c0cc-977d.ngrok-free.app`;

const HotelDetailsPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [hotel, setHotel] = useState<HotelData | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawRooms, setRawRooms] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;

  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  // Get passed hotel data from location state
  const passedTransformedHotel = location.state?.transformedHotel;
  const passedRawHotel = location.state?.rawHotel;
  const [rawHotelData, setRawHotelData] = useState<any>(passedRawHotel || null);

  useEffect(() => {
    console.log('🔍 Raw Hotel Data:', rawHotelData);
  }, [rawHotelData]);


  const [roomFilters, setRoomFilters] = useState({
    priceRange: [0, 150000] as [number, number],
    hasAC: false,
    maxOccupancy: '',
    availableOnly: false
  });
  const [roomSortBy, setRoomSortBy] = useState('price');

  useEffect(() => {
    console.log('[HotelDetailsPage] Component mounted with:', {
      hotelId,
      fromDate,
      toDate,
      passedState: location.state
    });

    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    console.log('[HotelDetailsPage] Starting data load...');
    setLoading(true);
    setError(null);

    const loadHotelData = () => {
      try {
        console.log('[HotelDetailsPage] Loading hotel data...');

        // Use passed data if available, otherwise create mock data
        const hotelData: HotelData = passedTransformedHotel ? {
          ...passedTransformedHotel,
          id: hotelId || 'unknown'
        } : {
          id: hotelId || 'unknown',
          name: `Hotel ${hotelId}`,
          location: 'Unknown',
          images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
          ],
          rating: 4.0,
          reviewCount: 100,
          amenities: ['Wi-Fi', 'AC'],
          starCategory: 3,
          description: 'A comfortable hotel stay'
        };

        console.log('[HotelDetailsPage] Setting hotel data:', hotelData);
        setHotel(hotelData);

        if (passedRawHotel) {
          console.log('[HotelDetailsPage] Setting raw hotel data:', passedRawHotel);
          setRawHotelData(passedRawHotel);
        }

        // Fetch rooms only if we don't have passed data
        if (!location.state?.rooms) {
          fetchRooms(hotelId || '');
        } else {
          console.log('[HotelDetailsPage] Using passed rooms data');
          const passedRooms = location.state.rooms;
          setRooms(passedRooms.transformed);
          setFilteredRooms(passedRooms.transformed);
          setRawRooms(passedRooms.raw);
          setLoading(false);
        }
      } catch (error) {
        console.error('[HotelDetailsPage] Error loading hotel data:', error);
        setError('Failed to load hotel data');
        setLoading(false);
      }
    };

    const fetchRooms = async (hotelId: string) => {
      try {
        console.log('📡 Fetching rooms for hotel ID:', hotelId);

        const response = await fetch(
          `${Base_url}/api/v1/rooms1/hotel/${hotelId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        console.log('✅ Rooms API response status:', response.status);

        if (!response.ok) {
          throw new Error(`❌ HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('📦 Raw API response:', responseData);

        const rawRooms = responseData.data;
        console.log('[HotelDetailsPage] Raw rooms data:', rawRooms);
        setRawRooms(rawRooms);

        if (!Array.isArray(rawRooms)) {
          console.error('❗ Unexpected format for rooms data:', responseData);
          throw new Error('Invalid rooms data format');
        }

        const transformedRooms: Room[] = rawRooms.map((room: any, index: number) => {
          console.log(`🔍 Room ${index + 1} raw:`, room);

          const transformed = {
            id: room.id?.toString() || Math.random().toString(36).substring(7),
            hotelId,
            name: room.roomType || 'Standard Room',
            pricePerNight: room.pricePerNight || 0,
            capacity: room.maxOccupancy || 2,
            size: room.roomSize || 'Standard',
            bedType: room.bedType || 'Double',
            amenities: room.roomAmenities?.split(',') || ['Wi-Fi', 'TV'],
            isAvailable: room.availableRooms > 0,
            mainImage: room.imageUrls?.find((img: any) => img.isPrimary)?.url ||
              room.imageUrls?.[0]?.url ||
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
          };

          console.log(`✅ Room ${index + 1} transformed:`, transformed);
          return transformed;
        });

        console.log('🏁 Final transformedRooms array:', transformedRooms);

        setRooms(transformedRooms);
        setFilteredRooms(transformedRooms);
        setLoading(false);

        if (transformedRooms.length === 0) {
          setError('No rooms found for this hotel.');
        } else {
          setError(null);
        }

      } catch (error) {
        console.error('🔥 Error fetching rooms:', error);
        setError('Failed to load rooms. Showing sample rooms instead.');
        setLoading(false);

        // Fallback sample rooms
        const sampleRooms: Room[] = [
          {
            id: '1',
            hotelId: hotelId || 'unknown',
            name: 'Standard Room',
            pricePerNight: 2500,
            capacity: 2,
            size: '300 sq ft',
            bedType: 'Double',
            amenities: ['Wi-Fi', 'TV', 'AC', 'Coffee Maker'],
            isAvailable: true,
            mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
          },
          {
            id: '2',
            hotelId: hotelId || 'unknown',
            name: 'Deluxe Room',
            pricePerNight: 4000,
            capacity: 3,
            size: '450 sq ft',
            bedType: 'Queen',
            amenities: ['Wi-Fi', 'TV', 'AC', 'Mini Bar', 'Gym Access'],
            isAvailable: true,
            mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
          }
        ];

        setRooms(sampleRooms);
        setFilteredRooms(sampleRooms);
      }
    };

    loadHotelData();
  }, [hotelId, passedTransformedHotel, passedRawHotel, location.state]);

  // Log when hotel or rooms data changes
  useEffect(() => {
    console.group('[HotelDetailsPage] Current Data State');
    console.log('Current Hotel Data:', {
      raw: rawHotelData,
      transformed: hotel
    });
    console.log('Current Rooms Data:', {
      raw: rawRooms,
      transformed: rooms
    });
    console.groupEnd();
  }, [hotel, rooms, rawHotelData, rawRooms]);

  useEffect(() => {
    console.log('[HotelDetailsPage] Applying room filters:', {
      filters: roomFilters,
      sortBy: roomSortBy,
      roomCount: rooms.length
    });
    applyRoomFilters();
  }, [rooms, roomFilters, roomSortBy]);

  const applyRoomFilters = () => {
    let filtered = [...rooms];
    console.log('[HotelDetailsPage] Initial room count:', filtered.length);

    // Price range filter
    filtered = filtered.filter(room =>
      room.pricePerNight >= roomFilters.priceRange[0] &&
      room.pricePerNight <= roomFilters.priceRange[1]
    );
    console.log('[HotelDetailsPage] After price filter:', filtered.length);

    // AC filter
    if (roomFilters.hasAC) {
      filtered = filtered.filter(room => room.amenities.includes('AC'));
      console.log('[HotelDetailsPage] After AC filter:', filtered.length);
    }

    // Occupancy filter
    if (roomFilters.maxOccupancy) {
      filtered = filtered.filter(room =>
        room.capacity >= parseInt(roomFilters.maxOccupancy)
      );
      console.log('[HotelDetailsPage] After occupancy filter:', filtered.length);
    }

    // Availability filter
    if (roomFilters.availableOnly) {
      filtered = filtered.filter(room => room.isAvailable);
      console.log('[HotelDetailsPage] After availability filter:', filtered.length);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (roomSortBy) {
        case 'price': return a.pricePerNight - b.pricePerNight;
        case 'priceHigh': return b.pricePerNight - a.pricePerNight;
        case 'capacity': return b.capacity - a.capacity;
        default: return 0;
      }
    });

    console.log('[HotelDetailsPage] Final filtered room count:', filtered.length);
    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const calculateNights = () => {
    if (!fromDate || !toDate) {
      console.log('[HotelDetailsPage] No dates provided, defaulting to 1 night');
      return 1;
    }
    try {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = Math.abs(to.getTime() - from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log('[HotelDetailsPage] Calculated nights:', diffDays);
      return Math.max(1, diffDays);
    } catch (error) {
      console.error('[HotelDetailsPage] Error calculating nights:', error);
      return 1;
    }
  };

  const nights = calculateNights();

  if (loading) {
    console.log('[HotelDetailsPage] Rendering loading state');
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
    console.log('[HotelDetailsPage] Rendering hotel not found state');
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <p className="text-gray-600">The hotel you're looking for doesn't exist.</p>
          <Link to="/hotels" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Browse all hotels
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  console.log('[HotelDetailsPage] Rendering hotel details for:', hotel.id);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-black/20 backdrop-blur-sm'
        }`}>
        <Header />
      </div>

      <div className="pt-16">
        {/* Hotel Hero Section with Image Overlay */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: hotel.starCategory }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <h1 className="text-4xl font-bold text-white mb-3">{hotel.name}</h1>

                <div className="flex items-center gap-2 text-gray-200 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{hotel.location}</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-semibold text-white">{hotel.rating}</span>
                    <span className="text-gray-200">({hotel.reviewCount} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-none">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-gray-200 text-lg mb-6">{hotel.description}</p>

                {fromDate && toDate && (
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg inline-block">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Stay Duration</span>
                    </div>
                    <p className="text-sm text-gray-200">
                      {fromDate} to {toDate}
                    </p>
                    <p className="text-lg font-bold text-white">
                      {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="container mx-auto px-4 mb-8 mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>

          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

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
              <div className="grid gap-6">
                {filteredRooms.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No rooms found matching your criteria.</p>
                    <button
                      onClick={() => {
                        console.log('[HotelDetailsPage] Resetting room filters');
                        setRoomFilters({
                          priceRange: [0, 15000],
                          hasAC: false,
                          maxOccupancy: '',
                          availableOnly: false,
                        });
                        setRoomSortBy('price');
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-800"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredRooms
                    .slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage)
                    .map((room, index) => {
                      const globalIndex = (currentPage - 1) * roomsPerPage + index;

                      return (
                        <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-200">
                          <div className="flex flex-col md:flex-row">
                            {/* Room Image */}
                            <div className="md:w-1/3 h-64 md:h-auto relative">
                              <img
                                src={room.mainImage}
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />

                              {/* Top Choice Badge (first two global rooms only) */}
                              {globalIndex < 2 && (
                                <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs font-medium z-10">
                                  Top Choice
                                </div>
                              )}

                              {/* Available Badge */}
                              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-medium z-10">
                                Available
                              </div>
                            </div>

                            {/* Room Details */}
                            <div className="p-6 md:w-2/3 flex flex-col">
                              <div className="mb-2">
                                <span className="text-green-600 text-sm font-medium">Available for your dates</span>
                              </div>

                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
                                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Users className="h-4 w-4" />
                                    <span>Sleeps {room.capacity}</span>
                                    <span>•</span>
                                    <span>{room.size}</span>
                                    <span>•</span>
                                    <span>{room.bedType} bed</span>
                                  </div>
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="flex flex-wrap gap-2 my-4">
                                {room.amenities.map((amenity, index) => {
                                  let icon = null;
                                  switch (amenity.toLowerCase()) {
                                    case 'wi-fi':
                                      icon = <Wifi className="h-4 w-4" />;
                                      break;
                                    case 'tv':
                                      icon = <Tv className="h-4 w-4" />;
                                      break;
                                    case 'ac':
                                      icon = <Snowflake className="h-4 w-4" />;
                                      break;
                                    case 'coffee maker':
                                      icon = <Coffee className="h-4 w-4" />;
                                      break;
                                    case 'gym access':
                                      icon = <Dumbbell className="h-4 w-4" />;
                                      break;
                                    default:
                                      icon = null;
                                  }

                                  return (
                                    <Badge key={index} variant="outline" className="flex items-center gap-1 px-2 py-1">
                                      {icon}
                                      <span>{amenity}</span>
                                    </Badge>
                                  );
                                })}
                              </div>

                              {/* Price & Booking */}
                              <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                  <p className="text-2xl font-bold text-gray-900 flex items-baseline gap-2">
                                    ₹{(room.pricePerNight * nights).toLocaleString()}
                                    <span className="text-sm text-gray-500 font-normal">per night</span>
                                  </p>
                                </div>

                                <Link
                                  to={{
                                    pathname: `/book-room/${room.id}`,
                                    search: `?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}`
                                  }}
                                  state={{
                                    transformedRoom: room,
                                    rawRoom: rawRooms.find(r => r.id?.toString() === room.id) || {},
                                    transformedHotel: hotel,
                                    rawHotel: rawHotelData,
                                    nights
                                  }}
                                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                >
                                  Book Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              {/* Pagination Controls */}
              {filteredRooms.length > roomsPerPage && (
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      console.log('[HotelDetailsPage] Navigating to previous page');
                      setCurrentPage(prev => prev - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded ${currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 text-gray-800 font-medium">
                    Page {currentPage} of {Math.ceil(filteredRooms.length / roomsPerPage)}
                  </span>

                  <button
                    disabled={currentPage === Math.ceil(filteredRooms.length / roomsPerPage)}
                    onClick={() => {
                      console.log('[HotelDetailsPage] Navigating to next page');
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded ${currentPage === Math.ceil(filteredRooms.length / roomsPerPage)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetailsPage;