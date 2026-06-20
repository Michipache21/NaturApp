import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ApiService from '../../src/services/apiService';
import { Product } from '../../src/models/Product';
import { useCartContext } from '../../src/context/CartContext';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartContext();

  useEffect(() => {
    ApiService.getProductById(id)
      .then(data => setProduct(Product.fromJSON(data)))
      .catch(() => Alert.alert('Error', 'No se pudo cargar el producto'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#148F77" style={{ marginTop: 60 }} />;
  if (!product) return <Text style={{ textAlign: 'center', marginTop: 60 }}>Producto no encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{product.getFormattedPrice()}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        {product.benefits?.length > 0 && (
          <>
            <Text style={styles.subtitle}>Beneficios:</Text>
            {product.benefits.map((b, i) => (
              <Text key={i} style={styles.benefit}>• {b}</Text>
            ))}
          </>
        )}
        <TouchableOpacity
          style={[styles.btn, !product.isAvailable() && styles.btnDisabled]}
          disabled={!product.isAvailable()}
          onPress={async () => {
            try {
              await addItem(product);
              Alert.alert('Agregado', `${product.name} en tu carrito`);
            } catch (e) { Alert.alert('Error', e.message); }
          }}
        >
          <Text style={styles.btnText}>
            {product.isAvailable() ? 'Agregar al carrito' : 'Sin stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  image: { width: '100%', height: 260 },
  content: { padding: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1A5276' },
  category: { color: '#888', fontSize: 14, marginTop: 4, textTransform: 'capitalize' },
  price: { fontSize: 24, fontWeight: 'bold', color: '#148F77', marginTop: 10 },
  desc: { color: '#555', fontSize: 15, marginTop: 12, lineHeight: 22 },
  subtitle: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 16 },
  benefit: { color: '#555', fontSize: 14, marginTop: 4 },
  btn: { backgroundColor: '#148F77', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24 },
  btnDisabled: { backgroundColor: '#B0BEC5' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});