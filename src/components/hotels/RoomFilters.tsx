
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface RoomFilters {
   priceRange: [number, number];
  hasAC: boolean;
  maxOccupancy: string;
  availableOnly: boolean;
}

interface RoomFiltersProps {
  filters: RoomFilters;
  onFiltersChange: (filters: RoomFilters) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  sortBy, 
  onSortChange 
}) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-6 sticky top-8">
      <h3 className="text-lg font-semibold mb-6">Filter Rooms</h3>

      {/* Sort Options */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Sort by</Label>
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="price">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="capacity">Capacity</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">
          Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilter('priceRange', value)}
          max={15000}
          min={0}
          step={500}
          className="w-full"
        />
      </div>

      {/* AC Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasAC"
            checked={filters.hasAC}
            onCheckedChange={(checked) => updateFilter('hasAC', checked)}
          />
          <Label htmlFor="hasAC" className="text-sm cursor-pointer">
            AC Rooms Only
          </Label>
        </div>
      </div>

      {/* Occupancy Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Minimum Occupancy</Label>
        <select 
          value={filters.maxOccupancy}
          onChange={(e) => updateFilter('maxOccupancy', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any</option>
          <option value="2">2+ Guests</option>
          <option value="3">3+ Guests</option>
          <option value="4">4+ Guests</option>
        </select>
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="availableOnly"
            checked={filters.availableOnly}
            onCheckedChange={(checked) => updateFilter('availableOnly', checked)}
          />
          <Label htmlFor="availableOnly" className="text-sm cursor-pointer">
            Available Rooms Only
          </Label>
        </div>
      </div>

      <button 
        onClick={() => onFiltersChange({
          priceRange: [0, 15000],
          hasAC: false,
          maxOccupancy: '',
          availableOnly: false
        })}
        className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </Card>
  );
};

export default RoomFilters;
