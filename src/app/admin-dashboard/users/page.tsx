import { DataTable } from '@/components/admin-dashboard/data-table';

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Patient' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'Patient' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

export default function ManageUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
