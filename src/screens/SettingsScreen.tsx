import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../theme';

export function SettingsScreen() {
  const { user, logout, resetData, exportData, monthlyBudget, setBudget } = useApp();
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to delete all transactions? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetData();
            Alert.alert('Success', 'All transactions have been deleted');
          },
        },
      ]
    );
  };

  const handleExportData = async () => {
    try {
      const data = exportData();
      await Share.share({
        message: data,
        title: 'Expense Tracker Data',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const handleSaveBudget = async () => {
    const amount = parseFloat(budgetInput);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }
    await setBudget(amount);
    Alert.alert('Success', 'Monthly budget updated');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Budget Settings</Text>
      <Card>
        <Input
          label="Monthly Budget"
          value={budgetInput}
          onChangeText={setBudgetInput}
          keyboardType="decimal-pad"
          placeholder="5000"
        />
        <Button title="Save Budget" onPress={handleSaveBudget} />
      </Card>

      <Text style={styles.sectionTitle}>Data Management</Text>
      <Card>
        <TouchableOpacity style={styles.option} onPress={handleExportData}>
          <View style={styles.optionLeft}>
            <Ionicons name="download-outline" size={24} color={colors.text} />
            <Text style={styles.optionText}>Export Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.option} onPress={handleResetData}>
          <View style={styles.optionLeft}>
            <Ionicons name="trash-outline" size={24} color={colors.textSecondary} />
            <Text style={[styles.optionText, styles.dangerText]}>Reset All Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </Card>

      <Text style={styles.sectionTitle}>About</Text>
      <Card>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Developer</Text>
          <Text style={styles.aboutValue}>Expense Tracker Team</Text>
        </View>
      </Card>

      <Button title="Logout" onPress={handleLogout} variant="outline" style={styles.logoutButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.background,
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    marginLeft: spacing.md,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  aboutLabel: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  aboutValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
