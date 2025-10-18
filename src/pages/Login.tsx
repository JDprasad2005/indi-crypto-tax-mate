import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogIn, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, LoginData } from '@/services/authService';
import { mockLoginUser } from '@/services/mockAuthService';
import { testBackendConnection, testAuthEndpoints } from '@/utils/backendTester';


export const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTestBackend = async () => {
    console.log('🧪 Testing backend connection...');
    const results = await testBackendConnection();
    
    // Test auth endpoints on the first successful backend
    const successfulBackend = results.find(r => r.status === 'success');
    if (successfulBackend) {
      await testAuthEndpoints(successfulBackend.url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
   
    try {
      let response;
      
      try {
        // Try real backend first
        response = await loginUser(formData);
      } catch (backendError) {
        console.log('🔄 Backend failed, trying mock service...');
        // Fallback to mock service
        response = await mockLoginUser(formData);
      }
      
      if (response.success && response.user) {
        login(response.user);
        navigate('/');  // Redirect to the home page
      
      
      } else {
        setError(response.msg || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="glass-card border-border/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            </div>
            <CardDescription>
              Sign in to your Crypto Tax Mate account to access your tax calculations
            </CardDescription>
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
              <strong>Test Login:</strong> Use any email and password "password" to test the app
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full shadow-glow-cyan transition-smooth"
                disabled={isLoading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
              
              {/* Debug button - remove this after fixing */}
              <Button 
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={handleTestBackend}
              >
                🧪 Test Backend Connection
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

