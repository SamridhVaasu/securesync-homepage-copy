"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const [showSidebar, setShowSidebar] = useState(false)
  
  // Check if current path is a dashboard route
  const isDashboard = pathname?.startsWith('/dashboard')

  // Hide sidebar when navigating away from dashboard
  useEffect(() => {
    if (!isDashboard) {
      setShowSidebar(false)
    }
  }, [pathname, isDashboard])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar 
        showSidebarButton={isDashboard}
        onSidebarToggle={() => setShowSidebar(!showSidebar)} 
      />
      
      <div className="flex-1 flex">
        {isDashboard && (
          <Sidebar 
            isOpen={showSidebar}
            onClose={() => setShowSidebar(false)}
          />
        )}
        
        <main className={`flex-1 ${isDashboard ? 'p-4 md:p-6 lg:p-8' : ''}`}>
          {children}
        </main>
      </div>

      {!isDashboard && <Footer />}
    </div>
  )
} 