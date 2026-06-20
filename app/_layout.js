import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import DatabaseService from '../src/services/databaseService';
import { CartProvider } from '../src/context/CartContext';
import { useAuth } from '../src/viewmodels/useAuth';

function RootLayoutNav() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else {
      router.replace('/home');
    }
  }, [user, loading]);

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#1A5276' },
      headerTintColor: '#FFF',
    }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" options={{ title: 'Detalle' }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    DatabaseService.init()
      .then(() => console.log('DB lista'))
      .catch(err => console.error('Error DB:', err));
  }, []);

  return (
    <CartProvider>
      <RootLayoutNav />
    </CartProvider>
  );
}