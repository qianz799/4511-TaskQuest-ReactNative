import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from "../../../components/TaskForm";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';

export default function EditTask() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const handleSave = async (updatedTask) => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = JSON.parse(storedTasks);
      
      const updatedTasks = tasks.map(task => 
        task.id === params.id ? { ...task, ...updatedTask } : task
      );
      
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      router.back();
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task');
    }
  };

  return (
    <View style={styles.container}>
      <TaskForm
        mode="edit"
        existingTask={{
          id: params.id,
          title: params.title,
          description: params.description,
          dueDate: params.dueDate,
          isPriority: params.isPriority === 'true',
          assignedMember: params.assignedMember,
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
});
