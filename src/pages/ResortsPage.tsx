
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResortCard from '@/components/resorts/ResortCard';
import ResortFilters from '@/components/resorts/ResortFilters';
import { Skeleton } from '@/components/ui/skeleton';
import resortsData from '@/data/resorts';

const ResortsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resorts, setResorts] = useState([]);
  const [filteredResorts, setFilteredResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  
  const [filters, setFilters] = useState({
    location: location,
    priceRange: [0, 15000] as [number, number],
    amenities: [],
    rating: 0
  });
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredData = resortsData;
      
      // Filter by location if provided
      if (location) {
        filteredData = filteredData.filter(resort => 
          resort.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setResorts(filteredData);
      setFilteredResorts(filteredData);
      setLoading(false);
    }, 1000);
  }, [location, checkIn, checkOut]);

  useEffect(() => {
    applyFilters();
  }, [resorts, filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...resorts];

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(resort => 
        resort.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(resort =>
      resort.pricePerNight >= filters.priceRange[0] &&
      resort.pricePerNight <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(resort => resort.rating >= filters.rating);
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(resort =>
        filters.amenities.every(amenity => resort.amenities.includes(amenity))
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

    setFilteredResorts(filtered);
  };

  const handleViewDetails = (resortId: string) => {
    const searchParams = new URLSearchParams();
    if (checkIn) searchParams.set('checkIn', checkIn);
    if (checkOut) searchParams.set('checkOut', checkOut);
    
    navigate(`/resort/${resortId}?${searchParams.toString()}`);
  };

  const ResortCardSkeleton = () => (
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
            Resorts {location && `in ${location}`}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <p>{loading ? 'Loading...' : `${filteredResorts.length} resorts found`}</p>
            {checkIn && checkOut && (
              <p>
                <span className="font-medium">Check-in:</span> {checkIn} | 
                <span className="font-medium ml-2">Check-out:</span> {checkOut}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ResortFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ResortCardSkeleton key={index} />
                ))
              ) : (
                filteredResorts.map((resort) => (
                  <ResortCard 
                    key={resort.id} 
                    resort={resort}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>

            {!loading && filteredResorts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No resorts found matching your criteria.</p>
                <button 
                  onClick={() => setFilters({
                    location: '',
                    priceRange: [0, 15000] as [number, number],
                    amenities: [],
                    rating: 0
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

export default ResortsPage;
