import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface Filters {
  location: string;
  priceRange: [number, number];
  starCategory: string;
  amenities: string[];
  onlyAvailable: boolean;
  lastChanged: 'price' | 'amenities' | 'rating' | '';
}

interface HotelFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({ filters, onFiltersChange }) => {
  const locations = ['Goa', 'Mumbai', 'Manali', 'Udaipur', 'Delhi', 'Bangalore'];
  const amenitiesList = ['Wi-Fi', 'AC', 'Pool', 'Spa', 'Parking', 'Breakfast', 'Gym', 'Beach Access'];
  const starCategories = ['3', '4', '5'];

  const updateFilter = (key: keyof Filters, value: any, lastChanged?: Filters['lastChanged']) => {
    console.log(`🔧 Updating filter ${key}:`, value);
    onFiltersChange({
      ...filters,
      [key]: value,
      ...(lastChanged ? { lastChanged } : {})
    });
  };

  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', updatedAmenities, 'amenities');
  };

  const handlePriceChange = (value: number[]) => {
    updateFilter('priceRange', value as [number, number], 'price');
  };

  const handleStarChange = (star: string, checked: boolean) => {
    updateFilter('starCategory', checked ? star : '', 'rating');
  };

  const clearFilters = () => {
    onFiltersChange({
      location: '',
      priceRange: [0, 200000],
      starCategory: '',
      amenities: [],
      onlyAvailable: false,
      lastChanged: '',
    });
  };

  return (
    <Card className="p-6 sticky top-8">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>

      {/* Location Filter */}
      {/* <div className="mb-6">
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
      </div> */}

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">
          Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
        </Label>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Min Slider */}
          <div style={{ flex: 1 }}>
            <Label style={{ display: 'block', marginBottom: '4px' }}>Min</Label>
            <Slider
              value={[filters.priceRange[0]]}
              onValueChange={(value) => {
                const newMin = value[0];
                const max = filters.priceRange[1];
                if (newMin <= max) {
                  handlePriceChange([newMin, max]);
                }
              }}
              min={0}
              max={20000}
              step={500}
            />
          </div>

          {/* Max Slider */}
          <div style={{ flex: 1 }}>
            <Label style={{ display: 'block', marginBottom: '4px' }}>Max</Label>
            <Slider
              value={[filters.priceRange[1]]}
              onValueChange={(value) => {
                const newMax = value[0];
                const min = filters.priceRange[0];
                if (newMax >= min) {
                  handlePriceChange([min, newMax]);
                }
              }}
              min={1000}
              max={200000}
              step={500}
            />
          </div>
        </div>
      </div>


      {/* Star Category */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Star Rating</Label>
        <div className="space-y-2">
          {starCategories.map(star => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox
                id={`star-${star}`}
                checked={filters.starCategory === star}
                onCheckedChange={(checked) => handleStarChange(star, Boolean(checked))}
              />
              <Label htmlFor={`star-${star}`} className="text-sm cursor-pointer">
                {star} Star & Up
              </Label>
            </div>
          ))}
        </div>
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
        onClick={clearFilters}
        className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </Card>
  );
};

export default HotelFilters;
