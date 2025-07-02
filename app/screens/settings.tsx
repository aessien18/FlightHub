"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import type React from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface SettingsItemProps {
  icon: string
  label: string
  onPress: () => void
  showChevron?: boolean
  customContent?: React.ReactNode
}

interface SectionHeaderProps {
  title: string
}

const SettingsScreen = () => {
  const router = useRouter()

  const SettingsItem = ({ icon, label, onPress, showChevron = true, customContent }: SettingsItemProps) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon as any} size={24} color="#D1D5DB" style={styles.icon} />
        <Text style={styles.settingsItemText}>{label}</Text>
      </View>
      {customContent || (showChevron && <Ionicons name="chevron-forward" size={20} color="#6B7280" />)}
    </TouchableOpacity>
  )

  const SectionHeader = ({ title }: SectionHeaderProps) => <Text style={styles.sectionHeader}>{title}</Text>

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* FlightHub Pro Section */}
        <View style={styles.proSection}>
          <TouchableOpacity style={styles.proCard} onPress={() => router.push("./flighthub-pro-screen" as any)}>
            <View style={styles.proCardLeft}>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
              <View style={styles.proInfo}>
                <Text style={styles.proTitle}>FlightHub Pro</Text>
                <Text style={styles.proSubtitle}>1 complimentary flight remaining</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Home Screen Widgets & Apple Watch */}
        <View style={styles.section}>
          <SettingsItem
            icon="grid-outline"
            label="Home Screen Widgets"
            onPress={() => router.push("./home-screen-widgets" as any)}
          />
          <SettingsItem
            icon="watch-outline"
            label="Apple Watch"
            onPress={() => router.push("./apple-watch-settings" as any)}
          />
        </View>

        {/* ALERTS Section */}
        <View style={styles.section}>
          <SectionHeader title="ALERTS" />
          <SettingsItem
            icon="notifications-outline"
            label="My Flights"
            onPress={() => router.push("./my-flights-screen" as any)}
          />
          <SettingsItem
            icon="people-outline"
            label="Friends' Flights"
            onPress={() => router.push("./friends-flight-screen" as any)}
          />
        </View>

        {/* AUTOMATIONS Section */}
        <View style={styles.section}>
          <SectionHeader title="AUTOMATIONS" />
          <SettingsItem
            icon="calendar-outline"
            label="Calendar Sync"
            onPress={() => router.push("./calendar-sync-screen" as any)}
          />
          <SettingsItem
            icon="checkmark-circle-outline"
            label="TripIt Sync"
            onPress={() => router.push("./tripit-sync-screen" as any)}
          />
          <SettingsItem
            icon="mail-outline"
            label="Add Flights via Email"
            onPress={() => router.push("./add-flights-email-screen" as any)}
          />
        </View>

        {/* EXTENSIONS Section */}
        <View style={styles.section}>
          <SectionHeader title="EXTENSIONS" />
          <SettingsItem
            icon="pulse-outline"
            label="Live Activities"
            onPress={() => router.push("./live-activities-screen" as any)}
          />
          <SettingsItem
            icon="lock-closed-outline"
            label="Lock Screen Widgets"
            onPress={() => router.push("./lock-screen-widgets" as any)}
          />
        </View>

        {/* CUSTOMIZE Section */}
        <View style={styles.section}>
          <SectionHeader title="CUSTOMIZE" />
          <SettingsItem
            icon="image-outline"
            label="App Icon"
            onPress={() => router.push("./app-icon-settings" as any)}
          />
          <SettingsItem icon="list-outline" label="Units" onPress={() => router.push("./unit-screen" as any)} />
        </View>

        {/* MANAGE Section */}
        <View style={styles.section}>
          <SectionHeader title="MANAGE" />
          <SettingsItem
            icon="download-outline"
            label="Import Flights"
            onPress={() => router.push("./import-flight-settings" as any)}
          />
          <SettingsItem
            icon="server-outline"
            label="Account Data"
            onPress={() => router.push("./account-data-settings" as any)}
          />
        </View>

        {/* HELP CENTER Section */}
        <View style={styles.section}>
          <SectionHeader title="HELP CENTER" />
          <SettingsItem icon="help-circle-outline" label="FAQ" onPress={() => router.push("./faq-settings" as any)} />
          <SettingsItem
            icon="chatbubble-outline"
            label="Send Feedback"
            onPress={() => router.push("./send-feedback-modal" as any)}
          />
          <SettingsItem
            icon="sparkles-outline"
            label="What's New"
            onPress={() => console.log("Navigate to What's New")}
          />
        </View>

        {/* MORE Section */}
        <View style={styles.section}>
          <SectionHeader title="MORE" />
          <SettingsItem
            icon="gift-outline"
            label="Give Free Flights to Friends"
            onPress={() => console.log("Navigate to Give Free Flights")}
          />
          <SettingsItem
            icon="person-add-outline"
            label="Join FlightHub Insiders"
            onPress={() => console.log("Navigate to Join Insiders")}
          />
          <SettingsItem
            icon="information-circle-outline"
            label="About"
            onPress={() => router.push("./about-screen" as any)}
          />
        </View>

        {/* Footer Quote */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{"Come fly with me, let's fly, let's fly away"}</Text>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorBar} />
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  doneButton: {
    fontSize: 18,
    fontWeight: "500",
    color: "#60A5FA",
  },
  scrollView: {
    flex: 1,
  },
  proSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  proCard: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  proCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  proBadge: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  proBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  proInfo: {
    flex: 1,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#A855F7",
    marginBottom: 2,
  },
  proSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9CA3AF",
    marginBottom: 12,
    letterSpacing: 1,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 12,
    width: 24,
  },
  settingsItemText: {
    fontSize: 18,
    color: "#FFFFFF",
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
  },
  bottomSpacing: {
    height: 20,
  },
  homeIndicator: {
    alignItems: "center",
    paddingBottom: 8,
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    opacity: 0.6,
  },
})

export default SettingsScreen
