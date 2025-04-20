import { useEffect, useState } from 'react';
import { Redirect, SplashScreen as ExpoSplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import SplashScreen from '@/components/SplashScreen';

// Prevent splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const [showSplash, setShowSplash] = useState(true);
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash after fonts load and a minimum duration of 2 seconds
      const timer = setTimeout(() => {
        ExpoSplashScreen.hideAsync();
        setShowSplash(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]);

  // Show nothing while fonts are loading
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <StatusBar style="auto" />
          <RootLayoutNav />
        </>
      )}
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { session, loading } = useAuth();

  // Show a loading state while checking authentication
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(auth)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}