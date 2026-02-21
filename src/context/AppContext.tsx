import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Transaction, User } from '../types';

type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_BUDGET'; payload: number }
  | { type: 'RESET_DATA' };

interface AppContextType extends AppState {
  dispatch: React.Dispatch<Action>;
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setBudget: (amount: number) => Promise<void>;
  resetData: () => Promise<void>;
  exportData: () => string;
}

const initialState: AppState = {
  user: null,
  transactions: [],
  monthlyBudget: 5000,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: '@expense_tracker_user',
  TRANSACTIONS: '@expense_tracker_transactions',
  BUDGET: '@expense_tracker_budget',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_BUDGET':
      return { ...state, monthlyBudget: action.payload };
    case 'RESET_DATA':
      return { ...state, transactions: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userStr, transactionsStr, budgetStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS),
        AsyncStorage.getItem(STORAGE_KEYS.BUDGET),
      ]);

      if (userStr) {
        dispatch({ type: 'SET_USER', payload: JSON.parse(userStr) });
      }
      if (transactionsStr) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(transactionsStr) });
      }
      if (budgetStr) {
        dispatch({ type: 'SET_BUDGET', payload: parseFloat(budgetStr) });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const login = async (name: string) => {
    const user: User = { name, isAuthenticated: true };
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    dispatch({ type: 'LOGOUT' });
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    const updatedTransactions = [newTransaction, ...state.transactions];
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions));
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const updateTransaction = async (transaction: Transaction) => {
    const updatedTransactions = state.transactions.map(t =>
      t.id === transaction.id ? transaction : t
    );
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions));
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = async (id: string) => {
    const updatedTransactions = state.transactions.filter(t => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions));
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const setBudget = async (amount: number) => {
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGET, amount.toString());
    dispatch({ type: 'SET_BUDGET', payload: amount });
  };

  const resetData = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    dispatch({ type: 'RESET_DATA' });
  };

  const exportData = () => {
    return JSON.stringify({
      transactions: state.transactions,
      monthlyBudget: state.monthlyBudget,
      exportDate: new Date().toISOString(),
    }, null, 2);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        login,
        logout,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setBudget,
        resetData,
        exportData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
