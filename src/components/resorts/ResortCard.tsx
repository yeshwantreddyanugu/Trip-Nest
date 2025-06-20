
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resort {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  isAvailable: boolean;
}

interface ResortCardProps {
  resort: Resort;
  onViewDetails: (resortId: string) => void;
}

const ResortCard = ({ resort, onViewDetails }: ResortCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img 
          src={resort.images[0]} 
          alt={resort.name}
          className="w-full h-48 object-cover"
        />
        {resort.isAvailable && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
            Available
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{resort.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-gray-900">{resort.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{resort.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {resort.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {resort.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{resort.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">₹{resort.pricePerNight.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <Button 
            onClick={() => onViewDetails(resort.id)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            View Details
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">({resort.reviewCount} reviews)</p>
      </div>
    </div>
  );
};

export default ResortCard;
