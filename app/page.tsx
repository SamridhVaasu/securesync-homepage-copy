"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Shield, 
  Zap, 
  History, 
  Monitor, 
  Users, 
  Lock, 
  Star,
  Brain,
  BarChart, 
  Bell,
  Cpu,
  Cloud,
  DollarSign,
  Code,
  Check,
  X,
  ChevronRight,
  ExternalLink,
  Database,
  Server,
  Network,
  LineChart,
  GitBranch,
  BadgeCheck,
  Layers,
  ArrowRight,
  Eye,
  Clock,
  Terminal,
  LockIcon,
  Key,
  PenTool,
  Search,
  Sliders,
  Grid,
  PieChart,
  UserCheck,
  MousePointer,
  Settings,
  ChevronDown
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('architecture');
  const [activePlan, setActivePlan] = useState('business');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  // Scroll references for parallax effects
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const platformRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  
  // Intersection observer for viewport animations
  const isHeroInView = useInView(heroRef, { once: false });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isPlatformInView = useInView(platformRef, { once: true, amount: 0.2 });
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 text-foreground overflow-hidden">
      <Navbar />
      
      {/* Top Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-primary to-accent/50"></div>
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ 
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-60"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          
          {/* Animated background shapes */}
          <motion.div 
            className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-accent/5"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/5"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px]"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isHeroInView ? 1 : 0, 
                y: isHeroInView ? 0 : 30 
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                <Shield className="w-4 h-4" />
                <span>AI-Powered Security Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Next-Generation <br/>
                <div className="inline-block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                    DevSecOps Intelligence
                  </span>
                  <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-accent to-primary/60 rounded-full"></div>
                </div>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                SecureSync AI integrates advanced machine learning with comprehensive security scanning to proactively protect your applications through every stage of development.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white px-8 py-6 rounded-lg shadow-lg shadow-accent/20">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5 px-8 py-6 rounded-lg">
                  Schedule Demo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold shadow-sm">
                      {['MS', 'AB', 'TF', 'JK'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> companies secured this month
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: isHeroInView ? 1 : 0, 
                scale: isHeroInView ? 1 : 0.95 
              }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <div className="relative mx-auto max-w-lg">
                {/* Code Editor Mockup */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-accent/10 bg-background/80 backdrop-blur-sm">
                  {/* Title Bar */}
                  <div className="bg-background/90 border-b border-border/50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-muted-foreground ml-2">securesync-analyzer.js</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent" />
                      <span className="text-xs font-medium text-accent">Secured</span>
                    </div>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-4 font-mono text-xs leading-relaxed text-muted-foreground overflow-hidden">
                    <div className="flex items-center">
                      <span className="text-primary/70">// AI Vulnerability Detection in progress</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-muted-foreground/60">1</span>
                      <span className="ml-3 text-blue-400">import</span>
                      <span className="ml-2 text-foreground">{`{ analyzeCode }`}</span>
                      <span className="ml-2 text-blue-400">from</span>
                      <span className="ml-2 text-green-400">'@securesync/core'</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">2</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">3</span>
                      <span className="ml-3 text-purple-400">async function</span>
                      <span className="ml-2 text-yellow-400">scanRepository</span>
                      <span className="text-foreground">(repo) {`{`}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">4</span>
                      <span className="ml-5 text-foreground">const results = await analyzeCode(repo, {`{`}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">5</span>
                      <span className="ml-7 text-foreground">useAI: true,</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">6</span>
                      <span className="ml-7 text-foreground">deepScan: true,</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">7</span>
                      <span className="ml-7 text-foreground">modelVersion: 'latest'</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">8</span>
                      <span className="ml-5 text-foreground">{`});`}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">9</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-muted-foreground/60">10</span>
                      <span className="ml-5 text-foreground">// Highlight detected vulnerability</span>
                    </div>
                    <div className="mt-1 bg-red-500/10 border-l-2 border-red-500 pl-2">
                      <span className="text-muted-foreground/60">11</span>
                      <span className="ml-5 text-purple-400">if</span>
                      <span className="ml-2 text-foreground">(results.vulnerabilities.length > 0) {`{`}</span>
                    </div>
                    <div className="mt-1 bg-red-500/10 border-l-2 border-red-500 pl-2">
                      <span className="text-muted-foreground/60">12</span>
                      <span className="ml-7 text-foreground">console.log(</span>
                      <span className="text-green-400">'Critical issues found'</span>
                      <span className="text-foreground">);</span>
                    </div>
                  </div>
                  
                  {/* Security Alert */}
                  <div className="p-4 bg-gradient-to-r from-accent/5 to-primary/5 border-t border-accent/10">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-500/10 p-2 rounded-lg">
                        <Shield className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Potential Security Issue</h4>
                        <p className="text-xs text-muted-foreground mt-1">Unsanitized user input on line 11 could lead to XSS vulnerability</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="sm" variant="secondary" className="h-7 px-3 text-xs rounded-md">View Details</Button>
                          <Button size="sm" className="h-7 px-3 text-xs bg-accent hover:bg-accent/90 text-white rounded-md">Fix Issue</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-6 -right-6 bg-accent/10 backdrop-blur-md border border-accent/20 rounded-lg p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium">AI Detection Active</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-lg p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Scan time: 3.2s</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Trust Badges Section */}
      <section className="py-12 border-y border-border/10 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">TRUSTED BY INDUSTRY LEADERS</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Microsoft', 'Amazon', 'Stripe', 'Salesforce', 'Oracle', 'IBM'].map((company, index) => (
              <div key={index} className="text-xl font-semibold text-muted-foreground/50">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section ref={featuresRef} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>Industry-Leading Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Industrial-Grade Security Intelligence</h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered platform combines advanced machine learning with comprehensive security scanning to deliver unmatched protection.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="h-full p-6 rounded-xl bg-secondary/5 border border-border/50 hover:border-accent/20 transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${hoveredFeature === index ? 'opacity-100' : ''}`}></div>
                  
                  <div className="relative">
                    <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-accent to-primary/80 flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    
                    <ul className="space-y-2">
                      {feature.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Platform Visualization Tabs */}
      <section ref={platformRef} className="py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isPlatformInView ? 1 : 0, y: isPlatformInView ? 0 : 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
              <Eye className="w-4 h-4" />
              <span>Platform Overview</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">See How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Explore our advanced platform architecture, intuitive dashboards, and flexible pipeline builder.
            </p>
          </motion.div>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['architecture', 'dashboard', 'pipeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab 
                  ? 'bg-accent text-white shadow-md' 
                  : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="relative bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 p-4 md:p-8 shadow-xl">
            <AnimatePresence mode="wait">
              {activeTab === 'architecture' && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-background to-secondary/5 rounded-xl overflow-hidden relative">
                    {/* Architecture Diagram */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full max-w-4xl">
                        {/* User Layer */}
                        <div className="flex justify-center mb-8">
                          <div className="px-6 py-3 rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Development Teams</span>
                          </div>
                        </div>
                        
                        {/* API Gateway */}
                        <div className="flex justify-center mb-8">
                          <div className="px-6 py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-medium w-72 text-center">
                            API Gateway
                          </div>
                        </div>
                        
                        {/* Services Layer */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                          {['Authentication', 'CI/CD Integration', 'AI Analysis Engine', 'Reporting Service'].map((service, index) => (
                            <div key={index} className="px-4 py-3 rounded-lg bg-secondary/20 border border-border/50 text-center text-sm">
                              {service}
                            </div>
                          ))}
                        </div>
                        
                        {/* Core Layer */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="px-4 py-6 rounded-lg bg-accent/5 border border-accent/10 text-center flex flex-col items-center gap-2">
                            <Code className="w-5 h-5 text-accent" />
                            <span className="text-sm font-medium">SAST Engine</span>
                          </div>
                          <div className="px-4 py-6 rounded-lg bg-primary/5 border border-primary/10 text-center flex flex-col items-center gap-2">
                            <Brain className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">AI Model Core</span>
                          </div>
                          <div className="px-4 py-6 rounded-lg bg-accent/5 border border-accent/10 text-center flex flex-col items-center gap-2">
                            <Network className="w-5 h-5 text-accent" />
                            <span className="text-sm font-medium">DAST Engine</span>
                          </div>
                        </div>
                        
                        {/* Data Layer */}
                        <div className="flex justify-center">
                          <div className="px-6 py-3 rounded-lg bg-secondary/30 border border-border/50 text-center w-96 flex items-center justify-center gap-3">
                            <Database className="w-4 h-4" />
                            <span>Unified Security Database</span>
                          </div>
                        </div>
                        
                        {/* Connection Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M400 80 L400 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-border" />
                            <path d="M400 160 L400 200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-border" />
                            <path d="M200 240 L200 280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-border" />
                            <path d="M400 240 L400 280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-border" />
                            <path d="M600 240 L600 280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-border" />
                            <path d="M400 340 L400 380" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-border" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Architecture Description */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 max-w-xs">
                        <h4 className="font-medium mb-2 text-sm">Modular Architecture</h4>
                        <p className="text-xs text-muted-foreground">
                          Our cloud-native platform scales automatically with your needs, leveraging containerized microservices for maximum flexibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-background to-secondary/5 rounded-xl overflow-hidden relative">
                    {/* Dashboard Content */}
                    <div className="absolute inset-0 p-6">
                      <div className="grid grid-cols-12 gap-6 h-full">
                        {/* Security Score */}
                        <div className="col-span-3 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                          <h3 className="text-lg font-semibold mb-6">Security Score</h3>
                          <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-400">Good</span>
                              <span className="text-lg font-bold">85%</span>
                            </div>
                            <div className="h-2 bg-gray-200/20 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <div className="mt-6 space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Last scan:</span>
                                <span>10 minutes ago</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Active projects:</span>
                                <span>12</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Issues resolved:</span>
                                <span className="text-green-500">85%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Threat Detection Timeline */}
                        <div className="col-span-5 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                          <h3 className="text-lg font-semibold mb-6">Threat Detection Timeline</h3>
                          <div className="h-40">
                            <div className="h-32 flex items-end gap-1">
                              {[35, 28, 45, 32, 55, 42, 38, 62, 48, 40, 30, 52, 45, 35].map((value, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-blue-400/20 hover:bg-blue-400/30 transition-colors rounded-t-sm"
                                  style={{ height: `${value}%` }}
                                ></div>
                              ))}
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-gray-400">
                              <span>Feb 15</span>
                              <span>Yesterday</span>
                              <span>Today</span>
                            </div>
                          </div>
                        </div>

                        {/* Issue Breakdown */}
                        <div className="col-span-4 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                          <h3 className="text-lg font-semibold mb-6">Issue Breakdown</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Critical</span>
                              </div>
                              <span className="font-semibold">2</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span>High</span>
                              </div>
                              <span className="font-semibold">7</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span>Medium</span>
                              </div>
                              <span className="font-semibold">15</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>Low</span>
                              </div>
                              <span className="font-semibold">28</span>
                            </div>
                          </div>
                          <div className="mt-6 pt-4 border-t border-border/50">
                            <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-1">
                              View all issues
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Recent Alerts */}
                        <div className="col-span-6 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                          <h3 className="text-lg font-semibold mb-6">Recent Alerts</h3>
                          <div className="space-y-4">
                            <div className="flex items-start gap-4 pb-4 border-b border-border/50">
                              <div className="p-2 bg-red-500/10 rounded-lg">
                                <Shield className="w-4 h-4 text-red-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">SQL Injection Vulnerability Detected</h4>
                                <p className="text-sm text-gray-400 mt-1">In auth-service repository - 45 minutes ago</p>
                              </div>
                              <Button variant="outline" size="sm" className="text-sm">View</Button>
                            </div>
                            <div className="flex items-start gap-4 pb-4 border-b border-border/50">
                              <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Shield className="w-4 h-4 text-orange-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Outdated Dependencies Found</h4>
                                <p className="text-sm text-gray-400 mt-1">In payment-gateway repository - 2 hours ago</p>
                              </div>
                              <Button variant="outline" size="sm" className="text-sm">View</Button>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Shield className="w-4 h-4 text-yellow-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Insecure Password Storage</h4>
                                <p className="text-sm text-gray-400 mt-1">In user-service repository - 5 hours ago</p>
                              </div>
                              <Button variant="outline" size="sm" className="text-sm">View</Button>
                            </div>
                          </div>
                        </div>

                        {/* Compliance Status */}
                        <div className="col-span-6 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                          <h3 className="text-lg font-semibold mb-6">Compliance Status</h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">GDPR</span>
                                <BadgeCheck className="w-5 h-5 text-green-500" />
                              </div>
                              <span className="text-sm text-gray-400">Compliant</span>
                            </div>
                            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">PCI DSS</span>
                                <BadgeCheck className="w-5 h-5 text-green-500" />
                              </div>
                              <span className="text-sm text-gray-400">Compliant</span>
                            </div>
                            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">HIPAA</span>
                                <Clock className="w-5 h-5 text-yellow-500" />
                              </div>
                              <span className="text-sm text-gray-400">In Progress</span>
                            </div>
                          </div>
                          <div className="mt-6 text-right">
                            <span className="text-sm text-gray-400">Last updated: 2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Label */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 max-w-xs">
                        <h4 className="font-medium mb-2 text-sm">Real-time Monitoring</h4>
                        <p className="text-xs text-muted-foreground">
                          Visualize your security posture with intuitive dashboards that provide actionable insights.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'pipeline' && (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-background to-secondary/5 rounded-xl overflow-hidden relative">
                    {/* Pipeline Builder Mockup */}
                    <div className="absolute inset-0 p-4">
                      <div className="bg-background/90 rounded-lg border border-border/50 h-full overflow-hidden shadow-lg">
                        {/* Pipeline Header */}
                        <div className="p-4 border-b border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-accent">
                              <GitBranch className="w-5 h-5" />
                              <span className="font-semibold">Pipeline Builder</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 text-xs">Cancel</Button>
                            <Button size="sm" className="h-8 text-xs bg-accent">Save Pipeline</Button>
                          </div>
                        </div>
                        
                        {/* Pipeline Content */}
                        <div className="p-4 h-[calc(100%-61px)] flex">
                          {/* Tools Panel */}
                          <div className="w-56 border-r border-border/50 pr-4">
                            <h4 className="text-xs font-medium uppercase text-muted-foreground mb-3">Tools</h4>
                            <div className="space-y-2">
                              <div className="p-2 bg-secondary/20 rounded border border-border/50 flex items-center gap-2 cursor-pointer">
                                <Code className="w-4 h-4 text-accent" />
                                <span className="text-xs">Code Scanner</span>
                              </div>
                              <div className="p-2 bg-secondary/20 rounded border border-border/50 flex items-center gap-2 cursor-pointer">
                                <Brain className="w-4 h-4 text-primary" />
                                <span className="text-xs">AI Analyzer</span>
                              </div>
                              <div className="p-2 bg-secondary/20 rounded border border-border/50 flex items-center gap-2 cursor-pointer">
                                <Database className="w-4 h-4" />
                                <span className="text-xs">Dependency Check</span>
                              </div>
                              <div className="p-2 bg-secondary/20 rounded border border-border/50 flex items-center gap-2 cursor-pointer">
                                <Lock className="w-4 h-4" />
                                <span className="text-xs">Secret Scanner</span>
                              </div>
                              <div className="p-2 bg-secondary/20 rounded border border-border/50 flex items-center gap-2 cursor-pointer">
                                <Layers className="w-4 h-4" />
                                <span className="text-xs">Container Scanner</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Pipeline Canvas */}
                          <div className="flex-1 pl-4 relative">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
                            <div className="relative z-10">
                              {/* Start Node */}
                              <div className="flex items-center justify-center mb-6">
                                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg w-40 flex flex-col items-center">
                                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                                    <GitBranch className="w-4 h-4 text-accent" />
                                  </div>
                                  <span className="text-xs font-medium">Git Repository</span>
                                </div>
                              </div>
                              
                              {/* Connection Line */}
                              <div className="h-10 flex items-center justify-center">
                                <div className="h-full w-0.5 bg-border"></div>
                              </div>
                              
                              {/* Middle Nodes - Connected in sequence */}
                              <div className="flex justify-center mb-6">
                                <div className="flex flex-col items-center">
                                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg w-40 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                                      <Brain className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium">AI Analyzer</span>
                                  </div>
                                  
                                  {/* Connection Line */}
                                  <div className="h-10 flex items-center justify-center">
                                    <div className="h-full w-0.5 bg-border"></div>
                                  </div>
                                  
                                  <div className="p-3 bg-secondary/20 border border-border/50 rounded-lg w-40 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center mb-2">
                                      <Code className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-medium">Code Scanner</span>
                                  </div>
                                  
                                  {/* Connection Line */}
                                  <div className="h-10 flex items-center justify-center">
                                    <div className="h-full w-0.5 bg-border"></div>
                                  </div>
                                  
                                  <div className="p-3 bg-secondary/20 border border-border/50 rounded-lg w-40 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center mb-2">
                                      <Lock className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-medium">Secret Scanner</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Connection Line */}
                              <div className="h-10 flex items-center justify-center">
                                <div className="h-full w-0.5 bg-border"></div>
                              </div>
                              
                              {/* End Node */}
                              <div className="flex items-center justify-center">
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg w-40 flex flex-col items-center">
                                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                  </div>
                                  <span className="text-xs font-medium">Security Report</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pipeline Label */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 max-w-xs">
                        <h4 className="font-medium mb-2 text-sm">Customizable Workflows</h4>
                        <p className="text-xs text-muted-foreground">
                          Build tailored security pipelines with our intuitive drag-and-drop workflow builder.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <DollarSign className="w-4 h-4" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground">
              Flexible pricing options designed to scale with your security needs. All plans include our core security features.
            </p>
          </motion.div>
          
          {/* Plan Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-secondary/20 rounded-lg">
              <button
                onClick={() => setActivePlan('starter')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activePlan === 'starter' ? 'bg-white text-accent shadow-sm' : 'text-muted-foreground'
                }`}
              >
                Starter
              </button>
              <button
                onClick={() => setActivePlan('business')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activePlan === 'business' ? 'bg-white text-accent shadow-sm' : 'text-muted-foreground'
                }`}
              >
                Business
              </button>
              <button
                onClick={() => setActivePlan('enterprise')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activePlan === 'enterprise' ? 'bg-white text-accent shadow-sm' : 'text-muted-foreground'
                }`}
              >
                Enterprise
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden border ${
                  activePlan === plan.id
                  ? 'border-accent shadow-lg shadow-accent/5 scale-105 z-10 bg-gradient-to-b from-background to-accent/5'
                  : 'border-border/50 bg-secondary/5'
                } transition-all duration-300`}
              >
                <div className="p-6">
                  <div className={`text-sm font-semibold ${activePlan === plan.id ? 'text-accent' : 'text-muted-foreground'}`}>
                    {plan.name}
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="ml-2 text-muted-foreground text-sm">/month</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  
                  <div className="mt-6">
                    <Button 
                      className={`w-full py-6 rounded-lg ${
                        activePlan === plan.id
                        ? 'bg-accent hover:bg-accent/90 text-white'
                        : 'bg-secondary/20 hover:bg-secondary/30 text-foreground'
                      }`}
                    >
                      {activePlan === plan.id ? 'Get Started' : 'Choose Plan'}
                    </Button>
                  </div>
                </div>
                
                <div className="px-6 pt-2 pb-6">
                  <div className="text-sm font-medium mb-4">Includes:</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${activePlan === plan.id ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by Security Teams</h2>
            <p className="text-lg text-muted-foreground">
              Here's what our customers have to say about how SecureSync AI has transformed their security operations.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-background border border-border/50 p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
            
            {/* Glowing Orbs */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-[80px]"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/10 rounded-full filter blur-[100px]"></div>
            
            <div className="relative p-8 md:p-16 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Ready to Secure Your Applications?
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                    Join hundreds of companies that trust SecureSync AI to protect their code and data. Get started with a free trial today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-accent hover:bg-white/90 px-8 py-6 rounded-lg">
                      Start Free Trial
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-8 py-6 rounded-lg">
                      Schedule Demo
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/10 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Shield className="w-6 h-6" />
                <span className="font-bold text-xl">SecureSync AI</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Advanced AI-powered security platform for modern development teams.
              </p>
              <div className="flex items-center gap-4">
                {['twitter', 'linkedin', 'github', 'discord'].map((social, index) => (
                  <a key={index} href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2">
                {['Features', 'Integrations', 'Pricing', 'Documentation', 'API'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Blog', 'Case Studies', 'Webinars', 'Security Guide', 'Community'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Partners', 'Contact', 'Press'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Terms', 'Privacy', 'Security', 'Compliance', 'DPA'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 SecureSync AI. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-secondary/20 rounded text-sm py-1 px-2 border border-border/50">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data
const keyFeatures = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Analysis",
    description: "Leverage advanced machine learning to identify complex security vulnerabilities that traditional tools miss.",
    bulletPoints: [
      "Neural network vulnerability detection",
      "Code pattern recognition",
      "Contextual security analysis",
      "Automatic remediation suggestions"
    ]
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Deep Code Scanning",
    description: "Comprehensive static and dynamic analysis to detect vulnerabilities across your entire codebase.",
    bulletPoints: [
      "Multi-language support",
      "Framework-specific scanning",
      "Third-party dependency analysis",
      "Custom rule configuration"
    ]
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Seamless CI/CD Integration",
    description: "Integrate security scanning directly into your development pipeline for continuous protection.",
    bulletPoints: [
      "GitHub, GitLab & Bitbucket integration",
      "Jenkins, CircleCI & GitHub Actions",
      "Automated PR security checks",
      "Granular failure policies"
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Real-time Monitoring",
    description: "Continuous monitoring of your applications to detect and respond to security threats instantly.",
    bulletPoints: [
      "Runtime vulnerability detection",
      "Anomaly detection alerts",
      "Suspicious activity tracking",
      "Compliance monitoring"
    ]
  }
];

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "99",
    description: "Perfect for startups and small development teams getting started with security.",
    features: [
      "Up to 5 repositories",
      "Basic vulnerability scanning",
      "Email notifications",
      "GitHub integration",
      "Weekly security reports",
      "Community support"
    ]
  },
  {
    id: "business",
    name: "Business",
    price: "299",
    description: "Ideal for growing development teams with more complex security needs.",
    features: [
      "Up to 20 repositories",
      "Advanced vulnerability scanning",
      "Real-time notifications",
      "All CI/CD integrations",
      "Custom security rules",
      "API access",
      "Priority support",
      "Team management"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "999",
    description: "Comprehensive protection for large organizations with strict security requirements.",
    features: [
      "Unlimited repositories",
      "AI-powered threat analysis",
      "Custom security policies",
      "Compliance reporting (SOC 2, HIPAA, GDPR)",
      "Dedicated security advisor",
      "SLA guarantees",
      "On-premise deployment option",
      "SSO and advanced user management",
      "24/7 premium support"
    ]
  }
];

const testimonials = [
  {
    name: "Jennifer Chang",
    role: "CTO at CloudNine",
    initials: "JC",
    quote: "SecureSync AI has completely transformed our security operations. We've reduced our vulnerability remediation time by 75% and can now ship code with confidence."
  },
  {
    name: "Michael Rodriguez",
    role: "Security Lead at PayStream",
    initials: "MR",
    quote: "The AI-powered analysis is a game-changer. It catches vulnerabilities that our previous tools missed, and the integration with our CI/CD pipeline was seamless."
  },
  {
    name: "Sarah Johnson",
    role: "VP of Engineering at DataFlow",
    initials: "SJ",
    quote: "Not only has SecureSync AI improved our security posture, but it's also helped educate our developers about best practices through its actionable recommendations."
  }
];