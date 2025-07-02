import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Index() {

registerRootComponent(() => (
  <SafeAreaProvider>
    <ExpoRoot />
  </SafeAreaProvider>
));}