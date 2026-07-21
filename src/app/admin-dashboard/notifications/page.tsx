import { DataTable } from '@/components/admin-dashboard/data-table';

const notifications = [
  { id: '1', title: 'New Appointment', message: 'You have a new appointment request.', date: '2023-10-24' },
  { id: '2', title: 'System Update', message: 'The system will be down for maintenance.', date: '2023-10-23' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'message', label: 'Message' },
  { key: 'date', label: 'Date' },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <DataTable columns={columns} data={notifications} />
    </div>
  );
}
