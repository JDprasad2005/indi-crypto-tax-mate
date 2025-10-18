// Types for API responses
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  msg: string;
  user?: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Debug: Log the API URL being used
console.log('🔗 API_URL being used:', API_URL);
console.log('🌐 Environment variables:', import.meta.env);

// Helper function to handle API responses
const handleApiResponse = async (response: Response): Promise<AuthResponse> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ msg: 'Network error occurred' }));
    throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Auth Service Functions
export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error instanceof Error ? error.message : 'Signup failed');
  }
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    console.log('🔐 Attempting login to:', `${API_URL}/api/auth/login`);
    console.log('📝 Login data:', data);
    
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    console.log('📊 Response status:', response.status);
    console.log('✅ Response ok:', response.ok);
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('❌ Login error details:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      // Try alternative ports
      console.log('🔄 Trying alternative ports...');
      const alternativePorts = [3000, 4000, 5000, 8000, 8080];
      
      for (const port of alternativePorts) {
        try {
          console.log(`🔍 Trying port ${port}...`);
          const testResponse = await fetch(`http://localhost:${port}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          
          if (testResponse.ok) {
            console.log(`✅ Found backend on port ${port}!`);
            return await handleApiResponse(testResponse);
          }
        } catch (portError) {
          console.log(`❌ Port ${port} failed:`, portError.message);
        }
      }
      
      throw new Error(`Cannot connect to backend server on any port (${alternativePorts.join(', ')}). Please check if your backend is running.`);
    }
    
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
};

// Simple logout function (no JWT needed)
export const logoutUser = async (): Promise<void> => {
  // Just clear local storage - no backend call needed
  localStorage.removeItem('cryptoUser');
};
