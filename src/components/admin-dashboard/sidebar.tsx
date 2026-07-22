'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  Star,
  Bell,
  BarChart,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMe } from '@/services/authService';
import { Card, CardContent } from '@/components/ui/card';

const links = [
  { name: 'Overview', href: '/admin-dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/admin-dashboard/users', icon: Users },
  { name: 'Doctors', href: '/admin-dashboard/doctors', icon: UserPlus },
  { name: 'Appointments', href: '/admin-dashboard/appointments', icon: Calendar },
  { name: 'Requests', href: '/admin-dashboard/requests', icon: Calendar },
  { name: 'Reviews', href: '/admin-dashboard/reviews', icon: Star },
  { name: 'Notifications', href: '/admin-dashboard/notifications', icon: Bell },
  { name: 'Analytics', href: '/admin-dashboard/analytics', icon: BarChart },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getMe().then(setUser).catch(console.error);
  }, []);

  return (
    <aside className="w-64 border-r bg-background min-h-screen p-6">
      <h2 className="font-bold text-2xl text-primary mb-8">Admin Panel</h2>

      {/* Profile Section */}
      <div className="mb-8">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex w-full items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
            <span className="font-medium text-sm">
              {user?.data?.name || 'Admin'}
            </span>
          </div>
          <ChevronDown size={16} className={cn("transition-transform", showProfile && "rotate-180")} />
        </button>

        {showProfile && user?.data && (
          <Card className="mt-2 p-4 text-sm space-y-2">
            <p><span className="font-semibold">Name:</span> {user.data.name}</p>
            <p className="break-all"><span className="font-semibold">Email:</span> {user.data.email}</p>
            <p><span className="font-semibold">Role:</span> <span className="capitalize">{user.data.role}</span></p>
            {user.data.createdAt && (
              <p><span className="font-semibold">Joined:</span> {new Date(user.data.createdAt).toLocaleDateString()}</p>
            )}
          </Card>
        )}
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg hover:bg-muted",
              pathname === link.href && "bg-primary text-primary-foreground",
            )}
          >
            <link.icon size={20} />
            {link.name}
          </Link>
        ))}
        <Link
          href="/login"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted mt-8 text-destructive"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </nav>
    </aside>
  );
};
