import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, Heart, Bell, CalendarCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUid = localStorage.getItem('firebaseUID');
    setUid(storedUid);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('firebaseUID');
    localStorage.removeItem('firebasePhone');
    setUid(null);
    setShowDropdown(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`w-full z-50 fixed top-0 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              onClick={closeMobileMenu}
            >
              Wanderlust
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About Us
            </a>
            <a href="#services" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Our Services
            </a>
            <a href="#supportFaq" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Support/FAQ
            </a>
            <a href="#footer" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact Us
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {!uid ? (
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <User className="h-5 w-5" />
                </Button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm text-gray-600">Logged in as</p>
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {localStorage.getItem('firebasePhone')}
                      </p>
                    </div>
                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <CalendarCheck className="h-4 w-4 text-gray-600" />
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left"
                    >
                      <LogOut className="h-4 w-4 text-gray-600" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div className="fixed top-16 right-4 left-4 bg-white rounded-xl shadow-xl z-50 overflow-hidden animate-slide-down">
              <nav className="flex flex-col space-y-1 p-4">
                <Link
                  to="/"
                  className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <a
                  href="#about"
                  className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900"
                  onClick={closeMobileMenu}
                >
                  About Us
                </a>
                <a
                  href="#services"
                  className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900"
                  onClick={closeMobileMenu}
                >
                  Our Services
                </a>
                <a
                  href="#supportFaq"
                  className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900"
                  onClick={closeMobileMenu}
                >
                  Support/FAQ
                </a>
                <a
                  href="#footer"
                  className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-900"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </a>

                {!uid ? (
                  <div className="pt-2">
                    <Link 
                      to="/auth" 
                      className="block"
                      onClick={closeMobileMenu}
                    >
                      <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <Link 
                      to="/my-bookings" 
                      className="block"
                      onClick={closeMobileMenu}
                    >
                      <Button variant="outline" size="sm" className="w-full border-blue-600 text-blue-600">
                        My Bookings
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;