import { NextResponse } from 'next/server';

const SONARQUBE_CONFIG = {
  API_URL: "http://20.24.56.74:9000",
  PROJECT_KEY: "securesync_github",
  CREDENTIALS: {
    username: "admin",
    password: "secure%Sync34"
  }
};

export async function GET() {
  try {
    const response = await fetch(
      `${SONARQUBE_CONFIG.API_URL}/api/hotspots/search?projectKey=${SONARQUBE_CONFIG.PROJECT_KEY}`,
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${SONARQUBE_CONFIG.CREDENTIALS.username}:${SONARQUBE_CONFIG.CREDENTIALS.password}`).toString('base64'),
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch security hotspots');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('SonarQube API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch security hotspots' },
      { status: 500 }
    );
  }
} 