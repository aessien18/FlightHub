"use client"

import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { router } from "expo-router"
import { useMemo, useState } from "react"
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

// --- Dummy Data for Suggestions (keeping your existing data) ---
const dummySuggestions = [
  { id: "airline-awa", type: "airline", name: "Africa World Airlines", code: "AW", iata: "AWA" },
  { id: "airline-vne", type: "airline", name: "Venezolana", code: "AW", iata: "VNE" },
  { id: "airport-acc", type: "airport", name: "Kotoka Intl Airport", code: "ACC", city: "Accra", country: "Ghana" },
  { id: "airport-tkd", type: "airport", name: "Takoradi Airport", code: "TKD", city: "Takoradi", country: "Ghana" },
  { id: "airline-delta", type: "airline", name: "Delta Airlines", code: "DL", iata: "DAL" },
  { id: "airport-jfk", type: "airport", name: "John F. Kennedy Intl", code: "JFK", city: "New York", country: "USA" },
  { id: "flight-ba245", type: "flight_number", number: "BA245", airline: "British Airways" },
  { id: "flight-klm102", type: "flight_number", number: "KLM102", airline: "KLM Royal Dutch Airlines" },
]

export default function EnhancedAddFlightModal() {
  const [searchText, setSearchText] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Filter suggestions based on search text (keeping your existing logic)
  const filteredSuggestions = useMemo(() => {
    if (!searchText) {
      return []
    }
    const lowerSearchText = searchText.toLowerCase()
    return dummySuggestions.filter(
      (item) =>
        item.name?.toLowerCase().includes(lowerSearchText) ||
        item.code?.toLowerCase().includes(lowerSearchText) ||
        item.iata?.toLowerCase().includes(lowerSearchText) ||
        item.city?.toLowerCase().includes(lowerSearchText) ||
        item.country?.toLowerCase().includes(lowerSearchText) ||
        item.number?.toLowerCase().includes(lowerSearchText),
    )
  }, [searchText])

  // Enhanced status color function
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || ""

    if (statusLower.includes("on time") || statusLower.includes("scheduled")) {
      return "#10B981" // Green
    } else if (statusLower.includes("delay") || statusLower.includes("late")) {
      return "#EF4444" // Red
    } else if (statusLower.includes("board") || statusLower.includes("gate")) {
      return "#3B82F6" // Blue
    } else if (statusLower.includes("depart") || statusLower.includes("airborne")) {
      return "#6B7280" // Gray
    } else if (statusLower.includes("cancel")) {
      return "#EF4444" // Red
    } else if (statusLower.includes("arrived") || statusLower.includes("landed")) {
      return "#10B981" // Green
    } else {
      return "#6B7280" // Default gray
    }
  }

  // Enhanced status background color
  const getStatusBackgroundColor = (status) => {
    const statusLower = status?.toLowerCase() || ""

    if (statusLower.includes("on time") || statusLower.includes("scheduled")) {
      return "#DCFCE7" // Light green
    } else if (statusLower.includes("delay") || statusLower.includes("late")) {
      return "#FEE2E2" // Light red
    } else if (statusLower.includes("board") || statusLower.includes("gate")) {
      return "#DBEAFE" // Light blue
    } else if (statusLower.includes("cancel")) {
      return "#FEE2E2" // Light red
    } else {
      return "#F3F4F6" // Light gray
    }
  }

  // Calculate flight duration
  const calculateFlightDuration = (departure, arrival) => {
    if (!departure || !arrival) return null

    const departureTime = new Date(departure)
    const arrivalTime = new Date(arrival)
    const durationMs = arrivalTime.getTime() - departureTime.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  // Enhanced Error Display Component (keeping your existing structure)
  const ErrorDisplay = ({ error, onRetry }) => {
    const getErrorIcon = () => {
      switch (error.type) {
        case "network":
          return "wifi-outline"
        case "server":
          return "server-outline"
        case "not_found":
          return "search-outline"
        case "timeout":
          return "time-outline"
        case "no_results":
          return "airplane-outline"
        default:
          return "alert-circle-outline"
      }
    }

    const getErrorColor = () => {
      switch (error.type) {
        case "network":
          return "#FF9500"
        case "server":
          return "#FF3B30"
        case "not_found":
          return "#007AFF"
        case "timeout":
          return "#FF9500"
        case "no_results":
          return "#8E8E93"
        default:
          return "#FF3B30"
      }
    }

    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Ionicons name={getErrorIcon()} size={60} color={getErrorColor()} style={styles.errorIcon} />
          <Text style={styles.errorTitle}>{error.title}</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
          <Text style={styles.errorSuggestion}>{error.suggestion}</Text>

          {error.type !== "no_results" && (
            <TouchableOpacity style={[styles.retryButton, { backgroundColor: getErrorColor() }]} onPress={onRetry}>
              <Ionicons name="refresh-outline" size={20} color="#fff" />
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  // Fixed performSearch function with proper error handling
  const performSearch = async (query) => {
    Keyboard.dismiss()
    setError(null)
    setSearchResults([])
    if (!query) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`http://10.232.200.228:8080/flight?number=${query}`)

      // First check if the response is ok (status 200-299)
      if (!response.ok) {
        const errorText = await response.text()

        if (response.status === 404) {
          setError({
            type: "not_found",
            title: "Flight Not Found",
            message: "We couldn't find that flight in our system.",
            suggestion: "Double-check the flight number and try again.",
          })
          return
        } else if (response.status >= 500) {
          setError({
            type: "server",
            title: "Server Error",
            message: "Our servers are having a little hiccup right now.",
            suggestion: "Please try again in a few moments.",
          })
          return
        } else {
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
      }

      // If response is ok, parse the JSON
      const data = await response.json()
      console.log("Fetched from backend:", data)

      // Check if the backend returned an error in the response body
      if (data.error || (data.message && data.message.toLowerCase().includes("no flight available"))) {
        setError({
          type: "not_found",
          title: "Flight Not Found",
          message: data.message || "We couldn't find that flight in our system.",
          suggestion: "Double-check the flight number and try again.",
        })
        return
      }

      // Handle the case where data is null, undefined, or empty
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError({
          type: "not_found",
          title: "Flight Not Found",
          message: "We couldn't find that flight in our system.",
          suggestion: "Double-check the flight number and try again.",
        })
        return
      }

      // Convert data to array format
      const fetchedFlights = Array.isArray(data) ? data : [data]

      // Filter flights by the selected date
      const filteredByDate = fetchedFlights.filter((flight) => {
        if (!flight.scheduledDeparture) return false
        const flightDepartureDate = new Date(flight.scheduledDeparture)
        return flightDepartureDate.toDateString() === selectedDate.toDateString()
      })

      console.log("Filtered flights by date:", filteredByDate)

      // Set the results
      setSearchResults(filteredByDate)
      setSelectedFlight(null)

      // If no flights match the selected date
      if (filteredByDate.length === 0 && fetchedFlights.length > 0) {
        setError({
          type: "no_results",
          title: "No Flights on Selected Date",
          message: `Flight ${query} was found but not on ${formatDate(selectedDate)}.`,
          suggestion: "Try selecting a different date or check the flight schedule.",
        })
      } else if (filteredByDate.length === 0) {
        setError({
          type: "not_found",
          title: "Flight Not Found",
          message: "We couldn't find that flight in our system.",
          suggestion: "Double-check the flight number and try again.",
        })
      }
    } catch (err) {
      console.error("Fetch error:", err)

      // Handle network and other errors
      let errorInfo = {
        type: "network",
        title: "Connection Error",
        message: "Unable to connect to the flight service.",
        suggestion: "Please check your internet connection and try again.",
      }

      // Check for specific error types
      if (
        err.message.includes("Network request failed") ||
        err.message.includes("Failed to fetch") ||
        err.name === "TypeError" ||
        err.message.includes("fetch")
      ) {
        errorInfo = {
          type: "network",
          title: "Connection Error",
          message: "Unable to connect to the flight service.",
          suggestion: "Please check your internet connection and try again.",
        }
      } else if (err.message.includes("timeout") || err.name === "AbortError") {
        errorInfo = {
          type: "timeout",
          title: "Request Timeout",
          message: "The search is taking longer than usual.",
          suggestion: "Please try again with a stable connection.",
        }
      } else if (err.message.includes("HTTP error! status: 500")) {
        errorInfo = {
          type: "server",
          title: "Server Error",
          message: "Our servers are having a little hiccup right now.",
          suggestion: "Please try again in a few moments.",
        }
      }

      setError(errorInfo)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced renderFlightItem function with improved design
  const renderFlightItem = ({ item }) => {
    const isSelected =
      selectedFlight &&
      selectedFlight.flightNumber === item.flightNumber &&
      selectedFlight.scheduledDeparture === item.scheduledDeparture
    const statusColor = getStatusColor(item.status)
    const statusBgColor = getStatusBackgroundColor(item.status)
    const duration = calculateFlightDuration(item.scheduledDeparture, item.scheduledArrival)

    return (
      <TouchableOpacity
        style={[styles.enhancedFlightItem, isSelected && styles.enhancedFlightItemSelected]}
        onPress={() => setSelectedFlight(item)}
      >
        {/* Header with Flight Number and Status */}
        <View style={styles.enhancedFlightHeader}>
          <View style={styles.flightNumberContainer}>
            <View style={styles.flightIconContainer}>
              <Ionicons name="airplane" size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={styles.enhancedFlightNumber}>{item.flightNumber}</Text>
              {item.airline && <Text style={styles.airlineText}>{item.airline}</Text>}
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
            <Text style={[styles.statusBadgeText, { color: statusColor }]}>{item.status || "N/A"}</Text>
          </View>
        </View>

        {/* Route Information */}
        <View style={styles.enhancedRouteContainer}>
          {/* Departure */}
          <View style={styles.enhancedRouteBlock}>
            <Text style={styles.enhancedRouteTime}>
              {item.scheduledDeparture
                ? new Date(item.scheduledDeparture).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "--:--"}
            </Text>
            <Text style={styles.enhancedRouteAirport}>{item.departureAirport}</Text>
            <Text style={styles.enhancedRouteCity}>{item.departureCity}</Text>
          </View>

          {/* Flight Path */}
          <View style={styles.flightPathContainer}>
            <View style={styles.flightPath}>
              <View style={styles.pathDot} />
              <View style={styles.pathLine} />
              <Ionicons name="airplane" size={16} color="#3B82F6" style={styles.pathPlane} />
              <View style={styles.pathLine} />
              <View style={[styles.pathDot, styles.pathDotEnd]} />
            </View>
            {duration && <Text style={styles.durationText}>{duration}</Text>}
          </View>

          {/* Arrival */}
          <View style={styles.enhancedRouteBlock}>
            <Text style={styles.enhancedRouteTime}>
              {item.scheduledArrival
                ? new Date(item.scheduledArrival).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "--:--"}
            </Text>
            <Text style={styles.enhancedRouteAirport}>{item.arrivalAirport}</Text>
            <Text style={styles.enhancedRouteCity}>{item.arrivalCity}</Text>
          </View>
        </View>

        {/* Date Information */}
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </View>

        {/* Additional Flight Details */}
        {(item.gate || item.terminal || item.aircraft) && (
          <View style={styles.additionalDetails}>
            <View style={styles.detailsRow}>
              {item.gate && (
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={14} color="#6B7280" />
                  <Text style={styles.detailText}>Gate {item.gate}</Text>
                </View>
              )}
              {item.terminal && (
                <View style={styles.detailItem}>
                  <Ionicons name="business-outline" size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{item.terminal}</Text>
                </View>
              )}
            </View>
            {item.aircraft && (
              <View style={styles.detailItem}>
                <Ionicons name="airplane-outline" size={14} color="#6B7280" />
                <Text style={styles.detailText}>{item.aircraft}</Text>
              </View>
            )}
          </View>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <View style={styles.selectionIndicator}>
            <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
            <Text style={styles.selectionText}>Selected</Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  // Function to render each suggestion item (keeping your existing logic)
  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => selectSuggestion(item)}>
      <Ionicons
        name={
          item.type === "airline" ? "airplane-outline" : item.type === "airport" ? "flag-outline" : "flight-outline"
        }
        size={20}
        color="#666"
        style={{ marginRight: 10 }}
      />
      <View>
        <Text style={styles.suggestionItemMainText}>
          {item.type === "flight_number" ? `${item.airline} ${item.number}` : item.name}
        </Text>
        {item.type === "airline" && (
          <Text style={styles.suggestionItemSubText}>
            {item.code} • {item.iata}
          </Text>
        )}
        {item.type === "airport" && (
          <Text style={styles.suggestionItemSubText}>
            {item.code} • {item.city}
          </Text>
        )}
        {item.type === "flight_number" && <Text style={styles.suggestionItemSubText}>Flight Number</Text>}
      </View>
    </TouchableOpacity>
  )

  // Function to handle selection of a suggestion (keeping your existing logic)
  const selectSuggestion = (item) => {
    setSearchText(item.type === "flight_number" ? item.number : item.name)
    if (item.type === "flight_number") {
      performSearch(item.number)
    }
  }

  // Helper to format date for display (keeping your existing logic)
  const formatDate = (date) => {
    const options = {
      timeZone: "Africa/Accra",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
    const now = new Date().toLocaleString("en-US", options)
    const today = new Date(now)
    today.setHours(0, 0, 0, 0)
    const selected = new Date(date)
    selected.setHours(0, 0, 0, 0)
    const diffTime = selected.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Tomorrow"
    } else if (diffDays === -1) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    }
  }

  // Function to handle date change from the DateTimePicker (keeping your existing logic)
  const onDateChange = (event, pickedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false)
    }
    if (event.type === "set" || Platform.OS === "ios") {
      setShowDatePicker(false)
    }
    if (pickedDate) {
      setSelectedDate(pickedDate)
      if (searchText) {
        performSearch(searchText)
      }
    }
  }

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
          <Ionicons name="chevron-down-outline" size={16} color="#666" style={{ marginLeft: "auto" }} />
        </TouchableOpacity>
      </View>

      {/* Date Picker Component */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onDateChange}
        />
      )}

      {isLoading ? (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.statusText}>Searching for flights...</Text>
        </View>
      ) : error ? (
        <ErrorDisplay error={error} onRetry={() => performSearch(searchText)} />
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id || item.flightNumber + item.scheduledDeparture}
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

      {/* Enhanced Add Flight Floating Button */}
      {selectedFlight && (
        <View style={styles.enhancedBottomButtonContainer}>
          <TouchableOpacity
            style={styles.enhancedAddFlightButton}
            onPress={() => {
              router.navigate({
                pathname: "/HomeScreens/homescreen",
                params: { addedFlight: JSON.stringify(selectedFlight) },
              })
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.enhancedAddFlightButtonText}>Add Flight</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Keeping all your existing styles...
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    fontSize: 16,
    color: "#333",
  },
  dateSelector: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginTop: 20,
    marginBottom: 10,
  },
  frequentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  frequentItemMainText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  frequentItemSubText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  moreOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  moreOptionText: {
    fontSize: 16,
    color: "#333",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  suggestionItemMainText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  suggestionItemSubText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  emptyResults: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyResultsText: {
    color: "#999",
    fontSize: 16,
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  errorContent: {
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    padding: 30,
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  errorIcon: {
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: "#48484A",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
  },
  errorSuggestion: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  // NEW ENHANCED FLIGHT CARD STYLES
  enhancedFlightItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  enhancedFlightItemSelected: {
    borderColor: "#3B82F6",
    borderWidth: 2,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.2,
  },
  enhancedFlightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  flightNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  enhancedFlightNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  airlineText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  enhancedRouteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  enhancedRouteBlock: {
    flex: 1,
    alignItems: "center",
  },
  enhancedRouteTime: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  enhancedRouteAirport: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },
  enhancedRouteCity: {
    fontSize: 14,
    color: "#6B7280",
  },
  flightPathContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  flightPath: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  pathDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  pathDotEnd: {
    backgroundColor: "#10B981",
  },
  pathLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  pathPlane: {
    position: "absolute",
    left: "50%",
    marginLeft: -8,
    transform: [{ rotate: "90deg" }],
  },
  durationText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  additionalDetails: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
    marginTop: 16,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  selectionIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  selectionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginLeft: 8,
  },
  enhancedBottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.98)",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  enhancedAddFlightButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  enhancedAddFlightButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})
