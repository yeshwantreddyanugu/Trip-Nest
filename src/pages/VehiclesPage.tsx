
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import { Skeleton } from '@/components/ui/skeleton';
import vehiclesData from '@/data/vehicles';

const VehiclesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = searchParams.get('location') || '';
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  
  const [filters, setFilters] = useState({
    location: location,
    type: [] as string[],
    transmission: [] as string[],
    fuel: [] as string[],
    ac: null as boolean | null,
    priceRange: [100, 5000] as [number, number],
    rating: 0
  });
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredData = vehiclesData;
      
      // Filter by location if provided
      if (location) {
        filteredData = filteredData.filter(vehicle => 
          vehicle.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setVehicles(filteredData);
      setFilteredVehicles(filteredData);
      setLoading(false);
    }, 1000);
  }, [location, fromDate, toDate]);

  useEffect(() => {
    applyFilters();
  }, [vehicles, filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...vehicles];

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(vehicle => 
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter(vehicle => filters.type.includes(vehicle.type));
    }

    // Apply transmission filter
    if (filters.transmission.length > 0) {
      filtered = filtered.filter(vehicle => filters.transmission.includes(vehicle.transmission));
    }

    // Apply fuel filter
    if (filters.fuel.length > 0) {
      filtered = filtered.filter(vehicle => filters.fuel.includes(vehicle.fuel));
    }

    // Apply AC filter
    if (filters.ac !== null) {
      filtered = filtered.filter(vehicle => vehicle.ac === filters.ac);
    }

    // Apply price range filter (using daily price)
    filtered = filtered.filter(vehicle =>
      vehicle.pricePerDay >= filters.priceRange[0] &&
      vehicle.pricePerDay <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(vehicle => vehicle.rating >= filters.rating);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'priceLow':
          return a.pricePerDay - b.pricePerDay;
        case 'priceHigh':
          return b.pricePerDay - a.pricePerDay;
        case 'newest':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    setFilteredVehicles(filtered);
  };

  const handleViewDetails = (vehicleId: string) => {
    const searchParams = new URLSearchParams();
    if (fromDate) searchParams.set('fromDate', fromDate);
    if (toDate) searchParams.set('toDate', toDate);
    
    navigate(`/vehicles/${vehicleId}?${searchParams.toString()}`);
  };

  const VehicleCardSkeleton = () => (
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
            Vehicles {location && `in ${location}`}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <p>{loading ? 'Loading...' : `${filteredVehicles.length} vehicles found`}</p>
            {fromDate && toDate && (
              <p>
                <span className="font-medium">From:</span> {fromDate} | 
                <span className="font-medium ml-2">To:</span> {toDate}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <VehicleFilters 
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
                  <VehicleCardSkeleton key={index} />
                ))
              ) : (
                filteredVehicles.map((vehicle) => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>

            {!loading && filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
                <button 
                  onClick={() => setFilters({
                    location: '',
                    type: [] as string[],
                    transmission: [] as string[],
                    fuel: [] as string[],
                    ac: null as boolean | null,
                    priceRange: [100, 5000] as [number, number],
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

export default VehiclesPage;
