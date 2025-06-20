
import React from 'react';
import { Star, MapPin, Users, Zap, Settings } from 'lucide-react';
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
  images: string[];
  tags: string[];
  availability: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicleId: string) => void;
}

const VehicleCard = ({ vehicle, onViewDetails }: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {vehicle.tags.map((tag, index) => (
            <Badge key={index} className="bg-blue-500 text-white text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        {vehicle.isAvailable && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
            {vehicle.availability}
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{vehicle.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-gray-900">{vehicle.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{vehicle.location}</span>
          <span className="text-gray-400">•</span>
          <span>{vehicle.vendor}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{vehicle.seating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="secondary" className="text-xs">
            {vehicle.type}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {vehicle.category}
          </Badge>
          {vehicle.ac && (
            <Badge variant="secondary" className="text-xs">
              AC
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-blue-600">₹{vehicle.pricePerHour}</span>
              <span className="text-gray-500 text-sm">/hour</span>
            </div>
            <div className="text-sm text-gray-500">
              ₹{vehicle.pricePerDay}/day • ₹{vehicle.pricePerWeek}/week
            </div>
          </div>
          <Button 
            onClick={() => onViewDetails(vehicle.id)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            View Details
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">({vehicle.reviewCount} reviews)</p>
      </div>
    </div>
  );
};

export default VehicleCard;
