import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function LigaStyles() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1 px-6">
        {/* Header Section */}
        <View className="py-8 border-b border-gray-200">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Liga Amas 7
          </Text>
          <Text className="text-gray-600 text-lg">
            Temporada 25/26
          </Text>
        </View>

        {/* Liga Info Section */}
        <View className="py-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Información de la Liga
          </Text>
          
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-gray-600">Temporada:</Text>
              <Text className="text-sm text-gray-900">25/26</Text>
            </View>
            
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-gray-600">Estado:</Text>
              <Text className="text-sm text-green-600 font-medium">Activa</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-gray-600">Equipos:</Text>
              <Text className="text-sm text-gray-900">12 equipos</Text>
            </View>
          </View>
        </View>

        {/* Mode Selection */}
        <View className="py-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Modo de Visualización
          </Text>
          
          <View className="flex-row justify-between mb-6">
            <Pressable className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-4 mr-2 items-center">
              <Text className="text-blue-800 font-medium">PERFIL</Text>
            </Pressable>
            
            <Pressable className="flex-1 bg-gray-100 border border-gray-200 rounded-xl p-4 ml-2 items-center">
              <Text className="text-gray-600 font-medium">MODO OSCURO/CLARO</Text>
            </Pressable>
          </View>
        </View>

        {/* Sede Selection */}
        <View className="py-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Elije Sede
          </Text>
          
          <View className="flex-row justify-between mb-6">
            <Pressable className="flex-1 bg-green-50 border border-green-200 rounded-xl p-6 mr-2">
              <Text className="text-green-800 font-medium text-center mb-2">Sede</Text>
              <Text className="text-green-700 text-sm text-center">El Casar</Text>
            </Pressable>
            
            <Pressable className="flex-1 bg-purple-50 border border-purple-200 rounded-xl p-6 ml-2">
              <Text className="text-purple-800 font-medium text-center mb-2">Sede</Text>
              <Text className="text-purple-700 text-sm text-center">Guadalajara</Text>
            </Pressable>
          </View>
        </View>

        {/* Política de Normas */}
        <View className="py-6">
          <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <Text className="text-yellow-800 font-medium text-center">
              POLÍTICA DE LAS NORMAS
            </Text>
          </View>
        </View>

        {/* Side Panel Info */}
        <View className="py-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Información Adicional
          </Text>
          
          <View className="space-y-4">
            <View className="bg-gray-50 rounded-xl p-4">
              <Text className="text-gray-800 font-medium mb-2">El Casar</Text>
              <Text className="text-gray-600 text-sm">
                Sede principal de la liga
              </Text>
            </View>
            
            <View className="bg-gray-50 rounded-xl p-4">
              <Text className="text-gray-800 font-medium mb-2">Ubicación</Text>
              <Text className="text-gray-600 text-sm">
                Campeonato El Casar
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="py-6 space-y-3">
          <Pressable className="bg-blue-600 rounded-xl p-4 items-center">
            <Text className="text-white font-semibold">Ver Calendario</Text>
          </Pressable>
          
          <Pressable className="bg-green-600 rounded-xl p-4 items-center">
            <Text className="text-white font-semibold">Clasificaciones</Text>
          </Pressable>
          
          <Pressable className="bg-orange-600 rounded-xl p-4 items-center">
            <Text className="text-white font-semibold">Estadísticas</Text>
          </Pressable>
          
          <Pressable className="bg-purple-600 rounded-xl p-4 items-center">
            <Text className="text-white font-semibold">Equipos</Text>
          </Pressable>
        </View>

        {/* Bottom spacing */}
        <View className="pb-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
