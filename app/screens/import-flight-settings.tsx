"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ImportFlightSettings() {
  const router = useRouter()

  const importOptions = [
    {
      title: "Email Import",
      description: "Forward confirmation emails to add flights",
      icon: "mail",
      color: "#007AFF",
    },
    {
      title: "Calendar Import",
      description: "Import flights from your calendar events",
      icon: "calendar",
      color: "#34C759",
    },
    {
      title: "Manual Entry",
      description: "Add flights manually with flight numbers",
      icon: "create",
      color: "#FF9500",
    },
    {
      title: "TripIt Sync",
      description: "Sync flights from your TripIt account",
      icon: "sync",
      color: "#AF52DE",
    },
  ]

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
        <Text style={styles.title}>Import Flights</Text>
        <Text style={styles.subtitle}>Choose how you want to add flights to FlightHub.</Text>

        <View style={styles.optionsList}>
          {importOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionItem} onPress={() => console.log(option.title)}>
              <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                <Ionicons name={option.icon as any} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
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
  optionsList: {
    gap: 16,
  },
  optionItem: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
})
