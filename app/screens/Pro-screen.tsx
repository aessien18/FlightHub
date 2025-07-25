"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function FlighthubProScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flighthub Pro</Text>
      </View>                                

      {/* Content */}
      <View style={styles.content}>
        {/* Description with tappable Full Details */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Flighthub Pro is included on your first flight, totally free without a trial.{"\n"}
            Flights are counted as they occur, not when they are entered.{" "}
          </Text>
          <TouchableOpacity onPress={() => console.log("Full Details")}>
            <Text style={styles.linkText}>Full Details...</Text>
          </TouchableOpacity>
        </View>

        {/* Current Plan Section - All Tappable */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.planRow} onPress={() => console.log("Current Plan")}>
            <Text style={styles.planLabel}>Current Plan</Text>
            <Text style={styles.planValue}>Complimentary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.planRow} onPress={() => console.log("Ends Info")}>
            <Text style={styles.planLabel}>Ends</Text>
            <Text style={styles.planValue}>1 Flight Remaining</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/Pro-screen')}> 
            <View>
              <Text style={styles.menuTitle}>View Flighthub Pro</Text>
              <Text style={styles.menuSubtitle}>Unlimited features & flights for a year</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/settings')}> 
            <Text style={styles.menuTitle}>Compare Features</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/settings')}> 
            <Text style={styles.menuTitle}>Restore Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/settings')}> 
            <Text style={styles.menuTitle}>Manage Subscription</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  description: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
  linkText: {
    color: "#007AFF",
  },
  section: {
    marginBottom: 40,
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#38383A",
  },
  planLabel: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  planValue: {
    color: "#8E8E93",
    fontSize: 17,
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#38383A",
  },
  menuTitle: {
    color: "#007AFF",
    fontSize: 17,
  },
  menuSubtitle: {
    color: "#8E8E93",
    fontSize: 15,
    marginTop: 2,
  },
})
