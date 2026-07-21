"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { getDoctorPatients } from "@/services/doctorService";

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorPatients()
      .then((data) => setPatients(data))
      .catch((error) => console.error("Failed to fetch doctor patients:", error))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "patientName", label: "Name" },
    { key: "patientEmail", label: "Email" },
    { key: "visits", label: "Visits" },
    { key: "lastAppointment", label: "Last Appointment" },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Patients</h1>
      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <DataTable
          columns={columns}
          data={patients.map((patient) => ({
            ...patient,
            lastAppointment: new Date(patient.lastAppointment).toLocaleString(),
          }))}
        />
      )}
    </div>
  );
}
