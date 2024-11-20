// import { Text } from "react-native";
// import { Link } from "expo-router"

// export default function LoginScreen() {
//     return <>
//         <Text>Login Page</Text>
//         <Link href='./register'>No account? Register</Link>
//         <Link href='./tabs'>Sign In</Link>
//     </>

// }

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Logo Text */}
      <Text style={styles.logoText}>TaskQuest</Text>

      {/* Login Button */}
       <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./signin')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Alternative Sign-in Options */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./alternative')}
      >
        <Text style={styles.buttonText}>Alternative Sign In Options</Text>
      </TouchableOpacity>

      {/* Create New Account Link */}
      <Link href="./register" style={styles.linkText}>
        Create a new account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White background
  },
  logoText: {
    fontSize: 36, // Logo font size
    fontWeight: "bold",
    color: "#000000", // Black text
    marginBottom: 100, // Space between logo and buttons
  },
  button: {
    width: "80%", // Button width
    backgroundColor: "#4A90E2", // Blue background
    padding: 15, // Button padding
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center text inside the button
    marginVertical: 10, // Space between buttons
  },
  buttonText: {
    color: "#FFFFFF", // White text for the button
    fontSize: 16, // Text size
    fontWeight: "600", // Semi-bold text
    textAlign: "center", // Ensure the text is centred
  },
  linkText: {
    color: "#4A90E2", // Blue text for links
    fontSize: 14, // Text size for the link
    marginTop: 20, // Space above the link
  },
});
