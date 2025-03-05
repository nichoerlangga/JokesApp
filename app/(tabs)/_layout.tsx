import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'rgb(246,185,127)', 
        tabBarInactiveTintColor: 'rgb(200,200,200)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: 'rgb(52,52,52)'
          },
          default: {
            backgroundColor: 'rgb(52,52,52)'
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={'rgb(246,185,127)'} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'user',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle" color={'rgb(246,185,127)'} />,
        }}
      />
    </Tabs>
  );
}
