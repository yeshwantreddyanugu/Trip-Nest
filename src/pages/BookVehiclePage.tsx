import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import vehiclesData from '@/data/vehicles';


const Base_url = `https://a0bd-2401-4900-1cb4-2028-78a2-eabb-c0cc-977d.ngrok-free.app`;

const BookVehiclePage = () => {
  const { vehicleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [aadharCard, setAadharCard] = useState<File | null>(null);
  const [panCard, setPanCard] = useState<File | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');

  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    fromDate: searchParams.get('fromDate') || '',
    toDate: searchParams.get('toDate') || '',
    pickupLocation: '',
    dropLocation: ''
  });

  interface RazorpayOrderResponse {
    orderId: string;
    amount: number;
    currency: string;
    message?: string; // Optional for error cases
  }

  interface BookingApiResponse {
    bookingId?: string;
    message?: string;
    paymentId?: string;
    [key: string]: any; // (optional) to allow unknown fields
  }

  const [totalCost, setTotalCost] = useState(0);
  const [duration, setDuration] = useState({ days: 0, hours: 0 });
  const [bookingType, setBookingType] = useState<'HOURLY' | 'DAILY' | 'WEEKLY'>('DAILY');

  const storedUid = localStorage.getItem('firebaseUID');
  console.log('[🔑] Retrieved UID from localStorage:', storedUid);


  useEffect(() => {
    console.log('📦 vehicleId:', vehicleId);
    console.log('📅 From Date:', bookingData.fromDate);
    console.log('📅 To Date:', bookingData.toDate);


    let foundVehicle = null;

    if (location.state?.vehicle) {
      console.log('✅ Vehicle received from location.state');
      foundVehicle = location.state.vehicle;
    } else {
      console.log('🔍 Searching vehicle from fallback data...');
      vehiclesData().then(data => {
        const foundVehicle = data.find(v => v.id === parseInt(vehicleId || '0'));
        if (foundVehicle) {
          setVehicle(foundVehicle);
          setBookingData(prev => ({
            ...prev,
            pickupLocation: foundVehicle.location,
            dropLocation: foundVehicle.location
          }));
        } else {
          console.warn('❌ Vehicle not found for ID:', vehicleId);
          setVehicle(null);
        }
        setLoading(false);
      });

    }

    if (foundVehicle) {
      console.log('🚗 Vehicle found:', foundVehicle);
      setVehicle(foundVehicle);
      setBookingData(prev => ({
        ...prev,
        pickupLocation: foundVehicle.location,
        dropLocation: foundVehicle.location
      }));
    } else {
      console.warn('❌ Vehicle not found for ID:', vehicleId);
      setVehicle(null);
    }

    setLoading(false);
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

    let cost = 0;
    let type: 'HOURLY' | 'DAILY' | 'WEEKLY' = 'DAILY';

    if (daysDiff >= 7) {
      const weeks = Math.floor(daysDiff / 7);
      const remainingDays = daysDiff % 7;
      cost = (weeks * vehicle.pricePerWeek) + (remainingDays * vehicle.pricePerDay);
      type = 'WEEKLY';
    } else if (daysDiff >= 1) {
      cost = daysDiff * vehicle.pricePerDay;
      type = 'DAILY';
    } else {
      cost = hoursDiff * vehicle.pricePerHour;
      type = 'HOURLY';
    }

    setBookingType(type);
    setTotalCost(cost);
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (type: 'aadhar' | 'pan', file: File | null) => {
    if (file) {
      console.log(`📄 ${type} card selected:`, file.name);
      if (type === 'aadhar') {
        setAadharCard(file);
      } else {
        setPanCard(file);
      }
    }
  };

  const validateForm = () => {
    if (!bookingData.fullName || !bookingData.email || !bookingData.phone ||
      !bookingData.fromDate || !bookingData.toDate ||
      !bookingData.pickupLocation || !bookingData.dropLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    if (!aadharCard || !panCard) {
      toast({
        title: "Documents Required",
        description: "Please upload both Aadhar Card and PAN Card.",
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

  const submitBooking = async (): Promise<any | null> => {
    if (!validateForm()) return null;

    setSubmitting(true);
    console.log('🚀 Submitting vehicle booking...');

    try {
      const formData = new FormData();

      const bookingPayload = {
        vehicleId: vehicle.id,
        customerName: bookingData.fullName,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        startDate: `${bookingData.fromDate}T10:00:00`,
        endDate: `${bookingData.toDate}T15:00:00`,
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation,
        bookingType: bookingType,
        specialRequests: specialRequests,
        totalAmount: totalCost,
        paymentStatus: "PENDING",
        bookingStatus: "PENDING",
        uid: storedUid,
      };

      console.group('📝 Booking Payload');
      console.log('Payload:', bookingPayload);
      console.groupEnd();

      formData.append('bookingData', JSON.stringify(bookingPayload));
      if (aadharCard) formData.append('aadharCard', aadharCard);
      if (panCard) formData.append('panCard', panCard);

      console.group('📦 FormData Preview');
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.groupEnd();

      const response = await fetch(`${Base_url}/api/v1/bookings`, {
        method: 'POST',
        body: formData,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const rawText = await response.clone().text();
      let result: BookingApiResponse = {} as BookingApiResponse;
      try {
        result = await response.json();
      } catch (e) {
        console.error('❌ Error parsing booking response JSON:', e);
      }

      console.group('✅ Booking API Response');
      console.log('Status:', response.status);
      console.log('Raw:', rawText);
      console.log('Parsed:', result);
      console.groupEnd();

      if (!response.ok) {
        throw new Error(result?.message || 'Booking API failed');
      }

      return result;
    } catch (error: any) {
      console.error('🔥 Booking Error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
      return null;
    } finally {
      setSubmitting(false);
    }
  };


  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // Step 1: Submit the booking and get booking data
      const bookingRes = await submitBooking();
      if (!bookingRes || !bookingRes.bookingId) {
        console.error('❌ Booking failed, skipping payment.');
        return;
      }

      // Step 2: Create Razorpay Order
      const paymentPayload = {
        amount: 100, // use `totalCost * 100` for real
        currency: 'INR'
      };

      console.group('💰 Creating Razorpay Order');
      console.log('Payment Payload:', paymentPayload);
      console.groupEnd();

      const orderRes = await fetch(`${Base_url}/api/v1/payments/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(paymentPayload)
      });

      const rawOrderText = await orderRes.clone().text();

      interface RazorpayOrderResponse {
        orderId: string;
        amount: number;
        currency: string;
        message?: string;
      }

      let orderData: RazorpayOrderResponse = {} as RazorpayOrderResponse;

      try {
        orderData = await orderRes.json();
      } catch (err) {
        console.error('❌ Failed to parse Razorpay Order JSON:', err);
      }

      console.group('📦 Razorpay Order API Response');
      console.log('Status:', orderRes.status);
      console.log('Raw:', rawOrderText);
      console.log('Parsed:', orderData);
      console.groupEnd();

      if (!orderRes.ok || !orderData.orderId) {
        throw new Error(`Razorpay order creation failed: ${orderData.message || orderRes.status}`);
      }

      // Step 3: Load Razorpay Script if not loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
        await new Promise(resolve => {
          script.onload = resolve;
          script.onerror = () => {
            throw new Error('Failed to load Razorpay script');
          };
        });
      }

      // Step 4: Open Razorpay payment modal
      const rzp = new window.Razorpay({
        key: 'rzp_live_BnPhMdUqppmXgD',
        amount: paymentPayload.amount,
        currency: 'INR',
        name: 'Wanderlust',
        description: `Booking for ${vehicle.name}`,
        image: vehicle.image || '',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          console.log('💸 Razorpay Payment Success:', response);

          // Step 5: Call backend to confirm payment
          try {
            const confirmRes = await fetch(`${Base_url}/api/v1/bookings/${bookingRes.bookingId}/payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
              },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const confirmRaw = await confirmRes.clone().text();
            const confirmData = await confirmRes.json();

            console.group('✅ Payment Confirmation Response');
            console.log('Status:', confirmRes.status);
            console.log('Raw:', confirmRaw);
            console.log('Parsed:', confirmData);
            console.groupEnd();

            if (!confirmRes.ok) {
              throw new Error(confirmData.message || 'Failed to confirm payment');
            }

            toast({
              title: 'Payment Successful',
              description: `Payment ID: ${response.razorpay_payment_id}`
            });

            // Step 6: Navigate to confirmation page
            const fullBookingDetails = {
              bookingId: bookingRes.bookingId,
              type: 'vehicle',
              vehicleId: vehicle.id,
              vehicleName: vehicle.name,
              vehicleType: vehicle.type,
              vehicleCategory: vehicle.category,
              vehicleVendor: vehicle.vendor,
              vehicleImage: vehicle.image,
              pickupLocation: bookingData.pickupLocation,
              dropLocation: bookingData.dropLocation,
              startDate: `${bookingData.fromDate}T10:00:00`,
              endDate: `${bookingData.toDate}T15:00:00`,
              bookingType,
              duration,
              specialRequests,
              fullName: bookingData.fullName,
              email: bookingData.email,
              phone: bookingData.phone,
              totalCost,
              paymentId: response.razorpay_payment_id,
            };

            navigate('/vehicle-booking-confirmation', {
              state: {
                ...fullBookingDetails
              }
            });

          } catch (err) {
            console.error('❌ Payment Confirmation Failed:', err);
            toast({
              title: 'Payment Verification Failed',
              description: 'Your payment went through but was not confirmed. Please contact support.',
              variant: 'destructive'
            });
          }
        },
        prefill: {
          name: bookingData.fullName,
          email: bookingData.email,
          contact: bookingData.phone
        },
        theme: {
          color: '#3B82F6'
        }
      });

      rzp.open();
    } catch (error: any) {
      console.error('❌ Payment Error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to process payment',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
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
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

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
                    <Label htmlFor="pickupLocation">Pickup Location *</Label>
                    <Input
                      id="pickupLocation"
                      value={bookingData.pickupLocation}
                      onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dropLocation">Drop Location *</Label>
                    <Input
                      id="dropLocation"
                      value={bookingData.dropLocation}
                      onChange={(e) => handleInputChange('dropLocation', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Documents Upload</h3>
                  <div>
                    <Label htmlFor="aadharCard">Aadhar Card *</Label>
                    <Input
                      id="aadharCard"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('aadhar', e.target.files?.[0] || null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="panCard">PAN Card *</Label>
                    <Input
                      id="panCard"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('pan', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Special Requests</h3>
                  <Input
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements?"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={vehicle.image || '/placeholder-vehicle.jpg'}
                    alt={vehicle.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">{vehicle.type} • {vehicle.category}</p>
                    <p className="text-sm text-gray-600">{vehicle.vendor}</p>
                  </div>
                </div>

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

                {bookingData.pickupLocation && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Pickup Location</span>
                    </div>
                    <p className="text-sm text-gray-600">{bookingData.pickupLocation}</p>
                  </div>
                )}

                {bookingData.dropLocation && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Drop Location</span>
                    </div>
                    <p className="text-sm text-gray-600">{bookingData.dropLocation}</p>
                  </div>
                )}

                {totalCost > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-medium">Cost Breakdown</h4>
                    <div className="space-y-1 text-sm">
                      {bookingType === 'WEEKLY' && (
                        <div className="flex justify-between">
                          <span>{Math.floor(duration.days / 7)} week(s) × ₹{vehicle.pricePerWeek}</span>
                          <span>₹{Math.floor(duration.days / 7) * vehicle.pricePerWeek}</span>
                        </div>
                      )}
                      {bookingType === 'DAILY' && (
                        <div className="flex justify-between">
                          <span>{duration.days} day(s) × ₹{vehicle.pricePerDay}</span>
                          <span>₹{duration.days * vehicle.pricePerDay}</span>
                        </div>
                      )}
                      {bookingType === 'HOURLY' && (
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

                <Button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                  disabled={totalCost === 0 || submitting}
                >
                  {submitting ? 'Processing...' : `Book & Pay ₹${totalCost.toLocaleString()}`}
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