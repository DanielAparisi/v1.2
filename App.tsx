import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import "./global.css"
import { useState } from 'react';

export const signIn = () => {}

export const singUp = () => {}

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 bg-white">
            {/* Header Section */}
            <View className="flex-1 justify-center items-center px-8 pt-20">
              {/* Logo/Icon Placeholder */}
              <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-8">
                <Text className="text-black text-3xl font-bold">🔐</Text>
              </View>
              
              {/* Welcome Text */}
              <Text className="text-black text-3xl font-bold text-center mb-2">
                Welcome To Liga A+77
              </Text>
              <Text className="text-gray-600 text-base text-center mb-8">
                {isSignUp ? 'Create your account to get started' : 'Sign in to continue to your account'}
              </Text>

              {/* Login Form */}
              <View className="w-full max-w-sm">
                {/* Email Input */}
                <View className="mb-4">
                  <Text className="text-black text-sm font-medium mb-2">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    autoFocus
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-4 text-black text-base"
                  />
                </View>

                {/* Password Input */}
                <View className="mb-6">
                  <Text className="text-black text-sm font-medium mb-2">Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={true}
                    className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-4 text-black text-base"
                  />
                </View>

                {/* Forgot Password */}
                {!isSignUp && (
                  <Pressable className="mb-6">
                    <Text className="text-gray-600 text-sm text-right">Forgot Password?</Text>
                  </Pressable>
                )}

                {/* Sign In/Up Button */}
                <Pressable 
                  onPress={() => { 
                    setLoading(true)
                    console.log(isSignUp ? 'Sign Up pressed' : 'Sign In pressed')
                    setTimeout(() => setLoading(false), 1000)
                  }}
                  disabled={loading}
                  className={`bg-blue-600 rounded-xl py-4 items-center mb-4 ${loading ? 'opacity-70' : ''}`}
                >
                  <Text className="text-white text-base font-semibold">
                    {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                  </Text>
                </Pressable>

                {/* Divider */}
                <View className="flex-row items-center mb-4">
                  <View className="flex-1 h-px bg-gray-300" />
                  <Text className="text-gray-500 text-sm mx-4">OR</Text>
                  <View className="flex-1 h-px bg-gray-300" />
                </View>

                {/* Social Login Buttons */}
                <View className="space-y-3 mb-6">
                  <Pressable className="bg-gray-100 border border-gray-300 rounded-xl py-3 items-center">
                    <Text className="text-black text-base font-medium">Continue with Google</Text>
                  </Pressable>
                  
                  <Pressable className="bg-gray-100 border border-gray-300 rounded-xl py-3 items-center">
                    <Text className="text-black text-base font-medium">Continue with Apple</Text>
                  </Pressable>
                </View>

                {/* Toggle Sign In/Up */}
                <View className="flex-row justify-center">
                  <Text className="text-gray-600 text-sm">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                  </Text>
                  <Pressable onPress={() => setIsSignUp(!isSignUp)}>
                    <Text className="text-black text-sm font-semibold underline">
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
