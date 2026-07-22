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

const compressImageBeforeUpload = async (file: File) => {
  if (!file.type.startsWith("image/")) return file;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });

  const image = new Image();
  image.src = dataUrl;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Failed to decode image file."));
  });

  const canvas = document.createElement("canvas");
  const maxDimension = 1200;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));

  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const context = canvas.getContext("2d");
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);

  const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
  const [, base64Data] = compressedDataUrl.split(",");
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new File([bytes], file.name.replace(/\.[^.]+$/, ".jpg"), {
    type: "image/jpeg",
  });
};

export const createDoctorPost = async (postData: {
  name: string;
  title: string;
  description: string;
  content: string;
  fees: number;
  image?: File | null;
}) => {
  const name = postData.name?.trim() ?? "";
  const title = postData.title?.trim() ?? "";
  const description = postData.description?.trim() ?? "";
  const content = postData.content?.trim() ?? "";
  const fees = Number(postData.fees ?? 0);

  if (!name || !title || !description || !content || !fees) {
    throw new Error("All fields are required.");
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("fees", String(fees));

  let image = postData.image ?? null;
  if (image) {
    image = await compressImageBeforeUpload(image);

    if (image.size > 1024 * 1024) {
      throw new Error(
        "Image file is too large. Please select a smaller image.",
      );
    }

    formData.append("image", image, image.name);
  }

  const headers = getAuthHeaders();
  delete (headers as any)["Content-Type"];

  const response = await fetch(`${BACKEND}/api/doctor/posts`, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 413) {
      throw new Error(
        "Image file is too large. Please select a smaller image.",
      );
    }

    const errorText = await response.text().catch(() => "");
    let errorMessage = "Failed to create post";

    try {
      const parsed = JSON.parse(errorText);
      if (typeof parsed === "object" && parsed !== null) {
        errorMessage = parsed.message || parsed.error || errorMessage;
      }
    } catch {
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return response.json();
};
