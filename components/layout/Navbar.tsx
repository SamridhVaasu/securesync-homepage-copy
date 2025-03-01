"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  showSidebarButton?: boolean
  onSidebarToggle?: () => void
}

export default function Navbar({ showSidebarButton, onSidebarToggle }: NavbarProps) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-base h-16 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {showSidebarButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">SecureSync</span>
          </Link>
        </div>

        {/* Center section - Main navigation */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/features"
              className={`text-sm font-medium transition-colors hover:text-primary
                ${pathname === '/features' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary
                ${pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary
                ${pathname === '/about' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary
                ${pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Contact
            </Link>
          </div>
        )}

        {/* Right section */}
        <div className="flex items-center gap-4">
          {isDashboard ? (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="button-primary" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 