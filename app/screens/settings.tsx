// Your existing file: SettingsScreen.tsx

"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import type React from "react"
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";

// Import your theme context and colors
import { useTheme, lightColors, darkColors } from './ThemeContext';


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
  // Use the theme hook to get the current theme and toggle function
  const { theme, toggleTheme } = useTheme();
  // Select the appropriate color palette based on the current theme
  const colors = theme === 'light' ? lightColors : darkColors;

  const SettingsItem = ({ icon, label, onPress, showChevron = true, customContent }: SettingsItemProps) => (
    <TouchableOpacity style={[styles.settingsItem, { borderBottomColor: colors.itemBorder }]} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        {/* Icon color changes based on theme */}
        <Ionicons name={icon as any} size={24} color={colors.iconColor} style={styles.icon} />
        {/* Text color changes based on theme */}
        <Text style={[styles.settingsItemText, { color: colors.text }]}>{label}</Text>
      </View>
      {/* Chevron color changes based on theme */}
      {customContent || (showChevron && <Ionicons name="chevron-forward" size={20} color={colors.sectionHeader} />)}
    </TouchableOpacity>
  )

  const SectionHeader = ({ title }: SectionHeaderProps) => <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>{title}</Text>

  return (
    // Container background changes based on theme
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* StatusBar style changes based on theme */}
      <StatusBar barStyle={theme === 'dark' ? "light-content" : "dark-content"} backgroundColor={colors.headerBackground} />

      {/* Header */}
      {/* Header background and text color changes based on theme */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.doneButton, { color: colors.doneButton }]}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* FlightHub Pro Section */}
        <View style={styles.proSection}>
          {/* ProCard background and border color changes based on theme */}
          <TouchableOpacity style={[styles.proCard, { backgroundColor: colors.proCardBackground, borderColor: colors.proCardBorder }]} onPress={() => router.push("/screens/Pro-screen")}> 
            <View style={styles.proCardLeft}>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
              <View style={styles.proInfo}>
                {/* Pro title and subtitle colors change based on theme */}
                <Text style={[styles.proTitle, { color: colors.proTitle }]}>FlightHub Pro</Text>
                <Text style={[styles.proSubtitle, { color: colors.proSubtitle }]}>1 complimentary flight remaining</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.sectionHeader} />
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
          {/* NEW: Theme Toggle Item */}
          <SettingsItem
            icon={theme === 'dark' ? "moon-outline" : "sunny-outline"} // Icon changes with theme
            label="Theme"
            showChevron={false} // No chevron for the switch
            customContent={
              <Switch
                // Track and thumb colors for the switch
                trackColor={{ false: "#767577", true: Platform.OS === 'android' ? "#81b0ff" : "#32ade6" }} // Adjusted for iOS blue
                thumbColor={Platform.OS === 'android' ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme} // Call toggleTheme when switch is changed
                value={theme === 'dark'} // Switch is 'on' when theme is dark
              />
            }
            onPress={toggleTheme} // Pressing the entire row also toggles the theme
          />
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
          {/* Footer text color changes based on theme */}
          <Text style={[styles.footerText, { color: colors.sectionHeader }]}>{"Come fly with me, let's fly, let's fly away"}</Text>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        {/* Home indicator bar color changes based on theme */}
        <View style={[styles.homeIndicatorBar, { backgroundColor: colors.homeIndicatorBar }]} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor handled dynamically
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
    // backgroundColor handled dynamically
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    // color handled dynamically
  },
  doneButton: {
    fontSize: 18,
    fontWeight: "500",
    // color handled dynamically
  },
  scrollView: {
    flex: 1,
  },
  proSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  proCard: {
    // backgroundColor handled dynamically
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    // borderColor handled dynamically
  },
  proCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  proBadge: {
    backgroundColor: "#7C3AED", // This color seems constant, adjust if needed
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  proBadgeText: {
    color: "#FFFFFF", // This color seems constant
    fontSize: 12,
    fontWeight: "bold",
  },
  proInfo: {
    flex: 1,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: "600",
    // color handled dynamically
    marginBottom: 2,
  },
  proSubtitle: {
    fontSize: 14,
    // color handled dynamically
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "500",
    // color handled dynamically
    marginBottom: 12,
    letterSpacing: 1,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    // borderBottomColor handled dynamically
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 12,
    width: 24,
    // color handled dynamically for icon
  },
  settingsItemText: {
    fontSize: 18,
    // color handled dynamically
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    // color handled dynamically
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
    // backgroundColor handled dynamically
    borderRadius: 3,
    opacity: 0.6,
  },
})

export default SettingsScreen