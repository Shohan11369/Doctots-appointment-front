'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, FileText, Bell, Star, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMe } from '@/services/authService';

const links = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Medical History', href: '/dashboard/history', icon: FileText },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getMe().then(setUser).catch(console.error);
  }, []);

  return (
    <aside className="w-64 border-r bg-background min-h-screen p-6 hidden md:block">
      <h2 className="font-bold text-2xl text-primary mb-2">MediQueue</h2>
      {user && (
        <div className="mb-8 p-3 bg-muted rounded-lg">
          <p className="font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
      )}
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg hover:bg-muted",
              pathname === link.href && "bg-primary text-primary-foreground"
            )}
          >
            <link.icon size={20} />
            {link.name}
          </Link>
        ))}
        <Link href="/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted mt-8 text-destructive">
          <LogOut size={20} />
          Logout
        </Link>
      </nav>
    </aside>
  );
};
