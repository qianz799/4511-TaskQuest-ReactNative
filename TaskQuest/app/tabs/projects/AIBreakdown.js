import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';

export default function TaskBreakdownScreen({ tasks, prompt, onClose, projectId, onCancel }) {
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const toggleTask = (index) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedTasks(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map((_, index) => index)));
    }
  };

  const handleApprove = async () => {
    try {
      const tasksToCreate = Array.from(selectedTasks).map(index => ({
        title: tasks[index].title,
        description: tasks[index].description,
        projectId: projectId,
        dueDate: new Date().toISOString(),
        isPriority: false,
        complete: false
      }));

      const storedTasksJson = await AsyncStorage.getItem(TASKS_KEY);
      const storedTasks = storedTasksJson ? JSON.parse(storedTasksJson) : [];
      
      const newTasks = tasksToCreate.map(task => ({
        ...task,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));

      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([...storedTasks, ...newTasks]));
      
      onClose();
    } catch (error) {
      console.error('Failed to save tasks:', error);
      alert('Failed to save tasks');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task Breakdown</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.promptLabel}>Your Prompt:</Text>
        <Text style={styles.prompt}>{prompt}</Text>

        <View style={styles.selectAllContainer}>
          <Text style={styles.selectAllText}>Select All Tasks</Text>
          <TouchableOpacity 
            style={[
              styles.selectAllSwitch,
              selectedTasks.size === tasks.length && styles.selectAllSwitchActive
            ]}
            onPress={handleSelectAll}
          >
            <View style={[
              styles.switchKnob,
              selectedTasks.size === tasks.length && styles.switchKnobActive
            ]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.selectLabel}>Select tasks to create:</Text>
      </View>
      
      <View style={styles.taskListWrapper}>
        <ScrollView style={styles.taskList}>
          {tasks.map((task, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.taskItem,
                selectedTasks.has(index) && styles.selectedTaskItem
              ]}
              onPress={() => toggleTask(index)}
            >
              <View style={styles.taskContent}>
                <View style={styles.taskTextContainer}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
                <View style={[
                  styles.checkbox,
                  selectedTasks.has(index) && styles.checkedBox
                ]}>
                  <Text style={[
                    styles.checkmarkText,
                    selectedTasks.has(index) && styles.checkmarkTextSelected
                  ]}>✓</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.approveButton,
              selectedTasks.size === 0 && styles.disabledButton
            ]}
            onPress={handleApprove}
            disabled={selectedTasks.size === 0}
          >
            <Text style={styles.buttonText}>
              Create {selectedTasks.size} {selectedTasks.size === 1 ? 'Task' : 'Tasks'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  promptLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  prompt: {
    fontSize: 16,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  selectAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectAllText: {
    fontSize: 16,
    color: '#666',
  },
  selectAllSwitch: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: '#E0E0E0',
    padding: 2,
  },
  selectAllSwitchActive: {
    backgroundColor: '#B0ACEC',
  },
  switchKnob: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  switchKnobActive: {
    transform: [{ translateX: 20 }],
  },
  selectLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskListWrapper: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
  },
  taskList: {
    flex: 1,
    padding: 10,
  },
  buttonWrapper: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E57373',
  },
  approveButton: {
    backgroundColor: '#B0ACEC',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B0ACEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#B0ACEC',
    borderColor: '#B0ACEC',
  },
  selectedTaskItem: {
    borderColor: '#B0ACEC',
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkmarkText: {
    fontSize: 16,
    color: '#B0ACEC',
  },
  checkmarkTextSelected: {
    color: '#fff',
  },
}); 