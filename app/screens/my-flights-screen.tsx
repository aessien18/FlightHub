"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"

export default function MyFlightsScreen() {
  const router = useRouter()
  const [basicsEnabled, setBasicsEnabled] = useState(true)
  const [aboveBeyondEnabled, setAboveBeyondEnabled] = useState(false)
  const [flightPlansEnabled, setFlightPlansEnabled] = useState(false)
  const [arrivalInfoEnabled, setArrivalInfoEnabled] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>My Flights</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Pick the notification types you receive for your flights.</Text>

        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("/screens/flighthub-pro-screen")}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>
              {"Get the world's fastest alerts for delays, gate changes, and more..."}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          {/* Basics */}
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#007AFF" }]}>
                <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Basics</Text>
                <Text style={styles.optionDescription}>
                  The most critical alerts like gate changes, delays, & cancellations.
                </Text>
              </View>
            </View>
            <Switch
              value={basicsEnabled}
              onValueChange={setBasicsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Above & Beyond */}
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#34C759" }]}>
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Above & Beyond</Text>
                <Text style={styles.optionDescription}>
                  Want more? Get alerts on inbound aircraft status, connection assistance, and aircraft changes.
                </Text>
              </View>
            </View>
            <Switch
              value={aboveBeyondEnabled}
              onValueChange={setAboveBeyondEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Flight Plans */}
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#AF52DE" }]}>
                <Ionicons name="map" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Flight Plans</Text>
                <Text style={styles.optionDescription}>
                  Get a map of the flight path when the pilot files it with authorities.
                </Text>
              </View>
            </View>
            <Switch
              value={flightPlansEnabled}
              onValueChange={setFlightPlansEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Arrival Information */}
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#FF9500" }]}>
                <Ionicons name="airplane" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Arrival Information</Text>
                <Text style={styles.optionDescription}>Get alerts for landing, gate arrival, and baggage claim.</Text>
              </View>
            </View>
            <Switch
              value={arrivalInfoEnabled}
              onValueChange={setArrivalInfoEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#007AFF",
    fontSize: 17,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 24,
  },
  proBanner: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#AF52DE",
  },
  proContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  proLabel: {
    backgroundColor: "#AF52DE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  proText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  proDescription: {
    color: "#AF52DE",
    fontSize: 15,
    flex: 1,
  },
  optionsContainer: {
    flex: 1,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#38383A",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 2,
  },
  optionDescription: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
})
