import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
         />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="profile" color={color} />,
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: 'project',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="th-large" color={color} />,
        }}
        />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'contact',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="phone" color={color} />,
        }}
        
      />
    </Tabs>
  );
}

