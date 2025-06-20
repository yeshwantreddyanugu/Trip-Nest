
import React, { useState } from 'react';
import { Star, Heart, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedListings = () => {
  const [activeCategory, setActiveCategory] = useState('hotels');

  const listings = {
    hotels: [
      {
        id: 1,
        name: 'Luxury Beach Resort',
        location: 'Goa, India',
        price: '₹8,500',
        originalPrice: '₹12,000',
        rating: 4.8,
        reviews: 324,
        image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
        features: ['Free WiFi', 'Pool', 'Spa'],
        discount: '30% OFF'
      },
      {
        id: 2,
        name: 'Mountain View Hotel',
        location: 'Manali, India',
        price: '₹4,200',
        originalPrice: '₹6,000',
        rating: 4.6,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        features: ['Mountain View', 'Breakfast', 'Parking'],
        discount: '30% OFF'
      },
      {
        id: 3,
        name: 'Heritage Palace',
        location: 'Hyderabad, India',
        price: '₹6,800',
        originalPrice: '₹9,500',
        rating: 4.9,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
        features: ['Heritage', 'Restaurant', 'Concierge'],
        discount: '28% OFF'
      }
    ],
    resorts: [
      {
        id: 4,
        name: 'Tropical Paradise Resort',
        location: 'Goa, India',
        price: '₹15,000',
        originalPrice: '₹20,000',
        rating: 4.9,
        reviews: 256,
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
        features: ['All Inclusive', 'Private Beach', 'Water Sports'],
        discount: '25% OFF'
      },
      {
        id: 5,
        name: 'Hill Station Retreat',
        location: 'Ooty, India',
        price: '₹9,500',
        originalPrice: '₹13,000',
        rating: 4.7,
        reviews: 143,
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        features: ['Tea Gardens', 'Spa', 'Trekking'],
        discount: '27% OFF'
      },
      {
        id: 6,
        name: 'Wellness Sanctuary',
        location: 'Pondicherry, India',
        price: '₹11,200',
        originalPrice: '₹16,000',
        rating: 4.8,
        reviews: 298,
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
        features: ['Yoga', 'Meditation', 'Ayurveda'],
        discount: '30% OFF'
      }
    ],
    vehicles: [
      {
        id: 7,
        name: 'Luxury Sedan',
        location: 'Mumbai, India',
        price: '₹2,500',
        originalPrice: '₹3,200',
        rating: 4.6,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
        features: ['AC', 'Driver', 'GPS'],
        discount: '22% OFF'
      },
      {
        id: 8,
        name: 'Adventure SUV',
        location: 'Manali, India',
        price: '₹4,800',
        originalPrice: '₹6,000',
        rating: 4.7,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        features: ['4WD', 'Insurance', 'Fuel'],
        discount: '20% OFF'
      },
      {
        id: 9,
        name: 'Premium Hatchback',
        location: 'Goa, India',
        price: '₹1,800',
        originalPrice: '₹2,400',
        rating: 4.5,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
        features: ['Compact', 'Easy Drive', 'Parking'],
        discount: '25% OFF'
      }
    ]
  };

  const categories = [
    { id: 'hotels', label: 'Hotels', emoji: '🏨' },
    { id: 'resorts', label: 'Resorts', emoji: '🏝️' },
    { id: 'vehicles', label: 'Vehicles', emoji: '🚗' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Handpicked premium accommodations and vehicles with exclusive discounts
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2 text-xl">{category.emoji}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings[activeCategory].map((listing, index) => (
            <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="relative h-64 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white font-bold">
                    {listing.discount}
                  </Badge>
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{listing.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({listing.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{listing.name}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{listing.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{listing.originalPrice}</span>
                    <span className="text-sm text-gray-600 ml-1">/night</span>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300">
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-3 hover:bg-blue-600 hover:text-white transition-all duration-300">
            View All Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
