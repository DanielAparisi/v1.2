import { useEffect } from 'react';
import { router } from 'expo-router';
import { useUser } from '../contexts/UserContext';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  redirectTo = '/dashboard', 
  requireAuth = false 
}: AuthGuardProps) {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User is not authenticated but auth is required
        router.replace('/');
      } else if (!requireAuth && user) {
        // User is authenticated but on a public page
        router.replace(redirectTo);
      }
    }
  }, [user, loading, requireAuth, redirectTo]);

  // Show loading while checking auth state
  if (loading) {
    return null; // or a loading spinner
  }

  // If user should be redirected, don't render children
  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
}