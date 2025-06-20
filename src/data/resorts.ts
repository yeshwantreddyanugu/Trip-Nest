const fallbackResorts = [
  {
    id: "1",
    name: "Taj Resort & Spa",
    location: "Goa",
    rating: 4.8,
    reviewCount: 1250,
    pricePerNight: 8500,
    description: "Luxury beachfront resort with world-class spa facilities and pristine beaches. Experience the ultimate in comfort and relaxation.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Pool", "Wi-Fi", "Breakfast", "Spa", "Beach Access", "Gym", "Restaurant", "Bar"],
    roomTypes: ["Deluxe Room", "Suite", "Villa"],
    checkInPolicy: "Check-in: 2:00 PM",
    checkOutPolicy: "Check-out: 12:00 PM",
    isAvailable: true
  },
  {
    id: "2",
    name: "Mountain Valley Resort",
    location: "Manali",
    rating: 4.6,
    reviewCount: 890,
    pricePerNight: 6500,
    description: "Scenic mountain resort surrounded by snow-capped peaks and lush valleys. Perfect for adventure seekers and nature lovers.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Pool", "Wi-Fi", "Breakfast", "Adventure Sports", "Mountain View", "Gym", "Restaurant"],
    roomTypes: ["Standard Room", "Deluxe Room", "Cottage"],
    checkInPolicy: "Check-in: 1:00 PM",
    checkOutPolicy: "Check-out: 11:00 AM",
    isAvailable: true
  },
  {
    id: "3",
    name: "Heritage Palace Resort",
    location: "Hyderabad",
    rating: 4.7,
    reviewCount: 1050,
    pricePerNight: 7200,
    description: "Royal heritage resort with traditional architecture and modern amenities. Experience the grandeur of Indian hospitality.",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Pool", "Wi-Fi", "Breakfast", "Heritage Tours", "Garden", "Spa", "Restaurant", "Cultural Shows"],
    roomTypes: ["Heritage Room", "Royal Suite", "Palace Villa"],
    checkInPolicy: "Check-in: 3:00 PM",
    checkOutPolicy: "Check-out: 12:00 PM",
    isAvailable: true
  },
  {
    id: "4",
    name: "Coastal Paradise Resort",
    location: "Pondicherry",
    rating: 4.5,
    reviewCount: 720,
    pricePerNight: 5800,
    description: "French colonial style resort by the Bay of Bengal. Enjoy the unique blend of Indian and French cultures.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Pool", "Wi-Fi", "Breakfast", "Beach Access", "Yoga", "Spa", "Restaurant", "Bicycle Rental"],
    roomTypes: ["Sea View Room", "Garden Room", "French Villa"],
    checkInPolicy: "Check-in: 2:00 PM",
    checkOutPolicy: "Check-out: 11:00 AM",
    isAvailable: true
  },
  {
    id: "5",
    name: "Hill Station Retreat",
    location: "Ooty",
    rating: 4.4,
    reviewCount: 650,
    pricePerNight: 5200,
    description: "Cozy hill station resort with panoramic views of the Nilgiri Hills. Perfect for a peaceful getaway.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Wi-Fi", "Breakfast", "Hill View", "Garden", "Restaurant", "Bonfire", "Trekking"],
    roomTypes: ["Hill View Room", "Cottage", "Premium Suite"],
    checkInPolicy: "Check-in: 1:00 PM",
    checkOutPolicy: "Check-out: 10:00 AM",
    isAvailable: true
  },
  {
    id: "6",
    name: "Metropolitan Resort",
    location: "Mumbai",
    rating: 4.6,
    reviewCount: 1400,
    pricePerNight: 9500,
    description: "Urban resort in the heart of Mumbai with modern facilities and easy access to city attractions.",
    images: [
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Pool", "Wi-Fi", "Breakfast", "Business Center", "Gym", "Spa", "Restaurant", "Airport Shuttle"],
    roomTypes: ["City View Room", "Executive Suite", "Presidential Suite"],
    checkInPolicy: "Check-in: 3:00 PM",
    checkOutPolicy: "Check-out: 12:00 PM",
    isAvailable: true
  }
];

let resorts: any[] = fallbackResorts;

try {
  const response = await fetch("https://your-backend-url.com/api/v1/resorts", {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (Array.isArray(data)) resorts = data;
  }
} catch (error) {
  console.warn("⚠️ Resort API failed, using fallback data");
}

export default resorts;
