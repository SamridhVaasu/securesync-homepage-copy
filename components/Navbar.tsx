'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">SecureSync</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/features" 
            className={`nav-link ${isActive('/features') ? 'text-foreground' : ''}`}
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className={`nav-link ${isActive('/pricing') ? 'text-foreground' : ''}`}
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className={`nav-link ${isActive('/about') ? 'text-foreground' : ''}`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`nav-link ${isActive('/contact') ? 'text-foreground' : ''}`}
          >
            Contact
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="default" className="button-primary">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 