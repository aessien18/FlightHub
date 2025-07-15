"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"

export default function CalendarSyncScreen() {
  const router = useRouter()
  const [importFlightsEnabled, setImportFlightsEnabled] = useState(false)
  const [exportFlightsEnabled, setExportFlightsEnabled] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar Sync</Text>
        <TouchableOpacity style={styles.helpButton} onPress={() => console.log("Help")}>
          <Ionicons name="help-circle-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("./flighthub-pro-screen" as any)}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>
              Enjoy complimentary Flighthub Pro! Limited to one year of past flights. Upgrade to remove limit.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Main Description */}
        <Text style={styles.mainTitle}>Keep your calendar accurate and flights in sync.</Text>
        <Text style={styles.mainDescription}>
          Import flights in your calendar for tracking, plus past flights. Export flights with reservation details and
          live updating to keep your calendar accurate.
        </Text>

        {/* Import Flights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Import Flights</Text>
            <Switch
              value={importFlightsEnabled}
              onValueChange={setImportFlightsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity
            style={[styles.optionRow, !importFlightsEnabled && styles.disabledOption]}
            onPress={importFlightsEnabled ? () => console.log("Choose Import Calendars") : undefined}
            disabled={!importFlightsEnabled}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="calendar" size={24} color={importFlightsEnabled ? "#FFFFFF" : "#8E8E93"} />
              <Text style={[styles.optionTitle, !importFlightsEnabled && styles.disabledText]}>Choose Calendars</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={[styles.selectText, !importFlightsEnabled && styles.disabledText]}>Select</Text>
              <Ionicons name="chevron-forward" size={16} color={importFlightsEnabled ? "#8E8E93" : "#48484A"} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Export Flights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Export Flights</Text>
            <Switch
              value={exportFlightsEnabled}
              onValueChange={setExportFlightsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity
            style={[styles.optionRow, !exportFlightsEnabled && styles.disabledOption]}
            onPress={exportFlightsEnabled ? () => console.log("Choose Export Calendar") : undefined}
            disabled={!exportFlightsEnabled}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="calendar-outline" size={24} color={exportFlightsEnabled ? "#FFFFFF" : "#8E8E93"} />
              <Text style={[styles.optionTitle, !exportFlightsEnabled && styles.disabledText]}>Choose Calendar</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={[styles.selectText, !exportFlightsEnabled && styles.disabledText]}>Select</Text>
              <Ionicons name="chevron-forward" size={16} color={exportFlightsEnabled ? "#8E8E93" : "#48484A"} />
            </View>
          </TouchableOpacity>
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
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#007AFF",
    fontSize: 17,
    marginLeft: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  helpButton: {
    position: "absolute",
    right: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  proBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  proContent: {
    flex: 1,
    paddingRight: 10,
  },
  proLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  proText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 4,
  },
  proDescription: {
    color: "#8E8E93",
    fontSize: 14,
    lineHeight: 18,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mainDescription: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
  },
  disabledOption: {
    backgroundColor: "#2C2C2E",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  disabledText: {
    color: "#8E8E93",
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectText: {
    color: "#8E8E93",
    fontSize: 14,
    marginRight: 4,
  },
})


// ... (styles unchanged)
