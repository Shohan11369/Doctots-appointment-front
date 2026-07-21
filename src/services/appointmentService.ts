const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const bookAppointment = async (appointmentData: {
  doctorId: string;
  date: Date;
}) => {
  const response = await fetch(`${BACKEND}/api/appointments`, {
    method: "POST",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    throw new Error("Failed to book appointment");
  }

  return response.json();
};

export const getMyAppointments = async () => {
  const response = await fetch(`${BACKEND}/api/my-appointments`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return response.json();
};
