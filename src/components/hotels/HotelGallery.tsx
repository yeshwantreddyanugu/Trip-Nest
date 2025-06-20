
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Hotel {
  images: string[];
  name: string;
}

interface HotelGalleryProps {
  hotel: Hotel;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ hotel }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <img 
              src={hotel.images[selectedImage]} 
              alt={`${hotel.name} ${selectedImage + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
            {hotel.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-full h-20 object-cover rounded-lg border-2 transition-all ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HotelGallery;
