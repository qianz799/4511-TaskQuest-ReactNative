import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Tutorial Header */}
      <TouchableOpacity style={styles.endTutorial}
       onPress={() => router.push('/tabs')}
      >
        <Text style={styles.linkText}>End Tutorial</Text>
      </TouchableOpacity>

      {/* Home Page Title */}
      <Text style={styles.title}>Task:</Text>

      {/* Task Bar Section */}
      <View style={styles.section}>
        <Text style={styles.description}>
        Task Bar will represent the upcoming tasks and their due date:
        </Text>
        <Image
          source={require("../assets/Task.png")}
          style={styles.progressBar}
        />
      </View>

      {/* Slider Section */}
      <View style={styles.section}>
        <Text style={styles.description}>
        You will be able to create new tasks using the following button:
        </Text>
        <Image
          source={require("../assets/createTask.png")}
          style={styles.slider}
        />
      </View>

      {/* Text and Bottom Navigation */}
      <View style={styles.bottomSection}>
        <Text style={styles.lastText}>
        TaskQuest will Automatically do Task Breakdown and Assignment for you after this button is clicked:
        </Text>
        
          <Image
            source={require("../assets/AItask.png")}
            style={styles.navIcons}
          />
        
      </View>

      {/* Next Button
      <TouchableOpacity style={styles.nextButton}
        onPress={() => router.push('./tutorial1')}
      >
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity> */}

      {/* Previous Button */}
      
        <TouchableOpacity style={styles.previousButton}
        onPress={() => router.push('./tutorial4')}
        >
        <Text style={styles.previousButtonText}>←</Text>
        </TouchableOpacity>

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  endTutorial: {
    alignSelf: "flex-end",
  },
  linkText: {
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  section: {
    marginVertical: 20,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#7b1fa2",
    textAlign: "center",
    marginBottom: 10,
  },
  progressBar: {
    width: "90%",
    height: 80,
    resizeMode: "contain",
  },
  slider: {
    width: "90%",
    height: 75,
    resizeMode: "contain",
  },
  bottomSection: {
    marginTop: 30,
  },
  lastText: {
    fontSize: 14,
    color: "#7b1fa2",
    textAlign: "center",
    marginBottom: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  navIcons: {
    width: "90%",
    height: 60,
    resizeMode: "contain",
  },
  nextButton: {
    marginTop: 20,
    alignSelf: "center",
    bottom: -30, // Adjust to control vertical positioning
    left: 90,
    backgroundColor: "#000",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  previousButton: {
    marginTop: 20,
    alignSelf: "center",
    bottom: -30, // Adjust to control vertical positioning
    right: 90, // Symmetric to 'nextButton'
    backgroundColor: "#000",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  previousButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },  
});
