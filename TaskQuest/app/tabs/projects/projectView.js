import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import TaskSummary from "../../../components/taskSummary";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreateTask from './createTask'; // Import the CreateTask component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

// Add at the top with other constants
const TASKS_KEY = '@tasks';

export default function ProjectView() {
  const { id, title, description, tasks, gamification } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const toggleStatus = (id) => {
    setTaskData(taskData.map(task => {
      if (task.id === id) {
        return {...task, complete: !task.complete}
      }
      return task;
    }))
  }

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const projectTasks = allTasks.filter(task => task.projectId === id);
      
      // Sort tasks by priority and due date
      const sortedTasks = projectTasks.sort((a, b) => {
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return 0;
      });

      setTaskData(sortedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    loadTasks();
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [id])
  );

  const handleTaskUpdate = () => {
    setLastUpdated(new Date());
    loadTasks();
  };

  const deleteTask = async (taskId) => {
    try {
      // Get current tasks
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      const allTasks = JSON.parse(storedTasks);
      
      // Filter out the deleted task
      const updatedTasks = allTasks.filter(task => task.id !== taskId);
      
      // Save back to storage
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      
      // Update local state
      setTaskData(taskData.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  return (
<View style={styles.container}>
<View style={styles.header}>
<Text style={styles.title}>{title}</Text>
<Text style={styles.description}>{description}</Text>
</View>
 
<View>
<View style={styles.taskHeader}>
<Text style={styles.sectionTitle}>Tasks</Text>

</View>
 
        <FlatList
          data={taskData.filter(task => !task.complete)}
          renderItem={({ item }) => (
            <TaskSummary 
              id={item.id} 
              title={item.title} 
              description={item.description} 
              dueDate={item.dueDate} 
              complete={item.complete} 
              isPriority={item.isPriority}
              toggleStatus={toggleStatus}
              projectId={id}
              onUpdate={handleTaskUpdate}
              onDelete={deleteTask}
            />
          )}
        />

<View style={styles.taskHeader}>
<Text style={styles.sectionTitle}> Completed Tasks</Text>
</View>
<FlatList
          data={taskData.filter(task => task.complete)}
          renderItem={({ item }) => ( <TaskSummary id={item.id} title={item.title} description={item.description} dueDate={item.dueDate} complete={item.complete} toggleStatus={toggleStatus} onDelete={deleteTask}/>
          )}
/>
</View>
<TouchableOpacity
    style={styles.addNewTaskButton}
    onPress={() => setModalVisible(true)} // We'll need state for the modal
  >
    <MaterialCommunityIcons name="plus" size={24} color="#fff" />
  </TouchableOpacity>

  {/* Add CreateTask Modal */}
  <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={handleModalClose}
  >
    <CreateTask onClose={handleModalClose} projectId={id} />
  </Modal>

</View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    color: '#666',
  },
  taskSection: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskDate: {
    color: '#666',
    marginTop: 4,
  },
  taskStatus: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  addNewTaskButton: {
    position: 'absolute',
    right: 30,
    bottom: 70, // Adjust this value based on your tab height
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#B0ACEC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 999, // Ensures button stays on top
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});