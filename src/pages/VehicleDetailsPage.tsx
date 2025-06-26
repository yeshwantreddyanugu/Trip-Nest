import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import {
  Star,
  MapPin,
  Users,
  Zap,
  Settings,
  Calendar,
  ArrowLeft,
  Gauge, Activity, Snowflake
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import fetchVehiclesByCity from '@/data/vehicles';

const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCity = location.state?.city;


  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  const passedVehicle = location.state?.vehicle;
  console.log("passed Vehicle");
  console.log(passedVehicle);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ⬆️ scroll to top

    console.log('📦 Vehicle ID from URL:', vehicleId);
    console.log('📅 From:', fromDate, '| To:', toDate);
    console.log('📤 Passed vehicle from state:', passedVehicle);

    if (passedVehicle) {
      console.log('✅ Using vehicle from route state.');
      enrichVehicle(passedVehicle);
      setVehicle(passedVehicle);
      setLoading(false);
    } else {
      console.warn('⚠️ No vehicle in route state. Fetching from vehiclesData...');
      fetchVehiclesByCity(selectedCity || 'goa').then((data: any[]) => {
        const found = data.find((v: any) => v.id.toString() === vehicleId);


        if (found) {
          console.log('✅ Fallback vehicle found:', found);
          enrichVehicle(found);
          setVehicle(found);
        } else {
          console.error('❌ No vehicle found for ID:', vehicleId);
          setVehicle(null);
        }

        setLoading(false);
      });
    }

  }, [vehicleId]);

  const enrichVehicle = (v: any) => {
    const tags: string[] = [];
    if (v.name?.toLowerCase().includes('thar')) tags.push('Off Road');
    if (v.type === 'SUV') tags.push('Adventure');
    if (v.rating >= 4.5) tags.push('Top Rated');
    v.tags = tags;
  };

  const handleBookNow = () => {
    const query = new URLSearchParams();
    if (fromDate) query.set('fromDate', fromDate);
    if (toDate) query.set('toDate', toDate);

    navigate(`/book-vehicle/${vehicleId}?${query.toString()}`, {
      state: { vehicle },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">Loading vehicle details...</div>
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
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        {/* Image Carousel */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {(vehicle.images?.length > 0 ? vehicle.images : [vehicle.image || '/placeholder.jpg']).map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <img
                      src={img}
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
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {vehicle.tags?.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    className={`text-white ${tag === 'Off Road' ? 'bg-red-500' : tag === 'Adventure' ? 'bg-green-500' : 'bg-blue-500'}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{vehicle.rating.toFixed(1)}</span>
                  {/* <span className="text-gray-500">({vehicle.reviewCount} reviews)</span> */}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{vehicle.location}</span>
                </div>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Vendor:</span> mytripsaga.com
              </div>
            </div>

            <Card>
              <CardContent className="p-3">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600">{vehicle.description}</p>
              </CardContent>
            </Card>

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

                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Engine</div>
                      <div className="text-sm text-gray-600">{vehicle.engine}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Mileage</div>
                      <div className="text-sm text-gray-600">{vehicle.mileage}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">AC</div>
                      <div className="text-sm text-gray-600">
                        {vehicle.ac ? 'Available' : 'Not Available'}
                      </div>
                    </div>
                  </div>

                </div>
              </CardContent>

            </Card>
          </div>

          {/* Right Pricing Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="mb-6">
                  <Badge className={`mb-3 text-white ${vehicle.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                    {vehicle.isAvailable ? 'Available' : 'Not Available'}
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
