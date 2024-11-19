// import { Text } from "react-native";
// import { Link } from "expo-router"

// export default function RegisterScreen() {
//   return <>
//     <Text>Register Page</Text>
//     <Link href='./'>Have an account already? Sign in instead</Link>
//   </>
// }

import React, { useState } from "react";
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Text */}
      <Text style={styles.logoText}>TaskQuest</Text>

      {/* Username Input */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
        {username ? (
          <Text style={styles.indicator}>✅ Username available</Text>
        ) : null}
      </View>

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        {password.length >= 10 ? (
          <Text style={styles.indicator}>✅ Strong Password</Text>
        ) : null}
      </View>

      {/* Password Criteria */}
      <Text style={styles.criteriaTitle}>Password Criteria</Text>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaItem}>
          {/[A-Z]/.test(password) ? "✅" : "❌"} at least ONE capital letter
        </Text>
        <Text style={styles.criteriaItem}>
          {/[a-z]/.test(password) ? "✅" : "❌"} at least ONE small letter
        </Text>
        <Text style={styles.criteriaItem}>
          {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✅" : "❌"} at least ONE
          special character
        </Text>
        <Text style={styles.criteriaItem}>
          {/\d/.test(password) ? "✅" : "❌"} at least ONE number
        </Text>
        <Text style={styles.criteriaItem}>
          {password.length >= 10 ? "✅" : "❌"} at least 10 characters in total
        </Text>
        <Text style={styles.criteriaItem}>
          {!["123456", "password", "12345678"].includes(password)
            ? "✅"
            : "❌"}{" "}
          no commonly-used passwords (e.g. 123456)
        </Text>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/tabs/projects/homeScreen')} // Navigate to the home page
      >
        <Text style={styles.createButtonText}>Create a new Account</Text>
      </TouchableOpacity>

      {/* Back Link */}
      <Link href="./" style={styles.backLink}>
        Have an account already? Sign in instead
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 50,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#000",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F8F8F8",
  },
  indicator: {
    fontSize: 14,
    color: "#008000", // Green text for indicators
    marginTop: 5,
  },
  criteriaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  criteriaContainer: {
    width: "100%",
    marginBottom: 30,
  },
  criteriaItem: {
    fontSize: 14,
    color: "#008000", // Green text for valid criteria
    marginBottom: 5,
  },
  createButton: {
    width: "100%",
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backLink: {
    color: "#4A90E2",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
