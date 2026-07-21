'use client';
import { useEffect, useState } from 'react';
import { getPublicReviews } from '@/services/reviewService';
import { motion } from 'framer-motion';

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicReviews()
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-20 container">
      <h1 className="text-4xl font-bold mb-12 text-center">All Patient Reviews</h1>
      {loading ? (
        <div className="text-center">Loading all reviews...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review: any) => (
            <motion.div
              key={review.id || review._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-8 bg-background border rounded-xl shadow-sm"
            >
              <p className="text-lg italic text-muted-foreground">"{review.comment}"</p>
              <p className="font-bold mt-4">- {review.patientName || 'Anonymous'}</p>
              <p className="text-sm text-muted-foreground">Rating: {review.rating}/5</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
