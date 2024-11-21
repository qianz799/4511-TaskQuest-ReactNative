import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// Mock data - replace with your actual data source
const NOTIFICATIONS = [
  {
    id: '1',
    type: 'task_completion',
    title: 'Marianne completed a task',
    subtitle: 'See more',
    timestamp: '11:33 am',
  },
  // ... add more notifications
];

export default function InboxScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredNotifications = NOTIFICATIONS.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || notification.type === filter;
    return matchesSearch && matchesFilter;
  });

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      {item.avatar && (
        <View style={styles.avatar}>
          <Image source={item.avatar} style={styles.avatarImage} />
        </View>
      )}
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="menu" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Notifications"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={24} color="#666" />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'task' && styles.activeFilter]}
          onPress={() => setFilter('task')}>
          <Text>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'project' && styles.activeFilter]}
          onPress={() => setFilter('project')}>
          <Text>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'reminder' && styles.activeFilter]}
          onPress={() => setFilter('reminder')}>
          <Text>Reminders</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0e7f4',
    borderRadius: 25,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#e0e0e0',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f0f9ff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  list: {
    flex: 1,
  },
});