import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();
  
  // If user is authenticated, redirect to home screen
  if (session) {
    return <Redirect href="/" />;
  }
  
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
  );
}