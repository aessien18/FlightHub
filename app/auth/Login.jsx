import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Changed from username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://10.0.2.2:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        router.replace("/home"); // Navigate to home
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError("Network error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.diagonal} />

      <Text style={styles.title}>Login with</Text>
      <View style={styles.underline} />

      <View style={styles.socials}>
        <AntDesign name="google" size={30} color="red" />
        <AntDesign name="facebook-square" size={30} color="dodgerblue" />
        <AntDesign name="apple1" size={30} color="black" />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <FontAwesome name="user" size={20} style={styles.icon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <FontAwesome name="lock" size={20} style={styles.icon} />
        </View>

        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : null}

        <Text style={styles.forgot}>Forget password</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: "#fff",
  },
  diagonal: {
    position: "absolute",
    top: -150,
    left: -100,
    width: 300,
    height: 300,
    backgroundColor: "#3f3d56",
    transform: [{ rotate: "45deg" }],
    borderBottomRightRadius: 100,
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
  socials: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#9a97d1",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    opacity: 0.95,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: { flex: 1, height: 40, color: "#000" },
  icon: { color: "#333", marginLeft: 10 },
  forgot: { color: "#7b75d1", textAlign: "right", marginBottom: 10 },
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
