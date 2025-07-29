import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { pickup, destination, rideType, fare, distance } = useLocalSearchParams();

  const handleDone = () => {
    router.replace('/'); // Replace stack to prevent going back to payment
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image
          // Corrected path: Go up two directories from 'app/(root)/' to reach the project root,
          // then go down into the 'assets' folder.
          source={require('../../assets/car1.jpeg')}
          style={styles.image}
        />

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your ride is on the way 🚗</Text>

        <View style={styles.detailBox}>
          <Text style={styles.label}>Pickup:</Text>
          <Text style={styles.value}>{pickup || 'N/A'}</Text>

          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.value}>{destination || 'N/A'}</Text>

          <Text style={styles.label}>Ride Type:</Text>
          <Text style={styles.value}>{rideType || 'N/A'}</Text>

          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{distance ? `${distance} km` : 'N/A'}</Text>

          <Text style={styles.label}>Fare:</Text>
          <Text style={styles.value}>{fare ? `GHS ${fare}` : 'N/A'}</Text>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 90,
    borderColor: '#eee',
    borderWidth: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  detailBox: {
    width: '90%',
    borderRadius: 15,
    padding: 25,
    backgroundColor: '#f0f8ff',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
    fontSize: 15,
  },
  value: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  doneText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
