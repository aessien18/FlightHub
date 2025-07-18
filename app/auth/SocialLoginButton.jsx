import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const PROVIDER_CONFIG = {
  google: {
    icon: (
      <Image
        source={require("../../assets/google icon.png")}
        style={{ width: 36, height: 36 }}
      />
    ),
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
  },
  facebook: {
    icon: <AntDesign name="facebook-square" size={36} color="#1877f3" />,
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
  },
  apple: {
    icon: <AntDesign name="apple1" size={36} color="#000" />,
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
  },
};

export default function SocialLoginButton({ provider, onPress, loading }) {
  const config = PROVIDER_CONFIG[provider];
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        loading && { opacity: 0.7 },
      ]}
      onPress={onPress}
      disabled={loading}
      accessibilityLabel={`Login with ${
        provider.charAt(0).toUpperCase() + provider.slice(1)
      }`}
      accessibilityRole="button"
      activeOpacity={0.85}
    >
      {loading ? <ActivityIndicator color="#888" /> : config.icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 6,
    width: 56,
    height: 56,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
});
