import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../contexts/UserContext';
import AuthGuard from '../components/AuthGuard';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const { user, signOut, hasPermission, isRole } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthGuard requireAuth={true}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        
        <ScrollView className="flex-1 px-6">
          {/* Header */}
          <View className="py-8 border-b border-gray-200">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              ¡Bienvenido a Liga A+7!
            </Text>
            <Text className="text-gray-600 text-lg">
              Hola { user?.email?.split('@')[0]}
            </Text>
          </View>

          {/* User Info Section */}
          <View className="py-6">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Tu Información
            </Text>
            
            <View className="bg-gray-50 rounded-xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-medium text-gray-600">Email:</Text>
                <Text className="text-sm text-gray-900">{user?.email}</Text>
              </View>
              
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-medium text-gray-600">Rol:</Text>
                <Text className="text-sm text-gray-900 capitalize">{user?.role}</Text>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-medium text-gray-600">ID:</Text>
                <Text className="text-xs text-gray-500">{user?.id?.substring(0, 8)}...</Text>
              </View>
            </View>
          </View>

          {/* Permissions Section */}
          <View className="py-6">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Permisos y Accesos
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Text className="text-sm text-gray-700">Ver partidos</Text>
                <View className={`w-4 h-4 rounded-full ${hasPermission('canViewMatches') ? 'bg-green-500' : 'bg-red-500'}`} />
              </View>
              
              <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Text className="text-sm text-gray-700">Editar partidos</Text>
                <View className={`w-4 h-4 rounded-full ${hasPermission('canEditMatches') ? 'bg-green-500' : 'bg-red-500'}`} />
              </View>
              
              <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Text className="text-sm text-gray-700">Gestionar equipos</Text>
                <View className={`w-4 h-4 rounded-full ${hasPermission('canManageTeams') ? 'bg-green-500' : 'bg-red-500'}`} />
              </View>
              
              <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Text className="text-sm text-gray-700">Ver estadísticas</Text>
                <View className={`w-4 h-4 rounded-full ${hasPermission('canViewStats') ? 'bg-green-500' : 'bg-red-500'}`} />
              </View>
              
              <View className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Text className="text-sm text-gray-700">Gestionar ligas</Text>
                <View className={`w-4 h-4 rounded-full ${hasPermission('canManageLeagues') ? 'bg-green-500' : 'bg-red-500'}`} />
              </View>
            </View>
          </View>

          {/* Role-specific Content */}
          <View className="py-6">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Panel de {user?.role === 'admin' ? 'Administrador' : 
                       user?.role === 'delegado' ? 'Delegado' : 
                       user?.role === 'arbitro' ? 'Árbitro' :
                       user?.role === 'espectador' ? 'Espectador' : 'Jugador'}
            </Text>
            
            {isRole('admin') && (
              <View className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <Text className="text-red-800 font-medium mb-2">Panel de Administrador</Text>
                <Text className="text-red-700 text-sm">
                  Tienes acceso completo a todas las funciones del sistema.
                </Text>
              </View>
            )}
            
            {isRole('delegado') && (
              <View className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <Text className="text-blue-800 font-medium mb-2">Panel de Delegado</Text>
                <Text className="text-blue-700 text-sm">
                  Puedes gestionar equipos y partidos en tu liga.
                </Text>
              </View>
            )}
            
            {isRole('arbitro') && (
              <View className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <Text className="text-orange-800 font-medium mb-2">Panel de Árbitro</Text>
                <Text className="text-orange-700 text-sm">
                  Puedes arbitrar partidos y reportar incidentes.
                </Text>
              </View>
            )}
            
            {isRole('jugador') && (
              <View className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <Text className="text-green-800 font-medium mb-2">Panel de Jugador</Text>
                <Text className="text-green-700 text-sm">
                  Puedes ver partidos y estadísticas de tu equipo.
                </Text>
              </View>
            )}

            {isRole('espectador') && (
              <View className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <Text className="text-purple-800 font-medium mb-2">Panel de Espectador</Text>
                <Text className="text-purple-700 text-sm">
                  Puedes ver partidos y comentar sobre ellos.
                </Text>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View className="py-6">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Acciones Rápidas
            </Text>
            
            <View className="space-y-3">
              <Pressable className="bg-blue-600 rounded-xl p-4 items-center">
                <Text className="text-white font-semibold">Ver Partidos</Text>
              </Pressable>
              
              <Pressable className="bg-green-600 rounded-xl p-4 items-center">
                <Text className="text-white font-semibold">Mi Perfil</Text>
              </Pressable>
              
              {hasPermission('canViewStats') && (
                <Pressable className="bg-purple-600 rounded-xl p-4 items-center">
                  <Text className="text-white font-semibold">Estadísticas</Text>
                </Pressable>
              )}
              
              {hasPermission('canEditMatches') && (
                <Pressable className="bg-orange-600 rounded-xl p-4 items-center">
                  <Text className="text-white font-semibold">Editar Partidos</Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* Sign Out Button */}
          <View className="py-8">
            <Pressable 
              onPress={handleSignOut}
              className="bg-red-600 rounded-xl p-4 items-center"
            >
              <Text className="text-white font-semibold">Cerrar Sesión</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthGuard>
  );
}
