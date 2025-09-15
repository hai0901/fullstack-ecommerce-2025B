import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector } from "~/hooks/redux-hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const user = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user.isAuthenticated) {
      navigate(redirectTo, { 
        replace: true, 
        state: { from: location.pathname } 
      });
      return;
    }

    // If no specific role is required, just check authentication
    if (!requiredRole) {
      return;
    }

    // Check if user has the required role
    const userRole = user.role?.toLowerCase();
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const normalizedRoles = roles.map(role => role.toLowerCase());

    if (!userRole || !normalizedRoles.includes(userRole)) {
      // User doesn't have the required role, redirect to appropriate page
      if (userRole === 'customer') {
        navigate('/shop', { replace: true });
      } else if (userRole === 'vendor') {
        navigate('/my-products', { replace: true });
      } else if (userRole === 'shipper') {
        navigate('/delivery', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
      return;
    }
  }, [user.isAuthenticated, user.role, requiredRole, navigate, location.pathname, redirectTo]);

  // Show loading while checking authentication
  if (!user.isAuthenticated) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If role is required, check if user has it
  if (requiredRole) {
    const userRole = user.role?.toLowerCase();
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const normalizedRoles = roles.map(role => role.toLowerCase());

    if (!userRole || !normalizedRoles.includes(userRole)) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-muted-foreground">Redirecting...</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
