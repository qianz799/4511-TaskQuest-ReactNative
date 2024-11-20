import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TaskQuest</Text>
      <Text style={styles.subtitle}>
        A powerful Task Management platform which is easy to use, accessible and fun!
      </Text>

        <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./tutorial2')}
      >
        <Text style={styles.buttonText}>Begin Tutorial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/tabs')}
      >
        <Text style={styles.buttonText}>Skip Tutorial</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
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
});
