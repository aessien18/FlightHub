import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Keyboard, // Import ActivityIndicator for loading spinner
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Dummy Data for Suggestions (can keep as is for autocomplete) ---
const dummySuggestions = [
    { id: 'airline-awa', type: 'airline', name: 'Africa World Airlines', code: 'AW', iata: 'AWA' },
    { id: 'airline-vne', type: 'airline', name: 'Venezolana', code: 'AW', iata: 'VNE' },
    { id: 'airport-acc', type: 'airport', name: 'Kotoka Intl Airport', code: 'ACC', city: 'Accra', country: 'Ghana' },
    { id: 'airport-tkd', type: 'airport', name: 'Takoradi Airport', code: 'TKD', city: 'Takoradi', country: 'Ghana' },
    { id: 'airline-delta', type: 'airline', name: 'Delta Airlines', code: 'DL', iata: 'DAL' },
    { id: 'airport-jfk', type: 'airport', name: 'John F. Kennedy Intl', code: 'JFK', city: 'New York', country: 'USA' },
    { id: 'flight-ba245', type: 'flight_number', number: 'BA245', airline: 'British Airways' },
    { id: 'flight-klm102', type: 'flight_number', number: 'KLM102', airline: 'KLM Royal Dutch Airlines' },
];
// --- End Dummy Data ---

export default function AddFlightModal() {
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New: Loading state
    const [error, setError] = useState(null);       // New: Error state

    // Filter suggestions based on search text
    const filteredSuggestions = useMemo(() => {
        if (!searchText) {
            return [];
        }
        const lowerSearchText = searchText.toLowerCase();
        return dummySuggestions.filter(
            (item) =>
                item.name?.toLowerCase().includes(lowerSearchText) ||
                item.code?.toLowerCase().includes(lowerSearchText) ||
                item.iata?.toLowerCase().includes(lowerSearchText) ||
                item.city?.toLowerCase().includes(lowerSearchText) ||
                item.country?.toLowerCase().includes(lowerSearchText) ||
                item.number?.toLowerCase().includes(lowerSearchText)
        );
    }, [searchText]);


    // --- MODIFIED Function: Perform the "Search" with Backend Call ---
    const performSearch = async (query) => {
        Keyboard.dismiss(); // Hide keyboard after search
        setError(null);     // Clear previous errors
        setSearchResults([]); // Clear previous results

        if (!query) {
            return;
        }

        setIsLoading(true); 

        try {
            
            const response = await fetch(`http://192.168.137.202:8080/flight?number=${query}`);

            if (!response.ok) { 
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log('Fetched from backend:', data);

            // Your existing logic to handle single object or array response
            const fetchedFlights = Array.isArray(data) ? data : (data ? [data] : []);

            // Filter flights by date if your backend doesn't do it or you want client-side filtering
            // This is a simple example; you might need more complex date matching depending on your backend's date format
            const filteredByDate = fetchedFlights.filter(flight => {
                // Assuming flight.scheduledDeparture or a similar field exists and is parsable by Date
                // You might need to adjust this based on your backend's date format
                const flightDepartureDate = new Date(flight.scheduledDeparture);
                return flightDepartureDate.toDateString() === selectedDate.toDateString();
            });

            setSearchResults(filteredByDate);
            setSelectedFlight(null); // Clear selected flight when new search occurs

            if (filteredByDate.length === 0) {
                setError("No flights found for this query on the selected date.");
            }

        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Failed to fetch flights: ${err.message}. Please try again.`);
            setSearchResults([]); // Ensure results are cleared on error
        } finally {
            setIsLoading(false);
        }
    };
    // --- End MODIFIED Function ---


    // Function to render each suggestion item (existing logic)
    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => selectSuggestion(item)}>
            <Ionicons
                name={item.type === 'airline' ? 'airplane-outline' : item.type === 'airport' ? 'flag-outline' : 'flight-outline'}
                size={20}
                color="#666"
                style={{ marginRight: 10 }}
            />
            <View>
                <Text style={styles.suggestionItemMainText}>
                    {item.type === 'flight_number'
                        ? `${item.airline} ${item.number}`
                        : item.name}
                </Text>
                {item.type === 'airline' && <Text style={styles.suggestionItemSubText}>{item.code} • {item.iata}</Text>}
                {item.type === 'airport' && <Text style={styles.suggestionItemSubText}>{item.code} • {item.city}</Text>}
                {item.type === 'flight_number' && <Text style={styles.suggestionItemSubText}>Flight Number</Text>}
            </View>
        </TouchableOpacity>
    );

    // Function to handle selection of a suggestion (existing logic)
    const selectSuggestion = (item) => {
        setSearchText(item.type === 'flight_number' ? item.number : item.name);
        // If it's a flight number, immediately perform a search
        if (item.type === 'flight_number') {
            performSearch(item.number);
        }
        // For other types, just populate the search text, user can then hit enter
    };


    // Helper to format date for display (existing logic)
    const formatDate = (date) => {
        const options = {
            timeZone: 'Africa/Accra',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        const now = new Date().toLocaleString('en-US', options);
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);

        const diffTime = selected.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Tomorrow';
        } else if (diffDays === -1) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });
        }
    };

    // Function to handle date change from the DateTimePicker (existing logic)
    const onDateChange = (event, pickedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (event.type === 'set' || Platform.OS === 'ios') {
                setShowDatePicker(false);
        }
        if (pickedDate) {
            setSelectedDate(pickedDate);
            // Re-run search if a date is changed and there's a current query
            if (searchText) {
                performSearch(searchText);
            }
        }
    };

    // --- MODIFIED Function: Render each flight search result item ---
    // Ensure the properties used here match what your backend returns
    const renderFlightItem = ({ item }) => {
        const isSelected = selectedFlight && selectedFlight.id === item.id;
        return (
            <TouchableOpacity
                style={[styles.flightItem, isSelected && styles.flightItemSelected]}
                onPress={() => setSelectedFlight(item)}
            >
                <View style={styles.flightItemHeader}>
                    {/* Assuming your backend provides airlineCode and flightNumber */}
                    <Text style={styles.flightNumber}>{item.airlineCode || 'N/A'} {item.flightNumber}</Text>
                    <Text style={styles.airlineName}>{item.airlineName || 'Unknown Airline'}</Text>
                </View>
                <View style={styles.flightItemDetails}>
                    <View style={styles.timeInfo}>
                        {/* Assuming scheduledDeparture is a string like "YYYY-MM-DD HH:MM:SS" */}
                        <Text style={styles.timeText}>{item.scheduledDeparture ? new Date(item.scheduledDeparture).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}</Text>
                        <Text style={styles.airportCode}>{item.originAirport}</Text>
                        <Text style={styles.cityText}>{item.originCity}</Text>
                    </View>
                    <View style={styles.separator}>
                        <Ionicons name="airplane" size={20} color="#000" />
                        <View style={styles.line} />
                    </View>
                    <View style={styles.timeInfo}>
                        {/* Assuming scheduledArrival is a string */}
                        <Text style={styles.timeText}>{item.scheduledArrival ? new Date(item.scheduledArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}</Text>
                        <Text style={styles.airportCode}>{item.destinationAirport}</Text>
                        <Text style={styles.cityText}>{item.destinationCity}</Text>
                    </View>
                </View>
                <Text style={styles.flightStatus}>Status: {item.status || 'N/A'}</Text>
            </TouchableOpacity>
        );
    };
    // --- End MODIFIED Function ---


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add Flight</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Ionicons name="close-outline" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    placeholder="Enter airline, airport, or flight"
                    style={styles.searchInput}
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="words"
                    returnKeyType="search"
                    onSubmitEditing={() => performSearch(searchText)}
                />
            </View>

            <View style={styles.dateSelector}>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                    <Ionicons name="calendar-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
                    <Ionicons name="chevron-down-outline" size={16} color="#666" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
            </View>

            {/* Date Picker Component */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onDateChange}
                />
            )}

            {isLoading ? (
                <View style={styles.statusContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.statusText}>Searching for flights...</Text>
                </View>
            ) : error ? (
                <View style={styles.statusContainer}>
                    <Ionicons name="alert-circle-outline" size={40} color="#FF3B30" />
                    <Text style={styles.statusErrorText}>{error}</Text>
                </View>
            ) : searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    renderItem={renderFlightItem}
                    keyExtractor={(item) => item.id || item.flightNumber + item.scheduledDeparture} // Use a more robust key if ID isn't unique
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                />
            ) : searchText ? (
                <FlatList
                    data={filteredSuggestions}
                    renderItem={renderSuggestionItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                    ListEmptyComponent={() => (
                        <View style={styles.emptyResults}>
                            <Text style={styles.emptyResultsText}>No suggestions found for &quot;{searchText}&quot;</Text>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>FREQUENTLY USED</Text>
                    <TouchableOpacity style={styles.frequentItem} onPress={() => selectSuggestion(dummySuggestions[0])}>
                        <Ionicons name="airplane-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.frequentItemMainText}>Africa World</Text>
                            <Text style={styles.frequentItemSubText}>AW • AWA</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.frequentItem} onPress={() => selectSuggestion(dummySuggestions[1])}>
                        <Ionicons name="airplane-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.frequentItemMainText}>Venezolana</Text>
                            <Text style={styles.frequentItemSubText}>AW • VNE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.frequentItem} onPress={() => selectSuggestion(dummySuggestions[2])}>
                        <Ionicons name="flag-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.frequentItemMainText}>Kotoka Intl</Text>
                            <Text style={styles.frequentItemSubText}>ACC • DGAA • Accra</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.frequentItem} onPress={() => selectSuggestion(dummySuggestions[3])}>
                        <Ionicons name="flag-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.frequentItemMainText}>Takoradi</Text>
                            <Text style={styles.frequentItemSubText}>TKD • DGTK • Takoradi</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>MORE</Text>
                    <TouchableOpacity style={styles.moreOption}>
                        <Ionicons name="git-branch-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                        <Text style={styles.moreOptionText}>Find by Route</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Add Flight Floating Button */}
            {selectedFlight && (
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        style={styles.addFlightButton}
                        onPress={() => {
                            router.navigate({
                                pathname: '/HomeScreens/homescreen',
                                params: { addedFlight: JSON.stringify(selectedFlight) },
                            });
                        }}
                    >
                        <Text style={styles.addFlightButtonText}>Add Flight</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 12,
        paddingHorizontal: 12,
    },
    searchIcon: { marginRight: 8 },
    searchInput: {
        flex: 1,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
        fontSize: 16,
        color: '#333',
    },
    dateSelector: {
        marginHorizontal: 16,
        marginBottom: 12,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
        marginTop: 20,
        marginBottom: 10,
    },
    frequentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    frequentItemMainText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    frequentItemSubText: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    moreOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    moreOptionText: {
        fontSize: 16,
        color: '#333',
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    suggestionItemMainText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    suggestionItemSubText: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    emptyResults: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    emptyResultsText: {
        color: '#999',
        fontSize: 16,
    },
    flightItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    flightItemSelected: {
        borderColor: '#007AFF',
        borderWidth: 2,
    },
    flightItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    flightNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    airlineName: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    flightItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    timeInfo: {
        alignItems: 'center',
    },
    timeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    airportCode: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginTop: 5,
    },
    cityText: {
        fontSize: 14,
        color: '#666',
    },
    separator: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    line: {
        width: '80%',
        height: 2,
        backgroundColor: '#ddd',
        marginVertical: 5,
    },
    flightStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 10,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        alignItems: 'center',
    },
    addFlightButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        minWidth: 200,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addFlightButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    statusText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    statusErrorText: {
        marginTop: 10,
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        fontWeight: '500',
    },
});
