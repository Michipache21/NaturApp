import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useProfile } from '../../src/viewmodels/useProfile';
import { useAuth } from '../../src/viewmodels/useAuth';

export default function ProfileScreen() {
  const { name, setName, email, setEmail,
    darkTheme, notifications,
    saveProfile, toggleTheme, toggleNotifications } = useProfile();
  const { logout } = useAuth();

  const handleSave = async () => {
    await saveProfile();
    Alert.alert('Guardado', 'Perfil actualizado correctamente');
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.section}>Mi Perfil</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email}
        onChangeText={setEmail} keyboardType="email-address" />
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar cambios</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Preferencias</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Tema oscuro</Text>
        <Switch value={darkTheme} onValueChange={toggleTheme} trackColor={{ true: '#148F77' }} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Notificaciones</Text>
        <Switch value={notifications} onValueChange={toggleNotifications} trackColor={{ true: '#148F77' }} />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
  section: { fontSize: 18, fontWeight: 'bold', color: '#1A5276', marginTop: 20, marginBottom: 12 },
  input: { backgroundColor: '#FFF', borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: '#DDD', marginBottom: 12, fontSize: 15 },
  btn: { backgroundColor: '#148F77', borderRadius: 10, padding: 14, alignItems: 'center' },
  logoutBtn: { backgroundColor: '#E74C3C', borderRadius: 10, padding: 14,
    alignItems: 'center', marginTop: 20 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#FFF',
    borderRadius: 8, padding: 14, marginBottom: 10 },
  label: { fontSize: 15, color: '#333' },
});