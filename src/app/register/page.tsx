'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { registerSchema } from '@/lib/validations/auth';
import { register } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: 'patient', sex: '', years: 0 },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setError(null);
      await register(data);
      router.push('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6">
      <Card className="w-full max-w-md border-border/50 bg-card/60 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register('name')} placeholder="Full Name" className="bg-card/50" />
            <Input {...form.register('email')} type="email" placeholder="Email" className="bg-card/50" />
            <Input {...form.register('password')} type="password" placeholder="Password" className="bg-card/50" />
            
            <div className="grid grid-cols-2 gap-4">
                <Input {...form.register('sex')} placeholder="Sex (e.g. Male)" className="bg-card/50" />
                <Input {...form.register('years')} type="number" placeholder="Age/Years" className="bg-card/50" />
            </div>

            <select {...form.register('role')} className="w-full p-2 border border-border rounded-md bg-card/50 text-sm">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            {error && <p className="text-sm text-destructive font-medium text-center">{error}</p>}
            <Button className="w-full" type="submit">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
