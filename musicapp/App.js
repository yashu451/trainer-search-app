// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { FavoritesProvider } from "./context/FavoritesContext";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <FavoritesProvider>
      <PlayerProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </PlayerProvider>
    </FavoritesProvider>
  );
}
