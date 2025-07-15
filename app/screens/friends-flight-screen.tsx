"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type NotificationLevel = "none" | "justLanded" | "basics" | "everything"

export default function FriendsFlightScreen() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<NotificationLevel>("justLanded")

  const notificationOptions = [
    {
      id: "none" as NotificationLevel,
      title: "None",
      description: "No alerts please. I'll just view their flights in the app.",
      icon: "notifications-off",
      iconColor: "#FF3B30",
    },
    {
      id: "justLanded" as NotificationLevel,
      title: "Just Landed",
      description: "Only notify me when they land.",
      icon: "airplane",
      iconColor: "#34C759",
    },
    {
      id: "basics" as NotificationLevel,
      title: "Basics",
      description: "Add alerts for major disruptions, takeoff, 1h until arrival, and on morning of travel.",
      icon: "notifications",
      iconColor: "#007AFF",
    },
    {
      id: "everything" as NotificationLevel,
      title: "Everything",
      description: "Every alert. Check-in, gate change, disruptions, landing, baggage, etc.",
      icon: "notifications-circle",
      iconColor: "#AF52DE",
    },
  ]

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
        <Text style={styles.title}>{"Friends' Flights"}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{"Pick the default notifications you receive about friends' flights."}</Text>

        {/* Customize text */}
        <Text style={styles.customizeText}>Customize this per friend in FlightHub Friends.</Text>

        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("./flighthub-pro-screen" as any)}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>Alerts for picking up friends, monitoring loved ones, and more...</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Notification Options */}
        <View style={styles.optionsContainer}>
          {notificationOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionItem, selectedLevel === option.id && styles.selectedOption]}
              onPress={() => setSelectedLevel(option.id)}
            >
              <View style={styles.optionLeft}>
                <View style={[styles.iconContainer, { backgroundColor: option.iconColor }]}>
                  <Ionicons name={option.icon as any} size={20} color="#FFFFFF" />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </View>
              {selectedLevel === option.id && <Ionicons name="checkmark" size={20} color="#007AFF" />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <TouchableOpacity style={styles.footer} onPress={() => router.push("./live-activities-screen" as any)}>
          <Text style={styles.footerText}>
            {"To adjust Live Activity preferences for Friends' Flights, visit Settings > Live Activities"}
          </Text>
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
    marginBottom: 16,
  },
  customizeText: {
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
    marginBottom: 32,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#1C1C1E",
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#007AFF",
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
  footer: {
    marginTop: "auto",
    paddingBottom: 20,
  },
  footerText: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
  },
})
