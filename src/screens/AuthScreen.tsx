import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors, spacing } from '../theme';

export function AuthScreen() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();

  const handleLogin = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setError('');
    await login(name.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Expense Tracker</Text>
        <Text style={styles.subtitle}>Track your finances with ease</Text>

        <View style={styles.form}>
          <Input
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={text => {
              setName(text);
              setError('');
            }}
            error={error}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Button title="Get Started" onPress={handleLogin} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl * 2,
  },
  form: {
    width: '100%',
  },
});
