import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Projects' }} />
      <Stack.Screen name='create' options={{ title: 'New project', presentation: 'modal' }}/>
    </Stack>
  )
}