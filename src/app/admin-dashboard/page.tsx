"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboardCards } from '@/components/admin-dashboard/dashboard-cards';
import { DataTable } from '@/components/admin-dashboard/data-table';

const recentAppointments = [
  { id: '1', patient: 'Alice', doctor: 'Dr. John Doe', status: 'Completed' },
  { id: '2', patient: 'Bob', doctor: 'Dr. Jane Smith', status: 'Pending' },
];

const columns = [
  { key: 'patient', label: 'Patient' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'status', label: 'Status' },
];

export default function AdminDashboardPage() {
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
      <h1 className="text-3xl font-bold">Admin Dashboard Overview</h1>
      <AdminDashboardCards />
      <h2 className="text-xl font-semibold">Recent Appointments</h2>
      <DataTable columns={columns} data={recentAppointments} />
    </div>
  );
}
