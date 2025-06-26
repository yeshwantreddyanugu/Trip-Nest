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
            {/* <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <Bell className="h-5 w-5" />
            </Button> */}

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
                    {/* Phone number header */}
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm text-gray-600">Logged in as</p>
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {localStorage.getItem('firebasePhone')}
                      </p>
                    </div>

                    {/* Menu options */}
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
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
            <nav className="px-4 py-6 space-y-4">
              <Link to="#" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About Us
              </Link>
              <Link to="/services" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Our Services
              </Link>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Support
              </a>


              {!uid ? (
                <div className="pt-4 space-y-2">

                  <Link to="/auth">
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <Link to="/my-bookings">
                    <Button variant="outline" size="sm" className="w-full border-blue-600 text-blue-600">
                      My Bookings
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
