import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Base_url = `https://a0bd-2401-4900-1cb4-2028-78a2-eabb-c0cc-977d.ngrok-free.app`;

const BookRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState<any>(null);
  const [hotel, setHotel] = useState<any>(null);
  const [rawRoom, setRawRoom] = useState<any>(null);
  const [rawHotel, setRawHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 1,
    rooms: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const storedUid = localStorage.getItem('firebaseUID');
  console.log('[🔑] Retrieved UID from localStorage:', storedUid);

  useEffect(() => {
    const state = location.state;
    console.group('📦 Initial Data Loading');
    console.log('Location State:', state);
    console.log('URL Param roomId:', roomId);

    if (state?.transformedRoom && state?.transformedHotel) {
      console.log('✅ Received transformed data:', {
        room: state.transformedRoom,
        hotel: state.transformedHotel
      });
      console.log('📥 Received raw data:', {
        rawRoom: state.rawRoom,
        rawHotel: state.rawHotel
      });

      setRoom(state.transformedRoom);
      setHotel(state.transformedHotel);
      setRawRoom(state.rawRoom || null);
      setRawHotel(state.rawHotel || null);
    } else {
      console.warn('⚠️ Missing transformedRoom or transformedHotel in state');
    }
    console.groupEnd();
    setLoading(false);
  }, [location.state]);


  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diffTime = Math.abs(bookingData.checkOut.getTime() - bookingData.checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    return calculateNights() * (room?.pricePerNight || 0) * bookingData.rooms;
  };

  const formatDateForBackend = (date: Date | null) => {
    return date ? format(date, 'yyyy-MM-dd') : null;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('✅ Razorpay script loaded');
        resolve(true);
      };
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiateBooking = async () => {
    if (
      !bookingData.checkIn || !bookingData.checkOut ||
      !bookingData.name || !bookingData.email || !bookingData.phone
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (bookingData.guests > (room?.capacity || 2)) {
      alert(`Maximum ${room?.capacity || 2} guests allowed`);
      return;
    }

    setIsProcessing(true);

    try {
      const bookingPayload = {
        roomId: rawRoom?.id || roomId,
        userName: bookingData.name,
        userEmail: bookingData.email,
        userPhone: bookingData.phone,
        checkInDate: formatDateForBackend(bookingData.checkIn),
        checkOutDate: formatDateForBackend(bookingData.checkOut),
        numberOfRooms: bookingData.rooms,
        numberOfGuests: bookingData.guests,
        specialRequests: bookingData.specialRequests,
        uid:storedUid,
      };

      console.group('📝 Booking Payload');
      console.log('Payload being sent:', bookingPayload);
      console.groupEnd();

      const response = await fetch(`${Base_url}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(bookingPayload)
      });

      const rawBookingText = await response.clone().text();
      let bookingResponse: any = {};

      try {
        bookingResponse = await response.json();
      } catch (err) {
        console.error('❌ Failed to parse booking API JSON:', err);
      }

      console.group('📦 Booking API Response');
      console.log('Status:', response.status);
      console.log('Raw Text:', rawBookingText);
      console.log('Parsed JSON:', bookingResponse);
      console.groupEnd();

      if (!response.ok) {
        throw new Error(`Booking API failed: ${bookingResponse?.message || response.status}`);
      }

      const bookingId = bookingResponse?.id;
      if (!bookingId) throw new Error("Booking ID missing from response");

      // Step 2: Create Razorpay Order
      const amount = calculateTotal();
      const paymentPayload = {
        amount: 100, // For testing, real value = `amount`
        currency: "INR"
      };

      console.group('💰 Creating Razorpay Order');
      console.log('Sending payment payload:', paymentPayload);
      console.groupEnd();

      const paymentRes = await fetch(`${Base_url}/api/v1/payments/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(paymentPayload)
      });

      const rawPaymentText = await paymentRes.clone().text();
      let paymentData: any = {};

      try {
        paymentData = await paymentRes.json();
      } catch (err) {
        console.error('❌ Failed to parse Razorpay order JSON:', err);
      }

      console.group('✅ Razorpay Order API Response');
      console.log('Status:', paymentRes.status);
      console.log('Raw Text:', rawPaymentText);
      console.log('Parsed JSON:', paymentData);
      console.groupEnd();

      if (!paymentRes.ok || !paymentData.orderId) {
        throw new Error(`Razorpay order creation failed: ${paymentData?.message || paymentRes.status}`);
      }

      // Load Razorpay script if not already
      if (!window.Razorpay) {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          throw new Error('Failed to load Razorpay script');
        }
      }

      const options = {
        key: "rzp_live_BnPhMdUqppmXgD",
        amount: amount,
        currency: "INR",
        name: hotel?.name || 'Hotel Booking',
        description: `Booking for ${room?.name}`,
        image: room?.mainImage || '',
        order_id: paymentData.orderId,
        handler: async function (response: any) {
          console.log('💸 Payment successful:', response);

          // Step 3: Confirm booking
          try {
            console.group('✅ Confirming Booking');
            const confirmRes = await fetch(`${Base_url}/api/bookings/${bookingId}/confirm`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
              }
            });

            const rawConfirm = await confirmRes.clone().text();
            const confirmJson = await confirmRes.json();
            confirmJson.orderId = response.razorpay_order_id;
            confirmJson.paymentId = response.razorpay_payment_id;

            console.log('Raw:', rawConfirm);
            console.log('Parsed:', confirmJson);
            console.groupEnd();

            if (!confirmRes.ok) {
              throw new Error(`Booking confirmation failed: ${confirmJson?.message || confirmRes.status}`);
            }

            // ✅ Step 4: Navigate to confirmation page with confirmed data
            navigate('/booking-confirmation', {
              state: {
                bookingData: confirmJson
              }
            });


          } catch (err) {
            console.error('❌ Error confirming booking:', err);
            alert("Payment done, but booking confirmation failed.");
          }
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('❌ Booking error:', error);
      alert(`Booking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };





  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">Loading...</div>
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
          <Link to="/hotels" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Browse available rooms
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Room</h1>
        <p className="text-gray-600">{hotel.name} – {room.name}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Booking Details</h2>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Check-in *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start mt-2", !bookingData.checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={bookingData.checkIn}
                        onSelect={(date) => setBookingData({ ...bookingData, checkIn: date })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Check-out *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start mt-2", !bookingData.checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={bookingData.checkOut}
                        onSelect={(date) => setBookingData({ ...bookingData, checkOut: date })}
                        disabled={(date) => date <= (bookingData.checkIn || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Rooms & Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Number of Room*</Label>
                  <Input
                    type="number"
                    value={1}
                    readOnly
                    className="w-full mt-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label>Number of Guests *</Label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                    className="w-full mt-2 p-3 border rounded-lg"
                  >
                    {Array.from({ length: room.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Info */}
              <div className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Your name"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Special Requests</Label>
                  <Input
                    placeholder="Any special requests?"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="p-6 sticky top-8 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-5">Booking Summary</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={room.mainImage}
                  alt={room.name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{room.name}</h4>
                  <p className="text-sm text-gray-600">{hotel.name}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} guest{room.capacity > 1 ? 's' : ''} max</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between"><span>Check-in:</span><span className="font-medium">{bookingData.checkIn ? format(bookingData.checkIn, "MMM dd, yyyy") : 'Not selected'}</span></div>
                <div className="flex justify-between"><span>Check-out:</span><span className="font-medium">{bookingData.checkOut ? format(bookingData.checkOut, "MMM dd, yyyy") : 'Not selected'}</span></div>
                <div className="flex justify-between"><span>Guests:</span><span className="font-medium">{bookingData.guests}</span></div>
                <div className="flex justify-between"><span>Rooms:</span><span className="font-medium">{bookingData.rooms}</span></div>
                <div className="flex justify-between"><span>Nights:</span><span className="font-medium">{calculateNights()}</span></div>
              </div>

              <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>₹{room.pricePerNight.toLocaleString()} × {calculateNights()} night{calculateNights() !== 1 ? 's' : ''} × {bookingData.rooms} room{bookingData.rooms !== 1 ? 's' : ''}</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={initiateBooking}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all"
                disabled={
                  !bookingData.checkIn ||
                  !bookingData.checkOut ||
                  !bookingData.name ||
                  !bookingData.email ||
                  !bookingData.phone ||
                  isProcessing
                }
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookRoomPage;