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

export const getDoctors = async () => {
  const response = await fetch(`${BACKEND}/api/doctors`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
};

export const getDoctorById = async (id: string) => {
  const response = await fetch(`${BACKEND}/api/doctor/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctor details");
  }

  return response.json();
};

export const getDoctorOverview = async () => {
  const response = await fetch(`${BACKEND}/api/doctor/overview`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch doctor overview");
  }

  return response.json();
};

export const getDoctorAppointments = async () => {
  const response = await fetch(`${BACKEND}/api/doctor/appointments`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch doctor appointments");
  }

  return response.json();
};

export const getDoctorPatients = async () => {
  const response = await fetch(`${BACKEND}/api/doctor/patients`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch doctor patients");
  }

  return response.json();
};

export const getDoctorProfile = async () => {
  const response = await fetch(`${BACKEND}/api/doctor/profile`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch doctor profile");
  }

  return response.json();
};

export const getDoctorPosts = async () => {
  const response = await fetch(`${BACKEND}/api/doctor/posts`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch doctor posts");
  }

  const data = await response.json();
  return data.map((post: any) => ({
    ...post,
    imageUrl:
      post.imageUrl && post.imageUrl.startsWith("/")
        ? `${BACKEND}${post.imageUrl}`
        : post.imageUrl,
  }));
};

export const createDoctorPost = async (postData: {
  title: string;
  content: string;
  image?: File | null;
}) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  if (postData.image) {
    formData.append("image", postData.image);
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${BACKEND}/api/doctor/posts`, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create post");
  }

  return response.json();
};
