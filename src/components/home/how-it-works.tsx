'use client';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Search Doctor', desc: 'Find specialists by specialization or name.' },
  { title: 'Select Time', desc: 'Choose a time slot that fits your schedule.' },
  { title: 'Book Appointment', desc: 'Confirm your visit in just a few clicks.' }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground text-center mb-16 tracking-tight">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="p-8 bg-card border border-border rounded-xl flex flex-col items-center text-center space-y-4"
            >
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                {i + 1}
              </div>
              <h3 className="font-semibold text-lg text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
