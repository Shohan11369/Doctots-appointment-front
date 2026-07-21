"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Star,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Overview", href: "/doctor-dashboard", icon: LayoutDashboard },
  {
    name: "Appointments",
    href: "/doctor-dashboard/appointments",
    icon: Calendar,
  },
  { name: "Patients", href: "/doctor-dashboard/patients", icon: Users },
  { name: "Posts", href: "/doctor-dashboard/posts", icon: User },
  { name: "Earnings", href: "/doctor-dashboard/earnings", icon: DollarSign },
  { name: "Reviews", href: "/doctor-dashboard/reviews", icon: Star },
  { name: "Profile", href: "/doctor-dashboard/profile", icon: User },
];

export const DoctorSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r bg-background min-h-screen p-6 hidden md:block">
      <h2 className="font-bold text-2xl text-primary mb-8">MediQueue Pro</h2>
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
