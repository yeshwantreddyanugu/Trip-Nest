import React from 'react';
import { Star, Users, Square, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Room {
  id: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  bedType: string;
  amenities: string[];
  isAvailable: boolean;
  mainImage: string;
  hotelId: string;
}

interface RoomCardProps {
  room: Room;
  fromDate?: string;
  toDate?: string;
  nights?: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, fromDate, toDate, nights = 1 }) => {
  console.log('[RoomCard] Rendering room:', room.id);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={room.mainImage}
          alt={room.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.warn(`[RoomCard] Failed to load image for room ${room.id}`);
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
          }}
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/80 rounded-full hover:bg-white">
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        {!room.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-lg">
              Not Available
            </span>
          </div>
        )}
        {room.isAvailable && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            Available
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              {room.capacity} {room.capacity > 1 ? 'Guests' : 'Guest'}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <Square className="h-3 w-3" />
              {room.size}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {room.bedType}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {room.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{room.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold">₹{room.pricePerNight.toLocaleString()}</span>
              <span className="text-gray-500 text-sm"> /night</span>
              {nights > 0 && (
                <div className="text-xs text-gray-600">
                  ₹{(room.pricePerNight * nights).toLocaleString()} total
                </div>
              )}
            </div>

            <Link
              to={{
                pathname: `/book-room/${room.id}`,
                search: `?fromDate=${fromDate}&toDate=${toDate}`
              }}
              state={{
                room,
                hotel: {
                  id: room.hotelId,
                  name: `Hotel ${room.hotelId}`
                }
              }}
            >
              <Button
                disabled={!room.isAvailable}
                className={`text-sm ${room.isAvailable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                size="sm"
              >
                {room.isAvailable ? 'Book Now' : 'Not Available'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;