import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function TaskView() {
  const { id, title, description, dueDate, complete } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({title: title})
  }, [navigation])
 
  return (
<View style={styles.container}>
<Text>Hi</Text>
<Text>{title}</Text>
<Text>{description}</Text>
<Text>{dueDate}</Text>
<Text>{complete}</Text>
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