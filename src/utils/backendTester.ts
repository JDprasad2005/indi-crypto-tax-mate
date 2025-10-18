// Backend connection tester utility
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const testBackendConnection = async () => {
  const commonPorts = [3000, 4000, 5000, 8000, 8080];
  const results = [];

  console.log('🔍 Testing backend connection...');
  console.log('Current API_URL:', API_URL);

  for (const port of commonPorts) {
    const testUrl = `http://localhost:${port}`;
    try {
      console.log(`Testing ${testUrl}...`);
      const response = await fetch(testUrl, {
        method: 'GET',
        mode: 'cors',
      });
      
      if (response.ok) {
        console.log(`✅ Backend found at ${testUrl}`);
        results.push({ port, status: 'success', url: testUrl });
      } else {
        console.log(`⚠️  Backend responds at ${testUrl} but with status ${response.status}`);
        results.push({ port, status: 'responds', url: testUrl, statusCode: response.status });
      }
    } catch (error) {
      console.log(`❌ No backend at ${testUrl}`);
      results.push({ port, status: 'failed', url: testUrl, error: error.message });
    }
  }

  console.log('📊 Test Results:', results);
  return results;
};

// Test specific endpoints
export const testAuthEndpoints = async (baseUrl: string) => {
  const endpoints = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/verify',
    '/api/auth/logout'
  ];

  console.log(`🔍 Testing auth endpoints at ${baseUrl}...`);
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        mode: 'cors',
      });
      
      console.log(`${endpoint}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`${endpoint}: ❌ ${error.message}`);
    }
  }
};
