import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// SecureStore adapter for Supabase
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://ekncthvqpryufweosqro.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbmN0aHZxcHJ5dWZ3ZW9zcXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzUzNzUsImV4cCI6MjA2MDc1MTM3NX0.cwcdgQK32WUt7-pFOUf6sYUmNLw9Qqe36g0oVRkhfT4';



// EXPO_PUBLIC_SUPABASE_URL=https://ekncthvqpryufweosqro.supabase.co
// EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbmN0aHZxcHJ5dWZ3ZW9zcXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzUzNzUsImV4cCI6MjA2MDc1MTM3NX0.cwcdgQK32WUt7-pFOUf6sYUmNLw9Qqe36g0oVRkhfT4

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});