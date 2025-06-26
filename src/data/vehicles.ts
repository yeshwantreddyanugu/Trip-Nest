import { useSearchParams } from 'react-router-dom';

const fallbackVehicles = [
  {
    id: 0,
    name: "Fallback Vehicle",
    type: "Bike", // Changed to match your filter options
    description: "Fallback vehicle data used due to fetch failure.",
    mileage: 0,
    status: "Available",
    isAvailable: true,
    image: "",
    pricePerHour: 100,
    pricePerDay: 500,
    pricePerWeek: 3000,
    location: "goa",
    transmission: "manual",
    fuel: "petrol",
    ac: true,
    rating: 4.5,
    reviewCount: 50,
  },
];

export const getCityFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('location') || 'goa';
};

const fetchVehiclesByCity = async (city: string = getCityFromURL()): Promise<any[]> => {
  const endpoint = `https://9511-2401-4900-1cb4-2028-78a2-eabb-c0cc-977d.ngrok-free.app/api/v1/vehicles/city/${encodeURIComponent(city)}`;

  console.log(`📍 Fetching vehicles for city: ${city}`);

  try {
    const response = await fetch(endpoint, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      console.warn("❌ Vehicle API responded with:", response.status);
      return fallbackVehicles;
    }

    const json = await response.json();
    console.log("📦 Raw API response:", json);

    // Handle different response structures
    const data = Array.isArray(json) ? json : (json.content || json.data || []);

    const vehicles = data.map((item: any) => ({
      id: item.id || 0,
      name: item.vehicleName || item.name || 'Unnamed Vehicle',
      type: item.vehicleType || item.type || 'Bike', // Default to Bike if not specified
      description: item.description || 'No description available',
      mileage: item.mileage || 0,
      status: item.status || 'Available',
      isAvailable: item.available !== false, // Default to true if not specified
      image: item.url || item.image || '',
      pricePerHour: item.hourlyPrice || item.pricePerHour || 100,
      pricePerDay: item.dailyPrice || item.pricePerDay || 500,
      pricePerWeek: item.weeklyPrice || item.pricePerWeek || 3000,
      location: item.city || item.location || item.partnerName || city,
      transmission: (item.transmission || 'manual').toLowerCase(),
      fuel: (item.fuel || 'petrol').toLowerCase(),
      ac: item.airConditioning?.toLowerCase() === 'yes' || item.ac === true,
      rating: item.rating || 4 + Math.random(), // Use provided rating or mock one
      reviewCount: item.reviewCount || Math.floor(Math.random() * 200),
    }));

    console.log("✅ Processed vehicles:", vehicles);
    return vehicles;

  } catch (error) {
    console.error("🚨 Failed to fetch vehicles by city:", error);
    return fallbackVehicles;
  }
};

export default fetchVehiclesByCity;