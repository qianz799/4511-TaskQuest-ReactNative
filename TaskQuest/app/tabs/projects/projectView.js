import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import TaskSummary from "../../../components/taskSummary";
import { useEffect, useLayoutEffect, useState } from "react";
 
export default function ProjectView() {
  const { id, title, description, tasks, gamification } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState([]);

  const toggleStatus = (id) => {
    setTaskData(taskData.map(task => {
      if (task.id === id) {
        return {...task, complete: !task.complete}
      }
      return task;
    }))
  }

  useLayoutEffect(() => {
    navigation.setOptions({title: title})
  }, [navigation])

  useEffect(() => {
    setTaskData(JSON.parse(tasks));
    console.log(tasks)
  }, [tasks])
 
  return (
<View style={styles.container}>
<View style={styles.header}>
<Text style={styles.title}>{title}</Text>
<Text style={styles.description}>{description}</Text>
</View>
 
<View>
<View style={styles.taskHeader}>
<Text style={styles.sectionTitle}>Tasks</Text>
<Pressable 
    onPress={() => router.push({
              pathname: '/tabs/projects/createTask',
              params: { projectId: id }
            })}
            style={styles.addButton}
>
<Text>Add Task</Text>
</Pressable>
</View>
 
        <FlatList
          data={taskData.filter(task => !task.complete)}
          renderItem={({ item }) => ( <TaskSummary id={item.id} title={item.title} description={item.description} dueDate={item.dueDate} complete={item.complete} toggleStatus={toggleStatus}/>
          )}
        />

<View style={styles.taskHeader}>
<Text style={styles.sectionTitle}> Completed Tasks</Text>
</View>
<FlatList
          data={taskData.filter(task => task.complete)}
          renderItem={({ item }) => ( <TaskSummary id={item.id} title={item.title} description={item.description} dueDate={item.dueDate} complete={item.complete} toggleStatus={toggleStatus}/>
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