"use client";
import { useEffect, useState } from "react";
import { getAdminOverview } from "@/services/adminService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminOverview();
        setStats(data);
      } catch (err) {
        console.error("Failed to load overview data for analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load analytics data.</div>;
  }

  const barChartData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Doctors", value: stats.totalDoctors || 0 },
    { name: "Appointments", value: stats.totalAppointments || 0 },
  ];

  const pieChartData = [
    { name: "Active Doctors", value: stats.totalDoctors || 1 },
    { name: "Total Users", value: stats.totalUsers || 1 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visualize platform growth, user engagement, and appointment trends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart Card */}
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
            <CardDescription>Overview of total users, doctors, and appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fill: 'currentColor' }} />
                  <YAxis tick={{ fill: 'currentColor' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Ratio of registered doctors to total users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Card (Full Width) */}
      <Card className="shadow-lg border-border/50 bg-gradient-to-br from-primary/10 via-background to-background">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Total earnings generated from all completed appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-primary/20 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-foreground">${stats.totalMoney || 0}</p>
              <p className="text-sm text-muted-foreground mt-1">Platform-wide lifetime revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
