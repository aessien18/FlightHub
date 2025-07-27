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
          source={require('../../assets/images/car1.png')}
          style={styles.image}
        />

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your ride is on the way 🚗</Text>

        <View style={styles.detailBox}>
          <Text style={styles.label}>Pickup:</Text>
          <Text style={styles.value}>{pickup}</Text>

          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.value}>{destination}</Text>

          <Text style={styles.label}>Ride Type:</Text>
          <Text style={styles.value}>{rideType}</Text>

          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{distance} km</Text>

          <Text style={styles.label}>Fare:</Text>
          <Text style={styles.value}>GHS {fare}</Text>
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
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2e2e2e',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  detailBox: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: '600',
    color: '#444',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  doneButton: {
    backgroundColor: '#362fd9',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  doneText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

