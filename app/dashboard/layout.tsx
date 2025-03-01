'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Home,
  AlertTriangle,
  Bell,
  FileText,
  Settings,
  Users,
  FolderSync,
  LogOut,
  Menu,
  X,
  GitBranch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Vulnerabilities', href: '/dashboard/vulnerabilities', icon: AlertTriangle },
  { name: 'File Sync', href: '/dashboard/files', icon: FolderSync },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Pipeline', href: '/dashboard/pipeline', icon: GitBranch },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 transform transition-transform duration-300 ease-in-out bg-card/50 backdrop-blur-xl border-r border-border/50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center gap-3 px-8 border-b border-border/50">
            <div className="p-2 rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
              SecureSync
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20'
                          : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute right-4 h-2 w-2 rounded-full bg-primary-foreground"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 mx-4 mb-4 border-t border-border/50">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JS</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20"
      >
        {sidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </motion.button>

      {/* Main Content */}
      <main className="md:pl-72 min-h-screen">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
} 