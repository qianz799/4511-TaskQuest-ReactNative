import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';

const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const DUMMY_MEMBERS = [
  { id: '1', name: 'John' },
  { id: '2', name: 'Huang' },
  { id: '3', name: 'Kira' },
  { id: '4', name: 'Sarah' },
];

export default function TaskForm({ 
  mode = 'create', 
  existingTask = null, 
  projectId, 
  onClose,
  onSave 
}) {
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [dueDate, setDueDate] = useState(existingTask ? new Date(existingTask.dueDate) : new Date());
  const [isPriority, setIsPriority] = useState(existingTask?.isPriority || false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [assignedMember, setAssignedMember] = useState(existingTask?.assignedMember || '');
  const [showMemberPicker, setShowMemberPicker] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a task name");
      return;
    }

    try {
      if (mode === 'create') {
        const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        const newTask = {
          id: Date.now().toString(),
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDate.toISOString(),
          isPriority,
          projectId,
          complete: false,
          assignedMember,
        };
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, newTask]));
        onClose();
      } else {
        await onSave({
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDate.toISOString(),
          isPriority,
          assignedMember,
        });
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task');
    }
  };

  const handleAssign = () => {
    setShowMemberPicker(true);
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Task Name"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
        style={styles.taskNameInput}
        autoFocus={mode === 'create'}
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
          onPress={handleAssign}
        >
          <MaterialCommunityIcons 
            name="account-plus" 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.buttonText}>
            {assignedMember ? DUMMY_MEMBERS.find(m => m.id === assignedMember)?.name : 'Assign'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowCalendar(true)}
        >
          <MaterialCommunityIcons name="calendar" size={20} color="#fff" />
          <Text style={styles.buttonText}>{formatDate(dueDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.dropdownButton, isPriority && styles.priorityButton]}
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
          {Platform.OS === 'ios' && (
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

      <Modal
        visible={showMemberPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMemberPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.memberPickerContent}>
            <Text style={styles.modalTitle}>Assign To</Text>
            {DUMMY_MEMBERS.map(member => (
              <TouchableOpacity 
                key={member.id}
                style={styles.memberItem}
                onPress={() => {
                  setAssignedMember(member.id);
                  setShowMemberPicker(false);
                }}
              >
                <View style={styles.memberRow}>
                  <Text style={styles.memberAvatar}>{member.avatar}</Text>
                  <Text style={styles.memberName}>{member.name}</Text>
                  {assignedMember === member.id && (
                    <MaterialCommunityIcons 
                      name="check" 
                      size={20} 
                      color="#4CAF50" 
                      style={styles.checkIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowMemberPicker(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity 
        style={[styles.button, mode === 'create' ? styles.createButton : styles.saveButton]}
        onPress={handleSave}
      >
        <Text style={[styles.buttonText, styles.actionButtonText]}>
          {mode === 'create' ? 'Create Task' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    marginTop: 20,
  },
  taskNameInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '500',
    height: 60,
  },
  descriptionInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 45,
    textAlignVertical: 'top',
    multiline: true,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
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
  priorityButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#B0ACEC',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#B0ACEC',
    marginTop: 20,
  },
  iosCalendarButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
  },
  doneButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  memberPickerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  memberItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memberAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  memberName: {
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});