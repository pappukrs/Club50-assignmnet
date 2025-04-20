import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthForm from '@/components/AppForm';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UserCircle } from 'lucide-react-native';

export default function LoginScreen() {
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  
  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn');
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      <Animated.View 
        className="flex-1"
        entering={FadeIn.duration(500)}
      >
        <View className="items-center mt-10 mb-6">
          <View className="bg-primary-100 p-4 rounded-full">
            <UserCircle size={60} color="#4F46E5" />
          </View>
        </View>
        
        <AuthForm 
          authMode={authMode}
          onToggleMode={toggleAuthMode}
        />
      </Animated.View>
    </SafeAreaView>
  );
}