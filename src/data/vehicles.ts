const fallbackVehicles = [
  {
    id: "1",
    name: "Royal Enfield Classic 350",
    type: "2W",
    category: "Bike",
    transmission: "Manual",
    fuel: "Petrol",
    ac: false,
    seating: 2,
    mileage: "35 kmpl",
    engine: "350cc",
    vendor: "Royal Rides",
    rating: 4.5,
    reviewCount: 124,
    pricePerHour: 150,
    pricePerDay: 800,
    pricePerWeek: 4500,
    location: "Goa",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Perfect for cruising through Goa's scenic routes. Classic Royal Enfield experience with modern reliability.",
    tags: ["Top Rated", "Most Booked"],
    availability: "Available Now"
  },
  {
    id: "2",
    name: "Maruti Swift Dzire",
    type: "4W",
    category: "Sedan",
    transmission: "Manual",
    fuel: "Petrol",
    ac: true,
    seating: 5,
    mileage: "22 kmpl",
    engine: "1200cc",
    vendor: "Swift Rentals",
    rating: 4.3,
    reviewCount: 89,
    pricePerHour: 250,
    pricePerDay: 1500,
    pricePerWeek: 9000,
    location: "Mumbai",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Comfortable sedan perfect for city drives and highway trips. Spacious interior with modern amenities.",
    tags: ["Available Now", "AC"],
    availability: "Available Now"
  },
  {
    id: "3",
    name: "Honda Activa 6G",
    type: "2W",
    category: "Scooter",
    transmission: "Automatic",
    fuel: "Petrol",
    ac: false,
    seating: 2,
    mileage: "60 kmpl",
    engine: "110cc",
    vendor: "Quick Rides",
    rating: 4.2,
    reviewCount: 156,
    pricePerHour: 80,
    pricePerDay: 400,
    pricePerWeek: 2500,
    location: "Bangalore",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588472606400-e2c8f10a6bdb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Easy to ride scooter perfect for city commuting. Excellent fuel efficiency and comfortable seating.",
    tags: ["Fuel Efficient", "Easy Ride"],
    availability: "Available Now"
  },
  {
    id: "4",
    name: "Hyundai Creta",
    type: "4W",
    category: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    seating: 5,
    mileage: "18 kmpl",
    engine: "1500cc",
    vendor: "Premium Wheels",
    rating: 4.6,
    reviewCount: 73,
    pricePerHour: 400,
    pricePerDay: 2500,
    pricePerWeek: 15000,
    location: "Delhi",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1549399936-e7c4a90a3738?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Premium SUV with advanced features and spacious interior. Perfect for family trips and long drives.",
    tags: ["Premium", "Family Friendly"],
    availability: "Available Now"
  },
  {
    id: "5",
    name: "KTM Duke 390",
    type: "2W",
    category: "Bike",
    transmission: "Manual",
    fuel: "Petrol",
    ac: false,
    seating: 2,
    mileage: "25 kmpl",
    engine: "390cc",
    vendor: "Speed Demons",
    rating: 4.7,
    reviewCount: 92,
    pricePerHour: 200,
    pricePerDay: 1200,
    pricePerWeek: 7000,
    location: "Manali",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-performance bike perfect for mountain adventures. Powerful engine with excellent handling.",
    tags: ["High Performance", "Adventure"],
    availability: "Limited Units"
  },
  {
    id: "6",
    name: "Mahindra Thar",
    type: "4W",
    category: "SUV",
    transmission: "Manual",
    fuel: "Diesel",
    ac: true,
    seating: 4,
    mileage: "15 kmpl",
    engine: "2200cc",
    vendor: "Off Road Kings",
    rating: 4.8,
    reviewCount: 45,
    pricePerHour: 500,
    pricePerDay: 3500,
    pricePerWeek: 20000,
    location: "Ooty",
    isAvailable: true,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultimate off-road vehicle for adventure enthusiasts. Perfect for hill station exploration.",
    tags: ["Off Road", "Adventure", "Top Rated"],
    availability: "Available Now"
  }
];

let vehicles: any[] = fallbackVehicles;

try {
  const response = await fetch("https://your-backend-url.com/api/v1/vehicles", {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (Array.isArray(data)) vehicles = data;
  }
} catch (error) {
  console.warn("⚠️ Vehicle API failed, using fallback data");
}

export default vehicles;
