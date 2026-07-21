"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/services/authService";
import { AdminSidebar } from "@/components/admin-dashboard/sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((user) => {
        if (user.role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/"); // Redirect non-admins to home
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-grow p-8">{children}</main>
    </div>
  );
}
