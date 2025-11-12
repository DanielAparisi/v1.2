import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function LigaStyles() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      <ScrollView className="flex-1 px-6">
        {/* Header Section with Logo */}
        <View className="py-8 border-b border-gray-700">
          <View className="flex-row items-center justify-center mb-3">
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
    </SafeAreaView>
  );
}
