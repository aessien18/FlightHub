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

export default function Step2() {
  const router = useRouter();

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
            source={require("../../assets/onboarding2.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.textSection}>
        <Text style={styles.title}>Smartly plan trips{"\n"}with friends</Text>
        <Text style={styles.subtitle}>Share and organize trips with ease</Text>
      </View>
      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => router.push("/Onboarding/step1")}>
          <Text style={styles.navText}>prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Onboarding/step3")}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
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
    justifyContent: "center", // Center image vertically
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
    marginTop: 0,
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
    justifyContent: "space-between", // prev left, next right
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
