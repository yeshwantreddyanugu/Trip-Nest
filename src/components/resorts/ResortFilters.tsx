
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ResortFilters {
  location: string;
  priceRange: [number, number];
  amenities: string[];
  rating: number;
}

interface ResortFiltersProps {
  filters: ResortFilters;
  onFiltersChange: (filters: ResortFilters) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const ResortFilters = ({ filters, onFiltersChange, sortBy, onSortChange }: ResortFiltersProps) => {
  const amenitiesList = ['Pool', 'Wi-Fi', 'Breakfast', 'Spa', 'Beach Access', 'Gym', 'Restaurant', 'Bar'];
  const locations = ['All Locations', 'Goa', 'Manali', 'Ooty', 'Hyderabad', 'Pondicherry', 'Mumbai', 'Delhi', 'Bangalore'];

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location: location === 'All Locations' ? '' : location
    });
  };

  const handlePriceChange = (newPrice: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [newPrice[0], newPrice[1]]
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    onFiltersChange({
      ...filters,
      amenities: newAmenities
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: rating
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: '',
      priceRange: [0, 15000],
      amenities: [],
      rating: 0
    });
    onSortChange('rating');
  };

  return (
    <Card className="p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Sort By</h4>
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="rating">Top Rated</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Location</h4>
        <select 
          value={filters.location || 'All Locations'}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            max={15000}
            min={0}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="mr-2"
              />
              <span>{rating}+ stars</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === 0}
              onChange={() => handleRatingChange(0)}
              className="mr-2"
            />
            <span>Any rating</span>
          </label>
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="mr-2"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ResortFilters;
