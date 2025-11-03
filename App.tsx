import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native';
import "./global.css"
import { useState } from 'react';
import { signIn, signUp } from './auth/auth';
import SoccerSpinner from './components/SoccerSpinner';
import SoccerLoadingScreen from './components/SoccerLoadingScreen';

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  // Handle Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    
    if (result.success) {
      Alert.alert('Success', 'Welcome back to Liga A+7!');
      // Navigate to main app here
    } else {
      Alert.alert('Sign In Failed', result.error);
    }
    setLoading(false);
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await signUp(email, password);
    
    if (result.success) {
      Alert.alert('Success', 'Account created successfully! Welcome to Liga A+7!'); //Creame un  Modal
      // Navigate to main app here
    } else {
      Alert.alert('Sign Up Failed', result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <StatusBar style='dark' />
      {loading ? (
        <SoccerLoadingScreen message={isSignUp ? 'Creating your account...' : 'Signing you in...'} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >   
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 bg-white">
            {/* Header Section */}
            <View className="flex-1 justify-center items-center px-8 pt-20">
              {/* Logo/Icon */}
              <View className="w-24 h-24 items-center justify-center mb-8">
                <Image 
                  source={require('./assets/logoliga.webp')} 
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              
              {/* Welcome Text */}
              <Text className="text-black text-3xl font-bold text-center mb-2">
                Welcome To Liga A+7
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
                  onPress={isSignUp ? handleSignUp : handleSignIn}
                  disabled={loading}
                  className={`bg-blue-600 rounded-xl py-4 items-center mb-4 ${loading ? 'opacity-70' : ''}`}
                >
                  {loading ? (
                    <View className="flex-row items-center">
                      <SoccerSpinner size={20} color="#FFFFFF" />
                      <Text className="text-white text-base font-semibold ml-2">
                        {isSignUp ? 'Creating Account...' : 'Signing In...'}
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-white text-base font-semibold">
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </Text>
                  )}
                </Pressable>

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
      )}
    </>
  );
}
