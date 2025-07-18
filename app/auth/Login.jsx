import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// This is the login page for the FlightHub app
// It allows users to log in using their email and password

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await fetch("http://10.0.2.2:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        router.replace("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f3ff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.diagonal} />

          <View style={styles.logoContainer}>
            <FontAwesome name="plane" size={48} color="#7b1fa2" />
          </View>
          <Text style={styles.title}>Login to FlightHub</Text>
          <View style={styles.underline} />

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#b39ddb"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                accessibilityLabel="Email"
                returnKeyType="next"
              />
              <FontAwesome name="user" size={20} style={styles.icon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#b39ddb"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                accessibilityLabel="Toggle password visibility"
              >
                <FontAwesome
                  name={showPassword ? "eye" : "lock"}
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Password hint */}
            {password.length > 0 && password.length < 6 && (
              <Text style={styles.passwordHint}>
                Password must be at least 6 characters.
              </Text>
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              onPress={() => router.push("/auth/ForgotPassword")}
              accessibilityRole="button"
              accessibilityLabel="Forgot Password"
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
              accessibilityLabel="Login"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomText}>
            Don&apos;t have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => router.push("/auth/SignUp")}
              accessibilityRole="button"
              accessibilityLabel="Create an Account"
            >
              Create an Account
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f3ff",
  },
  diagonal: {
    position: "absolute",
    top: -180,
    left: -130,
    width: 380,
    height: 380,
    backgroundColor: "#c3b1e1",
    transform: [{ rotate: "45deg" }],
    borderBottomRightRadius: 130,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#7b1fa2",
    letterSpacing: 0.5,
  },
  underline: {
    height: 4,
    width: 90,
    backgroundColor: "#a084ca",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 2,
  },
  socials: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    marginVertical: 12,
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
    opacity: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3eaff",
    borderRadius: 10,
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 44,
    color: "#4b2996",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 0.3,
  },
  icon: { color: "#7b1fa2", marginLeft: 12, fontSize: 22 },
  forgot: {
    color: "#7b1fa2",
    textAlign: "right",
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 8,
  },
  passwordHint: {
    color: "#4b2996",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#7b1fa2",
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  bottomText: {
    textAlign: "center",
    marginTop: 24,
    color: "#4b2996",
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    color: "#7b1fa2",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
