
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import vehiclesData from '@/data/vehicles';

const BookVehiclePage = () => {
  const { vehicleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form data
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    fromDate: searchParams.get('fromDate') || '',
    toDate: searchParams.get('toDate') || '',
    location: ''
  });

  const [totalCost, setTotalCost] = useState(0);
  const [duration, setDuration] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundVehicle = vehiclesData.find(v => v.id === vehicleId);
      setVehicle(foundVehicle || null);
      if (foundVehicle) {
        setBookingData(prev => ({ ...prev, location: foundVehicle.location }));
      }
      setLoading(false);
    }, 500);
  }, [vehicleId]);

  useEffect(() => {
    if (vehicle && bookingData.fromDate && bookingData.toDate) {
      calculateCost();
    }
  }, [vehicle, bookingData.fromDate, bookingData.toDate]);

  const calculateCost = () => {
    if (!vehicle || !bookingData.fromDate || !bookingData.toDate) return;

    const fromDate = new Date(bookingData.fromDate);
    const toDate = new Date(bookingData.toDate);
    const timeDiff = toDate.getTime() - fromDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const hoursDiff = Math.ceil(timeDiff / (1000 * 3600));

    setDuration({ days: daysDiff, hours: hoursDiff });

    // Calculate cost based on days primarily
    let cost = 0;
    if (daysDiff >= 7) {
      const weeks = Math.floor(daysDiff / 7);
      const remainingDays = daysDiff % 7;
      cost = (weeks * vehicle.pricePerWeek) + (remainingDays * vehicle.pricePerDay);
    } else if (daysDiff >= 1) {
      cost = daysDiff * vehicle.pricePerDay;
    } else {
      cost = hoursDiff * vehicle.pricePerHour;
    }

    setTotalCost(cost);
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!bookingData.fullName || !bookingData.email || !bookingData.phone || 
        !bookingData.fromDate || !bookingData.toDate || !bookingData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    const fromDate = new Date(bookingData.fromDate);
    const toDate = new Date(bookingData.toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today) {
      toast({
        title: "Invalid Date",
        description: "From date cannot be in the past.",
        variant: "destructive"
      });
      return false;
    }

    if (toDate <= fromDate) {
      toast({
        title: "Invalid Date Range",
        description: "To date must be after from date.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    // Simulate Razorpay integration
    const options = {
      key: "rzp_test_9WzaX0FSELsdk8", // Test key
      amount: totalCost * 100, // Amount in paise
      currency: "INR",
      name: "Wanderlust",
      description: `Vehicle Booking - ${vehicle?.name}`,
      handler: function (response: any) {
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        
        // Navigate to confirmation page
        navigate('/booking-confirmation', {
          state: {
            type: 'vehicle',
            bookingDetails: {
              ...bookingData,
              vehicleName: vehicle?.name,
              vehicleType: vehicle?.type,
              totalCost,
              duration,
              paymentId: response.razorpay_payment_id
            }
          }
        });
      },
      prefill: {
        name: bookingData.fullName,
        email: bookingData.email,
        contact: bookingData.phone
      },
      theme: {
        color: "#3B82F6"
      }
    };

    // In a real app, you would load Razorpay dynamically
    console.log('Razorpay options:', options);
    
    // For demo purposes, simulate successful payment
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Booking confirmed successfully.",
      });
      
      navigate('/booking-confirmation', {
        state: {
          type: 'vehicle',
          bookingDetails: {
            ...bookingData,
            vehicleName: vehicle?.name,
            vehicleType: vehicle?.type,
            totalCost,
            duration,
            paymentId: 'demo_payment_' + Date.now()
          }
        }
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Booking Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Booking Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromDate">From Date *</Label>
                      <Input
                        id="fromDate"
                        type="date"
                        value={bookingData.fromDate}
                        onChange={(e) => handleInputChange('fromDate', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="toDate">To Date *</Label>
                      <Input
                        id="toDate"
                        type="date"
                        value={bookingData.toDate}
                        onChange={(e) => handleInputChange('toDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Pickup Location *</Label>
                    <Input
                      id="location"
                      value={bookingData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter pickup location"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Vehicle Info */}
                <div className="flex gap-4">
                  <img 
                    src={vehicle.images[0]} 
                    alt={vehicle.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">{vehicle.type} • {vehicle.category}</p>
                    <p className="text-sm text-gray-600">{vehicle.vendor}</p>
                  </div>
                </div>

                {/* Duration & Dates */}
                {bookingData.fromDate && bookingData.toDate && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>From: {bookingData.fromDate}</p>
                      <p>To: {bookingData.toDate}</p>
                      <p className="font-medium mt-1">
                        {duration.days > 0 ? `${duration.days} day(s)` : `${duration.hours} hour(s)`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {bookingData.location && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Pickup Location</span>
                    </div>
                    <p className="text-sm text-gray-600">{bookingData.location}</p>
                  </div>
                )}

                {/* Cost Breakdown */}
                {totalCost > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-medium">Cost Breakdown</h4>
                    <div className="space-y-1 text-sm">
                      {duration.days >= 7 && (
                        <div className="flex justify-between">
                          <span>{Math.floor(duration.days / 7)} week(s) × ₹{vehicle.pricePerWeek}</span>
                          <span>₹{Math.floor(duration.days / 7) * vehicle.pricePerWeek}</span>
                        </div>
                      )}
                      {duration.days >= 1 && duration.days % 7 > 0 && (
                        <div className="flex justify-between">
                          <span>{duration.days % 7} day(s) × ₹{vehicle.pricePerDay}</span>
                          <span>₹{(duration.days % 7) * vehicle.pricePerDay}</span>
                        </div>
                      )}
                      {duration.days < 1 && (
                        <div className="flex justify-between">
                          <span>{duration.hours} hour(s) × ₹{vehicle.pricePerHour}</span>
                          <span>₹{duration.hours * vehicle.pricePerHour}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>₹{totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Payment Button */}
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                  disabled={totalCost === 0}
                >
                  Book & Pay ₹{totalCost.toLocaleString()}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>✓ Secure payment via Razorpay</p>
                  <p>✓ Free cancellation up to 24 hours</p>
                  <p>✓ Instant booking confirmation</p>
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

export default BookVehiclePage;
