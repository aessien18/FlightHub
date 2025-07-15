"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function AboutScreen() {
  const router = useRouter()

  const handleSocialLink = async (platform: string) => {
    const urls = {
      twitter: "https://twitter.com/flighthub",
      instagram: "https://instagram.com/flighthub",
      team: "https://flighthub.com/team",
    }

    try {
      const url = urls[platform as keyof typeof urls]
      if (url) {
        await Linking.openURL(url)
      }
    } catch (error) {
      console.error("Failed to open URL:", error)
    }
  }

  const handleLegalLink = async (type: string) => {
    const urls = {
      terms: "https://flighthub.com/terms",
      privacy: "https://flighthub.com/privacy",
      licences: "https://flighthub.com/licences",
      providers: "https://flighthub.com/data-providers",
    }

    try {
      const url = urls[type as keyof typeof urls]
      if (url) {
        await Linking.openURL(url)
      }
    } catch (error) {
      console.error("Failed to open URL:", error)
    }
  }

  const renderListItem = (title: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Text style={styles.listItemText}>{title}</Text>
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
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight}>
          <Text style={styles.aboutTitle}>About</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Follow Section */}
        <Text style={styles.sectionHeader}>FOLLOW</Text>
        <View style={styles.section}>
          {renderListItem("Twitter", () => handleSocialLink("twitter"))}
          <View style={styles.divider} />
          {renderListItem("Instagram", () => handleSocialLink("instagram"))}
          <View style={styles.divider} />
          {renderListItem("Team", () => handleSocialLink("team"))}
        </View>

        {/* Legal Section */}
        <View style={styles.legalSection}>
          {renderListItem("Terms of Service", () => handleLegalLink("terms"))}
          <View style={styles.divider} />
          {renderListItem("Privacy Policy", () => handleLegalLink("privacy"))}
          <View style={styles.divider} />
          {renderListItem("Licences", () => handleLegalLink("licences"))}
          <View style={styles.divider} />
          {renderListItem("Data Providers", () => handleLegalLink("providers"))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 4.5.1 (4602)</Text>
          <Text style={styles.copyrightText}>© 2018-2025 Flighthub LLC. All rights reserved. Flighthub®</Text>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#007AFF",
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 12,
    marginTop: 24,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
  },
  legalSection: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 60,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#374151",
    marginLeft: 16,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 16,
  },
})
