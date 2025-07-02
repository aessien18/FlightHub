import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

      setSuccess("Signup successful! Please login.");
      setTimeout(() => router.replace("/auth/Login"), 1500);
    } catch (err) {
      console.log("SIGNUP ERROR:", err);
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.underline} />

        <View style={styles.form}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#7b1fa2"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            accessibilityLabel="First Name"
            returnKeyType="next"
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#7b1fa2"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            accessibilityLabel="Last Name"
            returnKeyType="next"
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#7b1fa2"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email Address"
            returnKeyType="next"
          />

          {/* Password input with icon */}
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Create Password"
              placeholderTextColor="#7b1fa2"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              accessibilityLabel="Create Password"
              returnKeyType="next"
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 20, top: 18 }}
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
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#7b1fa2"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              accessibilityLabel="Confirm Password"
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 20, top: 18 }}
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
          {success ? <Text style={styles.successText}>{success}</Text> : null}
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
          Already have an Account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.replace("/auth/Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: "#4b2996",
    letterSpacing: 0.5,
  },
  underline: {
    height: 4,
    width: 90,
    backgroundColor: "#a084ca",
    alignSelf: "center",
    marginVertical: 12,
  },
  form: {
    backgroundColor: "#e3d6fa",
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
    fontSize: 18,
    letterSpacing: 0.3,
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
