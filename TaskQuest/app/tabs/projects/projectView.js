import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import TaskSummary from "../../../components/taskSummary";
import { useLayoutEffect } from "react";
 
export default function ProjectView() {
  const { id, title, description, tasks } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({title: title})
  }, [navigation])
 
  return (
<View style={styles.container}>
<View style={styles.header}>
<Text style={styles.title}>{title}</Text>
<Text style={styles.description}>{description}</Text>
</View>
 
      <View style={styles.taskSection}>
<View style={styles.taskHeader}>
<Text style={styles.sectionTitle}>Tasks</Text>
<Pressable 
    onPress={() => router.push({
              pathname: '/createTask',
              params: { projectId: id }
            })}
            style={styles.addButton}
>
<Text>Add Task</Text>
</Pressable>
</View>
 
        <FlatList
          data={JSON.parse(tasks)}
          renderItem={({ item }) => (
<Pressable 
              style={styles.taskCard}
              onPress={() => router.push({
                pathname: 'tabs/projects/taskView',
                params: { id: item.id, title: item.title, description: item.description, dueDate: item.dueDate, taskStatus: item.status}
              })}
>
<View style={styles.taskInfo}>
<Text style={styles.taskTitle}>{item.title}</Text>
<Text style={styles.taskDate}>{item.dueDate}</Text>
</View>
<Text style={styles.taskStatus}>{item.status}</Text>
</Pressable>
          )}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    color: '#666',
  },
  taskSection: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskDate: {
    color: '#666',
    marginTop: 4,
  },
  taskStatus: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
});