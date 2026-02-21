import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card } from '../components/Card';
import { StatCard } from '../components/StatCard';
import { TransactionItem } from '../components/TransactionItem';
import { ProgressBar } from '../components/ProgressBar';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useApp } from '../context/AppContext';
import { calculateTotals, getMonthlyTransactions, formatCurrency } from '../utils/helpers';
import { colors, spacing } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export function DashboardScreen({ navigation }: Props) {
  const { transactions, user, monthlyBudget } = useApp();
  const [refreshing, setRefreshing] = React.useState(false);
  const nav = useNavigation<any>();

  const monthlyTransactions = useMemo(() => getMonthlyTransactions(transactions), [transactions]);
  const totals = useMemo(() => calculateTotals(transactions), [transactions]);
  const monthlyTotals = useMemo(() => calculateTotals(monthlyTransactions), [monthlyTransactions]);

  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions]);

  const budgetWarning = monthlyTotals.expenses > monthlyBudget * 0.8;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
      >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name}!</Text>
        <Text style={styles.subtitle}>Here's your financial overview</Text>
      </View>

      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(totals.balance)}</Text>
      </Card>

      <View style={styles.statsRow}>
        <StatCard
          title="Income"
          amount={monthlyTotals.income}
          icon="arrow-down-outline"
          type="income"
        />
        <StatCard
          title="Expenses"
          amount={monthlyTotals.expenses}
          icon="arrow-up-outline"
          type="expense"
        />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Monthly Budget</Text>
        {budgetWarning && (
          <Text style={styles.warning}>
            ⚠️ You've used {((monthlyTotals.expenses / monthlyBudget) * 100).toFixed(0)}% of your budget
          </Text>
        )}
        <ProgressBar
          label="Budget Usage"
          value={monthlyTotals.expenses}
          maxValue={monthlyBudget}
        />
        <Text style={styles.budgetText}>
          {formatCurrency(monthlyTotals.expenses)} of {formatCurrency(monthlyBudget)}
        </Text>
      </Card>

      {monthlyTotals.income + monthlyTotals.expenses > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>Income vs Expenses</Text>
          <ProgressBar
            label="Expense Ratio"
            value={monthlyTotals.expenses}
            maxValue={monthlyTotals.income + monthlyTotals.expenses}
          />
        </Card>
      )}

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions.length > 5 && (
          <Text
            style={styles.seeAll}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Transactions' })}
          >
            See All
          </Text>
        )}
      </View>

      {recentTransactions.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySubtext}>Tap the + button to add your first transaction</Text>
        </Card>
      ) : (
        recentTransactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={() => navigation.navigate('EditTransaction', { transactionId: transaction.id })}
          />
        ))
      )}
      </ScrollView>
      <FloatingActionButton onPress={() => nav.navigate('AddTransaction')} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  balanceCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  balanceLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -spacing.xs,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  warning: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  budgetText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  seeAll: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
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
});
