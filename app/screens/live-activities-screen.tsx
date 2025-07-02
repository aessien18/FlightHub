"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"

export default function LiveActivitiesScreen() {
  const router = useRouter()
  const [myFlightsEnabled, setMyFlightsEnabled] = useState(true)
  const [friendsFlightsEnabled, setFriendsFlightsEnabled] = useState(false)
  const [autoStartEnabled, setAutoStartEnabled] = useState(true)

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Live Activities</Text>
        <Text style={styles.subtitle}>
          Show real-time flight updates on your Lock Screen and Dynamic Island (iPhone 14 Pro and later).
        </Text>

        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("./flighthub-pro-screen" as any)}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>Get Live Activities for all your flights and friends</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>My Flights</Text>
              <Text style={styles.settingDescription}>Show Live Activities for your flights</Text>
            </View>
            <Switch
              value={myFlightsEnabled}
              onValueChange={setMyFlightsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
            <Text style={styles.settingTitle}>Friends&#39; Flights</Text>
<Text style={styles.settingDescription}>Show Live Activities for friends&#39; flights</Text>
            </View>
            <Switch
              value={friendsFlightsEnabled}
              onValueChange={setFriendsFlightsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Auto Start</Text>
              <Text style={styles.settingDescription}>Automatically start Live Activities for upcoming flights</Text>
            </View>
            <Switch
              value={autoStartEnabled}
              onValueChange={setAutoStartEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Live Activities</Text>
          <Text style={styles.infoText}>
            Live Activities appear on your Lock Screen and in the Dynamic Island, showing real-time flight information
            like gate changes, delays, and boarding status without opening the app.
          </Text>
        </View>
      </ScrollView>
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
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingDescription: {
    color: "#8E8E93",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#374151",
    marginLeft: 16,
  },
  infoSection: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
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
})
