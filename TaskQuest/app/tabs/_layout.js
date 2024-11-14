import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Entypo name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='projects'
        options={{
          title: 'Projects',
          tabBarIcon: ({ size, color }) => (
            <Entypo name='folder' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='inbox'
        options={{
          title: 'Inbox',
          tabBarIcon: ({ size, color }) => (
            <Entypo name='mail' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Entypo name='cog' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute', 
    bottom: 0, 
    height: 35, // change height if need to
    paddingBottom: 0, 
    paddingTop: 5, 
  },
});
