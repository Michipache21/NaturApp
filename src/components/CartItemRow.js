import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>S/ {item.price.toFixed(2)}</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={onDecrease} style={styles.btn}>
            <Text style={styles.btnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={onIncrease} style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.remove}>
        <Text style={styles.removeText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 10,
    padding: 10, marginBottom: 10, elevation: 1 },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontSize: 14, fontWeight: '600', color: '#333' },
  price: { fontSize: 14, color: '#148F77', marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  btn: { backgroundColor: '#148F77', borderRadius: 12,
    width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  qty: { marginHorizontal: 12, fontSize: 16, fontWeight: '600' },
  remove: { padding: 6 },
  removeText: { fontSize: 20 },
});