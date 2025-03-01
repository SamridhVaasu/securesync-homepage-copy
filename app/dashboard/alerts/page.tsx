'use client';

import { useState } from 'react';
import {
  Bell,
  Shield,
  AlertTriangle,
  Info,
  Check,
  X,
  Clock,
  Filter,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDateTime } from '@/lib/utils';

type AlertType = 'critical' | 'warning' | 'info' | 'success';
type AlertStatus = 'unread' | 'read' | 'archived';

interface SecurityAlert {
  id: number;
  title: string;
  description: string;
  type: AlertType;
  status: AlertStatus;
  timestamp: string;
  source: string;
  actionRequired: boolean;
}

const alerts: SecurityAlert[] = [
  {
    id: 1,
    title: 'Critical Security Update Required',
    description: 'System detected outdated security certificates that require immediate attention.',
    type: 'critical',
    status: 'unread',
    timestamp: '2024-02-28T10:30:00',
    source: 'Security Scanner',
    actionRequired: true,
  },
  {
    id: 2,
    title: 'Unusual Login Activity Detected',
    description: 'Multiple failed login attempts from IP address 192.168.1.100',
    type: 'warning',
    status: 'unread',
    timestamp: '2024-02-28T09:45:00',
    source: 'Authentication System',
    actionRequired: true,
  },
  {
    id: 3,
    title: 'Backup Completed Successfully',
    description: 'Automated system backup completed with no errors',
    type: 'success',
    status: 'read',
    timestamp: '2024-02-28T08:00:00',
    source: 'Backup Service',
    actionRequired: false,
  },
  {
    id: 4,
    title: 'New Security Policy Update',
    description: 'Security policies have been updated. Please review the changes.',
    type: 'info',
    status: 'unread',
    timestamp: '2024-02-28T07:30:00',
    source: 'Policy Manager',
    actionRequired: true,
  },
];

const alertTypeIcons: Record<AlertType, any> = {
  critical: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  success: Check,
};

const alertTypeColors: Record<AlertType, string> = {
  critical: 'text-destructive',
  warning: 'text-orange-500',
  info: 'text-blue-500',
  success: 'text-green-500',
};

const alertStatusBadges: Record<AlertStatus, { variant: 'destructive' | 'secondary' | 'default'; label: string }> = {
  unread: { variant: 'destructive' as const, label: 'Unread' },
  read: { variant: 'secondary' as const, label: 'Read' },
  archived: { variant: 'default' as const, label: 'Archived' },
};

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const alertCounts = {
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    info: alerts.filter(a => a.type === 'info').length,
    success: alerts.filter(a => a.type === 'success').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and manage security alerts and notifications
          </p>
        </div>
        <Button className="gap-2">
          <Bell className="h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {/* Alert Type Summary */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{alertCounts.critical}</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{alertCounts.warning}</div>
            <p className="text-xs text-muted-foreground">Need attention soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Information</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{alertCounts.info}</div>
            <p className="text-xs text-muted-foreground">For your information</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{alertCounts.success}</div>
            <p className="text-xs text-muted-foreground">Completed successfully</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Information</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts List */}
      <Card>
        <CardContent className="p-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const IconComponent = alertTypeIcons[alert.type];
                return (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className={`mt-1 ${alertTypeColors[alert.type]}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{alert.title}</h3>
                        <Badge variant={alertStatusBadges[alert.status].variant}>
                          {alertStatusBadges[alert.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDateTime(alert.timestamp)}
                        </span>
                        <span>Source: {alert.source}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 