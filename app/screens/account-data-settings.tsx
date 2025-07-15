"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function AccountDataSettings() {
  const router = useRouter()

  const renderListItem = (title: string, onPress: () => void, subtitle?: string) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemText}>{title}</Text>
          {subtitle && <Text style={styles.listItemSubtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </TouchableOpacity>
    )
  }

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
        <Text style={styles.title}>Account Data</Text>
        <Text style={styles.subtitle}>Manage your account data and privacy settings.</Text>

        <View style={styles.section}>
          {renderListItem("Export Data", () => console.log("Export Data"), "Download your flight data")}
          <View style={styles.divider} />
          {renderListItem("Delete Account", () => console.log("Delete Account"), "Permanently delete your account")}
          <View style={styles.divider} />
          {renderListItem("Privacy Settings", () => console.log("Privacy Settings"), "Manage data sharing preferences")}
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
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listItemContent: {
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  listItemSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#374151",
    marginLeft: 16,
  },
})
