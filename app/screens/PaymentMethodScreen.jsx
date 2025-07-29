import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const { pickup, destination, rideType, fare, distance } = useLocalSearchParams();
  const [method, setMethod] = useState('Credit');
  const [saveCard, setSaveCard] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={24} color="#362fd9" />
      </TouchableOpacity>

      <Text style={styles.label}>Total Price</Text>
      <Text style={styles.amount}>GHS {fare}</Text>

      <Text style={styles.label}>Payment Method</Text>
      <View style={styles.methodRow}>
        {['PayPal', 'Credit', 'Wallet'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.methodButton, method === m && styles.selectedMethod]}
            onPress={() => setMethod(m)}
          >
            <Text style={method === m ? styles.selectedText : styles.unselectedText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput placeholder="Card Number" style={styles.input} keyboardType="numeric" />
      <View style={styles.row}>
        <TextInput placeholder="MM/YY" style={[styles.input, { flex: 1, marginRight: 10 }]} />
        <TextInput placeholder="CVV" style={[styles.input, { flex: 1 }]} secureTextEntry />
      </View>
      <TextInput placeholder="Card Holder Name" style={styles.input} />

      <View style={styles.saveRow}>
        <Text>Save card for future payments</Text>
        <Switch value={saveCard} onValueChange={setSaveCard} />
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() =>
          router.push({
            pathname: '/(root)/PaymentSummaryScreen',
            params: {
              pickup,
              destination,
              rideType,
              fare,
              distance,
              method,
            },
          })
        }
      >
        <Text style={styles.confirmText}>Proceed to confirm</Text>
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
  label: { fontSize: 16, color: '#888', marginTop: 20 },
  amount: { fontSize: 30, fontWeight: 'bold', color: '#362fd9', marginVertical: 10 },
  methodRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedMethod: {
    backgroundColor: '#362fd9',
    borderColor: '#362fd9',
  },
  selectedText: { color: '#fff', fontWeight: '600' },
  unselectedText: { color: '#444' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  row: { flexDirection: 'row', marginTop: 10 },
  saveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: '#362fd9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
