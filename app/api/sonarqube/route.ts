import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const SONARQUBE_URL = process.env.SONARQUBE_URL;
    const SONARQUBE_USERNAME = process.env.SONARQUBE_USERNAME;
    const SONARQUBE_PASSWORD = process.env.SONARQUBE_PASSWORD;
    const PROJECT_KEY = "securesync_github"; // This could be moved to .env as well
    
    if (!SONARQUBE_URL || !SONARQUBE_USERNAME || !SONARQUBE_PASSWORD) {
      return NextResponse.json(
        { error: 'SonarQube configuration missing' },
        { status: 500 }
      );
    }
    
    // Encode credentials for basic auth
    const encodedAuth = Buffer.from(`${SONARQUBE_USERNAME}:${SONARQUBE_PASSWORD}`).toString('base64');
    
    // Fetch security hotspots from SonarQube
    const response = await fetch(
      `${SONARQUBE_URL}/api/hotspots/search?projectKey=${PROJECT_KEY}&ps=100`,
      {
        headers: {
          'Authorization': `Basic ${encodedAuth}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Disable cache to get fresh data
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('SonarQube API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch data from SonarQube' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Transform data if needed
    const processedData = {
      paging: data.paging,
      hotspots: data.hotspots.map((hotspot: any) => ({
        ...hotspot,
        // Sample transformation - adapt based on SonarQube's actual response format
        vulnerabilityProbability: determineVulnerabilityLevel(hotspot.vulnerabilityProbability || ''),
        status: hotspot.status || 'TO_REVIEW',
        securityCategory: hotspot.securityCategory || 'unknown',
      })),
      components: data.components || [],
    };
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error in SonarQube API route:', error);
    return NextResponse.json(
      { error: 'Failed to process SonarQube data' },
      { status: 500 }
    );
  }
}

// Helper function to normalize vulnerability levels
function determineVulnerabilityLevel(level: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  level = level.toUpperCase();
  
  if (level.includes('HIGH')) return 'HIGH';
  if (level.includes('MEDIUM')) return 'MEDIUM';
  return 'LOW';
}