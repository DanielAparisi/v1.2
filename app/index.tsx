import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, Keyboard, StyleSheet } from 'react-native';
import "../global.css"
import { useState, useRef, useEffect } from 'react';
import { signIn, signUp } from '../auth/auth';
import SoccerSpinner from '../components/SoccerSpinner';
import SoccerLoadingScreen from '../components/SoccerLoadingScreen';
import SuccessModal from '../components/SuccessModal';
import { Link, useRouter } from 'expo-router';
import AuthGuard from '../components/AuthGuard';
import { useUser } from '../contexts/UserContext';
// ESTO ES EL LOGIN QUE SEERA LA RAIZ DE LA APP
export default function HomeScreen() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  
  // Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  
  // Refs for TextInputs to manage focus
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Handle navigation for authenticated users
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading]);

  // Show loading while checking auth state
  if (loading) {
    return <SoccerLoadingScreen message="Verificando autenticación..." />;
  }

  // Don't render if user is authenticated (will redirect)
  if (user) {
    return null;
  }

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

  // Get border styles based on focus and validation state
  const getEmailBorderStyle = () => {
    const baseStyles = [inputStyles.base, inputStyles.borderDefault];
    
    if (emailError) {
      return [inputStyles.base, inputStyles.borderError];
    }
    if (emailFocused) {
      return [inputStyles.base, inputStyles.borderFocused];
    }
    if (email && !emailError) {
      return [inputStyles.base, inputStyles.borderSuccess];
    }
    return baseStyles;
  };

  const getPasswordBorderStyle = () => {
    const baseStyles = [inputStyles.base, inputStyles.borderDefault];
    
    if (passwordError) {
      return [inputStyles.base, inputStyles.borderError];
    }
    if (passwordFocused) {
      return [inputStyles.base, inputStyles.borderFocused];
    }
    if (password && !passwordError) {
      return [inputStyles.base, inputStyles.borderSuccess];
    }
    return baseStyles;
  };

        // Handle Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Información Faltante', 'Por favor completa todos los campos');
      return;
    }

    if (emailError) {
      Alert.alert('Email Inválido', 'Por favor ingresa un email que termine en @gmail.com');
      emailRef.current?.focus();
      setEmailError(true);
      return;
    }

    if (passwordError) {
      Alert.alert('Contraseña Débil', 'La contraseña debe tener al menos 6 caracteres');
      passwordRef.current?.focus();
      setPasswordError(true);
      return;
    }

    setAuthLoading(true);
    const result = await signIn(email, password);
    
    if (result.success) {
      setModalTitle('¡Bienvenido!')
      setModalMessage('Has iniciado sesión exitosamente en Liga A+7. ¡Prepárate para jugar!')
      setShowSuccessModal(true)
      
      // Navigate to dashboard after short delay
      setTimeout(() => {
        router.replace('/dashboard');
      }, 2000);
    } else {
      Alert.alert('Error de Inicio de Sesión', result.error);
    }
    setAuthLoading(false);
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Información Faltante', 'Por favor completa todos los campos');
      return;
    }

    if (emailError) {
      Alert.alert('Email Inválido', 'Por favor ingresa un email que termine en @gmail.com');
      emailRef.current?.focus();
      setEmailError(true);
      return;
    }

    if (passwordError) {
      Alert.alert('Contraseña Débil', 'La contraseña debe tener al menos 6 caracteres');
      passwordRef.current?.focus();
      setPasswordError(true);
      return;
    }

    setAuthLoading(true);
    const result = await signUp(email, password);
    
    if (result.success) {
      setModalTitle('¡Cuenta Creada!')
      setModalMessage('Tu cuenta ha sido creada exitosamente. ¡Bienvenido a Liga A+7!')
      setShowSuccessModal(true)
      
      // Navigate to dashboard after short delay
      setTimeout(() => {
        router.replace('/dashboard');
      }, 2000);
    } else {
      Alert.alert('Error al Crear Cuenta', result.error);
    }
    setAuthLoading(false);
  };

  return (
    <>
      <StatusBar style='dark' />
      {authLoading ? (
        <SoccerLoadingScreen message={isSignUp ? 'Creating your account...' : 'Signing you in...'} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            className="flex-1"
          >
            <Pressable 
              onPress={Keyboard.dismiss} 
              className="flex-1"
            >
              <View className="flex-1 bg-white">
                {/* Header Section */}
                <Pressable onPress={Keyboard.dismiss}>
                  <View className="flex-1 justify-center items-center px-8 pt-20">
                    {/* Logo/Icon */}
                    <View className="w-24 h-24 items-center justify-center mb-8">
                      <Image 
                        source={require('../assets/logoliga.webp')} 
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
                        className="relative"
                      >
                        <TextInput
                          ref={emailRef}
                          value={email}
                          onChangeText={(text) => {
                            const cleanEmail = text.trim().toLowerCase();
                            setEmail(cleanEmail);
                            validateEmail(cleanEmail);
                          }}
                          placeholder="Enter your email address"
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
                          style={getEmailBorderStyle()}
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
                        className="relative"
                      >
                        <TextInput
                          ref={passwordRef}
                          value={password}
                          onChangeText={(text) => {
                            setPassword(text);
                            validatePassword(text);
                          }}
                          placeholder="Enter your password "
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
                          style={getPasswordBorderStyle()}
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
                      disabled={authLoading}
                      className={`bg-blue-600 rounded-xl py-4 items-center mb-4 ${authLoading ? 'opacity-70' : ''}`}
                    >
                      {authLoading ? (
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
      
      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

// Styles for dynamic input borders to avoid NativeWind conflicts
const inputStyles = StyleSheet.create({
  base: {
    backgroundColor: '#f9fafb', // bg-gray-50
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937', // text-gray-800
    fontWeight: '500',
  },
  borderDefault: {
    borderColor: '#d1d5db', // border-gray-300
  },
  borderFocused: {
    borderColor: '#3b82f6', // border-blue-500
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  borderError: {
    borderColor: '#ef4444', // border-red-500
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  borderSuccess: {
    borderColor: '#10b981', // border-green-500
  },
});