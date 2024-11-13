import { Text } from "react-native";
import { Link } from "expo-router"

export default function LoginScreen() {
    return <>
        <Text>Login Page</Text>
        <Link href='./register'>No account? Register</Link>
        <Link href='./tabs'>Sign In</Link>
    </>

}