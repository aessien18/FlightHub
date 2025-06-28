import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Step3() {
  return (
    <View style={styles.container}>
      {/* Decorative background shapes */}
      <View style={styles.bgCircleTopLeft} />
      <View style={styles.bgCircleBottomRight} />
      <View style={styles.bgWave} />
      <View style={styles.bgDot1} />
      <View style={styles.bgDot2} />
      <View style={styles.bgDot3} />

      <View style={styles.centered}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/onboarding3.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      <Text style={styles.title}>Rent car to your destination easily</Text>
      <Text style={styles.description}>
        pick a cab to take you wherever you want
      </Text>

      <View style={styles.pagination}>
        {/* Dots row above the buttons */}
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
        {/* Buttons row below the dots */}
        <View style={styles.buttonRow}>
          <Pressable onPress={() => router.push("/Onboarding/step2")}>
            <Text style={styles.navText}>prev</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/auth/Login")}
            style={styles.doneButton}
          >
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={() => router.replace("/splash")}>
        <Text style={styles.skip}>skip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7ff",
    padding: 24,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  // Decorative background shapes
  bgCircleTopLeft: {
    position: "absolute",
    top: -height * 0.18,
    left: -width * 0.25,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: "#e0e7ff",
    opacity: 0.5,
    zIndex: 0,
  },
  bgCircleBottomRight: {
    position: "absolute",
    bottom: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "#c7d2fe",
    opacity: 0.4,
    zIndex: 0,
  },
  bgWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width * 1.2,
    height: height * 0.18,
    backgroundColor: "#b6e0fe",
    borderTopLeftRadius: width * 0.6,
    borderTopRightRadius: width * 0.6,
    opacity: 0.35,
    zIndex: 0,
    transform: [{ rotate: "-4deg" }],
  },
  bgDot1: {
    position: "absolute",
    top: height * 0.13,
    right: width * 0.18,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#159DFF",
    opacity: 0.18,
    zIndex: 0,
  },
  bgDot2: {
    position: "absolute",
    bottom: height * 0.18,
    left: width * 0.12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1D4A72",
    opacity: 0.13,
    zIndex: 0,
  },
  bgDot3: {
    position: "absolute",
    top: height * 0.32,
    left: width * 0.08,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#a5b4fc",
    opacity: 0.15,
    zIndex: 0,
  },
  centered: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center", // Center image vertically
    zIndex: 1,
  },
  imageWrapper: {
    backgroundColor: "#E4E0F5",
    padding: 24,
    borderRadius: 24,
    marginTop: 40,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginTop: 10,
    zIndex: 1,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
    zIndex: 1,
  },
  pagination: {
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 1,
    alignItems: "center",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // space above the buttons
    marginTop: 0,
    gap: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 0,
  },
  navText: {
    fontSize: 16,
    color: "#000",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  activeDot: {
    backgroundColor: "#000",
  },
  doneButton: {
    backgroundColor: "#D1D1FF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  doneText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  skip: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 10,
    zIndex: 1,
  },
});
