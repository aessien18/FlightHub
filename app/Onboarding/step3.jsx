import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Step3() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        backgroundColor="#f5f7ff"
      />
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
            accessibilityLabel="Onboarding illustration"
          />
        </View>
      </View>

      <Text style={styles.title} accessibilityRole="header">
        Rent car to your destination easily
      </Text>
      <Text style={styles.description}>
        Pick a cab to take you wherever you want
      </Text>

      <View style={styles.pagination}>
        {/* Dots row above the buttons */}
        <View
          style={styles.dotsRow}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Step 3 of 3"
        >
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
        {/* Buttons row below the dots */}
        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => router.push("/Onboarding/step2")}
            accessibilityRole="button"
            accessibilityLabel="Go to previous onboarding step"
            style={({ pressed }) => [
              styles.navButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.navText}>Prev</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/auth/Login")}
            style={({ pressed }) => [
              styles.doneButton,
              pressed && { backgroundColor: "#4b2996" },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Finish onboarding and go to login"
          >
            <Text
              style={[
                styles.doneText,
                {
                  color: "#fff",
                  textShadowColor: "#7b1fa2",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                },
              ]}
            >
              Done
            </Text>
          </Pressable>
        </View>
      </View>
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
    shadowColor: "#90caf9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    width: 260,
    height: 260,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7b1fa2", // vibrant purple
    marginTop: 10,
    zIndex: 1,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    color: "#4b2996", // deeper purple
    marginBottom: 20,
    zIndex: 1,
    fontWeight: "500",
    letterSpacing: 0.2,
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
    marginTop: 8,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#e3f2fd",
    shadowColor: "#90caf9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  navText: {
    fontSize: 16,
    color: "#7b1fa2", // accent purple
    fontWeight: "600",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#7b1fa2", // accent purple
    width: 18,
    height: 12,
    borderRadius: 6,
  },
  doneButton: {
    backgroundColor: "#7b1fa2",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 36,
    marginLeft: 70, // increased from 12 to move "Done" further right // increased from 12 to move "Done" further right
    shadowColor: "#7b1fa2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  doneText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
