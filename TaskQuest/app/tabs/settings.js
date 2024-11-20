import { Text } from "react-native";
import React, { useState } from 'react';
import { View, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function RegisterScreen() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const router = useRouter();
  const [isCleanMode, setIsCleanMode] = useState(false);

  // Function to toggle between modes
  const toggleMode = (value) => {
    setIsCleanMode(!value);
  };

  
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>JW</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.rewards}>
          <Ionicons name="trophy-outline" size={24} color="gold" />
          <Text style={styles.rewardsText}>Rewards</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.settingsHeader}>Settings</Text>
        {/* Mode Toggle Section */}
      <View style={styles.modeToggleContainer}>
        {/* CheckBox -> Switch -> Trophy */}
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={24}
          color={isCleanMode ? '#B0ACEC' : '#ccc'}
        />
        <Switch
          value={!isCleanMode}
          onValueChange={toggleMode}
          thumbColor={isCleanMode ? '#B0ACEC' : '#FFC107'}
          trackColor={{ false: '#B0ACEC', true: '#FFC107' }}
          style={styles.switch}
        />
        <MaterialCommunityIcons
          name="trophy-outline"
          size={24}
          color={!isCleanMode ? '#FFC107' : '#ccc'}
        />
      </View>
      <Text style={[styles.modeLabel, { color: isCleanMode ? '#B0ACEC' : '#FFC107' }]}>
        {isCleanMode ? 'Clean Mode' : 'Game Mode'}
      </Text>

        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Network usage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Themes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Tutorials</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.buttonText}>Terms of service</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}
        onPress={() => router.push('../../index')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d7f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewards: {
    alignItems: 'center',
  },
  rewardsText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  content: {
    padding: 16,
  },
  settingsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingsButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
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
});
