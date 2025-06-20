import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PopularDestinations from '@/components/PopularDestinations';
import FeaturedListings from '@/components/FeaturedListings';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import AppPromo from '@/components/AppPromo';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <PopularDestinations />
      <FeaturedListings />
      <WhyChooseUs />
      <Testimonials />
      <AppPromo />
      <Footer />
    </div>
  );
};

export default Index;
