import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          // Clear user token and navigate to login
          await AsyncStorage.removeItem("userToken");
          router.replace("/auth/Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f3ff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#7b1fa2",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  label: { fontSize: 18, color: "#4b2996", fontWeight: "500" },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#e57373",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
