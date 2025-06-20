const fallbackHotels = [
  {
    id: "1",
    name: "The Royal Palace Resort Famous",
    location: "Goa",
    rating: 4.8,
    reviewCount: 1247,
    pricePerNight: 8500,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
    ],
    description: "Experience luxury at its finest with our beachfront resort offering world-class amenities and stunning ocean views.",
    amenities: ["Wi-Fi", "Pool", "Spa", "Parking", "Breakfast", "AC", "Beach Access"],
    tags: ["Top Rated", "Luxury"],
    starCategory: 5,
    coordinates: [15.2993, 74.1240]
  },
  {
    id: "2",
    name: "Mountain View Hotel",
    location: "Manali",
    rating: 4.5,
    reviewCount: 892,
    pricePerNight: 4500,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop"
    ],
    description: "Nestled in the Himalayas, offering breathtaking mountain views and cozy accommodation.",
    amenities: ["Wi-Fi", "Parking", "Breakfast", "AC", "Heater"],
    tags: ["Mountain View", "Cozy"],
    starCategory: 4,
    coordinates: [32.2396, 77.1887]
  },
  {
    id: "3",
    name: "City Central Business Hotel",
    location: "Mumbai",
    rating: 4.2,
    reviewCount: 654,
    pricePerNight: 6800,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop"
    ],
    description: "Perfect for business travelers with modern amenities in the heart of the financial district.",
    amenities: ["Wi-Fi", "Gym", "Business Center", "Parking", "AC"],
    tags: ["Business", "Central"],
    starCategory: 4,
    coordinates: [19.0760, 72.8777]
  },
  {
    id: "4",
    name: "Heritage Lake Resort",
    location: "Udaipur",
    rating: 4.7,
    reviewCount: 1089,
    pricePerNight: 7200,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
    ],
    description: "A palatial experience overlooking the beautiful Lake Pichola with traditional Rajasthani hospitality.",
    amenities: ["Wi-Fi", "Pool", "Spa", "Parking", "Breakfast", "AC", "Lake View"],
    tags: ["Heritage", "Lake View"],
    starCategory: 5,
    coordinates: [24.5854, 73.7125]
  },
  {
    id: "5",
    name: "Beach Paradise Resort",
    location: "Goa",
    rating: 4.3,
    reviewCount: 758,
    pricePerNight: 5500,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
    ],
    description: "Beachfront property with direct access to pristine sands and crystal clear waters.",
    amenities: ["Wi-Fi", "Pool", "Parking", "Breakfast", "AC", "Beach Access"],
    tags: ["New", "Beach Front"],
    starCategory: 4,
    coordinates: [15.2993, 74.1240]
  }
];

let hotels: any[] = fallbackHotels;

try {
  const response = await fetch("https://your-backend-api.com/api/v1/hotels", {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (Array.isArray(data)) hotels = data;
  }
} catch (error) {
  console.warn("⚠️ API call failed. Using fallback hotel data.");
}

export default hotels;
