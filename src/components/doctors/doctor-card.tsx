import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  bio: string;
  image?: string;
  experience?: number;
  fee?: number;
  rating?: number;
}

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <Card className="flex flex-col border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl bg-muted">
          {doctor.image && (
            <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-foreground tracking-tight">{doctor.name}</h3>
        <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{doctor.bio}</p>
        <div className="flex justify-between items-center text-xs pt-2">
          {doctor.experience && <span className="text-muted-foreground">{doctor.experience} yrs exp</span>}
          {doctor.fee && <span className="font-semibold text-foreground">$ {doctor.fee}</span>}
        </div>
        {doctor.rating && (
          <div className="flex items-center gap-1.5 text-amber-500 pt-1">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button size="sm" variant="secondary" className="w-full" asChild>
          <Link href={`/doctors/${doctor._id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
