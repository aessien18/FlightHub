import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreens/homescreen" />

        <Stack.Screen
          name="add-flight" 
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        
      
      </Stack>
    </GestureHandlerRootView>
  );
}