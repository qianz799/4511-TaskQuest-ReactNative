// displayUI elements: mode toggle, recent projects, upcoming tasks
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ onCreateTask }) {
  // State to manage the current mode (Clean Mode or Gamification Mode)
  const [isCleanMode, setIsCleanMode] = useState(false);
  const router = useRouter();
  const TASKS_KEY = '@tasks';

  // Example data for recent projects
  const recentProjects = [
    { id: 1, title: "Economics Assignment", description: "This is the description", tasks: [
      { 
        id: 1, 
        title: "Task 1", 
        description: "Task details",
        dueDate: "2024-03-20",
        complete: false
      },
    ]},
    { id: 2, title: "Humanities Assignment", description: "This is the description", tasks: [
      { 
        id: 1, 
        title: "Task 1", 
        description: "Task details",
        dueDate: "2024-03-20",
        complete: false
      },
      { 
        id: 2, 
        title: "Task 2", 
        description: "Task details",
        dueDate: "2024-03-20",
        complete: true
      },
    ]},
    // ... more projects
  ];

  const calculateCompletion = (tasks) => {
    return tasks.filter(task => task.complete).length / tasks.length;
  }

  const calculateTasksDue = (tasks) => {
    return tasks.filter(task => !task.complete).length;
  }

  // Replace the static upcomingTasks with a state and loading function
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  // Add this function to load tasks
  const loadUpcomingTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      if (storedTasks) {
        const allTasks = JSON.parse(storedTasks);
        const upcoming = allTasks
          .filter(task => !task.complete)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 5); // Show only 5 most recent tasks
        setUpcomingTasks(upcoming);
      }
    } catch (error) {
      console.error('Error loading upcoming tasks:', error);
    }
  };

  // Add useEffect to load tasks
  useEffect(() => {
    loadUpcomingTasks();
  }, []);

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
              onPress={() => router.push({pathname: 'tabs/projects/projectView', params: {id: item.id, description: item.description, title: item.title, tasks: JSON.stringify(item.tasks)}})}
            >

              <Text style={styles.projectName}>{item.title}</Text>
              <Text>Tasks Due: {calculateTasksDue(item.tasks)}</Text>
              {/* Custom progress bar representation */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressBarFill, { width: `${Math.round(calculateCompletion(item.tasks) * 100)}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(calculateCompletion(item.tasks) * 100)}%</Text>
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
            <View style={[
              styles.taskCard,
              item.isPriority && styles.priorityTaskCard
            ]}>
              <View style={styles.taskHeader}>
                <TouchableOpacity
                  style={styles.roundCheckbox}
                  onPress={() => router.push({
                    pathname: 'tabs/projects/projectView',
                    params: {
                      id: item.projectId,
                      title: item.projectTitle,
                      description: item.projectDescription,
                      tasks: JSON.stringify([item]),
                      selectedTaskId: item.id
                    }
                  })}
                />
                <View style={styles.taskContent}>
                  <Text style={styles.taskName}>{item.title}</Text>
                  <View style={styles.dueDateContainer}>
                    <MaterialCommunityIcons
                      name="calendar-month-outline"
                      size={16}
                      color="#666"
                    />
                    <Text style={styles.dateText}>
                      Due: {new Date(item.dueDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                    </Text>
                  </View>
                </View>
                {item.isPriority && (
                  <MaterialCommunityIcons
                    name="flag"
                    size={18}
                    color="red"
                    style={styles.flagIcon}
                  />
                )}
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

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
  taskCard: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  priorityTaskCard: {
    backgroundColor: '#fff3cd',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roundCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 10,
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#666',
    fontSize: 13,
    marginLeft: 4,
  },
  flagIcon: {
    marginLeft: 8,
  },
});


