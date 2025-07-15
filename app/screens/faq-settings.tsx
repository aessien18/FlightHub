"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function FAQSettings() {
  const router = useRouter()

  const faqItems = [
    {
      question: "How do I add flights to FlightHub?",
      answer: "You can add flights manually, import from email, or sync with your calendar.",
    },
    {
      question: "What is FlightHub Pro?",
      answer: "FlightHub Pro provides unlimited flights, faster alerts, and premium features.",
    },
    {
      question: "How do I get flight alerts?",
      answer: "Enable notifications in Settings > My Flights to receive real-time flight updates.",
    },
    {
      question: "Can I share flights with friends?",
      answer: "Yes! Use FlightHub Friends to share and track flights with family and friends.",
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
        <Text style={styles.title}>FAQ</Text>
        <Text style={styles.subtitle}>Frequently asked questions about FlightHub.</Text>

        <View style={styles.faqList}>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={() => console.log("Contact Support")}>
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
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
  faqList: {
    marginBottom: 32,
  },
  faqItem: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  question: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  answer: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
})
