import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.text(); // ⚠️ Changed from `.json()` to `.text()` if backend sends plain message

      if (response.ok) {
        setSuccess("Signup successful! Please login.");
        setTimeout(() => router.replace("/(auth)/Login"), 1500);
      } else {
        setError(data || "Signup failed");
      }
    } catch (err) {
      console.log("SIGNUP ERROR:", err);
      setError("Network error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <View style={styles.underline} />

      <View style={styles.form}>
        <TextInput
          placeholder="email address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="create username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="create password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="confirm password"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : null}
        {success ? (
          <Text style={{ color: "green", textAlign: "center" }}>{success}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bottomText}>
        Already have an Account?{" "}
        <Text style={styles.link} onPress={() => router.replace("/auth/Login")}>
          Login
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
    backgroundColor: "#f5f3ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  underline: {
    height: 3,
    width: 80,
    backgroundColor: "#7b75d1",
    alignSelf: "center",
    marginVertical: 10,
  },
  form: {
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    opacity: 0.95,
  },
  input: {
    backgroundColor: "#e0d7fa",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#000",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#3f3d56",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  bottomText: { textAlign: "center", marginTop: 20 },
  link: { color: "#2200cc", fontWeight: "bold" },
});
