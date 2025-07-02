"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"

export default function HomeScreenWidgets() {
  const router = useRouter()
  const [smallWidgetEnabled, setSmallWidgetEnabled] = useState(true)
  const [mediumWidgetEnabled, setMediumWidgetEnabled] = useState(false)
  const [largeWidgetEnabled, setLargeWidgetEnabled] = useState(false)

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
        <Text style={styles.title}>Home Screen Widgets</Text>
        <Text style={styles.subtitle}>Add FlightHub widgets to your home screen for quick flight information.</Text>

        <View style={styles.section}>
          <View style={styles.widgetItem}>
            <View style={styles.widgetLeft}>
              <View style={[styles.widgetPreview, styles.smallWidget]}>
                <Ionicons name="airplane" size={16} color="#FFFFFF" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={styles.widgetTitle}>Small Widget</Text>
                <Text style={styles.widgetDescription}>Next flight countdown</Text>
              </View>
            </View>
            <Switch
              value={smallWidgetEnabled}
              onValueChange={setSmallWidgetEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.widgetItem}>
            <View style={styles.widgetLeft}>
              <View style={[styles.widgetPreview, styles.mediumWidget]}>
                <Ionicons name="airplane" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={styles.widgetTitle}>Medium Widget</Text>
                <Text style={styles.widgetDescription}>Flight details and status</Text>
              </View>
            </View>
            <Switch
              value={mediumWidgetEnabled}
              onValueChange={setMediumWidgetEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.widgetItem}>
            <View style={styles.widgetLeft}>
              <View style={[styles.widgetPreview, styles.largeWidget]}>
                <Ionicons name="airplane" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={styles.widgetTitle}>Large Widget</Text>
                <Text style={styles.widgetDescription}>Full flight timeline</Text>
              </View>
            </View>
            <Switch
              value={largeWidgetEnabled}
              onValueChange={setLargeWidgetEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.instructionSection}>
          <Text style={styles.instructionTitle}>How to add widgets:</Text>
          <Text style={styles.instructionText}>
            1. Long press on your home screen{"\n"}
            2. Tap the "+" button{"\n"}
            3. Search for "FlightHub"{"\n"}
            4. Choose your preferred widget size
          </Text>
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
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#007AFF",
  },
  smallWidget: {
    width: 40,
    height: 40,
  },
  mediumWidget: {
    width: 50,
    height: 40,
  },
  largeWidget: {
    width: 60,
    height: 50,
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
