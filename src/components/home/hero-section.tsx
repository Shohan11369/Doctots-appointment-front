'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const medicalImages = [
  "https://media.istockphoto.com/id/2250059414/photo/medical-professional-analyzing-patient-data.jpg?s=1024x1024&w=is&k=20&c=BZA6l_o4d1Ee-ui51ebWHC7S7Nl3HRxQgl8hk77Y6LY=",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1094&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];


export const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % medicalImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Your Health, <span className="text-green-500">Our Priority</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Book appointments with top-rated doctors in just a few clicks. MediQueue Pro connects you with the best care instantly.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="px-8" asChild>
              <Link href="/doctors">Book Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <Link href="/doctors">View Doctors</Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-muted">
          <AnimatePresence mode='wait'>
            <motion.img
              key={index}
              src={medicalImages[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              alt={`Medical ${index + 1}`}
              onError={(e) => {
                // console.error(`Error loading image ${index}:`, medicalImages[index]);
              }}
              onLoad={() => {
                // console.log(`Successfully loaded image ${index}:`, medicalImages[index]);
              }}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
