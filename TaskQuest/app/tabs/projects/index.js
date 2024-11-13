import { Link } from "expo-router";
import { Text } from "react-native";

export default function RegisterScreen() {
  return <>
    <Text>This is the starting project screen</Text>
    <Link href='/tabs/projects/create'>New Project</Link>
  </>
}