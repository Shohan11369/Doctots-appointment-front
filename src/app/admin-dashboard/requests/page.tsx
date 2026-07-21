"use client";
import { useEffect, useState } from "react";
import {
  getAdminRequests,
  updateAppointmentStatus,
} from "@/services/adminService";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getAdminRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdate = async (id: string, status: string) => {
    setBusyId(id);
    try {
      await updateAppointmentStatus(id, status);
      await fetchRequests();
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointment Requests</h1>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((r) => (
              <TableRow key={r._id}>
                <TableCell>{r.patientName}</TableCell>
                <TableCell>{r.patientEmail}</TableCell>
                <TableCell>{r.doctorName}</TableCell>
                <TableCell>{r.doctorSpecialization}</TableCell>
                <TableCell>{new Date(r.date).toLocaleString()}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdate(r._id, "confirmed")}
                    disabled={busyId === r._id}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleUpdate(r._id, "cancelled")}
                    disabled={busyId === r._id}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
