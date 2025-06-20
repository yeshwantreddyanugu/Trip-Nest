
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail, Calendar, Users, MapPin } from 'lucide-react';

const BookingConfirmationPage = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBooking = localStorage.getItem('lastBooking');
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  if (!booking) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your reservation has been successfully processed.</p>
          </div>

          {/* Booking Details */}
          <Card className="p-8 mb-6">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-blue-600 font-medium">Booking ID</div>
                <div className="text-lg font-bold text-blue-900">{booking.bookingId}</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Hotel & Room</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">{booking.hotelName}</span>
                  </div>
                  <div className="text-gray-600">{booking.roomName}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Stay Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Check-in</div>
                      <div className="font-medium">{booking.checkIn}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Check-out</div>
                      <div className="font-medium">{booking.checkOut}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{booking.nights} night{booking.nights !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Guest Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Name: </span>
                    <span className="font-medium">{booking.guest.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email: </span>
                    <span className="font-medium">{booking.guest.email}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone: </span>
                    <span className="font-medium">{booking.guest.phone}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total Paid:</span>
                  <span className="font-bold text-green-600">₹{booking.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Confirmation
            </Button>
          </div>

          {/* Important Information */}
          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Please arrive with a valid government-issued photo ID</li>
              <li>• Check-in time: 2:00 PM | Check-out time: 12:00 PM</li>
              <li>• Contact the hotel directly for any special requests</li>
              <li>• Cancellation policy applies as per hotel terms</li>
            </ul>
          </Card>

          <div className="text-center mt-8">
            <Link to="/hotels">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Book Another Hotel
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
