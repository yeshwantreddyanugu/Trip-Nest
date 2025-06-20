
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, MapPin, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import resortsData from '@/data/resorts';

const BookResortPage = () => {
  const { resortId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const preCheckIn = searchParams.get('checkIn');
  const preCheckOut = searchParams.get('checkOut');

  useEffect(() => {
    // Load resort data
    setTimeout(() => {
      const foundResort = resortsData.find(r => r.id === resortId);
      setResort(foundResort);
      if (foundResort && foundResort.roomTypes.length > 0) {
        setSelectedRoomType(foundResort.roomTypes[0]);
      }
      setLoading(false);
    }, 500);

    // Set pre-filled dates
    if (preCheckIn) setCheckInDate(new Date(preCheckIn));
    if (preCheckOut) setCheckOutDate(new Date(preCheckOut));
  }, [resortId, preCheckIn, preCheckOut]);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const calculateTotal = () => {
    if (!resort) return 0;
    return resort.pricePerNight * calculateNights();
  };

  const handlePayment = () => {
    // Validate form
    if (!checkInDate || !checkOutDate || !guestName || !guestEmail || !guestPhone) {
      alert('Please fill in all required fields');
      return;
    }

    if (guestCount < 1) {
      alert('Please select at least 1 guest');
      return;
    }

    // Mock Razorpay integration
    const options = {
      key: 'rzp_test_1234567890', // Replace with actual Razorpay key
      amount: calculateTotal() * 100, // Amount in paise
      currency: 'INR',
      name: 'Resort Booking',
      description: `Booking for ${resort.name}`,
      handler: function (response) {
        // Payment successful
        const bookingId = 'RZP' + Math.random().toString(36).substr(2, 9).toUpperCase();
        navigate(`/booking-confirmation?bookingId=${bookingId}&type=resort`);
      },
      prefill: {
        name: guestName,
        email: guestEmail,
        contact: guestPhone,
      },
      theme: {
        color: '#3B82F6',
      },
    };

    // In a real app, you would load Razorpay script and call:
    // const rzp = new window.Razorpay(options);
    // rzp.open();
    
    // For demo, simulate successful payment
    setTimeout(() => {
      const bookingId = 'RZP' + Math.random().toString(36).substr(2, 9).toUpperCase();
      navigate(`/booking-confirmation?bookingId=${bookingId}&type=resort`);
    }, 1000);
  };

  if (loading || !resort) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Stay</h1>
          <p className="text-gray-600">Complete your booking details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
              
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkInDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Check-out Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkOutDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guest Count and Room Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <select 
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full p-3 border rounded-lg"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Room Type</label>
                  <select 
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    {resort.roomTypes.map(roomType => (
                      <option key={roomType} value={roomType}>{roomType}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Information */}
              <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
              
              {/* Resort Info */}
              <div className="mb-6">
                <img 
                  src={resort.images[0]} 
                  alt={resort.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-lg">{resort.name}</h4>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{resort.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{resort.rating}</span>
                  <span className="text-gray-500">({resort.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Booking Details */}
              {checkInDate && checkOutDate && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Check-in:</span>
                    <span>{format(checkInDate, "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Check-out:</span>
                    <span>{format(checkOutDate, "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Nights:</span>
                    <span>{nights}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Guests:</span>
                    <span>{guestCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Type:</span>
                    <span>{selectedRoomType}</span>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>₹{resort.pricePerNight.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handlePayment}
              >
                Book & Pay ₹{total.toLocaleString()}
              </Button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Secure payment powered by Razorpay
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookResortPage;
