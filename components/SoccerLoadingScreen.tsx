import React from 'react';
import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const SoccerLoadingScreen = ({ message = 'Loading...' }) => {
  const ball1 = useRef(new Animated.Value(0)).current;
  const ball2 = useRef(new Animated.Value(0)).current;
  const ball3 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Bouncing balls with different delays
    const createBounceAnimation = (animatedValue: Animated.Value, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: -20,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const bounce1 = createBounceAnimation(ball1, 0);
    const bounce2 = createBounceAnimation(ball2, 200);
    const bounce3 = createBounceAnimation(ball3, 400);

    bounce1.start();
    bounce2.start();
    bounce3.start();

    return () => {
      bounce1.stop();
      bounce2.stop();
      bounce3.stop();
    };
  }, [ball1, ball2, ball3, fadeAnim]);

  return (
    <Animated.View 
      style={{ opacity: fadeAnim }}
      className="flex-1 items-center justify-center bg-white"
    >
      {/* Soccer field background effect */}
      <View className="absolute inset-0 bg-green-50" />
      
      {/* Bouncing soccer balls */}
      <View className="flex-row items-end space-x-4 mb-8">
        <Animated.View style={{ transform: [{ translateY: ball1 }] }}>
          <Text style={{ fontSize: 32 }}>⚽</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: ball2 }] }}>
          <Text style={{ fontSize: 32 }}>⚽</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: ball3 }] }}>
          <Text style={{ fontSize: 32 }}>⚽</Text>
        </Animated.View>
      </View>

      {/* Loading text */}
      <Text className="text-green-600 text-lg font-semibold mb-2">
        Liga A+7
      </Text>
      <Text className="text-gray-600 text-base">
        {message}
      </Text>
    </Animated.View>
  );
};

export default SoccerLoadingScreen;