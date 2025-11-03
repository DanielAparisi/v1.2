import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import "./global.css"
import { useState, useRef } from 'react';
import { signIn, signUp } from './auth/auth';
import SoccerSpinner from './components/SoccerSpinner';
import SoccerLoadingScreen from './components/SoccerLoadingScreen';

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  
  // Refs for TextInputs to manage focus
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

    // Handle Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      emailRef.current?.focus();
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    
    if (result.success) {
      Alert.alert('Welcome!', 'Successfully signed in to Liga A+7!');
      // Navigate to main app here
    } else {
      Alert.alert('Sign In Failed', result.error);
    }
    setLoading(false);
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      emailRef.current?.focus();
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      passwordRef.current?.focus();
      return;
    }

    setLoading(true);
    const result = await signUp(email, password);
    
    if (result.success) {
      Alert.alert('Success', 'Account created successfully! Welcome to Liga A+7!');
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={{ flex: 1 }}
            >
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
                      <Text className="text-black text-sm font-medium mb-2">Email Address</Text>
                      <View className="relative">
                        <TextInput
                          ref={emailRef}
                          value={email}
                          onChangeText={(text) => setEmail(text.trim().toLowerCase())}
                          placeholder="Enter your email address"
                          placeholderTextColor="#9CA3AF"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="email-address"
                          textContentType="emailAddress"
                          autoComplete="email"
                          returnKeyType="next"
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                          onSubmitEditing={() => passwordRef.current?.focus()}
                          style={{
                            backgroundColor: '#F9FAFB',
                            borderColor: emailFocused ? '#3B82F6' : (email ? '#10B981' : '#D1D5DB'),
                            borderWidth: 2,
                            borderRadius: 12,
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            fontSize: 16,
                            color: '#1F2937',
                            fontWeight: '500',
                            shadowColor: emailFocused ? '#3B82F6' : 'transparent',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: emailFocused ? 2 : 0
                          }}
                        />
                      </View>
                    </View>

                    {/* Password Input */}
                    <View className="mb-6">
                      <Text className="text-black text-sm font-medium mb-2">Password</Text>
                      <View className="relative">
                        <TextInput
                          ref={passwordRef}
                          value={password}
                          onChangeText={setPassword}
                          placeholder="Enter your password"
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={true}
                          textContentType="password"
                          autoComplete="password"
                          returnKeyType="done"
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                          onSubmitEditing={isSignUp ? handleSignUp : handleSignIn}
                          style={{
                            backgroundColor: '#F9FAFB',
                            borderColor: passwordFocused ? '#3B82F6' : (password ? '#10B981' : '#D1D5DB'),
                            borderWidth: 2,
                            borderRadius: 12,
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            fontSize: 16,
                            color: '#1F2937',
                            fontWeight: '500',
                            shadowColor: passwordFocused ? '#3B82F6' : 'transparent',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: passwordFocused ? 2 : 0
                          }}
                        />
                      </View>
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
