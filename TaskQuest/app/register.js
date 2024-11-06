import { Text } from "react-native";
import { Link } from "expo-router"

export default function RegisterScreen() {
  return <>
    <Text>Register Page</Text>
    <Link href='./'>Have an account already? Sign in instead</Link>
  </>
}