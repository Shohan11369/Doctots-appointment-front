"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { getDoctorDashboardReviews } from "@/services/reviewService";

export default function DoctorReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDoctorDashboardReviews();
        setReviews(data);
      } catch (err) {
        console.error("Failed to load doctor reviews", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const columns = [
    { key: "patientName", label: "Patient" },
    { key: "rating", label: "Rating" },
    { key: "comment", label: "Comment" },
    { key: "createdAt", label: "Date" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patient Reviews</h1>
      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <DataTable
          columns={columns}
          data={reviews.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          }))}
        />
      )}
    </div>
  );
}
