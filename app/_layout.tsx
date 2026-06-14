import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="payment/method"
          options={{ presentation: 'card' }}
        />
        <Stack.Screen
          name="payment/details"
          options={{ presentation: 'card' }}
        />
        <Stack.Screen
          name="payment/review"
          options={{ presentation: 'card' }}
        />
        <Stack.Screen
          name="payment/success"
          options={{ presentation: 'card', gestureEnabled: false }}
        />
      </Stack>
    </AppProvider>
  );
}
