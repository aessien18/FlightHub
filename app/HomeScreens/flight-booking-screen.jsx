import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, ActivityIndicator, Alert, Animated, PanResponder, Modal, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function Layout() {
  // Modal and toast state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const toastAnim = useRef(new Animated.Value(0)).current;
  // Show toast/snackbar
  const showToast = React.useCallback((msg) => {
    setToastMsg(msg);
    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 1500);
    });
  }, [toastAnim]);
  // Swipe-to-delete state
  const swipeAnim = useRef([]);
  
  const panResponders = useRef([]);
  const [from, setFrom] = useState('Kumasi');
  const [to, setTo] = useState('London');
  const fromInputRef = React.useRef(null);
  const toInputRef = React.useRef(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const countryList = [
    'Kumasi', 'London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Accra', 'Berlin', 'Sydney', 'Toronto', 'Johannesburg', 'Cairo', 'Delhi', 'Moscow', 'Rio de Janeiro', 'Los Angeles', 'Rome', 'Madrid', 'Istanbul', 'Singapore', 'Bangkok', 'Hong Kong', 'Beijing', 'Seoul', 'Lagos', 'Nairobi', 'Cape Town', 'Melbourne', 'Brussels', 'Zurich', 'Stockholm', 'Oslo', 'Helsinki', 'Copenhagen', 'Lisbon', 'Budapest', 'Vienna', 'Prague', 'Warsaw', 'Athens', 'Dublin', 'Edinburgh', 'Venice', 'Munich', 'Frankfurt', 'Geneva', 'Barcelona', 'Valencia', 'Marseille', 'Nice', 'Lyon', 'Florence', 'Naples', 'Palermo', 'Turin', 'Milan', 'Venice', 'Verona', 'Bologna', 'Seville', 'Granada', 'Bilbao', 'Malaga', 'Santander', 'Vigo', 'Porto', 'Braga', 'Coimbra', 'Aveiro', 'Faro', 'Evora', 'Setubal', 'Leiria', 'Guimaraes', 'Viseu', 'Castelo Branco', 'Beja', 'Braganca', 'Guarda', 'Vila Real', 'Viana do Castelo', 'Madeira', 'Azores'
  ];
  const [departure, setDeparture] = useState('JAN 26 2025');
  const [returnDate, setReturnDate] = useState('FEB 15 2025');
  const [isDeparturePickerVisible, setDeparturePickerVisible] = useState(false);
  const [isReturnPickerVisible, setReturnPickerVisible] = useState(false);
  const [flights, setFlights] = useState([
    { from: 'Kumasi', to: 'London', date: 'Jan 26, 2025', status: 'Confirmed' },
    { from: 'London', to: 'Kumasi', date: 'Feb 15, 2025', status: 'Confirmed' },
    { from: 'New York', to: 'Tokyo', date: 'Aug 10, 2025', status: 'Pending' },
    { from: 'Paris', to: 'Dubai', date: 'Sep 2, 2025', status: 'Confirmed' },
  ]);

  // Initialize swipe animation and pan responders for each flight
  React.useEffect(() => {
    swipeAnim.current = flights.map(() => new Animated.Value(0));
    panResponders.current = flights.map((_, idx) =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10,
        onPanResponderMove: (evt, gestureState) => {
          swipeAnim.current[idx].setValue(gestureState.dx);
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx < -120) {
            // Swipe left to delete
            Animated.timing(swipeAnim.current[idx], {
              toValue: -400,
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              handleDeleteFlight(idx);
            });
          } else {
            Animated.spring(swipeAnim.current[idx], { 
              toValue: 0,
              useNativeDriver: false,
            }).start();
          }
        },
      })
    );
  }, [flights, handleDeleteFlight]);
  const [isLoading, setIsLoading] = useState(false);

  const showDeparturePicker = () => setDeparturePickerVisible(true);
  const hideDeparturePicker = () => setDeparturePickerVisible(false);
  const handleDepartureConfirm = (date) => {
    setDeparture(formatDate(date));
    hideDeparturePicker();
  };

  const showReturnPicker = () => setReturnPickerVisible(true);
  const hideReturnPicker = () => setReturnPickerVisible(false);
  const handleReturnConfirm = (date) => {
    setReturnDate(formatDate(date));
    hideReturnPicker();
  };

  function formatDate(date) {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  }

  function handleAddFlight() {
    if (from && to && departure) {
      Alert.alert(
        'Add Flight',
        `Add flight from ${from} to ${to} on ${departure}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add', onPress: () => confirmAddFlight() },
        ]
      );
    }
  }

  function confirmAddFlight() {
    setIsLoading(true);
    setTimeout(() => {
      // Add flight as pending
      setFlights(prev => {
        const newFlights = [
          ...prev,
          { from, to, date: departure, status: 'Pending' },
        ];
        // Automatically confirm the last flight after a short delay
        setTimeout(() => {
          setFlights(flights => flights.map((f, i) => i === newFlights.length - 1 ? { ...f, status: 'Confirmed' } : f));
        }, 1200);
        return newFlights;
      });
      setFrom("");
      setTo("");
      setIsLoading(false);
    }, 1200);
  }

  // Confirm a pending flight by index
  function handleConfirmFlight(idx) {
    setFlights(flights => flights.map((f, i) => i === idx ? { ...f, status: 'Confirmed' } : f));
  }

  const handleDeleteFlight = React.useCallback((idx) => {
    setFlights(flights => flights.filter((_, i) => i !== idx));
    showToast("Flight deleted");
  }, [showToast]);
  // Share flight
  async function handleShareFlight(flight) {
    try {
      await Share.share({
        message: `Flight from ${flight.from} to ${flight.to} on ${flight.date}`,
      });
      showToast("Flight shared");
    } catch (_) {
      showToast("Share failed");
    }
  }

  // Helper for filtering country suggestions
  function filterCountries(query) {
    if (!query) return [];
    return countryList.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }

  function handleFromChange(text) {
    setFrom(text);
    setFromSuggestions(filterCountries(text));
    setShowFromDropdown(true);
    setShowToDropdown(false);
  }
  function handleToChange(text) {
    setTo(text);
    setToSuggestions(filterCountries(text));
    setShowToDropdown(true);
    setShowFromDropdown(false);
  }
  function selectFromCountry(country) {
    setFrom(country);
    setFromSuggestions([]);
    setShowFromDropdown(false);
    // Force blur to close keyboard and ensure single tap works
    if (fromInputRef.current) {
      fromInputRef.current.blur();
    }
  }
  function selectToCountry(country) {
    setTo(country);
    setToSuggestions([]);
    setShowToDropdown(false);
    // Force blur to close keyboard and ensure single tap works
    if (toInputRef.current) {
      toInputRef.current.blur();
    }
  }

  // Context-aware floating button logic
  const isSearching = showFromDropdown || showToDropdown;

  // Summary card data
  const totalFlights = flights.length;
  // Find next flight by soonest date (assuming date format is 'Jan 26, 2025')
  function parseDate(str) {
    // Accepts 'Jan 26, 2025' or 'JAN 26 2025'
    const d = new Date(str.replace(/,/g, ''));
    return isNaN(d) ? null : d;
  }
  const sortedFlights = flights
    .map(f => ({ ...f, parsedDate: parseDate(f.date) }))
    .filter(f => f.parsedDate)
    .sort((a, b) => a.parsedDate - b.parsedDate);
  const nextFlight = sortedFlights.length > 0 ? sortedFlights[0] : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Gradient Header */}
        <LinearGradient colors={["#A18CD1", "#FBC2EB"]} style={styles.gradientHeader}>
          <View style={styles.headerContentRow}>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitleNew}>Book Your Next Flight</Text>
              <Text style={styles.headerSubtitleNew}>Fast, Easy & Secure</Text>
            </View>
            <View style={styles.avatarImgBox}>
               <Image source={require('../../assets/worldmap.png')} style={styles.avatarImgNew} />
            </View>
          </View>
        </LinearGradient>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Flight Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Total Flights</Text>
              <Text style={styles.summaryValue}>{totalFlights}</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Next Flight</Text>
              {nextFlight ? (
                <Text style={styles.summaryValue}>{nextFlight.from} → {nextFlight.to}</Text>
              ) : (
                <Text style={styles.summaryValue}>None</Text>
              )}
              {nextFlight ? (
                <Text style={styles.summaryDate}>{nextFlight.date}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* Card Section */}
        <View style={[styles.cardBox, {position: 'relative', zIndex: 1 } ]}>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="airplane-takeoff" size={22} color="#A18CD1" style={styles.inputIconNew} />
            <View style={{ flex: 1 }}>
              <TextInput
                ref={fromInputRef}
                style={styles.inputNew}
                value={from}
                onChangeText={handleFromChange}
                placeholder="From"
                placeholderTextColor="#b3a8ceff"
                onFocus={() => setShowFromDropdown(true)}
                onBlur={() => setTimeout(() => setShowFromDropdown(false), 150)}
              />
              {showFromDropdown && fromSuggestions.length > 0 && (
                <View style={styles.dropdownBox}>
                  {fromSuggestions.map((country, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.dropdownItem}
                      activeOpacity={0.6}
                      onPress={() => {
                        selectFromCountry(country);
                      }}
                    >
                      <Text style={styles.dropdownText}>{country}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="airplane-landing" size={22} color="#A18CD1" style={styles.inputIconNew} />
            <View style={{ flex: 1 }}>
              <TextInput
                ref={toInputRef}
                style={styles.inputNew}
                value={to}
                onChangeText={handleToChange}
                placeholder="To"
                placeholderTextColor="#b0a3cfff"
                onFocus={() => setShowToDropdown(true)}
                onBlur={() => setTimeout(() => setShowToDropdown(false), 150)}
              />
              {showToDropdown && toSuggestions.length > 0 && (
                <View style={styles.dropdownBox}>
                  {toSuggestions.map((country, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.dropdownItem}
                      activeOpacity={0.6}
                      onPress={() => {
                        selectToCountry(country);
                      }}
                    >
                      <Text style={styles.dropdownText}>{country}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.datePickersRow}>
            <TouchableOpacity style={styles.datePickerBox} onPress={showDeparturePicker}>
              <Ionicons name="calendar" size={18} color="#A18CD1" />
              <Text style={styles.dateLabelNew}>Departure</Text>
              <Text style={styles.dateValueNew}>{departure}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDeparturePickerVisible}
              mode="date"
              onConfirm={handleDepartureConfirm}
              onCancel={hideDeparturePicker}
            />
            <TouchableOpacity style={styles.datePickerBox} onPress={showReturnPicker}>
              <Ionicons name="calendar" size={18} color="#A18CD1" />
              <Text style={styles.dateLabelNew}>Return</Text>
              <Text style={styles.dateValueNew}>{returnDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isReturnPickerVisible}
              mode="date"
              onConfirm={handleReturnConfirm}
              onCancel={hideReturnPicker}
            />
          </View>
        </View>

        {/* Upcoming Flights Section */}
        <View style={styles.upcomingSection}>
          <Text style={styles.upcomingTitle}>Upcoming Flights</Text>
          <View style={styles.upcomingList}>
            {flights.map((flight, idx) => {
              // Airline URLs mapping
              const airlineUrls = {
                'London': 'https://www.britishairways.com/',
                'Kumasi': 'https://www.africa-worldairlines.com/',
                'New York': 'https://www.delta.com/',
                'Tokyo': 'https://www.jal.co.jp/',
                'Paris': 'https://www.airfrance.com/',
                'Dubai': 'https://www.emirates.com/',
                'Accra': 'https://www.africa-worldairlines.com/',
                'Berlin': 'https://www.lufthansa.com/',
                'Sydney': 'https://www.qantas.com/',
                'Toronto': 'https://www.aircanada.com/',
                'Johannesburg': 'https://www.flysaa.com/',
                'Cairo': 'https://www.egyptair.com/',
                'Delhi': 'https://www.airindia.in/',
                'Moscow': 'https://www.aeroflot.ru/',
                'Rio de Janeiro': 'https://www.voegol.com.br/',
                'Los Angeles': 'https://www.united.com/',
                'Rome': 'https://www.alitalia.com/',
                'Madrid': 'https://www.iberia.com/',
                'Istanbul': 'https://www.turkishairlines.com/',
                'Singapore': 'https://www.singaporeair.com/',
                'Bangkok': 'https://www.thaiairways.com/',
                'Hong Kong': 'https://www.cathaypacific.com/',
                'Beijing': 'https://www.airchina.com/',
                'Seoul': 'https://www.koreanair.com/',
                'Lagos': 'https://www.flyairpeace.com/',
                'Nairobi': 'https://www.kenya-airways.com/',
                'Cape Town': 'https://www.flysaa.com/',
                'Melbourne': 'https://www.qantas.com/',
                'Brussels': 'https://www.brusselsairlines.com/',
                'Zurich': 'https://www.swiss.com/',
                'Stockholm': 'https://www.flysas.com/',
                'Oslo': 'https://www.norwegian.com/',
                'Helsinki': 'https://www.finnair.com/',
                'Copenhagen': 'https://www.flysas.com/',
                'Lisbon': 'https://www.flytap.com/',
                'Budapest': 'https://www.wizzair.com/',
                'Vienna': 'https://www.austrian.com/',
                'Prague': 'https://www.csa.cz/',
                'Warsaw': 'https://www.lot.com/',
                'Athens': 'https://www.aegeanair.com/',
                'Dublin': 'https://www.aerlingus.com/',
                'Edinburgh': 'https://www.britishairways.com/',
                'Venice': 'https://www.alitalia.com/',
                'Munich': 'https://www.lufthansa.com/',
                'Frankfurt': 'https://www.lufthansa.com/',
                'Geneva': 'https://www.swiss.com/',
                'Barcelona': 'https://www.vueling.com/',
                'Valencia': 'https://www.iberia.com/',
                'Marseille': 'https://www.airfrance.com/',
                'Nice': 'https://www.airfrance.com/',
                'Lyon': 'https://www.airfrance.com/',
                'Florence': 'https://www.alitalia.com/',
                'Naples': 'https://www.alitalia.com/',
                'Palermo': 'https://www.alitalia.com/',
                'Turin': 'https://www.alitalia.com/',
                'Milan': 'https://www.alitalia.com/',
                'Verona': 'https://www.alitalia.com/',
                'Bologna': 'https://www.alitalia.com/',
                'Seville': 'https://www.iberia.com/',
                'Granada': 'https://www.iberia.com/',
                'Bilbao': 'https://www.iberia.com/',
                'Malaga': 'https://www.iberia.com/',
                'Santander': 'https://www.iberia.com/',
                'Vigo': 'https://www.iberia.com/',
                'Porto': 'https://www.flytap.com/',
                'Braga': 'https://www.flytap.com/',
                'Coimbra': 'https://www.flytap.com/',
                'Aveiro': 'https://www.flytap.com/',
                'Faro': 'https://www.flytap.com/',
                'Evora': 'https://www.flytap.com/',
                'Setubal': 'https://www.flytap.com/',
                'Leiria': 'https://www.flytap.com/',
                'Guimaraes': 'https://www.flytap.com/',
                'Viseu': 'https://www.flytap.com/',
                'Castelo Branco': 'https://www.flytap.com/',
                'Beja': 'https://www.flytap.com/',
                'Braganca': 'https://www.flytap.com/',
                'Guarda': 'https://www.flytap.com/',
                'Vila Real': 'https://www.flytap.com/',
                'Viana do Castelo': 'https://www.flytap.com/',
                'Madeira': 'https://www.flytap.com/',
                'Azores': 'https://www.flytap.com/',
              };
              const airlineUrl = airlineUrls[flight.to] || airlineUrls[flight.from] || 'https://www.google.com/flights';
              const cardContent = (
                <View style={styles.flightCardRow}>
                  <MaterialCommunityIcons name="airplane" size={28} color="#A18CD1" />
                  <Text style={styles.flightRoute}>{flight.from} → {flight.to}</Text>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFlight(idx)}>
                    <Ionicons name="trash" size={20} color="#FF4C4C" />
                  </TouchableOpacity>
                </View>
              );
        return (
          <Animated.View
            key={idx}
            style={[styles.flightCard, { transform: [{ translateX: swipeAnim.current[idx] || 0 }] }]}
            {...(panResponders.current[idx] ? panResponders.current[idx].panHandlers : {})}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (flight.status === 'Confirmed' && airlineUrl) {
                  import('react-native').then(({ Linking }) => {
                    Linking.openURL(airlineUrl);
                  });
                }
              }}
              onLongPress={() => {
                setSelectedFlight(flight);
                setModalVisible(true);
              }}
            >
              {cardContent}
              <Text style={styles.flightDate}>{flight.date}</Text>
              <View style={[styles.statusBadge, flight.status === 'Confirmed' ? styles.statusConfirmed : styles.statusPending]}>
                <Text style={[styles.statusBadgeText, { color: flight.status === 'Confirmed' ? '#4BB543' : '#FFA500' }]}>{flight.status}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
          </View>
        </View>

        {/* Flight Details Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(161,140,209,0.18)' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 28, width: 320, elevation: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#A18CD1', marginBottom: 10 }}>Flight Details</Text>
              {selectedFlight && (
                <View style={{}}>
                  <Text style={{ fontSize: 16, color: '#6C63FF', marginBottom: 6 }}>From: {selectedFlight.from}</Text>
                  <Text style={{ fontSize: 16, color: '#6C63FF', marginBottom: 6 }}>To: {selectedFlight.to}</Text>
                  <Text style={{ fontSize: 15, color: '#444', marginBottom: 6 }}>Date: {selectedFlight.date}</Text>
                  <Text style={{ fontSize: 15, color: selectedFlight.status === 'Confirmed' ? '#4BB543' : '#FFA500', marginBottom: 12 }}>Status: {selectedFlight.status}</Text>
                  <TouchableOpacity style={styles.confirmButton} onPress={() => { setModalVisible(false); showToast('Flight confirmed!'); handleConfirmFlight(flights.findIndex(f => f === selectedFlight)); }}>
                    <Text style={styles.confirmButtonText}>Confirm Flight</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.confirmButton, { backgroundColor: '#6C63FF', marginTop: 8 }]} onPress={() => { setModalVisible(false); handleShareFlight(selectedFlight); }}>
                    <Text style={styles.confirmButtonText}>Share Flight</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity style={[styles.confirmButton, { backgroundColor: '#FF4C4C', marginTop: 8 }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.confirmButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Toast/Snackbar */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            alignItems: 'center',
            opacity: toastAnim,
            transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
          }}
          pointerEvents="none"
        >
          {toastMsg ? (
            <View style={{ backgroundColor: '#A18CD1', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 18, elevation: 6 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>{toastMsg}</Text>
            </View>
          ) : null}
        </Animated.View>
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fabButton} onPress={handleAddFlight} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : isSearching ? (
          <Ionicons name="search" size={28} color="#fff" />
        ) : (
          <Ionicons name="add" size={28} color="#fff" />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  confirmButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    backgroundColor: '#A18CD1',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 10,
    elevation: 2,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    marginTop: -24,
    marginBottom: 18,
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#A18CD1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#A18CD1',
    marginBottom: 8,
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 18,
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#A18CD1',
    marginBottom: 2,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 2,
  },
  summaryDate: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F6FB',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  gradientHeader: {
    height: 180,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    elevation: 6,
    shadowColor: '#A18CD1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  headerTextCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  avatarImgBox: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  avatarImgNew: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 0,
    marginTop: 0,
  },
  headerTitleNew: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  headerSubtitleNew: {
    color: '#FBC2EB', // lighter pink for contrast
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 8,
    textShadowColor: '#A18CD1',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardBox: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    marginTop: -40,
    borderRadius: 20,
    padding: 22,
    elevation: 5,
    shadowColor: '#A18CD1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F6FB',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E0D4FD',
  },
  inputIconNew: {
    marginRight: 8,
  },
  inputNew: {
    flex: 1,
    fontSize: 16,
    color: '#6C63FF',
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  datePickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  datePickerBox: {
    flex: 1,
    backgroundColor: '#F7F6FB',
    borderRadius: 12,
    marginHorizontal: 5,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0D4FD',
    elevation: 2,
    shadowColor: '#E0D4FD',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    zIndex: 1,
  },
  dropdownBox: {
    position: 'absolute',
    top: 38,
    left: 20,
    right: 70,
    backgroundColor: '#F3F0FF',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#A18CD1',
    elevation: 4,
    shadowColor: '#A18CD1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    zIndex: 9999,
    maxHeight: 5000,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#E0D4FD',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 17,
    color: '#6C63FF',
    letterSpacing: 1,
  },
  dateLabelNew: {
    fontSize: 12,
    color: '#A18CD1',
    letterSpacing: 1,
    marginTop: 4,
  },
  dateValueNew: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    color: '#6C63FF',
  },
  upcomingSection: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 90,
  },
  upcomingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A18CD1',
    marginBottom: 10,
    letterSpacing: 1,
  },
  upcomingList: {
    gap: 12,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    shadowColor: '#A18CD1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    marginBottom: 8,
  },
  flightCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#FFF0F0',
  },
  flightRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginLeft: 10,
  },
  flightDate: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  flightStatus: {
    display: 'none', // replaced by badge
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 2,
    borderWidth: 1,
  },
  statusConfirmed: {
    backgroundColor: '#E8F8EF',
    borderColor: '#4BB543',
  },
  statusPending: {
    backgroundColor: '#FFF7E6',
    borderColor: '#FFA500',
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  fabButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#A18CD1',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#A18CD1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  fabButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  });

export default Layout;
