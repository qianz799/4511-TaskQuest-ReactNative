import { useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export default function TaskSummary({ id, title, description, dueDate, complete, isPriority, toggleStatus, assignedMember }) {
  const router = useRouter();

  return (
    <Pressable 
      style={[
        styles.taskCard,
        isPriority && styles.priorityTask
      ]} 
      onPress={() => router.push({
        pathname: '/tabs/projects/editTask',
        params: { 
          id, 
          title, 
          description, 
          dueDate, 
          complete: complete.toString(),
          isPriority: isPriority?.toString(),
          assignedMember
        }
      })}
    >
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => toggleStatus(id)}
      >
        <MaterialCommunityIcons 
          name={complete ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"} 
          size={22} 
          color={complete ? "#4CAF50" : "#666"}
        />
      </TouchableOpacity>

      <View style={styles.taskInfo}>
        <Text style={[
          styles.taskTitle,
          complete && styles.completedTask
        ]}>
          {title}
        </Text>
        <View style={styles.dateContainer}>
          <MaterialCommunityIcons 
            name="calendar-month-outline" 
            size={16} 
            color="#666"
          />
          <Text style={styles.taskDate}>
            Due: {new Date(dueDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
          </Text>
        </View>
      </View>

      {isPriority && (
        <MaterialCommunityIcons 
          name="flag" 
          size={18} 
          color="#ff4444" 
          style={styles.flagIcon}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  priorityTask: {
    backgroundColor: '#fff3cd',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
    marginRight: 8,
  },
  flagIcon: {
    marginLeft: 'auto',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  taskDate: {
    color: '#666',
    fontSize: 13,
    marginLeft: 4,
  },
});