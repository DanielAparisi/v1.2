import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import SoccerSpinner from './SoccerSpinner';

const SoccerLoadingScreen = ({ message = 'Loading...' }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}> 
      <View style={styles.centerBox}>
        <SoccerSpinner size={56} color="#E5E7EB" />
        <Text style={styles.appTitle}>Liga A+7</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  appTitle: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 14,
  },
  message: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 6,
  },
});

export default SoccerLoadingScreen;