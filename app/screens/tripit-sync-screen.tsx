"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function TripItSyncScreen() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)

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
        <Text style={styles.title}>TripIt Sync</Text>
        <Text style={styles.subtitle}>Automatically sync your flights from TripIt to FlightHub.</Text>

        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("./flighthub-pro-screen" as any)}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>Sync unlimited flights from TripIt automatically</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Connection Status */}
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusIndicator, { backgroundColor: isConnected ? "#34C759" : "#FF3B30" }]} />
            <Text style={styles.statusText}>{isConnected ? "Connected to TripIt" : "Not Connected"}</Text>
          </View>

          {!isConnected && (
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => {
                console.log("Connect TripIt")
                setIsConnected(true)
              }}
            >
              <Text style={styles.connectButtonText}>Connect TripIt Account</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* How it works */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How TripIt Sync works:</Text>
          <Text style={styles.infoText}>
  1. Connect your TripIt account{"\n"}
  2. We&#39;ll automatically import your existing trips{"\n"}
  3. New flights added to TripIt will sync to FlightHub{"\n"}
  4. Changes in TripIt will update in FlightHub</Text>
        </View>

        {isConnected && (
          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={() => {
              console.log("Disconnect TripIt")
              setIsConnected(false)
            }}
          >
            <Text style={styles.disconnectButtonText}>Disconnect TripIt</Text>
          </TouchableOpacity>
        )}
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
  statusSection: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
  connectButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  connectButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  infoSection: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoText: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
  disconnectButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  disconnectButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
