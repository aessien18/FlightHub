import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Step2() {
  const router = useRouter();

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
            source={require("../../assets/onboarding2.png")}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="Onboarding illustration"
          />
        </View>
      </View>
      <View style={styles.textSection}>
        <Text style={styles.title} accessibilityRole="header">
          Smartly plan trips{"\n"}with friends
        </Text>
        <Text style={styles.subtitle}>Share and organize trips with ease</Text>
      </View>
      <View
        style={styles.dotsRow}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Step 2 of 3"
      >
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => router.push("/Onboarding/step1")}
          accessibilityRole="button"
          accessibilityLabel="Go to previous onboarding step"
          style={({ pressed }) => [
            styles.navButton,
            pressed && { opacity: 0.7, backgroundColor: "#d1c4e9" },
          ]}
        >
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => router.push("/Onboarding/step3")}
          accessibilityRole="button"
          accessibilityLabel="Go to next onboarding step"
          style={({ pressed }) => [
            styles.nextButton,
            pressed && { backgroundColor: "#1976d2" },
          ]}
        >
          <Text
            style={[
              styles.nextText,
              {
                color: "#7b1fa2", // purple for branding
                textShadowColor: "#fff",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
      {/* Add swipe hint for better UX */}
      <View style={styles.swipeHintContainer} pointerEvents="none">
        <Text style={styles.swipeHintText}>Swipe to continue</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7ff",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
    justifyContent: "center",
    zIndex: 1,
  },
  imageWrapper: {
    backgroundColor: "#E4E0F5",
    padding: 24,
    borderRadius: 24,
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
  textSection: {
    alignItems: "center",
    marginTop: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7b1fa2", // vibrant purple
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 17,
    color: "#4b2996", // deeper purple
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    zIndex: 1,
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
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 28,
    zIndex: 1,
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
    borderWidth: 1,
    borderColor: "#b3e5fc",
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 16,
    backgroundColor: "#42a5f5",
    shadowColor: "#42a5f5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "#b3e5fc",
  },
  nextText: {
    color: "#fff", // always white for visibility
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  navText: {
    fontSize: 16,
    color: "#7b1fa2", // accent purple
    fontWeight: "600",
  },
  swipeHintContainer: {
    position: "absolute",
    bottom: 18,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  swipeHintText: {
    color: "#7b1fa2",
    fontSize: 15,
    opacity: 0.7,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
