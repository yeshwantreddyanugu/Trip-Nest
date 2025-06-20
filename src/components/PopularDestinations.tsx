
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
      properties: 1200,
      description: 'Beach paradise with vibrant nightlife'
    },
    {
      id: 2,
      name: 'Manali',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      properties: 850,
      description: 'Himalayan retreat with snow-capped peaks'
    },
    {
      id: 3,
      name: 'Ooty',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80',
      properties: 650,
      description: 'Hill station with tea gardens'
    },
    {
      id: 4,
      name: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      properties: 980,
      description: 'Historic city of pearls and biryani'
    },
    {
      id: 5,
      name: 'Pondicherry',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      properties: 420,
      description: 'French colonial charm by the sea'
    },
    {
      id: 6,
      name: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
      properties: 1500,
      description: 'City of dreams and Bollywood'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing places around India with the best accommodations and experiences
          </p>
        </div>

        {/* Desktop Horizontal Scroll */}
        <div className="hidden md:block">
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {destinations.map((destination, index) => (
              <Card key={destination.id} className="flex-none w-80 group hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">{destination.properties} Properties</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {destinations.slice(0, 4).map((destination, index) => (
            <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="relative h-40 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-3 text-white">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">{destination.properties}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{destination.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{destination.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore
                  <ArrowRight className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
