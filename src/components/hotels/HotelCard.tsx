
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  tags: string[];
  amenities: string[];
  starCategory: number;
  minPrice:number;
  maxPrice:number;

}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {hotel.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-white/90 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{hotel.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: hotel.starCategory }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {hotel.name}
        </h3>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{hotel.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{(hotel.minPrice ?? hotel.pricePerNight ?? 0).toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">{hotel.reviewCount} reviews</div>
          </div>
        </div>

        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
