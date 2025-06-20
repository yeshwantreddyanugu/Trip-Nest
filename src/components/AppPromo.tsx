
import React from 'react';
import { Smartphone, Download, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AppPromo = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Take Wanderlust 
                <span className="block text-yellow-300">Everywhere You Go</span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Download our mobile app for seamless booking, exclusive deals, and travel management on the go. Available for iOS and Android.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm">📱</span>
                </div>
                <span className="text-blue-100">Instant booking confirmations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm">🎯</span>
                </div>
                <span className="text-blue-100">Exclusive mobile-only deals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm">📍</span>
                </div>
                <span className="text-blue-100">Real-time trip updates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-sm">💳</span>
                </div>
                <span className="text-blue-100">Secure payment options</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-3 py-4 px-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z'/%3E%3C/svg%3E" alt="Apple" className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Button>
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-3 py-4 px-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z'/%3E%3C/svg%3E" alt="Google Play" className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* App Preview */}
          <div className="relative">
            <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <div className="text-center space-y-6">
                {/* QR Code */}
                <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-white" />
                  </div>
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Scan to Download</h3>
                  <p className="text-blue-100">Quick access to our mobile app</p>
                </div>

                {/* Phone Mockup */}
                <div className="relative mx-auto w-48 h-96 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl animate-float">
                  <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-[2rem] relative overflow-hidden">
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>
                    <div className="p-6 pt-12 text-white text-center">
                      <div className="text-2xl font-bold mb-2">Wanderlust</div>
                      <div className="text-sm opacity-80 mb-6">Your Travel Companion</div>
                      <div className="space-y-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-xs">
                          <Smartphone className="h-4 w-4 mx-auto mb-1" />
                          Book on the go
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-xs">
                          <Download className="h-4 w-4 mx-auto mb-1" />
                          Offline access
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
