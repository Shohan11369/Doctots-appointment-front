'use client';
import { useEffect, useState } from 'react';
import { getAdminProfile } from '@/services/adminService';

export default function AdminProfilePage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAdminProfile();
        setData(res);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!data) return <div>No profile data</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="mt-2">Name: {data.user?.name}</p>
          <p>Email: {data.user?.email}</p>
          <p>Role: {data.user?.role}</p>
        </div>
        <div className="rounded-md border p-4 col-span-2">
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded">Total Appointments: {data.stats.totalAppointments}</div>
            <div className="p-4 border rounded">Pending Requests: {data.stats.pendingRequests}</div>
            <div className="p-4 border rounded">Total Users: {data.stats.totalUsers}</div>
            <div className="p-4 border rounded">Total Doctors: {data.stats.totalDoctors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
