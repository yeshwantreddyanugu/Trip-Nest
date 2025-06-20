
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: "Wanderlust made our Goa vacation absolutely perfect! The hotel was exactly as described, and the booking process was seamless. Highly recommended!",
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?auto=format&fit=crop&w=150&h=150&q=80',
      designation: 'Travel Enthusiast'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi, India',
      rating: 5,
      text: "Booked a luxury resort in Manali through Wanderlust. The service was exceptional, and the 24/7 support team was incredibly helpful throughout our trip.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      designation: 'Business Executive'
    },
    {
      id: 3,
      name: 'Anita Patel',
      location: 'Bangalore, India',
      rating: 5,
      text: "The car rental service was outstanding! Clean vehicle, professional driver, and very competitive pricing. Will definitely use Wanderlust again.",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
      designation: 'Software Engineer'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      location: 'Jaipur, India',
      rating: 5,
      text: "Amazing experience booking our honeymoon resort in Pondicherry. The staff was courteous, and every detail was taken care of. Thank you Wanderlust!",
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
      designation: 'Marketing Manager'
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      location: 'Hyderabad, India',
      rating: 5,
      text: "Fantastic platform with genuine reviews and transparent pricing. Booked multiple trips through Wanderlust and never been disappointed!",
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
      designation: 'Designer'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join millions of satisfied customers who trust Wanderlust for their travel needs
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <Card className="p-8 md:p-12 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current mx-1" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed">
                "{testimonials[currentSlide].text}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentSlide].image}
                  alt={testimonials[currentSlide].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-900">{testimonials[currentSlide].name}</h4>
                  <p className="text-gray-600">{testimonials[currentSlide].designation}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentSlide].location}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full p-3 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full p-3 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div className="hidden md:flex justify-center space-x-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentSlide(index)}
              className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                <div className="text-xs text-gray-500">{testimonial.location}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
