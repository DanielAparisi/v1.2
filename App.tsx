import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, Keyboard } from 'react-native';
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
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  
  // Refs for TextInputs to manage focus
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Specific email validation for @gmail.com
  const isValidGmailEmail = (email: string) => {
    return email.toLowerCase().endsWith('@gmail.com') && email.includes('@');
  };

  // Password validation helper
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  // Real-time validation functions
  const validateEmail = (emailText: string) => {
    if (emailText.length > 0) {
      const isValid = isValidGmailEmail(emailText);
      setEmailError(!isValid);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = (passwordText: string) => {
    if (passwordText.length > 0) {
      const isValid = isValidPassword(passwordText);
      setPasswordError(!isValid);
    } else {
      setPasswordError(false);
    }
  };

  // Get border color based on focus and validation state
  const getEmailBorderColor = () => {
    if (emailError) return '#EF4444'; // Red for error
    if (emailFocused) return '#3B82F6'; // Blue for focus
    if (email && !emailError) return '#10B981'; // Green for valid
    return '#D1D5DB'; // Gray for default
  };

  const getPasswordBorderColor = () => {
    if (passwordError) return '#EF4444'; // Red for error
    if (passwordFocused) return '#3B82F6'; // Blue for focus
    if (password && !passwordError) return '#10B981'; // Green for valid
    return '#D1D5DB'; // Gray for default
  };

    // Handle Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    if (!isValidGmailEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid @gmail.com email address');
      setEmailError(true);
      emailRef.current?.focus();
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long');
      setPasswordError(true);
      passwordRef.current?.focus();
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

    if (!isValidGmailEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid @gmail.com email address');
      setEmailError(true);
      emailRef.current?.focus();
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      setPasswordError(true);
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
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{ flex: 1 }}
          >
            <Pressable 
              onPress={Keyboard.dismiss} 
              style={{ flex: 1 }}
            >
              <View className="flex-1 bg-white">
                {/* Header Section */}
                <Pressable onPress={Keyboard.dismiss}>
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
                  </View>
                </Pressable>

                {/* Login Form - No keyboard dismiss here */}
                <View className="items-center px-8">
                  <View className="w-full max-w-sm">
                    {/* Email Input */}
                    <View className="mb-4">
                      <Text className="text-black text-sm font-medium mb-2">Email Address</Text>
                      <Pressable 
                        onPress={() => emailRef.current?.focus()}
                        style={{ position: 'relative' }}
                      >
                        <TextInput
                          ref={emailRef}
                          value={email}
                          onChangeText={(text) => {
                            const cleanEmail = text.trim().toLowerCase();
                            setEmail(cleanEmail);
                            validateEmail(cleanEmail);
                          }}
                          placeholder="Enter your email address (@gmail.com)"
                          placeholderTextColor="#9CA3AF"
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="email-address"
                          textContentType="emailAddress"
                          autoComplete="email"
                          returnKeyType="next"
                          onFocus={() => {
                            console.log('Email focused');
                            setEmailFocused(true);
                          }}
                          onBlur={() => {
                            console.log('Email blurred');
                            setEmailFocused(false);
                            validateEmail(email);
                          }}
                          onSubmitEditing={() => passwordRef.current?.focus()}
                          style={{
                            backgroundColor: '#F9FAFB',
                            borderColor: getEmailBorderColor(),
                            borderWidth: 2,
                            borderRadius: 12,
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            fontSize: 16,
                            color: '#1F2937',
                            fontWeight: '500',
                            shadowColor: emailFocused ? '#3B82F6' : (emailError ? '#EF4444' : 'transparent'),
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: emailFocused || emailError ? 2 : 0
                          }}
                        />
                      </Pressable>
                      {emailError && email.length > 0 && (
                        <Text className="text-red-500 text-xs mt-1 ml-2">
                          Please enter a valid @gmail.com email address
                        </Text>
                      )}
                    </View>

                    {/* Password Input */}
                    <View className="mb-6">
                      <Text className="text-black text-sm font-medium mb-2">Password</Text>
                      <Pressable 
                        onPress={() => passwordRef.current?.focus()}
                        style={{ position: 'relative' }}
                      >
                        <TextInput
                          ref={passwordRef}
                          value={password}
                          onChangeText={(text) => {
                            setPassword(text);
                            validatePassword(text);
                          }}
                          placeholder="Enter your password (min. 6 characters)"
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={true}
                          textContentType="password"
                          autoComplete="password"
                          returnKeyType="done"
                          onFocus={() => {
                            console.log('Password focused');
                            setPasswordFocused(true);
                          }}
                          onBlur={() => {
                            console.log('Password blurred');
                            setPasswordFocused(false);
                            validatePassword(password);
                          }}
                          onSubmitEditing={isSignUp ? handleSignUp : handleSignIn}
                          style={{
                            backgroundColor: '#F9FAFB',
                            borderColor: getPasswordBorderColor(),
                            borderWidth: 2,
                            borderRadius: 12,
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            fontSize: 16,
                            color: '#1F2937',
                            fontWeight: '500',
                            shadowColor: passwordFocused ? '#3B82F6' : (passwordError ? '#EF4444' : 'transparent'),
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: passwordFocused || passwordError ? 2 : 0
                          }}
                        />
                      </Pressable>
                      {passwordError && password.length > 0 && (
                        <Text className="text-red-500 text-xs mt-1 ml-2">
                          Password must be at least 6 characters long
                        </Text>
                      )}
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
            </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
