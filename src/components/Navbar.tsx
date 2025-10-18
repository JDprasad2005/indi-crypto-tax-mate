import { Button } from '@/components/ui/button';
import { User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Profile/Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                <User className="h-4 w-4 text-primary" />
              </div>
              {isAuthenticated && user ? (
                <span className="text-lg font-semibold text-foreground">
                  {user.name}
                </span>
              ) : (
                <span className="text-lg font-semibold text-foreground">
                  Crypto Tax Mate
                </span>
              )}
            </Link>
          </div>

          {/* Right side - Login/Signup or User Menu */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  asChild
                >
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button 
                  size="sm"
                  className="shadow-glow-cyan transition-smooth"
                  asChild
                >
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
