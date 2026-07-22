const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getPatientDashboardStats = async () => {
  const response = await fetch(`/api/my-appointments`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  const appointments = await response.json();
  const upcoming = appointments.filter(
    (a: any) => a.status === "pending",
  ).length;
  const completed = appointments.filter(
    (a: any) => a.status === "confirmed",
  ).length;
  const cancelled = appointments.filter(
    (a: any) => a.status === "cancelled",
  ).length;
  const total = appointments.length;

  return { upcoming, completed, cancelled, total };
};

export const getPatientDashboardChartData = async () => {
  const response = await fetch(`/api/my-appointments`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }

  const appointments = await response.json();

  const monthlyCounts = monthNames.map((name, index) => ({
    name,
    appts: 0,
  }));

  const statusMap: Record<string, number> = {
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  };

  appointments.forEach((appointment: any) => {
    const date = new Date(appointment.date);
    if (!Number.isNaN(date.getTime())) {
      monthlyCounts[date.getMonth()].appts += 1;
    }

    const key = String(appointment.status).toLowerCase();
    if (statusMap[key] !== undefined) {
      statusMap[key] += 1;
    } else {
      statusMap[key] = (statusMap[key] || 0) + 1;
    }
  });

  const statusData = Object.entries(statusMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return { monthlyCounts, statusData };
};
