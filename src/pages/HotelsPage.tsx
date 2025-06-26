import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelCard from '@/components/hotels/HotelCard';
import HotelFilters from '@/components/hotels/HotelFilters';
import HotelSearch from '@/components/hotels/HotelSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchHotels, fetchFilteredHotels, transformHotelData } from '@/data/hotels';

interface Filters {
  location: string;
  priceRange: [number, number];
  starCategory: string;
  amenities: string[];
  onlyAvailable: boolean;
  lastChanged: 'price' | 'amenities' | 'rating' | '';
}

const HotelsPage = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || '';
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  const [hotelsData, setHotelsData] = useState({
    hotels: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    location: city,
    priceRange: [0, 20000],
    starCategory: '',
    amenities: [],
    onlyAvailable: false,
    lastChanged: '',
  });

  const [sortOptions, setSortOptions] = useState({
    sortBy: 'rating',
    sortDir: 'desc' as 'asc' | 'desc',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize] = useState(6);
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);

  const loadHotels = async (page: number = 0) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔁 Loading hotels...', {
        city,
        searchQuery,
        page,
        filters,
        sortOptions,
        areFiltersApplied
      });

      let response;

      // Inside loadHotels
      if (searchQuery) {
        console.log('🔍 Triggering search query request...');
        response = await fetchHotels({
          query: searchQuery,
          page,
          size: pageSize,
          sortBy: sortOptions.sortBy,
          sortDir: sortOptions.sortDir,
        });
      } else if (areFiltersApplied) {
        console.log('🧪 Triggering filtered search...');
        response = await fetchFilteredHotels({
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          rating: filters.starCategory ? parseFloat(filters.starCategory) : undefined,
          amenities: filters.amenities,
          page,
          size: pageSize,
          sortBy: sortOptions.sortBy,
          sortDir: sortOptions.sortDir,
        });
      } else {
        console.log('🏙️ Loading by city...');
        response = await fetchHotels({
          city,
          page,
          size: pageSize,
          sortBy: sortOptions.sortBy,
          sortDir: sortOptions.sortDir,
          activeOnly: filters.onlyAvailable,
        });
      }



      const transformedData = transformHotelData(response);

      console.log(`✅ Fetched ${transformedData.content.length} hotels (Page ${page + 1}/${transformedData.totalPages})`);

      setHotelsData({
        hotels: transformedData.content,
        totalPages: transformedData.totalPages,
        totalElements: transformedData.totalElements,
        currentPage: page,
      });
    } catch (err) {
      console.error('❌ Failed to fetch hotels:', err);
      setError('Failed to load hotels. Please try again later.');
      setHotelsData({ hotels: [], totalPages: 0, totalElements: 0, currentPage: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🏁 Initializing hotels page');
    setAreFiltersApplied(false);
    loadHotels(0);
  }, [city, searchQuery]);

  useEffect(() => {
    if (areFiltersApplied || filters.location !== city) {
      console.log('🔧 Filters changed, reloading hotels');
      loadHotels(0);
    }
  }, [filters, sortOptions]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= hotelsData.totalPages) return;
    console.log(`📄 Changing to page ${newPage + 1}`);
    loadHotels(newPage);
  };

  const handleSortChange = (newSortBy: string) => {
    const newSortDir = sortOptions.sortBy === newSortBy
      ? sortOptions.sortDir === 'asc' ? 'desc' : 'asc'
      : 'desc';

    console.log(`🔄 Changing sort to: ${newSortBy} ${newSortDir}`);

    setSortOptions({
      sortBy: newSortBy,
      sortDir: newSortDir,
    });
  };

  const handleFiltersChange = (newFilters: Filters) => {
    console.log('🔧 Updating filters:', newFilters);

    const filtersApplied = (
      newFilters.priceRange[0] !== 0 ||
      newFilters.priceRange[1] !== 20000 ||
      newFilters.starCategory !== '' ||
      newFilters.amenities.length > 0 ||
      newFilters.onlyAvailable ||
      newFilters.location !== city
    );

    setAreFiltersApplied(filtersApplied);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    console.log('🧹 Resetting all filters');
    setAreFiltersApplied(false);
    setFilters({
      location: city,
      priceRange: [0, 20000],
      starCategory: '',
      amenities: [],
      onlyAvailable: false,
      lastChanged: '',
    });
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
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Hotels {city && `in ${city}`}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            {loading ? (
              <Skeleton className="h-6 w-48" />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <p>{hotelsData.totalElements} hotels found</p>
                {fromDate && toDate && (
                  <p>
                    <span className="font-medium">Check-in:</span> {fromDate} |
                    <span className="font-medium ml-2">Check-out:</span> {toDate}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <HotelSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortOptions.sortBy}
          sortDir={sortOptions.sortDir}
          onSortChange={handleSortChange}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <HotelFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>
          <div className="lg:w-3/4">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                  onClick={() => loadHotels(0)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: pageSize }).map((_, index) => (
                  <HotelCardSkeleton key={index} />
                ))}
              </div>
            ) : hotelsData.hotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No hotels found. Try adjusting your filters or search query.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {hotelsData.hotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      to={{
                        pathname: `/hotels/${hotel.id}`,
                        search: `?fromDate=${fromDate}&toDate=${toDate}`,
                      }}
                      state={{
                        transformedHotel: hotel,
                        rawHotel: hotel.rawData,
                      }}
                    >
                      <HotelCard hotel={hotel} />
                    </Link>
                  ))}
                </div>

                {hotelsData.totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-4">
                    <button
                      disabled={hotelsData.currentPage === 0}
                      onClick={() => handlePageChange(hotelsData.currentPage - 1)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-gray-800 font-medium">
                      Page {hotelsData.currentPage + 1} of {hotelsData.totalPages}
                    </span>
                    <button
                      disabled={hotelsData.currentPage + 1 >= hotelsData.totalPages}
                      onClick={() => handlePageChange(hotelsData.currentPage + 1)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelsPage;