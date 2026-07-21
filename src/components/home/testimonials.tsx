'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getPublicReviews } from '@/services/reviewService';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicReviews()
      .then((data) => {
        console.log("Fetched reviews in Testimonials:", data);
        setReviews(data);
      })
      .catch((err) => {
        console.error("Error fetching reviews in Testimonials:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log("Testimonials state - loading:", loading, "reviews.length:", reviews.length);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container text-center ">
        <h2 className="text-3xl font-bold mb-12">What Our Patients Review</h2>
        {loading ? (
          <div>Loading testimonials...</div>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-8 ">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 ">
              {reviews.slice(0, 4).map((review: any) => (
                <motion.div
                  key={review.id || review._id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="p-8 bg-gray-300 border rounded-xl shadow-sm"
                >
                  <p className="text-lg italic text-gray-950 font-bold">"{review.comment}"</p>
                  <p className="font-bold mt-4 text-gray-950 ">- {review.patientName || 'Anonymous'}</p>
                  <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                </motion.div>
              ))}
            </div>
            {reviews.length > 4 && (
              <Button asChild variant="outline">
                <Link href="/reviews">View All Reviews</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
