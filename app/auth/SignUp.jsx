import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await fetch("http://10.0.2.2:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setSuccess("Signup successful! Redirecting to home...");
      await AsyncStorage.setItem("userToken", "dummyToken"); // Replace with real token if available
      router.replace("/home");
    } catch (err) {
      console.log("Signup error:", err);
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <FontAwesome name="plane" size={48} color="#7b1fa2" />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.underline} />

            <View style={styles.form}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#b39ddb"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                accessibilityLabel="First Name"
                returnKeyType="next"
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#b39ddb"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                accessibilityLabel="Last Name"
                returnKeyType="next"
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#b39ddb"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email Address"
                returnKeyType="next"
              />

              {/* Password input with icon */}
              <View style={styles.inputIconWrapper}>
                <TextInput
                  placeholder="Create Password"
                  placeholderTextColor="#b39ddb"
                  secureTextEntry={!showPassword}
                  style={[styles.input, { paddingRight: 40 }]}
                  value={password}
                  onChangeText={setPassword}
                  accessibilityLabel="Create Password"
                  returnKeyType="next"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword((prev) => !prev)}
                  accessibilityLabel="Toggle password visibility"
                >
                  <FontAwesome
                    name={showPassword ? "eye" : "lock"}
                    size={20}
                    color="#7b1fa2"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password input with icon */}
              <View style={styles.inputIconWrapper}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#b39ddb"
                  secureTextEntry={!showConfirmPassword}
                  style={[styles.input, { paddingRight: 40 }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  accessibilityLabel="Confirm Password"
                  returnKeyType="done"
                  onSubmitEditing={handleSignUp}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  accessibilityLabel="Toggle confirm password visibility"
                >
                  <FontAwesome
                    name={showConfirmPassword ? "eye" : "lock"}
                    size={20}
                    color="#7b1fa2"
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
              {success ? (
                <Text style={styles.successText}>{success}</Text>
              ) : null}
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleSignUp}
                disabled={loading}
                accessibilityLabel="Sign up"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign up</Text>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.bottomText}>
              Already have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => router.replace("/auth/Login")}
                accessibilityRole="button"
                accessibilityLabel="Go to Login"
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f5f3ff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f3ff",
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
  input: {
    backgroundColor: "#f3eaff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#4b2996",
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  inputIconWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 18,
    padding: 4,
    zIndex: 2,
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
  successText: {
    color: "green",
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
    marginBottom: 4,
    shadowColor: "#7b1fa2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 19,
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
