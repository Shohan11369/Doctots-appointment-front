"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, DollarSign, Loader2 } from "lucide-react";
import Image from "next/image";
import { getDoctorById } from "@/services/doctorService";
import { bookAppointment } from "@/services/appointmentService";
import { DoctorReviewForm } from "./review-form";
import { DoctorReviewList } from "./review-list";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [doctor, setDoctor] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [reviewRefresh, setReviewRefresh] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (!token) {
      router.push("/login");
      return;
    }

    if (id) {
      getDoctorById(id)
        .then((data) => {
          setDoctor(data);
        })
        .catch((err) => {
          console.error("Fetch error for ID:", id, err);
        })
        .finally(() => setLoading(false));
    }
  }, [id, router]);

  const handleBookAppointment = async () => {
    setBooking(true);
    try {
      await bookAppointment({ doctorId: id, date: new Date() });
      alert("Appointment request submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Doctor not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 space-y-8">
      {/* Header Profile Section */}
      <div className="bg-card/40 backdrop-blur-md border border-border p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-40 h-40 relative rounded-2xl overflow-hidden bg-muted border-4 border-border">
          {typeof doctor.image === "string" ? (
            <Image
              src={doctor.image}
              alt={doctor.name as string}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
        <div className="flex-grow space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            {doctor.name as string}
          </h1>
          <p className="text-xl text-primary font-medium">
            {doctor.specialization as string}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5 font-semibold text-amber-500">
              <Star size={18} fill="currentColor" />
              {doctor.rating as number | string || "N/A"}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={18} />
              {doctor.experience as number || 0} years experience
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-8 border-border/50 bg-card/40 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              About Doctor
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {doctor.bio as string || "No bio available."}
            </p>
          </Card>

          <Card className="p-8 border-border/50 bg-card/40 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4">Patient Reviews</h2>
            <DoctorReviewList doctorId={id} refreshKey={reviewRefresh} />
          </Card>
        </div>

        {/* Booking Card */}
        <div className="space-y-6">
          <Card className="p-6 border-border/50 bg-card/60 backdrop-blur-md self-start">
            <CardContent className="space-y-6 p-0">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Consultation Fee</span>
                <span className="text-2xl font-bold text-foreground flex items-center">
                  <DollarSign size={20} />
                  {doctor.fee as number | string || "N/A"}
                </span>
              </div>
              <Button
                size="lg"
                className="w-full shadow-lg"
                onClick={handleBookAppointment}
                disabled={booking}
              >
                {booking ? "Booking..." : "Book Appointment"}
              </Button>
            </CardContent>
          </Card>

          <DoctorReviewForm
            doctorId={id}
            onSubmitted={() => setReviewRefresh((prev) => prev + 1)}
          />
        </div>
      </div>
    </div>
  );
}
