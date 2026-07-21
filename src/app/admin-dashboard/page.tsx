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
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard Overview</h1>
      <AdminDashboardCards />
      <h2 className="text-xl font-semibold">Recent Appointments</h2>
      <DataTable columns={columns} data={recentAppointments} />
    </div>
  );
}
