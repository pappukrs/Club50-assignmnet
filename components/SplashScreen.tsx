import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSequence, withDelay } from 'react-native-reanimated';
import { UserCircle } from 'lucide-react-native';

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    scale.value = withSequence(
      withTiming(1.2, { duration: 500, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
    );
    
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
    
    // Animate text with delay
    textOpacity.value = withDelay(
      400, 
      withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        { 
          translateY: withTiming(textOpacity.value * 0, {
            duration: 600,
            easing: Easing.out(Easing.ease),
          }) 
        }
      ],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-primary-500 to-secondary-600 justify-center items-center">
      <View className="items-center">
        <Animated.View style={logoStyle} className="mb-6">
          <UserCircle size={120} color="#FFFFFF" strokeWidth={1.5} />
        </Animated.View>
        <Animated.View style={textStyle}>
          <Text className="text-white text-3xl font-bold tracking-wider">AuthFlow</Text>
          <Text className="text-white text-base opacity-70 mt-2 text-center">
            Secure authentication with Supabase
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}