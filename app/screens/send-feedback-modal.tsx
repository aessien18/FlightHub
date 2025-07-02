"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface FeedbackOption {
  id: string
  title: string
  emoji: string
}

export default function SendFeedbackModal() {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  const feedbackOptions: FeedbackOption[] = [
    {
      id: "adding-flights",
      title: "Adding Flights",
      emoji: "✈️",
    },
    {
      id: "subscription-help",
      title: "I need subscription help",
      emoji: "🤚",
    },
    {
      id: "spotted-wrong",
      title: "I've spotted something wrong",
      emoji: "🔍",
    },
    {
      id: "have-idea",
      title: "I have an idea",
      emoji: "💜",
    },
  ]

  const handleClose = () => {
    setVisible(false)
    router.back()
  }

  const handleFeedbackOption = (optionId: string) => {
    console.log(`Selected feedback option: ${optionId}`)
    handleClose()
  }

  const renderFeedbackOption = (option: FeedbackOption) => {
    return (
      <TouchableOpacity key={option.id} style={styles.feedbackOption} onPress={() => handleFeedbackOption(option.id)}>
        <Text style={styles.feedbackOptionText}>
          {option.title} {option.emoji}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Is anything wrong?</Text>
          <Text style={styles.subtitle}>Choose how we can help</Text>
          <View style={styles.optionsContainer}>{feedbackOptions.map((option) => renderFeedbackOption(option))}</View>
        </View>
      </SafeAreaView>
    </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flex: 1,
  },
  waveEmoji: {
    fontSize: 32,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#9CA3AF",
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 16,
  },
  feedbackOption: {
    backgroundColor: "#374151",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackOptionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
  },
})
