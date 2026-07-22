const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const getAdminAppointments = async () => {
  const response = await fetch(`${BACKEND}/api/admin/appointments`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch admin appointments");
  }
  return response.json();
};

export const getAdminOverview = async () => {
  const response = await fetch(`${BACKEND}/api/admin/overview`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch admin overview");
  }
  return response.json();
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  const response = await fetch(`${BACKEND}/api/admin/appointments/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update appointment status");
  }
  return response.json();
};

export const deleteAppointment = async (id: string) => {
  const response = await fetch(`${BACKEND}/api/admin/appointments/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete appointment");
  }
  return response.json();
};

export const getAdminRequests = async () => {
  const response = await fetch(`${BACKEND}/api/admin/requests`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch admin requests");
  return response.json();
};

export const getAdminReviews = async () => {
  const response = await fetch(`${BACKEND}/api/admin/reviews`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch admin reviews");
  return response.json();
};

export const getAdminProfile = async () => {
  const response = await fetch(`${BACKEND}/api/admin/profile`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch admin profile");
  return response.json();
};
