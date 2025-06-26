import React from 'react';
import { Globe, Heart, Shield, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Travel enthusiast with 15+ years in the hospitality industry'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Ensures seamless travel experiences for all our customers'
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Builds the platforms that power your perfect vacation'
    },
    {
      id: 4,
      name: 'Sophia Chen',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      bio: 'Makes sure every traveler feels valued and supported'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Happy Travelers', icon: <Heart className="h-8 w-8 text-blue-600" /> },
    { value: '5K+', label: 'Properties', icon: <Shield className="h-8 w-8 text-purple-600" /> },
    { value: '100+', label: 'Destinations', icon: <Globe className="h-8 w-8 text-green-600" /> },
    { value: '24/7', label: 'Support', icon: <Users className="h-8 w-8 text-orange-600" /> }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming travel experiences across India since 2015
          </p>
        </div>

        {/* About Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-96 w-full">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
                alt="Our team traveling"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">Our founding team in Goa, 2015</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Who We Are</h3>
            <p className="text-gray-600 mb-4">
              Wanderlust was born from a simple idea: travel should be effortless, memorable, and accessible to everyone. 
              What started as a small booking platform has grown into one of India's most trusted travel companies.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of travel experts, technologists, and hospitality professionals work tirelessly to 
              curate the best experiences across India's diverse landscapes - from Himalayan peaks to tropical beaches.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Our Values
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h4>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">Meet The Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="relative rounded-xl overflow-hidden mb-4 h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg mb-8">
              To empower travelers with seamless booking experiences while supporting local communities 
              and promoting sustainable tourism practices across India.
            </p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Learn About Our Sustainability Initiatives
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;