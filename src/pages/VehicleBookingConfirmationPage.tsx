import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  CreditCard,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

const VehicleBookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);

  const bookingDetails = location.state;
  const bookingId = bookingDetails?.bookingId;

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) {
      console.warn("📄 receiptRef is not available.");
      return;
    }

    try {
      console.log("🖼️ Generating canvas from receipt section...");
      const canvas = await html2canvas(receiptRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      console.log("📄 Creating PDF...");
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const filename = `Booking_Receipt_${bookingId}.pdf`;
      pdf.save(filename);

      console.log(`✅ PDF saved as ${filename}`);
    } catch (err) {
      console.error("❌ Error generating PDF:", err);
    }
  };

  useEffect(() => {
    console.group('🚗 Vehicle Booking Confirmation State');
    console.log('Full Raw State:', location.state);
    console.log('Booking ID:', bookingId);
    console.log('Booking Details:', bookingDetails);
    if (bookingDetails) {
      Object.entries(bookingDetails).forEach(([key, value]) =>
        console.log(`🧾 ${key}:`, value)
      );
    }
    console.groupEnd();
  }, [location.state]);

  if (!bookingId || !bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Booking Details</h2>
          <p className="text-gray-600 mb-6">Please go back and try again</p>
          <Button onClick={() => navigate('/vehicles')} className="bg-blue-600 hover:bg-blue-700">
            Browse Vehicles
          </Button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-12 pt-24"
      >
        <div
          ref={receiptRef}
          className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-blue-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
            <motion.div variants={itemVariants}>
              <CheckCircle className="text-white w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Booking Confirmed!</h1>
              <p className="text-blue-100 text-lg">Your adventure begins now</p>
            </motion.div>
          </div>

          <div className="p-8 md:p-10">
            <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
              {/* Customer Details */}
              <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <User className="text-blue-600 w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Customer Details</h3>
                </div>
                <div className="space-y-3 pl-11">
                  <p><span className="font-medium w-24 inline-block">Booking ID:</span>{bookingId}</p>
                  <p><span className="font-medium w-24 inline-block">Name:</span>{bookingDetails.fullName}</p>
                  <p><span className="font-medium w-24 inline-block">Phone:</span>{bookingDetails.phone}</p>
                  <p><span className="font-medium w-24 inline-block">Email:</span>{bookingDetails.email}</p>
                </div>
              </motion.div>

              {/* Vehicle Info */}
              <motion.div variants={itemVariants} className="bg-indigo-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <MapPin className="text-indigo-600 w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Vehicle Info</h3>
                </div>
                <div className="space-y-3 pl-11">
                  <p><span className="font-medium w-24 inline-block">Vehicle:</span>{bookingDetails.vehicleName} ({bookingDetails.vehicleType})</p>
                  <p><span className="font-medium w-24 inline-block">Pickup:</span>{bookingDetails.pickupLocation}</p>
                  <p><span className="font-medium w-24 inline-block">Drop:</span>{bookingDetails.dropLocation}</p>
                  <p><span className="font-medium w-24 inline-block">Payment ID:</span>{bookingDetails.paymentId}</p>
                </div>
              </motion.div>

              {/* Booking Schedule */}
              <motion.div variants={itemVariants} className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Calendar className="text-purple-600 w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Booking Schedule</h3>
                </div>
                <div className="space-y-3 pl-11">
                  <p><span className="font-medium w-24 inline-block">From:</span>{bookingDetails.fromDate}</p>
                  <p><span className="font-medium w-24 inline-block">To:</span>{bookingDetails.toDate}</p>
                  <p><span className="font-medium w-24 inline-block">Duration:</span>{bookingDetails.duration?.days} days, {bookingDetails.duration?.hours} hrs</p>
                </div>
              </motion.div>

              {/* Payment Summary */}
              <motion.div variants={itemVariants} className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CreditCard className="text-green-600 w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Payment Summary</h3>
                </div>
                <div className="space-y-3 pl-11">
                  <p><span className="font-medium w-24 inline-block">Total:</span>₹{bookingDetails.totalCost}</p>
                  <p><span className="font-medium w-24 inline-block">Status:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
                  </p>
                  <p><span className="font-medium w-24 inline-block">Requests:</span>{bookingDetails.specialRequests || 'No special requests'}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg rounded-xl flex items-center gap-2 shadow-lg"
              >
                Browse More Vehicles <ArrowRight className="w-5 h-5" />
              </Button>
              {/* <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-xl flex items-center gap-2"
              >
                Download Receipt
              </Button> */}
            </motion.div>

            {/* Help Section */}
            <motion.div variants={itemVariants} className="mt-8 text-center text-sm text-gray-500">
              <p>Need help? Contact our support at <a href="mailto:support@wanderlust.com" className="text-blue-600 hover:underline">support@wanderlust.com</a></p>
              <p className="mt-1">A confirmation email was sent to {bookingDetails.email}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default VehicleBookingConfirmationPage;
 