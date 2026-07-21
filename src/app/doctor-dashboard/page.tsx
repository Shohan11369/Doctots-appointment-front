"use client";

import { useEffect, useState } from "react";
import { DoctorDashboardCards } from "@/components/doctor-dashboard/dashboard-cards";
import { DoctorAnalyticsCharts } from "@/components/doctor-dashboard/analytics-charts";
import { getDoctorOverview } from "@/services/doctorService";

export default function DoctorDashboardPage() {
  const [overview, setOverview] = useState<null | Record<string, number>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorOverview()
      .then((data) => setOverview(data))
      .catch((error) => {
        console.error("Failed to load doctor overview:", error);
      })
      .finally(() => setLoading(false));
  }, []);

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
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Doctor Dashboard Overview</h1>
      </div>
      {loading ? (
        <div>Loading doctor overview...</div>
      ) : (
        <>
          <DoctorDashboardCards stats={stats} />
          <DoctorAnalyticsCharts />
        </>
      )}
    </div>
  );
}
