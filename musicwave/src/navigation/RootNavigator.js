import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import PlaylistScreen from '../screens/PlaylistScreen';
import FullPlayerScreen from '../screens/FullPlayerScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="FullPlayer" component={FullPlayerScreen} />
    </Stack.Navigator>
  );
}