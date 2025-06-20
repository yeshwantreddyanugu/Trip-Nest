
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelCard from '@/components/hotels/HotelCard';
import HotelFilters from '@/components/hotels/HotelFilters';
import HotelSearch from '@/components/hotels/HotelSearch';
import { Skeleton } from '@/components/ui/skeleton';
import hotelsData from '@/data/hotels';

const HotelsPage = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const city = searchParams.get('city') || '';
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  
  const [filters, setFilters] = useState({
    location: city,
    priceRange: [0, 20000],
    starCategory: '',
    amenities: [],
    onlyAvailable: false
  });
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call with dates
    setTimeout(() => {
      let filteredData = hotelsData;
      
      // Filter by city if provided
      if (city) {
        filteredData = filteredData.filter(hotel => 
          hotel.location.toLowerCase().includes(city.toLowerCase())
        );
      }
      
      setHotels(filteredData);
      setFilteredHotels(filteredData);
      setLoading(false);
    }, 1000);
  }, [city, fromDate, toDate]);

  useEffect(() => {
    applyFilters();
  }, [hotels, filters, sortBy, searchQuery]);

  const applyFilters = () => {
    let filtered = [...hotels];

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(hotel =>
      hotel.pricePerNight >= filters.priceRange[0] &&
      hotel.pricePerNight <= filters.priceRange[1]
    );

    // Apply star category filter
    if (filters.starCategory) {
      filtered = filtered.filter(hotel => hotel.starCategory === parseInt(filters.starCategory));
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'priceLow':
          return a.pricePerNight - b.pricePerNight;
        case 'priceHigh':
          return b.pricePerNight - a.pricePerNight;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);
  };

  const HotelCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hotels {city && `in ${city}`}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <p>{loading ? 'Loading...' : `${filteredHotels.length} hotels found`}</p>
            {fromDate && toDate && (
              <p>
                <span className="font-medium">Check-in:</span> {fromDate} | 
                <span className="font-medium ml-2">Check-out:</span> {toDate}
              </p>
            )}
          </div>
        </div>

        <HotelSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <HotelFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <HotelCardSkeleton key={index} />
                ))
              ) : (
                filteredHotels.map((hotel) => (
                  <Link 
                    key={hotel.id} 
                    to={`/hotels/${hotel.id}?fromDate=${fromDate}&toDate=${toDate}`}
                  >
                    <HotelCard hotel={hotel} />
                  </Link>
                ))
              )}
            </div>

            {!loading && filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
                <button 
                  onClick={() => setFilters({
                    location: '',
                    priceRange: [0, 20000],
                    starCategory: '',
                    amenities: [],
                    onlyAvailable: false
                  })}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelsPage;
