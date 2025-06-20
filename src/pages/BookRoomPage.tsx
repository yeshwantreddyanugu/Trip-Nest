
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, Bed } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import roomsData from '@/data/rooms';
import hotelsData from '@/data/hotels';

const BookRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [bookingData, setBookingData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundRoom = roomsData.find(r => r.id === roomId);
      if (foundRoom) {
        const foundHotel = hotelsData.find(h => h.id === foundRoom.hotelId);
        setRoom(foundRoom);
        setHotel(foundHotel);
      }
      setLoading(false);
    }, 1000);
  }, [roomId]);

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diffTime = Math.abs(bookingData.checkOut - bookingData.checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * (room?.pricePerNight || 0);
  };

  const handleBooking = () => {
    // Validate form
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.name || !bookingData.email || !bookingData.phone) {
      alert('Please fill all required fields');
      return;
    }

    if (bookingData.guests > room.capacity) {
      alert(`Maximum ${room.capacity} guests allowed for this room`);
      return;
    }

    // Simulate payment and redirect to confirmation
    const bookingDetails = {
      roomId,
      hotelName: hotel.name,
      roomName: room.name,
      checkIn: format(bookingData.checkIn, 'PPP'),
      checkOut: format(bookingData.checkOut, 'PPP'),
      nights: calculateNights(),
      total: calculateTotal(),
      guest: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone
      },
      bookingId: `WL${Date.now()}`
    };

    localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));
    navigate('/booking-confirmation');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!room || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Room not found</h1>
          <p className="text-gray-600">The room you're trying to book doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Room</h1>
          <p className="text-gray-600">{hotel.name} - {room.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
              
              <div className="space-y-6">
                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin">Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2",
                            !bookingData.checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={bookingData.checkIn}
                          onSelect={(date) => setBookingData({...bookingData, checkIn: date})}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="checkout">Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2",
                            !bookingData.checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={bookingData.checkOut}
                          onSelect={(date) => setBookingData({...bookingData, checkOut: date})}
                          disabled={(date) => date <= (bookingData.checkIn || new Date())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <select 
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                    className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({length: room.capacity}, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Guest Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Guest Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      className="mt-2"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      className="mt-2"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      className="mt-2"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{room.name}</h4>
                    <p className="text-sm text-gray-600">{hotel.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{room.capacity} guests max</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-medium">
                      {bookingData.checkIn ? format(bookingData.checkIn, "MMM dd, yyyy") : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span className="font-medium">
                      {bookingData.checkOut ? format(bookingData.checkOut, "MMM dd, yyyy") : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium">{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights:</span>
                    <span className="font-medium">{calculateNights()}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>₹{room.pricePerNight.toLocaleString()} × {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all py-3"
                  disabled={!bookingData.checkIn || !bookingData.checkOut || !bookingData.name || !bookingData.email || !bookingData.phone}
                >
                  Proceed to Payment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookRoomPage;
