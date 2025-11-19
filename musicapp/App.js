import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { PlayerProvider } from './context/PlayerContext';

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </PlayerProvider>
  );
}
