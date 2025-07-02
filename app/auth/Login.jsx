import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const [loading, setLoading] = useState(false); // NEW

  const handleLogin = async () => {
    setError("");
    setLoading(true); // NEW
    Keyboard.dismiss(); // NEW

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
    setLoading(false); // NEW
  };

  return (
    <View style={styles.container}>
      <View style={styles.diagonal} />

      <Text style={styles.title}>Login with</Text>
      <View style={styles.underline} />

      <View style={styles.socials}>
        <Image
          source={require("../../assets/google icon.png")}
          style={{ width: 60, height: 60, marginHorizontal: -4 }}
          resizeMode="contain"
          accessibilityLabel="Login with Google"
        />
        <AntDesign
          name="facebook-square"
          size={36}
          color="dodgerblue"
          accessibilityLabel="Login with Facebook"
        />
        <AntDesign
          name="apple1"
          size={36}
          color="black"
          accessibilityLabel="Login with Apple"
        />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#7b1fa2"
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
            placeholderTextColor="#7b1fa2"
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

        {/* Show password hint only if password is not empty and less than 6 characters */}
        {password.length > 0 && password.length < 6 && (
          <Text
            style={{
              color: "#4b2996",
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 8,
              textAlign: "left",
            }}
          >
            Password must be at least 6 characters.
          </Text>
        )}

        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : null}

        <Text style={styles.forgot}>Forget password</Text>

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
        <Text style={styles.link} onPress={() => router.push("/auth/SignUp")}>
          Create an Account
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f3ff", // light purple
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
  title: {
    fontSize: 32, // increased from 28
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: "#4b2996", // deeper purple for more contrast
    letterSpacing: 0.5,
  },
  underline: {
    height: 4, // slightly thicker
    width: 90, // slightly wider
    backgroundColor: "#a084ca",
    alignSelf: "center",
    marginVertical: 12,
  },
  socials: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#e3d6fa",
    borderRadius: 24,
    padding: 28, // more padding
    marginVertical: 12,
    shadowColor: "#b39ddb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18, // slightly more shadow
    shadowRadius: 14,
    elevation: 8,
    opacity: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3eaff",
    borderRadius: 10,
    marginVertical: 12, // more space between inputs
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 44, // slightly taller
    color: "#4b2996", // deeper purple for more contrast
    fontWeight: "600", // bolder
    fontSize: 18, // larger
    letterSpacing: 0.3,
  },
  icon: { color: "#7b1fa2", marginLeft: 12, fontSize: 22 }, // deeper purple, larger icon
  forgot: {
    color: "#7b1fa2", // deeper purple for more visibility
    textAlign: "right",
    marginBottom: 12,
    fontSize: 16, // slightly larger
    fontWeight: "bold", // bolder for emphasis
    textDecorationLine: "underline", // underline for clarity
  },
  button: {
    backgroundColor: "#7b1fa2", // deeper purple for more contrast
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
