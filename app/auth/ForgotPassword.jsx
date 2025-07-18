import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (!email || !newPassword) {
      Alert.alert(
        "Missing Fields",
        "Please enter your email and new password."
      );
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Password Reset",
        "If this email exists, your password has been reset."
      );
      router.replace("/auth/Login");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and a new password to reset your account.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#b39ddb"
          accessibilityLabel="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#b39ddb"
          accessibilityLabel="New Password"
        />
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleReset}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Reset Password"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.replace("/auth/Login")}
          accessibilityRole="button"
          accessibilityLabel="Back to Login"
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    shadowColor: "#7b1fa2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#7b1fa2",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#4b2996",
    marginBottom: 22,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1c4e9",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: "#4b2996",
    backgroundColor: "#f8f6fc",
  },
  button: {
    backgroundColor: "#7b1fa2",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  back: {
    marginTop: 2,
    alignItems: "center",
  },
  backText: {
    color: "#7b1fa2",
    fontWeight: "600",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
