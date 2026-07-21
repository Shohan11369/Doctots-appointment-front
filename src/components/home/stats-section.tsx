'use client';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Happy Patients', value: '10K+' },
  { label: 'Expert Doctors', value: '500+' },
  { label: 'Clinics', value: '50+' },
  { label: 'Awards Won', value: '25+' },
];

export const StatsSection = () => {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <h3 className="text-4xl font-bold text-shadow-emerald-400 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
