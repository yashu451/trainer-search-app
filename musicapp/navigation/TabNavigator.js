// navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import PlayerScreen from "../screens/PlayerScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
        tabBarIcon: ({ color, size, focused }) => {
          let name = "home";

          if (route.name === "Home") name = focused ? "home" : "home-outline";
          else if (route.name === "Favorites") name = focused ? "heart" : "heart-outline";
          else if (route.name === "Player") name = focused ? "musical-notes" : "musical-notes-outline";
          else if (route.name === "Profile") name = focused ? "person" : "person-outline";

          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Player" component={PlayerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
