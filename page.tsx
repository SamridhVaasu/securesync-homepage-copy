"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Shield, Zap, BarChart3, RefreshCw, ChevronRight, Moon, Sun, MessageCircle, X, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [monthlyCost, setMonthlyCost] = useState(5000)
  const [teamSize, setTeamSize] = useState(10)

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
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SecureSync AI</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#architecture" className="text-sm font-medium hover:text-primary transition-colors">
                Architecture
              </Link>
              <Link href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#integrations" className="text-sm font-medium hover:text-primary transition-colors">
                Integrations
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Button className="hidden md:inline-flex">Login</Button>

              <Button variant="outline" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-2">
              <Link href="#features" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link
                href="#architecture"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Architecture
              </Link>
              <Link href="#dashboard" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="#pricing" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link
                href="#integrations"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Integrations
              </Link>
              <Button className="w-full mt-2">Login</Button>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Intelligent AI-Driven Security for DevOps
                </h1>
                <p className="text-xl text-muted-foreground">
                  Combining SAST/DAST with machine learning for superior vulnerability detection. Protect your code with
                  the power of AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="gap-2">
                    Start Free Trial
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Request Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-primary/10 absolute -top-20 -right-20 w-64 h-64 blur-3xl"></div>
                <div className="relative z-10 bg-gradient-to-br from-card to-background p-1 rounded-xl border border-border shadow-xl">
                  <div className="bg-card rounded-lg p-6 relative overflow-hidden">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-2 w-24 bg-primary/20 rounded-full"></div>
                        <div className="h-8 w-32 bg-primary/10 rounded-md"></div>
                        <div className="h-20 w-full bg-muted rounded-md mt-4"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-16 bg-primary/20 rounded-full"></div>
                        <div className="h-8 w-28 bg-primary/10 rounded-md"></div>
                        <div className="h-20 w-full bg-muted rounded-md mt-4"></div>
                      </div>
                    </div>
                    <div className="mt-4 h-32 w-full bg-muted rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="h-12 w-12 text-primary/40" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-8 bg-primary/10 rounded-md"></div>
                      <div className="h-8 bg-primary/10 rounded-md"></div>
                      <div className="h-8 bg-primary/10 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits</h2>
              <p className="text-muted-foreground text-lg">
                SecureSync AI delivers enterprise-grade security with unmatched efficiency and intelligence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Intelligent Security Fusion</CardTitle>
                  <CardDescription>Advanced AI algorithms that reduce false positives by 35%</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our proprietary AI models combine multiple security approaches to deliver more accurate threat
                    detection with fewer false alarms.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Dynamic & Modular Design</CardTitle>
                  <CardDescription>Adaptability to new and emerging threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our system continuously learns and adapts to new threat patterns, ensuring your security evolves
                    with the threat landscape.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Enterprise-Grade Security</CardTitle>
                  <CardDescription>Cost-effective at ₹5,054-₹6,709/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get the security infrastructure of large enterprises at a fraction of the cost, with flexible
                    pricing options.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Proactive Detection</CardTitle>
                  <CardDescription>Quant-driven vulnerability identification</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our quantitative approach to security identifies vulnerabilities before they can be exploited, with
                    88% precision and 92% recall.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Architecture Visualization */}
        <section id="architecture" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Architecture</h2>
              <p className="text-muted-foreground text-lg">
                See how SecureSync AI integrates seamlessly with your CI/CD pipeline
              </p>
            </div>

            <div className="relative bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-4 border border-border relative">
                    <h3 className="font-medium mb-2">Code Repository</h3>
                    <p className="text-sm text-muted-foreground">Your source code in GitHub, GitLab, or Bitbucket</p>
                    <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-green-500"></div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 border border-border relative">
                    <h3 className="font-medium mb-2">CI/CD Pipeline</h3>
                    <p className="text-sm text-muted-foreground">
                      Integration with GitHub Actions, Azure DevOps, Jenkins
                    </p>
                    <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-green-500"></div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20 relative">
                    <h3 className="font-medium mb-2">SecureSync AI Engine</h3>
                    <p className="text-sm text-muted-foreground">Our core security analysis platform</p>
                    <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-xs aspect-square">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-muted animate-spin-slow"></div>
                    <div className="absolute inset-8 rounded-full border-4 border-dashed border-primary/30 animate-spin-slow-reverse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary/10 h-24 w-24 rounded-full flex items-center justify-center">
                        <Shield className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <h3 className="font-medium mb-2">SAST Analysis</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">Precision</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <h3 className="font-medium mb-2">DAST Analysis</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">Recall</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <h3 className="font-medium mb-2">AI Enhancement</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">False Positive Reduction</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">88%</div>
                    <div className="text-xs text-muted-foreground mt-1">Precision</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">92%</div>
                    <div className="text-xs text-muted-foreground mt-1">Recall</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">35%</div>
                    <div className="text-xs text-muted-foreground mt-1">False Positive Reduction</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">1s</div>
                    <div className="text-xs text-muted-foreground mt-1">Refresh Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section id="dashboard" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Dashboard Preview</h2>
              <p className="text-muted-foreground text-lg">Real-time security monitoring with 1-second refresh rate</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="threats">Threats</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                  <div className="border-b border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="font-medium">Security Overview</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Last updated: Just now</span>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="bg-muted rounded-lg p-4 h-64 relative overflow-hidden">
                          <h3 className="font-medium mb-2">Vulnerability Trend</h3>
                          <div className="absolute inset-0 pt-10 px-4">
                            <div className="h-full w-full flex items-end">
                              <div className="flex-1 h-[20%] bg-green-500/20 rounded-t-sm"></div>
                              <div className="flex-1 h-[30%] bg-green-500/30 rounded-t-sm"></div>
                              <div className="flex-1 h-[25%] bg-green-500/20 rounded-t-sm"></div>
                              <div className="flex-1 h-[40%] bg-yellow-500/30 rounded-t-sm"></div>
                              <div className="flex-1 h-[35%] bg-yellow-500/20 rounded-t-sm"></div>
                              <div className="flex-1 h-[20%] bg-green-500/20 rounded-t-sm"></div>
                              <div className="flex-1 h-[15%] bg-green-500/30 rounded-t-sm"></div>
                              <div className="flex-1 h-[10%] bg-green-500/20 rounded-t-sm"></div>
                              <div className="flex-1 h-[5%] bg-green-500/10 rounded-t-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-4">
                          <div className="bg-muted rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Security Score</h3>
                              <span className="text-lg font-bold text-primary">92/100</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                            </div>
                          </div>

                          <div className="bg-muted rounded-lg p-4">
                            <h3 className="font-medium mb-2">Vulnerabilities</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Critical</span>
                                <span className="text-sm font-medium text-red-500">0</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">High</span>
                                <span className="text-sm font-medium text-orange-500">2</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Medium</span>
                                <span className="text-sm font-medium text-yellow-500">5</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Low</span>
                                <span className="text-sm font-medium text-green-500">12</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted rounded-lg p-4">
                            <h3 className="font-medium mb-2">Last Scan</h3>
                            <div className="text-sm text-muted-foreground">Today, 10:45 AM</div>
                            <div className="text-xs text-green-500 mt-1">All systems operational</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-3">Recent Activity</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-muted-foreground">10:45 AM</span>
                          <span>Completed security scan on main branch</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <span className="text-muted-foreground">09:30 AM</span>
                          <span>Detected 2 new medium vulnerabilities in /api/auth</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-muted-foreground">Yesterday</span>
                          <span>Fixed 3 vulnerabilities in payment module</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="threats">
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                  <div className="border-b border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="font-medium">Threat Detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Real-time monitoring</span>
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <h3 className="font-medium mb-3">Active Threats</h3>
                          <div className="space-y-3">
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                  <span className="font-medium">SQL Injection Vulnerability</span>
                                </div>
                                <span className="text-xs bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">
                                  Medium
                                </span>
                              </div>
                              <p className="text-sm mt-2 text-muted-foreground">
                                Detected in /api/users endpoint. User input not properly sanitized.
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button size="sm">Fix Now</Button>
                              </div>
                            </div>

                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                  <span className="font-medium">Outdated Dependency</span>
                                </div>
                                <span className="text-xs bg-orange-500/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                                  High
                                </span>
                              </div>
                              <p className="text-sm mt-2 text-muted-foreground">
                                react-router-dom@5.2.0 has known vulnerabilities. Update to latest version.
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button size="sm">Update Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted rounded-lg p-4 h-64 relative overflow-hidden">
                          <h3 className="font-medium mb-2">Threat Map</h3>
                          <div className="absolute inset-0 pt-10 px-4 flex items-center justify-center">
                            <div className="relative w-full h-full max-w-md">
                              <div className="absolute inset-0 bg-primary/5 rounded-lg"></div>
                              <div className="absolute h-3 w-3 bg-red-500 rounded-full top-1/4 left-1/3 animate-ping"></div>
                              <div className="absolute h-3 w-3 bg-yellow-500 rounded-full top-1/2 left-2/3 animate-ping"></div>
                              <div className="absolute h-3 w-3 bg-green-500 rounded-full bottom-1/4 right-1/4 animate-ping"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Shield className="h-16 w-16 text-primary/20" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-muted rounded-lg p-4 h-full">
                          <h3 className="font-medium mb-3">Threat Intelligence</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Threat Level</span>
                                <span className="text-sm font-medium text-yellow-500">Medium</span>
                              </div>
                              <div className="w-full bg-background rounded-full h-2 mt-1">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Attack Attempts</span>
                                <span className="text-sm font-medium">24 today</span>
                              </div>
                              <div className="w-full bg-background rounded-full h-2 mt-1">
                                <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Blocked Attacks</span>
                                <span className="text-sm font-medium text-green-500">100%</span>
                              </div>
                              <div className="w-full bg-background rounded-full h-2 mt-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                              <h4 className="text-sm font-medium mb-2">Top Attack Vectors</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>SQL Injection</span>
                                  <span>42%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>XSS</span>
                                  <span>28%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>CSRF</span>
                                  <span>15%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>Other</span>
                                  <span>15%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                  <div className="border-b border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span className="font-medium">Security Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Updated hourly</span>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted rounded-lg p-4 h-64 relative overflow-hidden">
                        <h3 className="font-medium mb-2">Vulnerability Trends</h3>
                        <div className="absolute inset-0 pt-10 px-4">
                          <div className="h-full w-full flex items-end">
                            <div className="flex-1 h-[60%] bg-red-500/20 rounded-t-sm"></div>
                            <div className="flex-1 h-[50%] bg-red-500/30 rounded-t-sm"></div>
                            <div className="flex-1 h-[40%] bg-orange-500/20 rounded-t-sm"></div>
                            <div className="flex-1 h-[30%] bg-orange-500/30 rounded-t-sm"></div>
                            <div className="flex-1 h-[25%] bg-yellow-500/20 rounded-t-sm"></div>
                            <div className="flex-1 h-[20%] bg-yellow-500/30 rounded-t-sm"></div>
                            <div className="flex-1 h-[15%] bg-green-500/20 rounded-t-sm"></div>
                            <div className="flex-1 h-[10%] bg-green-500/30 rounded-t-sm"></div>
                            <div className="flex-1 h-[5%] bg-green-500/20 rounded-t-sm"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4 h-64 relative overflow-hidden">
                        <h3 className="font-medium mb-2">Security Score History</h3>
                        <div className="absolute inset-0 pt-10 px-4">
                          <div className="h-full w-full flex items-end justify-end">
                            <div className="absolute inset-x-4 bottom-0 h-[70%] border-b border-l border-border"></div>
                            <div className="relative h-[70%] w-full">
                              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                                <path
                                  d="M0,50 Q10,40 20,45 T40,35 T60,45 T80,30 T100,20"
                                  fill="none"
                                  stroke="hsl(var(--primary))"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h3 className="font-medium mb-2">AI Detection Accuracy</h3>
                        <div className="text-3xl font-bold text-primary">88%</div>
                        <p className="text-sm text-muted-foreground mt-1">Precision in vulnerability detection</p>
                      </div>

                      <div className="bg-muted rounded-lg p-4">
                        <h3 className="font-medium mb-2">False Positive Rate</h3>
                        <div className="text-3xl font-bold text-green-500">-35%</div>
                        <p className="text-sm text-muted-foreground mt-1">Reduction compared to traditional tools</p>
                      </div>

                      <div className="bg-muted rounded-lg p-4">
                        <h3 className="font-medium mb-2">Time to Detection</h3>
                        <div className="text-3xl font-bold text-primary">1.2s</div>
                        <p className="text-sm text-muted-foreground mt-1">Average time to identify threats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Cost Savings Calculator */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Cost Savings Calculator</h2>
              <p className="text-muted-foreground text-lg">
                See how much you can save with SecureSync AI compared to traditional security solutions
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Estimate Your Savings</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Team Size</label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[teamSize]}
                          min={1}
                          max={100}
                          step={1}
                          onValueChange={(value) => setTeamSize(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12 text-right">{teamSize}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Current Monthly Security Costs (₹)</label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[monthlyCost]}
                          min={1000}
                          max={50000}
                          step={1000}
                          onValueChange={(value) => setMonthlyCost(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-20 text-right">₹{monthlyCost.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Estimated Monthly Cost with SecureSync AI</span>
                        <span className="font-bold text-primary">
                          ₹{Math.min(Math.max(teamSize * 500, 5054), 6709).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Estimated Annual Savings</span>
                        <span className="font-bold text-green-500">
                          ₹{((monthlyCost - Math.min(Math.max(teamSize * 500, 5054), 6709)) * 12).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Comparison with Traditional Solutions</h3>

                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1"></div>
                      <div className="text-center font-medium text-sm">Traditional</div>
                      <div className="text-center font-medium text-sm">SecureSync AI</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm">Initial Setup</div>
                      <div className="text-center text-sm">₹50,000+</div>
                      <div className="text-center text-sm text-green-500">₹0</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm">Monthly Cost</div>
                      <div className="text-center text-sm">₹15,000+</div>
                      <div className="text-center text-sm text-green-500">₹5,054-₹6,709</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm">False Positives</div>
                      <div className="text-center text-sm">High</div>
                      <div className="text-center text-sm text-green-500">35% Reduction</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm">Setup Time</div>
                      <div className="text-center text-sm">Days/Weeks</div>
                      <div className="text-center text-sm text-green-500">Minutes</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm">AI-Enhanced</div>
                      <div className="text-center text-sm">❌</div>
                      <div className="text-center text-sm text-green-500">✓</div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button className="w-full">Get Custom Quote</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section id="integrations" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Integration Partners</h2>
              <p className="text-muted-foreground text-lg">
                SecureSync AI seamlessly integrates with your existing tools and workflows
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Image src="/placeholder.svg?height=64&width=64" alt="GitHub Actions" width={40} height={40} />
                </div>
                <h3 className="font-medium">GitHub Actions</h3>
                <p className="text-sm text-muted-foreground mt-2">Seamless CI/CD integration</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Image src="/placeholder.svg?height=64&width=64" alt="Azure DevOps" width={40} height={40} />
                </div>
                <h3 className="font-medium">Azure DevOps</h3>
                <p className="text-sm text-muted-foreground mt-2">Complete pipeline security</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Image src="/placeholder.svg?height=64&width=64" alt="SonarQube" width={40} height={40} />
                </div>
                <h3 className="font-medium">SonarQube</h3>
                <p className="text-sm text-muted-foreground mt-2">Enhanced code quality checks</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Image src="/placeholder.svg?height=64&width=64" alt="OWASP ZAP" width={40} height={40} />
                </div>
                <h3 className="font-medium">OWASP ZAP</h3>
                <p className="text-sm text-muted-foreground mt-2">Advanced vulnerability scanning</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">And many more integrations available through our API</p>
              <Button variant="outline">View All Integrations</Button>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your DevOps pipeline?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Get a free vulnerability assessment and see how SecureSync AI can transform your security posture.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="gap-2">
                      Start Free Trial
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline">
                      Request Demo
                    </Button>
                  </div>
                </div>

                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium block mb-1">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-medium block mb-1">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className="text-sm font-medium block mb-1">
                        Company
                      </label>
                      <Input id="company" placeholder="Your company" />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium block mb-1">
                        Message
                      </label>
                      <Textarea id="message" placeholder="How can we help you?" rows={4} />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SecureSync AI</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced AI-powered security for modern DevOps teams.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Security Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    DevOps Best Practices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SecureSync AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className={`fixed bottom-6 right-6 z-50 ${chatOpen ? "w-80" : "w-auto"}`}>
        {chatOpen ? (
          <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden flex flex-col h-96">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">SecureSync Support</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hello! How can I help you with SecureSync AI today?</p>
                  <span className="text-xs text-muted-foreground mt-1 block">10:30 AM</span>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-sm">I'd like to learn more about your pricing.</p>
                  <span className="text-xs text-muted-foreground mt-1 block">10:31 AM</span>
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Our pricing starts at ₹5,054/month for small teams and scales based on your needs. Would you like me
                    to arrange a custom quote for you?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">10:32 AM</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button onClick={() => setChatOpen(true)} size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

