import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const PRICE_PER_KM = 5.0;
const MIN_FARE = 20.0;

const places = {
  home: {
    title: 'Home',
    subtitle: 'Kumasi, Pankrono',
    coords: { latitude: 6.725, longitude: -1.620 },
  },
  work: {
    title: 'Work',
    subtitle: 'Kumasi, Old Tafo',
    coords: { latitude: 6.707, longitude: -1.596 },
  },
};

export default function CarRentalScreen() {
  const [MapView, setMapView] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState({ home: null, work: null });

  useEffect(() => {
    if (Platform.OS !== 'web') {
      import('react-native-maps').then((module) => {
        setMapView(() => module.default);
      });
    }

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      const dists = {
        home: getDistance(location.coords, places.home.coords),
        work: getDistance(location.coords, places.work.coords),
      };

      setDistances(dists);
    })();
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={[styles.map, styles.webFallback]}>
          <Text style={styles.webText}>Map not supported on web</Text>
        </View>
        <BottomPanel distances={distances} />
      </View>
    );
  }

  if (!MapView) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 6.7076,
          longitude: userLocation?.longitude || -1.6163,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      />
      <BottomPanel distances={distances} />
    </View>
  );
}

function getDistance(loc1, loc2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.latitude)) *
      Math.cos(toRad(loc2.latitude)) *
      Math.sin(dLon / 2) ** 2;

  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2));
}

function BottomPanel({ distances }) {
  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState('home');

  const calculateFare = (km) => {
    if (!km) return '...';
    return `GHS ${Math.max(km * PRICE_PER_KM, MIN_FARE).toFixed(2)}`;
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.greeting}>Good Morning</Text>

      <TextInput
        style={styles.input}
        placeholder="Where to"
        placeholderTextColor="#aaa"
      />

      {['home', 'work'].map((key) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.placeRow,
            selectedPlace === key && { backgroundColor: '#f0f0ff', borderRadius: 10 },
          ]}
          onPress={() => setSelectedPlace(key)}
        >
          <Icon
            name={key === 'home' ? 'home-outline' : 'briefcase-outline'}
            size={24}
            color="#777"
          />
          <View style={styles.placeInfo}>
            <Text style={styles.placeTitle}>
              {places[key].title} ({distances[key] ?? '...'} km)
            </Text>
            <Text style={styles.placeSub}>{places[key].subtitle}</Text>
            <Text style={styles.fareText}>{calculateFare(distances[key])}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          router.push({
            pathname: '/SelectYourRideScreen',
            params: {
              selectedPlace,
              distance: distances[selectedPlace],
              fare: calculateFare(distances[selectedPlace]),
            },
          })
        }
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  webText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
  },
  placeInfo: {
    marginLeft: 10,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  placeSub: {
    fontSize: 13,
    color: '#888',
  },
  fareText: {
    fontSize: 14,
    color: '#362fd9',
    marginTop: 4,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#362fd9',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
