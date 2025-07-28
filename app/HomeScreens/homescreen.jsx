import { Ionicons } from "@expo/vector-icons"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

const FLIGHT_OPTIONS = [
    { label: "Today", icon: "calendar-outline" },
    { label: "My Flights", icon: "airplane-outline" },
    { label: "Friends' Flights", icon: "people-outline" },
]

const FlightCard = ({ flight, onPress, onLongPress, isSelectedForDelete, onDelete }) => {
    const [timeRemainingState, setTimeRemainingState] = useState(null)

    const formatTime = (timeString) => {
        if (!timeString) return "--:--"
        try {
            const date = new Date(timeString)
            return date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        } catch (e) {
            console.error("Error formatting time:", timeString, e)
            return "--:--"
        }
    }

    const getRemainingTimeInMs = useCallback(() => {
        if (!flight.scheduledDeparture) return 0

        let departureTime
        if (typeof flight.scheduledDeparture === "string") {
            departureTime = new Date(flight.scheduledDeparture).getTime()
        } else {
            departureTime = flight.scheduledDeparture.getTime()
        }

        const now = new Date().getTime()
        return departureTime - now
    }, [flight.scheduledDeparture])

    useEffect(() => {
        let timerInterval

        const updateCountdown = () => {
            const diffMs = getRemainingTimeInMs()

            if (diffMs < -30 * 60 * 1000) {
                setTimeRemainingState({ type: "departed", value: "Departed" })
                clearInterval(timerInterval)
                return
            }

            if (diffMs <= 0 && diffMs >= -30 * 60 * 1000) {
                setTimeRemainingState({
                    type: "boarding",
                    value: "Boarding",
                })
                return
            }

            const diffMinutes = Math.floor(diffMs / (1000 * 60))
            const hours = Math.floor(diffMinutes / 60)
            const minutes = diffMinutes % 60

            setTimeRemainingState({
                type: "remaining",
                hours: hours,
                minutes: minutes,
                totalMinutes: diffMinutes,
            })
        }

        updateCountdown()
        timerInterval = setInterval(updateCountdown, 1000)
        return () => clearInterval(timerInterval)
    }, [getRemainingTimeInMs])

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "on time":
            case "scheduled":
                return "#00C851"
            case "delayed":
                return "#FFC107"
            case "arrived":
                return "#607D8B"
            case "cancelled":
                return "#F44336"
            default:
                return "#00C851"
        }
    }

    const getDisplayStatus = (status) => {
        if (status?.toLowerCase() === "scheduled") {
            return "Scheduled"
        }
        return status || "On Time"
    }

    const getAirlineCode = (flightNumber) => {
        if (!flightNumber) return "UA"
        const match = flightNumber.match(/^([A-Z]{2})/)
        return match ? match[1] : "UA"
    }

    const getFlightNumber = (flightNumber) => {
        if (!flightNumber) return "UA 2381"
        return flightNumber.replace(/^([A-Z]{2})/, "$1 ")
    }

    const getTestDepartureTime = () => {
        if (!flight.scheduledDeparture) {
            const futureTime = new Date()
            futureTime.setHours(futureTime.getHours() + 1)
            futureTime.setMinutes(futureTime.getMinutes() + 34)
            return futureTime.toISOString()
        }
        return flight.scheduledDeparture
    }

    return (
        <TouchableOpacity
            style={[styles.cardContainer, isSelectedForDelete && styles.cardSelectedForDelete]}
            onPress={() => onPress(flight)}
            onLongPress={() => onLongPress(flight)}
        >
            {/* Left Section - Time Remaining */}
            <View style={styles.timeSection}>
                {timeRemainingState ? (
                    <>
                        {timeRemainingState.type === "remaining" && (
                            <>
                                <Text style={styles.timeMainText}>
                                    {timeRemainingState.hours > 0 ? `${timeRemainingState.hours}h` : `${timeRemainingState.minutes}m`}
                                </Text>
                                <Text style={styles.timeSubText}>{timeRemainingState.totalMinutes} MINUTES</Text>
                            </>
                        )}
                        {timeRemainingState.type === "boarding" && <Text style={styles.boardingText}>Boarding</Text>}
                        {timeRemainingState.type === "departed" && <Text style={styles.departedText}>Departed</Text>}
                    </>
                ) : (
                    <>
                        <Text style={styles.timeMainText}>1h</Text>
                        <Text style={styles.timeSubText}>34 MINUTES</Text>
                    </>
                )}
            </View>

            {/* Center Section - Flight Details */}
            <View style={styles.flightDetailsSection}>
                {/* Airline Logo and Flight Number */}
                <View style={styles.flightHeaderRow}>
                    <View style={styles.airlineLogoContainer}>
                        <Text style={styles.airlineCode}>{getAirlineCode(flight.flightNumber)}</Text>
                    </View>
                    <Text style={styles.flightNumberText}>{getFlightNumber(flight.flightNumber)}</Text>
                </View>

                {/* Route */}
                <Text style={styles.routeText}>
                    {flight.departureCity || "Denver"} to {flight.arrivalCity || "Minneapolis"}
                </Text>

                {/* Airport Times Row */}
                <View style={styles.airportTimesRow}>
                    <View style={styles.airportTimeBlock}>
                        <View style={[styles.airportIcon, { backgroundColor: "#00C851" }]}>
                            <Ionicons name="airplane" size={12} color="white" />
                        </View>
                        <Text style={styles.airportCodeText}>
                            {flight.departureAirport ? flight.departureAirport.substring(0, 3).toUpperCase() : "DEN"}
                        </Text>
                        <Text style={styles.airportTimeText}>{formatTime(getTestDepartureTime())}</Text>
                    </View>

                    <View style={styles.airportTimeBlock}>
                        <View style={[styles.airportIcon, { backgroundColor: "#F44336" }]}>
                            <Ionicons name="airplane" size={12} color="white" />
                        </View>
                        <Text style={styles.airportCodeText}>
                            {flight.arrivalAirport ? flight.arrivalAirport.substring(0, 3).toUpperCase() : "MSP"}
                        </Text>
                        <Text style={styles.airportTimeText}>{formatTime(flight.scheduledArrival) || "12:47"}</Text>
                    </View>
                </View>
            </View>

            {/* Right Section - Status */}
            <View style={styles.statusSection}>
                <Text style={styles.statusLabel}>Departs</Text>
                <Text style={[styles.statusValue, { color: getStatusColor(flight.status) }]}>
                    {getDisplayStatus(flight.status)}
                </Text>
            </View>

            {/* Delete Button (if applicable) */}
            {onDelete && isSelectedForDelete && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(flight.id)}>
                    <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )
}

export default function HomeScreen() {
    const sheetRef = useRef(null)
    const mapRef = useRef(null)
    const snapPoints = useMemo(() => ["10%", "30%", "60%", "90%"], [])
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedOption, setSelectedOption] = useState("My Flights")
    const [flights, setFlights] = useState([])
    const [shareModalVisible, setShareModalVisible] = useState(false)
    const router = useRouter()
    const params = useLocalSearchParams()
    const [visiblePolylines, setVisiblePolylines] = useState([])
    const [visibleAirportMarkers, setVisibleAirportMarkers] = useState([])
    const [flightToDelete, setFlightToDelete] = useState(null)

    // State for map type
    const [currentMapType, setCurrentMapType] = useState('hybrid'); // Default map is hybrid
    // New state for quick actions menu visibility
    const [showQuickMenu, setShowQuickMenu] = useState(false);

    const toggleDropdown = () => setShowDropdown((prev) => !prev)

    const selectOption = (option) => {
        setSelectedOption(option)
        setShowDropdown(false)
    }

    // Function to toggle map type
    const toggleMapType = () => {
        setCurrentMapType(prevMapType => prevMapType === 'hybrid' ? 'standard' : 'hybrid');
    };

    // Function to toggle quick actions menu
    const toggleQuickMenu = () => {
        setShowQuickMenu(prev => !prev);
    };

    // NEW FUNCTION: Fetch random flight from backend
    const fetchRandomFlight = async () => {
        try {
            console.log("Fetching random flight...");
            
            const response = await fetch(`http://192.168.137.192:8080/flight/random`);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error fetching random flight:", errorText);
                return;
            }
            
            const data = await response.json();
            console.log("Random flight fetched:", data);
            
            // Check if we got valid flight data
            if (!data || !data.flightNumber) {
                console.error("Invalid flight data received");
                return;
            }
            
            // Create a unique ID for the flight
            const flightUniqueId = `${data.flightNumber}-${data.scheduledDeparture}`;
            
            // Add the random flight to your flights state
            setFlights((prevFlights) => {
                // Check if this exact flight already exists
                const flightExists = prevFlights.some((f) => f.id === flightUniqueId);
                
                if (!flightExists) {
                    const newFlight = {
                        ...data,
                        id: flightUniqueId
                    };
                    return [...prevFlights, newFlight];
                } else {
                    console.log("Flight already exists, not adding duplicate");
                    return prevFlights;
                }
            });
            
        } catch (error) {
            console.error("Network error fetching random flight:", error);
        }
    };

    useEffect(() => {
        if (params.addedFlight) {
            try {
                const newFlight = JSON.parse(params.addedFlight)
                setFlights((prevFlights) => {
                    const newFlightUniqueId = `${newFlight.flightNumber}-${new Date(newFlight.scheduledDeparture).toISOString()}`
                    const flightExists = prevFlights.some((f) => {
                        const existingFlightUniqueId = `${f.flightNumber}-${new Date(f.scheduledDeparture).toISOString()}`
                        return existingFlightUniqueId === newFlightUniqueId
                    })
                    if (!flightExists) {
                        return [...prevFlights, { ...newFlight, id: newFlightUniqueId }]
                    } else {
                        return prevFlights
                    }
                })
            } catch (e) {
                console.error("Error parsing addedFlight param:", e)
            }
        }
    }, [params.addedFlight])

    const initialMapRegion = useMemo(
        () => ({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 120,
            longitudeDelta: 120,
        }),
        [],
    )

    useEffect(() => {
        const newPolylines = []
        const newMarkers = []
        const allCoordsForFit = []

        flights.forEach((flight) => {
            const departureCoords = {
                latitude: flight.departureLatitude,
                longitude: flight.departureLongitude,
            }
            const arrivalCoords = {
                latitude: flight.arrivalLatitude,
                longitude: flight.arrivalLongitude,
            }

            const flightInstanceUniqueId = flight.id

            if (departureCoords.latitude && departureCoords.longitude && arrivalCoords.latitude && arrivalCoords.longitude) {
                newPolylines.push({
                    id: flightInstanceUniqueId + "-line",
                    coordinates: [departureCoords, arrivalCoords],
                })

                newMarkers.push(
                    {
                        id: `${flightInstanceUniqueId}-dep`,
                        latitude: departureCoords.latitude,
                        longitude: departureCoords.longitude,
                        title: flight.departureAirport,
                        subtitle: "Departure",
                    },
                    {
                        id: `${flightInstanceUniqueId}-arr`,
                        latitude: arrivalCoords.latitude,
                        longitude: arrivalCoords.longitude,
                        title: flight.arrivalAirport,
                        subtitle: "Arrival",
                    },
                )

                allCoordsForFit.push(departureCoords, arrivalCoords)
            }
        })

        setVisiblePolylines(newPolylines)
        setVisibleAirportMarkers(newMarkers)

        if (mapRef.current && allCoordsForFit.length > 0) {
            setTimeout(() => {
                mapRef.current.fitToCoordinates(allCoordsForFit, {
                    edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
                    animated: true,
                })
                const first = allCoordsForFit[0]
                const last = allCoordsForFit[allCoordsForFit.length - 1]
                mapRef.current.animateCamera(
                    {
                        center: {
                            latitude: (first.latitude + last.latitude) / 2,
                            longitude: (first.longitude + last.longitude) / 2,
                        },
                        pitch: 45,
                        heading: 0,
                        zoom: 2,
                    },
                    { duration: 1000 },
                )
            }, 500)
        } else if (mapRef.current && allCoordsForFit.length === 0) {
            mapRef.current.animateToRegion(initialMapRegion, 1000)
        }
    }, [flights, initialMapRegion])

    const handleCardPress = useCallback(
        (flight) => {
            router.push({
                pathname: "HomeScreens/FlightDetails",
                params: { flight: JSON.stringify(flight) },
            })
        },
        [router],
    )

    const handleLongPressFlight = useCallback((flight) => {
        setFlightToDelete(flight)
    }, [])

    const confirmDeleteFlight = useCallback(() => {
        if (flightToDelete) {
            setFlights((prevFlights) => prevFlights.filter((f) => f.id !== flightToDelete.id))
            setFlightToDelete(null)
        }
    }, [flightToDelete])

    const cancelDelete = useCallback(() => {
        setFlightToDelete(null)
    }, [])

    return (
        <GestureHandlerRootView style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                mapType={currentMapType} // Dynamically set map type here
                style={styles.map}
                initialRegion={initialMapRegion}
            >
                {visiblePolylines.map((line) => (
                    <Polyline key={line.id} coordinates={line.coordinates} strokeWidth={3} strokeColor="#007AFF" />
                ))}
                {visibleAirportMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.subtitle}
                    >
                        <View style={styles.customMarker}>
                            <Ionicons name="airplane" size={20} color="white" />
                            <Text style={styles.customMarkerText}>
                                {marker.title ? marker.title.substring(0, 3).toUpperCase() : ""}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Map Type Toggle Button */}
            <TouchableOpacity style={styles.mapTypeToggleButton} onPress={toggleMapType}>
                <View style={styles.mapTypeButtonContainer}>
                    {currentMapType === 'hybrid' ? (
                        <Ionicons name="layers" size={24} color="#333" /> // Icon for hybrid (layers)
                    ) : (
                        <Ionicons name="map-outline" size={24} color="#333" /> // Icon for standard (map)
                    )}
                </View>
            </TouchableOpacity>

            {/* Quick Actions Menu Toggle Button (UPDATED POSITION) */}
            <TouchableOpacity style={styles.quickMenuToggleButton} onPress={toggleQuickMenu}>
                <View style={styles.mapTypeButtonContainer}> {/* Reusing mapTypeButtonContainer style for consistency */}
                    <Ionicons name="apps-outline" size={24} color="#333" /> {/* Or 'ellipsis-horizontal-circle-outline' */}
                </View>
            </TouchableOpacity>

            {/* Quick Actions Menu (NEW) */}
            {showQuickMenu && (
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={styles.quickMenu}
                >
                    <TouchableOpacity
                        style={styles.quickMenuItem}
                        onPress={() => {
                            toggleQuickMenu();
                            // router.push('book-flight'); // Example navigation
                            console.log('Navigating to Book a Flight');
                        }}
                    >
                        <Ionicons name="airplane-outline" size={20} color="#333" style={styles.quickMenuItemIcon} />
                        <Text style={styles.quickMenuItemText}>Book a Flight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickMenuItem}
                        onPress={() => {
                            toggleQuickMenu();
                            // router.push('book-ride'); // Example navigation
                            console.log('Navigating to Book a Ride');
                        }}
                    >
                        <Ionicons name="car-outline" size={20} color="#333" style={styles.quickMenuItemIcon} />
                        <Text style={styles.quickMenuItemText}>Book a Ride</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}


            <BottomSheet
                ref={sheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                style={styles.bottomSheet} // Added zIndex here to ensure it covers elements below
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Pressable style={styles.overlay} onPress={() => setShowDropdown(false)}>
                        <View style={styles.topRowHeader}>
                            <TouchableOpacity onPress={toggleDropdown} style={styles.todayContainer}>
                                <View style={styles.todayRow}>
                                    <Text style={styles.today}>{selectedOption}</Text>
                                    <Ionicons
                                        name={showDropdown ? "chevron-up" : "chevron-down"}
                                        size={18}
                                        color="#333"
                                        style={styles.chevronIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.rightButtons}>
                                <TouchableOpacity style={styles.shareButton} onPress={() => setShareModalVisible(true)}>
                                    <Ionicons name="share-outline" size={20} color="#333" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push("/HomeScreens/profile")} style={styles.profileButton}>
                                    <Ionicons name="person-outline" size={22} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {showDropdown && (
                            <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={[styles.dropdown, Platform.OS === 'android' ? { elevation: 4 } : {}]}>
                                {FLIGHT_OPTIONS.map(({ label, icon }) => (
                                    <TouchableOpacity key={label} style={styles.dropdownItem} onPress={() => selectOption(label)}>
                                        <View style={styles.checkmarkContainer}>
                                            {selectedOption === label ? (
                                                <Ionicons name="checkmark" size={16} color="#007AFF" />
                                            ) : (
                                                <View style={styles.emptyCheckmark} />
                                            )}
                                        </View>
                                        <Text style={styles.dropdownText}>{label}</Text>
                                        {icon ? <Ionicons name={icon} size={18} color="#666" /> : <View style={styles.dotIcon} />}
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
                                value={""}
                                editable={false}
                                onPressIn={() => router.push("add-flight")}
                            />
                        </View>

                        {flights.length > 0 ? (
                            <FlatList
                                data={flights}
                                keyExtractor={(item) => {
                                    const normalizedDepartureTime = item.scheduledDeparture
                                        ? new Date(item.scheduledDeparture).toISOString()
                                        : "no-date-flatlist"
                                    return `${item.flightNumber}-${normalizedDepartureTime}`
                                }}
                                renderItem={({ item }) => (
                                    <FlightCard
                                        flight={item}
                                        onPress={handleCardPress}
                                        onLongPress={handleLongPressFlight}
                                        isSelectedForDelete={flightToDelete && flightToDelete.id === item.id}
                                        onDelete={confirmDeleteFlight}
                                    />
                                )}
                                style={{ marginTop: 20 }}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 20 }}
                            />
                        ) : (
                            <>
                                {selectedOption === "Today" && (
                                    <View style={styles.noFlights}>
                                        <Ionicons name="calendar-outline" size={48} color="#ccc" style={styles.emptyStateIcon} />
                                        <Text style={styles.noneToday}>None Today</Text>
                                        <Text style={styles.noFlightsText}>No flights in the next 24 hours</Text>
                                        <TouchableOpacity
                                            style={styles.randomFlightButton}
                                            onPress={fetchRandomFlight} // UPDATED: Changed from console.log to fetchRandomFlight
                                        >
                                            <Text style={styles.randomFlight}>View a Random Flight</Text>
                                            <Ionicons name="shuffle-outline" size={16} color="#007AFF" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {selectedOption === "My Flights" && (
                                    <View style={styles.noFlights}>
                                        <Ionicons name="airplane-outline" size={48} color="#ccc" style={styles.emptyStateIcon} />
                                        <Text style={styles.noneToday}>Let&apos;s Fly Somewhere</Text>
                                        <Text style={styles.noFlightsText}>Tap the search bar to add your next flight</Text>
                                    </View>
                                )}
                                {selectedOption === "Friends' Flights" && (
                                    <View style={styles.noFlights}>
                                        <Ionicons name="people-outline" size={48} color="#ccc" style={styles.emptyStateIcon} />
                                        <Text style={styles.noneToday}>Add Friends&apos; Flights</Text>
                                        <Text style={styles.noFlightsText}>Use the search bar or add a FlightHub mate</Text>
                                        <TouchableOpacity
                                            style={styles.airwiseMateButton}
                                            onPress={() => console.log("Add FlightHub mate")}
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

            <Modal animationType="fade" transparent={true} visible={!!flightToDelete} onRequestClose={cancelDelete}>
                <Pressable style={styles.deleteModalOverlay} onPress={cancelDelete}>
                    <View style={styles.deleteConfirmationBox}>
                        <Text style={styles.deleteConfirmationTitle}>Delete Flight?</Text>
                        <Text style={styles.deleteConfirmationMessage}>
                            Are you sure you want to delete flight {flightToDelete?.flightNumber} from {flightToDelete?.departureCity}{" "}
                            to {flightToDelete?.arrivalCity}? This action cannot be undone.
                        </Text>
                        <View style={styles.deleteConfirmationButtons}>
                            <TouchableOpacity style={styles.deleteCancelButton} onPress={cancelDelete}>
                                <Text style={styles.deleteCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteConfirmButton} onPress={confirmDeleteFlight}>
                                <Text style={styles.deleteConfirmButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>

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
                            Choose only certain flights or add a FlightHub Friend who can see all your upcoming flights anytime – for
                            free.
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
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 20, // Ensures it covers map buttons
    },
    contentContainer: { flex: 1 },
    overlay: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
    },
    todayContainer: { padding: 5 },
    todayRow: { flexDirection: "row", alignItems: "center" },
    chevronIcon: { marginLeft: 8 },
    dropdown: {
        backgroundColor: "white",
        borderRadius: 12,
        marginTop: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        zIndex: 10,
    },
    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    checkmarkContainer: { width: 20, alignItems: "center" },
    emptyCheckmark: { width: 16, height: 16 },
    dropdownText: { flex: 1, fontSize: 16, marginLeft: 12, color: "#000" },
    dotIcon: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#007AFF" },
    topRowHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rightButtons: { flexDirection: "row", alignItems: "center", gap: 10 },
    shareButton: {
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    profileButton: {
        backgroundColor: "#90EE90",
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    today: { fontSize: 22, fontWeight: "600" },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 12,
    },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, padding: 10, fontSize: 16, color: "#333" },

    // Updated Flight Card Styles
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginVertical: 6,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
        minHeight: 100,
    },
    cardSelectedForDelete: {
        borderColor: "#F44336",
        borderWidth: 2,
    },

    // Left Section - Time Remaining
    timeSection: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginRight: 20,
        minWidth: 80,
    },
    timeMainText: {
        fontSize: 36,
        fontWeight: "700",
        color: "#000",
        lineHeight: 40,
    },
    timeSubText: {
        fontSize: 11,
        color: "#888",
        fontWeight: "500",
        letterSpacing: 0.5,
        marginTop: -2,
    },
    boardingText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFC107",
    },
    departedText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#888",
    },

    // Center Section - Flight Details
    flightDetailsSection: {
        flex: 1,
        justifyContent: "center",
    },
    flightHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    airlineLogoContainer: {
        width: 24,
        height: 24,
        backgroundColor: "#1e3a8a",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    airlineCode: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    flightNumberText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    routeText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        marginBottom: 12,
        lineHeight: 22,
    },
    airportTimesRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 24,
    },
    airportTimeBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    airportIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
    },
    airportCodeText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    airportTimeText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },

    // Right Section - Status
    statusSection: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginLeft: 16,
    },
    statusLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 4,
        fontWeight: "500",
    },
    statusValue: {
        fontSize: 14,
        fontWeight: "600",
    },

    // Delete Button
    deleteButton: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        borderRadius: 20,
    },

    noFlights: {
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 20,
    },
    emptyStateIcon: {
        marginBottom: 16,
    },
    noneToday: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    noFlightsText: {
        color: "#888",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 16,
        lineHeight: 20,
    },
    randomFlightButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    randomFlight: {
        color: "#007AFF",
        fontSize: 16,
        fontWeight: "500",
    },
    airwiseMateButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
    },

    /* Modal styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.15)",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    sharingCard: {
        width: "95%",
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1,
    },
    sharingTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#111",
        alignSelf: "flex-start",
    },
    sharingSubtitle: {
        fontSize: 15,
        color: "#666",
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    chooseFlightsButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        width: "100%",
        marginBottom: 12,
        justifyContent: "center",
    },
    chooseFlightsText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
    addFriendButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F6FF",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        width: "100%",
        justifyContent: "center",
    },
    addFriendText: {
        color: "#007AFF",
        fontSize: 17,
        fontWeight: "600",
    },
    customMarker: {
        backgroundColor: "rgba(0, 122, 255, 0.8)",
        padding: 6,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "white",
    },
    customMarkerText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        marginLeft: 4,
    },
    // Delete Confirmation Modal styles
    deleteModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteConfirmationBox: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 25,
        marginHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    deleteConfirmationTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    deleteConfirmationMessage: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 22,
    },
    deleteConfirmationButtons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        marginTop: 10,
    },
    deleteCancelButton: {
        backgroundColor: "#E0E0E0",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        minWidth: 100,
        alignItems: "center",
    },
    deleteCancelButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
    deleteConfirmButton: {
        backgroundColor: "#F44336",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        minWidth: 100,
        alignItems: "center",
    },
    deleteConfirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    // Styles for the map type toggle button
    mapTypeToggleButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
    },
    mapTypeButtonContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    // UPDATED: Quick Menu Toggle Button positioned below map button
    quickMenuToggleButton: {
        position: 'absolute',
        top: 120, // Positioned 60px below the map button (60 + 48 + 12 spacing)
        right: 20,
        zIndex: 10,
    },
    // NEW: Quick Menu Styles
    quickMenu: {
        position: 'absolute',
        top: 120, // Same position as toggle button
        right: 80, // To the left of the toggle button
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 15, // Higher than toggle button
        minWidth: 150,
    },
    quickMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    quickMenuItemIcon: {
        marginRight: 12,
    },
    quickMenuItemText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    // NEW: Sidebar Toggle Button Styles (if you still want to keep sidebar code)
    sidebarToggleButton: {
        position: 'absolute',
        top: 180, // Positioned below the quickMenuToggleButton
        right: 20,
        zIndex: 10,
    },
    // NEW: Sidebar Modal Styles
    sidebarOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // Darker overlay for sidebar
        justifyContent: 'flex-end', // Align sidebar to the right
        flexDirection: 'row', // For slide-in animation from right
    },
    sidebar: {
        width: '75%', // Adjust width as needed
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // White transparent background
        padding: 20,
        paddingTop: 60, // Space for close button
        shadowColor: '#000',
        shadowOffset: { width: -3, height: 0 }, // Shadow on the left side
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    sidebarCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    sidebarHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        alignSelf: 'center',
    },
    sidebarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sidebarItemIcon: {
        marginRight: 15,
    },
    sidebarItemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    // NEW: FlightHub Friends Modal Styles (Copied from ProfileScreen.jsx)
    friendsModalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        width: '100%',
    },
    friendsModalCloseButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 5,
    },
    friendAvatarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    friendAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    avatarEmoji: {
        fontSize: 30,
        lineHeight: 35, // Adjust line height to center emoji
    },
    avatarPlane: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    friendsModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    friendsModalDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 22,
    },
    friendsModalSubDescription: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'italic',
    },
    addFriendButtonFriendsModal: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    addFriendIcon: {
        marginRight: 10,
    },
    addFriendButtonTextFriendsModal: { 
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});