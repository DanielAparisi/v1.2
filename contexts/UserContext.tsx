import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ROLE_PERMISSIONS, RolePermissions } from '../types/user';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface UserContextType {
  user: User | null;
  loading: boolean;
  hasPermission: (permission: keyof RolePermissions) => boolean;
  isRole: (role: UserRole) => boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Here you would fetch user data from your database
        // For now, we'll create a mock user
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'Usuario',
          role: 'jugador', // Default role, should be fetched from database
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role][permission];
  };

  const isRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      hasPermission,
      isRole,
      setUser,
      signOut
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Helper hook for checking permissions
export function usePermission(permission: keyof RolePermissions) {
  const { hasPermission } = useUser();
  return hasPermission(permission);
}

// Helper hook for checking role
export function useRole(role: UserRole) {
  const { isRole } = useUser();
  return isRole(role);
}