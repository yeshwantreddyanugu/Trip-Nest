
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Heart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wanderlust
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/hotels" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Hotels</Link>
            <Link to="/resorts" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Resorts</Link>
            <Link to="/vehicles" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Vehicles</Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Destinations</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
            <nav className="px-4 py-6 space-y-4">
              <Link to="/hotels" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Hotels</Link>
              <Link to="/resorts" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Resorts</Link>
              <Link to="/vehicles" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Vehicles</Link>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Destinations</a>
              <div className="pt-4 space-y-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="w-full border-blue-600 text-blue-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
