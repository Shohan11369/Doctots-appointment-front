import { DoctorSidebar } from "@/components/doctor-dashboard/sidebar";

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DoctorSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden p-3 sm:p-5 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
