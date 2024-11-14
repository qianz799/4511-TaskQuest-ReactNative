// manage navigation: open modals, create tasks, manage the state of the home screen
import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";
import { Link } from "expo-router";
import CreateTask from "./createTask"; // Assuming the CreateTask component is located in the same directory
import HomeScreen from './homeScreen';

export default function ProjectScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateTaskPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleTaskCreated = (task) => {
    console.log("Task Created:", task);
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen onCreateTask={handleCreateTaskPress} />
      
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <CreateTask onTaskCreated={handleTaskCreated} />
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
