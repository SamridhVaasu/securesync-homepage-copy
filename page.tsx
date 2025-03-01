'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileText,
  Users,
  Lock,
  HardDrive,
  Cloud,
  Key,
  ShieldCheck,
  FileWarning,
  UserCheck
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const securityData = [
  { name: 'Mon', score: 88 },
  { name: 'Tue', score: 90 },
  { name: 'Wed', score: 89 },
  { name: 'Thu', score: 92 },
  { name: 'Fri', score: 91 },
  { name: 'Sat', score: 93 },
  { name: 'Sun', score: 92 },
];

const stats = [
  {
    title: 'Security Score',
    value: '92',
    change: '+2.5%',
    trend: 'up',
    icon: Shield,
    description: 'Overall security rating',
  },
  {
    title: 'Active Threats',
    value: '3',
    change: '-1',
    trend: 'down',
    icon: AlertTriangle,
    description: 'Detected security issues',
  },
  {
    title: 'Files Synced',
    value: '2.4K',
    change: '+12%',
    trend: 'up',
    icon: FileText,
    description: 'Documents in sync',
  },
  {
    title: 'Team Members',
    value: '18',
    change: '+2',
    trend: 'up',
    icon: Users,
    description: 'Active users',
  },
];

const securityMetrics = [
  {
    title: 'Encryption Status',
    value: 98,
    icon: Lock,
    status: 'Excellent',
    color: 'bg-success',
  },
  {
    title: 'Data Backup',
    value: 85,
    icon: Cloud,
    status: 'Good',
    color: 'bg-info',
  },
  {
    title: 'Access Control',
    value: 92,
    icon: Key,
    status: 'Very Good',
    color: 'bg-primary',
  },
];

const recentAlerts = [
  {
    id: 1,
    title: 'Suspicious Login Attempt',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    severity: 'high',
    time: '10 minutes ago',
    action: 'Block IP',
    status: 'Urgent',
  },
  {
    id: 2,
    title: 'File Permission Change',
    description: 'Critical file permissions modified in production environment',
    severity: 'medium',
    time: '1 hour ago',
    action: 'Review Changes',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'New Vulnerability Detected',
    description: 'CVE-2024-1234 affects 3 dependencies in your project',
    severity: 'high',
    time: '2 hours ago',
    action: 'Update Dependencies',
    status: 'Urgent',
  },
];

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-background/80">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Security Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Real-time security monitoring and sync status
          </p>
        </div>
        <div className="flex gap-2 bg-card/30 p-1 rounded-lg backdrop-blur-sm">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'ghost'}
              onClick={() => setSelectedTimeRange(range)}
              className="w-16 transition-all"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 backdrop-blur-xl bg-card/50 hover:bg-card/60 transition-all border-primary/10">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Security Score Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6 backdrop-blur-xl bg-card/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Security Score Trend</h2>
              <p className="text-sm text-muted-foreground">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Score</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={securityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={{ 
                    stroke: 'hsl(var(--primary))',
                    strokeWidth: 2,
                    fill: 'hsl(var(--background))' 
                  }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-card/50">
          <h2 className="text-xl font-semibold mb-6">Security Metrics</h2>
          <div className="space-y-6">
            {securityMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.title} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{metric.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{metric.status}</span>
                  </div>
                  <div className="relative">
                    <Progress value={metric.value} className={`h-2 ${metric.color}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="p-6 backdrop-blur-xl bg-card/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Security Alerts</h2>
            <p className="text-sm text-muted-foreground mt-1">Recent security events and notifications</p>
          </div>
          <Button variant="outline">View All Alerts</Button>
        </div>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-background/50 border border-border hover:bg-accent/5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'high' ? 'bg-error/10' : 'bg-warning/10'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.severity === 'high' ? 'text-error' : 'text-warning'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.status === 'Urgent' ? 'bg-error/10 text-error' :
                        alert.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                        'bg-info/10 text-info'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}