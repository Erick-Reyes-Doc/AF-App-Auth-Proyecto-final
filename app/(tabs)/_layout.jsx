// app/(tabs)/_layout.jsx
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // ✅ Oculta encabezado de forma global
        tabBarStyle: {
          backgroundColor: '#A2C579',
          height: 60,
          borderTopWidth: 0,
          elevation: 5, // sombra Android
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#444',
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="estado"
        options={{
          title: 'Estad.',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Config.',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
