import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TaskView() {
  const { id, title, description, dueDate, complete, updateStatus, deleteTask } = useLocalSearchParams();
  const navigation = useNavigation();

  const createTwoButtonAlert = () =>
    Alert.alert('Delete Task?', 'This action cannot be undone.', [
      {text: 'Cancel', style: 'cancel'},
      // Deleting could be done by navigating to project with a taskDelete param (id as value) and removing task with useEffect
      {text: 'DELETE', onPress: () => console.log('OK Pressed')},
    ]);

  const remainingDays = (date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const dateDiff = due.getTime() - today.getTime();
    const days = Math.round(dateDiff / (1000 * 3600 * 24))
    if (days < 0) {
      return <>
          <Text style={{marginLeft: 15}}>{`Due ${dueDate} `}</Text>
          <Text style={{color: 'red'}}>{`(${-days} days ago)`}</Text>
      </>;
    } if (days > 0) {
      return <Text style={{marginLeft: 15}}>{`Due ${dueDate} (${-days} days)`}</Text>
    }
    return <Text style={{marginLeft: 15}}>{`Due today`}</Text>
  }

  useLayoutEffect(() => {
    navigation.setOptions({title: title})
  }, [navigation])
 
  return (
<View style={styles.container}>
  <View style={styles.header}>
  <Text style={styles.title}>{title}</Text>
  <Text style={styles.description}>{description}</Text>
  </View>

  <View style={styles.taskHeader}>
    <MaterialCommunityIcons name="calendar-month-outline" size={28} color="#6B6B6B"/>
    {remainingDays(dueDate)}
  </View>
  {complete === 'true' && 
    <View style={styles.taskHeader}>
      <MaterialCommunityIcons name="check-circle-outline" size={28} color="#6B6B6B"/>
      <Text style={{marginLeft: 15, fontSize: 16}}>Task marked as complete</Text>
    </View>
  }
  <View style={{flexDirection: 'row'}}>
  <Pressable style={styles.functionButton} onPress={createTwoButtonAlert}>
    <MaterialCommunityIcons name="trash-can-outline" size={28} color="#6B6B6B"/>
    <Text style={styles.buttonText}>Delete</Text>
  </Pressable>
  <Pressable style={styles.functionButton}>
    <MaterialCommunityIcons name="pencil" size={28} color="#6B6B6B"/>
    <Text style={styles.buttonText}>Edit</Text>
  </Pressable>
  <Pressable style={styles.functionButton}>
    <MaterialCommunityIcons name="check-bold" size={28} color="#6B6B6B"/>
    <Text style={styles.buttonText}>Finish</Text>
  </Pressable>
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
    fontSize: 18,
  },
  taskSection: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
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
  functionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "#6B6B6B",
    fontSize: 11,
    fontWeight: "600",
  },
});