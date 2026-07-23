'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState('/dashboard');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      setIsLoggedIn(!!token);

      // Role অনুযায়ী Dashboard Link সেট করা
      if (role === 'doctor') {
        setDashboardLink('/doctor-dashboard');
      } else if (role === 'admin') {
        setDashboardLink('/admin-dashboard');
      } else {
        setDashboardLink('/dashboard'); // Patient
      }
    };

    checkAuth();

    window.addEventListener('focus', checkAuth);

    return () => {
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Clear Cookie
    document.cookie =
      'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    setIsLoggedIn(false);

    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-primary text-2xl tracking-tight flex items-center gap-2"
        >
          <span
            style={{ fontFamily: 'cursive' }}
            className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            &lt;MediQueue Pro /&gt;
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-foreground">
          <Link
            href="/doctors"
            className="hover:text-primary transition-colors"
          >
            Doctors
          </Link>

          <Link
            href={dashboardLink}
            className="hover:text-primary transition-colors"
          >
            Dashboard
          </Link>

          <Link
            href="/reviews"
            className="hover:text-primary transition-colors"
          >
            Review
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex gap-4 items-center">
          {isLoggedIn ? (
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/register">Register</Link>
              </Button>

              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-6 space-y-4 flex flex-col bg-background">
          <Link
            href="/doctors"
            className="text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Doctors
          </Link>

          <Link
            href={dashboardLink}
            className="text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/reviews"
            className="text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Review
          </Link>

          {isLoggedIn ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="w-full"
              >
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </Button>

              <Button
                asChild
                className="w-full"
              >
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};