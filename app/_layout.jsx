
import { Stack } from 'expo-router';
// Update the import path below if ThemeContext is located elsewhere, e.g. '../contexts/ThemeContext' or './ThemeContext'
import { ThemeProvider } from './screens/ThemeContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}