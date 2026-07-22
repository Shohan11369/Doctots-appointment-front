'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check for token on mount and when focus returns to the window
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Clear the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  // Function to get the correct dashboard link based on role
  // Note: Since role isn't stored in token directly here, we might need a better way to fetch it,
  // but for now, we'll keep it simple or fetch it on mount.
  // Actually, for simplicity and to solve the user's immediate issue, 
  // let's assume we need to fetch user info to know the role.
  // Or, we can just point to /dashboard and let the middleware/page handle the redirection.
  
  // Let's keep the Dashboard link simple for now:
  const dashboardLink = "/dashboard"; // Middleware/Layout should handle actual routing based on role if needed.

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-bold text-primary text-2xl tracking-tight flex items-center gap-2">
          <span style={{ fontFamily: 'cursive' }} className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">&lt;MediQueue Pro /&gt;</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-foreground">
          <Link href="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/reviews" className="hover:text-primary transition-colors">Review</Link>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {isLoggedIn ? (
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
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

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-6 space-y-4 flex flex-col bg-background">
          <Link href="/doctors" className="text-sm font-medium">Doctors</Link>
          <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
          <Link href="/reviews" className="text-sm font-medium"> Review</Link>
          {isLoggedIn ? (
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/register">Register</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
