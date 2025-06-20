
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Bed, Square, CheckCircle, Calendar } from 'lucide-react';

interface Room {
  id: string;
  hotelId: string;
  name: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  isAvailable: boolean;
  isTopRoom: boolean;
}

interface RoomCardProps {
  room: Room;
  fromDate: string;
  toDate: string;
  nights: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, fromDate, toDate, nights }) => {
  const totalPrice = room.pricePerNight * nights;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Room Image */}
        <div className="lg:w-1/3 relative">
          <img 
            src={room.image} 
            alt={room.name}
            className="w-full h-64 lg:h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {room.isTopRoom && (
              <Badge className="bg-yellow-500 text-white">Top Choice</Badge>
            )}
            {room.isAvailable ? (
              <Badge className="bg-green-500 text-white">Available</Badge>
            ) : (
              <Badge className="bg-red-500 text-white">Booked</Badge>
            )}
          </div>
        </div>

        {/* Room Details */}
        <div className="lg:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-3">{room.type} Room</p>
              
              {/* Room Features */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Bed className="h-4 w-4" />
                  <span className="text-sm">King Bed</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Square className="h-4 w-4" />
                  <span className="text-sm">350 sq ft</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {room.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₹{room.pricePerNight.toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">per night</div>
              
              {nights > 1 && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <div className="text-sm text-blue-600">
                    {nights} nights total
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ₹{totalPrice.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Section */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              {room.isAvailable ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Available for your dates</span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Not available for selected dates</span>
              )}
            </div>

            {room.isAvailable ? (
              <Link 
                to={`/book-room/${room.id}?fromDate=${fromDate}&toDate=${toDate}`}
              >
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </Link>
            ) : (
              <Button disabled className="bg-gray-400">
                Not Available
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
