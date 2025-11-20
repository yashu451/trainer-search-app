import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { AudioProvider } from './src/context/AudioProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AudioProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AudioProvider>
    </SafeAreaProvider>
  );
}