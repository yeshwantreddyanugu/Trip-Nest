
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Zap, Settings, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import vehiclesData from '@/data/vehicles';

const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundVehicle = vehiclesData.find(v => v.id === vehicleId);
      setVehicle(foundVehicle || null);
      setLoading(false);
    }, 500);
  }, [vehicleId]);

  const handleBookNow = () => {
    const searchParams = new URLSearchParams();
    if (fromDate) searchParams.set('fromDate', fromDate);
    if (toDate) searchParams.set('toDate', toDate);
    
    navigate(`/book-vehicle/${vehicleId}?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-gray-300 rounded-lg"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle not found</h1>
          <Button onClick={() => navigate('/vehicles')}>Back to Vehicles</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Image Carousel */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {vehicle.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${vehicle.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {vehicle.tags.map((tag, index) => (
                  <Badge key={index} className="bg-blue-500 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{vehicle.rating}</span>
                  <span className="text-gray-500">({vehicle.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{vehicle.location}</span>
                </div>
              </div>

              <div className="text-gray-600">
                <span className="font-medium">Vendor:</span> {vehicle.vendor}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600">{vehicle.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Seating</div>
                      <div className="text-sm text-gray-600">{vehicle.seating} persons</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Fuel</div>
                      <div className="text-sm text-gray-600">{vehicle.fuel}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Transmission</div>
                      <div className="text-sm text-gray-600">{vehicle.transmission}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Engine</div>
                    <div className="text-sm text-gray-600">{vehicle.engine}</div>
                  </div>
                  <div>
                    <div className="font-medium">Mileage</div>
                    <div className="text-sm text-gray-600">{vehicle.mileage}</div>
                  </div>
                  <div>
                    <div className="font-medium">AC</div>
                    <div className="text-sm text-gray-600">{vehicle.ac ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="mb-6">
                  <Badge className="bg-green-500 text-white mb-3">
                    {vehicle.availability}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Per Hour:</span>
                      <span className="font-semibold">₹{vehicle.pricePerHour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per Day:</span>
                      <span className="font-semibold">₹{vehicle.pricePerDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per Week:</span>
                      <span className="font-semibold">₹{vehicle.pricePerWeek}</span>
                    </div>
                  </div>
                </div>

                {fromDate && toDate && (
                  <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Selected Dates</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      <div>From: {fromDate}</div>
                      <div>To: {toDate}</div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  Book Now
                </Button>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>✓ Free cancellation up to 24 hours</p>
                  <p>✓ Verified vehicle & vendor</p>
                  <p>✓ 24/7 customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleDetailsPage;
