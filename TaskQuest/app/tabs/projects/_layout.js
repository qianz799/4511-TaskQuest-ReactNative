import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Projects' }} />
      <Stack.Screen 
        name='projectView' 
        options={{ 
          title: 'Projects',
          headerBackTitle: 'Back'  // Optional: customize back button text
        }} 
      />
    </Stack>
  )
}