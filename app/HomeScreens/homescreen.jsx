import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const FLIGHT_OPTIONS = [
  { label: 'My Flights', icon: 'person-outline' },
  { label: "Friends' Flights", icon: 'people-outline' },
  { label: 'Today', icon: null },
];

const FlightCard = ({ flight, onPress }) => {
  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch (e) {
      console.error("Error formatting time:", timeString, e);
      return '--:--';
    }
  };

  const calculateDuration = () => {
    
    if (!flight.scheduledDeparture || !flight.scheduledArrival) {
        return { hours: '--', minutes: '--' };
    }
    const departure = new Date(flight.scheduledDeparture);
    const arrival = new Date(flight.scheduledArrival);

    
    if (isNaN(departure.getTime()) || isNaN(arrival.getTime())) {
        console.error("Invalid date string for duration calculation:", flight.scheduledDeparture, flight.scheduledArrival);
        return { hours: '--', minutes: '--' };
    }

    const diff = (arrival - departure) / (1000 * 60); 
    const hours = Math.floor(diff / 60);
    const minutes = Math.floor(diff % 60);
    return { hours, minutes };
  };

  const duration = calculateDuration();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(flight)}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.durationHours}>{duration.hours}h</Text>
          <Text style={styles.durationMinutes}>{duration.minutes} MINUTES</Text>
        </View>
        <View>
          <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
        </View>
        <View>
          <Text style={styles.status}>
            Status: <Text style={{ color: '#00C851' }}>{flight.status || 'On Time'}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.routeRow}>
        <Text style={styles.routeText}>
          {flight.departureAirport} to {flight.arrivalAirport}
        </Text>
      </View>

      <View style={styles.airportRow}>
        <View style={styles.airportBlock}>
          <Ionicons name="arrow-up-circle" size={16} color="#00C851" />
          <Text style={styles.airportCode}>DEP</Text>
          <Text style={styles.airportTime}>{formatTime(flight.scheduledDeparture)}</Text>
        </View>
        <View style={styles.airportBlock}>
          <Ionicons name="arrow-down-circle" size={16} color="#00C851" />
          <Text style={styles.airportCode}>ARR</Text>
          <Text style={styles.airportTime}>{formatTime(flight.scheduledArrival)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const sheetRef = useRef(null);
  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '30%', '60%', '90%'], []);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('My Flights');
  
  const [flights, setFlights] = useState([]);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const router = useRouter();

  const [visiblePolylines, setVisiblePolylines] = useState([]);
  const [visibleAirportMarkers, setVisibleAirportMarkers] = useState([]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const selectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  
  const searchFlights = async () => { 
    console.log('Search Flights in HomeScreen called (no longer driven by local input)');
    // Original search logic:
    // try {
    //   const response = await fetch(`http://10.40.32.131:8080/flight?number=${query}`); // `query` is undefined now
    //   const data = await response.json();
    //   console.log('Fetched raw data:', data);

    //   const fetchedFlights = Array.isArray(data) ? data : (data ? [data] : []);

    //   setFlights(prevFlights => {
    //     const uniqueFlightsMap = new Map();
    //     prevFlights.forEach(f => {
    //       const prevDepartureTime = f.scheduledDeparture ? new Date(f.scheduledDeparture).toISOString() : 'unknown-date-prev';
    //       const uniqueId = `${f.flightNumber}-${prevDepartureTime}`;
    //       uniqueFlightsMap.set(uniqueId, f);
    //     });

    //     fetchedFlights.forEach(f => {
    //       const fetchedDepartureTime = f.scheduledDeparture ? new Date(f.scheduledDeparture).toISOString() : 'unknown-date-fetched';
    //       const uniqueId = `${f.flightNumber}-${fetchedDepartureTime}`;
    //       uniqueFlightsMap.set(uniqueId, f);
    //     });

    //     const updatedFlights = Array.from(uniqueFlightsMap.values());
    //     console.log('Flights after deduplication and key normalization:', updatedFlights);
    //     return updatedFlights;
    //   });
    // } catch (error) {
    //   console.error('Fetch error:', error);
    //   setFlights([]);
    // }
  };

  const initialMapRegion = useMemo(() => ({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 120,
    longitudeDelta: 120,
  }), []);

  useEffect(() => {
    const newPolylines = [];
    const newMarkers = [];
    const allCoordsForFit = [];

    flights.forEach(flight => {
      const departureCoords = {
        latitude: flight.departureLatitude,
        longitude: flight.departureLongitude,
      };
      const arrivalCoords = {
        latitude: flight.arrivalLatitude,
        longitude: flight.arrivalLongitude,
      };

      // Ensure scheduledDeparture is a consistent string for key generation
      const departureTimeForId = flight.scheduledDeparture
        ? new Date(flight.scheduledDeparture).toISOString() // Converts to consistent ISO string
        : 'unknown-departure-time'; // Fallback if missing or invalid

      // Create a truly unique ID for each flight instance, incorporating scheduledDeparture
      const flightInstanceUniqueId = `${flight.flightNumber}-${departureTimeForId}`;

      console.log('Generating keys for flight:', flight.flightNumber, 'Scheduled Departure:', flight.scheduledDeparture, '-> Unique ID for Map:', flightInstanceUniqueId); // DEBUGGING

      if (
        departureCoords.latitude && departureCoords.longitude &&
        arrivalCoords.latitude && arrivalCoords.longitude
      ) {
        newPolylines.push({
          id: flightInstanceUniqueId + '-line',
          coordinates: [departureCoords, arrivalCoords],
        });

        newMarkers.push(
          {
            id: `${flightInstanceUniqueId}-dep`,
            latitude: departureCoords.latitude,
            longitude: departureCoords.longitude,
            title: flight.departureAirport,
            subtitle: 'Departure',
          },
          {
            id: `${flightInstanceUniqueId}-arr`,
            latitude: arrivalCoords.latitude,
            longitude: arrivalCoords.longitude,
            title: flight.arrivalAirport,
            subtitle: 'Arrival',
          }
        );
        allCoordsForFit.push(departureCoords, arrivalCoords);
      }
    });

    setVisiblePolylines(newPolylines);
    setVisibleAirportMarkers(newMarkers);

    if (mapRef.current && allCoordsForFit.length > 0) {
      setTimeout(() => {
        mapRef.current.fitToCoordinates(allCoordsForFit, {
          edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
          animated: true,
        });
        mapRef.current.animateCamera({
             center: {
                latitude: (allCoordsForFit[0].latitude + allCoordsForFit[allCoordsForFit.length -1].latitude) / 2,
                longitude: (allCoordsForFit[0].longitude + allCoordsForFit[allCoordsForFit.length -1].longitude) / 2,
            },
            pitch: 45,
            heading: 0,
            zoom: 2,
        }, { duration: 1000 });
      }, 500);
    } else if (mapRef.current && allCoordsForFit.length === 0) {
        mapRef.current.animateToRegion(initialMapRegion, 1000);
    }
  }, [flights, initialMapRegion]); // initialMapRegion is correctly included here


  const handleCardPress = useCallback((flight) => {
    router.push({
      pathname: 'HomeScreens/FlightDetails',
      params: { flight: JSON.stringify(flight) },
    });
  }, [router]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        style={styles.map}
        initialRegion={initialMapRegion}
      >
        {visiblePolylines.map((line) => (
          <Polyline
            key={line.id} // This key now uses the robust unique ID
            coordinates={line.coordinates}
            strokeWidth={3}
            strokeColor="#007AFF"
          />
        ))}

        {visibleAirportMarkers.map(marker => (
          <Marker
            key={marker.id} // This key now uses the robust unique ID
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.subtitle}
          >
            <View style={styles.customMarker}>
              <Ionicons name="airplane" size={20} color="white" />
              <Text style={styles.customMarkerText}>{marker.title ? marker.title.substring(0,3).toUpperCase() : ''}</Text>
            </View>
          </Marker>
        ))}

      </MapView>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        style={styles.bottomSheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Pressable style={styles.overlay} onPress={() => setShowDropdown(false)}>
            <View style={styles.topRowHeader}>
              <TouchableOpacity onPress={toggleDropdown} style={styles.todayContainer}>
                <View style={styles.todayRow}>
                  <Text style={styles.today}>{selectedOption}</Text>
                  <Ionicons
                    name={showDropdown ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#333"
                    style={styles.chevronIcon}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.rightButtons}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => setShareModalVisible(true)}
                >
                  <Ionicons name="share-outline" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/HomeScreens/profile')}
                  style={styles.profileButton}
                >
                  <Ionicons name="person-outline" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {showDropdown && (
              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={[styles.dropdown, Platform.OS === 'android' ? { elevation: 4 } : {}]}
              >
                {FLIGHT_OPTIONS.map(({ label, icon }) => (
                  <TouchableOpacity
                    key={label}
                    style={styles.dropdownItem}
                    onPress={() => selectOption(label)}
                  >
                    <View style={styles.checkmarkContainer}>
                      {selectedOption === label ? (
                        <Ionicons name="checkmark" size={16} color="#007AFF" />
                      ) : (
                        <View style={styles.emptyCheckmark} />
                      )}
                    </View>
                    <Text style={styles.dropdownText}>{label}</Text>
                    {icon ? (
                      <Ionicons name={icon} size={18} color="#666" />
                    ) : (
                      <View style={styles.dotIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}

            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                placeholder="Search to add flights"
                style={styles.searchInput}
                placeholderTextColor="#999"
               
                value={''}
                editable={false} 
                onPressIn={() => router.push('add-flight')} 
               
              />
              
            </View>

            {flights.length > 0 ? (
              <FlatList
                data={flights}
                keyExtractor={(item) => {
                    const normalizedDepartureTime = item.scheduledDeparture ? new Date(item.scheduledDeparture).toISOString() : 'no-date-flatlist';
                    return `${item.flightNumber}-${normalizedDepartureTime}`;
                }}
                renderItem={({ item }) => (
                  <FlightCard
                    flight={item}
                    onPress={handleCardPress}
                  />
                )}
                style={{ marginTop: 20 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <>
                {selectedOption === 'Today' && (
                  <View style={styles.noFlights}>
                    <Ionicons
                      name="calendar-outline"
                      size={48}
                      color="#ccc"
                      style={styles.emptyStateIcon}
                    />
                    <Text style={styles.noneToday}>None Today</Text>
                    <Text style={styles.noFlightsText}>No flights in the next 24 hours</Text>
                    <TouchableOpacity
                      style={styles.randomFlightButton}
                      onPress={() => console.log('View random flight')}
                    >
                      <Text style={styles.randomFlight}>View a Random Flight</Text>
                      <Ionicons name="shuffle-outline" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                )}
                {selectedOption === 'My Flights' && (
                  <View style={styles.noFlights}>
                    <Ionicons
                      name="airplane-outline"
                      size={48}
                      color="#ccc"
                      style={styles.emptyStateIcon}
                    />
                    <Text style={styles.noneToday}>Let&apos;s Fly Somewhere</Text>
                    <Text style={styles.noFlightsText}>
                      Tap the search bar to add your next flight
                    </Text>
                  </View>
                )}
                {selectedOption === "Friends' Flights" && (
                  <View style={styles.noFlights}>
                    <Ionicons
                      name="people-outline"
                      size={48}
                      color="#ccc"
                      style={styles.emptyStateIcon}
                    />
                    <Text style={styles.noneToday}>Add Friends&apos; Flights</Text>
                    <Text style={styles.noFlightsText}>
                      Use the search bar or add a FlightHub mate
                    </Text>
                    <TouchableOpacity
                      style={styles.airwiseMateButton}
                      onPress={() => console.log('Add FlightHub mate')}
                    >
                      <Text style={styles.randomFlight}>Add a FlightHub mate</Text>
                      <Ionicons name="person-add-outline" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </Pressable>
        </BottomSheetView>
      </BottomSheet>

      <Modal
        animationType="slide"
        transparent={true}
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sharingCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShareModalVisible(false)}
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            >
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>

            <Text style={styles.sharingTitle}>Sharing Options</Text>
            <Text style={styles.sharingSubtitle}>
              Choose only certain flights or add a FlightHub Friend who can see all your upcoming flights anytime – for free.
            </Text>

            <TouchableOpacity style={styles.chooseFlightsButton}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.chooseFlightsText}>Choose Flights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFriendButton}>
              <Ionicons name="people-outline" size={20} color="#007AFF" style={{ marginRight: 8 }} />
              <Text style={styles.addFriendText}>Add FlightHub Friend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  contentContainer: { flex: 1 },
  overlay: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  todayContainer: { padding: 5 },
  todayRow: { flexDirection: 'row', alignItems: 'center' },
  chevronIcon: { marginLeft: 8 },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  checkmarkContainer: { width: 20, alignItems: 'center' },
  emptyCheckmark: { width: 16, height: 16 },
  dropdownText: { flex: 1, fontSize: 16, marginLeft: 12, color: '#000' },
  dotIcon: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#007AFF' },
  topRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightButtons: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  shareButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: '#90EE90',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: { fontSize: 22, fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, padding: 10, fontSize: 16, color: '#333' },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  durationHours: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  durationMinutes: {
    fontSize: 12,
    color: '#999',
    letterSpacing: 1,
    marginTop: -4,
  },
  flightNumber: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  routeRow: {
    marginBottom: 12,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  airportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airportBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  airportCode: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#333',
  },
  airportTime: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#00C851',
  },
  noFlights: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  noneToday: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  noFlightsText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  randomFlightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  randomFlight: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  airwiseMateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sharingCard: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  sharingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111',
    alignSelf: 'flex-start',
  },
  sharingSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  chooseFlightsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 12,
    justifyContent: 'center',
  },
  chooseFlightsText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F6FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
  },
  addFriendText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  customMarker: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    padding: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  customMarkerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});