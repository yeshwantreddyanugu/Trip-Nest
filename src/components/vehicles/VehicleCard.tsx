import React from 'react';
import { Star, MapPin, Users, Zap, Settings, Fuel, Clock, Calendar, User, Gauge, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: string;
  transmission: string;
  fuel: string;
  ac: boolean;
  seating: number;
  mileage: string;
  engine: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  location: string;
  isAvailable: boolean;
  image: string;
  tags: string[];
  availability: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicleId: string) => void;
}

const VehicleCard = ({ vehicle, onViewDetails }: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Image Section */}
      <div className="relative h-56 w-full">
        <img
          src={vehicle.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-wrap gap-2">
            {vehicle.tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Badge className={`${vehicle.isAvailable ? 'bg-green-500/90' : 'bg-red-500/90'} backdrop-blur-sm text-white`}>
            {vehicle.isAvailable ? 'Available Now' : 'Unavailable'}
          </Badge>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium ml-1">
            {typeof vehicle.rating === 'number' ? vehicle.rating.toFixed(1) : 'N/A'}
            {/* <span className="text-gray-500 text-xs"> ({vehicle.reviewCount})</span> */}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{vehicle.name}</h3>
          <div className="flex items-center gap-1 text-gray-600 mt-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{vehicle.location}</span>
            {vehicle.vendor && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-sm">{vehicle.vendor}</span>
              </>
            )}
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-blue-500" />
            <span>{vehicle.seating} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Fuel className="h-4 w-4 text-green-500" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Settings className="h-4 w-4 text-purple-500" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="h-4 w-4 text-orange-500" />
            <span>{vehicle.mileage}</span>
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex flex-wrap gap-2 mb-5">
          <Badge variant="secondary" className="text-xs">
            {vehicle.type}
          </Badge>
          {/* <Badge variant="secondary" className="text-xs">
            {vehicle.category}
          </Badge> */}
          {vehicle.ac && (
            <Badge variant="secondary" className="text-xs">
              Air Conditioning
            </Badge>
          )}
          {vehicle.engine && (
            <Badge variant="secondary" className="text-xs">
              {vehicle.engine}
            </Badge>
          )}
        </div>

        {/* Pricing and CTA */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-blue-600">₹{vehicle.pricePerHour}</span>
                <span className="text-gray-500 text-sm">/hour</span>
              </div>
              <div className="flex col gap-3 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>₹{vehicle.pricePerDay}/day</span>
                </div>
                {/* <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>₹{vehicle.pricePerWeek}/week</span>
                </div> */}
              </div>
            </div>
            <Button
              onClick={() => onViewDetails(vehicle.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
              size="sm"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;