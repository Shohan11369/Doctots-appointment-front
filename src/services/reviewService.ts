const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const submitReview = async (reviewData: {
  doctorId: string;
  rating: number;
  comment: string;
}) => {
  const response = await fetch(`/api/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Failed to submit review");
  }

  return response.json();
};

export const getDoctorReviews = async (doctorId: string) => {
  const response = await fetch(`/api/doctor/${doctorId}/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch doctor reviews");
  }
  return response.json();
};

export const getMyReviews = async () => {
  const response = await fetch(`/api/my-reviews`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch your reviews");
  }
  return response.json();
};

export const getDoctorDashboardReviews = async () => {
  const response = await fetch(`/api/doctor/reviews`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch doctor dashboard reviews");
  }
  return response.json();
};

export const deleteReview = async (reviewId: string) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete review");
  }

  return response.json();
};

export const getPublicReviews = async () => {
  const response = await fetch(`/api/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch public reviews");
  }
  return response.json();
};
