import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Step1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative background shapes */}
      <View style={styles.bgCircleTopLeft} />
      <View style={styles.bgCircleBottomRight} />
      <View style={styles.bgWave} />
      <View style={styles.bgDot1} />
      <View style={styles.bgDot2} />
      <View style={styles.bgArc} />
      <View style={styles.bgDot3} />
      <View style={styles.bgDot4} />
      <View style={styles.bgLine} />
      <View style={styles.bgTriangle} />
      <View style={styles.bgDiamond} />
      <View style={styles.bgSmallCircle1} />
      <View style={styles.bgSmallCircle2} />

      <View style={styles.centered}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/onboarding.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.textSection}>
        <Text style={styles.title}>Track your Flights{"\n"}in real time</Text>
        <Text style={styles.subtitle}>organize and book flight with ease</Text>
      </View>
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => router.push("/splash")}>
          <Text style={styles.navText}>prev</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => router.push("/Onboarding/step2")}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf6fb",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    overflow: "hidden",
  },
  bgCircleTopLeft: {
    position: "absolute",
    top: -height * 0.18,
    left: -width * 0.25,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: "#90caf9",
    opacity: 0.38,
    zIndex: 0,
  },
  bgCircleBottomRight: {
    position: "absolute",
    bottom: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "#ffe082",
    opacity: 0.33,
    zIndex: 0,
  },
  bgWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width * 1.2,
    height: height * 0.18,
    backgroundColor: "#b3e5fc",
    borderTopLeftRadius: width * 0.6,
    borderTopRightRadius: width * 0.6,
    opacity: 0.32,
    zIndex: 0,
    transform: [{ rotate: "-4deg" }],
  },
  bgDot1: {
    position: "absolute",
    top: height * 0.12,
    right: width * 0.18,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#42a5f5",
    opacity: 0.22,
    zIndex: 0,
  },
  bgDot2: {
    position: "absolute",
    bottom: height * 0.18,
    left: width * 0.12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7986cb",
    opacity: 0.18,
    zIndex: 0,
  },
  bgArc: {
    position: "absolute",
    top: height * 0.32,
    left: width * 0.15,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    borderWidth: 10,
    borderColor: "#64b5f6",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    opacity: 0.18,
    zIndex: 0,
    transform: [{ rotate: "30deg" }],
  },
  bgDot3: {
    position: "absolute",
    top: height * 0.22,
    left: width * 0.08,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffd54f",
    opacity: 0.18,
    zIndex: 0,
  },
  bgDot4: {
    position: "absolute",
    bottom: height * 0.09,
    right: width * 0.13,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4fc3f7",
    opacity: 0.18,
    zIndex: 0,
  },
  bgLine: {
    position: "absolute",
    top: height * 0.08,
    left: width * 0.35,
    width: width * 0.25,
    height: 3,
    backgroundColor: "#1976d2",
    opacity: 0.18,
    borderRadius: 2,
    zIndex: 0,
    transform: [{ rotate: "18deg" }],
  },
  bgTriangle: {
    position: "absolute",
    top: height * 0.18,
    right: width * 0.08,
    width: 0,
    height: 0,
    borderLeftWidth: 22,
    borderRightWidth: 22,
    borderBottomWidth: 38,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#b3e5fc",
    opacity: 0.18,
    zIndex: 0,
    transform: [{ rotate: "12deg" }],
  },
  bgDiamond: {
    position: "absolute",
    bottom: height * 0.13,
    left: width * 0.22,
    width: 22,
    height: 22,
    backgroundColor: "#e3f2fd",
    opacity: 0.18,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  bgSmallCircle1: {
    position: "absolute",
    top: height * 0.07,
    left: width * 0.55,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1565c0",
    opacity: 0.22,
    zIndex: 0,
  },
  bgSmallCircle2: {
    position: "absolute",
    bottom: height * 0.22,
    right: width * 0.28,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#90caf9",
    opacity: 0.22,
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
  },
  image: {
    width: 300,
    height: 300,
  },
  textSection: {
    alignItems: "center",
    marginTop: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
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
    backgroundColor: "#000",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 24,
    zIndex: 1,
  },
  nextText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  navText: {
    fontSize: 16,
    color: "#000",
  },
});
