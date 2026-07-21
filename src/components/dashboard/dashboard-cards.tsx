"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatientDashboardStats } from "@/services/dashboardService";

export const DashboardCards = () => {
  const [stats, setStats] = useState<{
    upcoming: number;
    completed: number;
    cancelled: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getPatientDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
        setError("Unable to load overview. Please sign in again.");
      }
    };

    loadStats();
  }, []);

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  if (!stats) {
    return <div>Loading overview...</div>;
  }

  const items = [
    { title: "Upcoming", value: stats.upcoming },
    { title: "Confirmed", value: stats.completed },
    { title: "Cancelled", value: stats.cancelled },
    { title: "Total", value: stats.total },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
