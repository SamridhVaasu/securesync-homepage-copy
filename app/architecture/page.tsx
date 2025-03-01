"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, ChevronRight, Moon, Sun, Plus, Minus, Code, Database, Cloud, Network } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArchitecturePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${darkMode ? "dark" : ""}`}>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SecureSync AI</span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Technical Architecture
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover how SecureSync AI combines advanced SAST/DAST capabilities with machine learning
                for unparalleled security analysis and protection.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Component Breakdown */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">System Components</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="relative overflow-hidden hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Intelligent Vulnerability Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Our hybrid approach combines traditional SAST/DAST with AI-powered analysis
                      for superior vulnerability detection.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Key Features:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• ML-enhanced pattern recognition</li>
                        <li>• Real-time code analysis</li>
                        <li>• Contextual vulnerability scoring</li>
                        <li>• Automated fix suggestions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    CI/CD Security Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Seamless integration with your existing CI/CD workflow for continuous security monitoring.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Integration Points:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• GitHub Actions / GitLab CI</li>
                        <li>• Jenkins Pipeline</li>
                        <li>• Azure DevOps</li>
                        <li>• Custom webhook support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data Processing Engine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      High-performance data processing system for real-time security analysis.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Capabilities:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• 1M+ LOC in 3 minutes</li>
                        <li>• Parallel processing</li>
                        <li>• Real-time data streaming</li>
                        <li>• Distributed architecture</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    Cloud Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Scalable cloud infrastructure powered by Azure Kubernetes Service.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Auto-scaling clusters</li>
                        <li>• Multi-region deployment</li>
                        <li>• High availability</li>
                        <li>• Disaster recovery</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Performance Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">3min</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Average scan time for 1M+ lines of code</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">88%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Detection precision rate</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">&lt;100ms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Average response time</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">50+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Concurrent scans supported</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Documentation */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Documentation</h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>API Integration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        SecureSync AI provides a RESTful API for seamless integration with your existing tools.
                      </p>
                      <div className="bg-card rounded-lg p-4 font-mono text-sm">
                        <pre>{`POST /api/v1/scan
{
  "repository": "https://github.com/user/repo",
  "branch": "main",
  "scan_type": "full",
  "callback_url": "https://your-callback.com/webhook"
}`}</pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Deployment Guide</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Step-by-step guide for deploying SecureSync AI in your environment.
                      </p>
                      <div className="bg-card rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Configure cloud resources</li>
                          <li>Set up Kubernetes cluster</li>
                          <li>Deploy SecureSync AI components</li>
                          <li>Configure CI/CD integration</li>
                        </ol>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Configuration Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Customize SecureSync AI to match your security requirements.
                      </p>
                      <div className="bg-card rounded-lg p-4 font-mono text-sm">
                        <pre>{`{
  "scan_frequency": "hourly",
  "severity_threshold": "medium",
  "notification_channels": ["slack", "email"],
  "custom_rules": true
}`}</pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to enhance your security?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get started with SecureSync AI today and experience the future of DevOps security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SecureSync AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 