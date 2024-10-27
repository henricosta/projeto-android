import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={28}/>
          ),
        }}
      />
      <Tabs.Screen
        name="pesquisa"
        options={{
          title: 'Pequisar eventos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="search" size={28}/>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-circle-outline" size={28} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
