import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HotelSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  sortDir: 'asc' | 'desc'; // ✅ Included
  onSortChange: (sort: string) => void;
}

const HotelSearch: React.FC<HotelSearchProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  sortDir, // ✅ Destructure here
  onSortChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search hotels by name or location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* <div className="md:w-48">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Top Rated</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest Listings</option>
          </select>
        </div> */}

        {/* <div className="text-sm text-gray-500 mt-2 md:mt-0">
          Direction: <span className="font-semibold">{sortDir.toUpperCase()}</span>
        </div> */}
      </div>
    </div>
  );
};

export default HotelSearch;
