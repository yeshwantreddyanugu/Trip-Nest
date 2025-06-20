const fallbackRooms = [
  {
    id: "1",
    hotelId: "1",
    name: "Deluxe Ocean View",
    type: "Deluxe",
    capacity: 2,
    pricePerNight: 8500,
    amenities: ["AC", "Ocean View", "King Bed", "Mini Bar"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    isAvailable: true,
    isTopRoom: true
  },
  {
    id: "2",
    hotelId: "1",
    name: "Premium Suite",
    type: "Suite",
    capacity: 4,
    pricePerNight: 12500,
    amenities: ["AC", "Ocean View", "Separate Living Room", "Jacuzzi"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    isAvailable: true,
    isTopRoom: false
  },
  {
    id: "3",
    hotelId: "2",
    name: "Mountain Deluxe",
    type: "Deluxe",
    capacity: 2,
    pricePerNight: 4500,
    amenities: ["AC", "Mountain View", "Queen Bed", "Heater"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    isAvailable: true,
    isTopRoom: true
  },
  {
    id: "4",
    hotelId: "3",
    name: "Business Executive",
    type: "Executive",
    capacity: 2,
    pricePerNight: 6800,
    amenities: ["AC", "City View", "Work Desk", "High-Speed Wi-Fi"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    isAvailable: false,
    isTopRoom: false
  }
];

const fetchRooms = async (): Promise<any[]> => {
  try {
    const response = await fetch("https://your-backend-url.com/api/v1/rooms", {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) return data;
    }
  } catch (error) {
    console.warn("⚠️ Room API failed, using fallback data");
  }
  return fallbackRooms;
};

export default fetchRooms;