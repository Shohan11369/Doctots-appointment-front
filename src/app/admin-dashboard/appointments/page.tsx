"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import {
  getAdminAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "@/services/adminService";
import { Button } from "@/components/ui/button";

interface Appointment {
  _id: string;
  patientName: string;
  doctorName: string;
  doctorFee: number;
  date: string;
  status: string;
}

export default function ManageAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const columns = [
    { key: "patientName", label: "Patient" },
    { key: "doctorName", label: "Doctor" },
    { key: "doctorFee", label: "Fee" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAdminAppointments();
      setAppointments(
        data.map((item: Appointment) => ({
          ...item,
          date: new Date(item.date).toLocaleString(),
          actions: item._id,
        })),
      );
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id: string, status: string) => {
    setBusyId(id);
    try {
      await updateAppointmentStatus(id, status);
      await fetchAppointments();
    } catch (err) {
      console.error("Failed to update appointment status", err);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment? This cannot be undone.",
    );
    if (!confirmed) return;

    setBusyId(id);
    try {
      await deleteAppointment(id);
      await fetchAppointments();
    } catch (err) {
      console.error("Failed to delete appointment", err);
    } finally {
      setBusyId(null);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchAppointments();
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Appointments</h1>
      {loading ? (
        <div>Loading appointments...</div>
      ) : (
        <DataTable
          columns={columns}
          data={appointments}
          renderCell={(row, columnKey) => {
            if (columnKey === "actions") {
              return (
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleStatus(row._id, "confirmed")}
                    disabled={busyId === row._id || row.status === "confirmed"}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleStatus(row._id, "cancelled")}
                    disabled={busyId === row._id || row.status === "cancelled"}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(row._id)}
                    disabled={busyId === row._id}
                  >
                    Delete
                  </Button>
                </div>
              );
            }
            return row[columnKey];
          }}
        />
      )}
    </div>
  );
}
