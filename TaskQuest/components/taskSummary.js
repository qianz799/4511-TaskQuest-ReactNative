import { useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TaskSummary({id, title, description, dueDate, complete, toggleStatus}) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push({
      pathname: 'tabs/projects/taskView',
      params: { id: id, title: title, description: description, dueDate: dueDate, complete: complete}
    })}>
      <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <TouchableOpacity
          style={styles.roundCheckbox}
          onPress={() => toggleStatus(id)}
        />
        <View style={styles.taskContent}>
          <Text style={styles.taskName}>{title}</Text>
          <View style={styles.dueDateContainer}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={18}
              color="#6B6B6B"
            />
            <Text style={{ marginLeft: 4 }}>Due: {dueDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.taskEditButton}>
          <Text>...</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Pressable>
  )
}

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
  taskCard: { padding: 16, marginBottom: 8, backgroundColor: '#dddddd', borderRadius: 8 },
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