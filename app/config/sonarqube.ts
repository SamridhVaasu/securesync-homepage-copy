export const SONARQUBE_CONFIG = {
  API_URL: "http://20.24.56.74:9000",
  PROJECT_KEY: "securesync_github",
  CREDENTIALS: {
    username: "admin",
    password: "secure%Sync34"
  }
};

export const getSonarQubeHeaders = () => ({
  'Authorization': 'Basic ' + btoa(`${SONARQUBE_CONFIG.CREDENTIALS.username}:${SONARQUBE_CONFIG.CREDENTIALS.password}`),
  'Content-Type': 'application/json',
}); 