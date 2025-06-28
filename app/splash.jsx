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

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* New decorative background design */}
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
      />

      <Text style={styles.title}>Welcome to Airwise</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/Onboarding/step1")}
      >
        <Text style={styles.buttonText}>Let’s Get Started</Text>
      </Pressable>

      <Text style={styles.subtitle}>Your All-in-One Flight Companion!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0fa", // light purple background
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
    backgroundColor: "#ede7f6", // very light purple
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
    backgroundColor: "#d1c4e9", // light purple
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
    backgroundColor: "#b39ddb", // slightly deeper light purple
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
    backgroundColor: "#ce93d8", // pastel purple
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
    backgroundColor: "#b39ddb", // pastel purple
    opacity: 0.32,
    zIndex: 0,
  },
  centerDiamond: {
    position: "absolute",
    top: height * 0.38,
    left: width * 0.38,
    width: 36,
    height: 36,
    backgroundColor: "#e1bee7", // light purple
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
    backgroundColor: "#9575cd", // purple
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
    backgroundColor: "#d1c4e9", // light purple
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
    backgroundColor: "#ede7f6", // very light purple
    opacity: 0.18,
    zIndex: 0,
  },
  image: {
    width: "100%",
    height: 350,
    marginBottom: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#7e57c2", // purple
    marginBottom: 30,
    zIndex: 1,
    letterSpacing: 1,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: "#9575cd", // purple
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginBottom: 16,
    zIndex: 1,
    shadowColor: "#9575cd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
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
  },
  subtitle: {
    fontSize: 18,
    color: "#000", // changed to black
    zIndex: 1,
    fontWeight: "700",
    marginTop: 8,
    letterSpacing: 0.5,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
