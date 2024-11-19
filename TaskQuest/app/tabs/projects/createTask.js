import React, { useState } from "react";
import { View, Button, TextInput, Text, Switch, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateTask({ onTaskCreated }) {
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
    <View style={{ padding: 20 }}>
      {/* Task Type Modal */}
      <Text>Select Task Type:</Text>
      <Button title="Manual Task" onPress={() => setTaskType("manual")} />
      <Button title="AI Breakdown" onPress={() => setTaskType("ai")} />

      {/* Manual Task Form */}
      {taskType === "manual" && (
        <View>
          <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            style={{ height: 50, backgroundColor: "white", marginBottom: 10 }}
          />
          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            style={{ height: 150, backgroundColor: "white", marginBottom: 10 }}
            multiline
          />
          {/* Project Selection */}
          <Button title={`Select Project: ${selectedProject || "None"}`} onPress={() => setSelectedProject("Project Alpha")} />
          {/* Member Assignment */}
          <Button title={`Assign Member: ${assignedMember || "None"}`} onPress={() => setAssignedMember("Alice")} />
          {/* Due Date */}
          <Button title={`Due Date: ${dueDate.toLocaleDateString()}`} onPress={() => setShowDatePicker(true)} />
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
          {/* Priority */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Priority</Text>
            <Switch value={flag} onValueChange={setFlag} style={{ marginLeft: 10 }} />
          </View>
        </View>
      )}

      {/* AI Breakdown Form */}
      {taskType === "ai" && (
        <View>
          <TextInput
            placeholder="AI Breakdown Prompt"
            value={title}
            onChangeText={setTitle}
            style={{ height: 50, backgroundColor: "white", marginBottom: 10 }}
          />
          <Button title="Generate AI Tasks" onPress={() => alert("AI Tasks Generated")} />
        </View>
      )}

      {/* Save Button */}
      <Button title="Create Task" onPress={handleCreateTask} />
    </View>
  );
}
