import { router } from "expo-router";
import { useEffect } from "react";
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

export default function SplashScreen() {
  // Optional: Auto-navigate after a delay (skip if you want only manual navigation)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Onboarding/step1");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        backgroundColor="#f5f0fa"
      />
      {/* Decorative background */}
      <View style={styles.gradientBg} />
      <View style={styles.topWave} />
      <View style={styles.bottomWave} />
      <View style={styles.leftCircle} />
      <View style={styles.rightCircle} />
      <View style={styles.centerDiamond} />
      <View style={styles.smallDot1} />
      <View style={styles.smallDot2} />
      <View style={styles.smallDot3} />

      <Image
        source={require("../assets/flight logo.png")}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel="FlightHub Logo"
      />

      <Text style={styles.title} accessibilityRole="header">
        Welcome to Airwise
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "#7e57c2" },
        ]}
        onPress={() => router.push("/Onboarding/step1")}
        accessibilityRole="button"
        accessibilityLabel="Let's Get Started"
      >
        <Text style={styles.buttonText}>Let’s Get Started</Text>
      </Pressable>

      <Text
        style={styles.subtitle}
        accessibilityLabel="Your All-in-One Flight Companion"
      >
        Your All-in-One Flight Companion!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    overflow: "hidden",
  },
  gradientBg: {
    position: "absolute",
    width: width * 1.5,
    height: height * 1.5,
    top: -height * 0.25,
    left: -width * 0.25,
    backgroundColor: "#ede7f6",
    borderRadius: width,
    opacity: 0.7,
    zIndex: 0,
  },
  topWave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 1.2,
    height: height * 0.18,
    backgroundColor: "#d1c4e9",
    borderBottomRightRadius: width * 0.7,
    borderBottomLeftRadius: width * 0.7,
    opacity: 0.55,
    zIndex: 0,
    transform: [{ rotate: "-2deg" }],
  },
  bottomWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width * 1.2,
    height: height * 0.18,
    backgroundColor: "#b39ddb",
    borderTopLeftRadius: width * 0.7,
    borderTopRightRadius: width * 0.7,
    opacity: 0.55,
    zIndex: 0,
    transform: [{ rotate: "2deg" }],
  },
  leftCircle: {
    position: "absolute",
    top: height * 0.18,
    left: -width * 0.18,
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
    backgroundColor: "#ce93d8",
    opacity: 0.35,
    zIndex: 0,
  },
  rightCircle: {
    position: "absolute",
    bottom: height * 0.18,
    right: -width * 0.18,
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    backgroundColor: "#b39ddb",
    opacity: 0.32,
    zIndex: 0,
  },
  centerDiamond: {
    position: "absolute",
    top: height * 0.38,
    left: width * 0.38,
    width: 36,
    height: 36,
    backgroundColor: "#e1bee7",
    opacity: 0.18,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  smallDot1: {
    position: "absolute",
    top: height * 0.09,
    left: width * 0.62,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9575cd",
    opacity: 0.18,
    zIndex: 0,
  },
  smallDot2: {
    position: "absolute",
    bottom: height * 0.13,
    right: width * 0.22,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1c4e9",
    opacity: 0.18,
    zIndex: 0,
  },
  smallDot3: {
    position: "absolute",
    top: height * 0.25,
    right: width * 0.12,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#ede7f6",
    opacity: 0.18,
    zIndex: 0,
  },
  image: {
    width: "100%",
    height: 320,
    marginBottom: 18,
    zIndex: 1,
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#7e57c2",
    marginBottom: 28,
    zIndex: 1,
    letterSpacing: 1,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9575cd",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginBottom: 16,
    zIndex: 1,
    shadowColor: "#9575cd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    alignSelf: "center",
    minWidth: 220,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    zIndex: 1,
    letterSpacing: 1,
    textShadowColor: "#7e57c2",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4b2996",
    zIndex: 1,
    fontWeight: "700",
    marginTop: 8,
    letterSpacing: 0.5,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    textAlign: "center",
  },
});
