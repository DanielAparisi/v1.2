import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { UserRole, ROLE_DISPLAY_NAMES, ROLE_ICONS } from '../types/user';

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
  disabled?: boolean;
}

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  jugador: 'Participa en los partidos, ve estadísticas y recibe notificaciones',
  arbitro: 'Dirige partidos, completa actas y reporta incidencias',
  delegado: 'Administra equipos, gestiona jugadores y supervisa partidos',
  espectador: 'Disfruta de los partidos, ve clasificaciones y estadísticas',
  admin: 'Control total del sistema, gestiona ligas y usuarios',
};

const ROLE_COLORS: Record<UserRole, string> = {
  jugador: '#3B82F6', // Blue
  arbitro: '#10B981', // Green
  delegado: '#F59E0B', // Orange
  espectador: '#6B7280', // Gray
  admin: '#7C3AED', // Purple
};

export default function RoleSelector({ selectedRole, onRoleSelect, disabled = false }: RoleSelectorProps) {
  const roles: UserRole[] = ['jugador', 'arbitro', 'delegado', 'espectador'];

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 8,
        color: '#1F2937'
      }}>
        Selecciona tu Rol
      </Text>
      
      <Text style={{ 
        fontSize: 16, 
        color: '#6B7280', 
        textAlign: 'center', 
        marginBottom: 32,
        paddingHorizontal: 20
      }}>
        Elige el rol que mejor describa tu participación en la liga
      </Text>

      <ScrollView 
        style={{ flex: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 16 }}>
          {roles.map((role) => (
            <Pressable
              key={role}
              onPress={() => !disabled && onRoleSelect(role)}
              disabled={disabled}
              style={{
                backgroundColor: selectedRole === role ? ROLE_COLORS[role] : '#F9FAFB',
                borderWidth: 2,
                borderColor: selectedRole === role ? ROLE_COLORS[role] : '#E5E7EB',
                borderRadius: 16,
                padding: 20,
                opacity: disabled ? 0.6 : 1,
              }}
            >
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 8 
              }}>
                <Text style={{ fontSize: 32, marginRight: 12 }}>
                  {ROLE_ICONS[role]}
                </Text>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: selectedRole === role ? 'white' : '#1F2937',
                  flex: 1
                }}>
                  {ROLE_DISPLAY_NAMES[role]}
                </Text>
                {selectedRole === role && (
                  <Text style={{ fontSize: 24, color: 'white' }}>✓</Text>
                )}
              </View>
              
              <Text style={{
                fontSize: 14,
                color: selectedRole === role ? 'rgba(255,255,255,0.9)' : '#6B7280',
                lineHeight: 20
              }}>
                {ROLE_DESCRIPTIONS[role]}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}