'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getDoctors } from '@/services/doctorService';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    getDoctors().then((data) => {
      // Limit to 6 doctors as requested
      setDoctors(data.slice(0, 6));
    }).catch(err => {
      console.error("FeaturedDoctors: Fetch error:", err);
    });
  }, []);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Featured Doctors</h2>
          <Button variant="outline" asChild>
            <Link href="/doctors">View All Doctors</Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc, i) => (
            <motion.div 
              key={doc._id || i} 
              whileHover={{ y: -4 }}
              className="p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-full mb-6 relative overflow-hidden border border-border">
                {doc.image && <Image src={doc.image} alt={doc.name} fill className="object-cover" />}
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">{doc.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{doc.specialization}</p>
              <Button size="sm" variant="secondary" className="w-full" asChild>
                <Link href={`/doctors/${doc._id}`}>View Profile</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
