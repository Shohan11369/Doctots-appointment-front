const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BACKEND}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  if (data && data.token && typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await fetch(`${BACKEND}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const getMe = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  
  const response = await fetch(`${BACKEND}/api/me`, {
    credentials: "include",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};
