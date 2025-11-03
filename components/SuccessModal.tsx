import React from 'react';
import { View, Text, Modal, Pressable, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import SoccerSpinner from './SoccerSpinner';

interface SuccessModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessModal({ visible, title, message, onClose }: SuccessModalProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          opacity: fadeAnim,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 30,
            width: '100%',
            maxWidth: 350,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* Success Icon with Soccer Ball Animation */}
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: '#10B981',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <SoccerSpinner size={40} color="#FFFFFF" />
          </View>

          {/* Title */}
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1F2937',
            textAlign: 'center',
            marginBottom: 10,
          }}>
            {title}
          </Text>

          {/* Message */}
          <Text style={{
            fontSize: 16,
            color: '#6B7280',
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: 30,
          }}>
            {message}
          </Text>

          {/* Continue Button */}
          <Pressable
            onPress={onClose}
            style={{
              backgroundColor: '#3B82F6',
              paddingHorizontal: 40,
              paddingVertical: 12,
              borderRadius: 12,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
              ¡Continuar!
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}