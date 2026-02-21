import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryType } from '../types';
import { getCategoryIcon } from '../utils/helpers';
import { colors, spacing, borderRadius } from '../theme';

interface CategoryPickerProps {
  selected: CategoryType;
  onSelect: (category: CategoryType) => void;
}

const categories: CategoryType[] = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Other'];

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.grid}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.item,
              selected === category && styles.itemSelected,
            ]}
            onPress={() => onSelect(category)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={getCategoryIcon(category) as any}
              size={24}
              color={selected === category ? colors.background : colors.text}
            />
            <Text
              style={[
                styles.itemText,
                selected === category && styles.itemTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  item: {
    width: '31%',
    aspectRatio: 1,
    margin: spacing.xs,
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemSelected: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  itemText: {
    color: colors.text,
    fontSize: 12,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
  itemTextSelected: {
    color: colors.background,
  },
});
