import { useUser } from '../contexts/UserContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  requireAuth = false 
}: AuthGuardProps) {
  const { user, loading } = useUser();

  // Show loading while checking auth state
  if (loading) {
    return null; // or a loading spinner
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !user) {
    return null; // Don't render children, let parent handle redirect
  }

  // If auth is NOT required but user is authenticated
  if (!requireAuth && user) {
    return null; // Don't render children, let parent handle redirect
  }

  return <>{children}</>;
}