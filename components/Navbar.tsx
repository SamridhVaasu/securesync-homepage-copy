'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b border-accent/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent/90">SecureSync</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link 
            href="/architecture" 
            className={`nav-link relative text-sm font-medium ${isActive('/architecture') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Architecture
            {isActive('/architecture') && (
              <motion.div 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                initial={false}
              />
            )}
          </Link>
          <Link 
            href="/dashboard" 
            className={`nav-link relative text-sm font-medium ${isActive('/dashboard') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Dashboard
            {isActive('/dashboard') && (
              <motion.div 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                initial={false}
              />
            )}
          </Link>
          <Link 
            href="/pipeline" 
            className={`nav-link relative text-sm font-medium ${isActive('/pipeline') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Pipeline
            {isActive('/pipeline') && (
              <motion.div 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                initial={false}
              />
            )}
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link href="/signup">
            <Button variant="default" className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white rounded-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;