"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardCards } from '@/components/dashboard/dashboard-cards';
import { AppointmentCharts } from '@/components/dashboard/appointment-charts';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <DashboardCards />
      <AppointmentCharts />
    </div>
  );
}
