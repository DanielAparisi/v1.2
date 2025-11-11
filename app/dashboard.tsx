import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../contexts/UserContext';
import { UserRole, ROLE_DISPLAY_NAMES, ROLE_ICONS } from '../types/user';
import PermissionWrapper, { PlayerOnly, RefereeOnly, AdminOnly, StaffOnly } from '../components/PermissionWrapper';
import RoleSelector from '../components/RoleSelector';
import AuthGuard from '../components/AuthGuard';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, hasPermission, setUser, signOut } = useUser();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>
          Por favor inicia sesión para continuar
        </Text>
      </View>
    );
  }

  const handleRoleChange = (role: UserRole) => {
    // In a real app, you would update this in your database
    setUser({ ...user, role });
    setShowRoleSelector(false);
  };

  if (showRoleSelector) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 60 }}>
        <RoleSelector
          selectedRole={user.role}
          onRoleSelect={handleRoleChange}
        />
        <Pressable
          onPress={() => setShowRoleSelector(false)}
          style={{
            margin: 20,
            padding: 16,
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#6B7280', fontWeight: '500' }}>Cancelar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <AuthGuard requireAuth>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* User Info Header */}
      <View style={{ 
        backgroundColor: '#F3F4F6', 
        padding: 20, 
        paddingTop: 60,
        alignItems: 'center' 
      }}>
        <Text style={{ fontSize: 32, marginBottom: 8 }}>
          {ROLE_ICONS[user.role]}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>
          {user.name}
        </Text>
        <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 16 }}>
          {ROLE_DISPLAY_NAMES[user.role]}
        </Text>
        
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
          <Pressable
            onPress={() => setShowRoleSelector(true)}
            style={{
              backgroundColor: '#3B82F6',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
              Cambiar Rol
            </Text>
          </Pressable>
          
          <Pressable
            onPress={() => {
              signOut().then(() => {
                router.replace('/');
              });
            }}
            style={{
              backgroundColor: '#EF4444',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
              Cerrar Sesión
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        {/* General Content - Everyone can see */}
        <View style={{ 
          backgroundColor: '#F9FAFB', 
          padding: 16, 
          borderRadius: 12, 
          marginBottom: 20 
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
            📊 Contenido General
          </Text>
          <Text style={{ color: '#6B7280' }}>
            Este contenido es visible para todos los usuarios autenticados
          </Text>
        </View>

        {/* Player-only content */}
        <PlayerOnly>
          <View style={{ 
            backgroundColor: '#EBF4FF', 
            padding: 16, 
            borderRadius: 12, 
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#3B82F6'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#1E40AF' }}>
              👤 Panel del Jugador
            </Text>
            <Text style={{ color: '#1E40AF' }}>
              • Ver mis estadísticas
            </Text>
            <Text style={{ color: '#1E40AF' }}>
              • Próximos partidos
            </Text>
            <Text style={{ color: '#1E40AF' }}>
              • Mi equipo
            </Text>
          </View>
        </PlayerOnly>

        {/* Referee-only content */}
        <RefereeOnly>
          <View style={{ 
            backgroundColor: '#ECFDF5', 
            padding: 16, 
            borderRadius: 12, 
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#10B981'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#047857' }}>
              ⚽ Panel del Árbitro
            </Text>
            <Text style={{ color: '#047857' }}>
              • Partidos asignados
            </Text>
            <Text style={{ color: '#047857' }}>
              • Completar actas
            </Text>
            <Text style={{ color: '#047857' }}>
              • Reportar incidencias
            </Text>
          </View>
        </RefereeOnly>

        {/* Staff-only content (Referee + Admin + Delegate) */}
        <StaffOnly>
          <View style={{ 
            backgroundColor: '#FEF3C7', 
            padding: 16, 
            borderRadius: 12, 
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#F59E0B'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#92400E' }}>
              🏟️ Panel de Staff
            </Text>
            <Text style={{ color: '#92400E' }}>
              • Gestión de partidos
            </Text>
            <Text style={{ color: '#92400E' }}>
              • Administración de equipos
            </Text>
          </View>
        </StaffOnly>

        {/* Admin-only content */}
        <AdminOnly>
          <View style={{ 
            backgroundColor: '#F3E8FF', 
            padding: 16, 
            borderRadius: 12, 
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#7C3AED'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#5B21B6' }}>
              👑 Panel de Administrador
            </Text>
            <Text style={{ color: '#5B21B6' }}>
              • Gestión de usuarios
            </Text>
            <Text style={{ color: '#5B21B6' }}>
              • Configuración del sistema
            </Text>
            <Text style={{ color: '#5B21B6' }}>
              • Análisis completo
            </Text>
          </View>
        </AdminOnly>

        {/* Permission-based content */}
        <PermissionWrapper permission="canManageTeams" showFallback>
          <View style={{ 
            backgroundColor: '#FDF2F8', 
            padding: 16, 
            borderRadius: 12, 
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#EC4899'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#BE185D' }}>
              🔧 Gestión de Equipos
            </Text>
            <Text style={{ color: '#BE185D' }}>
              Solo usuarios con permiso "canManageTeams" pueden ver esto
            </Text>
          </View>
        </PermissionWrapper>

        {/* Permissions Summary */}
        <View style={{ 
          backgroundColor: '#F9FAFB', 
          padding: 16, 
          borderRadius: 12, 
          marginBottom: 20 
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
            🔐 Tus Permisos
          </Text>
          {[
            'canViewMatches',
            'canEditMatches',
            'canManageTeams',
            'canManagePlayers',
            'canViewStats',
            'canReportIncidents',
            'canManageLeagues'
          ].map((permission) => (
            <View key={permission} style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingVertical: 4
            }}>
              <Text style={{ color: '#374151', fontSize: 14 }}>
                {permission}
              </Text>
              <Text style={{ 
                color: hasPermission(permission as any) ? '#059669' : '#DC2626',
                fontWeight: '500'
              }}>
                {hasPermission(permission as any) ? '✅' : '❌'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </AuthGuard>
  );
}