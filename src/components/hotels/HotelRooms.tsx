
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Bed } from 'lucide-react';
import roomsData from '@/data/rooms';

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

interface HotelRoomsProps {
  hotelId: string;
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ hotelId }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    roomType: '',
    hasAC: false,
    onlyAvailable: false
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const hotelRooms = roomsData.filter(room => room.hotelId === hotelId);
      setRooms(hotelRooms);
      setLoading(false);
    }, 1000);
  }, [hotelId]);

  const filteredRooms = rooms.filter(room => {
    if (filters.roomType && room.type !== filters.roomType) return false;
    if (filters.hasAC && !room.amenities.includes('AC')) return false;
    if (filters.onlyAvailable && !room.isAvailable) return false;
    return true;
  });

  const RoomCardSkeleton = () => (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="w-full md:w-64 h-48" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Rooms</h3>
        <div className="flex flex-wrap gap-4">
          <select 
            value={filters.roomType}
            onChange={(e) => setFilters({...filters, roomType: e.target.value})}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Room Types</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Executive">Executive</option>
          </select>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={filters.hasAC}
              onChange={(e) => setFilters({...filters, hasAC: e.target.checked})}
              className="rounded"
            />
            <span>AC Rooms Only</span>
          </label>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={(e) => setFilters({...filters, onlyAvailable: e.target.checked})}
              className="rounded"
            />
            <span>Available Only</span>
          </label>
        </div>
      </Card>

      {/* Rooms List */}
      <div className="space-y-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))
        ) : (
          filteredRooms.map((room) => (
            <Card key={room.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                  />
                  {room.isTopRoom && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500">
                      Top Room
                    </Badge>
                  )}
                  {!room.isAvailable && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <Badge variant="destructive">Not Available</Badge>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{room.name}</h4>
                      <p className="text-gray-600">{room.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{room.pricePerNight.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{room.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">King Bed</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {room.isAvailable ? 'Available for booking' : 'Currently unavailable'}
                    </div>
                    <Link to={`/book-room/${room.id}`}>
                      <Button 
                        disabled={!room.isAvailable}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {!loading && filteredRooms.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500 text-lg">No rooms found matching your criteria.</p>
          <Button 
            onClick={() => setFilters({ roomType: '', hasAC: false, onlyAvailable: false })}
            variant="outline" 
            className="mt-4"
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
};

export default HotelRooms;
