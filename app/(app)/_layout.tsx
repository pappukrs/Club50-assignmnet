import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function AppLayout() {
  const { session } = useAuth();
  
  // If no authenticated session, redirect to login
  if (!session) {
    return <Redirect href="/login" />;
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}