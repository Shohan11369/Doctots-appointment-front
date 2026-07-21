"use client";

import { useEffect, useState } from "react";
import { getDoctorReviews } from "@/services/reviewService";
import { Star } from "lucide-react";

export function DoctorReviewList({
  doctorId,
  refreshKey,
}: {
  doctorId: string;
  refreshKey?: number;
}) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await getDoctorReviews(doctorId);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load reviews.");
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [doctorId, refreshKey]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!reviews.length)
    return <div className="text-sm text-slate-500">No reviews yet.</div>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="rounded-2xl border border-border p-5 bg-card/70"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">{review.patientName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} /> {review.rating}
            </div>
          </div>
          <p className="pt-3 text-sm leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
