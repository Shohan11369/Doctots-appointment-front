import { DataTable } from '@/components/admin-dashboard/data-table';

const doctors = [
  { id: '1', name: 'Dr. John Doe', specialization: 'Cardiologist', email: 'john@example.com' },
  { id: '2', name: 'Dr. Jane Smith', specialization: 'Neurologist', email: 'jane@example.com' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'email', label: 'Email' },
];

export default function ManageDoctorsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Doctors</h1>
      <DataTable columns={columns} data={doctors} />
    </div>
  );
}
