"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  Star,
  Bell,
  BarChart,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/admin-dashboard/profile", icon: Users },
  { name: "Users", href: "/admin-dashboard/users", icon: Users },
  { name: "Doctors", href: "/admin-dashboard/doctors", icon: UserPlus },
  {
    name: "Appointments",
    href: "/admin-dashboard/appointments",
    icon: Calendar,
  },
  { name: "Requests", href: "/admin-dashboard/requests", icon: Calendar },
  { name: "Reviews", href: "/admin-dashboard/reviews", icon: Star },
  { name: "Notifications", href: "/admin-dashboard/notifications", icon: Bell },
  { name: "Analytics", href: "/admin-dashboard/analytics", icon: BarChart },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r bg-background min-h-screen p-6 hidden md:block">
      <h2 className="font-bold text-2xl text-primary mb-8">Admin Panel</h2>
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
