import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { PlayerProvider } from './context/PlayerContext';

export default function App() {
  return (
    <PlayerProvider>
      <AppNavigator />
    </PlayerProvider>
  );
}
