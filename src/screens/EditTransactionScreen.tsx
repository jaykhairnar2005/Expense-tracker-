import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CategoryPicker } from '../components/CategoryPicker';
import { useApp } from '../context/AppContext';
import { CategoryType, TransactionType } from '../types';
import { colors, spacing, borderRadius } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditTransaction'>;
  route: RouteProp<RootStackParamList, 'EditTransaction'>;
};

export function EditTransactionScreen({ navigation, route }: Props) {
  const { transactions, updateTransaction, deleteTransaction } = useApp();
  const { transactionId } = route.params;

  const transaction = transactions.find(t => t.id === transactionId);

  const [type, setType] = useState<TransactionType>(transaction?.type || 'expense');
  const [title, setTitle] = useState(transaction?.title || '');
  const [amount, setAmount] = useState(transaction?.amount.toString() || '');
  const [category, setCategory] = useState<CategoryType>(transaction?.category || 'Food');
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState(transaction?.notes || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!transaction) {
      Alert.alert('Error', 'Transaction not found', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [transaction]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || !transaction) return;

    setLoading(true);
    try {
      await updateTransaction({
        ...transaction,
        title: title.trim(),
        amount: parseFloat(amount),
        type,
        category,
        date,
        notes: notes.trim() || undefined,
      });

      Alert.alert('Success', 'Transaction updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTransaction(transactionId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!transaction) return null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
            onPress={() => setType('expense')}
            activeOpacity={0.7}
          >
            <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
            onPress={() => setType('income')}
            activeOpacity={0.7}
          >
            <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Title"
          placeholder="e.g., Grocery shopping"
          value={title}
          onChangeText={text => {
            setTitle(text);
            if (errors.title) setErrors({ ...errors, title: '' });
          }}
          error={errors.title}
          autoCapitalize="sentences"
        />

        <Input
          label="Amount"
          placeholder="0.00"
          value={amount}
          onChangeText={text => {
            setAmount(text);
            if (errors.amount) setErrors({ ...errors, amount: '' });
          }}
          error={errors.amount}
          keyboardType="decimal-pad"
        />

        <CategoryPicker selected={category} onSelect={setCategory} />

        <Input
          label="Date"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <Input
          label="Notes (Optional)"
          placeholder="Add notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          style={styles.notesInput}
        />

        <View style={styles.buttons}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="Save"
            onPress={handleSave}
            loading={loading}
            style={styles.button}
          />
        </View>

        <Button
          title="Delete Transaction"
          onPress={handleDelete}
          variant="outline"
          style={styles.deleteButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  typeButtonActive: {
    backgroundColor: colors.text,
  },
  typeText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  typeTextActive: {
    color: colors.background,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginHorizontal: -spacing.xs,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  deleteButton: {
    marginTop: spacing.lg,
    borderColor: colors.textSecondary,
  },
});
