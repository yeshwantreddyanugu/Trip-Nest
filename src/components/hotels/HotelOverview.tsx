
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Coffee,
  MapPin,
  Star
} from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  amenities: string[];
  starCategory: number;
  coordinates: number[];
}

interface HotelOverviewProps {
  hotel: Hotel;
}

const HotelOverview: React.FC<HotelOverviewProps> = ({ hotel }) => {
  const getAmenityIcon = (amenity: string) => {
    const iconMap = {
      'Wi-Fi': Wifi,
      'Parking': Car,
      'Breakfast': Utensils,
      'Pool': Waves,
      'Gym': Dumbbell,
      'Spa': Coffee,
    };
    return iconMap[amenity] || Star;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{hotel.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">{hotel.starCategory} Star</div>
              <div className="text-sm text-gray-600">Category</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">Prime</div>
              <div className="text-sm text-gray-600">Location</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Coffee className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">24/7</div>
              <div className="text-sm text-gray-600">Service</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotel.amenities.map((amenity, index) => {
              const IconComponent = getAmenityIcon(amenity);
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800">{amenity}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">{hotel.location}</span>
            </div>
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Map placeholder</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <Badge variant="outline">{hotel.starCategory} Star</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">2:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">12:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Languages:</span>
              <span className="font-medium">English, Hindi</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HotelOverview;
