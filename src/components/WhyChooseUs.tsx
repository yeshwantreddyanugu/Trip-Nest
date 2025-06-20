
import React from 'react';
import { Shield, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All our hotels, resorts, and vehicles are thoroughly verified and quality-checked for your safety and comfort.',
      color: 'bg-blue-500'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payments',
      description: 'Pay securely with multiple payment options including EMI, digital wallets, and cryptocurrencies.',
      color: 'bg-green-500'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you before, during, and after your journey.',
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmations and digital receipts sent to your email and mobile.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Wanderlust?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience hassle-free travel booking with premium services and unmatched reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in" style={{animationDelay: '0ms'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">99.8%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">18K+</div>
              <div className="text-blue-100">Properties Listed</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">2M+</div>
              <div className="text-blue-100">Bookings Completed</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '300ms'}}>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
