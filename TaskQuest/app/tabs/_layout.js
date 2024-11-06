import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons/Entypo';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name='index'
        option={{
          title: 'Home',
          tabBarIcon: ({size, color}) => (
            <Entypo name='home' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='projects'
        option={{
          title: 'Projects',
          tabBarIcon: ({size, color}) => (
            <Entypo name='home' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='inbox'
        option={{
          title: 'Inbox',
          tabBarIcon: ({size, color}) => (
            <Entypo name='home' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='settings'
        option={{
          title: 'Settings',
          tabBarIcon: ({size, color}) => (
            <Entypo name='home' size={size} color={color}/>
          )
        }}
      />
    </Tabs>
  )
}