
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface HotelReviewsProps {
  hotelId: string;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ hotelId }) => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely wonderful stay! The staff was incredibly friendly and the rooms were spotless.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Raj Patel",
      rating: 4,
      comment: "Great location and beautiful property. Food was excellent too.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Anita Singh",
      rating: 5,
      comment: "Perfect for families. Kids loved the pool and the beach access was amazing.",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">4.6</div>
            <div className="text-sm text-gray-600">Overall Rating</div>
            <div className="flex justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Would Recommend</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelReviews;
