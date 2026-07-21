"use client";
import { useState, useEffect } from "react";
import { getMyAppointments } from "@/services/appointmentService";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAppointments()
      .then((data) => {
        console.log("DEBUG - Appointments fetched:", data);
        setAppointments(data);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((app: any) => (
            <div key={app._id} className="p-4 border rounded shadow-sm">
              <p>Doctor ID: {app.doctorId}</p>
              <p>Date: {new Date(app.date).toLocaleDateString()}</p>
              <p>
                Status:
                <span
                  className={`font-semibold capitalize ${
                    app.status === "confirmed"
                      ? "text-emerald-600"
                      : app.status === "cancelled"
                        ? "text-red-600"
                        : "text-amber-500"
                  }`}
                >
                  {app.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
