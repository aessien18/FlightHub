// app/flight-details.js (or flight-details.tsx)
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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${flight.flightNumber}` }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Flight {flight.flightNumber}</Text>
        <Text style={styles.detailText}>
          {flight.airline}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Departure</Text>
          <Text style={styles.detailText}>
            {flight.departure.airportName} ({flight.departure.iata})
          </Text>
          <Text style={styles.detailText}>
            Scheduled: {new Date(flight.departure.scheduledTime).toLocaleString()}
          </Text>
          {flight.departure.actualTime && (
            <Text style={styles.detailText}>
              Actual: {new Date(flight.departure.actualTime).toLocaleString()}
            </Text>
          )}
          {/* Add more departure details like terminal, gate if available from your API */}
          {flight.departure.terminal && <Text style={styles.detailText}>Terminal: {flight.departure.terminal}</Text>}
          {flight.departure.gate && <Text style={styles.detailText}>Gate: {flight.departure.gate}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Arrival</Text>
          <Text style={styles.detailText}>
            {flight.arrival.airportName} ({flight.arrival.iata})
          </Text>
          <Text style={styles.detailText}>
            Scheduled: {new Date(flight.arrival.scheduledTime).toLocaleString()}
          </Text>
          {flight.arrival.actualTime && (
            <Text style={styles.detailText}>
              Actual: {new Date(flight.arrival.actualTime).toLocaleString()}
            </Text>
          )}
          {/* Add more arrival details like terminal, gate, baggage claim if available from your API */}
          {flight.arrival.terminal && <Text style={styles.detailText}>Terminal: {flight.arrival.terminal}</Text>}
          {flight.arrival.gate && <Text style={styles.detailText}>Gate: {flight.arrival.gate}</Text>}
          {flight.arrival.baggageClaim && <Text style={styles.detailText}>Baggage Claim: {flight.arrival.baggageClaim}</Text>}
        </View>

        {/* Add more flight details here (e.g., status, aircraft, duration) */}
        {flight.status && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Status</Text>
            <Text style={styles.detailText}>{flight.status}</Text>
          </View>
        )}
        {flight.aircraftType && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Aircraft</Text>
            <Text style={styles.detailText}>{flight.aircraftType}</Text>
          </View>
        )}
        {/* Add duration, distance, etc. if your API provides it */}
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1E2333', // Slightly lighter dark background for sections
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B0B0B0',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3A425A',
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#D0D0D0',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FlightDetailsScreen;