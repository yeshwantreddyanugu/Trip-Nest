import React from 'react';
import {
  Globe,
  Hotel,
  Mountain,
  Car,
  Plane,
  Heart,
  Shield,
  Luggage,
  Star
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: 'Hotel Bookings',
      description: 'Premium accommodations at competitive prices with exclusive member benefits',
      icon: <Hotel className="h-8 w-8 text-blue-600" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      features: [
        '5,000+ properties across India',
        'Best price guarantee',
        'Free cancellation options',
        '24/7 customer support'
      ]
    },
    {
      id: 2,
      title: 'Resort Packages',
      description: 'All-inclusive luxury resort experiences with added amenities',
      icon: <Mountain className="h-8 w-8 text-purple-600" />,
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      features: [
        'Private beach access',
        'Spa & wellness packages',
        'Gourmet dining options',
        'Family-friendly activities'
      ]
    },
    {
      id: 3,
      title: 'Vehicle Rentals',
      description: 'Flexible vehicle options with chauffeur services available',
      icon: <Car className="h-8 w-8 text-green-600" />,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      features: [
        'Wide range of vehicles',
        'Comprehensive insurance',
        '24/7 roadside assistance',
        'Flexible pickup locations'
      ]
    },
    {
      id: 4,
      title: 'Flight Bookings',
      description: 'Domestic and international flights with competitive pricing',
      icon: <Plane className="h-8 w-8 text-orange-600" />,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      features: [
        'Real-time price comparison',
        'Flexible date options',
        'Seat selection',
        'Baggage information'
      ]
    },
    {
      id: 5,
      title: 'Travel Insurance',
      description: 'Comprehensive coverage for all your travel needs',
      icon: <Shield className="h-8 w-8 text-red-600" />,
      image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80',
      features: [
        'Medical coverage',
        'Trip cancellation',
        'Lost baggage protection',
        '24/7 emergency assistance'
      ]
    },
    {
      id: 6,
      title: 'Tour Packages',
      description: 'Curated experiences with local experts',
      icon: <Globe className="h-8 w-8 text-yellow-600" />,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      features: [
        'Local guides',
        'Custom itineraries',
        'Cultural experiences',
        'Small group sizes'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Best Price Guarantee',
      description: 'We\'ll match or beat any competitor price',
      icon: <Heart className="h-6 w-6 text-blue-600" />
    },
    {
      title: '24/7 Support',
      description: 'Dedicated customer service anytime, anywhere',
      icon: <Shield className="h-6 w-6 text-purple-600" />
    },
    {
      title: 'Flexible Options',
      description: 'Easy cancellations and changes to your bookings',
      icon: <Luggage className="h-6 w-6 text-green-600" />
    },
    {
      title: 'Verified Reviews',
      description: 'Real feedback from real travelers',
      icon: <Star className="h-6 w-6 text-yellow-600" />
    }
  ];

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive travel solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <Card key={service.id} className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-sm">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {/* <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Explore {service.title}
                </Button> */}
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Wanderlust?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-blue-50">
                      {benefit.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Plan Your Next Adventure?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our travel experts are standing by to help you create the perfect itinerary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
              onClick={() => {
                const footer = document.getElementById('footer');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact Our Team
            </Button>

            <Button
              variant="outline"
              className="px-8 py-4 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg"
              onClick={() => {
                const top = document.getElementById('top');
                if (top) {
                  top.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Browse Packages
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
