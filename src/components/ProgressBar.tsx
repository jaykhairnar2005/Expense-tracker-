import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  showPercentage?: boolean;
}

export function ProgressBar({ label, value, maxValue, showPercentage = true }: ProgressBarProps) {
  const percentage = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {showPercentage && (
          <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
        )}
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  percentage: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  barContainer: {
    height: 8,
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: borderRadius.sm,
  },
});
