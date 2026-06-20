import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useOrders } from '../../src/viewmodels/useOrders';

export default function OrdersScreen() {
  const { orders, loading, error, refresh } = useOrders();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#148F77" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No tienes pedidos aún</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.id}>Pedido #{item.id}</Text>
              <View style={[styles.badge, { backgroundColor: item.getStatusColor() }]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.date}>{item.getFormattedDate()}</Text>
            <Text style={styles.total}>Total: S/ {item.total?.toFixed(2)}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  card: { backgroundColor: '#FFF', borderRadius: 10, padding: 14,
    marginBottom: 12, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  id: { fontSize: 16, fontWeight: 'bold', color: '#1A5276' },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  date: { color: '#888', fontSize: 13, marginTop: 4 },
  total: { fontSize: 15, fontWeight: '600', color: '#148F77', marginTop: 6 },
  address: { color: '#666', fontSize: 13, marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 16, color: '#999' },
  error: { color: '#E74C3C', textAlign: 'center', marginTop: 40 },
});