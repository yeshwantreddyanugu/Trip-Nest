
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MapPin, Star, Calendar, Users, Wifi, Car, Coffee, Waves } from 'lucide-react';
import resortsData from '@/data/resorts';

const ResortDetailsPage = () => {
  const { resortId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundResort = resortsData.find(r => r.id === resortId);
      setResort(foundResort);
      setLoading(false);
    }, 1000);
  }, [resortId]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi': return <Wifi className="h-4 w-4" />;
      case 'pool': return <Waves className="h-4 w-4" />;
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const handleBookNow = () => {
    const searchParams = new URLSearchParams();
    if (checkIn) searchParams.set('checkIn', checkIn);
    if (checkOut) searchParams.set('checkOut', checkOut);
    
    navigate(`/book-resort/${resortId}?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full" />
            </div>
            <div>
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!resort) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resort not found</h1>
          <p className="text-gray-600">The resort you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
            <div className="lg:col-span-2">
              <img 
                src={resort.images[selectedImageIndex]} 
                alt={resort.name}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-4">
              {resort.images.slice(1, 3).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${resort.name} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>
          
          {/* Image thumbnails */}
          <div className="p-4 flex gap-2 overflow-x-auto">
            {resort.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${resort.name} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                  selectedImageIndex === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Resort Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 mb-8">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{resort.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{resort.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{resort.rating}</span>
                </div>
                <span className="text-gray-500">({resort.reviewCount} reviews)</span>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">{resort.description}</p>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {resort.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Room Types</h3>
                <div className="flex flex-wrap gap-2">
                  {resort.roomTypes.map((roomType, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {roomType}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">{resort.checkInPolicy}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">{resort.checkOutPolicy}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₹{resort.pricePerNight.toLocaleString()}
                </div>
                <p className="text-gray-600">per night</p>
              </div>

              {checkIn && checkOut && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Your Stay</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Check-in: {checkIn}</p>
                  <p className="text-sm text-gray-600">Check-out: {checkOut}</p>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4"
                onClick={handleBookNow}
              >
                Book Now
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>Free cancellation until 24 hours before check-in</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResortDetailsPage;
