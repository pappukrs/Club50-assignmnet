import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { LogOut } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  
  const userEmail = user?.email || 'User';
  const username = userEmail.split('@')[0];
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      <View className="px-6 pt-2 pb-4 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-800">AuthFlow</Text>
        <TouchableOpacity
          onPress={signOut}
          className="flex-row items-center py-2 px-4 bg-gray-100 rounded-full"
          activeOpacity={0.8}
        >
          <LogOut size={18} color="#6B7280" />
          <Text className="ml-2 text-gray-700">Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View className="flex-1 justify-center items-center px-6">
        <Animated.View 
          className="items-center"
          entering={FadeInUp.duration(500).delay(200)}
        >
          <View className="bg-primary-100 w-24 h-24 rounded-full items-center justify-center mb-6">
            <Text className="text-3xl font-bold text-primary-600">
              {username.substring(0, 1).toUpperCase()}
            </Text>
          </View>
          
          <Text className="text-3xl font-bold text-gray-800">
            Hi, {username}!
          </Text>
          
          <Text className="text-gray-500 text-center mt-2 max-w-xs">
            You've successfully signed in to your account.
          </Text>
        </Animated.View>
        
        <Animated.View 
          className="w-full mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          entering={FadeInDown.duration(500).delay(400)}
        >
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Account Information
          </Text>
          
          <View className="space-y-2">
            <View className="flex-row">
              <Text className="text-gray-500 w-24">Email:</Text>
              <Text className="text-gray-800 flex-1">{user?.email}</Text>
            </View>
            
            <View className="flex-row">
              <Text className="text-gray-500 w-24">User ID:</Text>
              <Text className="text-gray-800 flex-1">{user?.id.substring(0, 8)}...</Text>
            </View>
            
            <View className="flex-row">
              <Text className="text-gray-500 w-24">Status:</Text>
              <Text className="text-green-600 font-medium flex-1">Active</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}