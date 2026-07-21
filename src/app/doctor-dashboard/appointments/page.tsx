"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { getDoctorAppointments } from "@/services/doctorService";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorAppointments()
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Failed to fetch doctor appointments:", error))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "patientName", label: "Patient" },
    { key: "patientEmail", label: "Email" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Appointments</h1>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <DataTable
          columns={columns}
          data={appointments.map((app) => ({
            ...app,
            date: new Date(app.date).toLocaleString(),
          }))}
        />
      )}
    </div>
  );
}
