// app/flight-details.js (or flight-details.tsx)
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const FlightDetailsScreen = () => {
  const params = useLocalSearchParams();
  const flight = params.flight ? JSON.parse(params.flight) : null;

  if (!flight) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No flight data found.</Text>
      </View>
    );
  }

  // Helper function to format time
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

  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'N/A';
    }
  };

  // Determine display status and color
  const getDisplayStatus = (status) => {
    if (status?.toLowerCase() === 'scheduled') {
      return 'On Time';
    }
    return status || 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time':
      case 'scheduled':
        return '#00C851'; // Green
      case 'delayed':
        return '#FFC107'; // Yellow/Orange
      case 'arrived':
        return '#607D8B'; // Grey
      case 'cancelled':
        return '#F44336'; // Red
      default:
        return '#B0B0B0'; // Default grey for unknown
    }
  };

  // Calculate time remaining until departure
  const calculateTimeRemaining = () => {
    if (!flight.scheduledDeparture) return null;
    const departureTime = new Date(flight.scheduledDeparture).getTime();
    const now = new Date().getTime();
    const diffMs = departureTime - now;

    if (diffMs < 0) {
      return { type: 'departed', value: 'Departed' };
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (hours > 0) {
      return { type: 'remaining', main: `${hours}h`, detail: `${minutes} MINUTES` };
    } else {
      return { type: 'remaining', main: `${minutes}m`, detail: 'MINUTES' };
    }
  };

  const timeRemaining = calculateTimeRemaining();


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${flight.flightNumber}` }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Flight Header Section */}
        <View style={styles.flightHeader}>
          <Text style={styles.flightNumberText}>{flight.flightNumber}</Text>
          <Text style={styles.flightRouteText}>{flight.departureCity} to {flight.arrivalCity}</Text>
          <Text style={styles.flightDateText}>{formatDate(flight.scheduledDeparture)}</Text>
        </View>

        {/* Operational Alert Section (MODIFIED for static content) */}
        {/* Display dynamic alert if data exists, otherwise a static one */}
        {(flight.delayReason || (flight.delayMinutes > 0 && flight.status?.toLowerCase() === 'delayed')) ? (
          <View style={styles.alertSection}>
            <Ionicons name="warning-outline" size={20} color="#FFC107" style={styles.alertIcon} />
            <View style={styles.alertTextContainer}>
              {flight.delayMinutes > 0 && flight.status?.toLowerCase() === 'delayed' && (
                <Text style={styles.alertTitle}>{flight.departureAirport ? flight.departureAirport.substring(0,3).toUpperCase() : 'Departure'} departures are running {flight.delayMinutes}m late.</Text>
              )}
              {flight.delayReason && (
                <Text style={styles.alertMessage}>{flight.delayReason}</Text>
              )}
              {!flight.delayReason && flight.delayMinutes > 0 && flight.status?.toLowerCase() === 'delayed' && (
                 <Text style={styles.alertMessage}>Monitoring for any impact on this flight.</Text>
              )}
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#B0B0B0" />
          </View>
        ) : (
          // Static Alert when no dynamic delay reason is available
          <View style={styles.alertSection}>
            <Ionicons name="information-circle-outline" size={20} color="#007AFF" style={styles.alertIcon} />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>Flight Information Update</Text>
              <Text style={styles.alertMessage}>
                Stay tuned for real-time updates. Check back closer to departure for gate, terminal, and potential delay information.
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#B0B0B0" />
          </View>
        )}


        {/* Departure Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="airplane-outline" size={24} color="#B0B0B0" style={styles.sectionIcon} />
            <Text style={styles.sectionHeader}>Departure</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTime}>{formatTime(flight.scheduledDeparture)}</Text>
            <View style={styles.airportInfo}>
              <Text style={styles.airportName}>
                {flight.departureAirport} ({flight.departureAirport ? flight.departureAirport.substring(0, 3).toUpperCase() : 'N/A'})
              </Text>
              <Text style={[styles.detailStatus, { color: getStatusColor(flight.status) }]}>
                {getDisplayStatus(flight.status)}
              </Text>
            </View>
          </View>
          {flight.actualDeparture && (
            <Text style={styles.subDetailText}>
              Actual: {new Date(flight.actualDeparture).toLocaleString()}
            </Text>
          )}
          {flight.departureGate && <Text style={styles.subDetailText}>Gate: {flight.departureGate}</Text>}
          {/* Assuming terminal is part of flight.departure or similar */}
          {/* {flight.departure.terminal && <Text style={styles.subDetailText}>Terminal: {flight.departure.terminal}</Text>} */}
        </View>

        {/* Arrival Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="airplane-landing" size={24} color="#B0B0B0" style={styles.sectionIcon} />
            <Text style={styles.sectionHeader}>Arrival</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTime}>{formatTime(flight.scheduledArrival)}</Text>
            <View style={styles.airportInfo}>
              <Text style={styles.airportName}>
                {flight.arrivalAirport} ({flight.arrivalAirport ? flight.arrivalAirport.substring(0, 3).toUpperCase() : 'N/A'})
              </Text>
              <Text style={[styles.detailStatus, { color: getStatusColor(flight.status) }]}>
                {getDisplayStatus(flight.status)}
              </Text>
            </View>
          </View>
          {flight.actualArrival && (
            <Text style={styles.subDetailText}>
              Actual: {new Date(flight.actualArrival).toLocaleString()}
            </Text>
          )}
          {flight.arrivalGate && <Text style={styles.subDetailText}>Gate: {flight.arrivalGate}</Text>}
          {/* {flight.arrival.terminal && <Text style={styles.subDetailText}>Terminal: {flight.arrival.terminal}</Text>} */}
          {/* {flight.arrival.baggageClaim && <Text style={styles.subDetailText}>Baggage Claim: {flight.arrival.baggageClaim}</Text>} */}
        </View>

        {/* Good to Know Section (MODIFIED for static content) */}
        {(flight.delayReason || flight.delayMinutes > 0) ? ( // Only show dynamic if data exists
            <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                    <Ionicons name="information-circle-outline" size={24} color="#B0B0B0" style={styles.sectionIcon} />
                    <Text style={styles.sectionHeader}>Good to Know</Text>
                </View>
                {flight.delayMinutes > 0 && (
                    <View style={styles.goodToKnowItem}>
                        <View style={styles.goodToKnowBullet} />
                        <Text style={styles.goodToKnowText}>
                            {flight.departureAirport ? flight.departureAirport.substring(0,3).toUpperCase() : 'Departure'} Departures:
                            <Text style={styles.goodToKnowDelayText}> {flight.delayMinutes}m delay</Text>
                        </Text>
                    </View>
                )}
                {flight.delayReason && (
                    <View style={styles.goodToKnowItem}>
                        <View style={styles.goodToKnowBullet} />
                        <Text style={styles.goodToKnowText}>{flight.delayReason}</Text>
                    </View>
                )}
            </View>
        ) : (
            // Static Good to Know section when no dynamic data is available
            <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                    <Ionicons name="information-circle-outline" size={24} color="#B0B0B0" style={styles.sectionIcon} />
                    <Text style={styles.sectionHeader}>Good to Know</Text>
                </View>
                <View style={styles.goodToKnowItem}>
                    <View style={styles.goodToKnowBullet} />
                    <Text style={styles.goodToKnowText}>
                        <Text style={styles.goodToKnowDelayText}>Pro Tip:</Text> Keep an eye on your gate number, as changes can happen.
                    </Text>
                </View>
                <View style={styles.goodToKnowItem}>
                    <View style={styles.goodToKnowBullet} />
                    <Text style={styles.goodToKnowText}>
                        Explore the app for more features like flight sharing and historical data!
                    </Text>
                </View>
            </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F111E', // Dark background
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 40, // Add some padding at the bottom for scrolling
  },
  flightHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  flightNumberText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 5,
  },
  flightRouteText: {
    fontSize: 20,
    color: '#B0B0B0',
    marginBottom: 5,
  },
  flightDateText: {
    fontSize: 16,
    color: '#888',
  },
  // NEW: Alert Section Styles
  alertSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2F4A', // Darker background for alerts
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderColor: '#FFC107', // Yellow/Orange border for dynamic alerts, or blue for static
  },
  alertIcon: {
    marginRight: 10,
  },
  alertTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 14,
    color: '#B0B0B0',
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1E2333', // Slightly lighter dark background for sections
    borderRadius: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3A425A',
    paddingBottom: 5,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B0B0B0',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTime: {
    fontSize: 36, // Larger time for prominence
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginRight: 15,
  },
  airportInfo: {
    flex: 1,
  },
  airportName: {
    fontSize: 18,
    color: '#D0D0D0',
    fontWeight: '600',
  },
  detailStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subDetailText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 5,
    marginLeft: 50, // Indent to align with other details
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  // NEW: Good to Know Section Styles
  goodToKnowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  goodToKnowBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B0B0B0',
    marginRight: 10,
    marginTop: 8, // Align with text baseline
  },
  goodToKnowText: {
    flex: 1,
    fontSize: 15,
    color: '#D0D0D0',
    lineHeight: 22,
  },
  goodToKnowDelayText: {
    fontWeight: 'bold',
    color: '#FFC107', // Highlight delay in yellow/orange
  },
});

export default FlightDetailsScreen;
