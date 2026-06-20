import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../src/viewmodels/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password);
        Alert.alert('Cuenta creada', 'Bienvenido a NaturApp');
      } else {
        await login(email, password);
      }
      router.replace('/home');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>🌿 NaturApp</Text>
      <Text style={styles.subtitle}>Productos naturales del Perú</Text>

      <Text style={styles.title}>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#FFF" />
          : <Text style={styles.btnText}>{isRegister ? 'Registrarse' : 'Entrar'}</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.toggle}>
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5',
    justifyContent: 'center', padding: 24 },
  logo: { fontSize: 40, textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: 40, fontSize: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A5276',
    marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#FFF', borderRadius: 10, padding: 14,
    borderWidth: 1, borderColor: '#DDD', marginBottom: 14, fontSize: 15 },
  btn: { backgroundColor: '#148F77', borderRadius: 10,
    padding: 16, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  toggle: { textAlign: 'center', color: '#148F77',
    marginTop: 20, fontSize: 14 },
});