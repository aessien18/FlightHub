"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react"

export default function PaymentScreen() {
  const router = useRouter()
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const handlePayment = () => {
    if (!selectedPayment) return

    switch (selectedPayment) {
      case "apple":
        console.log("Processing Apple Pay payment...")
        // Simulate Apple Pay
        Alert.alert("Apple Pay", "Touch ID or Face ID authentication would appear here", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Pay with Touch ID",
            onPress: () => {
              Alert.alert("Payment Successful!", "Welcome to FlightHub Pro! Your subscription is now active.", [
                { text: "OK", onPress: () => router.back() },
              ])
            },
          },
        ])
        break
      case "card":
        router.push("./card-payment-screen" as any)
        break
      case "mobile":
        router.push("./mobile-money-screen" as any)
        break
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FlightHub Pro</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Description with tappable Full Details */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            FlightHub Pro is included on your first flight, totally free without a trial.{"\n"}
            Flights are counted as they occur, not when they are entered.{" "}
          </Text>
          <TouchableOpacity onPress={() => console.log("Full Details")}>
            <Text style={styles.linkText}>Full Details...</Text>
          </TouchableOpacity>
        </View>

        {/* Current Plan Section - All Tappable */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.planRow} onPress={() => console.log("Current Plan")}>
            <Text style={styles.planLabel}>Current Plan</Text>
            <Text style={styles.planValue}>Complimentary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.planRow} onPress={() => console.log("Ends Info")}>
            <Text style={styles.planLabel}>Ends</Text>
            <Text style={styles.planValue}>1 Flight Remaining</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          {/* Payment Options Section */}
          {!showPaymentOptions ? (
            <TouchableOpacity style={styles.menuItem} onPress={() => setShowPaymentOptions(true)}>
              <View>
                <Text style={styles.menuTitle}>Upgrade to FlightHub Pro</Text>
                <Text style={styles.menuSubtitle}>Unlimited features & flights for a year - $29.99</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          ) : (
            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>Choose Payment Method</Text>

              {/* Apple Pay */}
              <TouchableOpacity
                style={[styles.paymentOption, selectedPayment === "apple" && styles.selectedPayment]}
                onPress={() => setSelectedPayment("apple")}
              >
                <View style={styles.paymentLeft}>
                  <View style={[styles.paymentIcon, { backgroundColor: "#000000" }]}>
                    <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.paymentMethodTitle}>Apple Pay</Text>
                    <Text style={styles.paymentMethodSubtitle}>Pay with Touch ID or Face ID</Text>
                  </View>
                </View>
                {selectedPayment === "apple" && <Ionicons name="checkmark-circle" size={24} color="#34C759" />}
              </TouchableOpacity>

              {/* Credit/Debit Card */}
              <TouchableOpacity
                style={[styles.paymentOption, selectedPayment === "card" && styles.selectedPayment]}
                onPress={() => setSelectedPayment("card")}
              >
                <View style={styles.paymentLeft}>
                  <View style={[styles.paymentIcon, { backgroundColor: "#007AFF" }]}>
                    <Ionicons name="card" size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.paymentMethodTitle}>Credit/Debit Card</Text>
                    <Text style={styles.paymentMethodSubtitle}>Visa, Mastercard, American Express</Text>
                  </View>
                </View>
                {selectedPayment === "card" && <Ionicons name="checkmark-circle" size={24} color="#34C759" />}
              </TouchableOpacity>

              {/* Mobile Money */}
              <TouchableOpacity
                style={[styles.paymentOption, selectedPayment === "mobile" && styles.selectedPayment]}
                onPress={() => setSelectedPayment("mobile")}
              >
                <View style={styles.paymentLeft}>
                  <View style={[styles.paymentIcon, { backgroundColor: "#34C759" }]}>
                    <Ionicons name="phone-portrait" size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.paymentMethodTitle}>Mobile Money</Text>
                    <Text style={styles.paymentMethodSubtitle}>MTN, Airtel, Vodafone, Orange</Text>
                  </View>
                </View>
                {selectedPayment === "mobile" && <Ionicons name="checkmark-circle" size={24} color="#34C759" />}
              </TouchableOpacity>

              {/* Payment Button */}
              <TouchableOpacity
                style={[styles.payButton, !selectedPayment && styles.payButtonDisabled]}
                disabled={!selectedPayment}
                onPress={() => handlePayment()}
              >
                <Text style={[styles.payButtonText, !selectedPayment && styles.payButtonTextDisabled]}>Pay $29.99</Text>
              </TouchableOpacity>

              {/* Back to options */}
              <TouchableOpacity style={styles.backToOptionsButton} onPress={() => setShowPaymentOptions(false)}>
                <Text style={styles.backToOptionsText}>Back to Options</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Compare Features")}>
            <Text style={styles.menuTitle}>Compare Features</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Restore Purchase")}>
            <Text style={styles.menuTitle}>Restore Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Manage Subscription")}>
            <Text style={styles.menuTitle}>Manage Subscription</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#007AFF",
    fontSize: 17,
    marginLeft: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  description: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
  linkText: {
    color: "#007AFF",
  },
  section: {
    marginBottom: 40,
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#38383A",
  },
  planLabel: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  planValue: {
    color: "#8E8E93",
    fontSize: 17,
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#38383A",
  },
  menuTitle: {
    color: "#007AFF",
    fontSize: 17,
  },
  menuSubtitle: {
    color: "#8E8E93",
    fontSize: 15,
    marginTop: 2,
  },
  paymentSection: {
    marginTop: 20,
  },
  paymentTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedPayment: {
    borderColor: "#34C759",
    backgroundColor: "#0A2A0A",
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  paymentMethodTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 2,
  },
  paymentMethodSubtitle: {
    color: "#8E8E93",
    fontSize: 15,
  },
  payButton: {
    backgroundColor: "#34C759",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  payButtonDisabled: {
    backgroundColor: "#2C2C2E",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  payButtonTextDisabled: {
    color: "#8E8E93",
  },
  backToOptionsButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  backToOptionsText: {
    color: "#007AFF",
    fontSize: 16,
  },
})
