import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import { Skeleton } from '@/components/ui/skeleton';
import fetchVehiclesByCity from '@/data/vehicles';

const VehiclesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const location = (searchParams.get('location') || '').toLowerCase();
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  const [filters, setFilters] = useState({
    location,
    type: [] as string[],
    transmission: [] as string[],
    fuel: [] as string[],
    ac: null as boolean | null,
    priceRange: [0, 10000] as [number, number],
    rating: 0
  });

  const [sortBy, setSortBy] = useState('rating');

  // Fetch vehicles from backend by city
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('🚗 Fetching vehicles for city:', location);

      try {
        const vehicleList = await fetchVehiclesByCity();
        console.log('✅ Vehicles loaded:', vehicleList);
        setVehicles(vehicleList);
        setFilteredVehicles(vehicleList);
      } catch (error) {
        console.error('🔥 Error fetching vehicles:', error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    if (location) fetchData();
  }, [location]);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    console.log('🔍 Applying filters and sorting...');
    applyFilters();
  }, [vehicles, filters, sortBy]);

  const applyFilters = () => {
    console.log('🔧 Current filters:', filters);
    console.log('🔧 Current sort by:', sortBy);

    let filtered = [...vehicles];

    // Normalize helper
    const normalize = (str: string) => (str || '').trim().toLowerCase();

    // ✅ Location filter
    if (filters.location) {
      const locationFilter = normalize(filters.location);
      filtered = filtered.filter(v =>
        normalize(v.location).includes(locationFilter)
      );
    }

    // ✅ Type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter(v =>
        filters.type.some(t =>
          normalize(t) === normalize(v.type)
        )
      );
    }

    // ✅ Transmission filter
    if (filters.transmission.length > 0) {
      filtered = filtered.filter(v =>
        filters.transmission.some(t =>
          normalize(t) === normalize(v.transmission)
        )
      );
    }

    // ✅ Fuel filter
    if (filters.fuel.length > 0) {
      filtered = filtered.filter(v =>
        filters.fuel.some(f =>
          normalize(f) === normalize(v.fuel)
        )
      );
    }

    // ✅ AC filter
    if (filters.ac !== null) {
      filtered = filtered.filter(v => v.ac === filters.ac);
    }

    // ✅ Price range filter (based on pricePerDay)
    filtered = filtered.filter(v => {
      const price = v.pricePerDay || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // ✅ Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(v => (v.rating || 0) >= filters.rating);
    }

    // ✅ Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'priceLow':
          return (a.pricePerDay || 0) - (b.pricePerDay || 0);
        case 'priceHigh':
          return (b.pricePerDay || 0) - (a.pricePerDay || 0);
        case 'newest':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });

    console.log('✅ Filtered vehicles:', filtered);
    setFilteredVehicles(filtered);
  };


  const handleViewDetails = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id.toString() === vehicleId);
    const params = new URLSearchParams();

    if (fromDate) params.set('fromDate', fromDate);
    if (toDate) params.set('toDate', toDate);

    navigate(`/vehicles/${vehicleId}?${params.toString()}`, {
      state: { vehicle, city: location },
    });

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
                <span className="font-medium">From:</span> {fromDate} |{' '}
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
                <p className="text-gray-500 text-lg">
                  No vehicles found matching your criteria.
                </p>
                <button
                  onClick={() => setFilters({
                    ...filters,
                    type: [],
                    transmission: [],
                    fuel: [],
                    ac: null,
                    priceRange: [100, 10000],
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