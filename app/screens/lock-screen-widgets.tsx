"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"

export default function LockScreenWidgets() {
  const router = useRouter()
  const [nextFlightEnabled, setNextFlightEnabled] = useState(true)
  const [countdownEnabled, setCountdownEnabled] = useState(false)
  const [statusEnabled, setStatusEnabled] = useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Lock Screen Widgets</Text>
        <Text style={styles.subtitle}>Add flight information widgets to your Lock Screen (iOS 16 and later).</Text>

        <View style={styles.section}>
          <View style={styles.widgetItem}>
            <View style={styles.widgetLeft}>
              <View style={[styles.widgetPreview, { backgroundColor: "#007AFF" }]}>
                <Ionicons name="airplane" size={16} color="#FFFFFF" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={styles.widgetTitle}>Next Flight</Text>
                <Text style={styles.widgetDescription}>Show your upcoming flight details</Text>
              </View>
            </View>
            <Switch
              value={nextFlightEnabled}
              onValueChange={setNextFlightEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.widgetItem}>
            <View style={styles.widgetLeft}>
              <View style={[styles.widgetPreview, { backgroundColor: "#34C759" }]}>
                <Ionicons name="time" size={16} color="#FFFFFF" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={styles.widgetTitle}>Countdown</Text>
                <Text style={styles.widgetDescription}>Time until departure</Text>
              </View>
            </View>
            <Switch
              value={countdownEnabled}
              onValueChange={setCountdownEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.widgetItem}>
            <View style={styles.widgetLeft}>
              <View style={[styles.widgetPreview, { backgroundColor: "#FF9500" }]}>
                <Ionicons name="information-circle" size={16} color="#FFFFFF" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={styles.widgetTitle}>Flight Status</Text>
                <Text style={styles.widgetDescription}>Real-time status updates</Text>
              </View>
            </View>
            <Switch
              value={statusEnabled}
              onValueChange={setStatusEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.instructionSection}>
          <Text style={styles.instructionTitle}>How to add Lock Screen widgets:</Text>
          <Text style={styles.instructionText}>
  1. Lock your iPhone{"\n"}
  2. Touch and hold the Lock Screen{"\n"}
  3. Tap &quot;Customize&quot;{"\n"}
  4. Tap &quot;Add Widgets&quot;{"\n"}
  5. Select &quot;FlightHub&quot;</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    marginBottom: 32,
  },
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
  },
  widgetItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  widgetLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  widgetPreview: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  widgetInfo: {
    flex: 1,
  },
  widgetTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 2,
  },
  widgetDescription: {
    color: "#8E8E93",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#374151",
    marginLeft: 16,
  },
  instructionSection: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
  },
  instructionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },
  instructionText: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
})
