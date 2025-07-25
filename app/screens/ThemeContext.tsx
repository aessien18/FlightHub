// context/ThemeContext.tsx (Create this file in a 'context' folder or similar)

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native'; // Hook to get system theme

// Define the shape of our context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (newTheme: 'light' | 'dark') => void; // Added for explicit setting
}

// Create the context with a default undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define theme colors
export const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
  headerBackground: '#F0F0F0', // Lighter header
  sectionHeader: '#6B7280',
  itemBackground: '#FFFFFF', // White for list items in light mode
  itemBorder: '#E5E7EB', // Lighter border
  iconColor: '#4B5563',
  proCardBackground: '#E0F7FA', // Light blue/green for pro card
  proCardBorder: '#B2EBF2',
  proTitle: '#00BCD4',
  proSubtitle: '#4DD0E1',
  doneButton: '#1976D2', // Blue done button
  homeIndicatorBar: '#333333',
};

export const darkColors = {
  background: '#000000',
  text: '#FFFFFF',
  headerBackground: '#111111',
  sectionHeader: '#9CA3AF',
  itemBackground: '#1F2937',
  itemBorder: '#374151',
  iconColor: '#D1D5DB',
  proCardBackground: '#1F2937',
  proCardBorder: '#374151',
  proTitle: '#A855F7',
  proSubtitle: '#9CA3AF',
  doneButton: '#60A5FA',
  homeIndicatorBar: '#FFFFFF',
};

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme(); // 'light', 'dark', or null
  const [theme, setThemeState] = useState<'light' | 'dark'>('light'); // Default to light

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeState(savedTheme);
        } else if (systemColorScheme) {
          // If no saved theme, use system preference
          setThemeState(systemColorScheme);
        }
      } catch (e) {
        console.error("Failed to load theme from AsyncStorage", e);
      }
    };
    loadTheme();
  }, [systemColorScheme]); // Rerun if system color scheme changes

  const setTheme = async (newTheme: 'light' | 'dark') => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem('appTheme', newTheme);
    } catch (e) {
      console.error("Failed to save theme to AsyncStorage", e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value = { theme, toggleTheme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};