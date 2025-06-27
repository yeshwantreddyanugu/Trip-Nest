import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Hotel, Car, User, Phone, MapPin, CreditCard, ClipboardList, Star, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Base_url = `https://a0bd-2401-4900-1cb4-2028-78a2-eabb-c0cc-977d.ngrok-free.app`;

const fallbackHotelData = [
    {
        bookingReference: 'BK1234567890',
        userName: 'Fallback User',
        userEmail: 'fallback@example.com',
        userPhone: '9876543210',
        checkInDate: '2025-06-27',
        checkOutDate: '2025-06-30',
        numberOfRooms: 1,
        numberOfGuests: 2,
        totalAmount: 3600.0,
        bookingStatus: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentMethod: 'ONLINE',
        specialRequests: 'Early check-in requested',
        numberOfNights: 3,
        roomType: 'Deluxe Suite',
        pricePerNight: 1200.0,
        bedType: 'King Size',
        roomSize: '45 sqm',
        hotelName: 'Grand Plaza Hotel',
        hotelAddress: '123 Luxury Street',
        hotelCity: 'Mumbai',
        hotelCountry: 'India',
        hotelRating: 4.5,
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
    },
    {
        bookingReference: 'BK9876543210',
        userName: 'Another User',
        userEmail: 'another@example.com',
        userPhone: '8765432109',
        checkInDate: '2025-07-15',
        checkOutDate: '2025-07-20',
        numberOfRooms: 2,
        numberOfGuests: 4,
        totalAmount: 7500.0,
        bookingStatus: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: 'ONLINE',
        specialRequests: 'Adjoining rooms preferred',
        numberOfNights: 5,
        roomType: 'Executive Room',
        pricePerNight: 1500.0,
        bedType: 'Queen Size',
        roomSize: '35 sqm',
        hotelName: 'Sunset Resort',
        hotelAddress: '456 Beach Road',
        hotelCity: 'Goa',
        hotelCountry: 'India',
        hotelRating: 4.2,
        amenities: ['Beach View', 'Free Breakfast', 'Gym'],
    },
];

const fallbackVehicleData = [
    {
        vehicleId: 17,
        customerName: 'Fallback User',
        customerEmail: 'fallback@vehicle.com',
        customerPhone: '7654321098',
        startDate: '2025-06-26T10:00:00',
        endDate: '2025-07-09T15:00:00',
        pickupLocation: 'Mumbai Airport',
        dropLocation: 'Mumbai Airport',
        bookingType: 'DAILY',
        specialRequests: 'Child seat required',
        totalAmount: 5000.0,
        paymentStatus: 'COMPLETED',
        bookingStatus: 'CONFIRMED',
        aadharCardUrl: '',
        panCardUrl: '',
        vehicleModel: 'Toyota Innova',
        vehicleType: 'SUV',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        seats: 7,
    },
    {
        vehicleId: 23,
        customerName: 'Premium Customer',
        customerEmail: 'premium@vehicle.com',
        customerPhone: '6543210987',
        startDate: '2025-08-01T09:00:00',
        endDate: '2025-08-07T18:00:00',
        pickupLocation: 'Delhi Railway Station',
        dropLocation: 'Delhi Airport',
        bookingType: 'WEEKLY',
        specialRequests: 'Additional driver needed',
        totalAmount: 12000.0,
        paymentStatus: 'PENDING',
        bookingStatus: 'PENDING_APPROVAL',
        aadharCardUrl: '',
        panCardUrl: '',
        vehicleModel: 'Mercedes-Benz E-Class',
        vehicleType: 'Luxury Sedan',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 4,
    },
];

const MyBookingsPage = () => {
    const navigate = useNavigate();
    const [uid, setUid] = useState<string | null>(null);
    const [hotelBookings, setHotelBookings] = useState<any[]>([]);
    const [vehicleBookings, setVehicleBookings] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('hotels');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('[🔑] Initializing MyBookingsPage component');
        const storedUid = localStorage.getItem('firebaseUID');
        setUid(storedUid);
        console.log('[🔑] Retrieved UID from localStorage:', storedUid);
    }, []);

    const fetchHotelBookings = async () => {
        console.log('[🏨] Starting hotel bookings fetch');
        setLoading(true);
        try {
            console.log('[🏨] Fetching hotel bookings for UID:', uid);
            const response = await fetch(`${Base_url}/api/bookings/user/uid/${uid}`, {
headers: {
    'ngrok-skip-browser-warning': 'true'
}
            });
            if (!response.ok) {
                console.error('[❌] Failed to fetch hotel bookings, response not OK');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('[🏨] Hotel bookings fetched successfully:', data);
            setHotelBookings(data);
        } catch (error) {
            console.error('[❌] Failed to fetch hotel bookings, using fallback data:', error);
            setHotelBookings(fallbackHotelData);
        } finally {
            console.log('[🏨] Hotel bookings fetch completed');
            setLoading(false);
        }
    };

    const fetchVehicleBookings = async () => {
        console.log('[🚗] Starting vehicle bookings fetch');
        setLoading(true);
        try {
            console.log('[🚗] Fetching vehicle bookings for UID:', uid);
            const response = await fetch(`${Base_url}/api/v1/bookings/user/${uid}`, {
headers: {
    'ngrok-skip-browser-warning': 'true'
}
            });

            if (!response.ok) {
                console.error('[❌] Failed to fetch vehicle bookings, response not OK');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('[🚗] Vehicle bookings fetched successfully:', data);
            setVehicleBookings(data);
        } catch (error) {
            console.error('[❌] Failed to fetch vehicle bookings, using fallback data:', error);
            setVehicleBookings(fallbackVehicleData);
        } finally {
            console.log('[🚗] Vehicle bookings fetch completed');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uid) {
            console.log(`[🔄] UID changed or tab switched to ${activeTab}, fetching data`);
            if (activeTab === 'hotels') fetchHotelBookings();
            if (activeTab === 'vehicles') fetchVehicleBookings();
        }
    }, [uid, activeTab]);

    const getStatusBadge = (status: string) => {
        console.log(`[🛡️] Rendering status badge for status: ${status}`);
        switch (status) {
            case 'CONFIRMED':
            case 'COMPLETED':
                return <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">{status}</Badge>;
            case 'PENDING':
            case 'PENDING_APPROVAL':
                return <Badge variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-black">{status}</Badge>;
            case 'CANCELLED':
                return <Badge variant="destructive">{status}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getPaymentBadge = (status: string) => {
        console.log(`[💳] Rendering payment badge for status: ${status}`);
        switch (status) {
            case 'PAID':
            case 'COMPLETED':
                return <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">{status}</Badge>;
            case 'PENDING':
                return <Badge variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-black">{status}</Badge>;
            case 'FAILED':
                return <Badge variant="destructive">{status}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatDateTime = (dateTimeString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateTimeString).toLocaleDateString(undefined, options);
    };

    const renderHotelCard = (booking: any, index: number) => {
        console.log(`[🏨] Rendering hotel card for booking ${index}`);
        return (
            <Card key={index} className="mb-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-gray-800">
                                <Hotel className="h-5 w-5 text-blue-600" />
                                {booking.hotelName}
                            </CardTitle>
                            <CardDescription className="mt-1 flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                {booking.hotelAddress}, {booking.hotelCity}, {booking.hotelCountry}
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{booking.hotelRating}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-full mt-0.5">
                                    <CalendarDays className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Stay Duration</p>
                                    <p className="text-gray-800">
                                        {formatDate(booking.checkInDate)} → {formatDate(booking.checkOutDate)}
                                        <span className="text-sm text-gray-500 ml-2">({booking.numberOfNights} nights)</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-100 rounded-full mt-0.5">
                                    <ClipboardList className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Room Details</p>
                                    <p className="text-gray-800">
                                        {booking.roomType} | {booking.bedType} | {booking.roomSize}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-full mt-0.5">
                                    <User className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Guests</p>
                                    <p className="text-gray-800">
                                        {booking.numberOfGuests} guest{booking.numberOfGuests > 1 ? 's' : ''},
                                        {booking.numberOfRooms} room{booking.numberOfRooms > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-full mt-0.5">
                                    <CreditCard className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Payment</p>
                                    <p className="text-gray-800">
                                        <span className="font-medium">₹{booking.totalAmount.toLocaleString()}</span>
                                        <span className="text-sm text-gray-500 ml-2">(₹{booking.pricePerNight.toLocaleString()}/night)</span>
                                    </p>
                                    <div className="mt-1">{getPaymentBadge(booking.paymentStatus)}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-full mt-0.5">
                                    <ClipboardList className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Booking Status</p>
                                    <div className="mt-1">{getStatusBadge(booking.bookingStatus)}</div>
                                </div>
                            </div>



                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-full mt-0.5">
                                    <ClipboardList className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-l font-medium text-gray-500">Booking Reference</p>
                                    <div className="mt-1">{getStatusBadge(booking.bookingReference)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {booking.specialRequests && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-1">Special Requests</p>
                            <p className="text-gray-600">{booking.specialRequests}</p>
                        </div>
                    )}

                    {booking.amenities && booking.amenities.length > 0 && (
                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
                            <div className="flex flex-wrap gap-2">
                                {booking.amenities.map((amenity: string, i: number) => (
                                    <Badge key={i} variant="outline" className="bg-white border-gray-300 text-gray-700">
                                        {amenity}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    const renderVehicleCard = (booking: any, index: number) => {
        console.log(`[🚗] Rendering vehicle card for booking ${index}`);
        return (
            <Card key={index} className="mb-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Car className="h-5 w-5 text-blue-600" />
                        Vehicle Booking
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-600">
                        <span>{booking.vehicleName}</span>
                        <span>•</span>
                        <span>{booking.vehicleType}</span>
                        <span>•</span>
                        <span>{booking.seats} seats</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-full mt-0.5">
                                    <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Customer</p>
                                    <p className="text-gray-800">{booking.customerName}</p>
                                    <p className="text-sm text-gray-600 mt-1">{booking.customerPhone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-100 rounded-full mt-0.5">
                                    <CalendarDays className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Rental Period</p>
                                    <p className="text-gray-800">
                                        {formatDateTime(booking.startDate)} → {formatDateTime(booking.endDate)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-full mt-0.5">
                                    <MapPin className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pickup Location</p>
                                    <p className="text-gray-800">{booking.pickupLocation}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-full mt-0.5">
                                    <MapPin className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Drop Location</p>
                                    <p className="text-gray-800">{booking.dropLocation}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-3">Vehicle Details</p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="bg-white border-gray-300 text-gray-700">
                                    {booking.fuelType}
                                </Badge>
                                <Badge variant="outline" className="bg-white border-gray-300 text-gray-700">
                                    {booking.transmission}
                                </Badge>
                                <Badge variant="outline" className="bg-white border-gray-300 text-gray-700">
                                    {booking.bookingType} Rental
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-gray-700">Total Amount</p>
                                <p className="font-medium text-gray-800">₹{booking.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-gray-700">Booking Status</p>
                                {getStatusBadge(booking.bookingStatus)}
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-gray-700">Payment Status</p>
                                {getPaymentBadge(booking.paymentStatus)}
                            </div>
                        </div>
                    </div>

                    {booking.specialRequests && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-1">Special Requests</p>
                            <p className="text-gray-600">{booking.specialRequests}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    const renderSkeleton = () => {
        console.log('[⏳] Rendering skeleton loader');
        return (
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <Card key={i} className="mb-6">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full mt-2" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((j) => (
                                    <div key={j} className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-4 w-1/2 mt-4" />
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3].map((k) => (
                                    <Skeleton key={k} className="h-6 w-20 rounded-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate('/')}
                        className="rounded-full shadow-sm bg-white hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800">My Bookings</h1>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full max-w-xs bg-white shadow-sm">
                        <TabsTrigger 
                            value="hotels" 
                            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                        >
                            <Hotel className="h-4 w-4" /> Hotels
                        </TabsTrigger>
                        <TabsTrigger 
                            value="vehicles" 
                            className="flex items-center gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-600"
                        >
                            <Car className="h-4 w-4" /> Vehicles
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="hotels" className="mt-8">
                        {loading ? (
                            renderSkeleton()
                        ) : hotelBookings.length > 0 ? (
                            hotelBookings.map(renderHotelCard)
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                                <Hotel className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800">No hotel bookings found</h3>
                                <p className="text-gray-500 mt-2">
                                    You haven't made any hotel bookings yet.
                                </p>
                                <Button className="mt-4" onClick={() => navigate('/')}>
                                    Browse Hotels
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="vehicles" className="mt-8">
                        {loading ? (
                            renderSkeleton()
                        ) : vehicleBookings.length > 0 ? (
                            vehicleBookings.map(renderVehicleCard)
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                                <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800">No vehicle bookings found</h3>
                                <p className="text-gray-500 mt-2">
                                    You haven't made any vehicle bookings yet.
                                </p>
                                <Button className="mt-4" onClick={() => navigate('/')}>
                                    Browse Vehicles
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default MyBookingsPage;



