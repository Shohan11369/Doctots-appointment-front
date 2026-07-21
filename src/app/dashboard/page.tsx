import { DashboardCards } from '@/components/dashboard/dashboard-cards';
import { AppointmentCharts } from '@/components/dashboard/appointment-charts';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <DashboardCards />
      <AppointmentCharts />
    </div>
  );
}
