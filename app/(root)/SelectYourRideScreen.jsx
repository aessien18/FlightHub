import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const rideOptions = [
  {
    id: 'uber',
    title: 'Uber',
    image: require('../../assets/car1.jpeg'),
    multiplier: 1,
  },
  {
    id: 'uberX',
    title: 'Uber X',
    image: require('../../assets/car1.jpeg'),
    multiplier: 1.5,
  },
  {
    id: 'uberXL',
    title: 'Uber XL',
    image: require('../../assets/car1.jpeg'),
    multiplier: 2,
  },
];

const PRICE_PER_KM = 5;
const MIN_FARE = 20;

export default function SelectYourRideScreen() {
  const router = useRouter();
  const { distance } = useLocalSearchParams();
  const numericDistance = parseFloat(distance || '0');
  const [selectedId, setSelectedId] = useState(null);

  const calculatePrice = (multiplier) => {
    const base = Math.max(numericDistance * PRICE_PER_KM, MIN_FARE);
    return Math.round(base * multiplier);
  };

  const handleChooseRide = () => {
    if (!selectedId) {
      Alert.alert('Missing Selection', 'Please select a ride option');
      return;
    }

    const selectedRide = rideOptions.find((ride) => ride.id === selectedId);
    const fare = calculatePrice(selectedRide.multiplier);

    // Pass the ride and pricing info to the Payment screen
    router.push({
      pathname: '/(root)/PaymentMethodScreen',
      params: {
        pickup: 'Kumasi, Pankrono',
        destination: 'Kumasi, Old Tafo',
        rideType: selectedRide.title,
        fare: fare.toString(),
        distance: numericDistance.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select your Ride</Text>

      <FlatList
        data={rideOptions}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => {
          const isSelected = selectedId === item.id;
          return (
            <TouchableOpacity
              style={[styles.rideRow, isSelected && styles.selectedRide]}
              onPress={() => setSelectedId(item.id)}
              activeOpacity={0.85}
            >
              <Image source={item.image} style={styles.carImage} />
              <View style={styles.rideInfo}>
                <Text style={styles.rideTitle}>{item.title}</Text>
                <Text style={styles.rideDistance}>
                  {numericDistance ? `${numericDistance.toFixed(2)} km` : '... km'}
                </Text>
              </View>
              <Text style={styles.price}>GHS {calculatePrice(item.multiplier)}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.chooseButton} onPress={handleChooseRide}>
        <Text style={styles.chooseText}>Choose Car</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedRide: {
    borderColor: '#362fd9',
    backgroundColor: '#eef1ff',
  },
  carImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 15,
  },
  rideInfo: {
    flex: 1,
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  rideDistance: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  chooseButton: {
    backgroundColor: '#362fd9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  chooseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

