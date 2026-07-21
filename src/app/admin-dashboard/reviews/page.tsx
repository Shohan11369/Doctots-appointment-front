"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { getAdminReviews } from "@/services/adminService";

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "patientName", label: "Patient" },
    { key: "doctorName", label: "Doctor" },
    { key: "rating", label: "Rating" },
    { key: "comment", label: "Comment" },
  ];

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getAdminReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Reviews</h1>
      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <DataTable columns={columns} data={reviews} />
      )}
    </div>
  );
}
