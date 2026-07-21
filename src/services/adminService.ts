const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const getAdminAppointments = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/appointments`, {
    credentials: "include",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch admin appointments");
  }
  return response.json();
};

export const getAdminOverview = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/overview`, {
    credentials: "include",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch admin overview");
  }
  return response.json();
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/appointments/${id}`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update appointment status");
  }
  return response.json();
};

export const deleteAppointment = async (id: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/appointments/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to delete appointment");
  }
  return response.json();
};

export const getAdminRequests = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/requests`, {
    credentials: "include",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch admin requests");
  return response.json();
};

export const getAdminReviews = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/reviews`, {
    credentials: "include",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch admin reviews");
  return response.json();
};

export const getAdminProfile = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(`${BACKEND}/api/admin/profile`, {
    credentials: "include",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch admin profile");
  return response.json();
};
