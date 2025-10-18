// Mock authentication service for testing when backend is not available
import { AuthResponse, LoginData, SignupData, User } from './authService';

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    name: 'Test User'
  }
];

// Mock login function
export const mockLoginUser = async (data: LoginData): Promise<AuthResponse> => {
  console.log('🎭 Using mock authentication service');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find user by email
  const user = mockUsers.find(u => u.email === data.email);
  
  if (user && data.password === 'password') {
    return {
      success: true,
      msg: 'Login successful',
      user: user
    };
  }
  
  return {
    success: false,
    msg: 'Invalid email or password'
  };
};

// Mock signup function
export const mockSignupUser = async (data: SignupData): Promise<AuthResponse> => {
  console.log('🎭 Using mock authentication service');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === data.email);
  
  if (existingUser) {
    return {
      success: false,
      msg: 'User already exists with this email'
    };
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    username: data.username,
    email: data.email,
    name: data.username
  };
  
  mockUsers.push(newUser);
  
  return {
    success: true,
    msg: 'User registered successfully'
  };
};
