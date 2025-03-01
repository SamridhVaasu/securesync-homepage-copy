'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) return null;
  return (
    <>
      <Navbar />
      <style jsx global>{`
        main {
          padding-top: ${isDashboard ? '0' : '4rem'};
        }
      `}</style>
    </>
  );
} 