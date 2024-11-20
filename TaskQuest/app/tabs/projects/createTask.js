import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import TaskForm from '../../../components/TaskForm';

export default function CreateTask({ onClose, projectId }) {
  const [taskType, setTaskType] = useState('manual'); // 'manual' or 'ai'

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.taskTypeButtons}>
          <TouchableOpacity 
            style={[styles.typeButton, taskType === 'manual' && styles.activeTypeButton]}
            onPress={() => setTaskType('manual')}
          >
            <Text style={[styles.typeButtonText, taskType === 'manual' && styles.activeTypeText]}>
              Manual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeButton, taskType === 'ai' && styles.activeTypeButton]}
            onPress={() => setTaskType('ai')}
          >
            <Text style={[styles.typeButtonText, taskType === 'ai' && styles.activeTypeText]}>
              AI Generate
            </Text>
          </TouchableOpacity>
        </View>

        {taskType === 'manual' ? (
          <TaskForm 
            mode="create"
            projectId={projectId}
            onClose={onClose}
          />
        ) : (
          <View style={styles.aiForm}>
            <TextInput
              placeholder="What task would you like AI to break down?"
              placeholderTextColor="#999"
              style={styles.aiInput}
              multiline
            />
            <TouchableOpacity 
              style={styles.generateButton}
              onPress={() => alert("AI Task Generation coming soon!")}
            >
              <Text style={styles.generateButtonText}>Generate Task</Text>
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
  taskTypeButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  activeTypeButton: {
    backgroundColor: '#444',
  },
  typeButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTypeText: {
    color: '#fff',
  },
  aiForm: {
    marginTop: 20,
  },
  aiInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#B0ACEC',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
