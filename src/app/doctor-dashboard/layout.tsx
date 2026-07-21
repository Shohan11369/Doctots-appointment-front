import { DoctorSidebar } from '@/components/doctor-dashboard/sidebar';

export default function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DoctorSidebar />
      <main className="flex-grow p-8">{children}</main>
    </div>
  );
}
