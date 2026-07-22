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
    <aside className="w-full border-b bg-background p-4 md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
      <div className="flex items-center justify-between gap-3 md:block">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">
          MediQueue Pro
        </h2>
        <p className="text-sm text-muted-foreground md:hidden">Doctor Panel</p>
      </div>
      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-8 md:grid-cols-1 md:gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg p-3 text-sm transition-colors hover:bg-muted md:justify-start md:gap-3",
              pathname === link.href && "bg-primary text-primary-foreground",
            )}
          >
            <link.icon size={18} />
            <span>{link.name}</span>
          </Link>
        ))}
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 rounded-lg p-3 text-sm text-destructive transition-colors hover:bg-muted md:mt-8 md:justify-start md:gap-3"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
};
