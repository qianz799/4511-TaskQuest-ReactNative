import React, { useState } from "react";
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function TermsAndConditionsScreen() {
    const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>
        Hi, it seems like{" "}
        <Text style={styles.highlight}>you’re a first time user!</Text>
      </Text>

      {/* License Agreement */}
      <ScrollView style={styles.agreementContainer}>
        <Text style={styles.agreementTitle}>End User License Agreement</Text>
        <Text style={styles.agreementContent}>
          END USER LICENSE AGREEMENT Last updated March 15, 2024{"\n\n"}
          TaskQuest is licensed to You (End-User) by GOLF, located at UNSW
          ("Licensor"), for use only under the terms of this License Agreement.
          By downloading the Licensed Application from Apple's software
          distribution platform ("App Store"), and any update thereto (as
          permitted by this License Agreement), You indicate that You agree to
          be bound by all of the terms and conditions of this License
          Agreement, and that You accept this License Agreement. App Store is
          referred to in this License Agreement as "Services."
          {"\n\n"}The parties of this License Agreement acknowledge that the
          Services are not a Party to this License Agreement and are not bound
          by any provisions...
          {/* Add full text here */}
        </Text>
      </ScrollView>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Please read through the agreement, and consent by checking the box
        below.
      </Text>

      {/* Custom Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, isChecked ? styles.checkboxChecked : styles.checkboxUnchecked]}
        onPress={() => setIsChecked(!isChecked)}
      >
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
      <Text style={styles.checkboxLabel}>Yes, I agree to the terms</Text>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          isChecked ? styles.nextButtonActive : styles.nextButtonDisabled,
        ]}
        disabled={!isChecked}
        onPress={() => {
          // Handle "Next" button press here
          router.push('./tutorial1')
        }}
      >
        <Text
          style={[
            styles.nextButtonText,
            isChecked ? styles.nextButtonTextActive : styles.nextButtonTextDisabled,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    color: "#007BFF",
  },
  agreementContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  agreementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  agreementContent: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#007BFF",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    alignSelf: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  checkboxUnchecked: {
    backgroundColor: "#fff",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#ccc",
  },
  nextButtonActive: {
    backgroundColor: "#007BFF",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButtonTextDisabled: {
    color: "#666",
  },
  nextButtonTextActive: {
    color: "#fff",
  },
});
