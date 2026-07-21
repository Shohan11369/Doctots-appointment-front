'use client';
import { useState, useEffect } from 'react';
import { DoctorCard } from '@/components/doctors/doctor-card';
import { DoctorSkeleton } from '@/components/doctors/doctor-skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getDoctors } from '@/services/doctorService';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDoctors()
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError('Failed to load doctors');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter((doctor: any) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">Find Your Doctor</h1>
        <p className="text-muted-foreground">Search and browse our expert medical professionals.</p>
        <div className="pt-4 flex gap-2">
          <Input 
            placeholder="Search by name or specialization..." 
            className="max-w-lg bg-card/50" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => {}}>Search</Button>
          <Button variant="outline" onClick={() => setSearchTerm('')}>Clear</Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => <DoctorSkeleton key={i} />)}
        </div>
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : filteredDoctors.length === 0 ? (
        <p className="text-muted-foreground">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor: any) => <DoctorCard key={doctor._id} doctor={doctor} />)}
        </div>
      )}
    </div>
  );
}
