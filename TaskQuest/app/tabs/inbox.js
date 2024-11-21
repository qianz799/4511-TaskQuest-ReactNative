import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StorageService, STORAGE_KEYS } from '../services/storageService';
import { useRouter } from "expo-router";

const NotificationTypes = {
  TASK_COMPLETION: 'task_completion',
  TASK_OVERDUE: 'task_overdue',
  TASK_ASSIGNED: 'task_assigned',
  PROJECT_ADDED: 'project_added',
  MEETING_REMINDER: 'meeting_reminder'
};

export default function InboxScreen() {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    const stored = await StorageService.get(STORAGE_KEYS.NOTIFICATIONS) || [];
    setNotifications(stored);
  };

  const handleNotificationPress = async (notification) => {
    // Mark as read
    await StorageService.update(STORAGE_KEYS.NOTIFICATIONS, notifications =>
      notifications.map(n => n.id === notification.id ? {...n, read: true} : n)
    );

    // Navigate if has projectId
    if (notification.projectId) {
      router.push({
        pathname: '/tabs/projects/projectView',
        params: { id: notification.projectId }
      });
    }
  };

  const getNotificationStyle = (type) => {
    switch(type) {
      case NotificationTypes.TASK_OVERDUE:
        return styles.overdueNotification;
      case NotificationTypes.TASK_COMPLETION:
        return styles.completionNotification;
      case NotificationTypes.PROJECT_ADDED:
        return styles.projectNotification;
      default:
        return null;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch(filter) {
      case 'task':
        return matchesSearch && [NotificationTypes.TASK_COMPLETION, NotificationTypes.TASK_OVERDUE, NotificationTypes.TASK_ASSIGNED].includes(notification.type);
      case 'project':
        return matchesSearch && notification.type === NotificationTypes.PROJECT_ADDED;
      case 'reminder':
        return matchesSearch && [NotificationTypes.MEETING_REMINDER, NotificationTypes.TASK_OVERDUE].includes(notification.type);
      default:
        return matchesSearch;
    }
  });

  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        getNotificationStyle(item.type)
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  const clearAllNotifications = async () => {
    await StorageService.set(STORAGE_KEYS.NOTIFICATIONS, []);
    setNotifications([]);
  };

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

      <TouchableOpacity 
        style={styles.clearButton}
        onPress={clearAllNotifications}
      >
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>

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
  overdueNotification: {
    backgroundColor: '#fff0f0',
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
  },
  completionNotification: {
    backgroundColor: '#f0fff0',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  projectNotification: {
    backgroundColor: '#f0f0ff',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  clearButton: {
    padding: 8,
    marginRight: 16,
  },
  clearButtonText: {
    color: '#ff4444',
    fontSize: 14,
  }
});