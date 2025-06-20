
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface Filters {
  location: string;
  priceRange: number[];
  starCategory: string;
  amenities: string[];
  onlyAvailable: boolean;
}

interface HotelFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({ filters, onFiltersChange }) => {
  const locations = ['Goa', 'Mumbai', 'Manali', 'Udaipur', 'Delhi', 'Bangalore'];
  const amenitiesList = ['Wi-Fi', 'AC', 'Pool', 'Spa', 'Parking', 'Breakfast', 'Gym', 'Beach Access'];

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', updatedAmenities);
  };

  return (
    <Card className="p-6 sticky top-8">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>

      {/* Location Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Location</Label>
        <select 
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
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
          max={20000}
          min={0}
          step={500}
          className="w-full"
        />
      </div>

      {/* Star Category */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Star Category</Label>
        <select 
          value={filters.starCategory}
          onChange={(e) => updateFilter('starCategory', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Amenities</Label>
        <div className="space-y-2">
          {amenitiesList.map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label htmlFor={amenity} className="text-sm cursor-pointer">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Only Available */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={filters.onlyAvailable}
            onCheckedChange={(checked) => updateFilter('onlyAvailable', checked)}
          />
          <Label htmlFor="available" className="text-sm cursor-pointer">
            Only show available hotels
          </Label>
        </div>
      </div>

      <button 
        onClick={() => onFiltersChange({
          location: '',
          priceRange: [0, 20000],
          starCategory: '',
          amenities: [],
          onlyAvailable: false
        })}
        className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </Card>
  );
};

export default HotelFilters;
