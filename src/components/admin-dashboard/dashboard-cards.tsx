"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getAdminOverview } from "@/services/adminService";

export const AdminDashboardCards = () => {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminOverview();
        setStats(data);
      } catch (err) {
        console.error("Failed to load overview", err);
      }
    };
    load();
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  const items = [
    { title: "Total Appointments", value: stats.totalAppointments },
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Doctors", value: stats.totalDoctors },
    { title: "Revenue", value: `$${stats.totalMoney ?? 0}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
