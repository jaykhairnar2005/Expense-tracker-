import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryIcon, formatCurrency } from '../utils/helpers';
import { colors, spacing, borderRadius } from '../theme';

interface CategoryBreakdownProps {
  data: Array<{ category: string; value: number; percentage: number }>;
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <View style={styles.container}>
      {sortedData.map((item, index) => (
        <View key={item.category} style={styles.item}>
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={getCategoryIcon(item.category as any) as any}
                size={20}
                color={colors.text}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.percentage}>{item.percentage.toFixed(1)}%</Text>
            </View>
          </View>
          <Text style={styles.amount}>{formatCurrency(item.value)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  info: {
    flex: 1,
  },
  category: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  percentage: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  amount: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
