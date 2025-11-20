import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'expo-router';

export default function LigaStyles() {
  const { user, signOut } = useUser();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = async () => {
    console.log('🔴 handleSignOut ejecutado');
    setShowLogoutModal(true);
  };

  const confirmSignOut = async () => {
    try {
      console.log('🔴 Iniciando cierre de sesión...');
      await signOut();
      console.log('🔴 Sesión cerrada exitosamente');
      setShowLogoutModal(false);
      router.replace('/');
    } catch (error) {
      console.error('🔴 Error cerrando sesión:', error);
      setShowLogoutModal(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      <ScrollView className="flex-1 px-6">
        {/* Header Section with Logo */}
        <View className="py-8 border-b border-gray-700">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Image 
                source={require('../assets/logoliga.webp')} 
                className="w-14 h-14 mr-3"
                resizeMode="contain"
              />
              <View>
                <Text className="text-3xl font-bold text-white">
                  LIGA A+7
                </Text>
                <Text className="text-gray-300 text-lg">
                  Temporada 25/26
                </Text>
              </View>
            </View>
            
            {/* Sign Out Button */}
            <Pressable 
              onPress={() => {
                console.log('🔴 BOTÓN PRESIONADO - Iniciando handleSignOut');
                handleSignOut();
              }}
              className="bg-red-600 rounded-lg px-6 py-3 border-2 border-red-400"
              style={{ minWidth: 80, minHeight: 40 }}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-white text-lg mr-2">🚪</Text>
                <Text className="text-white text-base font-bold">SALIR</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Welcome Banner */}
        <View className="py-6">
          <View className="bg-gray-800 border border-gray-600 rounded-xl p-6">
            <Text className="text-white text-xl font-bold text-center mb-4">
              ¡Bienvenido a Liga A+7!
            </Text>
            
            <Text className="text-gray-200 text-center text-base leading-relaxed mb-4">
              La liga de fútbol 7 más emocionante de la región. Donde la pasión por el fútbol se vive en cada partido, 
              conectando jugadores, equipos y aficionados en una experiencia única de competición y diversión.
            </Text>
            
            <View className="flex-row justify-center">
              <View className="bg-gray-700 rounded-full px-4 py-2 mr-2">
                <Text className="text-white text-sm font-medium">⚽ 12 Equipos</Text>
              </View>
              <View className="bg-gray-700 rounded-full px-4 py-2">
                <Text className="text-white text-sm font-medium">🏆 Temporada Activa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sede Selection */}
        <View className="py-6">
          <Text className="text-xl font-semibold text-white mb-4 text-center">
            Elige tu Sede
          </Text>
          
          <View className="flex-row justify-between mb-6">
            <Pressable className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl p-6 mr-3 border border-gray-500">
              <Text className="text-white font-bold text-center mb-2 text-lg">🏟️</Text>
              <Text className="text-gray-200 font-medium text-center mb-1">Sede</Text>
              <Text className="text-white text-sm text-center font-semibold">El Casar</Text>
            </Pressable>
            
            <Pressable className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl p-6 ml-3 border border-gray-500">
              <Text className="text-white font-bold text-center mb-2 text-lg">🏟️</Text>
              <Text className="text-gray-200 font-medium text-center mb-1">Sede</Text>
              <Text className="text-white text-sm text-center font-semibold">Guadalajara</Text>
            </Pressable>
          </View>
        </View>

        {/* Política de Normas */}
        <View className="py-6">
          <Pressable className="bg-yellow-700 hover:bg-yellow-600 border border-yellow-600 rounded-xl p-6">
            <Text className="text-yellow-100 font-bold text-center text-lg mb-2">
              📋 POLÍTICA DE NORMAS
            </Text>
            <Text className="text-yellow-200 text-center text-sm">
              Consulta las reglas y normas de la liga
            </Text>
          </Pressable>
        </View>

        {/* Bottom spacing */}
        <View className="pb-8" />
      </ScrollView>

      {/* Custom Logout Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white rounded-xl p-6 mx-8 w-4/5">
            <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
              Cerrar Sesión
            </Text>
            <Text className="text-gray-600 text-base text-center mb-6">
              ¿Estás seguro que deseas cerrar sesión?
            </Text>
            
            <View className="flex-row justify-between">
              <Pressable 
                onPress={() => setShowLogoutModal(false)}
                className="flex-1 bg-gray-200 rounded-lg py-3 mr-2"
              >
                <Text className="text-gray-800 font-semibold text-center">Cancelar</Text>
              </Pressable>
              
              <Pressable 
                onPress={confirmSignOut}
                className="flex-1 bg-red-600 rounded-lg py-3 ml-2"
              >
                <Text className="text-white font-semibold text-center">Cerrar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
