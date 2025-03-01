import { SONARQUBE_CONFIG, getSonarQubeHeaders } from '../config/sonarqube';

export interface SonarQubeService {
  fetchSecurityHotspots: () => Promise<any>;
}

class SonarQubeServiceImpl implements SonarQubeService {
  async fetchSecurityHotspots() {
    try {
      const response = await fetch(
        `${SONARQUBE_CONFIG.API_URL}/api/hotspots/search?projectKey=${SONARQUBE_CONFIG.PROJECT_KEY}`,
        {
          headers: getSonarQubeHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch security hotspots');
      }

      return await response.json();
    } catch (error) {
      console.error('SonarQube API Error:', error);
      throw error;
    }
  }
}

export const sonarQubeService = new SonarQubeServiceImpl(); 