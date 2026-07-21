"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { getMyReviews, deleteReview } from "@/services/reviewService";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      const data = await getMyReviews();
      console.log("Reviews data:", data); // Debugging
      setReviews(data);
    } catch (err) {
      console.error("Failed to load patient reviews", err);
      setError("Unable to load your reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      loadReviews();
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  const columns = [
    { key: "doctorName", label: "Doctor" },
    { key: "rating", label: "Rating" },
    { key: "comment", label: "Comment" },
    { key: "createdAt", label: "Submitted" },
    { key: "actions", label: "Actions" },
  ];

  const renderCell = (row: any, key: string) => {
    if (key === "actions") {
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            const id = row.id || row._id;
            console.log("Attempting to delete review with ID:", id, "from row:", row);
            if (!id) {
              alert("Error: Could not find review ID. Check console.");
              return;
            }
            handleDelete(id);
          }}
        >
          Delete
        </Button>
      );
    }
    return row[key];
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Reviews</h1>
      {loading ? (
        <div>Loading your reviews...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : reviews.length === 0 ? (
        <div className="text-sm text-slate-500">
          You have not submitted any reviews yet.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={reviews.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          }))}
          renderCell={renderCell}
        />
      )}
    </div>
  );
}
