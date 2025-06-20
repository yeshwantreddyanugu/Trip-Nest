
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
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
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
