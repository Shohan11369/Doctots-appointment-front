"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DoctorDashboardCards } from "@/components/doctor-dashboard/dashboard-cards";
import { DoctorAnalyticsCharts } from "@/components/doctor-dashboard/analytics-charts";
import { getDoctorOverview } from "@/services/doctorService";

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [overview, setOverview] = useState<null | Record<string, number>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    getDoctorOverview()
      .then((data) => setOverview(data))
      .catch((error) => {
        console.error("Failed to load doctor overview:", error);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const stats = overview
    ? [
        { title: "Total Patients", value: overview.totalPatients },
        { title: "Today's Appointments", value: overview.todayAppointments },
        {
          title: "Confirmed Appointments",
          value: overview.confirmedAppointments,
        },
        { title: "Total Earnings", value: `$${overview.totalEarnings}` },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Doctor Dashboard Overview
        </h1>
      </div>
      {loading ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading doctor overview...
        </div>
      ) : (
        <>
          <DoctorDashboardCards stats={stats} />
          <DoctorAnalyticsCharts />
        </>
      )}
    </div>
  );
}
