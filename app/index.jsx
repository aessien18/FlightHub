import { registerRootComponent } from "expo";
import { ExpoRoot, Redirect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return <Redirect href="/splash" />;
}

registerRootComponent(() => (
  <SafeAreaProvider>
    <ExpoRoot />
  </SafeAreaProvider>
));
