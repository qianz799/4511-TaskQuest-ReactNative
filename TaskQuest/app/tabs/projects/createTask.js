import React, { useState } from "react";
import { View, TextInput, Text, Modal, StyleSheet, TouchableOpacity, FlatList, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add at the top with other constants
const TASKS_KEY = '@tasks';

// Add this helper function for date formatting
const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

export default function CreateTask({ onTaskCreated, onClose, projectId }) {
  const [taskType, setTaskType] = useState(null); // null, 'manual', or 'ai'
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [flag, setFlag] = useState(false); // Flag for priority
  const [assignedMember, setAssignedMember] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock data - replace with your actual project members
  const projectMembers = [
    { id: '1', name: 'James' },
    { id: '2', name: 'Iesha' },
    { id: '3', name: 'Marianne' },
    { id: '4', name: 'Huang' },
  ];

  const handleCreateTask = async () => {
    if (!title) {
      alert("Please enter a task name");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description: description || '',
      dueDate: dueDate.toISOString(),
      isPriority,
      assignedMember,
      projectId,
      complete: false
    };

    try {
      // Get existing tasks
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, newTask]));
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task');
    }
  };

  const handleAssignMember = (member) => {
    setAssignedMember(member);
    setShowMembers(false);
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, taskType === 'manual' && styles.selectedButton]} 
            onPress={() => setTaskType("manual")}
          >
            <Text style={styles.buttonText}>Manual Task</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, taskType === 'ai' && styles.selectedButton]}
            onPress={() => setTaskType("ai")}
          >
            <Text style={styles.buttonText}>AI Breakdown</Text>
          </TouchableOpacity>
        </View>

        {taskType === "manual" && (
          <View style={styles.form}>
            <TextInput
              placeholder="Task Name"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              style={styles.taskNameInput}
              autoFocus={true}
            />
            
            <TextInput
              placeholder="Description (optional)"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              style={styles.descriptionInput}
              multiline
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => {
                  setShowMembers(!showMembers);
                  setShowCalendar(false);
                }}
              >
                <Text style={styles.buttonText}>
                  {assignedMember ? assignedMember.name : "Assign"}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setShowCalendar(true)}
              >
                <Text style={styles.buttonText}>
                  {dueDate ? formatDate(dueDate) : "Due Date"}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setIsPriority(!isPriority)}
              >
                <MaterialCommunityIcons 
                  name={isPriority ? "flag" : "flag-outline"} 
                  size={20} 
                  color={isPriority ? "#ff4444" : "#fff"} 
                />
                <Text style={styles.buttonText}>Priority</Text>
              </TouchableOpacity>
            </View>

            {showMembers && (
              <View style={styles.membersList}>
                {projectMembers.map((member) => (
                  <TouchableOpacity
                    key={member.id}
                    style={styles.memberItem}
                    onPress={() => handleAssignMember(member)}
                  >
                    <MaterialCommunityIcons name="account" size={20} color="#333" />
                    <Text style={styles.memberName}>{member.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {showCalendar && (
              <>
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    setShowCalendar(Platform.OS === 'ios');
                    if (selectedDate) {
                      setDueDate(selectedDate);
                    }
                  }}
                />
                {Platform.OS === 'ios' && showCalendar && (
                  <View style={styles.iosCalendarButtons}>
                    <TouchableOpacity 
                      style={[styles.button, styles.doneButton]}
                      onPress={() => setShowCalendar(false)}
                    >
                      <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            <TouchableOpacity 
              style={[styles.button, styles.createButton]}
              onPress={handleCreateTask}
            >
              <Text style={[styles.buttonText, styles.createButtonText]}>Create Task</Text>
            </TouchableOpacity>
          </View>
        )}

        {taskType === "ai" && (
          <View style={styles.form}>
            <TextInput
              placeholder="AI Breakdown Prompt"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TouchableOpacity 
              style={[styles.button, styles.createButton]}
              onPress={() => alert("AI Tasks Generated")}
            >
              <Text style={[styles.buttonText, styles.createButtonText]}>Generate Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 15,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 4,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#B0ACEC',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    height: 36,
  },
  membersList: {
    position: 'absolute',
    top: '45%',
    left: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
    width: '40%',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  memberName: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  taskNameInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 20, // Larger text for task name
    fontWeight: '500',
    height: 60,
  },
  descriptionInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 45, // Smaller height for description
    textAlignVertical: 'top',
    multiline: true,
  },
  iosCalendarButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
  },
  doneButton: {
    paddingVertical: 8, // Smaller padding for Done button
    paddingHorizontal: 15,
    marginVertical: 0, // Remove vertical margin
  },
  createButtonText: {
    fontWeight: '600', // or 'bold' for maximum boldness
    fontSize: 16, // Optional: make text slightly larger
  },
});
