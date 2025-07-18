import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.replace("/auth/Login")}
        style={styles.pressable}
      >
        <Text style={styles.text}>HOME SCREEN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pressable: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#7b1fa2",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
