
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Exclusive Deals
            </h3>
            <p className="text-blue-100 mb-6">
              Subscribe to our newsletter and never miss out on amazing travel offers and destination guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-blue-100"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Wanderlust
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Your trusted travel companion for booking hotels, resorts, and vehicles across India. Experience premium travel at affordable prices.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">support@wanderlust.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <nav className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Hotels</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Resorts</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Vehicles</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Destinations</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Travel Guides</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Special Offers</a>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <nav className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Help Center</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Booking Help</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Cancellation</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Refund Policy</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Travel Insurance</a>
              </nav>
            </div>

            {/* Legal & Social */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <nav className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Cookie Policy</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Accessibility</a>
              </nav>

              {/* Social Media */}
              <div className="pt-4">
                <h5 className="text-sm font-semibold text-white mb-4">Follow Us</h5>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Wanderlust. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <span>🏆 Best Travel Platform 2024</span>
                <span>🔒 Secure Payments</span>
                <span>✈️ Trusted by 2M+ Travelers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
