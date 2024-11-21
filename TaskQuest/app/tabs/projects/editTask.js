import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from "../../../components/TaskForm";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const TASKS_KEY = '@tasks';

export default function EditTask() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSave = async (updatedTask) => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      
      const updatedTasks = tasks.map(task => 
        task.id === params.id ? {
          ...task,
          ...updatedTask,
          projectId: params.projectId,
          id: params.id
        } : task
      );
      
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      setShowSuccess(true);
      
      setTimeout(() => {
        router.back();
      }, 1500);
      
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task');
    }
  };

  return (
    <View style={styles.container}>
      {showSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Task updated successfully!</Text>
        </View>
      )}
      <TaskForm
        mode="edit"
        existingTask={{
          id: params.id,
          title: params.title,
          description: params.description,
          dueDate: params.dueDate,
          isPriority: params.isPriority === 'true',
          projectId: params.projectId
        }}
        onClose={() => router.back()}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  successText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  }
});
