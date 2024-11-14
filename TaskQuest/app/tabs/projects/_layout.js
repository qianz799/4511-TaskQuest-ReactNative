import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name='createTask' 
        options={{ 
          title: 'New Task',
          presentation: 'modal'
        }}
      />
      <Stack.Screen name='index' options={{ title: 'Projects' }} />
      
    </Stack>
  )
}