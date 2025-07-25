import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // import icon

export default function PaymentSummaryScreen() {
  const router = useRouter();
  const { pickup, destination, rideType, fare, distance, method } = useLocalSearchParams();

  const handlePayment = async () => {
    try {
      const response = await fetch('http://<YOUR_IP>:8080/api/rides/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup,
          destination,
          rideType,
          fare: parseFloat(fare),
          distance: parseFloat(distance),
        }),
      });

      if (!response.ok) throw new Error('Failed to book ride');

      const data = await response.json();
      console.log('✅ Booking success:', data);
      router.push('/(root)/BookingConfirmationScreen');
    } catch (error) {
      console.error('❌ Error:', error);
      Alert.alert('Payment Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={24} color="#362fd9" />
      </TouchableOpacity>

      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>GHS 50 off</Text>
        <Text style={styles.promoText}>On your first ride</Text>
        <Text style={styles.promoNote}>* Valid on rides above GHS 150</Text>
      </View>

      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.cardLabel}>{method} Payment</Text>
      </View>

      <Text style={styles.sectionTitle}>Promo Code</Text>
      <TextInput
        placeholder="PROMO20-08"
        style={styles.input}
        defaultValue="PROMO20-08"
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Pay GHS {fare}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  promoCard: {
    backgroundColor: '#362fd9',
    padding: 20,
    borderRadius: 12,
    marginTop: 80,
    marginBottom: 20,
  },
  promoTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  promoText: { color: '#fff', fontSize: 16, marginTop: 5 },
  promoNote: { color: '#ccc', fontSize: 12, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 10 },
  cardInfo: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
  },
  cardLabel: { fontSize: 15, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  payButton: {
    marginTop: 30,
    backgroundColor: '#362fd9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});



