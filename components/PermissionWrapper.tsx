import React from 'react';
import { View, Text } from 'react-native';
import { useUser, usePermission } from '../contexts/UserContext';
import { UserRole, RolePermissions } from '../types/user';

interface PermissionWrapperProps {
  children: React.ReactNode;
  permission?: keyof RolePermissions;
  role?: UserRole;
  roles?: UserRole[];
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export default function PermissionWrapper({
  children,
  permission,
  role,
  roles,
  fallback,
  showFallback = false
}: PermissionWrapperProps) {
  const { user, isRole } = useUser();
  const hasPermission = usePermission(permission!);

  // Check if user is authenticated
  if (!user) {
    return showFallback ? (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: '#6B7280', textAlign: 'center' }}>
          Debes iniciar sesión para ver este contenido
        </Text>
      </View>
    ) : null;
  }

  // Check specific permission
  if (permission && !hasPermission) {
    return showFallback ? (
      fallback || (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#EF4444', textAlign: 'center', fontSize: 16 }}>
            🚫 No tienes permisos para ver este contenido
          </Text>
          <Text style={{ color: '#6B7280', textAlign: 'center', marginTop: 8 }}>
            Contacta al administrador si crees que es un error
          </Text>
        </View>
      )
    ) : null;
  }

  // Check specific role
  if (role && !isRole(role)) {
    return showFallback ? (
      fallback || (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#EF4444', textAlign: 'center', fontSize: 16 }}>
            🚫 Contenido exclusivo para {role}s
          </Text>
        </View>
      )
    ) : null;
  }

  // Check multiple roles
  if (roles && !roles.includes(user.role)) {
    return showFallback ? (
      fallback || (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#EF4444', textAlign: 'center', fontSize: 16 }}>
            🚫 Contenido no disponible para tu rol
          </Text>
        </View>
      )
    ) : null;
  }

  return <>{children}</>;
}

// Specific permission components for common use cases
export function PlayerOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionWrapper role="jugador" fallback={fallback} showFallback={!!fallback}>
      {children}
    </PermissionWrapper>
  );
}

export function RefereeOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionWrapper role="arbitro" fallback={fallback} showFallback={!!fallback}>
      {children}
    </PermissionWrapper>
  );
}

export function AdminOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionWrapper role="admin" fallback={fallback} showFallback={!!fallback}>
      {children}
    </PermissionWrapper>
  );
}

export function StaffOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <PermissionWrapper roles={['arbitro', 'delegado', 'admin']} fallback={fallback} showFallback={!!fallback}>
      {children}
    </PermissionWrapper>
  );
}