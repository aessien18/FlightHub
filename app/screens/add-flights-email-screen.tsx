"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function AddFlightsEmailScreen() {
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
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Add Flights via Email</Text>
        <Text style={styles.subtitle}>
          Forward your flight confirmation emails to automatically add flights to Airwise.
        </Text>

        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("./airwise-pro-screen" as any)}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>Automatically import flights from your email confirmations</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <View style={styles.instructionSection}>
          <Text style={styles.instructionTitle}>How it works:</Text>
          <Text style={styles.instructionText}>
            1. Forward flight confirmation emails to your unique Airwise email address{"\n"}
            2. We'll automatically extract flight details{"\n"}
            3. Your flights will appear in the app within minutes
          </Text>
        </View>

        <TouchableOpacity style={styles.getStartedButton} onPress={() => console.log("Get Started")}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
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
  instructionSection: {
    marginBottom: 40,
  },
  instructionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  instructionText: {
    color: "#8E8E93",
    fontSize: 16,
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  getStartedText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
})
