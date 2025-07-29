import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './screens/ThemeContext'; // Adjust path based on your folder structure

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreens/homescreen" />
          <Stack.Screen name="screens" />
          <Stack.Screen name="(root)" />
          <Stack.Screen
            name="add-flight" 
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}