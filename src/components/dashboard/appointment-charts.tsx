"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatientDashboardChartData } from "@/services/dashboardService";

const COLORS = ["#2563EB", "#F97316", "#10B981", "#EF4444", "#8B5CF6"];

export const AppointmentCharts = () => {
  const [monthlyData, setMonthlyData] = useState<
    Array<{ name: string; appts: number }>
  >([]);
  const [statusData, setStatusData] = useState<
    Array<{ name: string; value: number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharts = async () => {
      try {
        const data = await getPatientDashboardChartData();
        setMonthlyData(data.monthlyCounts);
        setStatusData(data.statusData);
      } catch (err) {
        console.error("Failed to load chart data", err);
        setError("Unable to load appointment charts.");
      } finally {
        setLoading(false);
      }
    };

    loadCharts();
  }, []);

  if (loading) {
    return <div>Loading charts...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  const hasAppointments = monthlyData.some((item) => item.appts > 0);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Appointments</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {hasAppointments ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="appts" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              No appointments found to display.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {statusData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              No status data available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
