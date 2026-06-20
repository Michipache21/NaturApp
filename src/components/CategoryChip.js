import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.active]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#E0E0E0', marginRight: 8 },
  active: { backgroundColor: '#148F77' },
  label: { fontSize: 13, color: '#555', textTransform: 'capitalize' },
  activeLabel: { color: '#FFF', fontWeight: '600' },
});