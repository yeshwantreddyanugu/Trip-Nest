import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface VehicleFilters {
  location: string;
  type: string[];
  transmission: string[];
  fuel: string[];
  ac: boolean | null;
  priceRange: [number, number];
  rating: number;
}

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const VehicleFiltersComponent = ({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange
}: VehicleFiltersProps) => {
  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    console.log(`🔄 Updating filter ${key} to:`, value);
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCheckboxChange = (
    key: 'type' | 'transmission' | 'fuel',
    value: string,
    checked: boolean
  ) => {
    console.log(`☑️ ${key} checkbox changed:`, value, checked);
    const currentArray = filters[key] as string[];
    if (checked) {
      updateFilter(key, [...currentArray, value]);
    } else {
      updateFilter(
        key,
        currentArray.filter((item) => item !== value)
      );
    }
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
              <SelectItem value="newest">Most Booked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Vehicle Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Vehicle Type</Label>
          <div className="space-y-2">
            {['SUV', 'Car', 'Bike', 'Scooter', 'Van'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.type.includes(type)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('type', type, checked as boolean)
                  }
                />
                <Label htmlFor={`type-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Transmission */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Transmission</Label>
          <div className="space-y-2">
            {['Manual', 'Automatic'].map((transmission) => (
              <div key={transmission} className="flex items-center space-x-2">
                <Checkbox
                  id={`transmission-${transmission}`}
                  checked={filters.transmission.includes(transmission)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('transmission', transmission, checked as boolean)
                  }
                />
                <Label htmlFor={`transmission-${transmission}`}>{transmission}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Fuel Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Fuel Type</Label>
          <div className="space-y-2">
            {['Petrol', 'Diesel', 'Electric'].map((fuel) => (
              <div key={fuel} className="flex items-center space-x-2">
                <Checkbox
                  id={`fuel-${fuel}`}
                  checked={filters.fuel.includes(fuel)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('fuel', fuel, checked as boolean)
                  }
                />
                <Label htmlFor={`fuel-${fuel}`}>{fuel}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* AC Availability */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Air Conditioning</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ac-available"
                checked={filters.ac === true}
                onCheckedChange={(checked) =>
                  updateFilter('ac', checked ? true : null)
                }
              />
              <Label htmlFor="ac-available">AC Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="non-ac"
                checked={filters.ac === false}
                onCheckedChange={(checked) =>
                  updateFilter('ac', checked ? false : null)
                }
              />
              <Label htmlFor="non-ac">Non-AC</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Range Slider */}

        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range (Per Day): ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
          </Label>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Min Slider */}
            <div style={{ flex: 1 }}>
              <Label style={{ display: 'block', marginBottom: '4px' }}>Min</Label>
              <Slider
                value={[filters.priceRange[0]]}
                onValueChange={(value: number[]) => {
                  const newMin = value[0];
                  const max = filters.priceRange[1];
                  if (newMin <= max) {
                    updateFilter('priceRange', [newMin, max]);
                  }
                }}
                min={0}
                max={10000}
                step={100}
              />
            </div>

            {/* Max Slider */}
            <div style={{ flex: 1 }}>
              <Label style={{ display: 'block', marginBottom: '4px' }}>Max</Label>
              <Slider
                value={[filters.priceRange[1]]}
                onValueChange={(value: number[]) => {
                  const newMax = value[0];
                  const min = filters.priceRange[0];
                  if (newMax >= min) {
                    updateFilter('priceRange', [min, newMax]);
                  }
                }}
                min={100}
                max={100000}
                step={100}
              />
            </div>
          </div>
        </div>


        <Separator />

        {/* Rating */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <Select
            value={filters.rating.toString()}
            onValueChange={(value) => updateFilter('rating', parseFloat(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4.9">5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleFiltersComponent;