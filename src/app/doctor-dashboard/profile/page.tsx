"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDoctorProfile } from "@/services/doctorService";

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorProfile()
      .then((data) => setProfile(data))
      .catch((error) => console.error("Failed to fetch doctor profile:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{profile.doctor.name}</p>
              <p>{profile.doctor.specialization}</p>
              <p className="mt-2">{profile.doctor.bio}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Name: {profile.user.name}</p>
              <p className="text-sm">Email: {profile.user.email}</p>
              <p className="text-sm">Reviews: {profile.doctor.reviewCount}</p>
              <p className="text-sm">Rating: {profile.doctor.averageRating}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>Profile data is unavailable.</p>
      )}
    </div>
  );
}
