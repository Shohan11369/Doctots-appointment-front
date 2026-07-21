'use client';
import { motion } from 'framer-motion';

const specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Oncology'];

export const Specializations = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground text-center mb-16 tracking-tight">
          Clinical Specializations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specializations.map((spec, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4 }}
              className="p-8 bg-card border border-border rounded-xl text-center font-medium text-foreground hover:shadow-md transition-all"
            >
              {spec}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
