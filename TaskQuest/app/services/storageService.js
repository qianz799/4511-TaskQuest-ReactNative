import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  TASKS: '@tasks',
  PROJECTS: '@projects',
  NOTIFICATIONS: '@notifications',
  USER: '@user'
};

export const StorageService = {
  async get(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      return false;
    }
  },

  async update(key, updateFn) {
    try {
      const current = await this.get(key) || [];
      const updated = updateFn(current);
      await this.set(key, updated);
      return updated;
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      return null;
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return false;
    }
  }
}; 