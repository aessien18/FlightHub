"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function AppIconSettings() {
  const router = useRouter()
  const [selectedIcon, setSelectedIcon] = useState("default")

  const iconOptions = [
    { id: "default", name: "Default", color: "#007AFF" },
    { id: "dark", name: "Dark", color: "#1C1C1E" },
    { id: "purple", name: "Purple", color: "#AF52DE" },
    { id: "green", name: "Green", color: "#34C759" },
    { id: "orange", name: "Orange", color: "#FF9500" },
    { id: "red", name: "Red", color: "#FF3B30" },
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
        <Text style={styles.title}>App Icon</Text>
        <Text style={styles.subtitle}>Choose your preferred app icon style.</Text>

        <View style={styles.iconGrid}>
          {iconOptions.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              style={[styles.iconOption, selectedIcon === icon.id && styles.selectedIconOption]}
              onPress={() => setSelectedIcon(icon.id)}
            >
              <View style={[styles.iconPreview, { backgroundColor: icon.color }]}>
                <Ionicons name="airplane" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.iconName}>{icon.name}</Text>
              {selectedIcon === icon.id && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark" size={16} color="#007AFF" />
                </View>
              )}
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
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconOption: {
    width: "48%",
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  selectedIconOption: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  iconPreview: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
})
