import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { PieChart } from '../components/PieChart';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { useApp } from '../context/AppContext';
import { getMonthlyTransactions, calculateTotals, getCategoryBreakdown, formatCurrency } from '../utils/helpers';
import { colors, spacing } from '../theme';

export function AnalyticsScreen() {
  const { transactions } = useApp();

  const monthlyTransactions = useMemo(() => getMonthlyTransactions(transactions), [transactions]);
  const totals = useMemo(() => calculateTotals(monthlyTransactions), [monthlyTransactions]);
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(monthlyTransactions), [monthlyTransactions]);

  const chartData = useMemo(() => {
    return Object.entries(categoryBreakdown)
      .filter(([_, value]) => value > 0)
      .map(([category, value]) => ({
        category,
        value,
        percentage: totals.expenses > 0 ? (value / totals.expenses) * 100 : 0,
      }));
  }, [categoryBreakdown, totals.expenses]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Monthly Analytics</Text>
      <Text style={styles.subtitle}>
        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </Text>

      <Card>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totals.income)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, styles.expenseValue]}>
              {formatCurrency(totals.expenses)}
            </Text>
          </View>
        </View>
      </Card>

      {chartData.length > 0 ? (
        <>
          <Card>
            <Text style={styles.sectionTitle}>Expense Distribution</Text>
            <PieChart data={chartData} />
          </Card>

          <Card>
            <Text style={styles.sectionTitle}>Category Breakdown</Text>
            <CategoryBreakdown data={chartData} />
          </Card>
        </>
      ) : (
        <Card>
          <Text style={styles.emptyText}>No expense data for this month</Text>
          <Text style={styles.emptySubtext}>Start adding expenses to see analytics</Text>
        </Card>
      )}

      {totals.income > 0 && totals.expenses > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>Savings Rate</Text>
          <Text style={styles.savingsRate}>
            {((1 - totals.expenses / totals.income) * 100).toFixed(1)}%
          </Text>
          <Text style={styles.savingsText}>
            You saved {formatCurrency(totals.income - totals.expenses)} this month
          </Text>
        </Card>
      )}
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  expenseValue: {
    color: colors.textSecondary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  savingsRate: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  savingsText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
