'use client';

import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  XCircle,
  Shield,
  Search,
  Filter,
  ArrowUpDown,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VulnerabilityDialog } from '@/components/vulnerability-dialog';
import { formatDate } from '@/lib/utils';

// Direct API call implementation
const SONARQUBE_CONFIG = {
  API_URL: "http://20.24.56.74:9000",
  PROJECT_KEY: "securesync_github",
  CREDENTIALS: {
    username: "admin",
    password: "secure%Sync34"
  }
};

const getSonarQubeHeaders = () => ({
  'Authorization': 'Basic ' + btoa(`${SONARQUBE_CONFIG.CREDENTIALS.username}:${SONARQUBE_CONFIG.CREDENTIALS.password}`),
  'Content-Type': 'application/json',
});

type Severity = 'LOW' | 'MEDIUM' | 'HIGH';
type Status = 'TO_REVIEW' | 'IN_REVIEW' | 'REVIEWED';

interface TextRange {
  startLine: number;
  endLine: number;
  startOffset: number;
  endOffset: number;
}

interface Component {
  key: string;
  qualifier: string;
  name: string;
  longName: string;
  path: string;
}

interface Vulnerability {
  key: string;
  component: string;
  project: string;
  securityCategory: string;
  vulnerabilityProbability: Severity;
  status: Status;
  line: number;
  message: string;
  author: string;
  creationDate: string;
  updateDate: string;
  textRange: TextRange;
  ruleKey: string;
}

interface SonarQubeResponse {
  paging: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  hotspots: Vulnerability[];
  components: Component[];
}

const severityColors: Record<Severity, string> = {
  HIGH: 'text-destructive',
  MEDIUM: 'text-yellow-500',
  LOW: 'text-green-500',
};

const statusBadges: Record<Status, { variant: 'destructive' | 'secondary' | 'default'; label: string }> = {
  TO_REVIEW: { variant: 'destructive' as const, label: 'To Review' },
  IN_REVIEW: { variant: 'secondary' as const, label: 'In Review' },
  REVIEWED: { variant: 'default' as const, label: 'Reviewed' },
};

export default function VulnerabilitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vulnerabilityData, setVulnerabilityData] = useState<SonarQubeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchVulnerabilities = async (retry = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/sonarqube', {
        // Add cache control headers
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch security hotspots');
      }

      const data = await response.json();
      setVulnerabilityData(data);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error fetching vulnerabilities:', error);
      
      // Implement retry logic
      if (retry && retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchVulnerabilities(true), 1000 * (retryCount + 1)); // Exponential backoff
        return;
      }

      setError(
        error instanceof Error 
          ? error.message 
          : 'Failed to load security hotspots. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVulnerabilities(true); // Enable retry on initial load
  }, []);

  const handleRetry = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRetryCount(0);
    void fetchVulnerabilities(true);
  };

  const getComponentName = (componentKey: string) => {
    return vulnerabilityData?.components.find(c => c.key === componentKey)?.path || componentKey;
  };

  const handleViewDetails = (vulnerability: Vulnerability) => {
    setSelectedVulnerability(vulnerability);
    setDialogOpen(true);
  };

  const filteredVulnerabilities = vulnerabilityData?.hotspots.filter((vuln) => {
    const matchesSearch = vuln.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getComponentName(vuln.component).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || vuln.vulnerabilityProbability === severityFilter;
    const matchesStatus = statusFilter === 'all' || vuln.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  }) || [];

  const severityCounts = {
    HIGH: filteredVulnerabilities.filter(v => v.vulnerabilityProbability === 'HIGH').length,
    MEDIUM: filteredVulnerabilities.filter(v => v.vulnerabilityProbability === 'MEDIUM').length,
    LOW: filteredVulnerabilities.filter(v => v.vulnerabilityProbability === 'LOW').length,
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center gap-4">
        <XCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-lg font-semibold text-destructive">Error Loading Data</h2>
        <p className="text-muted-foreground text-center">{error}</p>
        <div className="flex gap-4">
          <Button 
            onClick={() => {
              setRetryCount(0);
              void fetchVulnerabilities(true);
            }} 
            variant="default"
          >
            Try Again
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload Page
          </Button>
        </div>
        {retryCount > 0 && (
          <p className="text-sm text-muted-foreground">
            Retrying... Attempt {retryCount} of 3
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security Hotspots</h1>
          <p className="text-muted-foreground">
            Monitor and manage security vulnerabilities detected by SonarQube
          </p>
        </div>
        <Button 
          className="gap-2" 
          onClick={fetchVulnerabilities}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Shield className="h-4 w-4" />
          )}
          {isLoading ? 'Refreshing...' : 'Refresh Scan'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{severityCounts.HIGH}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{severityCounts.MEDIUM}</div>
            <p className="text-xs text-muted-foreground">Should be addressed soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{severityCounts.LOW}</div>
            <p className="text-xs text-muted-foreground">Monitor for changes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search security hotspots..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="TO_REVIEW">To Review</SelectItem>
              <SelectItem value="IN_REVIEW">In Review</SelectItem>
              <SelectItem value="REVIEWED">Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vulnerabilities Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" className="gap-2 hover:bg-transparent">
                    Issue
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVulnerabilities.map((vuln) => (
                <TableRow key={vuln.key}>
                  <TableCell className="font-medium">{vuln.message}</TableCell>
                  <TableCell>
                    <span className={severityColors[vuln.vulnerabilityProbability]}>
                      {vuln.vulnerabilityProbability}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadges[vuln.status].variant}>
                      {statusBadges[vuln.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{getComponentName(vuln.component)}</TableCell>
                  <TableCell>{vuln.line}</TableCell>
                  <TableCell>{vuln.securityCategory}</TableCell>
                  <TableCell className="text-sm">{vuln.author}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(vuln)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vulnerability Details Dialog */}
      <VulnerabilityDialog 
        vulnerability={selectedVulnerability} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  );
}