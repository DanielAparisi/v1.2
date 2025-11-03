import React from 'react';
import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const SoccerSpinner = ({ size = 30, color = '#22C55E' }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinning animation
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    // Bouncing animation
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    spin.start();
    bounce.start();

    return () => {
      spin.stop();
      bounce.stop();
    };
  }, [spinValue, bounceValue]);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="items-center justify-center">
      <Animated.View
        style={{
          transform: [
            { rotate: spinInterpolate },
            { translateY: bounceValue }
          ],
        }}
      >
        <Text style={{ fontSize: size, color: color }}>⚽</Text>
      </Animated.View>
    </View>
  );
};

export default SoccerSpinner;