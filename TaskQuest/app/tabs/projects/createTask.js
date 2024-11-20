import React, { useState } from "react";
import { View, TextInput, Text, Switch, Modal, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateTask({ onTaskCreated, onClose, projectId }) {
  const [taskType, setTaskType] = useState(null); // null, 'manual', or 'ai'
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [flag, setFlag] = useState(false); // Flag for priority
  const [selectedProject, setSelectedProject] = useState(null);
  const [assignedMember, setAssignedMember] = useState(null);

  const handleCreateTask = () => {
    if (!selectedProject || !assignedMember || !title) {
      alert("Please fill in all required fields");
      return;
    }

    const task = {
      title,
      description,
      dueDate,
      flag,
      selectedProject,
      assignedMember,
      taskType,
    };

    onTaskCreated(task); // Call the parent function to create the task
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
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, styles.textArea]}
              multiline
            />
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setAssignedMember("Alice")}
            >
              <Text style={styles.buttonText}>Assign</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.buttonText}>Due Date</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDueDate(selectedDate);
                }}
              />
            )}

            <TouchableOpacity 
              style={styles.button}
            >
              <Text style={styles.buttonText}>Priority</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.createButton]}
              onPress={handleCreateTask}
            >
              <Text style={styles.buttonText}>Create Task</Text>
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
              style={styles.button}
              onPress={() => alert("AI Tasks Generated")}
            >
              <Text style={styles.buttonText}>Generate AI Tasks</Text>
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
    fontSize: 24,
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
    fontSize: 16,
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
});
