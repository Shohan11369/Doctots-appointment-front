"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDoctorOverview } from "@/services/doctorService";

export default function DoctorEarningsPage() {
  const [overview, setOverview] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorOverview()
      .then((data) => setOverview(data))
      .catch((error) => console.error("Failed to fetch overview:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Earnings</h1>
      {loading ? (
        <p>Loading earnings...</p>
      ) : overview ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${overview.totalEarnings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {overview.confirmedAppointments}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {overview.pendingAppointments}
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>No overview data available.</p>
      )}
    </div>
  );
}
