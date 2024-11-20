// manage navigation: open modals, create tasks, manage the state of the home screen
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";
 
export default function ProjectsScreen() {
  const router = useRouter();
  // Example data structure
  const projects = [
    { id: 1, title: "Economics Assignment", description: "This is the description", tasks: [
      { 
        id: 1, 
        title: "Task 1", 
        description: "Task details",
        dueDate: "2024-03-20",
        complete: false
      },
    ]},
    // ... more projects
  ];

  const upcomingTasks = projects
    .flatMap(p => p.tasks)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  return (
<View style={styles.container}>
 
      {/* Projects List */}
<View style={styles.section}>
  <View style={styles.header}>
  <Text style={styles.sectionTitle}>Projects</Text>
  <Link href="/tabs/projects/create" style={styles.newButton}>New Project</Link>
  </View>
<FlatList data={projects} renderItem={({ item }) => (
  <Pressable style={styles.projectCard} onPress={() => router.push({pathname: 'tabs/projects/projectView', params: {id: item.id, description: item.description, title: item.title, tasks: JSON.stringify(item.tasks)}})}>
  <Text style={styles.projectTitle}>{item.title}</Text>
  <Text>{item.tasks.length} tasks</Text>
</Pressable>)}

        />
</View>
</View>

  );

}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  projectCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCard: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    minWidth: 150,
  },
});
