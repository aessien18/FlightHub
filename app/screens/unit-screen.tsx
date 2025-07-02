"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function UnitScreen() {
  const router = useRouter()
  const [selectedSpeedUnit, setSelectedSpeedUnit] = useState("mph")
  const [selectedAltitudeUnit, setSelectedAltitudeUnit] = useState("ft")

  const UnitToggle = ({
    options,
    selected,
    onSelect,
  }: {
    options: string[]
    selected: string
    onSelect: (unit: string) => void
  }) => {
    return (
      <View style={styles.toggleContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.toggleButton,
              selected === option && styles.toggleButtonSelected,
              index === 0 && styles.toggleButtonFirst,
              index === options.length - 1 && styles.toggleButtonLast,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.toggleText, selected === option && styles.toggleTextSelected]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Units</Text>
        <Text style={styles.subtitle}>
          Set your preferred units for this device. Other units can be changed in your device settings.
        </Text>

        {/* Aircraft Speed Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="airplane" size={20} color="#ffffff" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Aircraft Speed</Text>
          </View>
          <Text style={styles.sectionDescription}>Speed relative to the ground.</Text>
          <UnitToggle options={["mph", "km/h", "kt"]} selected={selectedSpeedUnit} onSelect={setSelectedSpeedUnit} />
        </View>

        {/* Altitude Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up" size={20} color="#ffffff" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Altitude</Text>
          </View>
          <Text style={styles.sectionDescription}>
            {
              'Zero on the ground, and "Standard Pressure Setting" in flight to ensure consistent flight levels worldwide.'
            }
          </Text>
          <UnitToggle
            options={["ft", "km", "m", "FL"]}
            selected={selectedAltitudeUnit}
            onSelect={setSelectedAltitudeUnit}
          />
        </View>
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#999999",
    lineHeight: 22,
    marginBottom: 32,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#999999",
    lineHeight: 20,
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonFirst: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  toggleButtonLast: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  toggleButtonSelected: {
    backgroundColor: "#666666",
    borderRadius: 6,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#999999",
  },
  toggleTextSelected: {
    color: "#ffffff",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#ffffff",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 8,
  },
})
