"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Star } from "lucide-react";
import { submitReview } from "@/services/reviewService";

export function DoctorReviewForm({
  doctorId,
  onSubmitted,
}: {
  doctorId: string;
  onSubmitted?: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      window.location.href = `/login?redirectPath=/doctors/${doctorId}`;
      return;
    }

    if (!comment.trim()) {
      setMessage("Please add a review comment.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      await submitReview({ doctorId, rating, comment });
      setMessage("Review submitted. Thank you!");
      setComment("");
      setRating(5);
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (error: any) {
      setMessage(error.message || "Review submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border p-6 bg-card/70 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Leave a Review</h2>
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={18} /> {rating}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Rating</label>
        <select
          className="w-full rounded-md border px-3 py-2"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} star{value > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this doctor"
          rows={5}
          className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}

      <Button onClick={handleSubmit} disabled={submitting} className="w-full">
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
