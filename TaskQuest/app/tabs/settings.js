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
      {/* Center Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>JW</Text>
        </View>
        <TouchableOpacity style={styles.rewards}>
          <MaterialCommunityIcons name="trophy" size={55} color="orange" />
          <Text style={styles.rewardsText}>Rewards</Text>
        </TouchableOpacity>
      </View>

      {/* Mode Toggle Section - Moved under profile */}
      <View style={styles.modeToggleSection}>
        <View style={styles.modeToggleContainer}>
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
            name="trophy"
            size={24}
            color={!isCleanMode ? '#FFC107' : '#ccc'}
          />
        </View>
      </View>

      {/* New Game Button */}
      <TouchableOpacity 
        style={styles.gameButton}
        onPress={() => router.push('/tabs/game')}
      >
        <Text style={styles.buttonText}>Play Game</Text>
      </TouchableOpacity>

      {/* Settings Options */}
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsHeader}>Settings</Text>
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
      </View>

      {/* Logout Button - Moved to bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: '#ff3b30' }]}
          onPress={() => router.push('/')}
        >
          <Text style={[styles.logoutText, { color: '#fff' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d7f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  rewards: {
    position: 'absolute',
    top: 10,
    right: 20,
    alignItems: 'center',
  },
  modeToggleSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  modeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingsButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  logoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
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
  switch: { marginLeft: 8 },
  gameButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
});
