
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HotelsPage from "./pages/HotelsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookRoomPage from "./pages/BookRoomPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import ResortsPage from "./pages/ResortsPage";
import ResortDetailsPage from "./pages/ResortDetailsPage";
import BookResortPage from "./pages/BookResortPage";
import VehiclesPage from "./pages/VehiclesPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import BookVehiclePage from "./pages/BookVehiclePage";
import AuthPage from "./pages/AuthPage";
import ScrollToTop from '@/components/ScrollToTop'; 
import VehicleBookingConfirmationPage from './pages/VehicleBookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage'; // update the path if needed

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter basename="/Trip-Nest">
      <ScrollToTop />
      <div id="top">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
          <Route path="/book-room/:roomId" element={<BookRoomPage />} />
          <Route path="/resorts" element={<ResortsPage />} />
          <Route path="/resort/:resortId" element={<ResortDetailsPage />} />
          <Route path="/book-resort/:resortId" element={<BookResortPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleDetailsPage />} />
          <Route path="/book-vehicle/:vehicleId" element={<BookVehiclePage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="/vehicle-booking-confirmation" element={<VehicleBookingConfirmationPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);


export default App;
