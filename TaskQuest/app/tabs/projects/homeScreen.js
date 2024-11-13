import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Switch, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  // State to manage the current mode (Clean Mode or Gamification Mode)
  const [isCleanMode, setIsCleanMode] = useState(false);
  const router = useRouter();


  // Example data for recent projects
  const recentProjects = [
    { id: '1', name: 'Project A', completion: 0.7, tasksDue: 5 },
    { id: '2', name: 'Project B', completion: 0.4, tasksDue: 3 },
    { id: '3', name: 'Project C', completion: 0.85, tasksDue: 2 },
  ];

  // Example data for upcoming tasks
  const upcomingTasks = [
    { id: '1', name: 'Design UI for feature X', dueDate: '2024-11-15' },
    { id: '2', name: 'Prepare Presentation for team', dueDate: '2024-11-16' },
    { id: '3', name: 'Code Review for project Y', dueDate: '2024-11-17' },
  ];

  // Function to toggle between modes
  const toggleMode = (value) => {
    setIsCleanMode(!value);
  };

  return (
    <View style={styles.container}>
      {/* Mode Toggle Section */}
      <View style={styles.modeToggleContainer}>
        {/* CheckBox -> Switch -> Trophy */}
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={24}
          color={isCleanMode ? '#B0ACEC' : '#ccc'}
        />
        <Switch
          value={!isCleanMode}
          onValueChange={toggleMode}
          thumbColor={isCleanMode ? '#B0ACEC' : '#FFC107'}
          trackColor={{ false: '#B0ACEC', true: '#FFC107' }}
          style={styles.switch}
        />
        <MaterialCommunityIcons
          name="trophy-outline"
          size={24}
          color={!isCleanMode ? '#FFC107' : '#ccc'}
        />
      </View>
      <Text style={[styles.modeLabel, { color: isCleanMode ? '#B0ACEC' : '#FFC107' }]}>
        {isCleanMode ? 'Clean Mode' : 'Game Mode'}
      </Text>

 {/* Recent Projects */}
 <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Projects</Text>
        <FlatList
          horizontal
          data={recentProjects}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.projectCard}
              onPress={() => router.push(`/tabs/projects/projectView/${item.id}`)}
            >
              <Text style={styles.projectName}>{item.name}</Text>
              <Text>Tasks Due: {item.tasksDue}</Text>
              {/* Custom progress bar representation */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressBarFill, { width: `${item.completion * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(item.completion * 100)}%</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Upcoming Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <FlatList
          data={upcomingTasks}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <TouchableOpacity
                  style={styles.roundCheckbox}
                  onPress={() => router.push('/tabs/game')}
                />
                <View style={styles.taskContent}>
                  <Text style={styles.taskName}>{item.name}</Text>
                  <View style={styles.dueDateContainer}>
                    <MaterialCommunityIcons
                      name="calendar-month-outline"
                      size={18}
                      color="#6B6B6B"
                    />
                    <Text style={{ marginLeft: 4 }}>Due: {item.dueDate}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.taskEditButton}>
                  <Text>...</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Add Button for Creating New Tasks */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/tabs/projects/create')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  modeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  switch: { marginLeft: 8 },
  section: { marginBottom: 24, marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  projectCard: {
    padding: 16,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    width: 150,
  },
  projectName: { fontSize: 16, fontWeight: 'bold' },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%', 
    backgroundColor: '#4CAF50', 
    borderRadius: 4
  },
  progressText: { marginLeft: 8, fontSize: 12, color: '#333' },
  taskCard: { padding: 16, marginBottom: 8, backgroundColor: '#f0f0f0', borderRadius: 8 },
  taskHeader: { flexDirection: 'row', alignItems: 'center' },
  roundCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 12,
    marginRight: 8,
  },
  taskContent: { flex: 1 },
  taskName: { fontSize: 16, fontWeight: 'bold' },
  dueDateContainer: { flexDirection: 'row', alignItems: 'center' },
  taskEditButton: { padding: 4 },
  addButton: {
    position: 'absolute',
    bottom: 55,
    right: 16,
    width: 56,
    height: 56,
    backgroundColor: '#B0ACEC',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // floating
  },
  addButtonText: { color: '#fff', fontSize: 40 },
});


