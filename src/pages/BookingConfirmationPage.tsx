import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  CheckCircle,
  Download,
  Mail,
  Calendar,
  Users,
  MapPin,
  Star,
  Home,
  Bed,
  User,
  Phone,
  CreditCard,
  Info
} from 'lucide-react';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { bookingData } = location.state || {};

  useEffect(() => {
    console.group('🧾 Booking Confirmation Page Logs');
    console.log('📦 Full bookingData received:', bookingData);
    console.groupEnd();
  }, [bookingData]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No booking found</h1>
          <p className="text-gray-600 mb-8">We couldn't find your booking details.</p>
          <Link to="/hotels">
            <Button>Browse Hotels</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Flat to structured mapping
  const booking = bookingData;

  const hotel = {
    name: booking.hotelName,
    rating: booking.hotelRating,
    location: booking.hotelCity,
    rawData: {
      address: booking.hotelAddress
    }
  };

  const room = {
    name: booking.roomType,
    size: booking.roomSize,
    bedType: booking.bedType,
    capacity: booking.numberOfGuests,
    pricePerNight: booking.pricePerNight
  };

  const guest = {
    name: booking.userName,
    email: booking.userEmail,
    phone: booking.userPhone
  };

  const payment = {
    orderId: booking.orderId || 'N/A',
    paymentId: booking.paymentId || 'N/A'
  };


  // ✅ Debug logs
  console.log('🏨 Hotel:', hotel);
  console.log('🛏️ Room:', room);
  console.log('👤 Guest:', guest);
  console.log('💸 Payment:', payment);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadReceipt = async () => {
    const input = document.getElementById('receipt-content');
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const aspectRatio = canvas.width / canvas.height;
      const finalHeight = pdfWidth / aspectRatio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight);
      pdf.save('Hotel-Booking-Receipt.pdf');
    } catch (err) {
      console.error('❌ Error generating PDF:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ✅ Receipt content */}
          <div id="receipt-content">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 shadow-lg">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Your reservation at <strong>{hotel?.name}</strong> has been successfully processed.
              </p>
            </div>

            <Card className="p-6 mb-8 shadow-lg rounded-xl border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="h-5 w-5 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{hotel?.name}</h2>
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(Number(hotel?.rating || 0)))].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 pl-8">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {hotel?.rawData?.address}, {hotel?.location}, India
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium mb-1">Booking Reference</div>
                  <div className="text-lg font-bold text-blue-900 mb-3">{booking?.bookingReference}</div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <span className={`px-2 py-1 rounded ${booking?.bookingStatus === 'CONFIRMED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {booking?.bookingStatus?.toLowerCase() || 'unknown'}
                  </span>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Bed className="h-5 w-5 text-blue-600" />
                  Room Details
                </h3>
                <div className="space-y-3">
                  <div><p className="text-sm text-gray-500">Room Type</p><p className="font-medium">{room?.name}</p></div>
                  <div><p className="text-sm text-gray-500">Size</p><p className="font-medium">{room?.size}</p></div>
                  <div><p className="text-sm text-gray-500">Bed Type</p><p className="font-medium">{room?.bedType}</p></div>
                  <div><p className="text-sm text-gray-500">Guests</p><p className="font-medium">{room?.capacity}</p></div>
                  <div><p className="text-sm text-gray-500">Special Requests</p><p className="font-medium">{booking?.specialRequests || 'None'}</p></div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Stay Details
                </h3>
                <div className="space-y-3">
                  <div><p className="text-sm text-gray-500">Check-in</p><p className="font-medium">{formatDate(booking?.checkInDate)}</p></div>
                  <div><p className="text-sm text-gray-500">Check-out</p><p className="font-medium">{formatDate(booking?.checkOutDate)}</p></div>
                  <div><p className="text-sm text-gray-500">Duration</p><p className="font-medium">{booking?.numberOfNights} nights</p></div>
                  <div><p className="text-sm text-gray-500">Price per night</p><p className="font-medium">₹{room?.pricePerNight}</p></div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Guest & Payment
                </h3>
                <div className="space-y-3">
                  <div><p className="text-sm text-gray-500">Guest Name</p><p className="font-medium">{guest?.name}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{guest?.email}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{guest?.phone}</p></div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <span className={`px-2 py-1 rounded ${booking?.paymentStatus === 'PAID'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {(booking?.paymentStatus || 'pending').toLowerCase()}
                    </span>
                  </div>
                  <div><p className="text-sm text-gray-500">Total Amount</p><p className="font-bold text-lg text-green-600">₹{booking?.totalAmount}</p></div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <Card className="p-6 bg-blue-50 border-blue-200 w-full lg:w-1/2">
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <div><p className="text-sm text-gray-500">Order ID</p><p className="font-medium">{payment?.orderId}</p></div>
                  <div><p className="text-sm text-gray-500">Payment ID</p><p className="font-medium">{payment?.paymentId}</p></div>
                  <div><p className="text-sm text-gray-500">Booked On</p><p className="font-medium">{new Date(booking?.createdAt).toLocaleString()}</p></div>
                </div>
              </Card>

              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <Button variant="outline" onClick={handleDownloadReceipt} className="w-full flex items-center gap-2 h-12">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2 h-12">
                  <Mail className="h-4 w-4" />
                  Email Confirmation
                </Button>
                <Link to="/">
                  <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Book Another Hotel
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-6 bg-yellow-50 border-yellow-200 shadow-sm mb-8">
              <h3 className="font-semibold text-lg text-yellow-800 mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-600" />
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Please arrive with a valid government-issued photo ID and this confirmation</li>
                <li>• Standard check-in time: 2:00 PM | Check-out time: 12:00 PM</li>
                <li>• Contact the hotel directly for special requests or early check-in</li>
                <li>• Cancellation policy: {booking?.numberOfNights > 3 ? 'Free cancellation up to 48 hours before check-in' : 'Free cancellation up to 24 hours before check-in'}</li>
                <li>• Questions? Contact support@travelapp.com</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
