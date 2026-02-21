import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { formatCurrency } from '../utils/helpers';
import { colors, spacing } from '../theme';

interface StatCardProps {
  title: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  type?: 'default' | 'income' | 'expense';
}

export function StatCard({ title, amount, icon, type = 'default' }: StatCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={icon} size={24} color={colors.text} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          type === 'income' && styles.income,
          type === 'expense' && styles.expense,
        ]}
      >
        {formatCurrency(amount)}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
  amount: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  income: {
    color: colors.text,
  },
  expense: {
    color: colors.textSecondary,
  },
});
