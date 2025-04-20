import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Mail, Lock, EyeOff, Eye } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type AuthFormProps = {
  authMode: 'signIn' | 'signUp';
  onToggleMode: () => void;
};

export default function AuthForm({ authMode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading } = useAuth();

  const handleAuth = async () => {
    // Reset error message
    setError(null);
    
    // Validate input fields
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Call the appropriate authentication function
    try {
      if (authMode === 'signIn') {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="px-6 py-8"
      >
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">
            {authMode === 'signIn' ? 'Welcome back' : 'Create account'}
          </Text>
          <Text className="text-gray-500 mt-2">
            {authMode === 'signIn' 
              ? 'Please sign in to continue' 
              : 'Sign up to get started with AuthFlow'}
          </Text>
        </View>
        
        {error && (
          <Animated.View 
            entering={FadeIn.duration(300)} 
            exiting={FadeOut.duration(300)}
            className="mb-4 bg-red-50 p-3 rounded-lg border border-red-200"
          >
            <Text className="text-red-500">{error}</Text>
          </Animated.View>
        )}
        
        <View className="space-y-4 mb-6">
          <View>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Mail size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-2 text-base text-gray-700 h-12"
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
          </View>
          
          <View>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Lock size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-2 text-base text-gray-700 h-12"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                {showPassword ? 
                  <EyeOff size={20} color="#6B7280" /> : 
                  <Eye size={20} color="#6B7280" />
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          className={`rounded-xl py-4 px-5 flex-row justify-center items-center ${loading ? 'bg-primary-400' : 'bg-primary-600'}`}
          onPress={handleAuth}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text className="text-white font-semibold text-base mr-2">
                {authMode === 'signIn' ? 'Sign In' : 'Sign Up'}
              </Text>
              <ArrowRight size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">
            {authMode === 'signIn' ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <TouchableOpacity onPress={onToggleMode} activeOpacity={0.8}>
            <Text className="text-primary-600 font-semibold">
              {authMode === 'signIn' ? 'Sign Up' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}