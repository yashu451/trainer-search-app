// navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import PlayerScreen from "../screens/PlayerScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1db954",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: { backgroundColor: "#000" },
        tabBarIcon: ({ color, size }) => {
          let name = "home";
          if (route.name === "Home") name = "home";
          if (route.name === "Favorites") name = "heart";
          if (route.name === "Player") name = "musical-notes";
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Player" component={PlayerScreen} />
    </Tab.Navigator>
  );
}
