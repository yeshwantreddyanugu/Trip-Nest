// hotel.ts
export interface HotelApiResponse {
  content: any[];
  totalPages: number;
  totalElements: number;
  number: number;
  [key: string]: any;
}

export interface FetchHotelsOptions {
  city?: string;
  query?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  activeOnly?: boolean;
}

export interface FilterHotelsOptions {
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  rating?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

const BASE_URL = 'https://a0bd-2401-4900-1cb4-2028-78a2-eabb-c0cc-977d.ngrok-free.app/api/v1/hotels';

const fetchHotels = async ({
  city,
  query,
  page = 0,
  size = 10,
  sortBy = 'rating',
  sortDir = 'desc',
  activeOnly = false
}: FetchHotelsOptions): Promise<HotelApiResponse> => {
  try {
    const baseURL = query
      ? `${BASE_URL}/search`
      : `${BASE_URL}/city/${encodeURIComponent(city || 'Goa')}`;

    const url = new URL(baseURL);

    if (query) {
      console.log(`🔎 Searching hotels with query: "${query}"`);
      url.searchParams.append('query', query);
    } else {
      console.log(`📍 Fetching hotels for city: "${city}"`);
      url.searchParams.append('activeOnly', activeOnly.toString());
    }

    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('sortDir', sortDir); // ✅ corrected

    console.log('🌐 Hotel Fetch API:', url.toString());

    const response = await fetch(url.toString(), {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    });

    console.log('📡 fetchHotels response status:', response.status);
    if (!response.ok) throw new Error(`API failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('🚨 fetchHotels error:', error);
    throw error;
  }
};

const fetchFilteredHotels = async ({
  minPrice,
  maxPrice,
  amenities,
  rating,
  page = 0,
  size = 10,
  sortBy = 'rating',
  sortDir = 'desc'
}: FilterHotelsOptions): Promise<HotelApiResponse> => {
  try {
    const url = new URL(`${BASE_URL}/search/advanced`);

    if (minPrice !== undefined) url.searchParams.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) url.searchParams.append('maxPrice', maxPrice.toString()); // ✅ ensure correct
    if (rating !== undefined) url.searchParams.append('rating', rating.toString());
    if (amenities?.length) {
      url.searchParams.append('amenities', amenities.join(',').toLowerCase());
    }

    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('sortDir', sortDir); // ✅ corrected key

    console.log('🌐 Filtered API URL:', url.toString());

    const response = await fetch(url.toString(), {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    });

    console.log('📡 fetchFilteredHotels status:', response.status);
    if (!response.ok) throw new Error(`Filter API failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('🚨 fetchFilteredHotels error:', error);
    throw error;
  }
};

const transformHotelData = (data: HotelApiResponse): HotelApiResponse => {
  if (!Array.isArray(data.content)) throw new Error('❌ Invalid hotel data');

  const transformedContent = data.content.map((hotel: any, index: number) => ({
    id: hotel.id?.toString() || `hotel-${index + 1}`,
    name: hotel.name || `Unnamed Hotel`,
    location: hotel.city || "Unknown",
    rating: hotel.rating || 0,
    reviewCount: hotel.bookings || 0,
    pricePerNight: hotel.revenue || 0,
    image: hotel.thumbnail || "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
    images: [
      hotel.thumbnail || "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop"
    ],
    description: hotel.description || "No description available",
    amenities: hotel.amenities ? hotel.amenities.split(',').map((a: string) => a.trim()) : [],
    tags: [],
    starCategory: Math.floor(hotel.rating || 0),
    coordinates: [0, 0],
    rawData: hotel
  }));

  console.log('✅ Transformed hotels sample:', transformedContent.slice(0, 3));
  return { ...data, content: transformedContent };
};

export { fetchHotels, fetchFilteredHotels, transformHotelData };
